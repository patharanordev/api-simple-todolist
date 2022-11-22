const REQ_METHOD = {
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  DELETE: 'delete'
}

const createTask = require('./create')
const { updateTaskById } = require('./update')
const { getTaskById, getTasks } = require('./get')
const { removeTaskById, removeTasks } = require('./remove')

const listExistTask = (response, error) => {
  if(!error) {
    response.status = 200
    response.data = getTasks()
  } else {
    // Internal process error
    response.status = 422
    response.error = error
  }
  return response
}

const hasTask = (task) => {
  return task && Object.keys(task).length > 0
}

module.exports = (req, res) => {
  const taskObj = req.body
  const method = req.method.toLowerCase()
  let response = { status:502, error:null, data:null }
  let error = null

  switch (method) {

    case REQ_METHOD.POST:
      error = createTask({ ...taskObj })
      response = listExistTask(response, error)
      break;

    case REQ_METHOD.GET:
      if(req.query?.id) {
        response.data = getTaskById(req.query.id)
        response.status = hasTask(response.data) ? 200 : 400
      } else {
        if(req.query?.mode == 'all') {
          response.data = getTasks()
          response.status = 200
        } else {
          response.status = 400
          response.error = 'Unknown mode or specific task ID.'
        }
      }
      break;

    case REQ_METHOD.PATCH:
      if(req.query?.id) {
        response.data = updateTaskById({
          id: req.query.id,
          ...taskObj
        })
        response.status = hasTask(response.data) ? 200 : 400
      } else {
        response.status = 400
        response.error = 'Unknown task ID.'
      }
      break;

    case REQ_METHOD.DELETE:
      if(req.query?.id) {
        error = removeTaskById(req.query.id)
        response = listExistTask(response, error)
      } else {
        if(req.query?.mode == 'all') {
          error = removeTasks()
          response = listExistTask(response, error)
        } else {
          response.status = 400
          response.error = 'Unknown mode or specific task ID.'
        }
      }
      break;

    default:
      response.status = 405
      response.error = `Method ${method} not allow.`
      break;
  }

  res.status(response.status).json(response)
}