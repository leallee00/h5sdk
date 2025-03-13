import { GetCurLocalTime, parseLong, parseMsg, parseGift } from './utils/util'
import config from './config'
import pbjson from './pb'
import { netstatus } from './utils/network'
import { logMsg } from './utils/log'
var mySocket = {}
function getInstance (options) {
  mySocket = {
    account: options.account,
    token: options.token,
    address: options.address,
    connectType: options.connectType || 1,
    roomId: '', // 房间ID
    isAnonymous: options.isAnonymous || false, // 游客模式
    debug: options.debug || false, // 是否输出log信息
    clientInfo: options.clientInfo, // 版本信息
    netState: config.NetState.NET_STATE_INIT, // 链接状态
    updateTime: GetCurLocalTime(), // 维持连接时间
    roomTimer: '', // 房间状态机
    roomState: 0, // 房间状态
    roomUpdateTime: GetCurLocalTime(), // 房间维持连接时间
    roomHeartBeatTime: GetCurLocalTime(), // 房间心跳时间
    socketTimer: '', // 维持连接的定时器
    wssClient: '', // wss连接
    offlineMsgQue: [], // 离线消息队列
    ifReqOffLineMsg: false,
    offLineTime: 0,
    heartBeatTime: GetCurLocalTime(), // 心跳时间
    serveTime: 0, // 服务器时间
    timeDiffer: 0, // 时间差
    setStop: false,
    ifReset: true, // 连接断开时是否自动连接，默认自动连接，如果认证失败或者心跳超时，重新走java的连接
    reconnectTimer: '', // 断网重连
    netCloseTimes: 0, // 网络被关过多少次，10秒连续三次报网络不佳
    /**
     * msgSn 每条消息的唯一认证标识
     * 64位(32:用户信息+32:消息标识)
     * 初始值自定义，每次登录成功后在LoginRsp中返回sn
     * 每次发送消息sn自增1，如果收到多条相同sn消息则覆盖原消息
     */
    msgSn: config.Long.fromValue(Math.random().toString().split('.')[1], false),
    messageQueue: {} // 消息队列，记录用户发送的消息 0 初始 1 发送成功 2 已接收 3 已读
  }

  // 设置连接状态
  mySocket.SetNetState = state => {
    // console.log('net => socket state change from ' + mySocket.netState + ' to ' + state)
    mySocket.netState = state
    mySocket.updateTime = GetCurLocalTime()
  }

  // 状态机 监听状态变化并发送心跳数据
  mySocket.initConnect = options => {
    // 判断参数是否正确
    let isParmCorrect = true
    let reason = ''
    if (!mySocket.isAnonymous) {
      isParmCorrect = mySocket.account && mySocket.token && mySocket.address
      reason = !mySocket.account ? 'account参数异常-im连接' : (!mySocket.token ? 'token参数异常-im连接' : '连接地址为空-im连接')
    } else {
      isParmCorrect = mySocket.address
      reason = '连接地址为空-im连接'
    }
    if (!isParmCorrect) {
      mySocket.SetNetState(config.NetState.NET_STATE_INIT)
      mySocket.ifReset = false
      mySocket.Stop()
      options.onerror({
        message: reason,
        code: 101 // java重新获取token
      })
    }
    if (mySocket.socketTimer) {
      // 已经启动，直接返回
      return
    }
    const localsn = localStorage.getItem('msgsn')
    if (localsn && localsn !== 'null' && localsn !== 'undefined') {
      mySocket.msgSn = config.Long.fromValue(localsn, false)
    }
    clearInterval(mySocket.socketTimer)
    // 状态机
    mySocket.socketTimer = setInterval(() => {
      // 使用pb结构
      // console.log('连接状态----------------------：' + mySocket.netState)
      switch (mySocket.netState) {
        case config.NetState.NET_STATE_INIT: // 0 准备连接
          mySocket.wssClient = new WebSocket(mySocket.address)
          mySocket.MountHandle()
          mySocket.SetNetState(config.NetState.NET_STATE_CONNECTING)
          // console.log('net => connecting!!');
          // 绑定接收函数
          break
        case config.NetState.NET_STATE_CONNECTING: // 1 连接中
          // 正在连接中，判断是否超时
          if (GetCurLocalTime() - mySocket.updateTime > 10) {
            // 10秒认为超时，一般不会那么久，socket自己的回调就设置回来了
            mySocket.wssClient.close() // 关闭连接
            mySocket.SetNetState(config.NetState.NET_STATE_INIT)
            console.log('net => connect out time, close socket!!')
          }
          break
        case config.NetState.NET_STATE_OPEN: // 2 连接成功
          // if (mySocket.token) {
          //   var LoginPb = config.pbMsgRoot.lookup('LoginReq').create({
          //     token: mySocket.token,
          //     token_type: 0
          //   });
          // } else {
          //   var LoginPb = config.pbMsgRoot.lookup('LoginReq').create();
          // }
          // mySocket.SendPbMsg(false, 'gate', mySocket.account, LoginPb);
          // mySocket.SetNetState(config.NetState.NET_STATE_AUTHING);
          break
        case config.NetState.NET_STATE_AUTHING: // 3 认证中
          // 如果超时没有返回就再发送
          // 认证超时则重新登录 ! ! !
          if (GetCurLocalTime() - mySocket.updateTime > 10) {
            // 10秒没有返回，失败
            mySocket.SetNetState(config.NetState.NET_STATE_INIT)
            console.log('net => authing over time, close socket!!!')
            mySocket.ifReset = false
            mySocket.Stop()
            options.onerror({
              message: '登录验证失败，正在重连',
              code: 101 // java重新获取token
            })
          }
          break
        case config.NetState.NET_STATE_AUTHED: // 4 认证成功
          // 心跳超时的话重新连接
          if (GetCurLocalTime() - mySocket.updateTime > 30) {
            // 30秒超时
            mySocket.SetNetState(config.NetState.NET_STATE_INIT)
            console.log('net => heart beat over time, close socket!!!')
            mySocket.ifReset = false
            mySocket.Stop()
            options.onerror({
              message: '登录验证失败，正在重连',
              code: 101 // java重新获取token
            })
            break
          }

          if (GetCurLocalTime() - mySocket.heartBeatTime > 10) {
            // 10秒一个心跳
            // console.log('IM心跳--------')
            mySocket.heartBeatTime = GetCurLocalTime()
            const heartBeat = config.pbMsgRoot.lookup('pb_pub.HeartBeat').create({
              type: 0,
              state: 0
            })
            mySocket.SendPbMsg(false, 'gate', mySocket.account, heartBeat)
          }
          break
        case config.NetState.NET_STATE_CLOSE: // 多端登录被踢
          break
      }
    }, 1000)
  }

  // 聊天室状态机
  mySocket.roomConnect = () => {
    clearInterval(mySocket.roomTimer)
    // 状态机
    mySocket.roomTimer = setInterval(() => {
      if (!mySocket.roomId || mySocket.roomId === 'undefined' || mySocket.roomId === 'null') {
        options.onliveroom({
          message: 'roomId不存在，重新登录',
          type: 'heartover' // java重新获取token
        })
        clearInterval(mySocket.roomTimer)
      }
      // console.log('房间状态----------------------：' + mySocket.roomState, GetCurLocalTime(), mySocket.roomUpdateTime)
      switch (mySocket.roomState) {
        case config.RoomState.ROOM_INIT: // 0 初始状态，直播间心跳超时时会走这里，重新进入直播间
          mySocket.enterLiveRoom({ roomId: mySocket.roomId })
          break
        case config.RoomState.ROOM_LIVE: // 1 直播中
          // 心跳超时的话重新连接
          if (GetCurLocalTime() - mySocket.roomUpdateTime > 30) {
            // 30秒超时
            mySocket.roomState = config.RoomState.ROOM_INIT
            mySocket.roomUpdateTime = GetCurLocalTime()
            logMsg(mySocket.debug, `直播间心跳超时-155:${mySocket.roomId}`, 'error')
            break
          }
          if (GetCurLocalTime() - mySocket.roomHeartBeatTime > 10) {
            if (mySocket.roomId) {
              // console.log('直播间心跳--------')
              mySocket.roomHeartBeatTime = GetCurLocalTime()
              const heartBeat = config.pbMsgRoot.lookup('pb_pub.HeartBeat').create({
                type: 1,
                state: 0
              })
              mySocket.SendPbMsg(true, 'live_room', mySocket.roomId, heartBeat, '', '', {
                aimId: mySocket.roomId
              })
            }
          }
          break
        case config.RoomState.ROOM_CLOSE: // 2 直播结束
          break
      }
    }, 1000)
  }

  // 函数绑定
  mySocket.MountHandle = () => {
    mySocket.wssClient.onopen = mySocket.onSocketOpen
    mySocket.wssClient.onclose = mySocket.onSocketClose
    mySocket.wssClient.onerror = mySocket.onSocketError
    mySocket.wssClient.onmessage = mySocket.onSocketMessage
  }

  mySocket.onSocketOpen = res => {
    mySocket.updateTime = GetCurLocalTime()
    mySocket.SetNetState(config.NetState.NET_STATE_OPEN)
    // 连接成功后直接登录
    /**
     * clientInfo:
     * appVersion: 同椰趣
     * systemName：h5
     */
    var LoginPb
    // h5_social  h5_bjlive
    // console.log('h5_social/h5_bjlive')
    // console.log(window.location.href, 'window.location.href')
    let systemName = 'h5_bjlive'
    if (window.location.href.indexOf('social') !== -1) {
      systemName = 'h5_social'
    }
    console.log(systemName, 'systemName')
    if (mySocket.token) {
      LoginPb = config.pbMsgRoot.lookup('LoginReq').create({
        token: mySocket.token,
        token_type: 0,
        clientInfo: mySocket.clientInfo
      })
    } else {
      LoginPb = config.pbMsgRoot.lookup('LoginReq').create({
        clientInfo: mySocket.clientInfo
      })
    }
    mySocket.SendPbMsg(false, 'gate', mySocket.account, LoginPb)
    mySocket.SetNetState(config.NetState.NET_STATE_AUTHING)
  }

  // 将收到的消息解析出并通知用户接收
  mySocket.onSocketMessage = res => {
    var getMsg = res.data
    if (typeof getMsg === 'string') {
    } else {
      // 二进制数据处理
      var reader = new FileReader()
      reader.readAsArrayBuffer(res.data)
      reader.onload = function (e) {
        var pbMsgHead = config.pbMsgHeadBuilder.decode(
          new Uint8Array(reader.result)
        )
        if (!pbMsgHead.pbName) {
          logMsg(mySocket.debug, `get err msg-216:${pbMsgHead}`, 'error')
          if (pbMsgHead) { return }
        }
        var pbMsgBuilder = config.pbMsgRoot.lookup(pbMsgHead.pbName)
        if (!pbMsgBuilder) {
          logMsg(mySocket.debug, `net->收到未知消息-221:${pbMsgHead.pbName}`, 'warn')
          return
        }
        // 消息解码
        var pbMsgRsp = pbMsgBuilder.decode(pbMsgHead.pbData)
        if (pbMsgHead.pbName !== 'pb_pub.HeartBeat') {
          // console.log('收到的所有消息----------------', pbMsgHead, pbMsgRsp)
        }
        if (pbMsgRsp.result) {
          logMsg(mySocket.debug, `消息返回失败：-230:${pbMsgRsp.result}`, 'error')
          switch (pbMsgHead.pbName) {
            case 'pb_msg_gate.LoginRsp': // 登录结果返回 result 成功0
              if (pbMsgRsp.result) {
                // 登录失败
                logMsg(mySocket.debug, `Login error! result:-235:${pbMsgRsp.result}`, 'error')
                mySocket.SetNetState(config.NetState.NET_STATE_INIT)
                mySocket.ifReset = false
                mySocket.Stop()
                options.onerror({
                  message: '登录验证失败，正在重连',
                  code: 101 // java重新获取token
                })
                break
              }
              break
            default:
              break
          }
          return
        }
        switch (pbMsgHead.errCode) {
          case 50: // 直播间不存在
            mySocket.roomId = ''
            options.onliveroom({ type: 'changYX' })
            break
          default:
            break
        }

        // mySocket.SetNetState(config.NetState.NET_STATE_AUTHED) // 模拟认证
        switch (
          pbMsgHead.pbName // pbMsgRsp.result 错误码 0:代表成功
        ) {
          case 'pb_pub.HeartBeat': // 心跳消息
            // 收到heartbeat， 更改时间
            if (pbMsgRsp.type && pbMsgRsp.type === 1) {
              mySocket.roomUpdateTime = GetCurLocalTime()
            } else {
              mySocket.updateTime = GetCurLocalTime()
            }
            break
          case 'pb_msg_gate.LoginRsp': // 登录结果返回 result 成功0
            /**
             * 记录返回的token信息，下次登录使用
             * 更新sn
             */
            mySocket.setStop = false
            var loginRes = pbMsgBuilder.toObject(pbMsgRsp)
            // console.log('登录结果返回:', mySocket.isAnonymous, pbMsgHead, pbMsgRsp)
            if (!mySocket.isAnonymous) {
              // console.log('2222222222222222')
              mySocket.token = loginRes.reconnectToken
              mySocket.msgSn = loginRes.msgSn
              logMsg(mySocket.debug, `正常用户登录返回的sn:-283:${loginRes.msgSn.toString()}`, 'info')
            } else {
              mySocket.account = pbMsgHead.pbCommData.srcId
              mySocket.msgSn = loginRes.msgSn
              logMsg(mySocket.debug, `游客模式下的用户id:-287:${mySocket.account}`, 'info')
            }
            localStorage.setItem('msgsn', mySocket.msgSn.toString())
            mySocket.serveTime = pbMsgHead.pbCommData.time.toNumber()
            mySocket.timeDiffer = GetCurLocalTime() - mySocket.serveTime
            // console.log(
            //   `pb_pub.LoginRsp ${mySocket.account}用户认证成功`,
            //   !!options.isAnonymous
            // );
            // 设置连接状态
            mySocket.SetNetState(config.NetState.NET_STATE_AUTHED)
            options.onopen(true)
            /**
             * 连接成功后需要直接调用的消息
             */
            // mySocket.sendMsgInLoginSus();
            break
          case 'pb_msg_gate.KickOffUser': // 多端登录踢出消息，收到消息后需弹窗提示用户是否在该设备上重新登录
            // 如果踢出人为自己则连接状态置0，提示原因
            if (pbMsgRsp.aimUId.toNumber() === mySocket.account) {
              mySocket.SetNetState(config.NetState.NET_STATE_CLOSE)
              mySocket.ifReset = false
              console.log('多端登录踢出')
              mySocket.Stop()
              options.onerror({
                message: pbMsgRsp.desc,
                reason: pbMsgRsp.reason,
                code: 201
              })
            }
            break
          case 'pb_pub.MsgReceipt': // 聊天消息状态接收
            // mySocket.messageQueue[pbMsgRsp.head.msgSn]['state'] = pbMsgRsp.state
            // 告诉用户消息状态已经改变
            // console.info(mySocket.messageQueue[pbMsgRsp.head.msgSn])
            const obj = {
              msgSn: pbMsgHead.pbCommData.msgSn.toString(),
              pbCommData: pbMsgHead.pbCommData,
              state: pbMsgRsp.state
            }
            logMsg(mySocket.debug, `聊天消息状态接收:-325:${obj}`, 'info')
            if (pbMsgRsp.time) {
              obj.time = pbMsgRsp.time.toNumber()
            }
            options.onmarkmsgread(obj)
            break
          case 'pb_msg_gate.ChatText': // 聊天消息
            var msgObj = Object.assign({}, pbMsgRsp)
            msgObj.scene = 'p2p'
            msgObj.state = 1
            msgObj.aimUserId = msgObj.aimUserId.toNumber()
            msgObj.pbCommData = parseLong(pbMsgHead.pbCommData)
            // 避免对方没有发来消息类型，默认为文本
            if (!msgObj.chatType) {
              msgObj.chatType = 0
            }
            options.onmessage(msgObj)
            break
          case 'pb_msg_offlineMsg.ReadOfflineMsgRsp': // 离线消息
            /**
             * 用户第一次获取离线消息
             * 1.发送num=0 time直接取当前时间，得到离线消息数量
             * 2.获取自己想要的离线消息，num=自己想要获取的数量，不能超过离线消息总数
             * 如果离线消息多，可以分段获取，每次获取的时间都是上次最后一条数据的时间
             * 获取消息后，解析所有消息
             * 获取到的离线消息按时间先后顺序排序
             * 一次获取100条数据，展示时展示99+
             * 批量获取离线消息后发送已接收消息方式：批量或者单条发送
             * 批量：只发送一条已接收状态消息，time为最后一条消息的time，服务端会把time之前的离线消息删除
             * 单条：获取到的所有离线消息都发送一条已接收消息，time改为0
             */
            // 第一次请求的离线消息数量
            if (pbMsgRsp.msgNum !== 0 && pbMsgRsp.msgList.length === 0) {
              // console.log('离线消息总数：' + pbMsgRsp.msgNum)
              let reqNum = pbMsgRsp.msgNum
              // if (pbMsgRsp.msgNum > 5) {
              //   mySocket.getOffLineMsg({ num: 5 })
              // } else {
              //   mySocket.getOffLineMsg({ num: reqNum })
              // }
              // 暂时只请求一次
              if (!mySocket.ifReqOffLineMsg) {
                mySocket.ifReqOffLineMsg = true
                mySocket.getOffLineMsg({ num: reqNum })
              }
            }
            // 之后请求的离线消息
            if (pbMsgRsp.msgNum !== 0 && pbMsgRsp.msgList.length !== 0) {
              // console.log('获得所有离线消息：')
              const offLineMsg = {}
              for (let i = 0; i < pbMsgRsp.msgList.length; i++) {
                const element = mySocket.decodeOffLineMsg(pbMsgRsp.msgList[i])
                mySocket.offLineTime = element.pbCommData.time // 更新离线消息时间，记录最后一条离线消息时间，离线消息返回按时间正序排序
                var ressn = element.pbCommData.msgSn
                offLineMsg[`${ressn}-im`] = element
              }
              // 批量更新消息状态：已接收
              mySocket.sendMsgRead({ state: 2, time: mySocket.offLineTime })
              // console.log(offLineMsg, '解析后的离线消息')
              options.onofflinemsg(offLineMsg, pbMsgRsp.msgNum)
            }
            break
          case 'pb_msg_blackList.SaveBlackListRsp': // 添加黑名单
            options.onmarkinblacklist({
              type: 'in',
              aimId: pbMsgRsp.aimUserid.toNumber()
            })
            break
          case 'pb_msg_blackList.DeleteBlackListRsp': // 移除黑名单（取消拉黑）
            options.onmarkinblacklist({
              type: 'out',
              aimId: pbMsgRsp.aimUserid.toNumber()
            })
            break
          case 'pb_msg_blackList.ReadBlackListRsp': // 读取黑名单
            options.onblacklist(pbMsgRsp.aimUserid)
            break
          case 'pb_msg_blackList.JudgeBlackListRsp': // 判断是否在黑名单中 0不存在 1存在
            options.onjudgeinblack(pbMsgRsp.state)
            break
          case 'pb_pub.EnterRoomRsp': // 进入直播间，启动状态机（为了减少连接时间，所以直接发送进入直播间的请求，在启动状态机）
            // options.onjudgeinblack(pbMsgRsp.state)
            if (mySocket.roomId) { // 进入直播间成功后才启动定时器，发送心跳
              // console.log(pbMsgHead, '成功进入直播间')
              options.onliveroom({ type: 'enter' })
              mySocket.roomUpdateTime = GetCurLocalTime()
              mySocket.roomState = config.RoomState.ROOM_LIVE
              mySocket.roomConnect()
            }
            break
          case 'pb_pub.ExitRoomRsp': // 离开直播间
            // options.onjudgeinblack(pbMsgRsp.state)
            mySocket.roomId = ''
            logMsg(mySocket.debug, `成功离开直播间:-418:${pbMsgRsp}`, 'info')
            options.onliveroom({ type: 'leave' })
            break
          case 'pb_pub.YXCommMsg':
          /**
           * 聊天室消息接收
           * 无论自己发送的消息还是别人的消息，都会走这里
           * 如果是自己发送的消息，需要在发送时监听，
           * 9s后没有在这里收到消息则需要重新发送
           */
            let getMsg = Object.assign({}, pbMsgRsp)
            getMsg.msgSn = pbMsgHead.pbCommData.msgSn
            getMsg.msgSn = getMsg.msgSn.toString()
            if (getMsg.IsImMessage) {
              getMsg.IsImMessage = getMsg.IsImMessage.toString()
            }
            getMsg.errCode = pbMsgHead.errCode
            options.onmsgs({
              type: 'YXCommMsg',
              body: getMsg
            })
            break
          case 'pb_msg_live_room.LiveGiftNotify': // 礼物消息
            logMsg(mySocket.debug, `礼物消息:-441:${pbMsgRsp}`, 'normal')
            try {
              options.onmsgs({
                type: 'LiveGiftNotify',
                body: parseGift(pbMsgRsp)
              })
            } catch (error) {
            }
            break
          /**
           * pkStatus：
              0 空闲中  -- 初始值,我方拒绝,响铃超时,惩罚结束
              1 排队中  -- 申请随机PK或申请段位PK
              2 呼叫中  -- 邀请PK拨号中
              3 响铃中  -- 匹配成功询问主播是否同意开启 被其他主播邀请
              4 等待中  -- 我已同意,等待对方主播同意
              5 比赛中  -- 双方同意 邀请成功
              7 惩罚中  -- 比赛结束,惩罚中
           */
          case 'pb_msg_live_room.EnterRoomReadyRsp': // 进房间成功触发应答
          case 'pb_msg_live_room.RoomInfo': // 用户进房间通知
          case 'pb_msg_live_room.UpdatedUserInfo': // 更新用户信息，粉丝团，守护等
          case 'pb_msg_live_room.AudienceEnterRoom': // 房间消息: 观众进房间
          case 'pb_msg_live_room.RoomBarrage': // 房间消息: 弹幕消息
          case 'pb_msg_live_room.RoomNormal': // 房间消息: 普通消息
          case 'pb_msg_live_room.RoomAction': // 房间消息: 关注
          case 'pb_msg_live_room.PKRoomInfo': // PK消息
          case 'pb_msg_pk_room.PKStatusChangeNotify': // 房间PK状态更新通知
          case 'pb_msg_pk_room.PKStartNotify': // PK开始，注：PKMatchedNotify用于通知主播
          case 'pb_msg_pk_room.PKOverNotify': // PK结束消息
          case 'pb_pub.ServiceNotify': // 系统通知
          case 'pb_pub.NeedSceneRecoverNotify': // 场景恢复
          case 'pb_msg_pk_room.PKGameOverNotify': // PK比赛阶段结束
            logMsg(mySocket.debug, `直播间改造消息接收，消息类型:-457:${pbMsgHead.pbName}`, 'normal')
            logMsg(mySocket.debug, `直播间改造消息接收，消息体:-458:${parseMsg(pbMsgRsp)}`, 'normal')
            const time = pbMsgHead.pbCommData.time
            try {
              options.onmsgs({
                time: time.toNumber(),
                type: pbMsgHead.pbName,
                body: parseMsg(pbMsgRsp, 'normal')
              })
            } catch (error) {
              console.error('消息解析异常:'+pbMsgHead.pbName)
              console.error('消息异常原因:'+ error)
            }
            break
          case 'pb_msg_live_room.PKScoreNotify': // PK数值更新
          // console.log(`%c ---sdk log :PK数值更新--- `, `color:#09fb05;background:#6a6a6b`)
          var pbHead = pbjson.pbMsgHeadBuilder.decode(
            new Uint8Array(reader.result)
          )
          var pbBuilder = pbjson.pbMsgRoot.lookup(pbHead.pbName)
          var pbRsp = pbBuilder.decode(pbHead.pbData)
            try {
              const scorepb = {
                type: pbHead.pbName,
                body: pbRsp
              }
              // console.log(`%c ---sdk log :PK数值更新--${JSON.stringify(scorepb)}--- `, `color:#09fb05;background:#6a6a6b`)
              options.onmsgs(scorepb)
            } catch (error) {
            }
            break
          case 'pb_pub.GMChangeIMNotify': // SDK切换
            options.onsdkchange(pbMsgRsp)
            break
          case 'pb_msg_live_room.RoomStatusNotify': // 0主播正常/1下播 roomStatus
            // console.log(`%c ${pbMsgRsp.groupId}-主播状态-${pbMsgRsp.roomStatus}`, 'color:#67C23A')
            mySocket.roomState = config.RoomState.ROOM_CLOSE
            mySocket.roomUpdateTime = GetCurLocalTime()
            clearInterval(mySocket.roomTimer)
            let msg = Object.assign(pbMsgRsp, {})
            msg.groupId = msg.groupId.toNumber()
            options.onliveroom({ type: 'status', msg: msg })
            break
          case 'pb_msg_live_room.ReloadYXCommMsgRsp': // 断线重连获取直播间历史消息（100条全部类型消息）
            // console.log(`%c ${pbMsgRsp}-100条全部类型消息`, 'color:#67C23A')
            // console.log(pbMsgRsp)
            options.onhismsg(pbMsgRsp)
            break
          case 'pb_msg_live_room.HistoryYXCommMsgRsp': // 获取直播间历史消息（10条消息）
            // console.log(`%c ${pbMsgRsp}-10条消息`, 'color:#67C23A')
            break
          default:
            logMsg(mySocket.debug, `其它未接收类型消息:-468:${pbMsgRsp}`, 'low')
            try {
              options.onmsgs({
                type: pbMsgHead.pbName,
                body: parseMsg(pbMsgRsp)
              })
            } catch (error) {
            }
            break
        }
      }
    }
  }

  // 离线消息解析
  mySocket.decodeOffLineMsg = pbMsgHead => {
    // 二进制数据处理
    var pbMsgBuilder = config.pbMsgRoot.lookup(pbMsgHead.pbName)
    if (!pbMsgBuilder) {
      logMsg(mySocket.debug, `离线消息解析失败:-468:${pbMsgHead.pbName}`, 'warn')
      return
    }
    // 消息解码
    var pbMsgRsp = pbMsgBuilder.decode(pbMsgHead.pbData)
    var msgObj = {}
    msgObj.pbCommData = {
      msgSn: pbMsgHead.sn,
      srcId: pbMsgHead.srcUserid.toNumber(),
      aimId: pbMsgHead.aimUserid.toNumber(),
      time: pbMsgHead.time.toNumber()
    }
    msgObj.text = pbMsgRsp.text
    msgObj.data = pbMsgRsp.data ? pbMsgRsp.data : ''
    msgObj.chatType = pbMsgRsp.chatType ? pbMsgRsp.chatType : 0
    msgObj.aimId = pbMsgRsp.aimUserId.toNumber()
    msgObj.state = 1
    return msgObj
  }

  mySocket.reConnectIm = () => {
    logMsg(mySocket.debug, `断网测试重连:-531`, 'cur')
    clearInterval(mySocket.reconnectTimer)
    const recTime = GetCurLocalTime()
    mySocket.reconnectTimer = setInterval(() => {
      netstatus().then((res) => {
        logMsg(mySocket.debug, `测试网络！！！:-537`, 'cur')
        if (res) {
          if (GetCurLocalTime() - recTime > 100) {
            // 退出直播间
            mySocket.roomId = ''
            clearInterval(mySocket.reconnectTimer)
            logMsg(mySocket.debug, `断网时间过长，退出直播间:-541`, 'cur')
            options.onliveroom({ type: 'error' })
          }
          logMsg(mySocket.debug, `网络好了！！！:-544`, 'cur')
          clearInterval(mySocket.reconnectTimer)
          options.onerror({
            code: 300,
            message: '网络重新连接成功'
          })
        }
      })
    }, 3000)
  }

  /**
   * 异常断开时，根据网络状态判断
   * 如果没有断网，说明是其它异常，则从新登录连接
   * 否则，进行断网重试，5s中监测一次网络状态，
   * 如果连接上网络
   */
  mySocket.onSocketClose = res => {
    // 用户主动调用
    if (mySocket.setStop) {
      return
    }
    if (!mySocket.ifReset || mySocket.netState === config.NetState.NET_STATE_CLOSE) {
      // console.log('多端登录/心跳超时/登录超时/登录失败/连接关闭')
      mySocket.ifReset = true
      mySocket.SetNetState(config.NetState.NET_STATE_CLOSE)
      return
    } else {
      logMsg(mySocket.debug, `连接关闭了！！！！！！！:-567`, 'error')
    }

    // 未连接成功，重新连接
    if (mySocket.netState <= config.NetState.NET_STATE_CONNECTING) {
      // console.log('未连接成功，重新连接')
      mySocket.SetNetState(config.NetState.NET_STATE_INIT)
      options.onclose(res)
      mySocket.Stop()
      options.onerror({
        code: 102,
        message: res
      })
      return
    }

    // 未连接成功，重新连接
    if (mySocket.netState <= config.NetState.NET_STATE_CONNECTING) {
      console.log('未连接成功，重新连接')
      mySocket.SetNetState(config.NetState.NET_STATE_INIT)
      options.onclose(res)
      mySocket.Stop()
      options.onerror({
        code: 102,
        message: res
      })
      return
    }

    if (GetCurLocalTime() - mySocket.updateTime > 60) {
      // 大于60秒的重连重新计数
      mySocket.netCloseTimes = 1
    } else {
      mySocket.netCloseTimes++
    }

    if (mySocket.netCloseTimes > 3) {
      mySocket.netCloseTimes = 0
    }
    netstatus().then((res) => {
      if (res) {
        mySocket.SetNetState(config.NetState.NET_STATE_INIT)
        options.onclose(res)
        // if (res.code === 1006) {
        mySocket.Stop()
        options.onerror({
          code: 300,
          message: res
        })
      } else {
        // 网络已经断开
        mySocket.SetNetState(config.NetState.NET_STATE_INIT)
        options.onclose(res)
        mySocket.Stop()
        mySocket.reConnectIm()
        options.onerror({ // 断网重连
          code: 301,
          message: '网络已经断开'
        })
      }
    })
  }

  mySocket.onSocketError = res => {
    // console.error('net => ws连接异常 socket error,close socket:' + res);
    // mySocket.wssClient.close();
    // mySocket.SetNetState(config.NetState.NET_STATE_INIT);
    // mySocket.Stop();
    // options.onerror({
    //   code: 300,
    //   message: res
    // });
  }

  mySocket.Stop = (ifOwn) => {
    if (mySocket.socketTimer === 0) {
      return
    }
    

    clearInterval(mySocket.socketTimer)
    clearInterval(mySocket.roomTimer)
    mySocket.socketTimer = 0
    // 如果用户主动调用关闭，则需要设为false
    if (ifOwn) {
      mySocket.setStop = true
    } else {
      mySocket.setStop = false
    }
    // console.warn('用户主动调用websocket关闭')
    mySocket.wssClient.close()
  }

  /**
   * 发送聊天消息，所有用户主动发送的消息，自己发送的消息需要标记状态
   * 用户发送的消息都有唯一的sn
   */
  mySocket.sendChatText = (params, opts) => {
    var jsonobj = {
      aimUserId: config.Long.fromValue(params.aimId, false),
      chatType: params.chatType, // 消息类型
      data: params.data, // 文件
      text: params.text
    }
    // 扩展消息，发送礼物
    if (params.exp) {
      jsonobj.exp = params.exp
    }
    var pbMsg = config.pbMsgRoot
      .lookup('.pb_msg_gate.ChatText')
      .create(jsonobj)
    var configs = {
      aimId: params.aimId
    }
    mySocket.SendPbMsg(
      true,
      'gate',
      mySocket.account,
      pbMsg,
      opts,
      params.done,
      configs
    )
  }

  /**
   * 发送已读回执
   * params.time存在，表示将该时间之前的所有消息状态都修改
   */
  mySocket.sendMsgRead = function (params, opts) {
    var jsonobj = {
      state: params.state,
      time: params.time ? params.time : 0
    }
    if (jsonobj.time) {
      jsonobj.time = config.Long.fromValue(jsonobj.time, false)
    }
    var pbMsg = config.pbMsgRoot.lookup('.pb_pub.MsgReceipt').create(jsonobj)
    var configs = {}
    if (params.aimId) {
      configs.aimId = params.aimId
    }
    if (params.msgSn) {
      configs.msgSn = params.msgSn
    }
    mySocket.SendPbMsg(
      false,
      'gate',
      mySocket.account,
      pbMsg,
      opts,
      '',
      configs
    )
  }

  /**
   * 离线消息获取
   */
  mySocket.getOffLineMsg = function (params, opts) {
    var jsonobj = {
      time: params.time ? params.time : mySocket.offLineTime,
      userid: config.Long.fromValue(mySocket.account, false),
      num: params.num // 请求的消息数
    }
    if (jsonobj.time) {
      jsonobj.time = config.Long.fromValue(jsonobj.time, false)
    }
    if (jsonobj.num) {
      jsonobj.num = config.Long.fromValue(jsonobj.num, false)
    }
    var pbMsg = config.pbMsgRoot
      .lookup('.pb_msg_offlineMsg.ReadOfflineMsgReq')
      .create(jsonobj)
    mySocket.SendPbMsg(true, 'offline_msg', mySocket.account, pbMsg, opts)
  }

  /**
   * 添加/移除黑名单
   */
  mySocket.markInBlackList = (params, opts) => {
    var jsonobj = {
      srcUserid: config.Long.fromValue(params.srcId, false),
      aimUserid: config.Long.fromValue(params.aimId, false)
    }
    var pbMsg = ''
    if (params.type === 'in') {
      pbMsg = config.pbMsgRoot
        .lookup('.pb_msg_blackList.SaveBlackListReq')
        .create(jsonobj)
    } else {
      pbMsg = config.pbMsgRoot
        .lookup('.pb_msg_blackList.DeleteBlackListReq')
        .create(jsonobj)
    }
    var configs = {
      aimId: params.aimId
    }
    mySocket.SendPbMsg(
      true,
      'black_list',
      mySocket.account,
      pbMsg,
      opts,
      '',
      configs
    )
  }

  /**
   * 读取黑名单列表
   */
  mySocket.readBlackList = opts => {
    var jsonobj = {
      srcUserid: config.Long.fromValue(mySocket.account, false)
    }
    var pbMsg = config.pbMsgRoot
      .lookup('.pb_msg_blackList.ReadBlackListReq')
      .create(jsonobj)
    mySocket.SendPbMsg(true, 'black_list', mySocket.account, pbMsg, opts)
  }
  /**
   * 是否在黑名单列表中
   */
  mySocket.judgeBlackList = (params, opts) => {
    var jsonobj = {
      srcUserid: config.Long.fromValue(mySocket.account, false),
      aimUserid: config.Long.fromValue(params.aimId, false)
    }
    var pbMsg = config.pbMsgRoot
      .lookup('.pb_msg_blackList.JudgeBlackListReq')
      .create(jsonobj)

    mySocket.SendPbMsg(true, 'black_list', mySocket.account, pbMsg, opts)
  }

  /**
   * 聊天室连接，roomId = aimId
   * 通用消息里面的 aimId 也代表roomId
   */
  mySocket.enterLiveRoom = (params, opts) => {
    var jsonobj = {}
    var pbMsg = config.pbMsgRoot.lookup('.pb_pub.EnterRoomReq').create(jsonobj)
    var configs = {
      aimId: params.roomId
    }
    mySocket.roomId = params.roomId
    if (!mySocket.roomId || mySocket.roomId === 'undefined' || mySocket.roomId === 'null') {
      mySocket.Stop()
      options.onerror({
        message: 'roomId不存在，重新登录',
        code: 101 // java重新获取token
      })
      return
    }
    mySocket.SendPbMsg(
      true,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      '',
      configs
    )
  }
  /**
   * 断开聊天室
   */
  mySocket.leaveLiveRoom = (params, opts) => {
    var jsonobj = {}
    var pbMsg = config.pbMsgRoot.lookup('.pb_pub.ExitRoomReq').create(jsonobj)
    var configs = {
      aimId: params.roomId
    }
    mySocket.SendPbMsg(
      true,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      '',
      configs
    )
  }

  /**
   * 发送聊天室消息
   */
  mySocket.sendLiveRoomMsg = (params, opts) => {
    if (!mySocket.roomId) {
      // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
      // console.log('登录聊天室，返回50，聊天室不存在')
      return
    }
    var jsonobj = {
      MessageType: params.MessageType,
      MessageBody: params.MessageBody,
      IsImMessage: params.IsImMessage
    }
    var pbMsg = config.pbMsgRoot.lookup('.pb_pub.YXCommMsg').create(jsonobj)
    var configs = {
      aimId: params.roomId
    }
    // console.log('发送聊天室消息:房间Id', configs);
    mySocket.SendPbMsg(
      true,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      params.done,
      configs
    )
  }

  mySocket.reloadRoomMsg = (params, opts) => {
    // if (!mySocket.roomId) {
    //   // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
    //   console.log('聊天室不存在，断网重连请求历史消息')
    //   return
    // }
    var jsonobj = {
      sn: mySocket.msgSn
    }
    var pbMsg = config.pbMsgRoot.lookup('.pb_msg_live_room.ReloadYXCommMsgReq').create(jsonobj)
    var configs = {
      aimId: params.roomId
    }
    mySocket.SendPbMsg(
      true,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      params.done,
      configs
    )
  }

  // 历史消息（10条）
  mySocket.hisRoomMsg = (params, opts) => {
    // if (!mySocket.roomId) {
    //   // 聊天室不存在，则不发送消息，只有自己能看到，实际不会发送出去
    //   console.log('聊天室不存在，断网重连请求历史消息')
    //   return
    // }
    var jsonobj = {}
    var pbMsg = config.pbMsgRoot.lookup('.pb_msg_live_room.HistoryYXCommMsgReq').create(jsonobj)
    var configs = {
      aimId: params.roomId
    }
    mySocket.SendPbMsg(
      true,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      params.done,
      configs
    )
  }

  // 进房间成功触发请求
  mySocket.EnterRoomReadyReq = (params, opts) => {
    if (!mySocket.roomId) {
      return
    }
    var jsonobj = {}
    var pbMsg = config.pbMsgRoot.lookup('.pb_msg_live_room.EnterRoomReadyReq').create(jsonobj)
    var configs = {
      aimId: mySocket.roomId
    }
    mySocket.SendPbMsg(
      false,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      '',
      configs
    )
  }

  // 房间消息: 观众进房间,弹幕消息
  mySocket.sendRoomMsg = (params, opts) => {
    if (!mySocket.roomId) {
      console.log(`%c 观众进房间消息，聊天室roomId不存在`, 'color:#FF7F24')
      return
    }
    const sendmsg = JSON.parse(JSON.stringify(params.body))
    var jsonobj = params.body
    // '.pb_msg_live_room.AudienceEnterRoom'
    // '.pb_msg_live_room.RoomBarrage'
    // '.pb_msg_live_room.RoomNormal'
    // '.pb_msg_live_room.RoomAction'
    var pbMsg = config.pbMsgRoot.lookup(params.name).create(jsonobj)
    var configs = {
      aimId: mySocket.roomId
    }
    mySocket.SendPbMsg(
      false,
      'live_room',
      mySocket.roomId,
      pbMsg,
      opts,
      params.done,
      configs,
      {
        name: params.name,
        body: sendmsg
      }
    )
  }

  /**
   * 消息发送
   * @param {boolean} needReadReceipt 消息是否需要回执
   * @param {string} service 服务名
   * @param {(string|number)} hashKey 服务
   * @param {Object} pbMsg 消息体
   * @param {(Object)} opts 配置项
   * @param {function} done 回调函数
   * @param {Object} configs 回执数据
   * @param {Object} originMsg 原始数据
   *
   */
  mySocket.SendPbMsg = (
    needReadReceipt,
    service,
    hashKey,
    pbMsg,
    opts,
    done,
    configs,
    originMsg
  ) => {
    var builder = config.pbMsgRoot.lookup(pbMsg.$type.fullName)
    var pbMsgHead = config.pbMsgHeadBuilder.create({
      service: service,
      hashKey: String(hashKey),
      pbName: pbMsg.$type.fullName.slice(1, pbMsg.$type.fullName.length),
      pbCommData: {
        // serviceType: service,
        // needReadReceipt: needReadReceipt,
        // srcId: config.Long.fromValue(mySocket.account, false),
        time: config.Long.fromValue(
          GetCurLocalTime() + mySocket.timeDiffer,
          false
        )
      }
    })
    if (mySocket.account) {
      pbMsgHead.pbCommData.srcId = config.Long.fromValue(mySocket.account, false)
    }
    // 房间消息不需要回执字段
    if (service !== 'live_room') {
      pbMsgHead.pbCommData.needReadReceipt = needReadReceipt
    }
    switch (service) {
      case 'gate':
        pbMsgHead.pbCommData.serviceType = 0
        break
      case 'user_center':
        pbMsgHead.pbCommData.serviceType = 1
        break
      case 'chat':
        pbMsgHead.pbCommData.serviceType = 3
        break
      case 'live_room':
        pbMsgHead.pbCommData.serviceType = 6
        break
      case 'msg_analyze':
        pbMsgHead.pbCommData.serviceType = 18
        break
      default:
        break
    }
    if (configs && configs.aimId) {
      pbMsgHead.pbCommData.aimId = config.Long.fromValue(configs.aimId, false)
    } else {
      // pbMsgHead.pbCommData.aimId = config.Long.fromValue(0, false);
    }
    if (configs && configs.msgSn) {
      pbMsgHead.pbCommData.msgSn = config.Long.fromValue(configs.msgSn, false)
    } else {
      // console.log(mySocket.msgSn.toString(), '發送的消息msgsn :::::::::::::::::::::::::::')
      mySocket.msgSn = mySocket.msgSn.add(1)
      pbMsgHead.pbCommData.msgSn = mySocket.msgSn
    }
    localStorage.setItem('msgsn', mySocket.msgSn.toString())

    if (opts) {
      pbMsgHead.opts = opts
    }
    pbMsgHead.pbData = builder.encode(pbMsg).finish()
    var buf = config.pbMsgHeadBuilder.encode(pbMsgHead).finish()
    if (mySocket.wssClient) {
      mySocket.wssClient.send(buf)
    }
    
    // if (pbMsgHead.pbName.indexOf('pb_msg_live_room') !== -1 && done) {
    //   originMsg.body = originMsg.body
    //   done('发送成功', originMsg)
    // } else if (pbMsgHead.pbName !== '.pb_pub.HeartBeat' && done) {
    //   var msgObj = {}
    //   msgObj.pbMsg = pbMsg
    //   msgObj.state = 0
    //   msgObj.pbCommData = pbMsgHead.pbCommData
    //   msgObj.pbCommData = parseLong(msgObj.pbCommData)
    //   // console.log(pbMsg, '999999999999999999996')
    //   done('发送成功', msgObj)
    // }
    
    // 最终发送的pb数据
    if (pbMsgHead.pbName !== 'pb_pub.HeartBeat') {
      // console.log(pbMsgHead, '最终发送的消息头')
      // console.log(pbMsg, '消息体');
    }
    // if (pbMsgHead.pbName === '.pb_msg_gate.ChatText') {
    //   mySocket.messageQueue[pbMsg.msgHead.msgSn].state = 1
    // }

    //   // 加入队列
    //   mySocket.offlineBufMsgQue.push(pb);
    //   console.log("net => net state now:" + mySocket.netState + " push to offline que!!!!!")
  }

  // console.log(`%c ${msg}`, 'color:#67C23A')
  mySocket.initConnect(options)
  return mySocket
}

module.exports = getInstance
// export default getInstance
