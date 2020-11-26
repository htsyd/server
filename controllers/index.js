const { User } = require('../models')
const PasswordHelper = require('../helpers/passwordhelper')
const JwtHelper = require('../helpers/jwthelper')

class Controller {

  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user) {
        throw {
          status: 400,
          message: "Invalid Email/Password"
        }
      } else if (PasswordHelper.comparePassword(req.body.password, user.password)) {
        const object = {
          id: user.id,
          email: user.email,
          name: user.name
        }
        const access_token = JwtHelper.generateToken(object)
        res.status(200).json({ access_token })
      } else {
        throw {
          status: 400,
          message: "Invalid Email/Password"
        }
      }
    }
    catch (err) {
      next(err)
    }
  }

  static register(res, req, next) {

  }
  static googleLogin(res, req, next) {

  }
  static fetchNews(res, req, next) {

  }

}

module.exports = Controller;