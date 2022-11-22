module.exports = (req, res) => {
  res.status(200).json({
    status:200,
    error: null,
    data:'Beedee gateway is OK'
  })
}