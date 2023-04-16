const { onThresholdAlertPublished } = require('firebase-functions/v2/alerts/performance')
const db = require('../db')
const queries = require('./queries')
const { error } = require('firebase-functions/logger')
const getInventarioHandler = (req, res) => {
    if(!!req.query.bodega) {
        switch(req.query.tipo){
            case 'medicina':
                switch(req.query.tipo){ 
                    case "vencimento":
                        db.query(queries.MedicamentosAVencer , [req.query.idcentro] , (error, result) => {
                            if(error) { throw error } else{
                                res.status(200).json(result.rows)
                            }
                        })
                    break;
                    case "escaseando":
                        db.query(queries.MedicamentosAgotarse , [req.query.idcentro] , (error, result) => {
                            if(error) { throw error } else{
                                res.status(200).json(result.rows)
                            }
                        })
                    break;
                    case "lote":
                        db.query(queries.obtnereLotes , [req.query.idcentro] , (error, result) => {
                            if(error) { throw error } else{
                                res.status(200).json(result.rows)
                            }
                        })
                    break; 
                }
            break;
            case 'materiales':
                switch(req.query.tipo) {
                    case "escaseando":
                        db.query(queries.MaterialPorAgotarse , [req.query.idcentro] , (error, result) => {
                            if(error) { throw error } else{
                                res.status(200).json(result.rows)
                            }
                        })
                    break;
                    case "lote":
                        db.query(queries.obtenerMateriales , [req.query.idcentro] , (error, result) => {
                            if(error) { throw error } else{
                                res.status(200).json(result.rows)
                            }
                        })
                    break; 
                }
            break;
            case "medicina_global":
                db.query(queries.todosMedicamentos, (error, result) => {
                    if(error) { throw error } else {
                        res.status(200).json(result.rows)
                    }
                })
            break;
            case "materiales_global":
                db.query(queries.todosMateriales, (error, result) => {
                    if(error) { throw error } else {
                        res.status(200).json(result.rows)
                    }
                })
            break;
            default:
            res.json({ error: 404 , message : "INVALID AEGUMENT QUERY" })
            break;
        }
    }
}
const postInventarioHandler = (req, res) => { 
    if(!!req.query.bodega && !!req.query.tipo)  {
        switch(req.query.bodega){
            case "medicina":
                switch(req.query.tipo){
                    case "lote":
                        db.query(queries.insertarLote, Object.values(req.boddy) , (error, result) => {
                            if(error) throw error;
                        }) 
                    break;
                    case "remover":
                        db.query(queries.restarContenido, Object.values(req.body) , (error, result) => {
                            if(error) throw error;
                        })
                    break;
                }
            break;
            case "materiales":
                switch(req.query.tipo){
                case "lote":
                        db.query(queries.agregarCantidadMateriales, Object.values(req.boddy) , (error, result) => {
                            if(error) throw error;
                        }) 
                    break;
                case "restok":
                    db.query(queries.restockmaterial, Object.values(req.boddy), (error, result) => {
                        if (error) throw error;
                    })
                break;
                case "remover":
                        db.query(queries.removerCantidadMateriales, Object.values(req.body) , (error, result) => {
                            if(error) throw error;
                        })
                    break;
                }
            break;
            case "medicina_global":
                db.query(queries.nuevoMedicamento, Object.values(req.body) , (error, result) => { if(error) throw error;} )
            break;
            case "materiales_global":
                db.query(queries.nuevoMaterial, Object.values(req.body) , (error, result) => { if(error) throw error;} )
            break;
            default: res.json({ error: 404 , message : "INVALID AEGUMENT QUERY" })
            break;
        }
    }
}


module.exports = {
    getInventarioHandler,
    postInventarioHandler,
}