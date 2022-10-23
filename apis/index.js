const bodyParser = require('body-parser')
const app = require('express')()
const { fire } = require('../actions/fire')
const { totem } = require('../actions/totem')

app.use(bodyParser.json())
app.post('/fire', (req, res) => {
  fire()
  res.send('ok')
})
app.post('/totem', (req, res) => {
  totem()
  res.send('ok')
})

module.exports = app
