const { User } = require('../models/user.js')
const { Todo } = require('../models/todo.js')
const fs = require('fs')
const filePath = './data/dataTodo.json'

function management() {
    let listUsers = []

    function addUser(name, password) {
        const userExist = listUsers.find((user) => user.getName() === name)
        if (userExist) return null
        const user = new User(name, password)
        listUsers.push(user)

        const saveNewUser = JSON.stringify(listUsers, null, 2)
        fs.writeFileSync(filePath, saveNewUser, 'utf8')

        return user
    }

    function findUser(name, password) {
        return listUsers.find(
            (user) => user.getName() === name && user.getPassword() === password
        )
    }

    function findUserByName(name) {
        return listUsers.find((user) => user.getName() === name)
    }

    function loadData() {
        listUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if (!listUsers) return
        listUsers = listUsers.map(
            (user) =>
                new User(
                    user.name,
                    user.password,
                    user.todolist.map(
                        (todo) =>
                            new Todo(
                                todo.id,
                                todo.title,
                                todo.description,
                                todo.status
                            )
                    )
                )
        )
    }

    function addTodo(name, title, description) {
        const user = findUserByName(name)
        if (!user) return null
        const todo = new Todo(
            user.getNextTodoId(),
            title,
            description,
            'not done'
        )
        user.getTodolist().push(todo)

        const saveNewTodo = JSON.stringify(listUsers, null, 2)
        fs.writeFileSync(filePath, saveNewTodo, 'utf8')

        return user
    }

    function removeTodoById(name, id) {
        const user = findUserByName(name)
        if (!user) return null
        console.log(user)
        user.removeTodo(id)

        const saveNewTodo = JSON.stringify(listUsers, null, 2)
        fs.writeFileSync(filePath, saveNewTodo, 'utf8')

        return user
    }

    function setTodoToDone(name, id) {
        const user = findUserByName(name)
        if (!user) return null
        user.setToDone(id)

        const saveNewTodo = JSON.stringify(listUsers, null, 2)
        fs.writeFileSync(filePath, saveNewTodo, 'utf8')

        return user
    }

    function getLists() {
        return listUsers
    }

    return {
        addUser,
        findUser,
        loadData,
        addTodo,
        removeTodoById,
        setTodoToDone,
        getLists
    }
}

module.exports = { management }
