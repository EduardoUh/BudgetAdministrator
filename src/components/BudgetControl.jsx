import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { formatBudget } from '../helpers';
import 'react-circular-progressbar/dist/styles.css';


const BudgetControl = ({ budget, setBudget, spends, setSpends, setValidBudget }) => {
    const [spent, setSpent] = useState(0);
    const [available, setAvailable] = useState(0);
    const [percentageUsed, setPercentageUSed] = useState(0);

    useEffect(() => {
        calcSpentAndAvailable();
    }, [spends]);

    const calcSpentAndAvailable = () => {
        const totalSpent = spends.reduce((total, spend) => spend.amount + total, 0);
        const totalAvailable = budget - totalSpent;
        const newPercentage = Number(((totalSpent / budget) * 100).toFixed(2));
        setSpent(totalSpent);
        setAvailable(totalAvailable);
        setTimeout(() => {
            setPercentageUSed(newPercentage);
        }, 1700);
    }

    const handleResetApp = () => {
        setBudget(0);
        setSpends([]);
        setValidBudget(false);
        
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: spent > budget ? '#DC2626' : '#3B82F6',
                        trailColor: spent > budget ? '#DC2626' : '#F5F5F5',
                        textColor: spent > budget ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentageUsed}
                    text={`Spent: ${percentageUsed}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Reset APP
                </button>
                <p>
                    <span>Budget: </span> {formatBudget(budget)}
                </p>
                <p className={`${spent > budget ? 'negativo' : ''}`}>
                    <span>Available: </span> {spent > budget ? formatBudget(0) : formatBudget(available)}
                </p>
                <p>
                    <span>Spent: </span> {formatBudget(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl;
