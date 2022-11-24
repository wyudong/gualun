const bodyParser = require('body-parser')
const morgan = require('morgan')
const randomstring = require('randomstring')
const rateLimit = require('express-rate-limit')
const app = require('express')()
const { fire, auto: autoFire, status: fireStatus } = require('../actions/fire')
const { totem, auto: autoTotem } = require('../actions/totem')
const { rebirth } = require('../actions/rebirth')
const { teleport } = require('../actions/teleport')
const { sos } = require('../actions/sos')
const { home } = require('../actions/home')
const { channel } = require('../actions/channel')
const { list, goto } = require('../actions/map')
const { trade } = require('../actions/trade')

const allowlist = ['/maps']

const accessCode = randomstring.generate({
  length: 3,
  charset: 'numeric'
})
global.accessCode = accessCode
console.log(`access: ${accessCode}`)

app.enable('trust proxy')

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 sec
  max: 4, // limit each IP to 4 requests per window
  standardHeaders: true,
  legacyHeaders: false
})

app.use(morgan('[:date[clf]] :remote-addr :method :url :status - :response-time ms'))
app.use(limiter)
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (allowlist.includes(req.path)) {
    return next()
  }
  if (req.headers['x-access'] && req.headers['x-access'] === global.accessCode) {
    return next()
  }
  res.sendStatus(401)
})

app.get('/ping', (req, res) => {
  res.send('pong')
})
app.post('/fire', (req, res) => {
  fire()
  res.send('ok')
})
app.post('/auto/fire', (req, res) => {
  const { status } = req.body
  autoFire(status)
  res.send('ok')
})
app.get('/fire/status', async (req, res) => {
  const status = await fireStatus()
  res.setHeader('Last-Modified', (new Date()).toUTCString())
  res.send(status)
})
app.post('/totem', (req, res) => {
  totem()
  res.send('ok')
})
app.post('/auto/totem', (req, res) => {
  const { status } = req.body
  autoTotem(status)
  res.send('ok')
})
app.post('/auto/off', (req, res) => {
  autoTotem(false)
  autoFire(false)
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
app.post('/channel', (req, res) => {
  const { from, to } = req.body
  channel(from, to)
  res.send('ok')
})
app.get('/maps', (req, res) => {
  const data = list()
  res.json(data)
})
app.post('/goto', (req, res) => {
  const { destination } = req.body
  goto(destination)
  res.send('ok')
})
app.post('/trade', (req, res) => {
  trade()
  res.send('ok')
})

module.exports = app
