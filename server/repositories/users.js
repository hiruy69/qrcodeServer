//const knex = require('./knex')
const knexConfig = require('../knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

console.log('nnnn db.sqlite3')
function createUser(user){
    return knex("users").insert(user);
}

function getUsers(){
    return knex("users").select("*");
}

function getUser(user){
    return knex("users").where(user);
}

function createItem(item){
    return knex("items").insert(item);
}

function getItems(){
    return knex("items").select("*");
}

function getItem(item){
    return knex("items").where(item);
}

function updateUser(item,data){
    return knex("users").where(item).update(data);
}

function updateItem(item,data){
    return knex("items").where(item).update(data);
}

function deleteUser(item){
    return knex("users").where(item).del();
}

function deleteItem(item){
    return knex("items").where(item).del();
}


module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}