class User {
    constructor(name, password, todolist = []) {
        this.name = name
        this.password = password
        this.todolist = todolist
    }

    getName() {
        return this.name
    }

    getPassword() {
        return this.password
    }

    getTodolist() {
        return this.todolist
    }

    getNextTodoId() {
        if (this.todolist.length === 0) return 1
        return this.todolist[this.todolist.length - 1].getId() + 1
    }

    setName(name) {
        this.name = name
    }

    setPassword(password) {
        this.password = password
    }

    setTodolist(todolist) {
        this.todolist = todolist
    }

    setToDone(id) {
        this.todolist = this.todolist.map((todo) => {
            if (todo.getId() == id) todo.setStatus('done')
            return todo
        })
        return this.todolist
    }

    removeTodo(id) {
        this.todolist = this.todolist.filter((todo) => todo.getId() != id)
        return this.todolist
    }
}

module.exports = { User }