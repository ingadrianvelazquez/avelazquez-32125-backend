class Catalog {
    constructor(catalog = []) {
        this.catalog = catalog
    }

    getAll = () => this.catalog

    getById = productID => {
        let rtn = { 'error': 'Product Not Found!' }
        if (this.catalog.find(prod => prod.id === +productID))
            rtn = this.catalog.filter(prod => prod.id === +productID)
        return rtn
    }

    addProduct = productBody => {
        const cntProds = this.catalog.length
        const { title, price, thumbnail } = productBody
        const idCreated = cntProds > 0 ? this.catalog[cntProds - 1].id + 1 : 1
        this.catalog.push({ title: title, price: price, thumbnail: thumbnail, id: idCreated })
        return this.getById(idCreated)
    }

    updateProduct = (productID, productBody) => {
        if (this.catalog.find(prod => prod.id === +productID)) {
            const { title, price, thumbnail } = productBody
            let found = this.catalog.find(prod => prod.id === +productID)
            found.title = title
            found.price = price
            found.thumbnail = thumbnail
        }
        return this.getById(productID)
    }

    removeById = productID => {
        if (!this.catalog.find(prod => prod.id === +productID))
            return { 'error': 'Product Not Found!' }
        this.catalog = this.catalog.filter(prod => prod.id !== +productID)
        return { 'msg': 'Product deleted successfully.' }
    }
}

module.exports = Catalog