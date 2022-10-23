const bodyParser = require('body-parser')
const app = require('express')()
const { fire } = require('../actions/fire')
const { totem } = require('../actions/totem')
const { rebirth } = require('../actions/rebirth')
const { sos } = require('../actions/sos')
const { home } = require('../actions/home')

app.use(bodyParser.json())
app.post('/fire', (req, res) => {
  fire()
  res.send('ok')
})
app.post('/totem', (req, res) => {
  totem()
  res.send('ok')
})
app.post('/rebirth', (req, res) => {
  rebirth()
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
