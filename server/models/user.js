class User {
    constructor(name, password, status) {
        this.name = name
        this.password = password
        this.status = status
    }

    getName() {
        return this.name
    }

    getStatus() {
        return this.status
    }

    setName(name) {
        this.name = name
    }

    setStatus(status) {
        this.status = status
    }
}

module.exports = { User }