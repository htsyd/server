const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors');
const MainRouter = require('./routers')

app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.use('/',MainRouter)

app.listen(port,()=>{
  console.log(port);
})

