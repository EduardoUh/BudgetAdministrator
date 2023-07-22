import React from 'react';
import Spend from './Spend';


const SpendList = ({ spends, setSpendEdit, deleteSpend }) => {
    // console.log(spends);
    return (
        <div className='listado-gastos'>
            <h2 style={{ textAlign: 'center' }}>{spends.length ? 'Spend List' : 'No spends yet'}</h2>
            {
                spends.map(spend => (
                    <Spend
                        key={spend.id}
                        spend={spend}
                        setSpendEdit={setSpendEdit}
                        deleteSpend={deleteSpend}
                    />)
                )
            }
        </div>
    )
}

export default SpendList