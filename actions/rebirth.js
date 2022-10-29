const robot = require('robotjs')
const config = require('./config')

const { POS_REBIRTH_1920, POS_REBIRTH_1366 } = config
robot.setMouseDelay(100)

module.exports.rebirth = () => {
  robot.moveMouseSmooth(POS_REBIRTH_1920.x, POS_REBIRTH_1920.y)
  robot.mouseClick('left', true)
  robot.moveMouseSmooth(POS_REBIRTH_1366.x, POS_REBIRTH_1366.y)
  robot.mouseClick('left', true)
}
