export default class ProductDto {
    constructor({ name, desc, category, url, price, stock }) {
        this.timestamp = new Date(Date.now()).toLocaleString()
        this.name = name || ""
        this.desc = desc || ""
        this.category = category || ""
        this.url = url || ""
        this.price = price || ""
        this.stock = stock || ""
    }
}
