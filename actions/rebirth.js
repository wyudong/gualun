const robot = require('robotjs')
const config = require('./config')

const { POS_REBIRTH_1920 } = config
robot.setMouseDelay(100)

module.exports.rebirth = () => {
  console.log('rebirth')
  robot.moveMouseSmooth(POS_REBIRTH_1920.x, POS_REBIRTH_1920.y)
  robot.mouseClick('left', true)
}
