const queries = require('./pacienteQueries');
const db = require('../db')
const addPaciente = (req,res) => {
    db.query(
        queries.addPaciente ,Object.values(req.body) , (err,result) => {
            if (err) { res.send(err) }
            else{
                res.send(`Data Inserted: ${Object.values(req.body)}`)
            }
        }
    );
}
const getAllPacientes = (req, res) => {
    db.query(queries.getAll , (err,result) => {
        if (err) { res.json(err) }
        else { res.json(result.rows) }
    })
}
const getFullReport = (req, res) => {}

module.exports = {
    addPaciente,
    getAllPacientes
}