const fs = require('fs')
const { taskFPath } = require('../config/constants')

const isFileExists = () => {
  return fs.existsSync(taskFPath)
}

const removeTasks = () => {
  let error = null

  try {
    
    fs.writeFileSync(taskFPath, JSON.stringify({}))

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    json = JSON.parse(String(content))
    
  } catch(err) {
    console.log('Error : ', err.message)
    error = err.message
  }

  return error
}

const removeTaskById = (id) => {
  let error = null

  try {
    
    if(!isFileExists()) {
      fs.writeFileSync(taskFPath, JSON.stringify({}))
    }

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    const json = JSON.parse(String(content))
    
    if(json.hasOwnProperty(id)) {
      delete json[id] 
    }
    
    fs.writeFileSync(taskFPath, JSON.stringify(json))
    
  } catch(err) {
    console.log('Error : ', err.message)
    error = err.message
  }

  return error
}

module.exports = {
  removeTasks,
  removeTaskById
}
