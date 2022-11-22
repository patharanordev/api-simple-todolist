const express = require("express");
const bodyParser = require("body-parser")
const healthcheckHandler = require('./handlers/healthcheck')
const taskHandler = require('./handlers/task')

const PORT = 3000;

const app = express();

app.use(express.json())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/healthz', healthcheckHandler)
app.all('/task', taskHandler)

app.listen(PORT, () => {
  console.log(`Todo service listening on port ${PORT}...`)
})