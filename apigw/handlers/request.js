const axios = require('axios')

module.exports = async ({ url, method, data }) => {
  let res = { status:502, error:null, data:null }

  const response = await axios({
    method: method,
    url,
    data
  })
  .then(response => ({ data:response.data, error:null }))
  .catch((error) => {
    let response = { data:null, error:null }
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      response.status = error.response.status
      response.error = error.response.data
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      response.error = error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      response.error = error.message
    }

    return response
  })

  if(response.error) {
    const hasSubErrObj = response.error && response.error.hasOwnProperty('error')
    res.status = hasSubErrObj ? response.error.status : response.status
    res.error = hasSubErrObj ? response.error.error : response.error
    res.data = null
  } else {
    res.status = 200
    res.error = null
    res.data = response.data?.data
  }

  return res
}