class Todo {
    constructor(id, title, description, status) {
        this.id = id
        this.title = title
        this.description = description
        this.status = status
    }

    getId() {
        return this.id
    }

    setStatus(status) {
        this.status = status
    }
}

module.exports = { Todo }