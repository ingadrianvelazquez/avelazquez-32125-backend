import { loggerConsole, loggerError } from '../controllers/server.controllers.js'

export class MongoDBContainer {
    constructor(tableModel) {
        this.tableModel = tableModel
    }

    save = async (element) => {
        let ret = {}
        const userSaveModel = new this.tableModel(element)
        await userSaveModel.save()
            .then((res) => {
                ret = res._id
                loggerConsole.info(`[OK] insert on ${this.tableModel.collection.collectionName} ID: ${ret}`)
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); ret = { 'error': 1, 'description': `[ERROR] Save on ${this.tableModel.collection.collectionName}: ${err}` } })
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
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        return ret;
    }

    getById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        let element = {}
        await this.tableModel.find({ _id: id })
            .then((row) => {
                element = row
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        if (element)
            ret = element[0]
        return ret
    }

    getByKeyValue = async (key, value) => {
        let ret = { 'error': 2, 'description': `Key ${key} = Value ${value} ON ${this.tableModel.collection.collectionName} Not Found` }
        let element = {}
        await this.tableModel.find({ [key]: value })
            .then((row) => {
                element = row
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        if (element)
            ret = element[0]
        return ret
    }

    update = async (id, changes) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        await this.tableModel.findByIdAndUpdate(id, changes)
            .then(() => {
                loggerConsole.info(`[OK] update ID ${id} on ${this.tableModel.collection.collectionName}`)
                ret = { 'error': 0, 'description': `Update ID ${id} on ${this.tableModel.collection.collectionName} Successful` }
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        return ret
    }

    deleteById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        await this.tableModel.findByIdAndRemove(id)
            .then(() => {
                loggerConsole.info(`[OK] delete ID ${id} on ${this.tableModel.collection.collectionName}`)
                ret = { 'error': 0, 'description': `Delete ID ${id} on ${this.tableModel.collection.collectionName} Successful` }
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        return ret
    }

    deleteAll = async () => {
        await this.tableModel.deleteMany()
            .then(() => loggerConsole.info(`[OK] delete ALL on ${this.tableModel.collection.collectionName}`)
            ).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        return { 'error': 0, 'description': `Delete ALL on ${this.tableModel.collection.collectionName} Successful` }
    }

    getLeanById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.tableModel.collection.collectionName} Not Found` }
        let element = {}
        await this.tableModel.find({ _id: id }).lean()
            .then((row) => {
                element = row
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
        if (element)
            ret = element[0]
        return ret
    }

    getLeanByKeyValue = async (key, value) => {
        let element = {}
        await this.tableModel.find({ [key]: value }).lean()
            .then((row) => {
                element = row
            }).catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
            .finally(() => { })
            let ret = {}
            if (element && key != 'email')
                ret = element[0]
            else 
                ret = { 'error': 2, 'description': `Key ${key} = Value ${value} ON ${this.tableModel.collection.collectionName} Not Found` }
        return ret
    }

}
