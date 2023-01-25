import { loggerConsole, loggerError } from '../../controllers/server.controllers.js'

const dropTableIfExists = async (knex, table) => {
    await knex.schema.dropTableIfExists(table)
}

export const createTableProducts = async (knex, table) => {
    await dropTableIfExists(knex, table)

    await knex.schema.createTable(table, structure => {
        structure.increments('id')
        structure.string('title')
        structure.float('price')
        structure.string('thumbnail')
    })
        .then(() => loggerConsole.info(`table ${table} created`))
        .catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
        .finally(() => { })
}

export const createTableMessages = async (knex, table) => {
    await dropTableIfExists(knex, table)
    
    await knex.schema.createTable(table, structure => {
        structure.increments('id')
        structure.string('email')
        structure.string('msg')
        structure.string('date')
    })
        .then(() => loggerConsole.info(`table ${table} created`))
        .catch((err) => { loggerConsole.error(err); loggerError.error(err); throw err })
        .finally(() => { })
}
