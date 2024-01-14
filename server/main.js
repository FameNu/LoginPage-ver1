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
    const user = { name: '', password: '', todoList: null }
    res.send({ user })
})

app.get('/login', (req, res) => {
    const { name } = req.query
    const { password } = req.query

    const user = manager.findUser(name, password)
    if (!user)
        res.send({ errMsg: 'username or password is wrong' })
    else res.send({ user })
})

app.post('/register', (req, res) => {
    const { name } = req.query
    const { password } = req.query

    const user = manager.addUser(name, password)
    if (!user)
        res.send({ errMsg: 'username \'' + name + '\' is already taken' })
    else res.send({ user })
})

app.post('/addTodo', (req, res) => {
    const { title, description } = req.body
    const { name } = req.query
    const user = manager.addTodo(
        name,
        title,
        description
    )
    res.send({ user })
})

app.post('/removeTodo', (req, res) => {
    const { name, id } = req.body
    console.log(name, id)
    const user = manager.removeTodoById(name, id)
    res.send({ user })
})

app.post('/setToDone', (req, res) => {
    const { name, id } = req.body
    const user = manager.setTodoToDone(name, id)
    res.send({ user })
})

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})
