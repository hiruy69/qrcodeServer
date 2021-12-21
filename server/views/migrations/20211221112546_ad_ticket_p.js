
const { v4: uuidv4 } = require('uuid');
exports.up = function(knex) {

        return knex.schema.table('tickets', function(t) {
            t.uuid('id').unique().primary().defaultTo(uuidv4())
        });

};

exports.down = function(knex) {
  
};
