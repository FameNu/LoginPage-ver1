const express = require('express')
const Quote = require('inspirational-quotes')
const port = 5000

const app = express()

/*
Access to XMLHttpRequest at 'http://localhost:5000/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
:5000/:1 
        
Failed to load resource: net::ERR_FAILED
axios.js?v=d0ca54d9:1453 Uncaught (in promise) AxiosError
*/

// VVVV Solution VVVV
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
// End of solution

app.get('/', (req, res) => {
    res.send(Quote.getQuote());
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
