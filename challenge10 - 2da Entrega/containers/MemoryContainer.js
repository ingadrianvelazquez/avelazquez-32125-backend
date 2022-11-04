class MemoryContainer {
    constructor(inMemory = []) {
        this.inMemory = inMemory
    }

    getAll = () => this.inMemory

    getById = elementID => {
        let rtn = { 'error': 'Element Not Found!' }
        if (this.inMemory.find(elem => elem.id === +elementID))
            rtn = this.inMemory.filter(elem => elem.id === +elementID)
        return rtn
    }

    addProduct = elementBody => {
        const cntElems = this.inMemory.length
        // TO-DO :: make it more generic
        const { title, price, thumbnail } = elementBody
        const idCreated = cntElems > 0 ? this.inMemory[cntElems - 1].id + 1 : 1
        this.inMemory.push({ title: title, price: price, thumbnail: thumbnail, id: idCreated })
        return this.getById(idCreated)
    }

    updateProduct = (elementID, elementBody) => {
        if (this.inMemory.find(elem => elem.id === +elementID)) {
            // TO-DO :: make it more generic
            const { title, price, thumbnail } = elementBody
            let found = this.inMemory.find(elem => elem.id === +elementID)
            found.title = title
            found.price = price
            found.thumbnail = thumbnail
        }
        return this.getById(elementID)
    }

    removeById = elementID => {
        if (!this.inMemory.find(elem => elem.id === +elementID))
            return { 'error': 'Element Not Found!' }
        this.catalog = this.catalog.filter(elem => elem.id !== +elementID)
        return { 'msg': 'Element deleted successfully.' }
    }
}

module.exports = MemoryContainer