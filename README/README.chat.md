## 私聊
现有功能：
文本
图片

```
消息存储及具体格式
time 时间以秒计算
本地会存储所有消息
allChatMsg: {
  'key': {
    data: '', // 图片路径
    text: '', // 文本消息
    chatType: 0, // 消息类型 0文本 1图片 2音频 3视频
    aimUserId: 10002, // 目标id
    state: 0, // 消息发送状态 0初始 1已发送 2已接收 3已读
    type: '', // 具体展示消息类型 time(消息分隔时间) black(黑名单用户消息) 未有(普通消息)
    pbCommData: { // 服务端定义的通用消息头，这里直接拿来用
      msgSn: 13292939, // 消息唯一id
      time: 1xxxxxx, // 发送时间，以服务端时间为准
      srcId: 10001, // 发送人
      aimId: 10002 // 目标id
    }
  }
}
allChatMsg 消息中的 key = msgSn + '-m'
消息存储都使用对象是为了防止相同信息多次接收时方便查找，
接收到多个相同消息以最后一次消息为准
```

```
当前聊天界面消息
1.打开界面，从消息列表(allChatMsg)中查找当前界面消息
2.踢出黑名单消息
3.添加时间提示
4.如果存在消息时，则开启消息状态定时器，检查消息的状态，如果状态60s内一直为0，则状态置为5并展示重发按钮
currentChatMsg 具体格式和allChatMsg相同

```

```
时间提示计算逻辑
第一条消息展示当前时间，其余消息间隔如果超过5min则显示时间
时间展示：
今天展示 13:10
其余展示 19/10/02
```

```
图片消息
1.图片本地压缩上传
2.发送图片消息
3.消息回调时替换消息

图片发送时本地建立完整的消息对象，
msgSn 取当前时间(毫秒)
time  取当前时间(秒)
1.发送消息后，建立图片消息key值映射
存储普通文本消息时key为回调消息里的msgSn
图片消息key为本地的msgSn(当前时间)，等消息回调后，将接收到的msg中的msgSn
于本地的msgSn建立映射，存储到 imgKeyMap中
imgKeyMap: {
  msgSn(回调): msgSn(本地时间msgSn)
}
2.图片信息更新时通过imgKeyMap查找消息，更新

注意：图片消息发送时由于时间跨度较大，可能存在发送过程中，
对方发送过来消息，消息时间要早于图片发送时间，正常展示，不排序
由于总消息列表顺序时间是对的，退出当前界面后重新读取消息列表就会发生改变
```



###### 细节
1.用户打开界面直接连接IM
2.连接成功后获取离线消息，合并到消息列表中






消息状态
1 已发送
2 已接收
3 已读  (3之前的状态都是未读)
4 已读状态已接收


状态4：
A用户发给B用户的离线消息，B用户登录后，发送已接收(2)和已读(3)状态
如果这时A用户离线，后台会记录B用户消息状态，A用户登录后会收到后台发来的消息状态
一旦A用户收到已读(3)的回执，则发送4的消息回执
收到已读(3)的回执时，如果消息体中携带时间，则将该时间之前的消息都设为
已读(针对客户端，客户端会存储消息，所以用户离线后在登录会获取到发送的消息，这时更新这些消息状态)
如果消息体中没有时间，则说明是单条消息(双方用户都在线时)，直接更新本条消息


离线消息：登录后分页查取所有离线消息
B用户收到某用户多条离线消息时，点开页面之后则该对话的所有消息在对方看来都是已读状态，消息总数也直接减少



客服离线消息获取：分页条数 1000
登录后分页获取，获取所有消息(比如说1万条数据，获取10次)
页面先展示100个用户

### 黑名单
功能：
* 添加黑名单
* 移除黑名单
* 读取黑名单
* 判断是否在黑名单中


###### 具体逻辑
1.用户连接IM
2.判断是否有本地存储黑名单，有则读取本地黑名单，否则从IM读取黑名单
3.用户加入/移除黑名单后更新本地记录
4.向黑名单用户发信息，IM不进行转发，直接发送receipt:1(已发送)
5.客户端加对方黑名单后隐藏所有该用户信息，新收到的消息也做同样处理





