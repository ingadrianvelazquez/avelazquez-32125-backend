export default class Message {
    constructor(email, name, surname, age, alias, avatar, msg) {
        this.author = {
            email: email,
            name: name,
            surname: surname,
            age: age,
            alias: alias,
            avatar: avatar
        }
        this.msg = msg || ""
        this.date = new Date(Date.now()).toLocaleString()
    }
}
