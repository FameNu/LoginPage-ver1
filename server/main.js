const express = require('express')
const { management } = require('./services/management.js')
const { Setting } = require('./models/setting.js')
const manager = management()
manager.loadData()

const port = 3000
const app = express()

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
    const { password } = req.query
    // if (!name)
    //     return res.status(400).send({ error: 'Name parameter is missing' })
    // if (!password)
    //     return res.status(400).send({ error: 'Password parameter is missing' })

    const dataUser = manager.findUser(name, password)
    if (!dataUser)
        res.send({ errMsg: 'username or password is wrong' })
    else res.send({ dataUser })
})

app.post('/register', (req, res) => {
    const { name } = req.query
    const { password } = req.query
    // if (!name)
    //     return res.status(400).send({ error: 'Name parameter is missing' })
    // if (!password)
    //     return res.status(400).send({ error: 'Password parameter is missing' })

    const dataUser = manager.addUser(name, password)
    if (!dataUser)
        res.send({ errMsg: 'username \'' + name + '\' is already taken' })
    else res.send({ dataUser })
})

app.post('/logout', (req, res) => {
    res.send({ dataUser: null, setting: new Setting() })
})

app.get('/save', (req, res) => {
    const { bgColor, fontColor } = req.query
    console.log(req.query)
    const setting = new Setting(bgColor, fontColor)
    console.log(setting)
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
