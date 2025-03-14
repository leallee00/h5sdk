module.exports = {
  "options": {
    "syntax": "proto3",
    "go_package": "github.com/leallee00/pb/pb_pub"
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
    "pb_pub": {
      "nested": {
        "ErrCode": {
          "values": {
            "SUCCESS": 0,
            "Canceled": 1,
            "UnknownErr": 2,
            "InvalidArgument": 3,
            "DeadlineExceeded": 4,
            "NotFound": 5,
            "AlreadyExists": 6,
            "PermissionDenied": 7,
            "ResourceExhausted": 8,
            "FailedPrecondition": 9,
            "Aborted": 10,
            "OutOfRange": 11,
            "Unimplemented": 12,
            "Internal": 13,
            "Unavailable": 14,
            "DataLoss": 15,
            "Unauthenticated": 16,
            "SYS_ERR": 30,
            "USER_NOT_EXIST": 31,
            "USER_NOT_ONLINE": 32,
            "PERMISSION_DENIED": 33,
            "PB_NO_HANDLER": 34,
            "OTHER_DEVICE_LOGGED": 35,
            "OTHER_DEVICE_ONLINE_NOW": 36,
            "Rate_LIMIT": 37,
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
            "AUDIO_ROOM_IS_LIVING_ALREADY": 74,
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
            "FINAL_PK_ESCAPE": 331,
            "FINAL_PK_INVITE": 332,
            "FINAL_PK_BE_INVITE": 333,
            "FINAL_PK_ENQUEUE": 334,
            "BET_NOT_ALLOWED_IN_DEALING": 401,
            "UNKNOWN_KINGDOM": 402,
            "BET_AMOUNT_NOT_ALLOWED": 403,
            "NO_ENOUGH_BALANCE": 404,
            "PRIVATE_MESSAGE_LIMITED": 801,
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
            "FILE_PUT_OSS_FAIL": 10010015,
            "CALLEE_NOT_ONLINE": 1200,
            "CALL_SCENE_NOT_EXIST": 1201,
            "OPERATION_NOT_ALLOWED": 1202,
            "CALL_ACCEPTED": 1203,
            "CALLEE_NO_MONEY": 1204,
            "AUTH_ERR": 1205,
            "CALLER_IN_CALLEE_BLACK_LIST": 1206,
            "CALLEE_NOT_ACCEPT": 1207,
            "CALLER_INFO_NOT_COMPLETE": 1208,
            "CALLEE_INFO_NOT_COMPLETE": 1209,
            "CALLER_NO_MONEY": 1210,
            "OTHER_KEFU_ANSWERING": 1300,
            "SEND_MESSAGE_BEFORE_ANSWER": 1301,
            "ALL_KEFU_OFFLINE": 1302,
            "RED_EDIT": 1401,
            "RED_COMPLETED": 1402,
            "RED_OVER_TIME": 1403,
            "RED_NOT_FOR_ME": 1404
          }
        },
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
            },
            "appId": {
              "type": "int64",
              "id": 9
            },
            "appUserId": {
              "type": "string",
              "id": 10
            },
            "traceId": {
              "type": "string",
              "id": 11
            },
            "srcClientType": {
              "type": "CLIENT_TYPE",
              "id": 12
            },
            "aimClientType": {
              "type": "CLIENT_TYPE",
              "id": 13
            },
            "groupId": {
              "type": "int64",
              "id": 14
            },
            "atList": {
              "rule": "repeated",
              "type": "int64",
              "id": 15
            },
            "syncToSrc": {
              "type": "bool",
              "id": 16
            },
            "businessId": {
              "type": "int32",
              "id": 17
            },
            "serial": {
              "type": "int64",
              "id": 18
            },
            "deriveTree": {
              "type": "string",
              "id": 19
            },
            "userSourceVersion": {
              "type": "int32",
              "id": 20
            },
            "groupMsgSn": {
              "type": "int64",
              "id": 21
            },
            "periodOfValidity": {
              "type": "int64",
              "id": 22
            }
          }
        },
        "CLIENT_RUN_ENV_TYPE": {
          "values": {
            "ANDROID": 0,
            "IOS": 1,
            "MAKOS": 2,
            "WINDOWS": 3,
            "LINUX": 4,
            "LINUX_DEB": 5,
            "PREV6": 6,
            "PREV7": 7,
            "PREV8": 8
          }
        },
        "PCD_EXP_KEY": {
          "values": {
            "PCD_EXP_KEY_BEGIN": 0,
            "GROUP_MSG_STATUS": 1000
          }
        },
        "CLIENT_TYPE": {
          "values": {
            "NONE": 0,
            "PHONE": 1,
            "H5": 2,
            "PC": 3,
            "SERVER": 100,
            "ALL": 1000
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
              "type": "int32",
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
            },
            "status": {
              "type": "google.rpc.Status",
              "id": 6
            }
          }
        },
        "CommNatsMsg": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "groupMsgSn": {
              "type": "int64",
              "id": 2
            },
            "pbName": {
              "type": "string",
              "id": 3
            },
            "pbData": {
              "type": "bytes",
              "id": 4
            }
          }
        },
        "PushMsgClientActionType": {
          "values": {
            "CLIENT_ACTION_UNKNOWN": 0,
            "CLIENT_ACTION_LIVE_START": 1,
            "CLIENT_ACTION_PRIVATE_CHAT": 2,
            "CLIENT_ACTION_KE_FU": 3
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
            "CUSTOMIZE": 7,
            "FILE": 8,
            "RECALL": 9,
            "RED_PACKET": 10
          }
        },
        "MSG_STATE": {
          "values": {
            "INIT": 0,
            "FAULT": 1,
            "SEND": 2,
            "RECEIVED": 3,
            "READ": 4,
            "END": 5,
            "IN_BLACK_LIST": 6,
            "LIMITED": 7
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
            "VIVO": 6,
            "JIGUANG": 7,
            "FCM": 8,
            "RONGYAO": 9
          }
        },
        "MsgReceipt": {
          "fields": {
            "isAtMe": {
              "type": "bool",
              "id": 1
            },
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
            },
            "status": {
              "type": "google.rpc.Status",
              "id": 2
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
            "TTK_GAME": 4,
            "LIVE_ROOM_VISITOR": 5,
            "GAME_SCENE": 6
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
          "fields": {
            "userType": {
              "type": "UserType",
              "id": 1
            }
          },
          "nested": {
            "UserType": {
              "values": {
                "UNKNOWN": 0,
                "REGULAR": 1,
                "VISITOR": 2
              }
            }
          }
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
        "JSONMessage": {
          "fields": {
            "hashKey": {
              "type": "string",
              "id": 1
            },
            "secret": {
              "type": "string",
              "id": 2
            },
            "pbCommData": {
              "type": "PBCommData",
              "id": 3
            },
            "messageName": {
              "type": "string",
              "id": 4
            },
            "messageData": {
              "type": "string",
              "id": 5
            },
            "sendType": {
              "type": "SendType",
              "id": 6
            }
          }
        },
        "SendType": {
          "values": {
            "TO_SERVICE": 0,
            "TO_AIM_USER": 1,
            "TO_ALL_USER": 2,
            "TO_AIM_GROUP": 3,
            "TO_ALL_GROUP": 4
          }
        },
        "JSONCallReq": {
          "fields": {
            "messageName": {
              "type": "string",
              "id": 3
            },
            "messageData": {
              "type": "bytes",
              "id": 4
            }
          }
        },
        "JSONCallRsp": {
          "fields": {
            "errCode": {
              "type": "ErrCode",
              "id": 1
            },
            "errDesc": {
              "type": "string",
              "id": 2
            },
            "messageData": {
              "type": "bytes",
              "id": 3
            }
          }
        },
        "ServerNotify": {
          "fields": {
            "from": {
              "type": "From",
              "id": 1
            },
            "service": {
              "type": "Service",
              "id": 2
            },
            "errCode": {
              "type": "ErrCode",
              "id": 3
            },
            "errDesc": {
              "type": "string",
              "id": 4
            },
            "Exp": {
              "keyType": "string",
              "type": "string",
              "id": 5
            }
          },
          "nested": {
            "From": {
              "values": {
                "IM": 0,
                "JAVA": 1
              }
            }
          }
        },
        "MsgRecallReq": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "msgOwnerId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "MsgRecallRsp": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "msgOwnerId": {
              "type": "int64",
              "id": 2
            },
            "result": {
              "type": "ErrCode",
              "id": 3
            }
          }
        },
        "MsgChangeReq": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "changeData": {
              "keyType": "string",
              "type": "string",
              "id": 2
            }
          }
        },
        "MsgChangeRsp": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "changeData": {
              "keyType": "string",
              "type": "string",
              "id": 2
            },
            "result": {
              "type": "ErrCode",
              "id": 3
            }
          }
        },
        "TakeScreenShotNotify": {
          "fields": {}
        },
        "AppClientInfo": {
          "fields": {
            "modelType": {
              "type": "MODEL_TYPE",
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
            },
            "pushPlatformAppId": {
              "type": "string",
              "id": 9
            },
            "odid": {
              "type": "string",
              "id": 10
            },
            "aaid": {
              "type": "string",
              "id": 11
            },
            "token": {
              "type": "string",
              "id": 12
            },
            "expired": {
              "type": "int64",
              "id": 13
            }
          }
        },
        "AppLogData": {
          "fields": {
            "pcd": {
              "type": "PBCommData",
              "id": 1
            },
            "appClientInfo": {
              "type": "AppClientInfo",
              "id": 2
            },
            "kvValues": {
              "keyType": "string",
              "type": "google.protobuf.Value",
              "id": 3
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
            "comm_room": 19,
            "api_http": 20,
            "luxury": 21,
            "friend": 22,
            "game_scene": 23,
            "group": 24,
            "commim_uaa": 25,
            "commim_gate": 26,
            "call": 28,
            "followship": 30,
            "community": 31,
            "groups": 32,
            "customer_service": 33
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
        "YXCommMsgNSQ": {
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
              "type": "MessageType",
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
        },
        "NSQMessage": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "codec": {
              "type": "CODEC",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "data": {
              "type": "bytes",
              "id": 4
            }
          }
        },
        "CODEC": {
          "values": {
            "PROTOBUF": 0,
            "JSON": 1
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
            "reason": {
              "type": "string",
              "id": 4
            },
            "startTime": {
              "type": "string",
              "id": 5
            },
            "endTime": {
              "type": "string",
              "id": 6
            },
            "source": {
              "type": "int32",
              "id": 7
            }
          }
        },
        "UserPushLogResult": {
          "fields": {
            "result": {
              "type": "int32",
              "id": 1
            },
            "resultReason": {
              "type": "string",
              "id": 2
            },
            "logPath": {
              "type": "string",
              "id": 3
            }
          }
        },
        "NatsPBMsgChannel": {
          "values": {
            "PBMsg_SysConfigChange": 0,
            "PBMsg_EventBus": 1,
            "PBMsg_ServiceErrStatusConfigChange": 2,
            "PBMsg_ToGateProcessByGroup": 3,
            "PBMsg_EventBusForServiceGroup": 4
          }
        },
        "NatsMsgReq": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
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
        "NatsMsgRsp": {
          "fields": {
            "pbCommData": {
              "type": "PBCommData",
              "id": 1
            },
            "pbName": {
              "type": "string",
              "id": 2
            },
            "pbData": {
              "type": "bytes",
              "id": 3
            },
            "code": {
              "type": "int64",
              "id": 4
            },
            "result": {
              "type": "string",
              "id": 5
            }
          }
        },
        "SysCfgChangeNotify": {
          "fields": {
            "key": {
              "type": "string",
              "id": 1
            },
            "value": {
              "type": "string",
              "id": 2
            },
            "desc": {
              "type": "string",
              "id": 3
            }
          }
        },
        "SysCfgChangeCanLoadFromNotify": {
          "fields": {
            "key": {
              "type": "string",
              "id": 1
            },
            "value": {
              "type": "string",
              "id": 2
            },
            "desc": {
              "type": "string",
              "id": 3
            }
          }
        },
        "ErrStatusChangeNotify": {
          "fields": {
            "appId": {
              "type": "int32",
              "id": 1
            },
            "language": {
              "type": "string",
              "id": 2
            },
            "code": {
              "type": "int32",
              "id": 3
            },
            "desc": {
              "type": "string",
              "id": 4
            }
          }
        },
        "BatchCreateRobot": {
          "fields": {
            "count": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "RedServiceNoticeReq": {
          "fields": {
            "notifyIdBegin": {
              "type": "int64",
              "id": 1
            },
            "notifyIdEnd": {
              "type": "int64",
              "id": 2
            },
            "appId": {
              "type": "int64",
              "id": 3
            },
            "wantCount": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "RedServiceNoticeRsp": {
          "fields": {
            "notifyIdBegin": {
              "type": "int64",
              "id": 1
            },
            "notifyIdEnd": {
              "type": "int64",
              "id": 2
            },
            "appId": {
              "type": "int64",
              "id": 3
            },
            "wantCount": {
              "type": "int32",
              "id": 4
            },
            "leaveCount": {
              "type": "int32",
              "id": 5
            },
            "serviceNotice": {
              "rule": "repeated",
              "type": "ServiceNotice",
              "id": 6
            }
          }
        },
        "ServiceNotice": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "appId": {
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "int32",
              "id": 3
            },
            "messageBody": {
              "type": "string",
              "id": 4
            }
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
            "BACKGROUND_CHANGE": 20,
            "HAND_DRAWN_GIFT": 21,
            "TOP1_FANS_CHANGE_NOTITFY": 22
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
        "Version": {
          "values": {
            "UnknownVersion": 0,
            "V210121": 210121
          }
        }
      }
    },
    "pb_msg_call": {
      "nested": {
        "BusinessType": {
          "values": {
            "NORMAL": 0,
            "MATCH": 1
          }
        },
        "CallType": {
          "values": {
            "VOICE": 0,
            "VIDEO": 1
          }
        },
        "SDK": {
          "values": {
            "ZEGO": 0,
            "QINIU": 1
          }
        },
        "CallReq": {
          "fields": {
            "businessType": {
              "type": "BusinessType",
              "id": 1
            },
            "type": {
              "type": "CallType",
              "id": 2
            },
            "channel": {
              "type": "string",
              "id": 3
            },
            "sdk": {
              "type": "SDK",
              "id": 4
            },
            "callId": {
              "type": "int64",
              "id": 5
            },
            "roomToken": {
              "type": "string",
              "id": 6
            },
            "callAt": {
              "type": "int64",
              "id": 7
            },
            "price": {
              "type": "int64",
              "id": 8
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 10
            }
          }
        },
        "CallRsp": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            },
            "roomToken": {
              "type": "string",
              "id": 2
            },
            "callAt": {
              "type": "int64",
              "id": 3
            },
            "price": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "AcceptReq": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            },
            "acceptAt": {
              "type": "int64",
              "id": 2
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 10
            }
          }
        },
        "AcceptRsp": {
          "fields": {
            "acceptAt": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "DeclineReq": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            },
            "declineAt": {
              "type": "int64",
              "id": 2
            },
            "callerId": {
              "type": "int64",
              "id": 3
            },
            "exp": {
              "keyType": "string",
              "type": "string",
              "id": 10
            }
          }
        },
        "DeclineRsp": {
          "fields": {
            "declineAt": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "AcceptedNotify": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "Reason": {
          "values": {
            "CALLER_HEARTBEAT_TIMEOUT": 0,
            "CALLEE_HEARTBEAT_TIMEOUT": 10,
            "USER_NO_MONEY": 20,
            "CALLING_TIMEOUT": 21
          }
        },
        "OverNotify": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            },
            "reason": {
              "type": "Reason",
              "id": 2
            },
            "overAt": {
              "type": "int64",
              "id": 3
            },
            "feeUserId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "StatsNotify": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            },
            "duration": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "NoFreeTimeNotify": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "NoMoneyNotify": {
          "fields": {
            "callId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ZegoRecordOverReq": {
          "fields": {
            "TaskId": {
              "type": "string",
              "id": 1
            },
            "RoomId": {
              "type": "string",
              "id": 2
            },
            "ReplayUrl": {
              "type": "string",
              "id": 3
            }
          }
        },
        "ZegoRecordOverRsp": {
          "fields": {}
        },
        "EnableAcceptNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "DisableAcceptNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 2
            }
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
            "CALL_OVER_RESION_BALANCE_NOT_ENOUGH": 7,
            "CALL_OVER_RESION_CALLER_CANCEL": 8,
            "CALL_OVER_RESION_CALLEE_BUZY": 9,
            "CALL_OVER_RESION_CALLEE_NOT_ANSWER": 10
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
            },
            "ChannelName": {
              "type": "string",
              "id": 4
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
            "AGREE": 1,
            "BUZY": 2,
            "NOT_ANSWER": 3
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
    "google": {
      "nested": {
        "protobuf": {
          "nested": {
            "Struct": {
              "fields": {
                "fields": {
                  "keyType": "string",
                  "type": "Value",
                  "id": 1
                }
              }
            },
            "Value": {
              "oneofs": {
                "kind": {
                  "oneof": [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                  ]
                }
              },
              "fields": {
                "nullValue": {
                  "type": "NullValue",
                  "id": 1
                },
                "numberValue": {
                  "type": "double",
                  "id": 2
                },
                "stringValue": {
                  "type": "string",
                  "id": 3
                },
                "boolValue": {
                  "type": "bool",
                  "id": 4
                },
                "structValue": {
                  "type": "Struct",
                  "id": 5
                },
                "listValue": {
                  "type": "ListValue",
                  "id": 6
                }
              }
            },
            "NullValue": {
              "values": {
                "NULL_VALUE": 0
              }
            },
            "ListValue": {
              "fields": {
                "values": {
                  "rule": "repeated",
                  "type": "Value",
                  "id": 1
                }
              }
            },
            "Any": {
              "fields": {
                "type_url": {
                  "type": "string",
                  "id": 1
                },
                "value": {
                  "type": "bytes",
                  "id": 2
                }
              }
            }
          }
        },
        "rpc": {
          "options": {
            "cc_enable_arenas": true,
            "go_package": "google.golang.org/genproto/googleapis/rpc/status;status",
            "java_multiple_files": true,
            "java_outer_classname": "StatusProto",
            "java_package": "com.google.rpc",
            "objc_class_prefix": "RPC"
          },
          "nested": {
            "Status": {
              "fields": {
                "code": {
                  "type": "int32",
                  "id": 1
                },
                "message": {
                  "type": "string",
                  "id": 2
                },
                "details": {
                  "rule": "repeated",
                  "type": "google.protobuf.Any",
                  "id": 3
                }
              }
            }
          }
        }
      }
    },
    "pb_msg_commim_uaa": {
      "nested": {
        "CheckAccountExistReq": {
          "fields": {
            "account": {
              "type": "string",
              "id": 1
            }
          }
        },
        "CheckAccountExistRsp": {
          "fields": {
            "account": {
              "type": "string",
              "id": 1
            },
            "Exist": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "SignupReq": {
          "fields": {
            "username": {
              "type": "string",
              "id": 1
            },
            "phone": {
              "type": "string",
              "id": 2
            },
            "email": {
              "type": "string",
              "id": 3
            },
            "password": {
              "type": "string",
              "id": 4
            },
            "code": {
              "type": "int32",
              "id": 5
            },
            "nickname": {
              "type": "string",
              "id": 6
            },
            "sysInviteCode": {
              "type": "string",
              "id": 7
            },
            "avatar": {
              "type": "string",
              "id": 8
            }
          }
        },
        "SignupRsp": {
          "fields": {
            "info": {
              "type": "UserInfo",
              "id": 1
            },
            "token": {
              "type": "string",
              "id": 2
            },
            "imToken": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UnregisterReq": {
          "fields": {
            "account": {
              "type": "string",
              "id": 1
            },
            "phone": {
              "type": "string",
              "id": 2
            },
            "email": {
              "type": "string",
              "id": 3
            },
            "password": {
              "type": "string",
              "id": 4
            },
            "code": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "SendPhoneCodeReq": {
          "fields": {
            "PhoneNo": {
              "type": "string",
              "id": 1
            },
            "Code": {
              "type": "string",
              "id": 2
            }
          }
        },
        "SendEmailCodeReq": {
          "fields": {
            "EmailAddr": {
              "type": "string",
              "id": 1
            },
            "Code": {
              "type": "string",
              "id": 2
            }
          }
        },
        "LoginReq": {
          "fields": {
            "username": {
              "type": "string",
              "id": 1
            },
            "phone": {
              "type": "string",
              "id": 2
            },
            "email": {
              "type": "string",
              "id": 3
            },
            "password": {
              "type": "string",
              "id": 4
            },
            "code": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "LoginRsp": {
          "fields": {
            "info": {
              "type": "UserInfo",
              "id": 1
            },
            "token": {
              "type": "string",
              "id": 2
            },
            "imToken": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UserInfo": {
          "fields": {
            "userId": {
              "type": "string",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "imId": {
              "type": "int64",
              "id": 3
            },
            "phone": {
              "type": "string",
              "id": 4
            },
            "email": {
              "type": "string",
              "id": 5
            },
            "nickname": {
              "type": "string",
              "id": 6
            },
            "role": {
              "type": "int32",
              "id": 7
            },
            "avatar": {
              "type": "string",
              "id": 8
            },
            "banned": {
              "type": "bool",
              "id": 9
            },
            "gender": {
              "type": "int32",
              "id": 10
            },
            "sign": {
              "type": "string",
              "id": 11
            },
            "level": {
              "type": "int32",
              "id": 12
            },
            "userSourceVersion": {
              "type": "int32",
              "id": 13
            },
            "passWord": {
              "type": "string",
              "id": 14
            },
            "code": {
              "type": "string",
              "id": 15
            },
            "freeAddMeFriend": {
              "type": "bool",
              "id": 16
            }
          }
        },
        "UserInfoReq": {
          "fields": {}
        },
        "UserInfoRsp": {
          "fields": {
            "info": {
              "type": "UserInfo",
              "id": 1
            }
          }
        },
        "FindUserInfoIntellReq": {
          "fields": {
            "param": {
              "type": "string",
              "id": 1
            }
          }
        },
        "UpdateUserInfoReq": {
          "fields": {
            "userId": {
              "type": "string",
              "id": 1
            },
            "info": {
              "type": "UserInfo",
              "id": 2
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 3
            }
          }
        },
        "UpdateUserInfoRsp": {
          "fields": {
            "userSourceNewVersion": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "BannedUserNotify": {
          "fields": {
            "optUaaUserId": {
              "type": "string",
              "id": 1
            },
            "aimUaaUserId": {
              "type": "string",
              "id": 2
            },
            "reason": {
              "type": "string",
              "id": 3
            },
            "banned": {
              "type": "bool",
              "id": 4
            }
          }
        },
        "Suggest": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "suggest": {
              "type": "string",
              "id": 2
            },
            "type": {
              "type": "int32",
              "id": 3
            },
            "kind": {
              "type": "int32",
              "id": 4
            },
            "emergentLevel": {
              "type": "int32",
              "id": 5
            },
            "replyCount": {
              "type": "int32",
              "id": 6
            },
            "state": {
              "type": "int32",
              "id": 7
            },
            "userId": {
              "type": "int64",
              "id": 8
            },
            "replyUserId": {
              "type": "int64",
              "id": 9
            },
            "closeUserId": {
              "type": "int64",
              "id": 10
            },
            "createdAt": {
              "type": "int64",
              "id": 11
            },
            "updatedAt": {
              "type": "int64",
              "id": 12
            },
            "results": {
              "type": "string",
              "id": 13
            },
            "relationSuggestId": {
              "type": "int64",
              "id": 14
            },
            "ProblemTime": {
              "type": "int64",
              "id": 15
            },
            "Pics": {
              "type": "string",
              "id": 16
            },
            "PhoneNo": {
              "type": "string",
              "id": 17
            },
            "associationId": {
              "type": "int64",
              "id": 18
            },
            "associationInfo": {
              "type": "string",
              "id": 19
            }
          }
        },
        "SuggestReply": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "suggestId": {
              "type": "int64",
              "id": 2
            },
            "relationReplyId": {
              "type": "int64",
              "id": 3
            },
            "reply": {
              "type": "string",
              "id": 4
            },
            "createdAt": {
              "type": "int64",
              "id": 5
            },
            "updatedAt": {
              "type": "int64",
              "id": 6
            },
            "replyUserId": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "AddSuggestReq": {
          "fields": {
            "type": {
              "type": "int32",
              "id": 1
            },
            "kind": {
              "type": "int32",
              "id": 2
            },
            "suggest": {
              "type": "string",
              "id": 3
            },
            "emergentLevel": {
              "type": "int32",
              "id": 4
            },
            "relationSuggestId": {
              "type": "int64",
              "id": 5
            },
            "suggestData": {
              "type": "Suggest",
              "id": 6
            }
          }
        },
        "AddSuggestRsp": {
          "fields": {
            "suggest": {
              "type": "Suggest",
              "id": 1
            }
          }
        },
        "GetSuggestListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int32",
              "id": 3
            },
            "suggestCondition": {
              "type": "Suggest",
              "id": 4
            }
          }
        },
        "GetSuggestListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int32",
              "id": 3
            },
            "suggestList": {
              "rule": "repeated",
              "type": "Suggest",
              "id": 4
            }
          }
        },
        "AddSuggestReplyReq": {
          "fields": {
            "suggestId": {
              "type": "int64",
              "id": 1
            },
            "relationReplyId": {
              "type": "int64",
              "id": 2
            },
            "reply": {
              "type": "string",
              "id": 3
            }
          }
        },
        "AddSuggestReplyRsp": {
          "fields": {
            "suggestReply": {
              "type": "SuggestReply",
              "id": 1
            }
          }
        },
        "GetSuggestDetailReq": {
          "fields": {
            "SuggestId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GetSuggestDetailRsp": {
          "fields": {
            "suggest": {
              "type": "Suggest",
              "id": 1
            }
          }
        },
        "GetSuggestReplyListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int32",
              "id": 3
            },
            "SuggestId": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "GetSuggestReplyListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int32",
              "id": 3
            },
            "SuggestId": {
              "type": "int64",
              "id": 4
            },
            "suggestReplyList": {
              "rule": "repeated",
              "type": "SuggestReply",
              "id": 5
            }
          }
        },
        "SetSuggestStatusReq": {
          "fields": {
            "suggestId": {
              "type": "int64",
              "id": 1
            },
            "status": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "SetSuggestReplyStatusRsp": {
          "fields": {
            "suggestId": {
              "type": "int64",
              "id": 1
            },
            "status": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "CheckVersionReq": {
          "fields": {
            "version": {
              "type": "int64",
              "id": 1
            },
            "clientRunEnv": {
              "type": "pb_pub.CLIENT_RUN_ENV_TYPE",
              "id": 2
            }
          }
        },
        "CheckVersionRsp": {
          "fields": {
            "LatestVersion": {
              "type": "int64",
              "id": 1
            },
            "needForcedUpdate": {
              "type": "bool",
              "id": 2
            },
            "url": {
              "type": "string",
              "id": 3
            },
            "versionDesc": {
              "type": "string",
              "id": 4
            },
            "clientRunEnv": {
              "type": "pb_pub.CLIENT_RUN_ENV_TYPE",
              "id": 5
            },
            "needCleanCatchData": {
              "type": "bool",
              "id": 6
            }
          }
        },
        "ImEndPoint": {
          "fields": {
            "cfgAllocatorUrl": {
              "type": "string",
              "id": 1
            },
            "urlUploadFile": {
              "type": "string",
              "id": 2
            },
            "cfgImInterApiUrl": {
              "type": "string",
              "id": 3
            },
            "cfgImOutApiUrl": {
              "type": "string",
              "id": 4
            },
            "cfgAppGateApiHost": {
              "type": "string",
              "id": 5
            },
            "cfgGrpcUrl": {
              "type": "string",
              "id": 6
            },
            "appId": {
              "type": "int32",
              "id": 7
            },
            "score": {
              "type": "int32",
              "id": 8
            },
            "delay": {
              "type": "int32",
              "id": 9
            },
            "name": {
              "type": "string",
              "id": 10
            }
          }
        },
        "FetchEndPointReq": {
          "fields": {}
        },
        "FetchEndPointRsp": {
          "fields": {
            "endPoints": {
              "rule": "repeated",
              "type": "ImEndPoint",
              "id": 1
            }
          }
        },
        "CheckDelayReq": {
          "fields": {}
        },
        "CheckDelayRsp": {
          "fields": {}
        },
        "GetSysCfgReq": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GetSysCfgRsp": {
          "fields": {
            "sysCfg": {
              "keyType": "string",
              "type": "string",
              "id": 1
            }
          }
        },
        "ImLoginConfirmReq": {
          "fields": {
            "imUserId": {
              "type": "int64",
              "id": 1
            },
            "token": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ImLoginConfirmRsp": {
          "fields": {
            "pass": {
              "type": "bool",
              "id": 1
            },
            "reason": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ResetPasswordReq": {
          "fields": {
            "phone": {
              "type": "string",
              "id": 1
            },
            "email": {
              "type": "string",
              "id": 2
            },
            "password": {
              "type": "string",
              "id": 3
            },
            "code": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "ResetPasswordRsp": {
          "fields": {
            "status": {
              "type": "google.rpc.Status",
              "id": 2
            }
          }
        },
        "UserAddress": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "contacts": {
              "type": "string",
              "id": 2
            },
            "phoneCode": {
              "type": "string",
              "id": 3
            },
            "area": {
              "type": "string",
              "id": 4
            },
            "detailAddress": {
              "type": "string",
              "id": 5
            },
            "postCode": {
              "type": "string",
              "id": 6
            },
            "isDefault": {
              "type": "bool",
              "id": 7
            }
          }
        },
        "AddAddressReq": {
          "fields": {
            "address": {
              "type": "UserAddress",
              "id": 1
            }
          }
        },
        "AddAddressRsp": {
          "fields": {
            "address": {
              "type": "UserAddress",
              "id": 1
            }
          }
        },
        "DelAddressReq": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "EditAddressReq": {
          "fields": {
            "address": {
              "type": "UserAddress",
              "id": 1
            }
          }
        },
        "FetchAddressReq": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "FetchAddressRsp": {
          "fields": {
            "address": {
              "type": "UserAddress",
              "id": 1
            }
          }
        },
        "FetchDefaultAddressReq": {
          "fields": {}
        },
        "FetchDefaultAddressRsp": {
          "fields": {
            "address": {
              "type": "UserAddress",
              "id": 1
            }
          }
        },
        "FetchAddressListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "FetchAddressListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "total": {
              "type": "int64",
              "id": 3
            },
            "addressList": {
              "rule": "repeated",
              "type": "UserAddress",
              "id": 4
            }
          }
        },
        "CategorizeTag": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "tag": {
              "type": "string",
              "id": 2
            },
            "memberCount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "CategorizeTagMember": {
          "fields": {
            "tagId": {
              "type": "int64",
              "id": 1
            },
            "memberId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "AddCategorizeTagReq": {
          "fields": {
            "tag": {
              "type": "string",
              "id": 1
            },
            "member": {
              "rule": "repeated",
              "type": "CategorizeTagMember",
              "id": 2
            }
          }
        },
        "AddCategorizeTagRsp": {
          "fields": {
            "tag": {
              "type": "CategorizeTag",
              "id": 1
            },
            "member": {
              "rule": "repeated",
              "type": "CategorizeTagMember",
              "id": 2
            }
          }
        },
        "DelCategorizeTagReq": {
          "fields": {
            "tagId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "EditCategorizeTagReq": {
          "fields": {
            "tag": {
              "type": "CategorizeTag",
              "id": 1
            }
          }
        },
        "FetchCategorizeTagListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "FetchCategorizeTagListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "total": {
              "type": "int64",
              "id": 3
            },
            "tagList": {
              "rule": "repeated",
              "type": "CategorizeTag",
              "id": 4
            }
          }
        },
        "AddCategorizeTagMemberReq": {
          "fields": {
            "member": {
              "type": "CategorizeTagMember",
              "id": 1
            }
          }
        },
        "AddCategorizeTagMemberRsp": {
          "fields": {
            "member": {
              "type": "CategorizeTagMember",
              "id": 1
            },
            "tagMemberTotalCount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DelCategorizeTagMemberReq": {
          "fields": {
            "member": {
              "type": "CategorizeTagMember",
              "id": 1
            }
          }
        },
        "DelCategorizeTagMemberRsp": {
          "fields": {
            "tagMemberTotalCount": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "FetchCategorizeTagMemberListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "tagId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "FetchCategorizeTagMemberListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "total": {
              "type": "int64",
              "id": 3
            },
            "memberList": {
              "rule": "repeated",
              "type": "CategorizeTagMember",
              "id": 4
            }
          }
        },
        "ENBackgroundImageModelType": {
          "values": {
            "ENBackgroundImageModelChat": 0,
            "ENBackgroundImageModelAudio": 1,
            "ENBackgroundImageModelGroup": 2
          }
        },
        "BackgroundImageInfo": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createdAt": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            },
            "modelType": {
              "type": "ENBackgroundImageModelType",
              "id": 4
            },
            "modelRelationId": {
              "type": "int64",
              "id": 5
            },
            "imageUrl": {
              "type": "string",
              "id": 6
            }
          }
        },
        "AddBackgroundReq": {
          "fields": {
            "imageInfo": {
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "AddBackgroundRsp": {
          "fields": {
            "imageInfo": {
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "DelBackgroundPicReq": {
          "fields": {
            "imageInfo": {
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "DelBackgroundRsp": {
          "fields": {
            "imageInfo": {
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "FetchBackgroundPicListReq": {
          "fields": {
            "imageInfo": {
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "FetchBackgroundPicListRsp": {
          "fields": {
            "imageInfoList": {
              "rule": "repeated",
              "type": "BackgroundImageInfo",
              "id": 1
            }
          }
        },
        "Wallet": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "value": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "WalletGetInfoReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "WalletGetInfoRsp": {
          "fields": {
            "wallet": {
              "rule": "repeated",
              "type": "Wallet",
              "id": 1
            },
            "hasePassWorld": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "WalletAddValueReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "addValue": {
              "type": "int64",
              "id": 3
            },
            "optUserId": {
              "type": "int64",
              "id": 4
            },
            "description": {
              "type": "string",
              "id": 5
            }
          }
        },
        "WalletAddValueRsp": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "addValue": {
              "type": "int64",
              "id": 3
            },
            "optUserId": {
              "type": "int64",
              "id": 4
            },
            "latestValue": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "WalletReduceValueReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "reduceValue": {
              "type": "int64",
              "id": 3
            },
            "optUserId": {
              "type": "int64",
              "id": 4
            },
            "description": {
              "type": "string",
              "id": 5
            },
            "passwd": {
              "type": "string",
              "id": 6
            }
          }
        },
        "WalletReduceValueRsp": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "reduceValue": {
              "type": "int64",
              "id": 3
            },
            "optUserId": {
              "type": "int64",
              "id": 4
            },
            "latestValue": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "WalletChangeNotify": {
          "fields": {
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "changeValue": {
              "type": "int64",
              "id": 3
            },
            "optUserId": {
              "type": "int64",
              "id": 4
            },
            "latestValue": {
              "type": "int64",
              "id": 5
            },
            "description": {
              "type": "string",
              "id": 6
            }
          }
        },
        "WalletChangeFlowItem": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createdAt": {
              "type": "int64",
              "id": 2
            },
            "updatedAt": {
              "type": "int64",
              "id": 3
            },
            "userId": {
              "type": "int64",
              "id": 4
            },
            "walletType": {
              "type": "int32",
              "id": 5
            },
            "changeValue": {
              "type": "int64",
              "id": 6
            },
            "optUserId": {
              "type": "int64",
              "id": 7
            },
            "latestValue": {
              "type": "int64",
              "id": 8
            },
            "description": {
              "type": "string",
              "id": 9
            },
            "Status": {
              "type": "int32",
              "id": 10
            },
            "StatusDesc": {
              "type": "string",
              "id": 11
            },
            "ChannelId": {
              "type": "int32",
              "id": 12
            },
            "ChannelName": {
              "type": "string",
              "id": 13
            }
          }
        },
        "WalletGetChangeFlowReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "SortingRules": {
              "type": "int32",
              "id": 3
            },
            "beginTime": {
              "type": "int64",
              "id": 4
            },
            "endTime": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "WalletGetChangeFlowRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "SortingRules": {
              "type": "int32",
              "id": 3
            },
            "beginTime": {
              "type": "int64",
              "id": 4
            },
            "endTime": {
              "type": "int64",
              "id": 5
            },
            "totalCount": {
              "type": "int64",
              "id": 6
            },
            "items": {
              "rule": "repeated",
              "type": "WalletChangeFlowItem",
              "id": 7
            }
          }
        },
        "WalletSetPasswordReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "phoneCode": {
              "type": "string",
              "id": 3
            },
            "oldPassword": {
              "type": "string",
              "id": 4
            },
            "newPassword": {
              "type": "string",
              "id": 5
            },
            "changeReason": {
              "type": "string",
              "id": 6
            },
            "optUserId": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "Card": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "icon": {
              "type": "string",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "code": {
              "type": "string",
              "id": 4
            },
            "awardsUrl": {
              "type": "string",
              "id": 5
            },
            "createTime": {
              "type": "int64",
              "id": 6
            },
            "expireTime": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "GetCardPackageItemsReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "GetCardPackageItemsRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int32",
              "id": 3
            },
            "cardItems": {
              "rule": "repeated",
              "type": "Card",
              "id": 4
            }
          }
        },
        "TaskSignUpReq": {
          "fields": {}
        },
        "TaskSignUpRsp": {
          "fields": {
            "continuTimes": {
              "type": "int32",
              "id": 1
            },
            "awards": {
              "rule": "repeated",
              "type": "AwardsInstance",
              "id": 2
            }
          }
        },
        "SignUpLog": {
          "fields": {
            "createdAt": {
              "type": "int64",
              "id": 1
            },
            "continueTimes": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "TaskSignUpStatusReq": {
          "fields": {}
        },
        "TaskSignUpStatusRsp": {
          "fields": {
            "periodBeginTime": {
              "type": "int64",
              "id": 1
            },
            "createdTime": {
              "type": "int64",
              "id": 2
            },
            "continuTimes": {
              "type": "int32",
              "id": 3
            },
            "signUpLog": {
              "rule": "repeated",
              "type": "SignUpLog",
              "id": 4
            }
          }
        },
        "TaskSignUpInfoReq": {
          "fields": {}
        },
        "TaskLoopType": {
          "values": {
            "TaskLoopOnce": 0,
            "TaskLoopPeriodicity": 1
          }
        },
        "Awards": {
          "fields": {
            "awardsId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "icon": {
              "type": "string",
              "id": 4
            },
            "description": {
              "type": "string",
              "id": 5
            },
            "data": {
              "type": "string",
              "id": 6
            }
          }
        },
        "AwardsInstance": {
          "fields": {
            "awardsTemplate": {
              "type": "Awards",
              "id": 1
            },
            "awardsInstanceData": {
              "keyType": "string",
              "type": "string",
              "id": 2
            },
            "awardsInstanceJson": {
              "type": "string",
              "id": 3
            }
          }
        },
        "TaskPeriod": {
          "values": {
            "Day": 0,
            "Week": 1
          }
        },
        "TaskStatus": {
          "values": {
            "Edit": 0,
            "OnLine": 1,
            "OffLine": 2
          }
        },
        "TaskGoingStatus": {
          "values": {
            "Default": 0,
            "Receipted": 1,
            "Going": 2,
            "Completed": 3,
            "Rewarded": 4
          }
        },
        "Task": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "loopType": {
              "type": "TaskLoopType",
              "id": 3
            },
            "period": {
              "type": "TaskPeriod",
              "id": 4
            },
            "periodCounts": {
              "type": "int32",
              "id": 5
            },
            "description": {
              "type": "string",
              "id": 6
            },
            "status": {
              "type": "TaskStatus",
              "id": 7
            },
            "subTask": {
              "rule": "repeated",
              "type": "SubTask",
              "id": 8
            },
            "awards": {
              "rule": "repeated",
              "type": "Awards",
              "id": 9
            }
          }
        },
        "SubTask": {
          "fields": {
            "subTaskId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "description": {
              "type": "string",
              "id": 3
            },
            "orderId": {
              "type": "int32",
              "id": 4
            },
            "status": {
              "type": "TaskStatus",
              "id": 5
            },
            "completionConditions": {
              "type": "string",
              "id": 6
            },
            "awardsList": {
              "rule": "repeated",
              "type": "Awards",
              "id": 7
            },
            "taskGoingStatus": {
              "type": "TaskGoingStatus",
              "id": 8
            }
          }
        },
        "TaskSignUpInfoRsp": {
          "fields": {
            "task": {
              "type": "Task",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_community": {
      "nested": {
        "RefType": {
          "values": {
            "UNKNOWN": 0,
            "POST": 1,
            "COMMENT": 2,
            "REPLY": 3,
            "VIDEO": 4,
            "IMAGE": 5,
            "AUDIO": 6,
            "VOTE": 7,
            "LINK": 8
          }
        },
        "LikeType": {
          "values": {
            "UP": 0,
            "DOWN": 1,
            "A": 2,
            "B": 3,
            "C": 4,
            "D": 5
          }
        },
        "Topic": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createAt": {
              "type": "int64",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "cover": {
              "type": "string",
              "id": 4
            },
            "count": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "AddTopicReq": {
          "fields": {
            "parentId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "cover": {
              "type": "string",
              "id": 3
            }
          }
        },
        "AddTopicRsp": {
          "fields": {}
        },
        "AddGiftReq": {
          "fields": {
            "price": {
              "type": "int64",
              "id": 1
            },
            "url": {
              "type": "string",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            }
          }
        },
        "AddGiftRsp": {
          "fields": {}
        },
        "JoinType": {
          "values": {
            "FREE": 0,
            "APPLY": 1,
            "PASSWORD": 2,
            "ANSWER": 3
          }
        },
        "Community": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createAt": {
              "type": "int64",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "avatar": {
              "type": "string",
              "id": 4
            },
            "describe": {
              "type": "string",
              "id": 5
            },
            "positiveRules": {
              "type": "string",
              "id": 6
            },
            "negativeRules": {
              "type": "string",
              "id": 7
            },
            "joinType": {
              "type": "JoinType",
              "id": 8
            },
            "inviteJoin": {
              "type": "bool",
              "id": 12
            },
            "password": {
              "type": "string",
              "id": 20
            },
            "question": {
              "type": "string",
              "id": 21
            },
            "answer": {
              "type": "string",
              "id": 22
            }
          }
        },
        "CreateCommunityReq": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            },
            "avatar": {
              "type": "string",
              "id": 2
            },
            "describe": {
              "type": "string",
              "id": 3
            },
            "positiveRules": {
              "type": "string",
              "id": 4
            },
            "negativeRules": {
              "type": "string",
              "id": 5
            },
            "joinType": {
              "type": "JoinType",
              "id": 6
            },
            "inviteJoin": {
              "type": "bool",
              "id": 12
            },
            "password": {
              "type": "string",
              "id": 20
            },
            "question": {
              "type": "string",
              "id": 21
            },
            "answer": {
              "type": "string",
              "id": 22
            }
          }
        },
        "CreateCommunityRsp": {
          "fields": {
            "community": {
              "type": "Community",
              "id": 1
            }
          }
        },
        "UpdateCommunityReq": {
          "fields": {
            "community": {
              "type": "Community",
              "id": 1
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateCommunityRsp": {
          "fields": {}
        },
        "ApplyJoinReq": {
          "fields": {}
        },
        "ApplyJoinRsp": {
          "fields": {}
        },
        "AnswerApplyReq": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "AnswerApplyRsp": {
          "fields": {}
        },
        "InviteJoinReq": {
          "fields": {
            "invitees": {
              "rule": "repeated",
              "type": "User",
              "id": 1
            }
          }
        },
        "InviteJoinRsp": {
          "fields": {}
        },
        "AnswerInviteReq": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "AnswerInviteRsp": {
          "fields": {}
        },
        "JoinCommunityReq": {
          "fields": {
            "username": {
              "type": "string",
              "id": 1
            },
            "avatr": {
              "type": "string",
              "id": 2
            },
            "answer": {
              "type": "string",
              "id": 3
            },
            "password": {
              "type": "string",
              "id": 4
            }
          }
        },
        "JoinCommunityRsp": {
          "fields": {}
        },
        "QuitCommunityReq": {
          "fields": {}
        },
        "QuitCommunityRsp": {
          "fields": {}
        },
        "UserCommunitiesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserCommunitiesRsp": {
          "fields": {
            "communities": {
              "rule": "repeated",
              "type": "Community",
              "id": 1
            }
          }
        },
        "AllCommunitiesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "keyWord": {
              "type": "string",
              "id": 3
            }
          }
        },
        "AllCommunitiesRsp": {
          "fields": {
            "communities": {
              "rule": "repeated",
              "type": "Community",
              "id": 1
            }
          }
        },
        "CommunityDetailReq": {
          "fields": {}
        },
        "CommunityDetailRsp": {
          "fields": {
            "community": {
              "type": "Community",
              "id": 1
            }
          }
        },
        "Member": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "appUserId": {
              "type": "string",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            },
            "username": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            },
            "role": {
              "type": "int32",
              "id": 6
            }
          }
        },
        "MembersReq": {
          "fields": {}
        },
        "MembersRsp": {
          "fields": {
            "members": {
              "rule": "repeated",
              "type": "Member",
              "id": 1
            }
          }
        },
        "UpdateMemberReq": {
          "fields": {
            "member": {
              "type": "Member",
              "id": 1
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateMemberRsp": {
          "fields": {}
        },
        "Video": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "url": {
              "type": "string",
              "id": 2
            },
            "Plays": {
              "type": "int64",
              "id": 3
            },
            "Barrages": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "Image": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "url": {
              "type": "string",
              "id": 2
            },
            "tags": {
              "rule": "repeated",
              "type": "Tag",
              "id": 3
            }
          }
        },
        "Tag": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "type": {
              "type": "int32",
              "id": 2
            },
            "content": {
              "type": "string",
              "id": 3
            },
            "x": {
              "type": "int64",
              "id": 4
            },
            "y": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "Audio": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "url": {
              "type": "string",
              "id": 2
            },
            "cover": {
              "type": "string",
              "id": 3
            }
          }
        },
        "Link": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "url": {
              "type": "string",
              "id": 3
            }
          }
        },
        "Vote": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "content": {
              "type": "string",
              "id": 2
            },
            "options": {
              "rule": "repeated",
              "type": "Option",
              "id": 3
            }
          }
        },
        "Option": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "content": {
              "type": "string",
              "id": 2
            },
            "count": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "Post": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createAt": {
              "type": "int64",
              "id": 2
            },
            "topicId": {
              "type": "int64",
              "id": 3
            },
            "topicName": {
              "type": "string",
              "id": 4
            },
            "appId": {
              "type": "int64",
              "id": 5
            },
            "userId": {
              "type": "int64",
              "id": 6
            },
            "appUserId": {
              "type": "string",
              "id": 7
            },
            "username": {
              "type": "string",
              "id": 8
            },
            "avatar": {
              "type": "string",
              "id": 9
            },
            "content": {
              "type": "string",
              "id": 10
            },
            "communityId": {
              "type": "int64",
              "id": 11
            },
            "communityName": {
              "type": "string",
              "id": 12
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 20
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 21
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 22
            },
            "links": {
              "rule": "repeated",
              "type": "Link",
              "id": 23
            },
            "votes": {
              "rule": "repeated",
              "type": "Vote",
              "id": 24
            },
            "likes": {
              "type": "int64",
              "id": 30
            },
            "likeas": {
              "type": "int64",
              "id": 31
            },
            "likebs": {
              "type": "int64",
              "id": 32
            },
            "likecs": {
              "type": "int64",
              "id": 33
            },
            "likeds": {
              "type": "int64",
              "id": 34
            },
            "shares": {
              "type": "int64",
              "id": 35
            },
            "watchs": {
              "type": "int64",
              "id": 36
            },
            "comments": {
              "type": "int64",
              "id": 37
            },
            "award": {
              "type": "bool",
              "id": 50
            },
            "awards": {
              "type": "int64",
              "id": 51
            },
            "topComments": {
              "rule": "repeated",
              "type": "Comment",
              "id": 60
            }
          }
        },
        "PostReq": {
          "fields": {
            "topicId": {
              "type": "int64",
              "id": 1
            },
            "topicName": {
              "type": "string",
              "id": 2
            },
            "content": {
              "type": "string",
              "id": 3
            },
            "award": {
              "type": "bool",
              "id": 4
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 5
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 6
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 7
            },
            "votes": {
              "rule": "repeated",
              "type": "Vote",
              "id": 8
            },
            "links": {
              "rule": "repeated",
              "type": "Link",
              "id": 9
            },
            "communityId": {
              "type": "int64",
              "id": 10
            },
            "communityName": {
              "type": "string",
              "id": 11
            }
          }
        },
        "PostRsp": {
          "fields": {}
        },
        "Comment": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createAt": {
              "type": "int64",
              "id": 2
            },
            "appId": {
              "type": "int64",
              "id": 3
            },
            "userId": {
              "type": "int64",
              "id": 4
            },
            "appUserId": {
              "type": "string",
              "id": 5
            },
            "username": {
              "type": "string",
              "id": 6
            },
            "avatar": {
              "type": "string",
              "id": 7
            },
            "refId": {
              "type": "int64",
              "id": 8
            },
            "refType": {
              "type": "int32",
              "id": 9
            },
            "content": {
              "type": "string",
              "id": 10
            },
            "stamped": {
              "type": "bool",
              "id": 11
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 20
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 21
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 22
            },
            "likes": {
              "type": "int64",
              "id": 30
            },
            "shares": {
              "type": "int64",
              "id": 31
            },
            "watchs": {
              "type": "int64",
              "id": 32
            },
            "replies": {
              "type": "int64",
              "id": 33
            },
            "topReplies": {
              "rule": "repeated",
              "type": "Reply",
              "id": 41
            }
          }
        },
        "CommentReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "content": {
              "type": "string",
              "id": 3
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 4
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 5
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 6
            }
          }
        },
        "CommentRsp": {
          "fields": {
            "comment": {
              "type": "Comment",
              "id": 1
            }
          }
        },
        "Reply": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "createAt": {
              "type": "int64",
              "id": 2
            },
            "appId": {
              "type": "int64",
              "id": 3
            },
            "userId": {
              "type": "int64",
              "id": 4
            },
            "appUserId": {
              "type": "string",
              "id": 5
            },
            "username": {
              "type": "string",
              "id": 6
            },
            "avatar": {
              "type": "string",
              "id": 7
            },
            "commentId": {
              "type": "int64",
              "id": 8
            },
            "content": {
              "type": "string",
              "id": 9
            },
            "talkId": {
              "type": "int64",
              "id": 10
            },
            "toAppId": {
              "type": "int64",
              "id": 11
            },
            "toUserId": {
              "type": "int64",
              "id": 12
            },
            "toAppUserId": {
              "type": "string",
              "id": 13
            },
            "toUsername": {
              "type": "string",
              "id": 14
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 20
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 21
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 22
            },
            "Likes": {
              "type": "int64",
              "id": 31
            }
          }
        },
        "ReplyReq": {
          "fields": {
            "content": {
              "type": "string",
              "id": 1
            },
            "commentId": {
              "type": "int64",
              "id": 2
            },
            "talkId": {
              "type": "int64",
              "id": 3
            },
            "toAppId": {
              "type": "int64",
              "id": 10
            },
            "toUserId": {
              "type": "int64",
              "id": 11
            },
            "toAppUserId": {
              "type": "string",
              "id": 12
            },
            "toUsername": {
              "type": "string",
              "id": 13
            },
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 20
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 21
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 22
            }
          }
        },
        "ReplyRsp": {
          "fields": {
            "reply": {
              "type": "Reply",
              "id": 1
            }
          }
        },
        "Barrage": {
          "fields": {
            "content": {
              "type": "string",
              "id": 1
            },
            "playAt": {
              "type": "int64",
              "id": 2
            },
            "font": {
              "type": "string",
              "id": 3
            }
          }
        },
        "ShootReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "content": {
              "type": "string",
              "id": 3
            },
            "playAt": {
              "type": "int64",
              "id": 4
            },
            "font": {
              "type": "string",
              "id": 5
            }
          }
        },
        "ShootRsp": {
          "fields": {}
        },
        "LikeReq": {
          "fields": {
            "username": {
              "type": "string",
              "id": 1
            },
            "avatar": {
              "type": "string",
              "id": 2
            },
            "refId": {
              "type": "int64",
              "id": 3
            },
            "refType": {
              "type": "int32",
              "id": 4
            },
            "type": {
              "type": "int32",
              "id": 5
            }
          }
        },
        "LikeRsp": {
          "fields": {}
        },
        "UnlikeReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "type": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "UnlikeRsp": {
          "fields": {}
        },
        "ShareReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "ShareRsp": {
          "fields": {}
        },
        "Ballot": {
          "fields": {
            "voteId": {
              "type": "int64",
              "id": 1
            },
            "optionId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "VoteReq": {
          "fields": {
            "username": {
              "type": "string",
              "id": 1
            },
            "avatar": {
              "type": "string",
              "id": 2
            },
            "postId": {
              "type": "int64",
              "id": 3
            },
            "voteId": {
              "type": "int64",
              "id": 4
            },
            "optionId": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "VoteRsp": {
          "fields": {}
        },
        "WatchReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "WatchRsp": {
          "fields": {}
        },
        "UnwatchReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UnwatchRsp": {
          "fields": {}
        },
        "AwardReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "giftId": {
              "type": "int64",
              "id": 3
            },
            "giftNumber": {
              "type": "int64",
              "id": 4
            },
            "giftPrice": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "AwardRsp": {
          "fields": {}
        },
        "FavoriteReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "FavoriteRsp": {
          "fields": {}
        },
        "UnfavoriteReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "UnfavoriteRsp": {
          "fields": {}
        },
        "FollowReq": {
          "fields": {
            "followerUsername": {
              "type": "string",
              "id": 1
            },
            "followerAvatar": {
              "type": "string",
              "id": 2
            },
            "followeeAppId": {
              "type": "int64",
              "id": 3
            },
            "followeeUserId": {
              "type": "int64",
              "id": 4
            },
            "followeeAppUserId": {
              "type": "string",
              "id": 5
            },
            "followeeUsername": {
              "type": "string",
              "id": 6
            },
            "followeeAvatar": {
              "type": "string",
              "id": 7
            }
          }
        },
        "FollowRsp": {
          "fields": {}
        },
        "UnfollowReq": {
          "fields": {
            "followeeAppId": {
              "type": "int64",
              "id": 1
            },
            "followeeUserId": {
              "type": "int64",
              "id": 2
            },
            "followeeAppUserId": {
              "type": "string",
              "id": 3
            }
          }
        },
        "UnfollowRsp": {
          "fields": {}
        },
        "ParticipateReq": {
          "fields": {
            "topicId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ParticipateRsp": {
          "fields": {}
        },
        "UnparticipateReq": {
          "fields": {
            "topicId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "UnparticipateRsp": {
          "fields": {}
        },
        "PostsReq": {
          "fields": {
            "type": {
              "type": "Type",
              "id": 1
            },
            "video": {
              "type": "bool",
              "id": 11
            },
            "image": {
              "type": "bool",
              "id": 12
            },
            "audio": {
              "type": "bool",
              "id": 13
            },
            "vote": {
              "type": "bool",
              "id": 14
            },
            "link": {
              "type": "bool",
              "id": 15
            },
            "order": {
              "type": "Order",
              "id": 21
            },
            "offset": {
              "type": "int64",
              "id": 22
            },
            "count": {
              "type": "int64",
              "id": 23
            }
          },
          "nested": {
            "Type": {
              "values": {
                "Community": 0,
                "Followee": 1,
                "Recommend": 2
              }
            },
            "Order": {
              "values": {
                "New": 0,
                "Hot": 1
              }
            }
          }
        },
        "PostsRsp": {
          "fields": {
            "posts": {
              "rule": "repeated",
              "type": "Post",
              "id": 1
            }
          }
        },
        "PostDetailReq": {
          "fields": {
            "postId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "PostDetailRsp": {
          "fields": {
            "post": {
              "type": "Post",
              "id": 1
            },
            "comments": {
              "rule": "repeated",
              "type": "Comment",
              "id": 2
            }
          }
        },
        "CommentsReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "order": {
              "type": "Order",
              "id": 10
            },
            "offset": {
              "type": "int64",
              "id": 11
            },
            "count": {
              "type": "int64",
              "id": 12
            }
          },
          "nested": {
            "Order": {
              "values": {
                "New": 0,
                "Hot": 1
              }
            }
          }
        },
        "CommentsRsp": {
          "fields": {
            "comments": {
              "rule": "repeated",
              "type": "Comment",
              "id": 1
            }
          }
        },
        "CommentDetailReq": {
          "fields": {
            "commentId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "CommentDetailRsp": {
          "fields": {
            "comment": {
              "type": "Comment",
              "id": 1
            },
            "replies": {
              "rule": "repeated",
              "type": "Reply",
              "id": 2
            }
          }
        },
        "RepliesReq": {
          "fields": {
            "commentId": {
              "type": "int64",
              "id": 1
            },
            "talkId": {
              "type": "int64",
              "id": 2
            },
            "order": {
              "type": "Order",
              "id": 10
            },
            "offset": {
              "type": "int64",
              "id": 11
            },
            "count": {
              "type": "int64",
              "id": 12
            }
          },
          "nested": {
            "Order": {
              "values": {
                "New": 0,
                "Hot": 1
              }
            }
          }
        },
        "RepliesRsp": {
          "fields": {
            "replies": {
              "rule": "repeated",
              "type": "Reply",
              "id": 1
            }
          }
        },
        "BarragesReq": {
          "fields": {
            "refId": {
              "type": "int64",
              "id": 1
            },
            "refType": {
              "type": "int32",
              "id": 2
            },
            "playAt": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "BarragesRsp": {
          "fields": {
            "barrages": {
              "rule": "repeated",
              "type": "Barrage",
              "id": 1
            }
          }
        },
        "CommentRef": {
          "fields": {
            "comment": {
              "type": "Comment",
              "id": 1
            },
            "post": {
              "type": "Post",
              "id": 2
            }
          }
        },
        "VideoRef": {
          "fields": {
            "video": {
              "type": "Video",
              "id": 1
            },
            "post": {
              "type": "Post",
              "id": 2
            },
            "comment": {
              "type": "CommentRef",
              "id": 3
            }
          }
        },
        "BallotRef": {
          "fields": {
            "ballot": {
              "type": "Ballot",
              "id": 1
            },
            "vote": {
              "type": "Vote",
              "id": 2
            },
            "post": {
              "type": "Post",
              "id": 3
            }
          }
        },
        "UserPostsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserPostsRsp": {
          "fields": {
            "posts": {
              "rule": "repeated",
              "type": "Post",
              "id": 1
            }
          }
        },
        "UserCommentsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserCommentsRsp": {
          "fields": {
            "comments": {
              "rule": "repeated",
              "type": "CommentRef",
              "id": 1
            }
          }
        },
        "UserWatchsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserWatchsRsp": {
          "fields": {
            "comments": {
              "rule": "repeated",
              "type": "CommentRef",
              "id": 1
            },
            "posts": {
              "rule": "repeated",
              "type": "Post",
              "id": 2
            }
          }
        },
        "UserLikesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserLikesRsp": {
          "fields": {
            "posts": {
              "rule": "repeated",
              "type": "Post",
              "id": 1
            },
            "comments": {
              "rule": "repeated",
              "type": "CommentRef",
              "id": 2
            },
            "videos": {
              "rule": "repeated",
              "type": "VideoRef",
              "id": 3
            }
          }
        },
        "User": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "userId": {
              "type": "int64",
              "id": 2
            },
            "appUserId": {
              "type": "string",
              "id": 3
            },
            "username": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            }
          }
        },
        "UserFollowersReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserFollowersRsp": {
          "fields": {
            "followers": {
              "rule": "repeated",
              "type": "User",
              "id": 1
            }
          }
        },
        "UserFolloweesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserFolloweesRsp": {
          "fields": {
            "followees": {
              "rule": "repeated",
              "type": "User",
              "id": 1
            }
          }
        },
        "UserFavoritesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserFavoritesRsp": {
          "fields": {
            "posts": {
              "rule": "repeated",
              "type": "Post",
              "id": 1
            }
          }
        },
        "UserParticipatesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserParticipatesRsp": {
          "fields": {
            "topics": {
              "rule": "repeated",
              "type": "Topic",
              "id": 1
            }
          }
        },
        "UserBallotsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserBallotsRsp": {
          "fields": {
            "ballots": {
              "rule": "repeated",
              "type": "BallotRef",
              "id": 1
            }
          }
        },
        "UserFilesReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserFilesRsp": {
          "fields": {
            "videos": {
              "rule": "repeated",
              "type": "Video",
              "id": 1
            },
            "images": {
              "rule": "repeated",
              "type": "Image",
              "id": 2
            },
            "audios": {
              "rule": "repeated",
              "type": "Audio",
              "id": 3
            }
          }
        },
        "UserAwardsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "count": {
              "type": "int64",
              "id": 2
            },
            "userId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "UserAwardsRsp": {
          "fields": {}
        },
        "UserInfoReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "UserInfoRsp": {
          "fields": {
            "like": {
              "type": "string",
              "id": 1
            },
            "follow": {
              "type": "string",
              "id": 2
            },
            "follower": {
              "type": "string",
              "id": 3
            }
          }
        },
        "TestMessage": {
          "fields": {
            "content": {
              "type": "string",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_customer_service": {
      "nested": {
        "MESSAGE_TYPE": {
          "values": {
            "TEXT": 0,
            "IMAGE": 1,
            "AUDIO": 2,
            "VIDEO": 3,
            "PACT": 4,
            "GET_RED_PACKET": 5,
            "RED_PACKET": 6,
            "RED_PACKET_OPENED": 7,
            "CAT_CARD": 8,
            "PRODUCT_CARD": 9,
            "PHONE_CALL": 10,
            "GREETING": 11
          }
        },
        "USER_TYPE": {
          "values": {
            "KEHU": 0,
            "KEFU": 1
          }
        },
        "KefuMessage": {
          "fields": {
            "userType": {
              "type": "USER_TYPE",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "messageType": {
              "type": "int32",
              "id": 3
            },
            "text": {
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
        "STATE": {
          "values": {
            "INIT": 0,
            "SEND": 1,
            "RECV": 2,
            "READ": 3,
            "OVER": 4
          }
        },
        "KefuReceipt": {
          "fields": {
            "userType": {
              "type": "USER_TYPE",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "sn": {
              "type": "int64",
              "id": 3
            },
            "state": {
              "type": "STATE",
              "id": 4
            },
            "time": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "AnswerReq": {
          "fields": {
            "kehuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "AnswerRsp": {
          "fields": {}
        },
        "FetchWaitCustomers": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "WaitCustomer": {
          "fields": {
            "kehuId": {
              "type": "int64",
              "id": 1
            },
            "joinAt": {
              "type": "int64",
              "id": 2
            },
            "kefuId": {
              "type": "int64",
              "id": 3
            },
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 4
            },
            "message": {
              "type": "KefuMessage",
              "id": 5
            }
          }
        },
        "WaitCustomers": {
          "fields": {
            "customers": {
              "rule": "repeated",
              "type": "WaitCustomer",
              "id": 2
            }
          }
        },
        "HistoriesReq": {
          "fields": {
            "kehuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "History": {
          "fields": {
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 1
            },
            "message": {
              "type": "KefuMessage",
              "id": 2
            },
            "state": {
              "type": "STATE",
              "id": 3
            }
          }
        },
        "HistoriesRsp": {
          "fields": {
            "histories": {
              "rule": "repeated",
              "type": "History",
              "id": 1
            }
          }
        },
        "SessionsReq": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "time": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "Session": {
          "fields": {
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 1
            },
            "message": {
              "type": "KefuMessage",
              "id": 2
            }
          }
        },
        "SessionsRsp": {
          "fields": {
            "sessions": {
              "rule": "repeated",
              "type": "Session",
              "id": 1
            }
          }
        },
        "DeleteSessionReq": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "kehuId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteSessionRsp": {
          "fields": {}
        },
        "Kefu": {
          "fields": {
            "kefuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "kefuName": {
              "type": "string",
              "id": 3
            },
            "phone": {
              "type": "string",
              "id": 4
            },
            "online": {
              "type": "bool",
              "id": 5
            }
          }
        },
        "AddKefuReq": {
          "fields": {
            "kefuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "kefuName": {
              "type": "string",
              "id": 3
            },
            "phone": {
              "type": "string",
              "id": 4
            },
            "online": {
              "type": "bool",
              "id": 5
            },
            "appId": {
              "type": "int64",
              "id": 6
            },
            "appUserId": {
              "type": "string",
              "id": 7
            }
          }
        },
        "AddKefuRsp": {
          "fields": {}
        },
        "UpdateKefuReq": {
          "fields": {
            "kefu": {
              "type": "Kefu",
              "id": 1
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateKefuRsp": {
          "fields": {
            "kefu": {
              "type": "Kefu",
              "id": 1
            }
          }
        },
        "DeleteKefuReq": {
          "fields": {
            "kefuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "DeleteKefuRsp": {
          "fields": {}
        },
        "GetKefuReq": {
          "fields": {
            "kefuId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "GetKefuRsp": {
          "fields": {
            "kefu": {
              "type": "Kefu",
              "id": 1
            }
          }
        },
        "GetKefusReq": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GetKefusRsp": {
          "fields": {
            "kefus": {
              "rule": "repeated",
              "type": "Kefu",
              "id": 1
            }
          }
        },
        "GetKefuRolesReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GetKefuRolesRsp": {
          "fields": {
            "roles": {
              "rule": "repeated",
              "type": "Kefu",
              "id": 1
            }
          }
        },
        "KefuGroup": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "avatar": {
              "type": "string",
              "id": 4
            }
          }
        },
        "AddKefuGroupReq": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            }
          }
        },
        "AddKefuGroupRsp": {
          "fields": {
            "kefuGroup": {
              "type": "KefuGroup",
              "id": 1
            }
          }
        },
        "UpdateKefuGroupReq": {
          "fields": {
            "kefuGroup": {
              "type": "KefuGroup",
              "id": 1
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateKefuGroupRsp": {
          "fields": {
            "kefuGroup": {
              "type": "KefuGroup",
              "id": 1
            }
          }
        },
        "DeleteKefuGroupReq": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "DeleteKefuGroupRsp": {
          "fields": {}
        },
        "GetKefuGroupReq": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GetKefuGroupRsp": {
          "fields": {
            "kefuGroup": {
              "type": "KefuGroup",
              "id": 1
            }
          }
        },
        "GetKefuGroupsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "length": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "GetKefuGroupsRsp": {
          "fields": {
            "groups": {
              "rule": "repeated",
              "type": "KefuGroup",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_followship": {
      "nested": {
        "FollowReq": {
          "fields": {}
        },
        "FollowRsp": {
          "fields": {}
        },
        "UnfollowReq": {
          "fields": {}
        },
        "UnfollowRsp": {
          "fields": {}
        },
        "Follower": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            }
          }
        },
        "FollowersReq": {
          "fields": {}
        },
        "FollowersRsp": {
          "fields": {
            "followers": {
              "rule": "repeated",
              "type": "Follower",
              "id": 1
            }
          }
        },
        "Followee": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            }
          }
        },
        "FolloweesReq": {
          "fields": {}
        },
        "FolloweesRsp": {
          "fields": {
            "followees": {
              "rule": "repeated",
              "type": "Followee",
              "id": 1
            }
          }
        }
      }
    },
    "pb_msg_friend": {
      "nested": {
        "ApplyReq": {
          "fields": {
            "msg": {
              "type": "string",
              "id": 1
            }
          }
        },
        "ApplyRsp": {
          "fields": {}
        },
        "ApplyAnswerReq": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "ApplyAnswerRsp": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "FRIEND_APPLY_STATE": {
          "values": {
            "Init": 0,
            "Request": 1,
            "Agree": 2,
            "Reject": 3,
            "OverTime": 4
          }
        },
        "Application": {
          "fields": {
            "applicantId": {
              "type": "int64",
              "id": 1
            },
            "respondentId": {
              "type": "int64",
              "id": 2
            },
            "status": {
              "type": "int32",
              "id": 3
            },
            "msg": {
              "type": "string",
              "id": 4
            },
            "createAt": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "ApplicationsReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ApplicationsRsp": {
          "fields": {
            "applications": {
              "rule": "repeated",
              "type": "Application",
              "id": 1
            },
            "page": {
              "type": "int64",
              "id": 2
            },
            "pageSize": {
              "type": "int64",
              "id": 3
            },
            "totalCount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "Friend": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "username": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            },
            "name": {
              "type": "string",
              "id": 4
            },
            "remark": {
              "type": "string",
              "id": 5
            },
            "mobile": {
              "type": "string",
              "id": 6
            },
            "description": {
              "type": "string",
              "id": 7
            },
            "card": {
              "type": "string",
              "id": 8
            },
            "sign": {
              "type": "string",
              "id": 9
            },
            "tags": {
              "type": "string",
              "id": 10
            },
            "blocked": {
              "type": "bool",
              "id": 11
            },
            "stared": {
              "type": "bool",
              "id": 12
            },
            "deleted": {
              "type": "bool",
              "id": 13
            },
            "background": {
              "type": "string",
              "id": 14
            },
            "source": {
              "type": "int32",
              "id": 15
            },
            "top": {
              "type": "bool",
              "id": 16
            }
          }
        },
        "FriendsReq": {
          "fields": {}
        },
        "FriendsRsp": {
          "fields": {
            "friends": {
              "rule": "repeated",
              "type": "Friend",
              "id": 1
            }
          }
        },
        "FriendDetailReq": {
          "fields": {}
        },
        "FriendDetailRsp": {
          "fields": {
            "friend": {
              "type": "Friend",
              "id": 1
            }
          }
        },
        "DeleteFriendReq": {
          "fields": {}
        },
        "DeleteFriendRsp": {
          "fields": {}
        },
        "UpdateFriendReq": {
          "fields": {
            "friend": {
              "type": "Friend",
              "id": 1
            },
            "keys": {
              "rule": "repeated",
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateFriendRsp": {
          "fields": {}
        },
        "GmMakeFriendRelationReq": {
          "fields": {
            "userId1": {
              "type": "int64",
              "id": 1
            },
            "userId2": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "GmMakeFriendRelationRsp": {
          "fields": {
            "userId1": {
              "type": "int64",
              "id": 1
            },
            "userId2": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "IsFriendReq": {
          "fields": {
            "userId1": {
              "type": "int64",
              "id": 1
            },
            "userId2": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "EnIsInBlackListStatus": {
          "values": {
            "NotInBlackList": 0,
            "InMyBlackList": 1,
            "InFriendBlackList": 2
          }
        },
        "IsFriendRsp": {
          "fields": {
            "IsFriend": {
              "type": "bool",
              "id": 1
            },
            "IsBlocked": {
              "type": "bool",
              "id": 2
            },
            "isInBlackListStatus": {
              "type": "EnIsInBlackListStatus",
              "id": 3
            }
          }
        },
        "ReadBlackListReq": {
          "fields": {}
        },
        "ReadBlackListRsp": {
          "fields": {
            "blackUserId": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "IsInBlackListReq": {
          "fields": {}
        },
        "IsInBlackListRsp": {
          "fields": {
            "isInBlackListStatus": {
              "type": "EnIsInBlackListStatus",
              "id": 2
            }
          }
        }
      }
    },
    "pb_msg_game_scene": {
      "nested": {
        "GAME_STATE": {
          "values": {
            "IDLING": 0,
            "WAITING": 1,
            "GAMING": 2
          }
        },
        "GamePlayer": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GameInfo": {
          "fields": {
            "state": {
              "type": "GAME_STATE",
              "id": 1
            },
            "inviter": {
              "type": "GamePlayer",
              "id": 2
            },
            "invitee": {
              "type": "GamePlayer",
              "id": 3
            },
            "gameType": {
              "type": "int32",
              "id": 4
            },
            "inviteAt": {
              "type": "int64",
              "id": 5
            },
            "answerAt": {
              "type": "int64",
              "id": 6
            },
            "exps": {
              "keyType": "string",
              "type": "string",
              "id": 7
            }
          }
        },
        "GameInviteReq": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeId": {
              "type": "int64",
              "id": 2
            },
            "gameType": {
              "type": "int32",
              "id": 3
            },
            "exps": {
              "keyType": "string",
              "type": "string",
              "id": 4
            }
          }
        },
        "GameInviteRsp": {
          "fields": {}
        },
        "GameDisinviteReq": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "GameDisinviteRsp": {
          "fields": {}
        },
        "GAME_ANSWER_TYPE": {
          "values": {
            "REFUSE": 0,
            "BUZY": 1,
            "AGREE": 2,
            "NOT_SUPPORT": 3
          }
        },
        "GameAnswerReq": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeId": {
              "type": "int64",
              "id": 2
            },
            "answer": {
              "type": "GAME_ANSWER_TYPE",
              "id": 3
            }
          }
        },
        "GameAnswerRsp": {
          "fields": {}
        },
        "GameStartNotify": {
          "fields": {
            "gameInfo": {
              "type": "GameInfo",
              "id": 1
            }
          }
        },
        "GAME_OVER_REASON": {
          "values": {
            "INVITER_CLOSED": 0,
            "INVITER_DISINVITED": 1,
            "INVITER_HEARTBEAT_TIMEOUT": 2,
            "INVITEE_CLOSED": 10,
            "INVITEE_BUZY": 11,
            "INVITEE_REFUSED": 12,
            "INVITEE_NOT_ANSWER": 13,
            "INVITEE_HEARTBEAT_TIMEOUT": 14,
            "INVITEE_CLIENT_NOT_SUPPORT": 15,
            "CHARGE_FAILURE": 20
          }
        },
        "GameOverNotify": {
          "fields": {
            "reason": {
              "type": "GAME_OVER_REASON",
              "id": 1
            }
          }
        },
        "GameOverReq": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "GameOverRsp": {
          "fields": {}
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
            },
            "version": {
              "type": "int32",
              "id": 7
            },
            "deviceToken": {
              "type": "string",
              "id": 8
            },
            "forceLogin": {
              "type": "bool",
              "id": 9
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
            },
            "pushPlatformAppId": {
              "type": "string",
              "id": 9
            },
            "odid": {
              "type": "string",
              "id": 10
            },
            "aaid": {
              "type": "string",
              "id": 11
            },
            "token": {
              "type": "string",
              "id": 12
            },
            "expired": {
              "type": "int64",
              "id": 13
            }
          }
        },
        "LoginRsp": {
          "fields": {
            "result": {
              "type": "int32",
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
            "appUserIdOld": {
              "type": "int64",
              "id": 6
            },
            "appId": {
              "type": "int64",
              "id": 7
            },
            "appUserId": {
              "type": "string",
              "id": 8
            },
            "deviceToken": {
              "type": "string",
              "id": 9
            },
            "otherClientInfo": {
              "type": "ClientInfo",
              "id": 10
            },
            "reason": {
              "type": "string",
              "id": 11
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
            },
            "aimUserAppId": {
              "type": "int64",
              "id": 7
            },
            "aimUserAppUserId": {
              "type": "string",
              "id": 8
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
            },
            "otherClientInfo": {
              "type": "ClientInfo",
              "id": 10
            }
          }
        },
        "RemoveUserFromGateRoomReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            }
          }
        }
      }
    },
    "pb_msg_group": {
      "nested": {
        "GroupType": {
          "values": {
            "Comm": 0,
            "ChatRoom": 1,
            "Channel": 2,
            "SystemNotice": 3
          }
        },
        "CreateGroupReq": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            },
            "memberIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            },
            "memberCountLimit": {
              "type": "int32",
              "id": 4
            },
            "groupType": {
              "type": "GroupType",
              "id": 5
            }
          }
        },
        "CreateGroupRsp": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "memberCountLimit": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "CreateGroupNotify": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            }
          }
        },
        "InviteReq": {
          "fields": {
            "inviteeIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            },
            "shareMsgCount": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "InviteRsp": {
          "fields": {}
        },
        "InviteAnswerReq": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "InviteAnswerRsp": {
          "fields": {}
        },
        "InviteeAgreedNotify": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeId": {
              "type": "int64",
              "id": 2
            },
            "memberCount": {
              "type": "int32",
              "id": 3
            }
          }
        },
        "InviteesAgreedNotify": {
          "fields": {
            "inviterId": {
              "type": "int64",
              "id": 1
            },
            "inviteeIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            },
            "inviteeNames": {
              "rule": "repeated",
              "type": "string",
              "id": 3
            },
            "memberCount": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "ApplyReq": {
          "fields": {
            "scanCodeKey": {
              "type": "string",
              "id": 1
            }
          }
        },
        "ApplyRspStatus": {
          "values": {
            "WaitConfirm": 0,
            "SuccessAddedToGroup": 1
          }
        },
        "ApplyRsp": {
          "fields": {
            "scanCodeKey": {
              "type": "string",
              "id": 1
            },
            "applyStatus": {
              "type": "ApplyRspStatus",
              "id": 2
            }
          }
        },
        "ApplyAnswerReq": {
          "fields": {
            "agree": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "ApplyAnswerRsp": {
          "fields": {}
        },
        "EnterGroupType": {
          "values": {
            "Create": 0,
            "Apply": 1,
            "Invite": 2,
            "ScanCode": 3
          }
        },
        "approverApprovedNotify": {
          "fields": {
            "applicantId": {
              "type": "int64",
              "id": 1
            },
            "approverId": {
              "type": "int64",
              "id": 2
            },
            "enterGroutType": {
              "type": "EnterGroupType",
              "id": 3
            },
            "memberCount": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "Group": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "avatar": {
              "type": "string",
              "id": 3
            },
            "top": {
              "type": "bool",
              "id": 4
            },
            "newMemberRemindClosed": {
              "type": "bool",
              "id": 5
            },
            "groupType": {
              "type": "GroupType",
              "id": 6
            }
          }
        },
        "GroupsReq": {
          "fields": {}
        },
        "GroupsRsp": {
          "fields": {
            "groups": {
              "rule": "repeated",
              "type": "Group",
              "id": 1
            }
          }
        },
        "GroupIdsReq": {
          "fields": {}
        },
        "GroupIdsRsp": {
          "fields": {
            "ids": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "GroupDetailReq": {
          "fields": {}
        },
        "GroupDetailRsp": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "name": {
              "type": "string",
              "id": 2
            },
            "disbanded": {
              "type": "bool",
              "id": 3
            },
            "banned": {
              "type": "bool",
              "id": 4
            },
            "memberCount": {
              "type": "int32",
              "id": 5
            },
            "notice": {
              "type": "string",
              "id": 6
            },
            "ownerId": {
              "type": "int64",
              "id": 7
            },
            "avatar": {
              "type": "string",
              "id": 8
            },
            "bgPic": {
              "type": "string",
              "id": 9
            },
            "memberCountLimit": {
              "type": "int32",
              "id": 11
            },
            "inviteRoleLimit": {
              "type": "int32",
              "id": 12
            },
            "top": {
              "type": "bool",
              "id": 13
            },
            "remark": {
              "type": "string",
              "id": 14
            },
            "memberChatBannedStatus": {
              "type": "int32",
              "id": 15
            },
            "newMemberRemindClosed": {
              "type": "bool",
              "id": 16
            },
            "ScanCodeJoinGroupSwitchStatus": {
              "type": "bool",
              "id": 17
            },
            "ScanCodeJoinGroupParam": {
              "type": "string",
              "id": 18
            },
            "noticeVersion": {
              "type": "int32",
              "id": 19
            },
            "freeJoin": {
              "type": "bool",
              "id": 20
            },
            "groupType": {
              "type": "GroupType",
              "id": 21
            },
            "forbiddenAddFriendsToEachOther": {
              "type": "bool",
              "id": 22
            }
          }
        },
        "Member": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "username": {
              "type": "string",
              "id": 3
            },
            "remark": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            },
            "role": {
              "type": "int32",
              "id": 6
            },
            "banned": {
              "type": "bool",
              "id": 7
            }
          }
        },
        "MembersReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "MembersRsp": {
          "fields": {
            "members": {
              "rule": "repeated",
              "type": "Member",
              "id": 1
            },
            "page": {
              "type": "int32",
              "id": 2
            },
            "pageSize": {
              "type": "int32",
              "id": 3
            },
            "totalCount": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "FindMembersReq": {
          "fields": {
            "findString": {
              "type": "string",
              "id": 1
            }
          }
        },
        "FindMembersRsp": {
          "fields": {
            "members": {
              "rule": "repeated",
              "type": "Member",
              "id": 1
            }
          }
        },
        "MemberDetailReq": {
          "fields": {}
        },
        "MemberDetailRsp": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "username": {
              "type": "string",
              "id": 3
            },
            "remark": {
              "type": "string",
              "id": 4
            },
            "avatar": {
              "type": "string",
              "id": 5
            },
            "banned": {
              "type": "bool",
              "id": 6
            },
            "role": {
              "type": "int32",
              "id": 7
            }
          }
        },
        "Application": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "approverId": {
              "type": "int64",
              "id": 3
            },
            "status": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "ApplicationsReq": {
          "fields": {}
        },
        "ApplicationsRsp": {
          "fields": {
            "applications": {
              "rule": "repeated",
              "type": "Application",
              "id": 1
            }
          }
        },
        "Invitation": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "inviterId": {
              "type": "int64",
              "id": 2
            },
            "inviteeId": {
              "type": "int64",
              "id": 3
            },
            "status": {
              "type": "int32",
              "id": 4
            }
          }
        },
        "InvitationsReq": {
          "fields": {}
        },
        "InvitationsRsp": {
          "fields": {
            "invitations": {
              "rule": "repeated",
              "type": "Invitation",
              "id": 1
            }
          }
        },
        "EditNameReq": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditNameRsp": {
          "fields": {}
        },
        "NameChangeNotify": {
          "fields": {
            "name": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditAvatarReq": {
          "fields": {
            "avatar": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditAvatarRsp": {
          "fields": {}
        },
        "AvatarChangeNotify": {
          "fields": {
            "avatar": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditInviteRoleLimitReq": {
          "fields": {
            "roleLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "EditInviteRoleLimitRsp": {
          "fields": {
            "roleLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "InviteRoleLimitChangeNotify": {
          "fields": {
            "roleLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "EditNoticeReq": {
          "fields": {
            "notice": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditNoticeRsp": {
          "fields": {}
        },
        "NoticeChangeNotify": {
          "fields": {
            "notice": {
              "type": "string",
              "id": 1
            },
            "noticeVersion": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "EditRemarkReq": {
          "fields": {
            "remark": {
              "type": "string",
              "id": 1
            },
            "editedUserId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "EditRemarkRsp": {
          "fields": {
            "remark": {
              "type": "string",
              "id": 1
            },
            "editedUserId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "RemarkChangeNotify": {
          "fields": {
            "remark": {
              "type": "string",
              "id": 1
            },
            "editedUserId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "EditBGPicReq": {
          "fields": {
            "bgPic": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditBGPicRsp": {
          "fields": {
            "bgPic": {
              "type": "string",
              "id": 1
            }
          }
        },
        "BGPicChangeNotify": {
          "fields": {
            "bgPic": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditNeedReceiptReq": {
          "fields": {
            "needReceipt": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "EditNeedReceiptRsp": {
          "fields": {
            "needReceipt": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "NeedReceiptChangeNotify": {
          "fields": {
            "needReceipt": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "EditMemberCountLimitReq": {
          "fields": {
            "memberCountLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "EditMemberCountLimitRsp": {
          "fields": {
            "memberCountLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "MemberCountLimitChangeNotify": {
          "fields": {
            "memberCountLimit": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "AddAdminsReq": {
          "fields": {
            "memberIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "AddAdminsRsp": {
          "fields": {}
        },
        "AddAdminsNotify": {
          "fields": {
            "memberIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "RemoveAdminsReq": {
          "fields": {
            "memberIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "RemoveAdminsRsp": {
          "fields": {}
        },
        "RemoveAdminsNotify": {
          "fields": {
            "memberIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "GroupTransferReq": {
          "fields": {}
        },
        "GroupTransferRsp": {
          "fields": {}
        },
        "GroupTransferNotify": {
          "fields": {
            "ownerId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "BanGroupsReq": {
          "fields": {
            "groupIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "BanGroupsRsp": {
          "fields": {}
        },
        "GroupBannedNotify": {
          "fields": {}
        },
        "UnbanGroupsReq": {
          "fields": {
            "groupIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "UnbanGroupsRsp": {
          "fields": {}
        },
        "GroupUnbannedNotify": {
          "fields": {}
        },
        "DisbandGroupsReq": {
          "fields": {
            "groupIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "DisbandGroupsRsp": {
          "fields": {}
        },
        "GroupDisbandedNotify": {
          "fields": {}
        },
        "QuitReq": {
          "fields": {}
        },
        "QuitRsp": {
          "fields": {}
        },
        "QuitNotify": {
          "fields": {
            "memberId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "BanMemberReq": {
          "fields": {}
        },
        "BanMemberRsp": {
          "fields": {}
        },
        "BanMemberNotify": {
          "fields": {
            "memberId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "UnbanMemberReq": {
          "fields": {}
        },
        "UnbanMemberRsp": {
          "fields": {}
        },
        "UnbanMemberNotify": {
          "fields": {
            "memberId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "KickoutReq": {
          "fields": {}
        },
        "KickoutRsp": {
          "fields": {}
        },
        "KickoutNotify": {
          "fields": {
            "memberId": {
              "type": "int64",
              "id": 1
            },
            "memberCount": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "GroupHistoryMsgReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "filterNew": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "GroupHistoryMsgRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "pbHisMsg": {
              "rule": "repeated",
              "type": "GroupHistoryMsg",
              "id": 4
            }
          }
        },
        "OneGroupHistoryMsgReq": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "msgSn": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "OneGroupHistoryMsgRsp": {
          "fields": {
            "groupHistoryMsg": {
              "type": "GroupHistoryMsg",
              "id": 1
            }
          }
        },
        "DelGroupHistoryMsgReq": {
          "fields": {
            "id": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            },
            "msgSn": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            }
          }
        },
        "DelGroupHistoryMsgRsp": {
          "fields": {}
        },
        "ReadUserInfo": {
          "fields": {
            "readerUserId": {
              "type": "int64",
              "id": 1
            },
            "readStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 2
            },
            "upDateAt": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "GroupMsgReadListReq": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GroupMsgReadListRsp": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "readUserInfo": {
              "rule": "repeated",
              "type": "ReadUserInfo",
              "id": 2
            }
          }
        },
        "GroupChat": {
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
            },
            "aimUserAppId": {
              "type": "int64",
              "id": 7
            },
            "aimUserAppUserId": {
              "type": "string",
              "id": 8
            }
          }
        },
        "GroupEmoticon": {
          "fields": {
            "packageId": {
              "type": "int32",
              "id": 1
            },
            "emoticonId": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "GroupMedia": {
          "fields": {
            "mediaType": {
              "type": "int32",
              "id": 1
            },
            "srcPath": {
              "type": "string",
              "id": 2
            }
          }
        },
        "GroupGift": {
          "fields": {
            "giftId": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "BigGroupHisMsg": {
          "fields": {
            "msgId": {
              "type": "int64",
              "id": 1
            },
            "groupId": {
              "type": "int64",
              "id": 2
            },
            "msgSn": {
              "type": "int64",
              "id": 3
            },
            "srcId": {
              "type": "int64",
              "id": 4
            },
            "createdAt": {
              "type": "int64",
              "id": 7
            },
            "atList": {
              "rule": "repeated",
              "type": "int64",
              "id": 8
            },
            "pbName": {
              "type": "string",
              "id": 5
            },
            "pbData": {
              "type": "bytes",
              "id": 6
            }
          }
        },
        "UserReadStatus": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "readStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 2
            }
          }
        },
        "GroupHistoryMsg": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "groupMsgSn": {
              "type": "int64",
              "id": 2
            },
            "msgSn": {
              "type": "int64",
              "id": 3
            },
            "srcId": {
              "type": "int64",
              "id": 4
            },
            "pbName": {
              "type": "string",
              "id": 5
            },
            "pbData": {
              "type": "bytes",
              "id": 6
            },
            "msgStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 7
            },
            "atUserReadStatus": {
              "rule": "repeated",
              "type": "UserReadStatus",
              "id": 8
            },
            "createdAt": {
              "type": "int64",
              "id": 9
            },
            "updatedAt": {
              "type": "int64",
              "id": 10
            },
            "pbCommData": {
              "type": "bytes",
              "id": 11
            }
          }
        },
        "ReadyForGroupsNewMsgInfoReq": {
          "fields": {}
        },
        "ReadyForGroupsNewMsgInfoRsp": {
          "fields": {}
        },
        "UserGroupsNewMsgInfo": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            },
            "newMsgCount": {
              "type": "int32",
              "id": 2
            },
            "lastHisMsg": {
              "type": "GroupHistoryMsg",
              "id": 3
            }
          }
        },
        "GroupsNewMsgInfoNotify": {
          "fields": {
            "infoItem": {
              "rule": "repeated",
              "type": "UserGroupsNewMsgInfo",
              "id": 4
            }
          }
        },
        "FetchGroupHistoryMsgReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "startCreatedAt": {
              "type": "int64",
              "id": 3
            },
            "endCreatedAt": {
              "type": "int64",
              "id": 4
            },
            "startUpdatedAt": {
              "type": "int64",
              "id": 5
            },
            "endUpdatedAt": {
              "type": "int64",
              "id": 6
            },
            "msgSn": {
              "type": "int64",
              "id": 7
            },
            "groupId": {
              "type": "int64",
              "id": 8
            },
            "msgStatus": {
              "type": "int32",
              "id": 9
            },
            "srcId": {
              "type": "int64",
              "id": 10
            },
            "pbName": {
              "type": "string",
              "id": 11
            }
          }
        },
        "FetchGroupHistoryMsgRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "total": {
              "type": "int64",
              "id": 3
            },
            "pbHisMsg": {
              "rule": "repeated",
              "type": "GroupHistoryMsg",
              "id": 4
            }
          }
        },
        "FetchGroupHistoryMsgFromGroupMsgSnReq": {
          "fields": {
            "startGroupMsgSn": {
              "type": "int64",
              "id": 1
            },
            "wantCount": {
              "type": "int64",
              "id": 2
            },
            "orderDesc": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "FetchGroupHistoryMsgFromGroupMsgSnRsp": {
          "fields": {
            "startGroupMsgSn": {
              "type": "int64",
              "id": 1
            },
            "wantCount": {
              "type": "int64",
              "id": 2
            },
            "orderDesc": {
              "type": "bool",
              "id": 3
            },
            "pbHisMsg": {
              "rule": "repeated",
              "type": "GroupHistoryMsg",
              "id": 4
            }
          }
        },
        "GroupTopSetReq": {
          "fields": {
            "top": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "GroupTopSetRsp": {
          "fields": {
            "top": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "EditGroupRemarkReq": {
          "fields": {
            "remark": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditGroupRemarkRsp": {
          "fields": {
            "remark": {
              "type": "string",
              "id": 1
            }
          }
        },
        "EditMemberRemarkReq": {
          "fields": {
            "remarkedUserId": {
              "type": "int64",
              "id": 1
            },
            "remark": {
              "type": "string",
              "id": 2
            }
          }
        },
        "EditMemberRemarkRsp": {
          "fields": {
            "remarkedUserId": {
              "type": "int64",
              "id": 1
            },
            "remark": {
              "type": "string",
              "id": 2
            }
          }
        },
        "IsGroupMemberReq": {
          "fields": {}
        },
        "IsGroupMemberRsp": {
          "fields": {
            "IsGroupMember": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "StatusChangeItem": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "msgCurStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 2
            }
          }
        },
        "GroupOfflineMsgStatusChangeNotify": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            },
            "StatusChangeItems": {
              "rule": "repeated",
              "type": "StatusChangeItem",
              "id": 2
            }
          }
        },
        "GroupOfflineMsgStatusChangeNotifyReceived": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "SetMemberChatBannedStatusReq": {
          "fields": {
            "bannedStatus": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "SetMemberChatBannedStatusRsp": {
          "fields": {
            "bannedStatus": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "SetNewMemberRemindReq": {
          "fields": {
            "newMemberRemindClosed": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "SetNewMemberRemindRsp": {
          "fields": {
            "newMemberRemindClosed": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "MemberChatBannedStatusChangeNotify": {
          "fields": {
            "bannedStatus": {
              "type": "int32",
              "id": 1
            }
          }
        },
        "SetScanCodeJoinGroupSwitchReq": {
          "fields": {
            "switchStatus": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "SetScanCodeJoinGroupSwitchRsp": {
          "fields": {
            "switchStatus": {
              "type": "bool",
              "id": 1
            },
            "scanCodeKey": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ScanCodeJoinGroupSwitchStatusChangeNotify": {
          "fields": {
            "switchStatus": {
              "type": "bool",
              "id": 1
            },
            "scanCodeKey": {
              "type": "string",
              "id": 2
            }
          }
        },
        "ClearHisMsgReq": {
          "fields": {}
        },
        "ClearHisMsgRsp": {
          "fields": {}
        },
        "SetFreeJoinStatusReq": {
          "fields": {
            "freeJoinStatus": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "SetFreeJoinStatusRsp": {
          "fields": {
            "freeJoinStatus": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "FreeJoinStatusChangeNotify": {
          "fields": {
            "freeJoinStatus": {
              "type": "bool",
              "id": 1
            }
          }
        },
        "SetGroupPropReq": {
          "fields": {
            "key": {
              "type": "string",
              "id": 1
            },
            "value": {
              "type": "string",
              "id": 2
            }
          }
        },
        "GroupPropChangeNotify": {
          "fields": {
            "key": {
              "type": "string",
              "id": 1
            },
            "value": {
              "type": "string",
              "id": 2
            }
          }
        }
      }
    },
    "pb_msg_groups": {
      "nested": {
        "CreateGroupReq": {
          "fields": {}
        },
        "CreateGroupRsp": {
          "fields": {
            "groupId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "DeleteGroupReq": {
          "fields": {}
        },
        "DeleteGroupRsp": {
          "fields": {}
        },
        "AddMemberReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "AddMemberRsp": {
          "fields": {}
        },
        "RemoveMemberReq": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "RemoveMemberRsp": {
          "fields": {}
        },
        "UpdateMemberReq": {
          "fields": {
            "online": {
              "type": "bool",
              "id": 1
            },
            "addr": {
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateMemberRsp": {
          "fields": {}
        },
        "UpdateUserReq": {
          "fields": {
            "online": {
              "type": "bool",
              "id": 1
            },
            "addr": {
              "type": "string",
              "id": 2
            }
          }
        },
        "UpdateUserRsp": {
          "fields": {}
        },
        "GroupMembersReq": {
          "fields": {}
        },
        "GroupMembersRsp": {
          "fields": {
            "members": {
              "rule": "repeated",
              "type": "int64",
              "id": 1
            }
          }
        },
        "MemberGroupsReq": {
          "fields": {}
        },
        "MemberGroupsRsp": {
          "fields": {
            "groups": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            }
          }
        },
        "GroupMessageReq": {
          "fields": {
            "pbName": {
              "type": "string",
              "id": 1
            },
            "pbData": {
              "type": "bytes",
              "id": 2
            }
          }
        },
        "GroupMessageRsp": {
          "fields": {}
        },
        "Member": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "client": {
              "type": "pb_pub.CLIENT_TYPE",
              "id": 2
            },
            "online": {
              "type": "bool",
              "id": 3
            },
            "addr": {
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
            },
            "roomId": {
              "type": "int64",
              "id": 3
            },
            "partyType": {
              "type": "PartyType",
              "id": 4
            },
            "roomTheme": {
              "type": "RoomTheme",
              "id": 5
            }
          }
        },
        "PartyType": {
          "values": {
            "Six": 0,
            "Eight": 1
          }
        },
        "RoomTheme": {
          "values": {
            "UNKNOWN_THEME": 0,
            "BLIND_DATE": 2,
            "SONG_TABLE": 3,
            "RADIO": 4,
            "GAME": 5
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
          "fields": {
            "reason": {
              "type": "string",
              "id": 1
            }
          }
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
            },
            "partyType": {
              "type": "PartyType",
              "id": 48
            },
            "roomTheme": {
              "type": "RoomTheme",
              "id": 49
            },
            "FansTop1Status": {
              "type": "bool",
              "id": 50
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
            },
            "vipGrade": {
              "type": "int32",
              "id": 17
            },
            "vipMedalUrl": {
              "type": "string",
              "id": 18
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
            },
            "horseEffectMp4Android": {
              "type": "string",
              "id": 8
            },
            "horseEffectMp4Ios": {
              "type": "string",
              "id": 9
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
            },
            "horseEffectMp4Android": {
              "type": "string",
              "id": 5
            },
            "horseEffectMp4Ios": {
              "type": "string",
              "id": 6
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
            },
            "jumpEnabled": {
              "type": "bool",
              "id": 6
            },
            "jumpRoomId": {
              "type": "int64",
              "id": 7
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
            },
            "vipGrade": {
              "type": "int32",
              "id": 12
            },
            "vipMedalUrl": {
              "type": "string",
              "id": 13
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
        "Top1ChangeNotify": {
          "fields": {
            "roomType": {
              "type": "RoomType",
              "id": 1
            },
            "roomId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "SetRoomFansTop1StatusNotify": {
          "fields": {
            "top1Status": {
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
            },
            "timestamp": {
              "type": "int64",
              "id": 12
            },
            "streamId": {
              "type": "string",
              "id": 13
            },
            "streamState": {
              "type": "STREAM_STATE",
              "id": 14
            },
            "pkScore": {
              "type": "int64",
              "id": 15
            },
            "userOnAnchorPendantUrl": {
              "type": "string",
              "id": 16
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
            },
            "timestamp": {
              "type": "int64",
              "id": 3
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
                },
                "timestamp": {
                  "type": "int64",
                  "id": 3
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
        "HandDrawnGiftNotify": {
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
            "screenWidth": {
              "type": "int64",
              "id": 5
            },
            "screenHeight": {
              "type": "int64",
              "id": 6
            },
            "gifts": {
              "rule": "repeated",
              "type": "HandDrawnGift",
              "id": 7
            }
          },
          "nested": {
            "SendType": {
              "values": {
                "SINGLE": 0,
                "MULTI": 1
              }
            },
            "HandDrawnGift": {
              "fields": {
                "giftId": {
                  "type": "int32",
                  "id": 1
                },
                "path": {
                  "rule": "repeated",
                  "type": "float",
                  "id": 2
                },
                "giftConfLastUpdateTime": {
                  "type": "int64",
                  "id": 3
                }
              }
            }
          }
        },
        "StreamStateChangeNotify": {
          "fields": {
            "state": {
              "type": "STREAM_STATE",
              "id": 1
            },
            "streamId": {
              "type": "string",
              "id": 2
            }
          }
        },
        "STREAM_STATE": {
          "values": {
            "CLOSED": 0,
            "CREATED": 1
          }
        },
        "MultiPKStartReq": {
          "fields": {
            "competeDuration": {
              "type": "int64",
              "id": 1
            },
            "penalizeDuration": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "MultiPKStartRsp": {
          "fields": {}
        },
        "MultiPKStopReq": {
          "fields": {}
        },
        "MultiPKStopRsp": {
          "fields": {}
        },
        "MULTI_PK_STATE": {
          "values": {
            "IDLING": 0,
            "COMPETING": 1,
            "PENALIZING": 2
          }
        },
        "MultiPKInfo": {
          "fields": {
            "state": {
              "type": "MULTI_PK_STATE",
              "id": 1
            },
            "endTime": {
              "type": "int64",
              "id": 2
            },
            "blueScore": {
              "type": "int64",
              "id": 3
            },
            "redScore": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "MultiPKStateChangeNotify": {
          "fields": {
            "fromState": {
              "type": "MULTI_PK_STATE",
              "id": 1
            },
            "info": {
              "type": "MultiPKInfo",
              "id": 2
            }
          }
        },
        "MultiPKScoreChangeNotify": {
          "fields": {
            "actorId": {
              "type": "int64",
              "id": 1
            },
            "score": {
              "type": "int64",
              "id": 2
            },
            "blueScore": {
              "type": "int64",
              "id": 3
            },
            "redScore": {
              "type": "int64",
              "id": 4
            },
            "timestamp": {
              "type": "int64",
              "id": 5
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
            "betChipsFree": {
              "type": "int64",
              "id": 2
            },
            "betCount": {
              "type": "int64",
              "id": 3
            },
            "poolId": {
              "type": "string",
              "id": 4
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
            "BetChipsFree": {
              "type": "int64",
              "id": 3
            },
            "Chance": {
              "type": "int64",
              "id": 4
            },
            "Odds": {
              "type": "int64",
              "id": 5
            },
            "WinChips": {
              "type": "int64",
              "id": 6
            },
            "WinChipsFree": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "LuckyRsp": {
          "fields": {
            "betChips": {
              "type": "int64",
              "id": 1
            },
            "betChipsFree": {
              "type": "int64",
              "id": 2
            },
            "betCount": {
              "type": "int64",
              "id": 3
            },
            "luckyTotalCount": {
              "type": "int64",
              "id": 4
            },
            "luckyTotalChips": {
              "type": "int64",
              "id": 5
            },
            "luckyTotalChipsFree": {
              "type": "int64",
              "id": 6
            },
            "luckyBean": {
              "rule": "repeated",
              "type": "LuckyBean",
              "id": 7
            }
          }
        }
      }
    },
    "pb_msg_luxury": {
      "nested": {
        "TopAuctionBidNotify": {
          "fields": {
            "goodsId": {
              "type": "int64",
              "id": 1
            },
            "shopId": {
              "type": "int64",
              "id": 2
            },
            "topBidderId": {
              "type": "int64",
              "id": 3
            },
            "topBidPrice": {
              "type": "double",
              "id": 4
            }
          }
        },
        "AuctionBidNotify": {
          "fields": {
            "goodsId": {
              "type": "int64",
              "id": 1
            },
            "shopId": {
              "type": "int64",
              "id": 2
            },
            "buyerName": {
              "type": "string",
              "id": 3
            },
            "bidPrice": {
              "type": "double",
              "id": 4
            }
          }
        },
        "GoodsOnShelfNotify": {
          "fields": {
            "goodsId": {
              "type": "int64",
              "id": 1
            },
            "coverUrl": {
              "type": "string",
              "id": 2
            },
            "name": {
              "type": "string",
              "id": 3
            },
            "price": {
              "type": "double",
              "id": 4
            },
            "sellType": {
              "type": "int32",
              "id": 5
            },
            "openingAsk": {
              "type": "double",
              "id": 6
            },
            "bidStepSize": {
              "type": "double",
              "id": 7
            },
            "shopId": {
              "type": "int64",
              "id": 8
            }
          }
        },
        "GoodsOffShelfNotify": {
          "fields": {
            "goodsId": {
              "type": "int64",
              "id": 1
            },
            "shopId": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "BuyNotify": {
          "fields": {
            "buyerName": {
              "type": "string",
              "id": 1
            },
            "goodsName": {
              "type": "string",
              "id": 2
            },
            "shopId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "B2CPickUpPayResultNotify": {
          "fields": {
            "systemOrderId": {
              "type": "string",
              "id": 1
            },
            "success": {
              "type": "bool",
              "id": 2
            }
          }
        },
        "B2CApplyResultNotify": {
          "fields": {
            "systemOrderId": {
              "type": "string",
              "id": 1
            },
            "success": {
              "type": "bool",
              "id": 2
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
        },
        "ChatSessionsReq": {
          "fields": {
            "offset": {
              "type": "int64",
              "id": 1
            },
            "length": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChatSessionsRsp": {
          "fields": {
            "chatSessions": {
              "rule": "repeated",
              "type": "MsgHistory",
              "id": 1
            }
          }
        },
        "ChatHistoriesReq": {
          "fields": {
            "time": {
              "type": "int64",
              "id": 1
            },
            "num": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "ChatHistoriesRsp": {
          "fields": {
            "chatHistories": {
              "rule": "repeated",
              "type": "MsgHistory",
              "id": 1
            }
          }
        },
        "ChatStatsReq": {
          "fields": {
            "days": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ChatStatsRsp": {
          "fields": {
            "stats": {
              "rule": "repeated",
              "type": "ChatStats",
              "id": 1
            }
          }
        },
        "ChatStats": {
          "fields": {
            "fromTime": {
              "type": "int64",
              "id": 1
            },
            "toTime": {
              "type": "int64",
              "id": 2
            },
            "sendNum": {
              "type": "int64",
              "id": 3
            },
            "instantRecvNum": {
              "type": "int64",
              "id": 4
            },
            "offlineRecvNum": {
              "type": "int64",
              "id": 5
            },
            "notRecvNum": {
              "type": "int64",
              "id": 6
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
            },
            "GroupId": {
              "type": "int64",
              "id": 7
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
        },
        "PushTokenSyncReq": {
          "fields": {
            "DeviceCompany": {
              "type": "pb_pub.MODEL_TYPE",
              "id": 1
            },
            "PushPlatformAppId": {
              "type": "string",
              "id": 2
            },
            "Odid": {
              "type": "string",
              "id": 3
            },
            "Aaid": {
              "type": "string",
              "id": 4
            },
            "Token": {
              "type": "string",
              "id": 5
            },
            "ExpiredAt": {
              "type": "int64",
              "id": 6
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
            },
            "groupId": {
              "type": "int64",
              "id": 7
            }
          }
        },
        "ShopMemberChangeNotify": {
          "fields": {
            "shopId": {
              "type": "int64",
              "id": 1
            },
            "memberID": {
              "type": "int64",
              "id": 2
            },
            "type": {
              "type": "int32",
              "id": 3
            }
          }
        }
      }
    },
    "pb_msg_offlineMsg": {
      "nested": {
        "SaveOfflineMsgReq": {
          "fields": {
            "srcUserid": {
              "type": "int64",
              "id": 1
            },
            "aimUserid": {
              "type": "int64",
              "id": 2
            },
            "sn": {
              "type": "int64",
              "id": 3
            },
            "pbName": {
              "type": "string",
              "id": 4
            },
            "pbData": {
              "type": "bytes",
              "id": 5
            },
            "time": {
              "type": "int64",
              "id": 6
            },
            "pbCommData": {
              "type": "pb_pub.PBCommData",
              "id": 7
            },
            "relationUserIds": {
              "rule": "repeated",
              "type": "int64",
              "id": 8
            }
          }
        },
        "SaveOfflineMsgRsp": {
          "fields": {
            "result": {
              "type": "pb_pub.ErrCode",
              "id": 1
            }
          }
        },
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
                },
                "pbCommData": {
                  "type": "pb_pub.PBCommData",
                  "id": 7
                }
              }
            }
          }
        },
        "HistoryMsg": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "service": {
              "type": "pb_pub.Service",
              "id": 2
            },
            "groupId": {
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
            "aimId": {
              "type": "int64",
              "id": 6
            },
            "pbName": {
              "type": "string",
              "id": 7
            },
            "pbData": {
              "type": "bytes",
              "id": 8
            },
            "msgStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 9
            },
            "readStatus": {
              "rule": "repeated",
              "type": "ReadStatusOfDiffClients",
              "id": 10
            },
            "createdAt": {
              "type": "int64",
              "id": 11
            },
            "updateAt": {
              "type": "int64",
              "id": 12
            },
            "pbCommData": {
              "type": "bytes",
              "id": 13
            },
            "groupMsgSn": {
              "type": "int64",
              "id": 14
            },
            "Session": {
              "type": "int64",
              "id": 15
            },
            "SessionCurSn": {
              "type": "int64",
              "id": 16
            }
          }
        },
        "ReadStatusOfDiffClients": {
          "fields": {
            "clientType": {
              "type": "pb_pub.CLIENT_TYPE",
              "id": 1
            },
            "readStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 2
            },
            "upDateAt": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "FetchHistoryMsgReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "filterNew": {
              "type": "bool",
              "id": 4
            },
            "orderDesc": {
              "type": "bool",
              "id": 5
            },
            "startCreatedAt": {
              "type": "int64",
              "id": 6
            },
            "endCreatedAt": {
              "type": "int64",
              "id": 7
            },
            "startUpdatedAt": {
              "type": "int64",
              "id": 8
            },
            "endUpdatedAt": {
              "type": "int64",
              "id": 9
            },
            "id": {
              "type": "int64",
              "id": 10
            },
            "msgSn": {
              "type": "int64",
              "id": 11
            },
            "groupId": {
              "type": "int64",
              "id": 12
            },
            "srcId": {
              "type": "int64",
              "id": 13
            },
            "aimId": {
              "type": "int64",
              "id": 14
            },
            "pbName": {
              "type": "string",
              "id": 15
            },
            "msgStatus": {
              "type": "int32",
              "id": 16
            },
            "sort": {
              "type": "string",
              "id": 17
            },
            "order": {
              "type": "string",
              "id": 18
            }
          }
        },
        "FetchHistoryMsgRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "pbHisMsg": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            }
          }
        },
        "FetchNewHistoryMsgReq": {
          "fields": {
            "beginId": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "orderDesc": {
              "type": "bool",
              "id": 3
            }
          }
        },
        "FetchNewHistoryMsgRsp": {
          "fields": {
            "pageSize": {
              "type": "int64",
              "id": 1
            },
            "totalCount": {
              "type": "int64",
              "id": 2
            },
            "pbHisMsg": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 3
            }
          }
        },
        "FetchOneHistoryMsgReq": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 2
            }
          }
        },
        "FetchOneHistoryMsgRsp": {
          "fields": {
            "privateHistoryMsg": {
              "type": "HistoryMsg",
              "id": 1
            }
          }
        },
        "DelHistoryMsgReq": {
          "fields": {
            "msgSn": {
              "rule": "repeated",
              "type": "int64",
              "id": 2
            }
          }
        },
        "DelHistoryMsgRsp": {
          "fields": {}
        },
        "ReadyForSyncOfflineMsgStatusReq": {
          "fields": {}
        },
        "ReadyForSyncOfflineMsgStatusRsp": {
          "fields": {}
        },
        "StatusChangeItem": {
          "fields": {
            "msgSn": {
              "type": "int64",
              "id": 1
            },
            "msgCurStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 2
            }
          }
        },
        "OfflineMsgStatueChangeNotify": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            },
            "StatusChangeItems": {
              "rule": "repeated",
              "type": "StatusChangeItem",
              "id": 2
            }
          }
        },
        "OfflineMsgStatueChangeNotifyReceived": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "CHAT_SESSION_TYPE": {
          "values": {
            "CHAT_SESSION_TYPE_GROUP_CHAT": 0,
            "CHAT_SESSION_TYPE_PRIVATE_CHAT": 100
          }
        },
        "UserSessionStatus": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            },
            "beginMsgRecordId": {
              "type": "string",
              "id": 2
            },
            "newMsgCount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "ChatSession": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            },
            "SessionCurSubSn": {
              "type": "int64",
              "id": 2
            },
            "LastMsgStatus": {
              "type": "pb_pub.MSG_STATE",
              "id": 3
            },
            "sessionType": {
              "type": "CHAT_SESSION_TYPE",
              "id": 4
            },
            "SrcId": {
              "type": "int64",
              "id": 5
            },
            "PbName": {
              "type": "string",
              "id": 6
            },
            "PbData": {
              "type": "bytes",
              "id": 7
            },
            "CreatedAt": {
              "type": "int64",
              "id": 9
            },
            "UpdatedAt": {
              "type": "int64",
              "id": 10
            },
            "PbCommData": {
              "type": "bytes",
              "id": 11
            },
            "newMsgCount": {
              "type": "int64",
              "id": 12
            }
          }
        },
        "FETCH_SESSION_RANGE": {
          "values": {
            "ALL": 0,
            "PRIVATE_CHAT": 1,
            "GROUP_CHAT": 2
          }
        },
        "FetchChatSessionsReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "range": {
              "type": "FETCH_SESSION_RANGE",
              "id": 4
            }
          }
        },
        "FetchChatSessionsRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "range": {
              "type": "FETCH_SESSION_RANGE",
              "id": 4
            },
            "chatSessions": {
              "rule": "repeated",
              "type": "ChatSession",
              "id": 5
            },
            "totalCount": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "FetchChatHisMsgListOfSessionReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "session": {
              "type": "int64",
              "id": 4
            }
          }
        },
        "FetchChatHisMsgListOfSessionRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "session": {
              "type": "int64",
              "id": 4
            },
            "chatHisMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 5
            },
            "totalCount": {
              "type": "int64",
              "id": 6
            }
          }
        },
        "DelChatSessionsReq": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "DelChatSessionsRsp": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ClearMsgOfSessionReq": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "ClearMsgOfSessionRsp": {
          "fields": {
            "session": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "FetchSysNotifyMsgListReq": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "FetchSysNotifyMsgListRsp": {
          "fields": {
            "page": {
              "type": "int64",
              "id": 1
            },
            "pageSize": {
              "type": "int64",
              "id": 2
            },
            "time": {
              "type": "int64",
              "id": 3
            },
            "chatHisMsgs": {
              "rule": "repeated",
              "type": "HistoryMsg",
              "id": 4
            },
            "totalCount": {
              "type": "int64",
              "id": 5
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
            "GRAND_RANK": 3,
            "SUMMIT_FINAL": 4
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
            },
            "hasIncognito": {
              "type": "bool",
              "id": 5
            },
            "publicAmouut": {
              "type": "int64",
              "id": 6
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
            },
            "incognito": {
              "type": "bool",
              "id": 7
            },
            "incognitoTimes": {
              "type": "int32",
              "id": 8
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
            },
            "incognito": {
              "type": "bool",
              "id": 5
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
            },
            "incognito": {
              "type": "bool",
              "id": 4
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
        },
        "SetKingdomWeight": {
          "fields": {
            "weights": {
              "rule": "repeated",
              "type": "int32",
              "id": 1
            }
          }
        },
        "TTKGameStateReq": {
          "fields": {}
        },
        "TTKGameStateRsp": {
          "fields": {
            "state": {
              "type": "int32",
              "id": 1
            },
            "countdown": {
              "type": "int64",
              "id": 2
            },
            "kingdoms": {
              "rule": "repeated",
              "type": "TTKKingdom",
              "id": 3
            }
          }
        },
        "TTKKingdom": {
          "fields": {
            "players": {
              "rule": "repeated",
              "type": "Player",
              "id": 1
            },
            "total": {
              "type": "int64",
              "id": 2
            }
          },
          "nested": {
            "Player": {
              "fields": {
                "userId": {
                  "type": "int64",
                  "id": 1
                },
                "bet": {
                  "type": "int64",
                  "id": 2
                },
                "userGameType": {
                  "type": "int32",
                  "id": 3
                }
              }
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
            "appUserId": {
              "type": "string",
              "id": 2
            },
            "appId": {
              "type": "int64",
              "id": 3
            },
            "registerApp": {
              "type": "string",
              "id": 4
            },
            "gender": {
              "type": "string",
              "id": 5
            },
            "headerImageOriginal": {
              "type": "string",
              "id": 6
            },
            "userLevel": {
              "type": "string",
              "id": 7
            },
            "authAccess": {
              "type": "string",
              "id": 8
            },
            "nickName": {
              "type": "string",
              "id": 9
            },
            "sign": {
              "type": "string",
              "id": 10
            },
            "actorGrade": {
              "type": "int32",
              "id": 11
            },
            "role": {
              "type": "int32",
              "id": 12
            },
            "banned": {
              "type": "bool",
              "id": 13
            },
            "memberFlag": {
              "type": "int32",
              "id": 14
            },
            "bigImageOriginal": {
              "type": "string",
              "id": 15
            },
            "userSourceVersion": {
              "type": "int32",
              "id": 16
            },
            "State": {
              "type": "pb_pub.USER_STATE_TYPE",
              "id": 17
            },
            "freeAddMeFriend": {
              "type": "bool",
              "id": 18
            },
            "status": {
              "type": "int32",
              "id": 19
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
            },
            "appId": {
              "type": "int64",
              "id": 19
            },
            "appUserId": {
              "type": "string",
              "id": 20
            },
            "modelType": {
              "type": "pb_pub.MODEL_TYPE",
              "id": 21
            },
            "userSourceVersion": {
              "type": "int32",
              "id": 22
            },
            "status": {
              "type": "int32",
              "id": 23
            }
          }
        },
        "AppUidToImIdReq": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "appUserId": {
              "type": "string",
              "id": 2
            }
          }
        },
        "AppUidToImIdRsp": {
          "fields": {
            "appId": {
              "type": "int64",
              "id": 1
            },
            "userId": {
              "type": "int64",
              "id": 2
            },
            "appUserId": {
              "type": "string",
              "id": 3
            }
          }
        },
        "OnlineNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "OfflineNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "SwitchBackNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "SwitchFrontNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "HeartbeatNotify": {
          "fields": {
            "userId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "GrantScene": {
          "values": {
            "PrivateChat": 0,
            "GroupChat": 1
          }
        },
        "GroupRedPacketType": {
          "values": {
            "Lucky": 0,
            "Average": 1
          }
        },
        "RedPacketHandOutReq": {
          "fields": {
            "grantUserId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "grantScene": {
              "type": "GrantScene",
              "id": 3
            },
            "groupRedPacketType": {
              "type": "GroupRedPacketType",
              "id": 4
            },
            "aimId": {
              "type": "int64",
              "id": 5
            },
            "groupAimId": {
              "type": "int64",
              "id": 6
            },
            "description": {
              "type": "string",
              "id": 7
            },
            "createCount": {
              "type": "int32",
              "id": 8
            },
            "createValue": {
              "type": "int64",
              "id": 9
            },
            "walletPasswd": {
              "type": "string",
              "id": 10
            },
            "aimName": {
              "type": "string",
              "id": 11
            }
          }
        },
        "RedPacketHandOutRsp": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "info": {
              "type": "RedPacketInfo",
              "id": 2
            },
            "errCode": {
              "type": "pb_pub.ErrCode",
              "id": 3
            },
            "reason": {
              "type": "string",
              "id": 4
            }
          }
        },
        "RedPacketStatus": {
          "values": {
            "Edit": 0,
            "Going": 1,
            "Completed": 2,
            "Overtime": 3,
            "Refunded": 4
          }
        },
        "RedPacketInfo": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "grantUserId": {
              "type": "int64",
              "id": 2
            },
            "grantScene": {
              "type": "GrantScene",
              "id": 3
            },
            "groupRedPacketType": {
              "type": "GroupRedPacketType",
              "id": 4
            },
            "aimId": {
              "type": "int64",
              "id": 5
            },
            "groupAimId": {
              "type": "int64",
              "id": 6
            },
            "description": {
              "type": "string",
              "id": 7
            },
            "createCount": {
              "type": "int32",
              "id": 8
            },
            "createValue": {
              "type": "int64",
              "id": 9
            },
            "remainCount": {
              "type": "int32",
              "id": 10
            },
            "remainValue": {
              "type": "int64",
              "id": 11
            },
            "status": {
              "type": "RedPacketStatus",
              "id": 12
            },
            "createTime": {
              "type": "int64",
              "id": 13
            }
          }
        },
        "RedPacketNotify": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "info": {
              "type": "RedPacketInfo",
              "id": 2
            }
          }
        },
        "RedPacketReceiveReq": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "RedPacketReceiveRsp": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "walletType": {
              "type": "int32",
              "id": 2
            },
            "receivedValue": {
              "type": "int64",
              "id": 3
            },
            "grantUserId": {
              "type": "int64",
              "id": 4
            },
            "grantScene": {
              "type": "GrantScene",
              "id": 5
            },
            "groupRedPacketType": {
              "type": "GroupRedPacketType",
              "id": 6
            },
            "aimId": {
              "type": "int64",
              "id": 7
            },
            "status": {
              "type": "RedPacketStatus",
              "id": 12
            }
          }
        },
        "RedPacketReceivedNotify": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "receiveUserId": {
              "type": "int64",
              "id": 2
            },
            "grantUserId": {
              "type": "int64",
              "id": 3
            },
            "aimId": {
              "type": "int64",
              "id": 4
            },
            "receivedValue": {
              "type": "int64",
              "id": 5
            },
            "remainCount": {
              "type": "int32",
              "id": 6
            },
            "remainValue": {
              "type": "int64",
              "id": 7
            },
            "status": {
              "type": "RedPacketStatus",
              "id": 8
            }
          }
        },
        "RedPacketInfoReq": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            }
          }
        },
        "RedPacketInfoRsp": {
          "fields": {
            "data": {
              "type": "RedPacketInfo",
              "id": 1
            },
            "isMeReceived": {
              "type": "bool",
              "id": 2
            },
            "iReceivedCount": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "RedPacketReceivedItem": {
          "fields": {
            "redPacketId": {
              "type": "int64",
              "id": 1
            },
            "grantUserId": {
              "type": "int64",
              "id": 2
            },
            "grantScene": {
              "type": "GrantScene",
              "id": 3
            },
            "groupRedPacketType": {
              "type": "GroupRedPacketType",
              "id": 4
            },
            "aimId": {
              "type": "int64",
              "id": 5
            },
            "groupAimId": {
              "type": "int64",
              "id": 6
            },
            "description": {
              "type": "string",
              "id": 7
            },
            "recipientUserId": {
              "type": "int64",
              "id": 8
            },
            "receivedValue": {
              "type": "int64",
              "id": 9
            },
            "createdTime": {
              "type": "int64",
              "id": 10
            }
          }
        },
        "RedPacketMyReceivedListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "RedPacketMyReceivedListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "items": {
              "rule": "repeated",
              "type": "RedPacketReceivedItem",
              "id": 4
            }
          }
        },
        "RedPacketMyHandedOutListReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            }
          }
        },
        "RedPacketMyHandedOutListRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "items": {
              "rule": "repeated",
              "type": "RedPacketInfo",
              "id": 4
            }
          }
        },
        "RedPacketFlowItem": {
          "fields": {
            "id": {
              "type": "int64",
              "id": 1
            },
            "redPacketId": {
              "type": "int64",
              "id": 2
            },
            "recipientUserId": {
              "type": "int64",
              "id": 3
            },
            "value": {
              "type": "int64",
              "id": 4
            },
            "createTime": {
              "type": "int64",
              "id": 5
            }
          }
        },
        "RedPacketCurFlowReq": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "redPacketId": {
              "type": "int64",
              "id": 3
            }
          }
        },
        "RedPacketCurFlowRsp": {
          "fields": {
            "page": {
              "type": "int32",
              "id": 1
            },
            "pageSize": {
              "type": "int32",
              "id": 2
            },
            "totalCount": {
              "type": "int64",
              "id": 3
            },
            "items": {
              "rule": "repeated",
              "type": "RedPacketFlowItem",
              "id": 4
            }
          }
        }
      }
    }
  }
}