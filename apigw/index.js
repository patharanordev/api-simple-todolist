const express = require('express')
const app = express()

const healthcheckHandler = require('./handlers/healthcheck')
const todoHandler = require('./handlers/todo')

const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
  next()
})

app.all('/todo/:handler', todoHandler)
app.get('/healthz', healthcheckHandler)

app.listen(PORT, () => {
  console.log(`Beedee's gateway listening on port ${PORT}...`)
})