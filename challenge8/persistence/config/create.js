const dropTableIfExists = async (knex, table) => {
    await knex.schema.dropTableIfExists(table)
}

const createTableProducts = async (knex, table) => {
    await dropTableIfExists(knex, table)
    await knex.schema.createTable(table, structure => {
        structure.increments('id')
        structure.string('title')
        structure.float('price')
        structure.string('thumbnail')
    })
        .then(() => console.log(`table ${table} created`))
        .catch((err) => { console.error(err); throw err })
        .finally(() => { })
}

const createTableMessages = async (knex, table) => {
    await dropTableIfExists(knex, table)
    await knex.schema.createTable(table, structure => {
        structure.increments('id')
        structure.string('email')
        structure.string('msg')
        structure.string('date')
    })
        .then(() => console.log(`table ${table} created`))
        .catch((err) => { console.error(err); throw err })
        .finally(() => { })
}

module.exports = { createTableProducts, createTableMessages }
