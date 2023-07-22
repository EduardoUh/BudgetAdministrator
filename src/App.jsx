import { useState, useEffect } from 'react';
import Header from './components/Header';
import SpendList from './components/SpendList';
import Filters from './components/Filters';
import Modal from './components/Modal';
import { generateId, generateDate } from './helpers';
import newSpendIcon from './img/nuevo-gasto.svg';


const App = () => {
    const [budget, setBudget] = useState(
        Number(localStorage.getItem('budget')) ?? 0
    );
    const [validBudget, setValidBudget] = useState(false);
    const [modal, setModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [spends, setSpends] = useState(
        localStorage.getItem('spends') ? JSON.parse(localStorage.getItem('spends')) : []
    );
    const [spendEdit, setSpendEdit] = useState({});
    const [filter, setFilter] = useState('');
    const [filteredSpends, setFilteredSpends] = useState([]);

    useEffect(() => {
        if (Object.keys(spendEdit).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimateModal(true);
            }, 700)
        }
    }, [spendEdit]);

    useEffect(() => {
        localStorage.setItem('budget', budget);
    }, [budget]);

    useEffect(() => {
        const budgetLocalStorage = Number(localStorage.getItem('budget')) ?? 0;
        if (budgetLocalStorage > 0) {
            setValidBudget(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('spends', JSON.stringify(spends));
        setFilter('');
    }, [spends]);

    useEffect(() => {
        if (filter) {
            const newFilteredSpends = spends.filter(spend => spend.spendCategory === filter);
            setFilteredSpends(newFilteredSpends);
        }
        else {
            setFilteredSpends([]);
        }
    }, [filter]);

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
        const newSpendList = spends.filter(spend => spend.id !== id);
        setSpends(newSpendList);
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                spends={spends}
                setSpends={setSpends}
                budget={budget}
                setBudget={setBudget}
                validBudget={validBudget}
                setValidBudget={setValidBudget}
            />
            {
                validBudget &&
                (<>
                    <main>
                        <Filters
                            filter={filter}
                            setFilter={setFilter}
                        />
                        <SpendList
                            spends={spends}
                            filteredSpends={filteredSpends}
                            filter={filter}
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
