import { useMemo, useEffect } from "react"
import { useBudget } from "./hooks/useBudget"
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"


function App() {

  const { state } = useBudget()
  
  const isValidBudget = useMemo(() => state.budget > 0 , [state.budget])
  
  useEffect(()=> {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    localStorage.setItem('budget', state.budget.toString())
  }, [state])

  return (
    <>
      <header className="bg-slate-950 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white ">
          Planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white  shadow-md shadow-blue-500 rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm /> }
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
      
    </>
  )
}

export default App
