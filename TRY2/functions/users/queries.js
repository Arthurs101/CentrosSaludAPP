const login = (username, password) => { return `SELECT * FROM login('${username}', '${password}')` };
const signup = (username, password, personal_id) => { return `SELECT * FROM signup('${username}', '${password} , '${personal_id}')` };
module.exports = {
    login,
    signup
}