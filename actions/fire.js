const fs = require('fs')
const robot = require('robotjs')
const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const config = require('./config')

const { KEY_FIRE, INTERVAL_FIRE, FLAG_FIRE, FIRE_DESKTOP, FIRE_SAMPLE } = config
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
  } else if (fs.existsSync(path)) {
    fs.unlinkSync(path)
    clearInterval(global.fireInterval)
    console.log('fire auto off')
  }
}

module.exports.status = async () => {
  await takeScreenshot(FIRE_DESKTOP)
  const desktop = await Jimp.read(FIRE_DESKTOP)
  const { width, height } = desktop.bitmap
  await desktop.crop(width - 35, height - 80, 32, 32).writeAsync(FIRE_SAMPLE)
  const b64 = fs.readFileSync(FIRE_SAMPLE, 'base64')
  return b64
}

function takeScreenshot (dst) {
  return new Promise((resolve, reject) => {
    screenshot({
      filename: dst,
      format: 'png'
    }).then(() => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}
