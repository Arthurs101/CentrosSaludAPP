const getAll = "SELECT * FROM ENFERMEDADES"
const getID = (id) => {return `SELECT * FROM ENFERMEDADES WHERE id = ${id}`}
const getByNameType = (name,type) => {
    let query = "SELECT * FROM ENFERMEDADES"
    if (!!name) {
        query +=  ` WHERE nombre LIKE '%${name}%'`
        if (!!type) {
            query += ` AND tipo LIKE '%${type}%'`
        }
    } else if (!!type) {
        query += ` WHERE tipo LIKE '%${type}%'`
    }
    return query
}
module.exports  = {
    getAll,
    getID,
    getByNameType
}