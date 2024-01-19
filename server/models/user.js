class User {
    constructor(name, password, setting) {
        this.name = name
        this.password = password
        this.setting = setting
    }

    getName() {
        return this.name
    }

    getPassword() {
        return this.password
    }

    setName(name) {
        this.name = name
    }

    setPassword(password) {
        this.password = password
    }
}

module.exports = { User }