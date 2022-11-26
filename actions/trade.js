const robot = require('robotjs')
const config = require('./config')

const {
  POS_TRADE_ACCEPT,
  POS_TRADE_EXCHANGE,
  POS_TRADE_CONFIRM,
  POS_TRADE_END,
  KEY_ENTER
} = config
robot.setMouseDelay(500)
robot.setKeyboardDelay(500)

module.exports.trade = () => {
  console.log('trade')
  robot.moveMouse(POS_TRADE_ACCEPT.x, POS_TRADE_ACCEPT.y)
  robot.mouseClick('left', false)

  setTimeout(() => {
    robot.moveMouse(POS_TRADE_EXCHANGE.x, POS_TRADE_EXCHANGE.y)
    robot.mouseClick('left', false)
    robot.keyTap(KEY_ENTER)
  }, 2000)

  setIntervalX(() => {
    robot.moveMouse(POS_TRADE_CONFIRM.x, POS_TRADE_CONFIRM.y)
    robot.mouseClick('left', false)
  }, 5000, 5)

  setTimeout(() => {
    robot.moveMouse(POS_TRADE_END.x, POS_TRADE_END.y)
    robot.mouseClick('left', false)
    robot.keyTap('i')
  }, 28000)
}

function setIntervalX (callback, delay, repetitions) {
  let x = 0
  const intervalID = setInterval(() => {
    callback()
    if (++x === repetitions) {
      clearInterval(intervalID)
    }
    console.log(`try to confirm #${x}`)
  }, delay)
}
