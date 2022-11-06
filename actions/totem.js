const fs = require('fs')
const robot = require('robotjs')
const config = require('./config')

const { KEY_TOTEM, INTERVAL_TOTEM, FLAG_TOTEM } = config
const path = `./${FLAG_TOTEM}`

module.exports.totem = () => {
  robot.keyTap(KEY_TOTEM)
  console.log(`press ${KEY_TOTEM}`)
}

module.exports.auto = (status) => {
  if (status) {
    if (fs.existsSync(path)) {
      return
    }

    fs.writeFileSync(path, '')
    global.totemInterval = setInterval(() => {
      robot.keyTap(KEY_TOTEM)
      console.log(`press ${KEY_TOTEM} repeatedly`)
    }, INTERVAL_TOTEM)
    console.log('totem auto on')
  } else if (fs.existsSync(path)) {
    fs.unlinkSync(path)
    clearInterval(global.totemInterval)
    console.log('totem auto off')
  }
}
