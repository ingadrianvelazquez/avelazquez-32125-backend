export const mysqlConn = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'coderhouse'
    },
    pool: { min: 0, max: 7 }
}

export const sqlite3Conn = {
    client: 'sqlite3',
    connection: {
        filename: "./persistence/db/ecommerce.sqlite"
    },
    pool: { min: 0, max: 7 },
    useNullAsDefault: true
}
