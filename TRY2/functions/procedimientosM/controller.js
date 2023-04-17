const queries = require('./query');
const db = require('../db');

const getCirujias = (req, res) => {
    if(!!req.query.centroid) {
        db.query(queries.getCirujias, [req.query.centroid] , (err,result) => {
            if(err) throw err;
            res.status(200).json(result.rows)
        } )
    }
}
const getDiagnosticos = (req, res) => {
    if(!!req.query.centroid) {
        db.query(queries.getDiagnosticos, [req.query.centroid] , (err,result) => {
            if(err) throw err;
            res.status(200).json(result.rows)
        } )
    }
}
const getTratamientos = (req, res) => { 
    if(!!req.query.centroid) {
        db.query(queries.getTratamientos, [req.query.centroid] , (err,result) => {
            if(err) throw err;
            res.status(200).json(result.rows)
        } )
    }
}
const getExamns = (req, res) => {
    if(!!req.query.centroid) {
        db.query(queries.getExamenes, [req.query.centroid] , (err,result) => {
            if(err) throw err;
            res.status(200).json(result.rows)
        } )
    }
}

const addCirujia = (req, res) => {
    console.log(Object.values(req.body))
    db.query(queries.addCirujia , Object.values(req.body), (err, result) => {
        if(err) throw err;
        res.send('ADDED')
    })
}
const addDiagnostico = (req, res) => {
    db.query(queries.addDiagnostico , Object.values(req.body), (err, result) => {
        if(err) throw err;
        res.send('ADDED')
    })
}
const addTratamiento = (req, res) => {
    db.query(queries.addTratamiento, Object.values(req.body), (err, result) => {
        if(err) throw err;
        res.send('ADDED')
    })
}
const addExamen = (req, res) => {
    db.query(queries.addExamen , Object.values(req.body), (err, result) => {
        if(err) throw err;
        res.send('ADDED')
    })
}


const getHandler = (req, res) => { 
    if(!!req.query.centroid && !!req.query.type){
        switch(req.query.type){
            case "cirujias":
                getCirujias(req, res)
            break;
            case "diagnosticos":
                getDiagnosticos(req, res)
            break;
            case "tratemientos":
                getTratamientos(req, res)
            break;
            case "examenes":
                getExamns(req, res)
            break;
            case "medicamento":
            break;
            default: 
            res.send('INVALID ARGUMENT')
            break;
        }
    }else{
        res.send('MISSING ARGUMENTS')
    }
}
const addMedicamentoSuministrado = (req, res) => { 
    db.query(queries.addMedicamentoSuministrado , Object.values(req.body) , (err, res) => {
        if(err) throw err;
    })
}

const postHandler = (req, res) => {
    if(!!req.query.type){
        console.log(req.query.type)
        switch(req.query.type){
            case "cirujias":
                addCirujia(req, res)
                console.log("add CIRujia")
            break;
            case "diagnosticos":
                addDiagnostico(req, res)
            break;
            case "tratemientos":
                addTratamiento(req, res)
            break;
            case "examenes":
                addExamen(req, res)
            break;
            case "medicamento":
                addMedicamentoSuministrado(req, res)
            break;
            default: 
            res.send('INVALID ARGUMENT')
            break;
        }
    }
}

const evolucionGetHandler = (req, res) => { 
    if(!!req.query.type){
        switch(req.query.type) {
            case "tratamiento":
                db.query(queries.getTratamientoEv , req.query.id , (err, result) => {
                    if(err) throw err;
                    res.status(200).json(result.rows)
                })
            break;
            case "cirujia":
                case "tratamiento":
                db.query(queries.getTratamientoEv , req.query.id , (err, result) => {
                    if(err) throw err;
                    res.status(200).json(result.rows)
                })
            break;
            default: 
            res.send('INVALID ARGUMENT')
            break;
        }
    }
}
const evolucionPostHandler = (req,res) => { 
    if(!!req.query.type){
        switch(req.query.type) {
            case "tratamiento":
                case "tratamiento":
                db.query(queries.addTratamientoEV , Object.values(req.body) , (err, result) => {
                    if(err) throw err;
                    res.status(200).json(result.rows)
                })
            break;
            case "cirujia":
                case "tratamiento":
                db.query(queries.addCirujiaEv , Object.values(req.body) , (err, result) => {
                    if(err) throw err;
                    res.status(200).json(result.rows)
                })
            break;
            default: 
            res.send('INVALID ARGUMENT')
            break;
        }
    }
}

module.exports = {
    getHandler, postHandler, evolucionGetHandler, evolucionPostHandler
}