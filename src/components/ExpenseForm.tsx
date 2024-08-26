import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useBudget } from "../hooks/useBudget";
import DatePicker from 'react-date-picker';
import ErrorMessage from "./ErrorMessage";


export default function ExpenseForm() {

    const [expense, setExpense]= useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const { dispatch, state } = useBudget()


    useEffect(()=> {
        if(state.editingId) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        //Agregar o actualizar gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload: { expense }})
        }

        //Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Actualizar' : 'Registrar'}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="expenseName">
                Nombre gasto
            </label>
            <input
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-200 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="amount">
                Cantidad
            </label>
            <input
                type="text"
                id="amount"
                placeholder="Añade la cantidad del gasto: ej. 300"
                className="bg-slate-200 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>
        
        <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="category">
                Categoría
            </label>
            <select
                id="category"
                className="bg-slate-200 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">--Seleccionar--</option>
                {categories.map((category)=>(
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-xl" htmlFor="amount">
                Fecha
            </label>
            <DatePicker 
                className="bg-slate-200 hover:bg-slate-400 cursor-pointer"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-xl"
            value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}
        />
    </form>
  )
}
