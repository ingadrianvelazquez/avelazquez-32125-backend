class DataBaseKnexContainer {
    constructor(knex, table) {
        this.knex = knex
        this.table = table
    }

    save = async (element) => {
        let ret = {}
        await this.knex(this.table).insert(element, 'id')
            .then((res) => {
                ret = res[0].id || res  // .returning() is not supported by mysql
                console.log(`[OK] insert on ${this.table} ID: ${ret}`)
            }).catch((err) => { console.error(err); ret = { 'error': 1, 'description': `[ERROR] Save on ${this.table}: ${err}` } })
            .finally(() => { })
        return ret
    }

    getAll = async () => {
        let ret = []
        await this.knex.from(this.table).select('*')
            .then((rows) => {
                for (let row of rows) {
                    ret.push(row)
                }
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return ret;
    }

    getById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.table} Not Found` }
        let element = {}
        await this.knex.from(this.table).select('*').where('id', id)
            .then((row) => {
                element = row
            }).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        if (element)
            ret = element
        return ret
    }

    update = async (id, element) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.table} Not Found` }
        const prod = await this.getById(id)
        if (prod) {
            await this.knex(this.table).where('id', id).update(element)
                .then(() => {
                    console.log(`[OK] update ID ${id} on ${this.table}`)
                    ret = { 'error': 0, 'description': `Update ID ${id} on ${this.table} Successful` }
                }).catch((err) => { console.error(err); throw err })
                .finally(() => { })
        }
        return ret
    }

    deleteById = async (id) => {
        let ret = { 'error': 2, 'description': `Element ID ${id} on ${this.table} Not Found` }
        const prod = await this.getById(id)
        if (prod) {
            await this.knex(this.table).where('id', id).del()
                .then(() => {
                    console.log(`[OK] delete ID ${id} on ${this.table}`)
                    ret = { 'error': 0, 'description': `Delete ID ${id} on ${this.table} Successful` }
                }).catch((err) => { console.error(err); throw err })
                .finally(() => { })
        }
        return ret
    }

    deleteAll = async () => {
        await this.knex(this.table).del()
            .then(() => console.log(`[OK] delete ALL on ${this.table}`)
            ).catch((err) => { console.error(err); throw err })
            .finally(() => { })
        return { 'error': 0, 'description': `Delete ALL on ${this.table} Successful` }
    }

}

module.exports = DataBaseKnexContainer
