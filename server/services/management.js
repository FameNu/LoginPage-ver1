const { User } = require('../models/user.js');
const { Setting } = require('../models/setting.js');
const fs = require('fs');
const filePath = './data/data.json';

class DataUser {
    constructor(user, setting) {
        this.user = new User(user.name, user.password, user.status);
        this.setting = new Setting(setting?.bgColor?.color, setting?.fontColor?.color);
    }

    getUser() {
        return this.user;
    }

    getSetting() {
        return this.setting;
    }
}

function management() {
    let listUsers = [];

    function addUser(name, password, status = 'active') {
        const userExist = listUsers.find(({user}) => user.getName() === name);
        if (userExist) return null; 
        const user = {name, password, status};
        const dataUser = new DataUser(user);
        listUsers.push(dataUser);

        const saveNewUser = JSON.stringify(listUsers, null, 2);
        fs.writeFileSync(filePath, saveNewUser, 'utf8');

        return dataUser
    }

    function findUser(name, password) {
        return listUsers.find(({user}) => user.getName() === name && user.password === password);
    }

    function loadData() {
        listUsers = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!listUsers) return;
        listUsers = listUsers.map(dataUser => new DataUser(dataUser.user, dataUser.setting));
    }

    function getLists() {
        return listUsers;
    }

    return {
        addUser,
        findUser,
        loadData,
        getLists
    }
}

module.exports = {management};