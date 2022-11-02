const bodyParser = require('body-parser')
const morgan = require('morgan')
const randomstring = require('randomstring')
const app = require('express')()
const { fire, auto: fireAuto } = require('../actions/fire')
const { totem, auto: totemAuto } = require('../actions/totem')
const { rebirth } = require('../actions/rebirth')
const { teleport } = require('../actions/teleport')
const { sos } = require('../actions/sos')
const { home } = require('../actions/home')

const accessCode = randomstring.generate({
  length: 4,
  charset: 'numeric',
})
global.accessCode = accessCode
console.log(`access: ${accessCode}`)

app.use(bodyParser.json())
app.use(morgan('[:date[clf]] :remote-addr :method :url :status - :response-time ms'))
app.use((req, res, next) => {
  if (req.headers['x-access'] && req.headers['x-access'] === global.accessCode) next()
  res.sendStatus(401)
})

app.post('/fire', (req, res) => {
  fire()
  res.send('ok')
})
app.post('/fire/auto', (req, res) => {
  const { status } = req.body
  fireAuto(status)
  res.send('ok')
})
app.post('/totem', (req, res) => {
  totem()
  res.send('ok')
})
app.post('/totem/auto', (req, res) => {
  const { status } = req.body
  totemAuto(status)
  res.send('ok')
})
app.post('/auto/disable', (req, res) => {
  totemAuto(false)
  fireAuto(false)
  res.send('ok')
})
app.post('/rebirth', (req, res) => {
  rebirth()
  res.send('ok')
})
app.post('/teleport', (req, res) => {
  teleport()
  res.send('ok')
})
app.post('/sos', (req, res) => {
  sos()
  res.send('ok')
})
app.post('/home', (req, res) => {
  home()
  res.send('ok')
})

module.exports = app
