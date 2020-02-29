module.exports = function (err, req, res, next) {
  console.log(err.message, err);
  res.status(500).send({message: 'Internal server error: \n' + err});
}