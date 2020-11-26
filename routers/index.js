const router = require('express').Router();
const controller = require('../controllers');
const authentication = require('../middlewares/authentication')

router.get('/',(req,res)=>{res.send('asdsad')})
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/googleLogin', controller.googleLogin)
router.use(authentication)
router.get('/news', controller.fetchNews)
router.get('/covid', controller.fetchCovidNews)

module.exports = router