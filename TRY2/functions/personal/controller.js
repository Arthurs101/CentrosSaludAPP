const queries = require('./query');
const db = require('../db');


const addPersonal =(req,res) => {
    data = req.body
    if (data.tipo == 'MEDICO') {
        db.query(queries.addPersonal, [data.idCentro, data.tipo , data.nombres , data.apellidos ], (error, result) => {
            if (error) throw error;  
        })
        db.query(queries.searchPersonal([["nombres", data.nombres], ["apellidos",data.apellidos]]) , (error, result) => {
            if (error) { throw error; }
            else {
                let id = result.rows[0]["id"] //retrieving personal id from database
                db.query(queries.addMedico ,[data.colegiado , id ,data.direccion, data.telefono , data.especialidad] , (error, result) => {
                    if (error) { throw error; } else{
                        //Asignarlo al centro de salud
                        const date = new Date();
                        const formattedDate = date.toISOString().slice(0, 10);
                        console.log(formattedDate);
                    db.query(queries.traslado, [data.colegiado, data.idCentro, formattedDate ], (error, result) => {
                        if (error) { throw error; }
                    })
                    };
                })
                res.send(`SUCCES: DATA INSERTED `)
            } ;
        })
       
    } else {
        db.query(queries.addPersonal, Object.values(data), (error, result) => {
            if (error) throw error;

        })
    }
    db.query(queries.HISTORY , ['INSERT', JSON.stringify(data)] , (error, result) => {if (error) throw error;})
}
const HacerTraslado = (req,res) => {
    if (!!req.query.coleg && !!req.query.centroid && !!req.query.date) {
        db.query(queries.traslado, [req.query.coleg , req.query.centroid ,req.query.date] , (err, response) => {
            if (err) throw err;
        }
        )
                db.query("CALL updatePersonal()"); //SIEMPRE ACTUALIZAR EL PERSONAL
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/pages/home.html');
        })
    }else {
        res.send(`missing Arguments:`)
    }

}
const obtenerPersonal = (req, res) => { 
    if(!!req.query.idcentro){
        db.query(queries.searchPersonal(Object.entries(req.query)) ,  (err, response) => { 
            if (err) throw err;
            res.json(response.rows)
        })
    }
}
const getCentros = (req, res) => { 
    db.query("SELECT * FROM public.centro_salud", (err, response) => {
        if (err) throw err;
        res.json(response.rows)
    })
}
module.exports = {
    addPersonal,
    HacerTraslado,
    obtenerPersonal,
    getCentros
}