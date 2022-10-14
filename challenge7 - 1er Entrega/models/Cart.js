class Cart {
    constructor(products) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.products = products || []
    }
}

module.exports = Cart