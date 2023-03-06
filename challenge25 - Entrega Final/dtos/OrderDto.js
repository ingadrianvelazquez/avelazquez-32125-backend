export default class OrderDto {
    constructor(email, products) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.email = email || ''
        this.products = products || []
    }
}
