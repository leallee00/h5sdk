/**
 * 通过向页面中添加图片来判断网络状况
 */
const url = 'https://static.hnyequ.cn/h5/js/pbmsg/connect.png'
var img = new Image()
img.id = 'testImg'
img.style.display = 'none'
document.body.appendChild(img)

// 通过每次更改页面中图片路径，根据图片的onload和onerror事件判断网络状况
export function netstatus () {
  var timeStamp = Date.parse(new Date())
  var imsg = document.getElementById('testImg')
  imsg.setAttribute('src', url + '?timestamp=' + timeStamp)
  return new Promise((resolve, reject) => {
    imsg.onload = () => {
      resolve(true)
    }
    imsg.onerror = () => {
      resolve(false)
    }
  })
}
