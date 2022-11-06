const robot = require('robotjs')
const config = require('./config')

const { KEY_ESCAPE, KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_ENTER } = config
const { CHANNEL_MIN, CHANNEL_MAX } = config
robot.setKeyboardDelay(250)

module.exports.channel = (from, to) => {
  console.log(`channel ${from} to ${to}`)
  from = parseInt(from, 10)
  to = parseInt(to, 10)
  if (from === to) {
    return
  }
  if (from < CHANNEL_MIN || from > CHANNEL_MAX) {
    return
  }
  if (to < CHANNEL_MIN || to > CHANNEL_MAX) {
    return
  }

  // open menu
  robot.keyTap(KEY_ESCAPE)
  // select menu
  robot.keyTap(KEY_ENTER)
  // arrow actions
  const arrows = channelsToArrows(from, to)
  for (const arrow of arrows) {
    robot.keyTap(arrow)
  }
  // confirm
  robot.keyTap(KEY_ENTER)
}

function channelsToArrows (from, to) {
  const arrows = []

  const diff = to - from
  const actionY = diff > 0 ? KEY_DOWN : KEY_UP
  const actionX = diff > 0 ? KEY_RIGHT : KEY_LEFT
  const stepY = Math.floor(Math.abs(diff) / 5)
  const stepX = Math.abs(diff) % 5
  for (let i = 0; i < stepY; i++) {
    arrows.push(actionY)
  }
  for (let j = 0; j < stepX; j++) {
    arrows.push(actionX)
  }
  return arrows
}
