const functions = require("firebase-functions");
const enf = require("./enfermedades/routesEnfermedad");
const users = require("./users/routes");

var express = require("express");
var app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
})
app.use("/enf", enf)
app.use("/user", users);
exports.app = functions.https.onRequest(app)
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
