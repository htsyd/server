const bcrypt = require('bcryptjs')

class PasswordHelper {

  static hashPassword(plain) {
    const salt = bcrypt.genSaltSync(process.env.SALT)

    return bcrypt.hashSync(plain, salt)
  }

  static comparePassword(plain, hash) { //plain password dari req.body.password , data.passowrd (dari db)
    return bcrypt.compareSync(plain, hash)
  }

}

module.exports = PasswordHelper