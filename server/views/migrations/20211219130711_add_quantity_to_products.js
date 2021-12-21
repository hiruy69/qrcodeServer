
exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
          table.increments('id').primary();
          table.string('name', 255)
          table.string('phone', 255);
          table.string('username', 255).unique().notNullable();
          table.string('password', 255);
          table.string('address', 255).notNullable();
          table.string('shopname', 255).notNullable();
          table.string('price', 255).notNullable().defaultTo("13");
          //table.timestamps().notNullable().defaultTo(knex.fn.now());
        });
    };
    
    exports.down = function(knex) {
        return knex.schema
        .dropTable('users');
    };
    