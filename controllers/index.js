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
          status: 404,
          message: "Invalid Account!"
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

  static async register(req, res, next) {
    try {
      const data = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      res.status(200).json({ id: data.id, name: data.name, email: data.email})
    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next) {

  }
  static fetchNews(req, res, next) {

  }

}

module.exports = Controller;