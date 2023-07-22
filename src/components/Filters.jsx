import { useState, useEffect } from 'react'

const Filters = ({ filter, setFilter }) => {
    return (
        <div className='filtros sombra contenedor'>
            <form >
                <div className='campo'>
                    <label htmlFor="spendsFilter">Filter spends</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        name="spendsFilter"
                        id="spendsFilter">
                        <option value="">All categories</option>
                        <option value="savings">Savings</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="expenses">Miscellaneous expenses</option>
                        <option value="leisure">Leisure</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filters