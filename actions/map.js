const robot = require('robotjs')
const _ = require('lodash')
const config = require('../configs/settings')
const configMaps = require('../configs/maps')

const { KEY_MAP, KEY_ENTER } = config

robot.setMouseDelay(500)
robot.setKeyboardDelay(500)

module.exports.list = () => {
  return configMaps
}

module.exports.goto = (name) => {
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
      setTimeout(() => {
        robot.moveMouse(list.x, list.y)
        robot.mouseClick('left', true)
        robot.moveMouse(map.x, map.y)
        robot.mouseClick('left', true)
        setTimeout(() => {
          robot.keyTap(KEY_ENTER)
        }, 500)
      }, 500)
    }
  }
}
