var a, e, n = require("../../@babel/runtime/helpers/interopRequireDefault"), 
regenerator = n(require("../../@babel/runtime/regenerator")), o = n(require("../../@babel/runtime/helpers/asyncToGenerator")), t = n(require("../../@babel/runtime/helpers/classCallCheck")), p = n(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, a = window.zs = window.zs || {}, (e = function() {
    function a() {
        (0, t.default)(this, a);
    }
    var e;
    return (0, p.default)(a, null, [ {
        key: "init",
        value: function() {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.tdAppSdk && null != GameGlobal.tdInit ? null == this.appKey || this.appKey.length <= 0 ? zs.log.warn("appKey非法，无法正常设置TD SDK", "Talking Data") : null == this.appName || this.appName.length <= 0 ? zs.log.warn("appName非法，无法正常设置TD SDK", "Talking Data") : null == this.appId || this.appId.length <= 0 ? zs.log.warn("appId非法，无法正常设置TD SDK", "Talking Data") : (GameGlobal.tdInit.init(), 
            this.TDSDK = GameGlobal.tdAppSdk) : zs.log.warn("无法初始化TD SDK", "Talking Data"));
        }
    }, {
        key: "registeInfo",
        value: function(a, e) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.tdAppSdk && null != GameGlobal.tdInit ? (null == this.infos && (this.infos = {}), 
            null == this.infos[a] && (this.infos[a] = {}), e && (this.infos[a] = e)) : zs.log.warn("TD SDK不存在，无法注册配置", "Talking Data"));
        }
    }, {
        key: "registeConfig",
        value: (e = (0, o.default)(regenerator.default.mark(function a(e) {
            var n;
            return regenerator.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    if ("undefined" != typeof wx) if ("undefined" != typeof GameGlobal && null != GameGlobal.tdAppSdk && null != GameGlobal.tdInit) if (e) {
                        for (n in e) this.registeInfo(n, e[n]);
                        zs.log.debug("注册数据配置表成功", "Talking Data");
                    } else zs.log.warn("注册数据配置表失败", "Talking Data"); else zs.log.warn("TD SDK不存在，无法注册配置表", "Talking Data");

                  case 1:
                  case "end":
                    return a.stop();
                }
            }, a, this);
        })), function(a) {
            return e.apply(this, arguments);
        })
    }, {
        key: "justTrack",
        value: function(a, e, n) {
            this.TDSDK && (zs.log.debug("TD数据统计 " + a + " : " + e, "Talking Data", n), this.TDSDK.event({
                id: a,
                label: e,
                params: n
            }));
        }
    }, {
        key: "track",
        value: function(a, e) {
            if (this.TDSDK && null != this.infos) {
                var n = a.split("_", 2), l = null, o = "";
                if (n.length > 1 ? (l = this.infos[n[0] + "_"]) && (o = l.label + n[1]) : o = (l = this.infos[a]).label, 
                null != l) {
                    var t = {}, p = !1;
                    if (null != l.params && l.params.length > 0) if (null == e) l.strict && (zs.log.warn("缺少必要属性，无法上报数据: " + key, "Talking Data"), 
                    p = !0); else for (var i = 0, u = l.params.length; i < u; i++) {
                        var f = l.params[i];
                        if (null == e[f] && l.strict) {
                            zs.log.warn("缺少必要属性，无法上报数据: " + f, "Talking Data"), p = !0;
                            break;
                        }
                        t[f] = e[f];
                    }
                    p || (zs.log.debug("TD数据统计 " + a + " : " + o, "Talking Data", t), this.TDSDK.event({
                        id: a,
                        label: o,
                        params: t
                    }));
                } else zs.log.warn("数据时间未注册，无法上报数据： " + a, "Talking Data");
            }
        }
    }, {
        key: "appKey",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取appKey", "Talking Data"), 
            null) : GameGlobal.appInfo.app.appKey;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.appKey = a : zs.log.warn("TD SDK不存在，无法设置appKey", "Talking Data"));
        }
    }, {
        key: "appName",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取appName", "Talking Data"), 
            null) : GameGlobal.appInfo.app.displayName;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.displayName = a : zs.log.warn("TD SDK不存在，无法设置appName", "Talking Data"));
        }
    }, {
        key: "appId",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取appId", "Talking Data"), 
            null) : GameGlobal.appInfo.app.uniqueId;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.uniqueId = a : zs.log.warn("TD SDK不存在，无法设置appId", "Talking Data"));
        }
    }, {
        key: "versionName",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取versionName", "Talking Data"), 
            null) : GameGlobal.appInfo.app.versionName;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.versionName = a : zs.log.warn("TD SDK不存在，无法设置appKey", "Talking Data"));
        }
    }, {
        key: "versionCode",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取versionCode", "Talking Data"), 
            null) : GameGlobal.appInfo.app.versionCode;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.versionCode = a : zs.log.warn("TD SDK不存在，无法设置appKey", "Talking Data"));
        }
    }, {
        key: "channel",
        get: function() {
            return "undefined" == typeof wx ? null : "undefined" == typeof GameGlobal || null == GameGlobal.appInfo ? (zs.log.warn("TD SDK不存在，无法获取channel", "Talking Data"), 
            null) : GameGlobal.appInfo.app.channel;
        },
        set: function(a) {
            "undefined" != typeof wx && ("undefined" != typeof GameGlobal && null != GameGlobal.appInfo ? GameGlobal.appInfo.app.channel = a : zs.log.warn("TD SDK不存在，无法设置channel", "Talking Data"));
        }
    } ]), a;
}()).workflowKey = "workflow_", e.workflowDesc = "工作流-", e.startupKey = "startup", 
e.startupDesc = "启动游戏", e.gameStartKey = "gameStart", e.gameStartDesc = "开始游戏", 
a.td = e;