<div class="test">
测试
</div>

<style> 
.test {
  color: red;
}
</style>
一、PK相关
pk开始通知（PKMatchedNotify这个消息是通知主播的，不用接收了，使用PKStartNotify）
PKStartNotify(用户会收到)
具体消息定义：
// PK开始(比赛阶段)
message PKStartNotify
{
  int64  endTime                 = 2; // 截止时间
  int32  pkType                  = 3; // 1 随机 2 段位 3 邀请
  string pkTopic                 = 4; // pk主题
  int64  peerId                  = 5; // 对方ID
  string peerUsername            = 6; // 对方用户名
  string peerHeaderImageOriginal = 7; // 对方头像
  int64  peerRank                = 8; // 对方段位
  int64  peerVictoryTimes        = 9; // 对方连胜次数
  string peerPullStreamAddress   = 10; // 对方拉流地址
}
endTime截止时间直接在这里给你了，不需要从PKStatusChangeNotify这里接收了，其余字段没变。


// PK比赛阶段结束
message PKGameOverNotify
{
    int64    pkScore     = 1; // 我方PK值
    int64    peerPKScore = 2; // 对方PK值
    int64    winnerId    = 3;
    END_TYPE endType     = 4;
    MVP      mvp         = 5; // h5用不上
}

// PKGameOverNotify 中 END_TYPE
enum END_TYPE
{
    NATURAL = 0; // 自然结束
    MANUAL  = 1; // 手动结束(提前手动结束)
}


//PK数值更新
message PKScoreNotify{
    map<int64, int64> pkScore =1;//主播房间号:PK值
}

// 房间PK状态更新通知
message PKStatusChangeNotify
{
    int32    roomStatus   = 1; // 房间状态更新
    int32    pkStatus     = 2; // pk状态
    int64    endTime      = 3; // 状态结束时间点
}
房间信息增加 PKStatus
    0 空闲中  -- 初始值,我方拒绝,响铃超时,惩罚结束
    1 排队中  -- 申请随机PK或申请段位PK
    // 2 呼叫中  -- 邀请PK拨号中
    2 响铃中  -- 匹配成功询问主播是否同意开启 被其他主播邀请
    3 等待中  -- 我已同意,等待对方主播同意
    4 比赛中  -- 双方同意 邀请成功
    5 惩罚中  -- 比赛结束,惩罚中

pk流程：
1.PKStartNotify----pk开始消息，拉起PK页面，自己主播信息从直播间拿取
里面携带endTime，PK结束时间点，根据返回的服务端时间自己计算倒计时时间
2.PKGameOverNotify-----PK比赛阶段结束，收到这个信息结束PK比赛阶段，开始惩罚阶段，同时校准双方PK值。
如果倒计时结束时还没有收到这个消息，则按照倒计时为准结束比赛阶段
3.PKScoreNotify-----PK数值更新
4.PKStatusChangeNotify这个不知道还会不会收到，主要是主播端用到，用户端不用也没影响
5.PK惩罚阶段结束？，不知道会收到什么消息，没有看到其它消息定义了，可能会收到PKGameOverNotify，或者根据PKStatusChangeNotify这里的状态来判断。

二、登录im时需增加版本号：clientInfo
具体修改为:
CIM({
    account: 10018, // 用户id
    token: 'login token', // 登录token
    address: '', // 连接地址
    connectType: 'live_room', // 类型 ？暂无作用
    roomId: '', // 房间ID
    isAnonymous: false, // 是否是游客模式
    debug: true, // sdk是否输出log信息
    clientInfo: {
      appVersion：椰趣版本号 2.2.5/debug2.5.6  跟随椰趣版本
      systemName：android/iOS               h5
    }, // 版本信息
    ...
})

三、系统通知
onmsgs中增加新类型：pb_pub.ServiceNotify
后台触发的消息，可以找梁青青发
// 服务触发的消息 messageType = 2000
message ServiceNotify{
    int32 messageType =1;   // 消息类型，由客户端和服务提供者协商意义,
    string messageBody = 2; // json消息体
}