import React from 'react';
import NewBudget from './NewBudget';
import BudgetControl from './BudgetControl';


const Header = ({ budget, setBudget, validBudget, setValidBudget, spends, setSpends }) => {
    return (
        <header>
            <h1>
                Budget Administrator
            </h1>
            {
                validBudget ?
                    (
                        <BudgetControl
                            budget={budget}
                            setBudget={setBudget}
                            spends={spends}
                            setSpends={setSpends}
                            setValidBudget={setValidBudget}
                        />
                    )
                    :
                    (
                        <NewBudget
                            budget={budget}
                            setBudget={setBudget}
                            setValidBudget={setValidBudget}
                        />
                    )
            }
        </header>
    )
}

export default Header;