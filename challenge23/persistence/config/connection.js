export const mysqlConn = {
    client: process.env.MYSQL_CLIENT,
    connection: {
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    pool: {
        min: +process.env.MYSQL_POOL_MIN,
        max: +process.env.MYSQL_POOL_MAX
    }
}

export const sqlite3Conn = {
    client: process.env.SQLITE3_CLIENT,
    connection: {
        filename: process.env.SQLITE3_CONN_FILENAME
    },
    pool: {
        min: +process.env.SQLITE3_POOL_MIN,
        max: +process.env.SQLITE3_POOL_MAX
    },
    useNullAsDefault: true
}

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
export const mongoConn = {
    url: process.env.MONGOSTORE_CONN,
    option: advancedOptions
}