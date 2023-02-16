const robot = require('robotjs')
const _ = require('lodash')
const config = require('../configs/settings')
const configMaps = require('../configs/maps')
const utils = require('./utils')

const { KEY_MAP, KEY_ENTER, POS_GOTO_CONFIRM } = config

robot.setMouseDelay(500)
robot.setKeyboardDelay(500)

module.exports.list = () => {
  return configMaps
}

module.exports.goto = async (name) => {
  let res = {}
  _.forEach(configMaps, (map) => {
    const { places } = map
    const dst = _.find(places, { name })
    if (dst) {
      res = dst
      return false
    }
  })

  if (res) {
    const { list, map } = res
    if (list && map) {
      robot.keyTap(KEY_MAP)
      await utils.sleep(500)
      robot.moveMouse(list.x, list.y)
      robot.mouseClick('left', true)
      robot.moveMouse(map.x, map.y)
      robot.mouseClick('left', true)
      await utils.sleep(500)
      robot.moveMouse(POS_GOTO_CONFIRM.x, POS_GOTO_CONFIRM.y)
      robot.mouseClick('left', false)
    }
  }
}
