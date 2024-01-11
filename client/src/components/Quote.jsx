import React, { useState } from 'react'
import axios from 'axios'

function Quote() {
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')
    const [count, setCount] = useState(0)

    function getQuote() {
        axios
            .get(`http://localhost:5000/`, {
                crossdomain: true
            })
            .then((response) => {
                setText(response.data.text)
                setAuthor(response.data.author)
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
        setCount(count + 1)
    }

    return (
        <div>
            <button onClick={getQuote}>Geneterate Quote #{count}</button>
            <h1>{text}</h1>
            <h3>- {author}</h3>
        </div>
    )
}

export default Quote
