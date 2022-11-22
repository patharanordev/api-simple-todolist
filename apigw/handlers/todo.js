const request = require('./request')
module.exports = async (req, res, next) => {
  const response = await request({
    url: 'http://todo', 
    port: 3000, 
    method: req.method, 
    params: req.params, 
    data: req.body
  })

  res.status(response.status).json(response)
}