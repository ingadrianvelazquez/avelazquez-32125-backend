export default class ChatDto {
    constructor({ email, tipo, msg }) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.email = email || ''
        this.tipo = tipo || 'usuario'
        this.msg = msg || ''
        this.date = new Date(Date.now()).toLocaleString()
    }
}
