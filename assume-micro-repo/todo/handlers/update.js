const fs = require('fs')
const { taskFPath } = require('../config/constants')

const isFileExists = () => {
  return fs.existsSync(taskFPath)
}

const updateTaskById = ({ id, task, status, priority }) => {
  let json = {}

  try {
    
    if(!isFileExists()) {
      fs.writeFileSync(taskFPath, JSON.stringify({}))
    }

    const content = fs.readFileSync(taskFPath, { encoding:'utf-8' })
    json = JSON.parse(String(content))

    if(json.hasOwnProperty(id)) {
      json[id].task = task
      json[id].status = status
      json[id].priority = priority
      fs.writeFileSync(taskFPath, JSON.stringify(json))
    }
    
  } catch(err) {
    console.log('Error : ', err.message)
  }

  return json[id]
}

module.exports = {
  updateTaskById
}
