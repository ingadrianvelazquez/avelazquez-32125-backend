export default class CartDto {
    constructor(user, products) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.user = user || ''
        this.products = products || []
    }
}
