'use client'

import { Dispatch, SetStateAction } from 'react'
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import { DualRangeSlider } from '@/components/ui/shadcn/dual-range-slider'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import MultipleSelector, { Option } from '@/components/ui/shadcn/multiple-selector'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { cn } from "@/lib/utils"
import { categories } from "@/utils/data"
import { calculateIdealStep } from "@/utils/functions"
import { Action } from "@/utils/types"

type Props = {
    handleSetOpen: Dispatch<SetStateAction<boolean>>;
    dispatch: Dispatch<Action>;
    currency: string;
    minAmount: number;
    maxAmount: number;
    filterConfig: {
        categories: string[];
        amountRange: [number, number];
        dateRange: {
            from?: Date | undefined;
            to?: Date | undefined;
        };
    }
}

const CATEGORY_OPTIONS: Option[] = categories.map(category => ({
    label: category,
    value: category
}));

const FormSchema = z.object({
    categories: z.array(z.string()).min(1, {message: "You must select at least one category."}),
    amountRange: z.tuple([z.number(), z.number()]),
    dateRange: z.object({from: z.date().optional(), to: z.date().optional(),}),
})

function FilterForm({ handleSetOpen, dispatch, currency, minAmount, maxAmount, filterConfig }: Props) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            categories: filterConfig.categories,
            amountRange: filterConfig.amountRange,
            dateRange: filterConfig.dateRange
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        dispatch({type: 'filter', payload: data})
        handleSetOpen(false)
    }

    function onClick() {
        dispatch({
            type: 'resetFilters', 
            payload: {
                amountRange: [minAmount, maxAmount], // Full range
            }
        })
        handleSetOpen(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="categories" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-start gap-x-4 gap-y-3">
                        <FormLabel className="text-right max-[425px]:text-left font-bold pt-2">Categories</FormLabel>

                        <div className="col-span-3 max-[425px]:col-span-4 space-y-1 !mt-0">
                            <FormControl>
                                <MultipleSelector
                                    value={field.value.map(value => ({ label: value, value }))}
                                    onChange={(options) => field.onChange(options.map(option => option.value))}
                                    defaultOptions={CATEGORY_OPTIONS}
                                    placeholder="Select categories to filter"
                                    className="bg-primary border rounded-md border-secondary mt-0 outline-none"
                                    hidePlaceholderWhenSelected
                                    emptyIndicator={
                                        <p className="text-center">No categories found.</p>}
                                />
                            </FormControl>

                            <FormMessage className="text-red-600 text-xs mt-2" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="amountRange" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                        <FormLabel className="text-right max-[425px]:text-left font-bold">Amount</FormLabel>

                        <div className="col-span-3 max-[425px]:col-span-4 space-y-1">
                            <DualRangeSlider
                                value={field.value}
                                onValueChange={field.onChange}
                                min={minAmount}
                                max={maxAmount}
                                className="text-secondary"
                                step={calculateIdealStep(minAmount, maxAmount)}
                            />

                            <div className="flex justify-between text-sm">
                                <span>{`${currency} ${field.value[0]}`}</span>

                                <span>{`${currency} ${field.value[1]}`}</span>
                            </div>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="dateRange" render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
                        <FormLabel className="text-right max-[425px]:text-left font-bold">Date</FormLabel>

                        <div className="col-span-3 max-[425px]:col-span-4 space-y-1">
                            <Popover>
                                <PopoverTrigger asChild className="bg-primary border border-secondary text-secondary rounded-md placeholder:text-secondary/50 focus:outline-none focus-visible:!outline-sage-800">
                                    <FormControl>
                                        <Button id="date" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4 opacity-100" />

                                            {field.value?.from ? (
                                                field.value.to ? (
                                                    <>
                                                        {format(field.value.from, "LLL dd, y")} -{" "}
                                                        {format(field.value.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(field.value.from, "LLL dd, y")
                                                )
                                                ) : (
                                                    <span>Pick a date range</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0 rounded-md border-secondary bg-secondary" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={field.value?.from}
                                        selected={field.value as DateRange}
                                        onSelect={(range) => {
                                            if (range?.from) {
                                            field.onChange({ from: range.from, to: range?.to });
                                            } else {
                                            field.onChange({ from: undefined, to: undefined });
                                            }
                                        }}
                                        numberOfMonths={1}
                                        disabled={(date) => date > new Date()}
                                        className="rounded-md border-secondary bg-secondary"
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage className="text-red-600 text-xs" />
                        </div>
                    </FormItem>
                )}/>

                <div className="flex justify-end space-x-2 mt-2">
                    <Button type="button" onClick={onClick} className="border font-semibold rounded-lg border-secondary bg-secondary text-neutral py-2 px-4 hover:bg-secondary-shade hover:border-secondary-shadee focus:outline-none focus-visible:outline-accent transition-colors transform active:scale-90 ease-in-out duration-200">
                        Reset
                    </Button>
                    
                    <Button type="submit" className="border font-semibold rounded-lg bg-accent text-primary border-accent py-2 px-4 hover:bg-accent-shade hover:border-accent-shade focus:outline-none focus-visible:outline-secondary transition-colors transform active:scale-90 ease-in-out duration-200">
                        Apply
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FilterForm;