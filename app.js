var express = require('express')
var bodyParser = require('body-parser')
var RandomString = require('randomstring')
var multer = require('multer')
var logger = require('morgan')
var async = require('async')
var sleep = require('sleep')
var db = require('./sql')
var app = express()
var PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(logger('dev'))

app.use('/photo',express.static('photo'))

app.listen(PORT, ()=>{
    console.log('Server Running At '+PORT+' Port!')
})

require('./routes/auth')(app, db, RandomString)
require('./routes/photobook')(app, db, multer, RandomString, async, sleep)