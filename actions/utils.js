const screenshot = require('screenshot-desktop')

module.exports.takeScreenshot = (dst) => {
  return new Promise((resolve, reject) => {
    screenshot({
      filename: dst,
      format: 'png'
    }).then(() => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports.sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
