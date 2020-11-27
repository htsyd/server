const jwt = require('jsonwebtoken')

class JwtHelper{

  static generateToken(object){//{id,email}
    return jwt.sign(object, process.env.SECRET)
  }

  static decode(token){
    return jwt.verify(token, process.env.SECRET)
  }

}

module.exports = JwtHelper