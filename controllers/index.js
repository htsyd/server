const { User } = require('../models')
const PasswordHelper = require('../helpers/passwordhelper')
const JwtHelper = require('../helpers/jwthelper')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    let payload;
    // console.log(req.body);
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload()
      // console.log(payload.email,'<<< INI COY');
      return User.findOne({
        where: {
          email: payload.email
        }
      })
      .then(user => {
        if (user) {
          // console.log(user);
          return user
        } else {
          
          return User.create({
            email: payload.email,
            password: process.env.GOOGLE_PASS,
            name: payload.name
          })
        }
      })
      .then(user => {
        const access_token = JwtHelper.generateToken({ email: user.email, id: user.id })
        console.log(access_token);
        res.status(200).json({access_token})
      })
    })
    .catch(err => {
      res.status(500).json({ msg:" Internal server error "})
    })
  }

  static async fetchNews(req, res, next) {
    try{
      const news = await axios({
        url: `https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.NYAPIKEY}`,
        method: 'GET'
      })
      const data = news.data.results.map(element => {
        console.log(element.multimedia[0][1]);
        const obj = {
          title: element.title,
          abstract: element.abstract,
          url: element.url,
          thumbnail_standard: element.multimedia
        }
        return obj
      })
      res.status(200).json(data[Math.floor(Math.random()*data.length)])
    } catch(error){
      next(error)
    }
  }

  static async fetchCovidNews(req, res, next) {
    try{
      const news = await axios({
        url: `https://api.covid19api.com/summary`,
        method: 'GET'
      })
      let indonesiaNews
      news.data.Countries.forEach(element => {
        if(element.Country == 'Indonesia') {
          indonesiaNews = {
            NewConfirmed: element.NewConfirmed,
            TotalConfirmed: element.TotalConfirmed,
            NewDeaths: element.NewDeaths,
            TotalDeaths: element.TotalDeaths,
            NewRecovered: element.NewRecovered,
            TotalRecovered: element.TotalRecovered
          }
        }
      });
      res.status(200).json(indonesiaNews)
    } catch(error){
      next(error)
    }
  }

  static async domesticNews(req, res, next) {
    try {
      const news = await axios({
        url: 'https://news.developeridn.com/nasional',
        method: 'GET'
      })
      const result = news.data.data.map(e => {
        const temp = {
          title: `Berita ${e.tipe}`,
          abstract: e.judul,
          url: e.link,
          thumbnail_standard: e.poster
        }
        return temp
      })
      res.status(200).json(result[Math.floor(Math.random()*result.length)])
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller;