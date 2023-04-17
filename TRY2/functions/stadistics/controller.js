const db = require('../db');
const queries = require('./queries')

const getEnfermedades = (req, res) => { 
    db.query(queries.enfermedadesLetales , (err, result) => { 
        res.json(result.rows)
    })
} 
const getMedicos = (req, res) => {  
    db.query(queries.mejorMedico , (err, result) => { 
        res.json(result.rows)
    } )
}
const getCentros = (req, res) => {  
    db.query(queries.centrosMasUsados , (err, result) => {  
        res.json(result.rows)
    } ) 
} 
const getMedicina = (req, res) => {  
    db.query(queries.medicinaMasUsados , (err, result) => {
        res.json(result.rows)
    })
}
module.exports = {
    getEnfermedades , getMedicos , getCentros , getMedicina
}