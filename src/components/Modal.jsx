import { useState, useEffect } from "react";
import BtnCloseModal from "../img/cerrar.svg";
import Message from "./Message";

const Modal = ({ setModal, animateModal, setAnimateModal, saveSpend, spendEdit, setSpendEdit }) => {
    const [spendName, setSependName] = useState('');
    const [amount, setAmount] = useState(0);
    const [spendCategory, setSependCategory] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (Object.keys(spendEdit).length > 0) {
            setSependName(spendEdit.spendName);
            setAmount(spendEdit.amount);
            setSependCategory(spendEdit.spendCategory);
            setId(spendEdit.id);
            setDate(spendEdit.date);
        }
    }, [])

    const handleCloseModalResetAnimation = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setModal(false);
            if (Object.keys(spendEdit).length > 0) {
                setSpendEdit({});
            }
        }, 300);
    }

    const handleBeforeInput = e => {
        const incomingValue = e.data;
        // console.log(incomingValue);
        const isNumber = /^[0-9]$/.test(incomingValue);
        if (!isNumber && incomingValue !== '.') {
            e.preventDefault();
            return;
        }
    }

    const handleChangeAMount = e => {
        const iValue = e.target.value;
        // console.log(iValue);
        setAmount(Number(iValue));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const validFields = ![spendName.trim(), spendCategory.trim()].includes('') && Number(amount) && Number(amount) > 0;
        if (!validFields) {
            setMessage('One or more invalid fields');
            return;
        }
        setMessage('');
        saveSpend({ spendName, amount, spendCategory, id, date });
        handleCloseModalResetAnimation();
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    onClick={handleCloseModalResetAnimation}
                    src={BtnCloseModal}
                    alt="Close modal icon" />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
            >
                <legend>{Object.keys(spendEdit).length ? 'Edit Spend' : 'New Spend'}</legend>
                {message && <Message type="error">{message}</Message>}
                <div className="campo">
                    <label htmlFor="name">Spend name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Add a name to your spend"
                        value={spendName}
                        onChange={e => setSependName(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        inputMode="numeric"
                        placeholder="Add an amount"
                        onBeforeInput={handleBeforeInput}
                        onChange={handleChangeAMount}
                        value={amount}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        value={spendCategory}
                        onChange={e => setSependCategory(e.target.value)}
                    >
                        <option value="">--Select one--</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="expenses">Miscellaneous expenses</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
                <input
                    type="submit" value={Object.keys(spendEdit).length ? 'Edit' : 'Add'}
                />
            </form>
        </div>
    )
}

export default Modal
