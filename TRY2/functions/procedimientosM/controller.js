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
    db.query(queries.addCirujia , Object.values(req.body), (err, res) => {
        if(err) throw err;
    })
}
const addDiagnostico = (req, res) => {
    db.query(queries.addDiagnostico , Object.values(req.body), (err, res) => {
        if(err) throw err;
    })
}
const addTratamiento = (req, res) => {
    db.query(queries.addTratamiento, Object.values(req.body), (err, res) => {
        if(err) throw err;
    })
}
const addExamen = (req, res) => {
    db.query(queries.addExamen , Object.values(req.body), (err, res) => {
        if(err) throw err;
    })
}


const getHandler = (req, res) => { 
    if(!!req.query.centroid && !!req.query.type){
        switch(req.query.type){
            case "cirujias":
                getCirujias
            break;
            case "diagnosticos":
                getDiagnosticos
            break;
            case "tratemientos":
                getTratamientos
            break;
            case "examenes":
                getExamns
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
        switch(req.query.type){
            case "cirujias":
                addCirujia
            break;
            case "diagnosticos":
                addDiagnostico
            break;
            case "tratemientos":
                addTratamiento
            break;
            case "examenes":
                addExamen
            break;
            case "medicamento":
                addMedicamentoSuministrado
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