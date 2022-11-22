const express = require("express");
const bodyParser = require("body-parser")
const healthcheck = require('./handlers/healthcheck')

// const aboutRouter = require("./routes/about");
// const weatherRouter = require("./routes/weather");

const PORT = 3000;
// const HOST_NAME = "localhost";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// app.use("/weather", weatherRouter);
// app.use("/about", aboutRouter);

app.get('/healthz', healthcheck)

app.listen(PORT, () => {
  console.log(`Todo service listening on port ${PORT}...`)
})