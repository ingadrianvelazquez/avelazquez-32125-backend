export default class UserDto {
    constructor(username, password, fullname, address, age, phone, avatar) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.username = username || ""
        this.password = password || ""
        this.fullname = fullname || ""
        this.address = address || ""
        this.age = age || ""
        this.phone = phone || ""
        this.avatar = avatar || ""
    }
}
