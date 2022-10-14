class Product {
    constructor(name, desc, code, url, price, stock) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.name = name || ""
        this.desc = desc || ""
        this.code = code || ""
        this.url = url || ""
        this.price = price || ""
        this.stock = stock || ""
    }
}

module.exports = Product