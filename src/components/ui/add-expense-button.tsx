'use client'

import { useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import ExpenseForm from "@/components/ui/expense-form"
import { IoAdd } from "react-icons/io5"

type Props = {
    userId: string;
}

function AddExpenseButton({ userId }: Props) {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 630px)')
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="">
                <button className="border-2 font-semibold rounded-lg text-sm max-[1400px]:text-xs ml-2 bg-primary border-accent text-accent py-2 px-4 max-[630px]:p-2 hover:bg-accent hover:text-primary transition-all ease-in-out duration-200 focus:outline-none focus-visible:!outline-secondary transform active:scale-90">
                    {isMobile ? <IoAdd className="text-lg" /> : 'Add New Expense'}
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-lg bg-primary border-primary">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center">Add New Expense</DialogTitle>
                </DialogHeader>
                
                <ExpenseForm 
                    userId={userId} 
                    handleSetOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddExpenseButton