import { useState } from 'react';
import Message from './Message';


const NewBudget = ({ budget, setBudget, setValidBudget }) => {
    const [message, setMessage] = useState('');
    const [blockBudget, setBlockBudget] = useState(true);

    const handleBeforeInput = e => {
        const incomingValue = e.data;
        const isNumber = /^[0-9]$/.test(incomingValue);
        if (!isNumber && incomingValue !== '.') {
            setBlockBudget(true);
            e.preventDefault();
            return;
        }
        setBlockBudget(false);
    }

    const handleChange = e => {
        if (!blockBudget) {
            setBudget(Number(e.target.value));
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!Number(budget) || Number(budget) <= 0) {
            setMessage('Not a valid budget');
            return;
        }
        setMessage('');
        setValidBudget(true);
    }
    return (
        <div className='cotenedor-presupuesto contenedor sombra'>
            <form className='formulario'
                onSubmit={handleSubmit}
            >
                <div className='campo'>
                    <label htmlFor="set-budget">
                        Set Budget
                    </label>
                    <input
                        className='nuevo-presupuesto'
                        type="text"
                        inputMode='numeric'
                        step={.1}
                        placeholder='Set your budget'
                        id='set-budget'
                        defaultValue={budget}
                        onBeforeInput={handleBeforeInput}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" value="Add Budget" />
                {
                    message && <Message type="error">{message}</Message>
                }
            </form>
        </div>
    )
}

export default NewBudget;