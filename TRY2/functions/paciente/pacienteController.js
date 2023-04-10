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
const getFullReport = (req, res) => {
    let id = req.query.id;
    let report =  {
        cirujias,
        diagnosticos, 
        tratamientos,
        examenes,
        adicciones,
        geneticas,
    }
    if(!!id) {
        db.query(queries.getSurgery,[id], (err,result) => {
            if (err) { res.send(err.message) }else { 
                report.cirujias = result.rows
            }
        })
        db.query(queries.getDiagnosticos, [id],(err,result) => {
            if (err) { res.send(err.message) }else { 
                report.diagnosticos = result.rows
            }
        })
        db.query(queries.getTreatments, [id] ,(err,result) => {
            if (err) { res.send(err.message) }else { 
                report.tratamientos = result.rows
            }
        })
        db.query(queries.getExams, [id] ,(err,result) => {
            if (err) { res.send(err.message) }else { 
                report.examenes = result.rows
            }
        })
        db.query(queries.getAdicciones, [id] ,(err,result) => {
            if (err) { res.send(err.message) }else { 
                report.adicciones = result.rows
            }
        })
        db.query(queries.getGeneticas, [id] ,(err,result) => {
            if (err) { res.send(err.message) }else { 
                report.geneticas = result.rows
            }
        })
        res.json(report)
    }

}

module.exports = {
    addPaciente,
    getAllPacientes,
    getFullReport
}