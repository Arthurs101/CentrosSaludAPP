const queries = require('./pacienteQueries');
const db = require('../db')
const addPaciente = (req,res) => {
    let message = ""
    db.query(
        queries.addPaciente ,Object.values(req.body) , (err,result) => {
            if (err) { throw err }
            else{
                res.send(`Data Inserted: ${Object.values(req.body)}`)
            }
        }
    );
    db.query(queries.HISTORY , ['INSERT' , JSON.stringify(req.body) ], (err,result) => {
        if (err) {throw err} else {
          
        }
    });

}
const updatePaciente = (req,res) => { 
    db.query(queries.updatePaciente , Object.keys(req.body) , (err,result) => {
        if (err) throw err;
        res.send(`Data Updated:`)
    })
    db.query(queries.HISTORY , ['UPDATE' , JSON.stringify(req.body)])
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
const getPaciente = (req, res) => {
    if(!!req.query.id){
        db.query(queries.getPacientID, [req.query.id] ,(err,result) => {
            if (err) throw err;
            request.send(200).json(result.rows)
        })
        
    } else if(!!req.query.name){
        if(!!req.query.lastname){
            db.query(queries.getPacienteFullName , [req.query.name] ,(err,result) => { 
                if (err) throw err;
                request.send(200).json(result.rows)
            })
            
        }else{
            db.query(queries.getPacienteName , [req.query.name] ,(err,result) => { 
                if (err) throw err;
                request.send(200).json(result.rows)
            })
        }   

    } else if(!!req.query.lastname){
        db.query(queries.getPacienteLastName , [req.query.name] ,(err,result) => { 
            if (err) throw err;
            request.send(200).json(result.rows)
        })
    }
}
const getReport = (req, res) => { 
    if(!!req.query.id){
        let type = req.query.type;
        switch(type){
            case "adiccion":
                db.query(queries.getAdicciones , [req.query.id] ,(err,result) => {
                    if (err) throw err;
                    request.send(200).json(result.rows)
                })
            break;
            case "diagnostico":
                if(!!req.query.id){
                    db.query(queries.getAdicciones , [req.query.id] ,(err,result) => {
                        if (err) throw err;
                        request.send(200).json(result.rows)
                    })
                }
            break;
            case  "tratamiento":
                if(!!req.query.id){
                    db.query(queries.getAdicciones , [req.query.id] ,(err,result) => {
                        if (err) throw err;
                        request.send(200).json(result.rows)
                    })
                } 
                break;
            case "examen":
                if(!!req.query.id){
                    db.query(queries.getAdicciones , [req.query.id] ,(err,result) => {
                        if (err) throw err;
                        request.send(200).json(result.rows)
                    })
                }
                break;
            case "genetica":
                if(!!req.query.id){
                    db.query(queries.getAdicciones , [req.query.id] ,(err,result) => {
                        if (err) throw err;
                        request.send(200).json(result.rows)
                    })
                }
            break;
            case "completo":
                getFullReport()
            break;

        }
        
    }
}

module.exports = {
    addPaciente,
    getAllPacientes,
    getPaciente,
    updatePaciente,
    getReport

}