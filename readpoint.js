const robot = require('robotjs')

function main () {
  setInterval(() => {
    const mouse = robot.getMousePos()
    console.log(`Mouse is at x: ${mouse.x} y: ${mouse.y}`)
  }, 1000)
}

main()
