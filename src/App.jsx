import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import newSpendIcon from './img/nuevo-gasto.svg';


const App = () => {
    const [budget, setBudget] = useState(0);
    const [validBudget, setValidBudget] = useState(false);
    const [modal, setModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const handleNewSpend = () => {
        setModal(true);
        setTimeout(() => {
            setAnimateModal(true);
        }, 700)
    }

    return (
        <div>
            <Header
                budget={budget}
                setBudget={setBudget}
                validBudget={validBudget}
                setValidBudget={setValidBudget}
            />
            {
                validBudget &&
                (<div className="nuevo-gasto">
                    <img
                        onClick={handleNewSpend}
                        src={newSpendIcon}
                        alt="New spend icon" />
                </div >)
            }
            {modal && <Modal
                setModal={setModal}
                animateModal={animateModal}
                setAnimateModal={setAnimateModal}
            />}
        </div>
    )
}

export default App;
