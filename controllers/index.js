const { User } = require('../models')

class Controller {

  static login(res, req, next) {

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

  static googleLogin(res, req, next) {

  }
  static fetchNews(res, req, next) {

  }

}

module.exports = Controller;