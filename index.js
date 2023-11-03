const express = require('express')
const initApp = require('./index.routes')
const dotenv =require('dotenv')
const path=require('path')
const filename = __filename;
var __dirname = path.dirname(filename)
dotenv.config({ path: path.join(__dirname, '.env') })
const app = express()
const port = 8080
initApp(app ,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))