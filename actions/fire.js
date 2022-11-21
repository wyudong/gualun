const fs = require('fs')
const robot = require('robotjs')
const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const config = require('./config')

const { KEY_FIRE, INTERVAL_FIRE, FLAG_FIRE, FIRE_DESKTOP, FIRE_SAMPLE, FIRE_STANDARD } = config
const path = `./${FLAG_FIRE}`

module.exports.fire = async () => {
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
  const bitmap = fs.readFileSync(FIRE_SAMPLE);
  return new Buffer(bitmap).toString('base64');
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

/* eslint-disable-next-line  require-await */
async function isReady () {
  try {
    await takeScreenshot(FIRE_DESKTOP)
    const desktop = await Jimp.read(FIRE_DESKTOP)
    const { width, height } = desktop.bitmap
    await desktop.crop(width - 30, height - 67, 26, 17).writeAsync(FIRE_SAMPLE)

    const sample = await Jimp.read(FIRE_SAMPLE)
    const standard = await Jimp.read(FIRE_STANDARD)
    const thresh = 0.1
    const diff = Jimp.diff(sample, standard, thresh)
    console.log(`diff=${diff.percent}`)

    if (diff.percent < 0.05) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(err)
    return false
  }
}
