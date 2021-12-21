
exports.up = function(knex) {
    return knex.schema
        .createTable('items', function (table) {
          table.increments('id').primary();
          table.string('starttime', 255);
          table.string('endtime', 255);
          table.string('totalprice', 255);
          table.string('shopname', 255);
          //table.string('address', 255).notNullable();
          //table.string('shopname', 255).notNullable();
          //table.string('price', 255).notNullable().defaultTo("13");
          //table.timestamps().notNullable().defaultTo(knex.fn.now());
        });
    };
    
    exports.down = function(knex) {
        return knex.schema
        .dropTable('items');
    };
    