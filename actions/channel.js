const fs = require('fs')
const robot = require('robotjs')
const Jimp = require('jimp')
const config = require('../configs/settings')
const utils = require('./utils')

const {
  KEY_ESCAPE,
  KEY_UP,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_ENTER,
  POS_PLAYER_HUD,
  POS_CHANNEL_CONFIRM,
  CHANNEL_MIN,
  CHANNEL_MAX,
  CHANNEL_INFO,
  CHANNEL_CROP
} = config

robot.setMouseDelay(250)
robot.setKeyboardDelay(250)

module.exports.getChannel = async () => {
  robot.moveMouse(0, 0) // channel info will not update if mouse not move
  robot.moveMouse(POS_PLAYER_HUD.x, POS_PLAYER_HUD.y)
  await utils.sleep(500)
  await utils.takeScreenshot(CHANNEL_INFO)
  const channelInfo = await Jimp.read(CHANNEL_INFO)
  const { width, height } = channelInfo.bitmap
  await channelInfo.crop(width - 789, height - 84, 50, 18).writeAsync(CHANNEL_CROP)
  const b64 = fs.readFileSync(CHANNEL_CROP, 'base64')
  return b64
}

module.exports.channel = async (from, to) => {
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
  utils.sleep(500)
  robot.moveMouse(POS_CHANNEL_CONFIRM.x, POS_CHANNEL_CONFIRM.y)
  robot.mouseClick('left', false)
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
