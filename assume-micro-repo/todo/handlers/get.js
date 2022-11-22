const fs = require('fs')
const path = require('path')
const { taskFPath } = require('../config/constants')

const isFileExists = () => {
  return fs.existsSync(taskFPath)
}

const getTasks = () => {
  let json = {}

  try {
    
    if(!isFileExists()) {
      fs.writeFileSync(taskFPath, JSON.stringify({}))
    }

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    json = JSON.parse(String(content))
    
  } catch(err) {
    console.log('Error : ', err.message)
  }

  return json
}

const getTaskById = (id) => {
  let task = {}

  try {
    
    if(!isFileExists()) {
      fs.writeFileSync(taskFPath, JSON.stringify({}))
    }

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    const json = JSON.parse(String(content))
    task = json.hasOwnProperty(id) ? json[id] : {}
    
  } catch(err) {
    console.log('Error : ', err.message)
  }

  return task
}

module.exports = {
  getTasks,
  getTaskById
}
