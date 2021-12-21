
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('quantity');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('quantity');
    });
};