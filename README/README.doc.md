# 即时通信WEB端sdk
IM sdk只处理消息的转发，消息使用protobuf进行封装，具体类型由服务端设置

## 项目说明
### 1. 消息结构更新
  - 消息使用protobuf，由后端定义(简称pb)
  - 后台pb结构定义项目：git@github.com:leallee00/pb.git / https://github.com/leallee00/pb.git
  - 拉取pb.git项目后，在h5文件夹下点击gen_pb_js.sh，自动生成client_pb.json，将最新json拷贝到项目中即可(需要全局安装protobufjs)
  - 如果没有安装protobufjs 直接拷贝client_pb.json过去即可
``` protobuf
通用消息结构：

// 非rpc调用的消息传递使用此消息头封装
message PBMessage {
    uint32 version = 1; // 消息版本号
    uint32 checkCode = 2; // 校验码 unsigned byte类型表示的具体消息数据无符号字节累加值
    uint32 errCode = 3; // 错误码
    string service = 4; // 需要发往那个service :gate uc lc ...
    string hashKey = 5; // 转发到其他服务上去的hashkey, 可以是用户id，组id等
    PBCommData pbCommData = 6;
    map<string, string> opts = 7; // 控制参数

    // 具体消息内容
    string pbName = 8; // pb消息名称
    bytes pbData = 9; // 消息数据

    string errDesc = 10; // 错误描述信息
}

// 一些通用数据，每个消息都会携带，在整个服务系统中透传
message PBCommData{
    bool needReadReceipt = 1; //是否需要回执
    int64 msgSn = 2; // 消息序列号
    int64 srcId = 3; // 发起者id
    int64 aimId = 4; // 目标id
    int64 time = 5; // 消息发送时间 gate 上赋值
    map<string, string> exp = 6; // 扩展参数

    // v2.7.3
    bool needPushMsg = 7; // 是否需要推送
    Service serviceType = 8; // 服务类型

    // im_as_plat 新增
    int64 appId = 9;
    string appUserId = 10;

    // tracing 新增
    string traceId = 11;

    // 客户端类型
    CLIENT_TYPE srcClientType = 12; // 发送端类型
    CLIENT_TYPE aimClientType = 13; // 接收端类型

    int64 groupId = 14; // 群ID
    repeated int64 atList = 15; // @列表

    bool syncToSrc = 16; // 是否同步给src的其他端

    // 业务id,椰果需求新增, 范围比appId大: 各业务自行约定
    int32 businessId = 17;

    // 日志输出序列，每输出一次加一
    int64 serial = 18;

    // 派生树，值=值+serial
    string deriveTree = 19;
    int32 userSourceVersion = 20; //'用户资源版本号'
    int64 groupMsgSn = 21;// 群消息自增长序列号，每个群唯一，服务端生成
    int64 periodOfValidity = 22; // 有效期
}

// 客户端运行环境类型
enum CLIENT_RUN_ENV_TYPE{
    ANDROID = 0;
    IOS = 1;
    MAKOS = 2;
    WINDOWS = 3;
    LINUX = 4;
    LINUX_DEB = 5;
    PREV6 = 6;
    PREV7 = 7;
    PREV8 = 8;
}

enum CLIENT_TYPE {
    NONE = 0;
    PHONE = 1;
    H5 = 2;
    PC = 3;
    SERVER = 100; // 服务端发的
    ALL = 1000;
}

```

### 2、文件说明
- src
  - socket.js 主代码
  - config.js 配置文件
  - utils 工具
    - log.js log信息
    - network.js 网络异常检测
    - util.js 消息封装

### 3、使用方法
#### 建立连接及消息接收(消息发送方法，请查看具体分支)
```js
CIM({
    account: 10018, // 用户id
    token: 'login token', // 登录token
    address: '', // 连接地址
    connectType: 'live_room', // 类型 暂无作用
    roomId: '', // 房间ID
    isAnonymous: false, // 是否是游客模式
    debug: true, // sdk是否输出log信息
    onopen: () => {}, // 连接成功

    onliveroom: () => {}, // 直播间相关连接消息
    onmsgs: () => {}, // 直播间相关消息

    onhismsg: () => {}, // 历史消息
    onmarkmsgread: () => {}, // 更新消息状态
    onmessage: () => {}, //  聊天消息
    onofflinemsg: () => {}, // 离线消息
    onmarkinblacklist: () => {}, //  添加黑名单
    onblacklist: () => {}, //  读取黑名单列表
    onjudgeinblack: () => {}, //  是否在黑名单中


    onsdkchange: () => {}, // sdk和云信切换，基本没用了(早期为了稳定维护两套)
    onerror: () => {} // 连接异常
})
```

#### 具体方法参数说明
- onopen 网络连接成功通知
<!-- - onliveroom(res)  直播间
```js
res = {
  
}

``` 
-->
- onhismsg() 用户上线后拉取的历史消息，只在重新登录后同步一次
- onmarkmsgread(res) 更新消息状态，消息状态从  发送->已收->已读  状态变化时调用
``` js

// 服务器通用返回结构
res = {
  msgSn: 'xxx', // 消息唯一标识
  pbCommData: {xxx},
  state: 2/3/4, // 状态
  time: xxx // 后台返回的时间
}
```

- onmessage(res) 私聊消息
```js
// 私聊消息发送后的回执
res = {
  scene: 'p2p', // 场景，但是没用到
  state: 1, // 消息状态  1 已发送；2 送达；3 已接收；4 已读
  aimUserId: 110,
  pbCommData: {
    xxx // 请查看上面的pbCommData定义
  }
}
```

- onofflinemsg(list, totalOffLineNum) 离线消息
```js
list, totalOffLineNum
```
- onmarkinblacklist(res)   添加黑名单
```js
res = {
  type: xxx,
  aimId: xxx
}
1. 添加黑名单
  type: 'in'
  aimId: 110
2. 移除黑名单
  type: 'out'
  aimId: 110
```

- onblacklist(res)     黑名单列表
```js
res = [110,119]
```
- onjudgeinblack(res)
```js
res = 0/1  // 0不存在 1存在
```
- onsdkchange  sdk和云信切换
- onerror(res) 连接异常
```js
res = {
  code: xxx,
  message: xxx
}
1. 101  连接异常，重新连接
  code: 101 // java重新获取token
  message: '登录验证失败，正在重连'

2. 201  多端登录踢出
  message: 'xxx' // IM返回的
  reason: 'xxx' // IM返回的
  code: 201

3. 300  网络好了
  code: 300
  message: '网络重新连接成功'

4. 301 网络断开
  code: 301
  message: '网络已经断开'
              
```


