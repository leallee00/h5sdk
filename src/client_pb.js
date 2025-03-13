module.exports = {
  "options": {
    "go_package": "source.yzsci.cn/go_im/pb/pb_pub"
  },
  "nested": {
    "pb_msg_admin": {
      "nested": {
        "AdminLogonRsp": {
          "fields": {
            "adminId": {
              "type": "int64",
              "id": 1
            },
            "adminUser": {
              "type": "string",
              "id": 2
            },
            "authorization": {
              "type": "string",
              "id": 3
            }
          }
        },
        "LogonUPReq": {
          "fields": {
            "adminName": {
              "type": "string",
              "id": 1
            },
            "adminPasswd": {
              "type": "string",
              "id": 2
            },
            "host": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UpdateTable": {
          "fields": {
            "updateCol": {
              "type": "string",
              "id": 1
            },
            "updateValue": {
              "type": "string",
              "id": 2
            },
            "exps": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_blackList": {
      "nested": {
        "ReadBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ReadBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "JudgeBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "JudgeBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "state": {
              "type": "Judge_State",
              "id": 2
            }
          }
        },
        "SaveBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "SaveBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteBlackListReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteBlackListRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "Judge_State": {
          "values": {
            "NOT_EXIST": 0,
            "EXIST": 1
          }
        }
      }
    },
    "pb_msg_call_scene": {
      "nested": {
        "CALL_SCENE_STATE": {
          "values": {
            "CALL_SCENE_STATE_INIT": 0,
            "CALL_SCENE_STATE_CALLING": 1,
            "CALL_SCENE_STATE_ONLINE": 2,
            "CALL_SCENE_STATE_CALL_END": 3
          }
        },
        "CALL_OVER_RESION": {
          "values": {
            "CALL_OVER_RESION_TIMEOUT": 0,
            "CALL_OVER_RESION_CALLEE_NOT_ONLINE": 1,
            "CALL_OVER_RESION_CALLEE_NO_ANSWER": 2,
            "CALL_OVER_RESION_CALLEE_OFFLINE": 3,
            "CALL_OVER_RESION_CALLER_OFFLINE": 4,
            "CALL_OVER_RESION_CALLER_HANGUP": 5,
            "CALL_OVER_RESION_CALLEE_HANGUP": 6,
            "CALL_OVER_RESION_BALANCE_NOT_ENOUGH": 7
          }
        },
        "CALL_TYPE": {
          "values": {
            "CALL_TYPE_UNKNOWN": 0,
            "CALL_TYPE_VIDEO": 1,
            "CALL_TYPE_VOICE": 2
          }
        },
        "DialReq": {
          "fields": {
            "CalleeId": {
              "type": "int64",
              "id": 1
            },
            "CallType": {
              "type": "CALL_TYPE",
              "id": 2
            },
            "ChatCoinType": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "DialRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "WaitForCalleeAnswerNotifyToServer": {
          "fields": {
            "CalleeId": {
              "type": "int64",
              "id": 1
            },
            "YXChatId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "AnswerCallReq": {
          "fields": {
            "answer": {
              "type": "ANSWER_OF_CALL",
              "id": 1
            }
          }
        },
        "AnswerCallRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ANSWER_OF_CALL": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "HangUpReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "sceneId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "HangUpRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "code": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "CallOverNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "CallerTotalFee": {
              "type": "int64",
              "id": 3
            },
            "CalleeTotalEarn": {
              "type": "int64",
              "id": 4
            },
            "CallTime": {
              "type": "int64",
              "id": 5
            },
            "CallOverResion": {
              "type": "CALL_OVER_RESION",
              "id": 6
            }
          }
        },
        "CallSceneStateChangeNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "YXChatId": {
              "type": "int64",
              "id": 3
            },
            "OldState": {
              "type": "CALL_SCENE_STATE",
              "id": 4
            },
            "NewState": {
              "type": "CALL_SCENE_STATE",
              "id": 5
            }
          }
        },
        "SceneRecoverNotify": {
          "fields": {
            "Caller": {
              "type": "int64",
              "id": 1
            },
            "Callee": {
              "type": "int64",
              "id": 2
            },
            "SceneBeginTime": {
              "type": "int64",
              "id": 3
            },
            "OnLineBeginTime": {
              "type": "int64",
              "id": 4
            },
            "YXChatId": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "WealthChangeNotify": {
          "fields": {
            "WealthType": {
              "type": "WealthType",
              "id": 1
            },
            "Change": {
              "type": "int64",
              "id": 2
            },
            "Leave": {
              "type": "int64",
              "id": 3
            },
            "Reason": {
              "type": "WealthChangeReason",
              "id": 4
            }
          }
        },
        "WealthType": {
          "values": {
            "Unknown": 0,
            "Balance": 1,
            "YeCoin": 2
          }
        },
        "WealthChangeReason": {
          "values": {
            "CallFee": 0,
            "EarnCallFee": 1
          }
        }
      }
    },
    "pb_msg_chart": {
      "nested": {
        "PersonalGift": {
          "fields": {
            "gift": {
              "type": "pb_pub.Gift",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_gate": {
      "nested": {
        "LOGIN_TOCKEN_TYPE": {
          "values": {
            "LOGIN_TOCKEN_TYPE_JAVA": 0,
            "LOGIN_TOCKEN_TYPE_IM": 1,
            "LOGIN_TOCKEN_TYPE_UNI_USER": 2
          }
        },
        "LoginReq": {
          "fields": {
            "token": {
              "type": "string",
              "id": 2
            },
            "tokenType": {
              "type": "LOGIN_TOCKEN_TYPE",
              "id": 3
            },
            "gateAddrNew": {
              "type": "string",
              "id": 4
            },
            "clientInfo": {
              "type": "ClientInfo",
              "id": 6
            }
          }
        },
        "ThirdLoginReq": {
          "fields": {
            "AppId": {
              "type": "string",
              "id": 1
            },
            "AppSecret": {
              "type": "string",
              "id": 2
            },
            "AppUserId": {
              "type": "int64",
              "id": 3
            },
            "token": {
              "type": "string",
              "id": 4
            },
            "tokenType": {
              "type": "LOGIN_TOCKEN_TYPE",
              "id": 5
            },
            "gateAddrNew": {
              "type": "string",
              "id": 6
            },
            "IMSdkVersion": {
              "type": "int32",
              "id": 7
            },
            "clientInfo": {
              "type": "ClientInfo",
              "id": 8
            }
          }
        },
        "ClientInfo": {
          "fields": {
            "modelType": {
              "type": "pb_pub.MODEL_TYPE",
              "id": 1
            },
            "packageName": {
              "type": "string",
              "id": 2
            },
            "systemVersion": {
              "type": "string",
              "id": 3
            },
            "phoneModels": {
              "type": "string",
              "id": 4
            },
            "appVersion": {
              "type": "string",
              "id": 5
            },
            "systemName": {
              "type": "string",
              "id": 6
            },
            "identifier": {
              "type": "string",
              "id": 7
            },
            "xChannel": {
              "type": "string",
              "id": 8
            }
          }
        },
        "LoginRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            },
            "reconnectToken": {
              "type": "string",
              "id": 3
            },
            "gateAddrOld": {
              "type": "string",
              "id": 4
            },
            "msgSn": {
              "type": "int64",
              "id": 5
            },
            "appUserId": {
              "type": "int64",
              "id": 6
            },
            "appId": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "ChatText": {
          "fields": {
            "aimUserId": {
              "type": "int64",
              "id": 2
            },
            "chatType": {
              "type": "pb_pub.TextChatType",
              "id": 3
            },
            "data": {
              "type": "string",
              "id": 4
            },
            "text": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "ChatMessage": {
          "fields": {
            "businessType": {
              "type": "BUSINESS_TYPE",
              "id": 1
            },
            "text": {
              "type": "ChatText",
              "id": 2
            }
          }
        },
        "BUSINESS_TYPE": {
          "values": {
            "UNKNOWN": 0,
            "SECRET_ROOM": 1
          }
        },
        "KickOffUser": {
          "fields": {
            "optUId": {
              "type": "int64",
              "id": 1
            },
            "aimUId": {
              "type": "int64",
              "id": 2
            },
            "reason": {
              "type": "int32",
              "id": 3
            },
            "desc": {
              "type": "string",
              "id": 4
            }
          }
        }
      }
    },
    "pb_msg_live_room": {
      "nested": {
        "UCGameInfo": {
          "fields": {
            "judge": {
              "type": "UCGamePlayer",
              "id": 1
            },
            "undercoverSide": {
              "type": "UCGameSide",
              "id": 2
            },
            "populaceSide": {
              "type": "UCGameSide",
              "id": 3
            }
          }
        },
        "UCGameSide": {
          "fields": {
            "word": {
              "type": "string",
              "id": 1
            },
            "players": {
              "rule": "repeated",
              "type": "UCGamePlayer",
              "id": 2
            }
          }
        },
        "UCGamePlayer": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "headImage": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UCGameStartReq": {
          "fields": {
            "undercoverWord": {
              "type": "string",
              "id": 1
            },
            "populaceWord": {
              "type": "string",
              "id": 2
            },
            "undercoverCount": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "UCGameStartRsp": {
          "fields": {
            "gameInfo": {
              "type": "UCGameInfo",
              "id": 1
            }
          }
        },
        "UCGamePlayerInfo": {
          "fields": {
            "word": {
              "type": "string",
              "id": 1
            }
          }
        },
        "UCGameStartNotify": {
          "fields": {
            "undercoverCount": {
              "type": "int32",
              "id": 1
            },
            "populaceCount": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UCGameOverNotify": {
          "fields": {
            "gameInfo": {
              "type": "UCGameInfo",
              "id": 1
            },
            "winner": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UCGamePlayers": {
          "fields": {
            "players": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "LiveStartReq": {
          "fields": {
            "roomType": {
              "type": "RoomType",
              "id": 1
            },
            "roomName": {
              "type": "string",
              "id": 2
            }
          }
        },
        "LiveStartRsp": {
          "fields": {
            "streamType": {
              "type": "int32",
              "id": 1
            },
            "pushStreamAddress": {
              "type": "string",
              "id": 2
            },
            "liveMode": {
              "type": "int32",
              "id": 3
            },
            "coverImage": {
              "type": "string",
              "id": 4
            },
            "unPassReason": {
              "type": "string",
              "id": 5
            },
            "coverStatus": {
              "type": "string",
              "id": 6
            },
            "canLiveStatus": {
              "type": "bool",
              "id": 7
            },
            "message": {
              "type": "string",
              "id": 8
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 9
            }
          }
        },
        "LiveStopReq": {
          "fields": {}
        },
        "LiveStopRsp": {
          "fields": {}
        },
        "LiveStartSuccessReq": {
          "fields": {}
        },
        "LiveStartSuccessRsp": {
          "fields": {}
        },
        "LiveStartNotify": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "title": {
              "type": "string",
              "id": 3
            },
            "type": {
              "type": "int32",
              "id": 4
            },
            "nickName": {
              "type": "string",
              "id": 5
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 6
            }
          }
        },
        "AudienceEnterLiveReq": {
          "fields": {}
        },
        "UserEnterLiveRsp": {
          "fields": {
            "streamType": {
              "type": "int32",
              "id": 1
            },
            "wordUpdateTime": {
              "type": "string",
              "id": 2
            }
          }
        },
        "LiveUserPropsNotify": {
          "fields": {
            "MountInfo": {
              "type": "string",
              "id": 1
            },
            "FansInfo": {
              "type": "string",
              "id": 2
            }
          }
        },
        "RoomStatus": {
          "values": {
            "NORMAL": 0,
            "LIVE_STOP": 1
          }
        },
        "RoomStatusNotify": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "roomStatus": {
              "type": "RoomStatus",
              "id": 2
            }
          }
        },
        "YXCommMsgNode": {
          "fields": {
            "yxMsg": {
              "type": "pb_pub.YXCommMsg",
              "id": 1
            },
            "time": {
              "type": "int64",
              "id": 2
            },
            "sn": {
              "type": "int64",
              "id": 4
            },
            "srcUserId": {
              "type": "int64",
              "id": 5
            },
            "groupId": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "HistoryMsg": {
          "fields": {
            "pbData": {
              "type": "bytes",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "msgSn": {
              "type": "int64",
              "id": 4
            },
            "srcId": {
              "type": "int64",
              "id": 5
            },
            "groupId": {
              "type": "int64",
              "id": 6
            },
            "msgType": {
              "type": "pb_pub.MessageType",
              "id": 7
            }
          }
        },
        "HistoryYXCommMsgReq": {
          "fields": {}
        },
        "HistoryYXCommMsgRsp": {
          "fields": {
            "msgNum": {
              "type": "int64",
              "id": 1
            },
            "msgList": {
              "rule": "repeated",
              "type": "YXCommMsgNode",
              "id": 2
            },
            "latestSn": {
              "type": "int64",
              "id": 3
            },
            "historyMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            },
            "latestMsgSn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ReloadYXCommMsgReq": {
          "fields": {
            "sn": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ReloadYXCommMsgRsp": {
          "fields": {
            "msgNum": {
              "type": "int64",
              "id": 1
            },
            "msgList": {
              "rule": "repeated",
              "type": "YXCommMsgNode",
              "id": 2
            },
            "latestSn": {
              "type": "int64",
              "id": 3
            },
            "historyMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            },
            "latestMsgSn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "PKScoreNotify": {
          "fields": {
            "pkScore": {
              "keyType": "int64",
              "type": "int64",
              "id": 1
            }
          }
        },
        "PKPROPNotify": {
          "fields": {
            "giftId": {
              "type": "int64",
              "id": 1
            },
            "giftImage": {
              "type": "string",
              "id": 2
            },
            "giftName": {
              "type": "string",
              "id": 3
            },
            "actorId": {
              "type": "int64",
              "id": 4
            },
            "targetName": {
              "type": "string",
              "id": 5
            },
            "userId": {
              "type": "int64",
              "id": 6
            },
            "headImg": {
              "type": "string",
              "id": 7
            },
            "senderName": {
              "type": "string",
              "id": 8
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 9
            },
            "startTime": {
              "type": "int64",
              "id": 10
            },
            "endTime": {
              "type": "int64",
              "id": 11
            },
            "curTime": {
              "type": "int64",
              "id": 12
            },
            "giftNumber": {
              "type": "int64",
              "id": 13
            }
          }
        },
        "LiveRoomGift": {
          "fields": {
            "gift": {
              "type": "pb_pub.Gift",
              "id": 1
            }
          }
        },
        "HostMode": {
          "fields": {
            "isHostMode": {
              "type": "bool",
              "id": 1
            },
            "isCurrentHostMode": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "RoomInfo": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "onLineNum": {
              "type": "int64",
              "id": 2
            },
            "roomStatus": {
              "type": "int32",
              "id": 3
            },
            "switchToBack": {
              "type": "bool",
              "id": 22
            },
            "actorId": {
              "type": "int64",
              "id": 4
            },
            "imId": {
              "type": "string",
              "id": 5
            },
            "roomNotice": {
              "type": "string",
              "id": 6
            },
            "actorLevel": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "actorCurrentExperience": {
              "type": "int64",
              "id": 9
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 10
            },
            "headPendantUrl": {
              "type": "string",
              "id": 11
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 12
            },
            "recentReceiveCoins": {
              "type": "int64",
              "id": 13
            },
            "nickName": {
              "type": "string",
              "id": 14
            },
            "fansCardName": {
              "type": "string",
              "id": 15
            },
            "broadcastLimitCoins": {
              "type": "int64",
              "id": 20
            },
            "updateTime": {
              "type": "int64",
              "id": 21
            },
            "roomType": {
              "type": "RoomType",
              "id": 23
            },
            "exp": {
              "keyType": "string",
              "type": "bytes",
              "id": 24
            },
            "pullStreamAddress": {
              "type": "string",
              "id": 25
            },
            "roomName": {
              "type": "string",
              "id": 26
            },
            "backgroundImageUrl": {
              "type": "string",
              "id": 27
            },
            "rank": {
              "type": "int64",
              "id": 41
            },
            "victoryTimes": {
              "type": "int64",
              "id": 42
            },
            "dynamicBackgroundImage": {
              "type": "string",
              "id": 43
            },
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 45
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 46
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 47
            }
          }
        },
        "UserProp": {
          "fields": {
            "levelPrivilege": {
              "type": "bool",
              "id": 1
            },
            "nobleGrade": {
              "type": "int32",
              "id": 2
            },
            "username": {
              "type": "string",
              "id": 3
            },
            "userId": {
              "type": "int64",
              "id": 4
            },
            "userLevel": {
              "type": "int32",
              "id": 5
            },
            "medalUrl": {
              "type": "string",
              "id": 6
            },
            "guardType": {
              "type": "int32",
              "id": 7
            },
            "userDefineEquipName": {
              "type": "string",
              "id": 8
            },
            "role": {
              "type": "int32",
              "id": 9
            },
            "managerSubType": {
              "type": "int32",
              "id": 10
            },
            "fansCardStatus": {
              "type": "int32",
              "id": 11
            },
            "fansCardLevel": {
              "type": "int32",
              "id": 12
            },
            "corpType": {
              "type": "int32",
              "id": 13
            },
            "headImg": {
              "type": "string",
              "id": 14
            },
            "nobilityMedalUrl": {
              "type": "string",
              "id": 15
            },
            "guardMedalType": {
              "type": "int32",
              "id": 16
            }
          }
        },
        "EnterRoomReadyReq": {
          "fields": {}
        },
        "EnterRoomReadyRsp": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "userStatus": {
              "type": "int64",
              "id": 2
            },
            "horseEffectUrl": {
              "type": "string",
              "id": 3
            },
            "concrenRealtion": {
              "type": "bool",
              "id": 4
            },
            "userCurrentExperience": {
              "type": "int64",
              "id": 5
            },
            "horseEffectName": {
              "type": "string",
              "id": 6
            },
            "mAnchorRole": {
              "type": "MAnchorRole",
              "id": 7
            }
          }
        },
        "AudienceEnterRoom": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "horseEffectUrl": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "horseEffectName": {
              "type": "string",
              "id": 4
            }
          }
        },
        "RoomBarrage": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "type": {
              "type": "int32",
              "id": 3
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 4
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 5
            }
          }
        },
        "RoomNormal": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "targetUserName": {
              "rule": "repeated",
              "type": "string",
              "id": 3
            },
            "targetUserId": {
              "rule": "repeated",
              "type": "int64",
              "id": 4
            }
          }
        },
        "RoomAction": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "type": {
              "type": "ACTION_TYPE",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        },
        "ACTION_TYPE": {
          "values": {
            "UNKNOWN": 0,
            "GIFT": 1,
            "FOLLOW": 2,
            "SHARE": 3,
            "LIGHT": 4,
            "UPGRADE": 5,
            "FISH": 9,
            "REENTER": 10
          }
        },
        "UpdatedUserInfo": {
          "fields": {
            "nobleGrade": {
              "type": "int32",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "userLevel": {
              "type": "int32",
              "id": 3
            },
            "medalUrl": {
              "type": "string",
              "id": 4
            },
            "guardType": {
              "type": "int32",
              "id": 5
            },
            "userDefineEquipName": {
              "type": "string",
              "id": 6
            },
            "role": {
              "type": "int32",
              "id": 7
            },
            "fansCardStatus": {
              "type": "int32",
              "id": 8
            },
            "fansCardLevel": {
              "type": "int32",
              "id": 9
            },
            "corpType": {
              "type": "int32",
              "id": 10
            },
            "guardMedalType": {
              "type": "int32",
              "id": 11
            }
          }
        },
        "UpdatedRoomInfo": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "RoomType": {
          "values": {
            "Unknow": 0,
            "Video": 1,
            "Audio": 2,
            "Party": 3
          }
        },
        "MAnchorRole": {
          "values": {
            "Audience": 0,
            "Anchor": 1,
            "Owner": 2,
            "Manager": 3
          }
        },
        "MAnchorData": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "videoState": {
              "type": "int32",
              "id": 2
            },
            "audioState": {
              "type": "int32",
              "id": 3
            },
            "nickName": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            },
            "score": {
              "type": "int64",
              "id": 6
            },
            "mAnchorRole": {
              "type": "MAnchorRole",
              "id": 7
            },
            "pullStreamUrl": {
              "type": "string",
              "id": 8
            },
            "forbidState": {
              "type": "int32",
              "id": 9
            },
            "gender": {
              "type": "string",
              "id": 10
            },
            "authAccess": {
              "type": "string",
              "id": 11
            }
          }
        },
        "MWaitUser": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            },
            "level": {
              "type": "int32",
              "id": 4
            },
            "loc": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "MAnchorScoreChangeNotify": {
          "fields": {
            "score": {
              "type": "int64",
              "id": 1
            },
            "actorId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "BillboardChangeNotify": {
          "fields": {
            "users": {
              "rule": "repeated",
              "type": "Billboard",
              "id": 1
            }
          }
        },
        "Billboard": {
          "fields": {
            "actorGrade": {
              "type": "int32",
              "id": 1
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "isLiving": {
              "type": "bool",
              "id": 4
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "score": {
              "type": "int64",
              "id": 7
            },
            "userId": {
              "type": "int64",
              "id": 8
            },
            "userLevel": {
              "type": "string",
              "id": 9
            }
          }
        },
        "MAnchorLocChangeNotify": {
          "fields": {
            "chair": {
              "type": "MAnchorData",
              "id": 1
            },
            "bentch": {
              "keyType": "int32",
              "type": "MAnchorData",
              "id": 2
            }
          }
        },
        "WaitBenchListChangeNotify": {
          "fields": {
            "waitQue": {
              "rule": "repeated",
              "type": "MWaitUser",
              "id": 1
            }
          }
        },
        "OffAnchorReq": {
          "fields": {}
        },
        "OffAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "OnChairReq": {
          "fields": {}
        },
        "OnChairRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            }
          }
        },
        "OnAnchorReq": {
          "fields": {
            "loc": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "OnAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ChairManPutOnAnchorReq": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChairManPutOnAnchorRsp": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ChairManPutOnAnchorNotify": {
          "fields": {
            "anchorLoc": {
              "type": "int32",
              "id": 1
            },
            "optId": {
              "type": "int64",
              "id": 2
            },
            "aimId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceReq": {
          "fields": {
            "inviteeId": {
              "type": "int64",
              "id": 1
            },
            "inviterId": {
              "type": "int64",
              "id": 2
            },
            "roomId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "Enter3TChannelResultNotifyToServer": {
          "fields": {
            "Result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "AnswerType": {
          "values": {
            "Agree": 0,
            "Refuse": 1
          }
        },
        "ChairManInviteAudienceAnswerReq": {
          "fields": {
            "inviteeId": {
              "type": "int64",
              "id": 1
            },
            "inviterId": {
              "type": "int64",
              "id": 2
            },
            "answerType": {
              "type": "AnswerType",
              "id": 3
            }
          }
        },
        "ChairManInviteAudienceAnswerRsp": {
          "fields": {
            "anchorLoc": {
              "type": "int32",
              "id": 1
            },
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 2
            }
          }
        },
        "ChairManOffAnchorReq": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChairManOffAnchorRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "ChairManOffAnchorNotify": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "RecoverLiveRoomReq": {
          "fields": {}
        },
        "RecoverLiveRoomRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
        "VideoStateChangeNotify": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "AudioStateChangeNotify": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "RoomMsgExpression": {
          "fields": {
            "expressionId": {
              "type": "int32",
              "id": 1
            },
            "loc": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            }
          }
        },
        "KickUserOutNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ForbidStateChangeNotify": {
          "fields": {
            "aimId": {
              "type": "int64",
              "id": 1
            },
            "state": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "LiveGiftNotify": {
          "fields": {
            "sender": {
              "type": "UserProp",
              "id": 1
            },
            "roomType": {
              "type": "RoomType",
              "id": 2
            },
            "sendType": {
              "type": "SendType",
              "id": 3
            },
            "receivers": {
              "rule": "repeated",
              "type": "Receiver",
              "id": 4
            },
            "gift": {
              "type": "LiveGift",
              "id": 5
            }
          },
          "nested": {
            "SendType": {
              "values": {
                "SINGLE": 0,
                "MULTI": 1
              }
            }
          }
        },
        "Receiver": {
          "fields": {
            "actorId": {
              "type": "int64",
              "id": 1
            },
            "actorName": {
              "type": "string",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 4
            }
          }
        },
        "LiveGift": {
          "fields": {
            "giftId": {
              "type": "int64",
              "id": 1
            },
            "giftNumber": {
              "type": "int64",
              "id": 2
            },
            "giftType": {
              "type": "int32",
              "id": 3
            },
            "giftConfLastUpdateTime": {
              "type": "int64",
              "id": 4
            },
            "batteryType": {
              "type": "int32",
              "id": 5
            },
            "batteryTypeList": {
              "rule": "repeated",
              "type": "int64",
              "id": 6
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 7
            }
          }
        },
        "MultiAnchorScoreChangeNotify": {
          "fields": {
            "anchors": {
              "rule": "repeated",
              "type": "Anchor",
              "id": 1
            }
          },
          "nested": {
            "Anchor": {
              "fields": {
                "score": {
                  "type": "int64",
                  "id": 1
                },
                "actorId": {
                  "type": "int64",
                  "id": 2
                }
              }
            }
          }
        },
        "InvestorChangeNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 4
            }
          }
        },
        "BackgroundChangeNotify": {
          "fields": {
            "dynamicBackgroundImage": {
              "type": "string",
              "id": 1
            }
          }
        },
        "Chatter": {
          "fields": {
            "userProp": {
              "type": "UserProp",
              "id": 1
            },
            "videoState": {
              "type": "int32",
              "id": 4
            },
            "audioState": {
              "type": "int32",
              "id": 5
            },
            "leaveState": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "ChatRoomInfo": {
          "fields": {
            "caller": {
              "type": "Chatter",
              "id": 1
            },
            "callee": {
              "type": "Chatter",
              "id": 2
            },
            "interval": {
              "type": "int64",
              "id": 3
            },
            "price": {
              "type": "int64",
              "id": 4
            },
            "deadline": {
              "type": "int64",
              "id": 5
            },
            "autoRenewal": {
              "type": "bool",
              "id": 6
            },
            "oneMore": {
              "type": "bool",
              "id": 7
            },
            "channelId": {
              "type": "string",
              "id": 8
            }
          }
        },
        "UpdateChatPrice": {
          "fields": {
            "interval": {
              "type": "int64",
              "id": 1
            },
            "price": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChatApplyReq": {
          "fields": {
            "calleeId": {
              "type": "int64",
              "id": 1
            },
            "callerId": {
              "type": "int64",
              "id": 2
            },
            "callerName": {
              "type": "string",
              "id": 3
            },
            "callerHeaderImage": {
              "type": "string",
              "id": 4
            },
            "inviteTime": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ChatApplyRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatCancelReq": {
          "fields": {
            "calleeId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChatCancelRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatAnswerReq": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "answer": {
              "type": "CHAT_ANSWER",
              "id": 2
            }
          }
        },
        "CHAT_ANSWER": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "ChatAnswerRsp": {
          "fields": {
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "calleeId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "ChatCloseReq": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChatCloseRsp": {
          "fields": {}
        },
        "SetMicrophoneState": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "SetLeaveState": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "SetOneMore": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "SetAutoRenewal": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "state": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "ChatCountChangeNotify": {
          "fields": {
            "count": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "FetchChatRoomsReq": {
          "fields": {}
        },
        "FetchChatRoomsRsp": {
          "fields": {
            "rooms": {
              "rule": "repeated",
              "type": "ChatRoomSummery",
              "id": 1
            }
          }
        },
        "ChatRoomSummery": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "callerUsername": {
              "type": "string",
              "id": 3
            },
            "calleeUsername": {
              "type": "string",
              "id": 4
            },
            "callerHeadimage": {
              "type": "string",
              "id": 5
            },
            "calleeheadimage": {
              "type": "string",
              "id": 6
            }
          }
        },
        "ChatStartNotify": {
          "fields": {
            "info": {
              "type": "ChatRoomInfo",
              "id": 1
            }
          }
        },
        "ChatCreateNotify": {
          "fields": {
            "room": {
              "type": "ChatRoomSummery",
              "id": 1
            }
          }
        },
        "DeadlineChangeNotify": {
          "fields": {
            "deadline": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChatCloseNotify": {
          "fields": {
            "callerId": {
              "type": "int64",
              "id": 1
            },
            "calleeId": {
              "type": "int64",
              "id": 2
            },
            "closeType": {
              "type": "CHAT_CLOSE_TYPE",
              "id": 3
            }
          }
        },
        "CHAT_CLOSE_TYPE": {
          "values": {
            "TIMEOUT": 0,
            "MANUAL": 1,
            "BY_HOST": 2
          }
        },
        "BalanceChangeNotify": {
          "fields": {
            "coinBalance": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "HostCloseSoonNotify": {
          "fields": {}
        },
        "SecretGift": {
          "fields": {
            "senderId": {
              "type": "int64",
              "id": 1
            },
            "receiverId": {
              "type": "int64",
              "id": 2
            },
            "gift": {
              "type": "LiveGift",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_lucky": {
      "nested": {
        "LuckyReq": {
          "fields": {
            "betChips": {
              "type": "int64",
              "id": 1
            },
            "betCount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "LuckyBean": {
          "fields": {
            "No": {
              "type": "int64",
              "id": 1
            },
            "BetChips": {
              "type": "int64",
              "id": 2
            },
            "Chance": {
              "type": "int64",
              "id": 3
            },
            "Odds": {
              "type": "int64",
              "id": 4
            },
            "WinChips": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "LuckyRsp": {
          "fields": {
            "betChips": {
              "type": "int64",
              "id": 1
            },
            "betCount": {
              "type": "int64",
              "id": 2
            },
            "luckyTotalCount": {
              "type": "int64",
              "id": 3
            },
            "luckyTotalChips": {
              "type": "int64",
              "id": 4
            },
            "luckyBean": {
              "rule": "repeated",
              "type": "LuckyBean",
              "id": 5
            }
          }
        }
      }
    },
    "pb_msg_msgAnalyze": {
      "nested": {
        "ReadMsgHistoryReq": {
          "fields": {
            "useridA": {
              "type": "int64",
              "id": 1
            },
            "useridB": {
              "type": "int64",
              "id": 2
            },
            "num": {
              "type": "int64",
              "id": 3
            },
            "time": {
              "type": "int64",
              "id": 4
            },
            "sn": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ReadMsgHistoryRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "msgHistory": {
              "rule": "repeated",
              "type": "MsgHistory",
              "id": 2
            }
          }
        },
        "MsgHistory": {
          "fields": {
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "pbData": {
              "type": "bytes",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_msgPusher": {
      "nested": {
        "MsgPushToAimUser": {
          "fields": {
            "srcUser": {
              "type": "int64",
              "id": 1
            },
            "appList": {
              "rule": "repeated",
              "type": "AppData",
              "id": 2
            },
            "params": {
              "type": "Params",
              "id": 3
            },
            "title": {
              "type": "string",
              "id": 4
            },
            "msg": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            },
            "time": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "AppData": {
          "fields": {
            "appName": {
              "type": "string",
              "id": 1
            },
            "userList": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            }
          }
        },
        "Params": {
          "fields": {
            "type": {
              "type": "int32",
              "id": 1
            },
            "roomId": {
              "type": "int64",
              "id": 2
            },
            "nickname": {
              "type": "string",
              "id": 3
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 4
            },
            "url": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "MsgPushToAllUser": {
          "fields": {
            "srcUser": {
              "type": "int64",
              "id": 1
            },
            "params": {
              "type": "Params",
              "id": 2
            },
            "appName": {
              "type": "string",
              "id": 3
            },
            "title": {
              "type": "string",
              "id": 4
            },
            "msg": {
              "type": "string",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            }
          }
        },
        "PushReceiptReq": {
          "fields": {
            "pushId": {
              "type": "int64",
              "id": 1
            },
            "system": {
              "type": "string",
              "id": 2
            },
            "isReceive": {
              "type": "int32",
              "id": 3
            },
            "isOpen": {
              "type": "int32",
              "id": 4
            }
          }
        }
      }
    },
    "pb_msg_msgSender": {
      "nested": {
        "MsgSenderNotify": {
          "fields": {
            "srcId": {
              "type": "int64",
              "id": 1
            },
            "msg": {
              "type": "string",
              "id": 2
            },
            "title": {
              "type": "string",
              "id": 3
            },
            "type": {
              "type": "int32",
              "id": 4
            },
            "nickName": {
              "type": "string",
              "id": 5
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 6
            }
          }
        }
      }
    },
    "pb_msg_offlineMsg": {
      "nested": {
        "ReadOfflineMsgReq": {
          "fields": {
            "userid": {
              "type": "int64",
              "id": 1
            },
            "num": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ReadOfflineMsgRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            },
            "msgNum": {
              "type": "int64",
              "id": 2
            },
            "msgList": {
              "rule": "repeated",
              "type": "MsgList",
              "id": 3
            }
          },
          "nested": {
            "MsgList": {
              "fields": {
                "pbName": {
                  "type": "string",
                  "id": 1
                },
                "pbData": {
                  "type": "bytes",
                  "id": 2
                },
                "time": {
                  "type": "int64",
                  "id": 3
                },
                "sn": {
                  "type": "int64",
                  "id": 4
                },
                "srcUserid": {
                  "type": "int64",
                  "id": 5
                },
                "aimUserid": {
                  "type": "int64",
                  "id": 6
                }
              }
            }
          }
        }
      }
    },
    "pb_msg_pk_room": {
      "nested": {
        "PKEnqueueReq": {
          "fields": {
            "pkType": {
              "type": "PK_TYPE",
              "id": 1
            },
            "rank": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "PKEnqueueRsp": {
          "fields": {}
        },
        "PKDequeueReq": {
          "fields": {
            "pkType": {
              "type": "PK_TYPE",
              "id": 1
            }
          }
        },
        "PKDequeueRsp": {
          "fields": {}
        },
        "PKAnswerReq": {
          "fields": {
            "answer": {
              "type": "ANSWER",
              "id": 1
            }
          }
        },
        "PKAnswerRsp": {
          "fields": {}
        },
        "PKEscapeReq": {
          "fields": {}
        },
        "PKEscapeRsp": {
          "fields": {}
        },
        "PKInviteReq": {
          "fields": {
            "pkTopic": {
              "type": "string",
              "id": 1
            }
          }
        },
        "PKInviteRsp": {
          "fields": {}
        },
        "PKInviteStopReq": {
          "fields": {}
        },
        "PKInviteStopRsp": {
          "fields": {}
        },
        "ANSWER": {
          "values": {
            "REFUSE": 0,
            "AGREE": 1
          }
        },
        "PK_TYPE": {
          "values": {
            "RANDOM": 0,
            "RANK": 1,
            "INVITE": 2,
            "GRAND_RANK": 3
          }
        },
        "END_TYPE": {
          "values": {
            "NATURAL": 0,
            "MANUAL": 1
          }
        },
        "PK_STATUS": {
          "values": {
            "IDLING": 0,
            "QUEUING": 1,
            "RINGING": 2,
            "WAITING": 3,
            "COMPETING": 4,
            "PENALIZING": 5
          }
        },
        "PKRoomInfo": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            },
            "endTime": {
              "type": "int64",
              "id": 2
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 3
            },
            "pkTopic": {
              "type": "string",
              "id": 4
            },
            "pkScore": {
              "type": "int64",
              "id": 5
            },
            "peer": {
              "type": "PKUser",
              "id": 6
            },
            "endType": {
              "type": "END_TYPE",
              "id": 7
            },
            "winnerId": {
              "type": "int64",
              "id": 8
            },
            "mvp": {
              "type": "MVP",
              "id": 9
            }
          }
        },
        "PKUser": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "rank": {
              "type": "int64",
              "id": 4
            },
            "victoryTimes": {
              "type": "int64",
              "id": 5
            },
            "pullStreamAddress": {
              "type": "string",
              "id": 6
            },
            "pkScore": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "PKStatusChangeNotify": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            }
          }
        },
        "PKMatchedNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 2
            },
            "pkTopic": {
              "type": "string",
              "id": 3
            },
            "peerId": {
              "type": "int64",
              "id": 4
            },
            "peerUsername": {
              "type": "string",
              "id": 5
            },
            "peerHeaderImageOriginal": {
              "type": "string",
              "id": 6
            },
            "peerRank": {
              "type": "int64",
              "id": 7
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 8
            },
            "peerPullStreamAddress": {
              "type": "string",
              "id": 9
            }
          }
        },
        "PKPeerRefusedNotify": {
          "fields": {}
        },
        "PKStartNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "pkType": {
              "type": "PK_TYPE",
              "id": 2
            },
            "pkTopic": {
              "type": "string",
              "id": 3
            },
            "peerId": {
              "type": "int64",
              "id": 4
            },
            "peerUsername": {
              "type": "string",
              "id": 5
            },
            "peerHeaderImageOriginal": {
              "type": "string",
              "id": 6
            },
            "peerRank": {
              "type": "int64",
              "id": 7
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 8
            },
            "peerPullStreamAddress": {
              "type": "string",
              "id": 9
            }
          }
        },
        "PKGameOverNotify": {
          "fields": {
            "endTime": {
              "type": "int64",
              "id": 1
            },
            "endType": {
              "type": "END_TYPE",
              "id": 2
            },
            "pkScore": {
              "type": "int64",
              "id": 3
            },
            "rank": {
              "type": "int64",
              "id": 4
            },
            "victoryTimes": {
              "type": "int64",
              "id": 5
            },
            "peerPKScore": {
              "type": "int64",
              "id": 11
            },
            "peerRank": {
              "type": "int64",
              "id": 12
            },
            "peerVictoryTimes": {
              "type": "int64",
              "id": 13
            },
            "winnerId": {
              "type": "int64",
              "id": 21
            },
            "mvp": {
              "type": "MVP",
              "id": 22
            }
          }
        },
        "MVP": {
          "fields": {
            "actorGrade": {
              "type": "int32",
              "id": 1
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "isLiving": {
              "type": "bool",
              "id": 4
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "userID": {
              "type": "int64",
              "id": 7
            },
            "userLevel": {
              "type": "string",
              "id": 8
            }
          }
        },
        "PKOverNotify": {
          "fields": {
            "pkStatus": {
              "type": "PK_STATUS",
              "id": 1
            }
          }
        },
        "PassivePKRefuseReq": {
          "fields": {
            "opponentId": {
              "type": "int64",
              "id": 1
            },
            "refuseId": {
              "type": "int64",
              "id": 2
            },
            "topic": {
              "type": "string",
              "id": 3
            }
          }
        },
        "PKSwitchPassiveReq": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "rank": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "PassivePkNotify": {
          "fields": {
            "pkType": {
              "type": "pb_msg_pk_room.PK_TYPE",
              "id": 1
            }
          }
        },
        "PKTournamentChangeNotify": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        },
        "CanJoinPkTournamentReq": {
          "fields": {}
        },
        "CanJoinPkTournamentRsp": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "PkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "PkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_room_explain": {
      "nested": {
        "RoomExplainReq": {
          "fields": {
            "roomId": {
              "type": "int64",
              "id": 1
            },
            "timestampBegin": {
              "type": "string",
              "id": 2
            },
            "timestampEnd": {
              "type": "string",
              "id": 3
            }
          }
        },
        "RoomExplainRsp": {
          "fields": {
            "msgCount": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "SrcUserExplainReq": {
          "fields": {
            "srcId": {
              "type": "int64",
              "id": 1
            },
            "timestampBegin": {
              "type": "string",
              "id": 2
            },
            "timestampEnd": {
              "type": "string",
              "id": 3
            }
          }
        },
        "SrcUserExplainRsp": {
          "fields": {
            "msgCount": {
              "type": "int64",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_ttk_game": {
      "nested": {
        "PATTERN": {
          "values": {
            "GENERAL_0": 0,
            "GENERAL_1": 1,
            "GENERAL_2": 2,
            "GENERAL_3": 3,
            "GENERAL_4": 4,
            "GENERAL_5": 5,
            "GENERAL_6": 6,
            "GENERAL_7": 7,
            "GENERAL_8": 8,
            "GENERAL_9": 9,
            "GENERAL_10": 10,
            "SILVER_GENERAL": 11,
            "BOMB": 12,
            "TIGER": 13,
            "SMALL": 14
          }
        },
        "SUIT": {
          "values": {
            "DIAMOND": 0,
            "CLUB": 1,
            "HEART": 2,
            "SPADE": 3
          }
        },
        "KINGDOM": {
          "values": {
            "WEI": 0,
            "SHU": 1,
            "WU": 2,
            "QUN": 3
          }
        },
        "Card": {
          "fields": {
            "number": {
              "type": "int32",
              "id": 1
            },
            "suit": {
              "type": "SUIT",
              "id": 2
            },
            "value": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "Hand": {
          "fields": {
            "pattern": {
              "type": "PATTERN",
              "id": 1
            },
            "cards": {
              "rule": "repeated",
              "type": "Card",
              "id": 2
            }
          }
        },
        "Side": {
          "fields": {
            "hand": {
              "type": "Hand",
              "id": 1
            },
            "win": {
              "type": "bool",
              "id": 2
            },
            "odds": {
              "type": "int32",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "TTKGameInfo": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "state": {
              "type": "int32",
              "id": 2
            },
            "endTime": {
              "type": "int64",
              "id": 3
            },
            "hand": {
              "type": "Hand",
              "id": 4
            },
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 5
            }
          }
        },
        "TTKPlayerInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "bets": {
              "rule": "repeated",
              "type": "int64",
              "id": 3
            },
            "coinBalance": {
              "type": "int64",
              "id": 4
            },
            "cocoBalance": {
              "type": "int64",
              "id": 5
            },
            "winLose": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "TTKWinnerBoard": {
          "fields": {
            "winners": {
              "rule": "repeated",
              "type": "TTKPlayerInfo",
              "id": 2
            }
          }
        },
        "BetStartNotify": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "endTime": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "SideChangeNotify": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            }
          }
        },
        "BetReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "kingdom": {
              "type": "KINGDOM",
              "id": 3
            },
            "amount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "BetRsp": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            },
            "playerInfo": {
              "type": "TTKPlayerInfo",
              "id": 2
            },
            "no": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "RepeatBetReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "bets": {
              "rule": "repeated",
              "type": "int64",
              "id": 3
            }
          }
        },
        "RepeatBetRsp": {
          "fields": {
            "sides": {
              "rule": "repeated",
              "type": "Side",
              "id": 1
            },
            "playerInfo": {
              "type": "TTKPlayerInfo",
              "id": 2
            },
            "no": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "WinnersReq": {
          "fields": {
            "no": {
              "type": "int64",
              "id": 1
            },
            "offset": {
              "type": "int64",
              "id": 2
            },
            "count": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "WinnersRsp": {
          "fields": {
            "winners": {
              "rule": "repeated",
              "type": "TTKPlayerInfo",
              "id": 1
            }
          }
        },
        "DealStartNotify": {
          "fields": {
            "game": {
              "type": "TTKGameInfo",
              "id": 1
            }
          }
        },
        "UpdateGameConfig": {
          "fields": {}
        },
        "SetGamePool": {
          "fields": {
            "amount": {
              "type": "int64",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_userCenter": {
      "nested": {
        "FriendInfoReq": {
          "fields": {
            "friendUserIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "FriendInfoRsp": {
          "fields": {
            "results": {
              "rule": "repeated",
              "type": "FriendInfo",
              "id": 1
            }
          }
        },
        "UsersInfoReq": {
          "fields": {
            "UserIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "UsersInfoRsp": {
          "fields": {
            "results": {
              "rule": "repeated",
              "type": "UsersInfo",
              "id": 1
            }
          }
        },
        "UsersInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "gender": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "userLevel": {
              "type": "string",
              "id": 4
            },
            "authAccess": {
              "type": "string",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "sign": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "State": {
              "type": "pb_pub.USER_STATE_TYPE",
              "id": 9
            }
          }
        },
        "FriendInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "gender": {
              "type": "string",
              "id": 2
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 3
            },
            "userLevel": {
              "type": "string",
              "id": 4
            },
            "authAccess": {
              "type": "string",
              "id": 5
            },
            "nickName": {
              "type": "string",
              "id": 6
            },
            "sign": {
              "type": "string",
              "id": 7
            },
            "actorGrade": {
              "type": "int32",
              "id": 8
            },
            "packageName": {
              "type": "string",
              "id": 9
            },
            "systemVersion": {
              "type": "string",
              "id": 10
            },
            "phoneModels": {
              "type": "string",
              "id": 11
            },
            "appVersion": {
              "type": "string",
              "id": 12
            },
            "systemName": {
              "type": "string",
              "id": 13
            },
            "identifier": {
              "type": "string",
              "id": 14
            },
            "userState": {
              "type": "pb_pub.USER_STATE_TYPE",
              "id": 15
            },
            "switchToBack": {
              "type": "bool",
              "id": 16
            },
            "updateTime": {
              "type": "int64",
              "id": 17
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 18
            }
          }
        }
      }
    },
    "pb_pub": {
      "nested": {
        "PBCommData": {
          "fields": {
            "needReadReceipt": {
              "type": "bool",
              "id": 1
            },
            "msgSn": {
              "type": "int64",
              "id": 2
            },
            "srcId": {
              "type": "int64",
              "id": 3
            },
            "aimId": {
              "type": "int64",
              "id": 4
            },
            "time": {
              "type": "int64",
              "id": 5
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 6
            },
            "needPushMsg": {
              "type": "bool",
              "id": 7
            },
            "serviceType": {
              "type": "Service",
              "id": 8
            }
          }
        },
        "PBMessage": {
          "fields": {
            "version": {
              "type": "uint32",
              "id": 1
            },
            "checkCode": {
              "type": "uint32",
              "id": 2
            },
            "errCode": {
              "type": "uint32",
              "id": 3
            },
            "service": {
              "type": "string",
              "id": 4
            },
            "hashKey": {
              "type": "string",
              "id": 5
            },
            "pbCommData": {
              "type": "PBCommData",
              "id": 6
            },
            "opts": {
              "keyType": "string",
              "type": "string",
              "id": 7
            },
            "pbName": {
              "type": "string",
              "id": 8
            },
            "pbData": {
              "type": "bytes",
              "id": 9
            },
            "errDesc": {
              "type": "string",
              "id": 10
            }
          }
        },
        "CommCallReq": {
          "fields": {
            "params": {
              "keyType": "string",
              "type": "string",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "pbData": {
              "type": "bytes",
              "id": 3
            }
          }
        },
        "CommCallRsp": {
          "fields": {
            "errCode": {
              "type": "ErrCode",
              "id": 1
            },
            "params": {
              "keyType": "string",
              "type": "string",
              "id": 2
            },
            "pbName": {
              "type": "string",
              "id": 3
            },
            "pbData": {
              "type": "bytes",
              "id": 4
            },
            "errDesc": {
              "type": "string",
              "id": 5
            }
          }
        },
        "PushMsgClientActionType": {
          "values": {
            "CLIENT_ACTION_UNKNOWN": 0,
            "CLIENT_ACTION_LIVE_START": 1,
            "CLIENT_ACTION_PRIVATE_CHAT": 2
          }
        },
        "TextChatType": {
          "values": {
            "TEXT": 0,
            "PIC": 1,
            "VIDEO": 2,
            "AUDIO": 3,
            "GIFT": 4,
            "PACT": 5,
            "VIDEO_INVITE": 6,
            "CUSTOMIZE": 7
          }
        },
        "MSG_STATE": {
          "values": {
            "INIT": 0,
            "SEND": 1,
            "RECEIVED": 2,
            "READ": 3,
            "END": 4,
            "IN_BLACK_LIST": 5
          }
        },
        "MODEL_TYPE": {
          "values": {
            "NIL": 0,
            "OPPO": 1,
            "HUAWEI": 2,
            "XIAOMI": 3,
            "MEIZU": 4,
            "APPSTORE": 5,
            "VIVO": 6
          }
        },
        "MsgReceipt": {
          "fields": {
            "state": {
              "type": "MSG_STATE",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "CommRsp": {
          "fields": {
            "result": {
              "type": "ErrCode",
              "id": 1
            }
          }
        },
        "UserInfo": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "nickName": {
              "type": "string",
              "id": 2
            }
          }
        },
        "HEART_BEAT_TYPE": {
          "values": {
            "COMM": 0,
            "LIVE_ROOM": 1,
            "CALL_SCENE": 2,
            "MULTI_ANCHOR_HALL": 3,
            "TTK_GAME": 4
          }
        },
        "HEART_BEAT_MSG_STATE": {
          "values": {
            "PING": 0,
            "PANG": 1
          }
        },
        "HeartBeat": {
          "fields": {
            "type": {
              "type": "HEART_BEAT_TYPE",
              "id": 2
            },
            "state": {
              "type": "HEART_BEAT_MSG_STATE",
              "id": 3
            },
            "gateAddr": {
              "type": "string",
              "id": 4
            }
          }
        },
        "USER_STATE_TYPE": {
          "values": {
            "USER_STATE_INIT": 0,
            "USER_STATE_AUTHING": 1,
            "USER_STATE_AUTHED": 2,
            "USER_STATE_OFFLINE": 3
          }
        },
        "EnterRoomReq": {
          "fields": {}
        },
        "EnterRoomRsp": {
          "fields": {}
        },
        "ExitRoomReq": {
          "fields": {}
        },
        "ExitRoomRsp": {
          "fields": {}
        },
        "ClientBFSwitchReq": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "ClientBFSwitchRsp": {
          "fields": {
            "switchToBack": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "userOperationRoom": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "roomId": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "operation": {
              "type": "OPERATION",
              "id": 4
            },
            "timeLen": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "OPERATION": {
          "values": {
            "UNKNOWN": 0,
            "ENTER": 1,
            "EXIT": 2
          }
        },
        "Gift": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "giftId": {
              "type": "int64",
              "id": 2
            },
            "actorId": {
              "type": "int64",
              "id": 3
            },
            "giftNumber": {
              "type": "int64",
              "id": 4
            },
            "senderName": {
              "type": "string",
              "id": 6
            },
            "targetName": {
              "type": "string",
              "id": 7
            },
            "headImg": {
              "type": "string",
              "id": 8
            },
            "level": {
              "type": "int32",
              "id": 9
            },
            "batteryType": {
              "type": "int32",
              "id": 10
            },
            "batteryTypeList": {
              "rule": "repeated",
              "type": "int64",
              "id": 11
            },
            "levelPrivilegeOpen": {
              "type": "bool",
              "id": 12
            },
            "giftConfLastUpdateTime": {
              "type": "int64",
              "id": 13
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 14
            },
            "giftType": {
              "type": "int32",
              "id": 15
            }
          }
        },
        "LogonSuccessNotifyNsq": {
          "fields": {
            "MsgSn": {
              "type": "int64",
              "id": 1
            },
            "UserId": {
              "type": "int64",
              "id": 2
            },
            "Time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "NeedSceneRecoverNotify": {
          "fields": {
            "ServiceType": {
              "type": "Service",
              "id": 1
            },
            "Exp": {
              "keyType": "string",
              "type": "string",
              "id": 2
            }
          }
        },
        "SCENE_TYPE": {
          "values": {
            "SCENE_TYPE_UNKNOWN": 0,
            "SCENE_TYPE_CALL_SCENE": 1,
            "SCENE_TYPE_JOIN_LIVE": 2
          }
        },
        "UserScene": {
          "fields": {
            "UserId": {
              "type": "int64",
              "id": 1
            },
            "SceneId": {
              "type": "int64",
              "id": 2
            },
            "SceneType": {
              "type": "SCENE_TYPE",
              "id": 3
            }
          }
        },
        "ErrCode": {
          "values": {
            "SUCCESS": 0,
            "SYS_ERR": 1,
            "USER_NOT_EXIST": 2,
            "USER_NOT_ONLINE": 3,
            "PERMISSION_DENIED": 6,
            "PB_NO_HANDLER": 20,
            "ROOM_NOT_FILE": 40,
            "LIVE_ROOM_NOTEXIT": 50,
            "USER_IS_KICKED_OUT": 51,
            "UNMARSHAL_FAILED": 52,
            "USER_FORBID_SPEAKING": 53,
            "SEND_MSG_FAILED": 54,
            "MARSHAL_FAILED": 55,
            "USER_NOT_IN_ROOM": 56,
            "USER_IS_KICKED_OUT_BY_ANCHOR": 57,
            "USER_IS_KICKED_OUT_BY_MANAGER": 58,
            "NO_FREE_BENCH": 60,
            "CHAIR_NOT_EMPTY": 61,
            "NOT_CHAIR_MAIN": 62,
            "USER_IS_ON_ANCHOR_ALREADY": 63,
            "USER_IS_IN_WAIT_LIST_ALREADY": 64,
            "USER_NO_INVITATION": 65,
            "USER_ON_ANCHOR_AUTH_FAILED": 66,
            "ROOM_IS_LIVING_ALREADY": 67,
            "AIM_LOC_NOT_FREE": 68,
            "USER_ENTER_ROOM_AUTH_FAILED": 69,
            "LIVE_START_AUTH_FAILED": 70,
            "ROOM_NOT_IN_LIVING": 71,
            "USER_NOT_ON_ANCHOR": 72,
            "USER_ON_CHAT_ROOM_ALREADY": 73,
            "SECRET_ROOM_IS_NIL": 100,
            "USER_IS_NOT_A_COMPERE": 101,
            "INPUT_IS_OUT_OF_RANGE": 102,
            "TYPE_ASSERTION_ERR": 103,
            "INVITER_IS_LEVEL_PRIVILEGE": 104,
            "GET_BALANCE": 105,
            "BALANCE_NOT_ENOUGH": 106,
            "COUNT_OF_CHATROOM_UP_TO_LIMIT": 107,
            "INVITEE_IS_NOT_ON_ANCHOR": 108,
            "INVITER_ALREADY_ON_CHAT": 109,
            "INVITEE_ALREADY_ON_CHAT": 110,
            "INVITER_IS_CHAIRMAN": 111,
            "INVITEE_IS_CHAIRMAN": 112,
            "INVITER_HAS_LEFT_ROOM": 113,
            "CREATE_INVITATION_FAILED": 114,
            "GET_INVITATION_FAILED": 115,
            "STATUS_IS_UNEXPECTED": 116,
            "CREATE_CHATROOM_FAILED": 117,
            "GET_CHATROOM_FAILED": 118,
            "CHATROOM_IS_NIL": 119,
            "USER_IS_BUSY": 201,
            "SCENE_NOTEXIT": 202,
            "LUCK_REFRESH_CFG_FAIL": 251,
            "PK_ROOM_NOT_EXIST": 300,
            "BET_NOT_ALLOWED_IN_DEALING": 401,
            "UNKNOWN_KINGDOM": 402,
            "BET_AMOUNT_NOT_ALLOWED": 403,
            "NO_ENOUGH_BALANCE": 404,
            "SN_GET_CHATID_ERROR": 1100,
            "READ_CHAT_HISTORY_ERROR": 1101,
            "COMMON_ERR": 10000,
            "PIC_SO_BIG": 10010001,
            "PIC_PUT_OSS_FAIL": 10010002,
            "PIC_SECURE_CHECK_FAIL": 10010003,
            "PIC_NOT_SECURE": 10010004,
            "VIDEO_SO_BIG": 10010005,
            "VIDEO_PUT_OSS_FAIL": 10010006,
            "VIDEO_SECURE_CHECK_FAIL": 10010007,
            "VIDEO_NOT_SECURE": 10010008,
            "AUDIO_SO_BIG": 10010009,
            "AUDIO_PUT_OSS_FAIL": 10010010,
            "AUDIO_SECURE_CHECK_FAIL": 10010011,
            "AUDIO_NOT_SECURE": 10010012,
            "GET_UPLOAD_FILE_FAIL": 10010013,
            "FILE_SO_BIG": 10010014,
            "FILE_PUT_OSS_FAIL": 10010015
          }
        },
        "IM_TYPE": {
          "values": {
            "IM_TYPE_YZIM": 0,
            "IM_TYPE_YXIM": 1
          }
        },
        "GMChangeIMNotify": {
          "fields": {
            "imType": {
              "type": "IM_TYPE",
              "id": 1
            },
            "optUser": {
              "type": "int64",
              "id": 2
            },
            "optTime": {
              "type": "int64",
              "id": 3
            },
            "resion": {
              "type": "string",
              "id": 4
            }
          }
        },
        "GMPPullLogNotify": {
          "fields": {
            "aimUser": {
              "type": "int64",
              "id": 1
            },
            "optUser": {
              "type": "int64",
              "id": 2
            },
            "optTime": {
              "type": "int64",
              "id": 3
            },
            "resion": {
              "type": "string",
              "id": 4
            }
          }
        },
        "Service": {
          "values": {
            "gate": 0,
            "user_center": 1,
            "msg_sender": 2,
            "chat": 3,
            "allocater": 4,
            "black_list": 5,
            "live_room": 6,
            "offline_msg": 7,
            "pk_room": 8,
            "visitors_gate": 9,
            "oss": 10,
            "service_monitor": 11,
            "msg_pusher": 12,
            "call_scene": 13,
            "admin": 14,
            "multi_anchor_hall": 15,
            "ttk_game": 16,
            "wish_hall": 17,
            "msg_analyze": 18,
            "comm_room": 19
          }
        },
        "ServiceNotify": {
          "fields": {
            "messageType": {
              "type": "int32",
              "id": 1
            },
            "messageBody": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ServiceNotifyToAllUser": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            }
          }
        },
        "ServiceNotifyToAimUser": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "aimUsers": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "int32",
              "id": 3
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            },
            "messageBody": {
              "type": "string",
              "id": 5
            }
          }
        },
        "ServiceNotifyToAllGroup": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            }
          }
        },
        "ServiceNotifyToAimGroup": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "messageType": {
              "type": "int32",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            },
            "messageBody": {
              "type": "string",
              "id": 5
            }
          }
        },
        "YXLiveRoomNotify": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "YXLiveRoomNotifyType",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 5
            }
          }
        },
        "YXLiveRoomNotifyType": {
          "values": {
            "LIVE_START": 0,
            "LIVE_STOP": 1,
            "LIVEROOM_HEARTBEAT": 2,
            "ENTER_ROOM": 3,
            "EXIT_ROOM": 4,
            "UNSET_USER_KICKOUT_STATUS": 5,
            "LIVEROOM_PK_SCORE_UPDATE": 6,
            "PKPROP": 7,
            "SEND_GIFT": 8,
            "HOST_MODE": 9,
            "UPDATED_USER_INFO": 10,
            "ROOM_BARRAGE": 11,
            "ROOM_ACTION": 12,
            "UPDATE_ANCHOR_SCORE": 13,
            "UPDATE_BILLBOARD": 14,
            "KICK_USER_OUT": 15,
            "SEND_LIVE_GIFT": 16,
            "UPDATE_MULTI_ANCHOR_SCORE": 17,
            "INVESTOR_CHANGE": 18,
            "SECRET_GIFT": 19,
            "BACKGROUND_CHANGE": 20
          }
        },
        "PKQualifyChangeNotify": {
          "fields": {
            "isQualifiedPkTournament": {
              "type": "bool",
              "id": 1
            },
            "pkTournamentBeginTime": {
              "type": "string",
              "id": 2
            },
            "pkTounamentTip": {
              "type": "string",
              "id": 3
            }
          }
        },
        "TTKNSQMessage": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "msgName": {
              "type": "string",
              "id": 2
            },
            "msgData": {
              "type": "string",
              "id": 3
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 4
            }
          }
        },
        "KickUserReason": {
          "values": {
            "Sys": 0,
            "Relogon": 1,
            "ClientException": 2
          }
        },
        "PubRoomId": {
          "values": {
            "Unknown": 0,
            "PartyRoomHall": 1,
            "TTKGame": 2,
            "WishHall": 3,
            "CommRoomAuctionHouse": 4
          }
        },
        "ExpKey": {
          "values": {
            "ExpUnknown": 0,
            "ExpGroupId": 1
          }
        },
        "YXCommMsg": {
          "fields": {
            "MessageType": {
              "type": "MessageType",
              "id": 1
            },
            "MessageBody": {
              "type": "string",
              "id": 2
            },
            "IsImMessage": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "YXCommMsgRsp": {
          "fields": {}
        },
        "MessageType": {
          "values": {
            "MessageTypeUnknown": 0,
            "MessageTypeUser": 1,
            "MessageTypeAt": 2,
            "MessageTypeRoomBarrage": 3,
            "MessageTypeAllBarrage": 4,
            "MessageTypeGift": 5,
            "MessageTypeUserGetIn": 6,
            "MessageTypeForbidSpeaking": 7,
            "MessageTypeUnForbidSpeaking": 8,
            "MessageTypeKictOut": 9,
            "MessageTypeRobitInRoom": 10,
            "MessageTypeRobitMessage": 11,
            "MessageTypeLiveMessage": 12,
            "MessageTypeNewJoinLiveApply": 13,
            "MessageTypeCancelJoinLiveApply": 14,
            "MessageTypeForbidPublish": 15,
            "MessageTypeSuperManagerKickout": 16,
            "MessageTypeRoomManagerChanged": 17,
            "MessageTypeJoinLiveBalanceNotEnoughTip": 18,
            "MessageTypeJoinLiveBalanceNotEnoughEndLive": 19,
            "MessageTypeAnchorToAnchorJoinLiveInvite": 20,
            "MessageTypeAnchorToAnchorJoinLiveAcceptOrReject": 21,
            "MessageTypeAnchorInviteJoinLiveCancel": 22,
            "MessageTypeAnchorToAnchorJoinLiveEnd": 23,
            "MessageTypeUserActionTip": 24,
            "MessageTypeNetworkErrorKickout": 25,
            "MessageTypeTotalStationInform": 26,
            "MessageTypeAnchorToAnchorJoinLiveTempLeave": 27,
            "MessageTypeRedPocket": 28,
            "MessageTypeUserLottery": 29,
            "MessageTypeAudicenceList": 30,
            "MessageTypeAnnouncement": 31,
            "MessageTypeEndJoinLive": 32,
            "MessageTypeWeekStarGift": 33,
            "MessageTypePKInvite": 34,
            "MessageTypePKAcceptOrReject": 35,
            "MessageTypePKEnd": 36,
            "MessageTypePKStart": 37,
            "MessageTypePKChangeModeSuccess": 38,
            "MessageTypePKMatchingSuccess": 39,
            "MessageTypePKTimeCorrect": 40,
            "MessageTypePKFirstGiftMsg": 41,
            "MessageTypePKSendTargetPkValue": 43,
            "MessageTypeLiveEndH5": 44,
            "MessageTypePK5MinuteEnd": 45,
            "MessageTypeJoinFans": 46,
            "MessageTypeJoinGuard": 47,
            "MessageTypeSwimsuitActivityProcess": 52,
            "MessageTypeSwimsuitActivityRobBoxOver": 53,
            "MessageTypeActivityBoxProcess": 54,
            "MessageTypeRedPacketNew": 55,
            "MessageTypeRedPacketOver": 56,
            "MessageTypeSendRocket": 66,
            "MessageTypeTreasureMap": 67,
            "MessageTypeRankPromotionScoreChanged": 68,
            "MessageTypeRandomMatchCancel": 69,
            "MessageTypeUpdateWishMenu": 70,
            "MessageTypeWishPoolDetail": 71,
            "MessageTypeWishPoolLuckyMan": 72,
            "MessageTypeUpdatePkSeatInfo": 73,
            "MessageTypeChristmasTreeLightUp": 75,
            "MessageTypeNewYearLightUp": 76,
            "MessageTypeChatText": 80,
            "MessageTypeLiveRoomGift": 100,
            "MessageTypeSendPersonalGift": 1000,
            "MessageTypeServiceNotify": 2000
          }
        }
      }
    }
  }
}