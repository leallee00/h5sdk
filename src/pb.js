var pb = require('./utils/protobuf')
const time = new Date().getTime() // 用于更新pbjson文件
var awesomeConfig = require('./client_pb')
var pbjson = {}
/**
 * err 错误信息
 * root 加载的文件信息
 */
pbjson.pbMsgRoot = pb.Root.fromJSON(awesomeConfig)
pbjson.pbMsgHeadBuilder = pbjson.pbMsgRoot.lookup('PBMessage')

export default pbjson
