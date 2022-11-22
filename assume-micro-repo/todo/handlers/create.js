const fs = require('fs')
const { taskFPath } = require('../config/constants')

const isFileExists = () => {
  return fs.existsSync(taskFPath)
}

const createTask = ({ task, status, priority }) => {
  let error = null
  try {
    
    if(!isFileExists()) {
      fs.writeFileSync(taskFPath, JSON.stringify({}))
    }

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    const json = JSON.parse(String(content))
    json[Date.now()] = { task, status, priority }
    fs.writeFileSync(taskFPath, JSON.stringify(json))
    
  } catch(err) {
    console.log('Error : ', err.message)
    error = err.message
  }

  return error
}

module.exports = createTask