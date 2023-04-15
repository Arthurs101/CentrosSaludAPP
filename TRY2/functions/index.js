const functions = require("firebase-functions");
const enf = require("./enfermedades/routesEnfermedad");
const users = require("./users/routes");
const paciente = require("./paciente/routesPaciente");
const personal = require('./personal/routes')
const procedimientos = require("./procedimientosM/routes")
const inventario = require("./Abastecimientos/routes")

var express = require("express");
var app = express();
var db = require("./db");

db.query("CALL updatePersonal()"); //SIEMPRE ACTUALIZAR EL PERSONAL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
})
app.use("/enf", enf)
app.use("/user", users);
app.use("/pac" , paciente);
app.use('/personal' , personal)
app.use('/procedimientos' , procedimientos)
app.use('/inventario',inventario)
exports.app = functions.https.onRequest(app)
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
