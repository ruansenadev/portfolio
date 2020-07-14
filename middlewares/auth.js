const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  try {
    let token = req.headers.authorization.split(' ')[1]
    token = jwt.verify(token, process.env.TOKEN_SECRET)
    req.account = {_id: token.id, email: token.email}
    next()
  } catch (error) {
    return res.status(401).json({message: 'Falha na autenticação'})
  }
}
