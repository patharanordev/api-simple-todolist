const request = require('./request')

const parseReqParams = (query) => {
  let params = ''
  if(query) {
    params += '?'
    Object.keys(query).map((k, i) => {
      if(i>0) { params += '&' }
      params += `${k}=${query[k]}`
    })
  }
  return params
}

module.exports = async (req, res, next) => {
  const query = req.query
  const params = parseReqParams(query)
  const config = {
    url: `http://todo:3000/${req.params?.handler}${params}`,
    method: req.method,
    data: req.body
  }

  const response = await request(config)
  res.status(response.status).json(response)
}