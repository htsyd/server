const JwtHelper = require('../helpers/jwthelper')
const { User } = require('../models')

module.exports = async (req, res, next) => {

  const token = req.headers.access_token
  let access_token;
  try {
    access_token = JwtHelper.decode(token) // {id,email}
  } catch (error) {
    next({ status: 401, message: 'please login first' })
  }

  try {
    if (access_token) {
      const user = User.findOne({ where: { id: access_token.id } })

      if (user) {
        req.currentuser = access_token
        next();
      } else {
        next({ status: 401, message: 'please login first' })
      }
    } else {
      next({ status: 401, message: 'please login first' })
    }
  } catch (error) {
    next({ status: 500, message: 'internal server error' })
  }
}