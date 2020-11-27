require('dotenv').config()
const express = require('express')
const app = express();
const port = 3000
const cors = require('cors');
const MainRouter = require('./routers')
const errorHandler = require('./middlewares/errorhandler')

app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use('/',MainRouter)
app.use(errorHandler)

app.listen(port, () => console.log(`this app running at http://localhost:${port}`))