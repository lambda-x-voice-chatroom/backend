require('dotenv').config();
const localPgConnection = {
    host: 'localhost',
    database: 'mike',
    user: 'mike',
    password: ''
};
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

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
