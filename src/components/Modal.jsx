import { useState } from "react";
import BtnCloseModal from "../img/cerrar.svg";
import Message from "./Message";

const Modal = ({ setModal, animateModal, setAnimateModal }) => {
    const [spendName, setSependName] = useState('');
    const [amount, setAmount] = useState(0);
    const [spendCategory, setSependCategory] = useState('');
    const [blockIAmount, setBlockIAmount] = useState(true);
    const [message, setMessage] = useState('');
    const handleCloseModalResetAnimation = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setModal(false);
        }, 300);
    }
    const handleBeforeInput = e => {
        const incomingValue = e.data;
        // console.log(incomingValue);
        const isNumber = /^[0-9]$/.test(incomingValue);
        if (!isNumber && incomingValue !== '.') {
            setBlockIAmount(true);
            e.preventDefault();
            return;
        }
        setBlockIAmount(false);
    }
    const handleChangeAMount = e => {
        const iValue = e.target.value;
        // console.log(iValue);
        if (!blockIAmount) {
            setAmount(Number(iValue));
        }
    }
    const handleChangeCategory = e => {
        const sValue = e.target.value;
        setSependCategory(sValue);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const validFields = spendName.trim().length && Number(amount) && Number(amount) > 0 && spendCategory !== '';
        if (!validFields) {
            setMessage('One or more invalid fields');
            return;
        }
        setMessage('');
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
                <legend>New Spend</legend>
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
                        type="text"
                        inputMode="numeric"
                        placeholder="Add an amount"
                        onBeforeInput={handleBeforeInput}
                        onChange={handleChangeAMount}
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
                    type="submit"
                />
                {message && <Message type="error">{message}</Message>}
            </form>
        </div>
    )
}

export default Modal
