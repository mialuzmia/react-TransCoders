import './searchBar.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate(`/search?q=${inputValue}`)
        setInputValue('')
    }

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input 
                    type="text" 
                    id="search" 
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    required
                />
                <button className='btn'>Search</button>
            </form>
        </div>
  )
}

export default SearchBar