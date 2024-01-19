const express = require('express')
const bodyParser = require('body-parser')
const { management } = require('./services/management.js')
const manager = management()
manager.loadData()

const port = 3000
const app = express()

app.use(bodyParser.json())
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
    const user = { name: '', password: '', setting: manager.defaultSetting() }
    res.send({ user })
})

app.post('/login', (req, res) => {
    const { name, password } = req.body

    const user = manager.findUser(name, password)
    if (!user)
        res.send({ errMsg: 'username or password is wrong' })
    else res.send({ user })
})

app.post('/register', (req, res) => {
    const { name, password } = req.body

    const user = manager.addUser(name, password)
    if (!user)
        res.send({ errMsg: 'username \'' + name + '\' is already taken' })
    else res.send({ user })
})

app.post('/save-setting', (req, res) => {
    const { name, bgColor, fontColor } = req.body
    manager.setSetting(name, bgColor, fontColor)
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
