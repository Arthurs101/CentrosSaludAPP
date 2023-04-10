const login = (username, password) => { return `SELECT * FROM login('${username}', '${password}')` };
const signup = (username, password, personal_id) => { return `SELECT * FROM signup('${username}', '${password} , '${personal_id}')` };
const modify = `SELECT * FROM modifyUser ($1, $2, $3, $4 , $5 )`
const getLog = `SELECT * FROM public."bitácora_usuario" WHERE usuario = $1`
const getdetails = `SELECT * FROM public.usuario_plataforma WHERE usuario = $1`
module.exports = {
    login,
    signup,
    modify,
    getLog,
    getdetails,
}