const robot = require('robotjs')

module.exports.totem = function () {
  setTimeout(() => {
    console.log('tap f9')
    robot.keyTap('f9')
  }, 2000)
}
