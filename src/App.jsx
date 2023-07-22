import { useState, useEffect } from 'react';
import Header from './components/Header';
import SpendList from './components/SpendList';
import Modal from './components/Modal';
import { generateId, generateDate } from './helpers';
import newSpendIcon from './img/nuevo-gasto.svg';


const App = () => {
    const [budget, setBudget] = useState(0);
    const [validBudget, setValidBudget] = useState(false);
    const [modal, setModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [spends, setSpends] = useState([]);
    const [spendEdit, setSpendEdit] = useState({});

    useEffect(() => {
        if (Object.keys(spendEdit).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimateModal(true);
            }, 700)
        }
    }, [spendEdit]);


    const handleNewSpend = () => {
        setSpendEdit({});
        setModal(true);
        setTimeout(() => {
            setAnimateModal(true);
        }, 700)
    }

    const saveSpend = spend => {
        if (spend.id) {
            const newSpendList = spends.map(spendState => spendState.id === spend.id ? spend : spendState);
            setSpends(newSpendList);
            setSpendEdit({});
            return;
        }
        spend.id = generateId();
        spend.date = generateDate();
        setSpends([...spends, spend]);
    }

    const deleteSpend = id => {
        console.log('Deleting ' + id);
        const newSpendList = spends.filter(spend => spend.id !== id);
        setSpends(newSpendList);
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                budget={budget}
                setBudget={setBudget}
                validBudget={validBudget}
                setValidBudget={setValidBudget}
                spends={spends}
            />
            {
                validBudget &&
                (<>
                    <main>
                        <SpendList
                            spends={spends}
                            setSpendEdit={setSpendEdit}
                            deleteSpend={deleteSpend}
                        />
                    </main>
                    <div className="nuevo-gasto">
                        <img
                            onClick={handleNewSpend}
                            src={newSpendIcon}
                            alt="New spend icon" />
                    </div >
                </>)
            }
            {modal && <Modal
                setModal={setModal}
                animateModal={animateModal}
                setAnimateModal={setAnimateModal}
                saveSpend={saveSpend}
                spendEdit={spendEdit}
                setSpendEdit={setSpendEdit}
            />}
        </div>
    )
}

export default App;
