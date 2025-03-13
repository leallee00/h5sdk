export function logMsg (debug, msg, type) {
  if (!debug) {
    return
  }
  let color = ''
  switch (type) {
    case 'error': // 异常
      color = '#f03933'
      break
    case 'warn': // 警告
      color = '#ff8100'
      break
    case 'info': // 普通系统消息
      color = 'blue'
      break
    case 'normal': // 房间相关消息
      color = '#03c713'
      break
    case 'low': // 其它消息
      color = '#737375'
      break
    case 'cur': //
      color = '#a002f3'
      break
    default:
      break
  }
  console.log(`%c ---sdk log :${msg}--- `, `color:${color};background:#e1eaff`)
}
