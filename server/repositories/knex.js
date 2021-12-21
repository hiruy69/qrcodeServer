const knex = require('knex')
const path = require('path')

console.log('db.sqlite3')
// const connectKnex = knex({
//     client: "sqlite3",
//     connection:{
//         filename: "../db.sqlite3"
//     }
// })

const connectKnex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "../dev.sqlite3"
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.join(__dirname)
      },
    useNullAsDefault: true
  });

module.exports = connectKnex