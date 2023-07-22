import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { formatBudget } from '../helpers';
import 'react-circular-progressbar/dist/styles.css';


const BudgetControl = ({ budget, spends }) => {
    const [spent, setSpent] = useState(0);
    const [available, setAvailable] = useState(0);
    const [percentageUsed, setPercentageUSed] = useState(0);

    const calcSpentAndAvailable = () => {
        const totalSpent = spends.reduce((total, spend) => spend.amount + total, 0);
        const totalAvailable = budget - totalSpent;
        const newPercentage = Number(((totalSpent / budget) * 100).toFixed(2));
        console.log(newPercentage);
        setSpent(totalSpent);
        setAvailable(totalAvailable);
        setTimeout(() => {
            setPercentageUSed(newPercentage);
        }, 1700);
    }

    useEffect(() => {
        calcSpentAndAvailable();
    }, [spends]);
    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: '#3B82F6'
                    })}
                    value={percentageUsed}
                    text={`Spent: ${percentageUsed}%`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Budget: </span> {formatBudget(budget)}
                </p>
                <p>
                    <span>Available: </span> {formatBudget(available)}
                </p>
                <p>
                    <span>Spent: </span> {formatBudget(spent)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl;
