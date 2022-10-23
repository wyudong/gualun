const robot = require('robotjs')

module.exports.fire = function () {
  setTimeout(() => {
    console.log('tap f10')
    robot.keyTap('f10')
  }, 2000)
}
