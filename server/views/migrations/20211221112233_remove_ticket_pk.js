
exports.up = function(knex) {
    return knex.schema.table('tickets', function(t) {
        t.dropColumn('id');
    });
};

exports.down = function(knex) {
  
};
