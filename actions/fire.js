const fs = require('fs')
const robot = require('robotjs')
const config = require('./config')

const { KEY_FIRE, INTERVAL_FIRE, FLAG_FIRE } = config
const path = `./${FLAG_FIRE}`

module.exports.fire = () => {
  robot.keyTap(KEY_FIRE)
  console.log(`press ${KEY_FIRE}`)
}

module.exports.auto = (status) => {
  if (status) {
    if (fs.existsSync(path)) {
      return
    }

    fs.writeFileSync(path, '')
    global.fireInterval = setInterval(() => {
      robot.keyTap(KEY_FIRE)
      console.log(`press ${KEY_FIRE} repeatedly`)
    }, INTERVAL_FIRE)
    console.log('fire auto on')
  } else {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
      clearInterval(global.fireInterval)
      console.log('fire auto off')
    }
  }
}
