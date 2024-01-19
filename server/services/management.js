const { User } = require('../models/user.js')
const { Setting } = require('../models/setting.js')
const fs = require('fs')
const filePath = './data/dataSetting.json'

function management() {
    let listUsers = []

    function addUser(name, password) {
        const userExist = listUsers.find((user) => user.getName() === name)
        if (userExist) return null
        const setting = new Setting()
        const user = new User(name, password, setting)
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
            ({name, password, setting}) =>
                new User(
                    name,
                    password,
                    new Setting(setting.bgColor, setting.fontColor)
                )
        )
    }

    function setSetting(name, bgColor, fontColor) {
        const user = findUserByName(name)
        if (!user) return
        user.setting.setBgColor(bgColor)
        user.setting.setFontColor(fontColor)

        const saveNewSetting = JSON.stringify(listUsers, null, 2)
        fs.writeFileSync(filePath, saveNewSetting, 'utf8')
    }

    function getLists() {
        return listUsers
    }

    function defaultSetting() {
        return new Setting()
    }

    return {
        addUser,
        findUser,
        loadData,
        setSetting,
        getLists,
        defaultSetting
    }
}

module.exports = { management }
