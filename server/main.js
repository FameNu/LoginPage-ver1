const express = require('express')
const fs = require('fs')
const filePath = './data/data.json'
const port = 3000

const app = express()

function findUser(name) {
    const listUser = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!listUser) return res.status(400).send({ error: 'No user found' })
    return listUser.find(user => user.name === name)
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({ name: 'insert name here', status: 'ready' })
})

app.get('/login', (req, res) => {
    const { name } = req.query
    if (!name) return res.status(400).send({ error: 'Name parameter is missing' })

    const data = findUser(name)
    res.send(data)
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
