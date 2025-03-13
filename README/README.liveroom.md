### 直播间相关

#### 方法调用

- 聊天室连接

```js
CIM.enterLiveRoom({ roomId: 10011 })
```

- 退出聊天室

```js
CIM.leaveLiveRoom({ roomId: 10011 })
```

- 发送聊天室消息（老版本消息）

```js
CIM.sendLiveRoomMsg({
      MessageType: params.MessageType,
      MessageBody: params.MessageBody,
      IsImMessage: params.IsImMessage 
})
```

- 历史消息

```js
CIM.hisRoomMsg({ roomId: 10011 })
```

- 进房间成功后触发请求

```js
CIM.EnterRoomReadyReq()
```

- 聊天室相关消息（进场消息，弹幕消息，普通消息，行为消息）
```js
CIM.sendRoomMsg({ name: '', body: '' })
```
注：name: 消息类型名；body：消息体。
```js
1. 进场消息
name: .pb_msg_live_room.AudienceEnterRoom
body: {
      userProp: {} // 用户属性
      horseEffectUrl = '...' //  坐骑地址
      headerImageOriginal: '...' // 用户的头像，飘屏的时候展示用
      horseEffectName: '...' // 坐骑名称
}

2. 弹幕消息
name: .pb_msg_live_room.RoomBarrage
body: {
      userProp: {} // 用户属性
      msg = '...' //  消息体
      type: 1 // 弹幕类型 1 房间弹幕 2 全站弹幕
      headerImageOriginal: '...' // 用户的头像，飘屏的时候展示用
}

3. 普通消息
name: .pb_msg_live_room.RoomNormal
body: {
      userProp: {} // 用户属性
      msg = '...' //  消息体
      targetUserName: ['...', '...'] // 被@的用户用户名列表
      targetUserId: [111, 222] // 被@的用户ID列表
}

4. 行为消息
name: .pb_msg_live_room.RoomAction
body: {
      userProp: {} // 用户属性
      type = 0 //  具体消息类型
      exp: {key:value} // 扩展字段
}
行为消息类型说明：
UNKNOWN         = 0;
GIFT            = 1; 礼物
FOLLOW          = 2; 关注
SHARE           = 3; 分享
LIGHT           = 4; 点亮
UPGRADE         = 5; 升级
FISH            = 9; 钓鱼游戏
```

#### 消息接收(回调)
- 直播间相关消息
```js
onmsgs: (res) => {}
res = {
      time: 111111,
      type: 'pb_msg_live_room.RoomAction',
      body: ''
}
类型说明
1. 礼物跑道消息
type: 'pb_msg_live_room.RoomAction'
body: {
    int userId = 1; // 发送的用户ID
    int giftId = 2; // 礼物ID
    int actorId = 3; // 发送的房间ID即主播ID
    int giftNumber = 4; // 送礼数量
    // int luckyGift = 5; // 礼物类型 int 【普通礼物，夺宝礼物，福袋】 是否为幸运礼物
    string senderName = '...'; // 发送的用户名
    string targetName = '...'; // 发送的房间名字即主播名字
    string headImg = 8; // 发送的用户头像
    int level = 9; // 等级
    int batteryType = 10; //单词连击的个数
    int batteryTypeList = [2, 6]; //每次连击的个数数组
    bool levelPrivilegeOpen = false; //是否神秘人
    int giftConfLastUpdateTime = 13; // 缓存时间
    exp = {key:value}; // 扩展字段
    int giftType = 15; // 礼物类型 0：普通礼物 1：幸运礼物 2：福袋 3：钓鱼 4：幸运补偿
}
```


##### 公用消息体 userProp
      bool    levelPrivilege      = 1;  // 是否是神秘人
      int   nobleGrade          = 2;  // 贵族类型 1 子爵 2 伯爵 3 侯爵 4 公爵 5 亲王 6 国王 7 皇帝
      string  username            = 3;  // 用户名字
      int   userId              = 4;  // 用户ID
      int   userLevel           = 5;  // 用户等级
      string  medalUrl            = 6;  // 勋章
      int   guardType           = 7;  // 守护类型 1 白银 2 黄金 3 钻石
      string  userDefineEquipName = 8;  // 守护名字
      int   role                = 9;  // 用户角色 1 当前主播 2 房管 3 超管
      int   managerSubType      = 10; // 超管类型 1 超管 2 巡管 3 客服
      int   fansCardStatus      = 11; // 粉丝牌状态 0 未加入，1 加入未过期 2 加入已过期
      int   fansCardLevel       = 12; // 粉丝牌等级 
      int   corpType            = 13; // 超级粉丝团类型





直播间消息改造
原消息类型：

```
1.普通消息
2.艾特消息
3.房间弹幕
4.全站弹幕
5.礼物消息
6.欢迎消息
7.禁言
8.解除禁言
9.踢出房间
10.机器人进场欢迎消息
11.机器人发送房间消息
12.房间系统消息(被任命为房管)
24.房间行为消息(送礼/关注/分享/点亮/用户升级/6开通粉丝团/7开通守护行为)
26.豪华礼物顶部通知
(1:豪华礼物顶部通知 2:抢红包全站广播 3:升级消息 4:抽奖 5:福袋 6：泳装抢宝箱活动 8：红包 9： 许愿池（交友这边没有许愿池） 10: 幸运礼物暴击即将开始
      // 11： 幸运暴击奖励的全站通知)
29.抽奖顶部通知(1 普通 2 稀有)
30.活动消息推送
31.直播间公告
33.周星活动
43.对方PK值接收
44.守护之心变更
45.2分钟交流/惩罚结束，PK值接收
46.开通粉丝团
47.开通守护
66.自己房间火箭全站消息
```

```
1 2/RoomNormal
3 4/RoomBarrage
5 24  RoomAction  1送礼/2关注/3分享/4点亮/5用户升级/9钓鱼
6 AudienceEnterRoom  IM发送
12 ServiceNotify
```

```
PKStatusChangeNotify  PK状态通知，
 （   0 空闲中  -- 初始值,我方拒绝,响铃超时,惩罚结束
    1 排队中  -- 申请随机PK或申请段位PK
    // 2 呼叫中  -- 邀请PK拨号中
    2 响铃中  -- 匹配成功询问主播是否同意开启 被其他主播邀请
    3 等待中  -- 我已同意,等待对方主播同意
    4 比赛中  -- 双方同意 邀请成功
    5 惩罚中  -- 比赛结束,惩罚中）
PKMatchedNotify PK开始
PKGameOverNotify  PK结束
PKScoreNotify  PK数值更新
```

注意：LiveRoomGift 送礼时 java 调用 im 使用的
