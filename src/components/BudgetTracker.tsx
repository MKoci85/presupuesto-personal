import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css'


export default function BudgetTracker() {

    const{state, totalExpenses, remainingBudget, dispatch} = useBudget()
    const percentage = +((totalExpenses / state.budget)*100).toFixed(2)

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar 
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage == 100 ?'#FF3E00'  : (percentage >= 60 ? '#F0D511' : '#17D404'),
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: '0096EB'
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button 
                    type="button" 
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={() => dispatch({type: 'restart-app'})}
                    >
                    Resetear App
                </button>

                <AmountDisplay 
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay 
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay 
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>

        
    </>
  )
}
