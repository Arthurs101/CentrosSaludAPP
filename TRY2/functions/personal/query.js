const addPersonal = "INSERT INTO personal(id_centro_salud,tipo,nombres,apellidos) VALUES ($1,$2,$3,$4)"
const addMedico = 'INSERT INTO public."médico" VALUES ($1,$2,$3,$4,$5)'
const traslado = 'CALL trasladar($1,$2,$3) '
const HISTORY = `INSERT INTO bitacora (tabla, tipo, observacion, fecha) VALUES ('PERSONAL',$1, $2, now() )`
const searchPersonal = (entries) => {
    let query = "SELECT * FROM personal"
    switch (entries[0][0] ){
        case "id":
            query += ` WHERE id = ${entries[0][1]}`
        break;
        case "nombres":
            query += ` WHERE nombres = '${entries[0][1]}'`
        break;
        case "apellidos":
            query += ` WHERE apellidos = '${entries[0][1]}'`
        break;
        case "idcentro":
            query += ` WHERE id_centro_salud = ${entries[0][1]}`
        break;
    }
    for (let i = 1; i < entries.length; i++) {
        switch (entries[i][0] ){
            case "id":
                query += ` AND id = ${entries[i][1]}`
            break;
            case "nombres":
                query += ` AND nombres = '${entries[0][1]}'`
            break;
            case "apellidos":
                query += ` AND apellidos = '${entries[i][1]}'`
            break;
            case "idcentro":
                query += ` AND id_centro_salud = ${entries[i][1]}`
            break;
        }
    }    
    
    return query;
}

module.exports = {addPersonal, addMedico, searchPersonal , traslado , HISTORY}
    