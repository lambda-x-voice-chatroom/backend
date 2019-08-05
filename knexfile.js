require('dotenv').config();
const localPgConnection = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
};
const prodDbConnection = localPgConnection;

module.exports = {
    development: {
        client: 'pg',
        connection: prodDbConnection,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },

    testing: {
        client: 'sqlite3',
        connection: {
            filename: './data/intercomAppTestDB.sqlite3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },

    production: {
        client: 'pg',
        connection: prodDbConnection,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    }
};
