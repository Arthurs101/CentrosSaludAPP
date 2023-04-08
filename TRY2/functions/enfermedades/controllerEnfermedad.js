const queries = require('./queriesEnfermedad');
const db = require('../db')
const validSearchParams = ['id', 'name', 'type']
//metodos

const getAll = (req, res) => {
    db.query(queries.getAll , (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    })
}
const Searcher = (req, res) => {
 let id = req.query.id
 let name = req.query.name
 let type = req.query.type
 if(!!id){
    db.query(queries.getID(id) ,  (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    })
 }
 else if(!!name || !!type){
    console.log(queries.getByNameType(name,type))
    db.query(queries.getByNameType(name,type), (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    })
 } else {
    errorMessage = {error: "INVALID ARGUMENTS", message:`MISSING ARGUMENTS OR USING INVALID ONES.. VALID: ${validSearchParams}`}
    res.send()
 }
}

const addEnfermedad = (req, res) => { 
    const {nombre, tipo  ,observacion } = req.body;
    db.query(queries.AddIllnes , [nombre,  tipo , observacion,] , (err,result) => {
        if (err) {res.send("HUBO UN ERROR, LA ENFERMEDAD PUEDE QUE YA EXISTA")}
        else {res.send('AÑADIDO') }
    })
}

module.exports = {
    getAll ,
    Searcher,
    addEnfermedad 
}