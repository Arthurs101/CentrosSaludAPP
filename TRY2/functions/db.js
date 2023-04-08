const Pool = require('pg').Pool;
const pool = new Pool( {
    user : "claqhgef",
    host : "queenie.db.elephantsql.com",
    database : "claqhgef",
    password : "ht3tPpcivSG0WuTUUzkzwWOwK-p1DYgK",
    port: 5432
}
)
module.exports = pool