import React from 'react';
import NewBudget from './NewBudget';
import BudgetControl from './BudgetControl';


const Header = ({ budget, setBudget, validBudget, setValidBudget, spends }) => {
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