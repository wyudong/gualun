const robot = require('robotjs')
const config = require('../configs/settings')

const { POS_REBIRTH_1920 } = config

robot.setMouseDelay(500)

module.exports.rebirth = () => {
  console.log('rebirth')
  robot.moveMouse(POS_REBIRTH_1920.x, POS_REBIRTH_1920.y)
  robot.mouseClick('left', true)
}
