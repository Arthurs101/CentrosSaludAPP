const getAll = "SELECT * FROM ENFERMEDADES"
const getID = (id) => {return `SELECT * FROM ENFERMEDADES WHERE id = ${id}`}
const AddIllnes  = "INSERT INTO ENFERMEDADES (nombre,  tipo, observaciones ) values($1 , $2 , $3)"

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
    getByNameType,
    AddIllnes
}