import React from 'react';
import Spend from './Spend';


const SpendList = ({ spends, filteredSpends, filter, setSpendEdit, deleteSpend }) => {
    // console.log(spends);
    return (
        <div className='listado-gastos'>
            {
                filter ? (
                    <>
                        <h2 style={{ textAlign: 'center' }}>{filteredSpends.length ? 'Spend List' : 'No spends yet in this category'}</h2>
                        {filteredSpends.map(filteredSpend => (
                            <Spend
                                key={filteredSpend.id}
                                spend={filteredSpend}
                                setSpendEdit={setSpendEdit}
                                deleteSpend={deleteSpend}
                            />)
                        )}
                    </>
                ) :
                    (
                        <>
                            <h2 style={{ textAlign: 'center' }}>{spends.length ? 'Spend List' : 'No spends yet'}</h2>
                            {spends.map(spend => (
                                <Spend
                                    key={spend.id}
                                    spend={spend}
                                    setSpendEdit={setSpendEdit}
                                    deleteSpend={deleteSpend}
                                />)
                            )}
                        </>
                    )
            }
        </div>
    )
}

export default SpendList