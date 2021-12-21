let uuidGenerationRaw = connection.client.config.client === 'sqlite3' ? 
`(lower(hex(randomblob(12))) || '-' || lower(hex(randomblob(10))) || '-4' || substr(lower(hex(randomblob(8))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(8))),2) || '-' || lower(hex(randomblob(6))))` :
`uuid_generate_v4()`;

exports.up = function(knex) {
    return knex.schema
        .createTable('tickets', function (table) {
          table.uuid('id').unique().primary().defaultTo(knex.raw('(UUID())'));
          table.string('type', 255);
          table.string('ticket_owner', 255);
          //table.string('password', 255);
          table.string('address', 255);
          table.boolean('scaned_status', 255).notNullable().defaultTo(false);
          table.string('price', 255).notNullable().defaultTo("200");
          //table.timestamps('created_at').notNullable().defaultTo(knex.fn.now());
        });
    };
    
    exports.down = function(knex) {
        return knex.schema
        .dropTable('tickets');
    };
    