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
           const body =  {user: username, creado: false ,  error: "El usuario ya existe o el dato ingresado no es el correcto"}
            res.json(body);
        }else{
            const body =  {user: username, creado: true}
            res.status(200).json(body);
        }
        
    })
}

module.exports = {
    login,
    signup
}