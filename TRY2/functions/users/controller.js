const queries = require('./queries');
const db = require('../db')

const login = (req,res)=>{
    const {username , password} = req.body;
    db.query(queries.login(username, password) ,  (err, result) => {
        if (err) 
        {
           const body =  {user: username, iniciado: false , user_type: "" , error: err.message }
            res.json(body);
        }else{
            res.status(200).json(result.rows);
        }
        
    })
}

const signup = (req, res)=>{ 
    const {username, password , personal_id} = req.body
    db.query(queries.signup(username, password,personal_id) ,  (err, result) => {
        if (err) 
        {
        //    const body =  {user: username, creado: false ,  error: "El usuario ya existe o el dato ingresado no es el correcto"}
            throw err;
        }else{
            const body =  {user: username, creado: true}
            res.status(200).json(body);
        }
        
    })
}
const modify = (req, res) => {
    const {username, password, rol , estado , obervacion} = req.body
    db.query(queries.modify , [username, password, rol , estado , obervacion] , (err, result) => {
        if (err) {
            res.send('HUBO UN ERROR: ' + err.message)
        }
        else {
            res.status(200).json(result.rows);
        }
    })
 }
 const bitácora_usuario = (req, res) => {
    let username = req.query.username;
    if (!!username) {
        db.query(queries.getLog , [username], (err, result) => {
            if (err) { 
                res.send('HUBO UN ERROR: ' + err.message)
            }else {
                res.status(200).json(result.rows)
            }
        })
    }
 }

 const detalles = (req, res) => { 
    let username = req.query.username;
    if (!!username) {
        db.query(queries.getdetails , [username], (err, result) => {
            if (err) { 
                res.send('HUBO UN ERROR: ' + err.message)
            }else {
                res.status(200).json(result.rows)
            }
        })
    }
 }

module.exports = {
    login,
    signup,
    modify,
    bitácora_usuario,
    detalles

}