var protobuf = require('protobufjs')
var Long = require('long')
var awesomeConfig = require('./client_pb')
var config = {
  NetState: {
    NET_STATE_INIT: 0, // 初始状态
    NET_STATE_CONNECTING: 1, // 链接中
    NET_STATE_OPEN: 2, // 链接成功
    NET_STATE_AUTHING: 3, // 认证中
    NET_STATE_AUTHED: 4, // 认证完成
    NET_STATE_CLOSE: 5 // 需要手动连接(多端登录被踢)
  },
  RoomState: {
    ROOM_INIT: 0, // 0 初始状态 1 直播状态 2/3 主播/观众连麦 4 PK状态 5 结束状态
    ROOM_LIVE: 1,
    ROOM_CLOSE: 5
  },
  globalData: {},
  Long: Long
}
/**
 * err 错误信息
 * root 加载的文件信息
 */
protobuf.util.Long = Long
protobuf.configure()
config.pbMsgRoot = protobuf.Root.fromJSON(awesomeConfig)
config.pbMsgHeadBuilder = config.pbMsgRoot.lookup('PBMessage')
export default config
