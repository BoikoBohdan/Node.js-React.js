const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const morgan = require('morgan')
const connectToDb = require('./../db/connect')
const api = require('./../routes/api')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(
  session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)

connectToDb()

app.use('/', api)

app.listen(process.env.PORT || 3000)
