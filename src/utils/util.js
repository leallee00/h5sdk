var Long = require('long')
// 获取当前本地时间(秒)
export function GetCurLocalTime () {
  return parseInt(new Date().valueOf() / 1000)
}
// 解析返回的消息
export function parseLong (originObj) {
  var parseObj = Object.assign(originObj, {})
  parseObj.srcId = parseObj.srcId ? parseObj.srcId.toNumber() : parseObj.srcId
  parseObj.aimId = parseObj.aimId ? parseObj.aimId.toNumber() : parseObj.aimId
  parseObj.time = parseObj.time ? parseObj.time.toNumber() : parseObj.time
  // parseObj.msgSn = parseObj.msgSn
  return parseObj
}
// 解析礼物消息体
export function parseMsg (originMsg) {
  if (typeof originMsg === 'object') {
    let parseObj = Object.assign(originMsg, {})
    const keysArr = Object.keys(parseObj)
    const parseStrArr = ['userId']
    keysArr.map(e => {
      if (parseStrArr.indexOf(e) !== -1) {
        parseObj[e] = parseObj[e].toString()
      } else {
        if (Long.isLong(parseObj[e])) {
          parseObj[e] = parseObj[e].toNumber()
        } else {
          if (typeof parseObj[e] === 'number') {
            parseObj[e] = parseObj[e]
          } else {
            if (e === 'batteryTypeList') { // 幸运礼物中奖次数
              parseObj[e].map((item, index) => {
                if (Long.isLong(item)) {
                  parseObj[e][index] = item.toNumber()
                }
              })
            }
            if (e === 'pkScore') { // 幸运礼物中奖次数
              const pkScoreKeysArr = Object.keys(parseObj[e])
              let scoreval = parseObj[e][pkScoreKeysArr[0]]
              if (Long.isLong(scoreval)) {
                scoreval = parseObj[e][pkScoreKeysArr[0]].toNumber()
              }
              let scorekey = pkScoreKeysArr[0]
              if (Long.isLong(pkScoreKeysArr[0])) {
                scorekey = pkScoreKeysArr[0].toNumber()
              }
              parseObj[e][scorekey] = scoreval
            }
            if (e === 'targetUserId') { // 被@的用户ID列表
              parseObj[e].map((item, index) => {
                if (Long.isLong(item)) {
                  parseObj[e][index] = item.toNumber()
                }
              })
            }
            if (e === 'userProp') {
              parseObj[e] = parseMsg(parseObj[e])
            }
            if (e === 'peer') {
              parseObj[e] = parseMsg(parseObj[e])
            }
            if (e === 'mvp') {
              parseObj[e] = parseMsg(parseObj[e])
            }
          }
        }
      }
    })
    return parseObj
  } else {
    return originMsg
  }
}

export function parseGift(originMsg) {
  if (typeof originMsg === 'object') {
    let parseObj = Object.assign(originMsg, {})
    const keysArr = Object.keys(parseObj)
    keysArr.map(e => {
      try {
        if (e === 'gift') {
          parseObj[e] = parseMsg(parseObj[e])
        } else if (e === 'receivers') {
          parseObj[e].map((item, index) => {
            parseObj[e][index] = parseMsg(item)
          })
        } else if (e === 'sender') {
          parseObj[e] = parseMsg(parseObj[e])
        }
      } catch (error) {
        console.log(error, '解析礼物失败')
      }
    })
    return parseObj
  } else {
    return originMsg
  }
}
