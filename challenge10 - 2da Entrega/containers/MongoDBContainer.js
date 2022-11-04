class MongoDBContainer {
    constructor(tableModel) {
        this.tableModel = tableModel
    }

    save = async (element) => {
        let ret = {}
        const userSaveModel = new this.tableModel(element)
        await userSaveModel.save()
            .then((res) => {
                ret = res._id
                console.log(`[OK] insert on ${this.tableModel.collection.collectionName} ID: ${ret}`)
            }).catch((err) => { console.error(err); ret = { 'error': 1, 'description': `[ERROR] Save on ${this.tableModel.collection.collectionName}: ${err}` } })
            .finally(() => { })
        return ret
    }

    getAll = async () => {
        let ret = []
        await this.tableModel.find({})
            .then((rows) => {
                for (let row of rows) {
                    ret.push(row)
                }
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return ret;
    }

    getById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        let element = {}
        await this.tableModel.find({ _id: id })
            .then((row) => {
                element = row
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        if (element)
            ret = element[0]
        return ret
    }

    update = async (id, changes) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        await this.tableModel.findByIdAndUpdate(id, changes)
            .then(() => {
                console.log(`[OK] update ID ${id} on ${this.tableModel.collection.collectionName}`)
                ret = { 'error': 0, 'description': `Update ID ${id} on ${this.tableModel.collection.collectionName} Successful` }
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return ret
    }

    deleteById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        await this.tableModel.findByIdAndRemove(id)
            .then(() => {
                console.log(`[OK] delete ID ${id} on ${this.tableModel.collection.collectionName}`)
                ret = { 'error': 0, 'description': `Delete ID ${id} on ${this.tableModel.collection.collectionName} Successful` }
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return ret
    }

    deleteAll = async () => {
        await this.tableModel.deleteMany()
            .then(() => console.log(`[OK] delete ALL on ${this.tableModel.collection.collectionName}`)
            ).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return { 'error': 0, 'description': `Delete ALL on ${this.tableModel.collection.collectionName} Successful` }
    }

}

module.exports = MongoDBContainer
