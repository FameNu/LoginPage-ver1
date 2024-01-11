import React, { useState } from 'react'
import axios from 'axios'

function FindName() {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [inputValue, setInputValue] = useState('')

    const onToSubmit = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/login?name=${inputValue}`
            )
            console.log(response)
            setName(response.data.name)
            setStatus(response.data.status)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
        setInputValue('')
    }

    return (
        <div>
            <div id='input-box'>
                <label htmlFor='input'>Enter Name</label>
                <input
                    type='text'
                    name='input'
                    id='input'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={onToSubmit}>Submit</button>
            </div>
            <div id='display-box'>
                <h1 id='display-name'>{name}</h1>
                <h3 id='display-status'>{status}</h3>
            </div>
        </div>
    )
}

export default FindName
