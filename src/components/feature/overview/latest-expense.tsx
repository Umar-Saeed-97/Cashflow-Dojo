'use client'

import dayjs from 'dayjs'
import { useMediaQuery } from '@react-hook/media-query'
import CategoryIcon from "../../ui/category-icon"
import { formatExpenseAmount, getCategoryColor, getCurrencySymbol, utcToLocal } from "@/utils/functions"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
    currency: string;
}

function LatestExpense({ expense, currency }: Props) {
    const currencySymbol = getCurrencySymbol(currency);
    const formattedDate = utcToLocal(expense.date);
    const amount = formatExpenseAmount(expense.amount)
    const isTablet = useMediaQuery('(max-width: 1160px)');

    return (
        <div className="flex flex-col gap-1 border-b-1 border-dark-500 pt-[7px] pb-[13px] px-2 mb-3 font-semibold">
            <div className="text-xs pl-2 text-dark-700 tracking-wide">{dayjs(formattedDate).format("D MMMM, YYYY")}</div>

            <div className="flex gap-4 px-6 mt-1">
                {!isTablet && 
                    <div className="h-11 w-11 flex justify-center items-center rounded-xl" style={{ backgroundColor: getCategoryColor(expense.category) }}>
                        <CategoryIcon category={expense.category} />
                    </div> 
                }

                <div className="flex flex-col grow">
                    <div className="flex justify-between items-center text-accent">
                        <p className="text-base tracking-wide text-dark-900">{expense.name}</p>

                        <p className="text-base tracking-wide text-dark-900">{`${currencySymbol} ${amount}`}</p>
                    </div>
                    
                    <div className={"text-xs text-dark-500 tracking-wide"}>{expense.category}</div>
                </div>
            </div>
        </div>
    )
}

export default LatestExpense