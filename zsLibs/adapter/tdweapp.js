if ("undefined" != typeof wx) {
    var e = [ "1", "0", "3" ], t = {
        device: !0,
        network: !0,
        uid: !0
    }, i = {
        sdk: {
            version: e[0],
            minorVersion: e[1],
            build: e[2],
            platform: "Weapp",
            partner: ""
        },
        app: {
            versionCode: "1",
            versionName: "1.0.0",
            installTime: 0,
            displayName: null,
            appKey: null,
            uniqueId: null,
            channel: ""
        },
        device: {
            type: "mobile",
            softwareConfig: {},
            hardwareConfig: {},
            deviceId: {}
        },
        networks: [ {
            type: "wifi",
            available: !1,
            connected: !1
        }, {
            type: "cellular",
            available: !1,
            connected: !1,
            current: []
        }, {
            type: "unknown",
            available: !1,
            connected: !1
        } ],
        locations: [ {} ],
        appContext: {}
    }, n = {
        firstInit: !1,
        initTime: 0,
        sessionId: "",
        sessionStartTime: 0,
        appLaunchInfo: null,
        sendFailTimes: 0,
        bakData: {},
        Store: {
            set: function(e, t) {
                try {
                    wx.setStorageSync("TDSDK_" + e, t);
                } catch (e) {}
                n.bakData["TDSDK_" + e] = t;
            },
            get: function(e) {
                var t = null;
                try {
                    t = wx.getStorageSync("TDSDK_" + e);
                } catch (e) {}
                return t || (t = n.bakData["TDSDK_" + e] || null), t;
            },
            remove: function(e) {
                try {
                    wx.removeStorageSync("TDSDK_" + e);
                } catch (e) {}
                delete n.bakData["TDSDK_" + e];
            }
        },
        random: function() {
            for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", t = e.length, i = "", n = 0; n < 12; n++) i += e.charAt(Math.floor(Math.random() * t));
            return i;
        },
        timestamp: function() {
            return new Date().getTime();
        },
        deviceId: function() {
            return "weapp-" + this.timestamp() + "-" + this.random();
        },
        getEventId: function(e) {
            if (!e && !/0{1}/.test(e)) return "";
            var t = "";
            try {
                t = e.toString();
            } catch (i) {
                try {
                    t = JSON.stringify(e);
                } catch (e) {}
            }
            return t.split(" ")[0].slice(0, 64);
        },
        addStoreData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = "EVENT_" + n.sessionId, i = n.Store.get(t);
            i = i && i.length ? i.concat(e) : e, n.Store.set(t, i), i.length >= 30 && (r.sessionContinue(), 
            r.startLoop());
        },
        eventHandle: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (e) {
                var i = {
                    eventId: e,
                    count: 1,
                    startTime: n.timestamp()
                };
                if ("WeappShare" === e) {
                    i.shareTickets = t.shareTickets;
                    var a = {};
                    a.user = n.deviceId, a.title = t.title, a.desc = t.desc, a.path = t.path, i.params = a;
                }
                n.addStoreData([ i ]);
            }
        },
        getCacheData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.keys(e), i = [], n = [];
            return t.length && t.forEach(function(t) {
                var a = e[t];
                a && a.sendFail && a.data && (i = i.concat(a.data), n.push(t));
            }), {
                data: i,
                keys: n
            };
        },
        sendCacheList: {},
        updateSendTime: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s = i.device.deviceId, o = n.Store.get("uid"), r = n.Store.get("deviceId");
            return e.forEach(function(i, d) {
                if (!i.device.deviceId.tid && !i.device.deviceId.uid) if (s.tid) {
                    if (i.device.deviceId.tid = s.tid, s.uid) return i.device.deviceId.uid = s.uid, 
                    !0;
                } else {
                    if (s.uid) return i.device.deviceId.uid = s.uid, i.device.deviceId.tid = s.uid, 
                    !0;
                    if (a.isWaitingForOpenid) {
                        if (o) return i.device.deviceId.uid = o, i.device.deviceId.tid = o, s.uid = o, s.tid = o, 
                        !0;
                        if (r) i.device.deviceId.tid = r, i.device.deviceId.uid = ""; else {
                            var c = n.deviceId();
                            s.tid = c, s.uid = "", n.Store.set("deviceId", c), i.device.deviceId.tid = c, i.device.deviceId.uid = "", 
                            a.shouldOverwriteTid = !1;
                        }
                    } else i.device.deviceId.tid = s.tid, i.device.deviceId.uid = s.uid;
                }
                i.action && i.action.data && (e[d].action.data.start = t);
            }), e;
        },
        getRequestData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = JSON.parse(JSON.stringify(e)), i = n.sendCacheList;
            if (Object.keys(i).length) {
                var a = n.getCacheData(i);
                t = t.concat(a.data), a.keys.forEach(function(e) {
                    return delete i[e];
                });
            }
            var s = t.length;
            if (s) {
                var o = [];
                s >= 30 ? (JSON.stringify(t).length > 61440 && o.push(t.splice(0, s / 2)), o.push(t)) : o.push(t), 
                o.forEach(function(e) {
                    var t = n.timestamp();
                    i[t] = {
                        data: e,
                        sendFail: !1
                    };
                    var a = n.updateSendTime(e, n.timestamp());
                    n.request(t, a);
                });
            }
        },
        request: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            console.log("td request => ", t)
            // , wx.request({
            //     url: "https://h5.udrig.com/app/wx/v1",
            //     data: JSON.stringify(t),
            //     method: "POST",
            //     success: function(t) {
            //         console.log("td request success:", t), 200 === t.statusCode && (delete n.sendCacheList[e], 
            //         n.sendFailTimes = 0, c.appIsHide || (clearTimeout(r.timeout), r.timeout = null, 
            //         r.startLoop()));
            //     },
            //     fail: function() {
            //         console.log("td request failed:", t), c.appIsHide ? (n.Store.set("RESEND_" + e, t), 
            //         delete n.sendCacheList[e]) : (n.sendCacheList[e].sendFail = !0, n.sendFailTimes < 5 && n.sendFailTimes++);
            //     }
            // });
        }
    }, a = {
        shouldOverwriteTid: !0,
        isWaitingForOpenid: !0,
        isFirst: !0,
        init: function() {
            var e = this, t = n.Store.get("deviceId"), i = n.Store.get("uid");
            if (i) {
                var s = t || i;
                e.setData(s, i);
            } else new Promise(this.getOpenid).then(function(i) {
                var s = void 0;
                t ? s = t : (s = i, n.Store.set("deviceId", i)), e.setData(s, i), n.Store.set("uid", i), 
                a.isWaitingForOpenid = !1;
            }).catch(function(i) {
                var s;
                s = t || n.deviceId(), e.setData(s, ""), a.shouldOverwriteTid && n.Store.set("deviceId", s), 
                a.isWaitingForOpenid = !1;
            });
        },
        setData: function(e, n) {
            a.shouldOverwriteTid ? i.device.deviceId = {
                tid: e,
                uid: n
            } : i.device.deviceId.uid = n, t.uid = !1, r.getAppProfile();
        },
        getOpenid: function(e, t) {
            function n() {
                s.isFirst ? s.reGetOpenid(e, t) : t("error");
            }
            var s = a;
            new Date().getTime()
            // , wx.login({
            //     timeout: 3e3,
            //     success: function(t) {
            //         if (t.code) {
            //             wx.request({
            //                 url: "https://api.talkingdata.com/mpopenid/" + i.app.appkey + "/" + t.code,
            //                 success: function(t) {
            //                     var i = t.data;
            //                     i && 200 === i.code && i.openId ? e(i.openId) : n();
            //                 },
            //                 fail: function(e) {
            //                     n();
            //                 }
            //             });
            //         } else n();
            //     },
            //     fail: function(e) {
            //         n();
            //     }
            // });
        },
        reGetOpenid: function(e, t) {
            a.isFirst = !1, a.getOpenid(e, t);
        }
    }, s = {
        sendTime: 0,
        statusType: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = [], a = JSON.parse(JSON.stringify(i)), s = {
                domain: e.domain,
                name: e.name,
                data: e.data
            };
            a.ts = e.data.start || n.timestamp(), a.action = s, t.push(a), n.getRequestData(t);
        },
        dataType: function(e, t) {
            var i = this.getStoreList(e, t);
            n.getRequestData(i);
        },
        getEventType: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (e.pageEvent) return {
                domain: "page",
                name: "leave"
            };
            if (e.eventId) {
                var t = {};
                switch (e.eventId) {
                  case "WeappShare":
                    t = {
                        domain: "user",
                        name: "share"
                    };
                    break;

                  case "WeappPullDownRefresh":
                    t = {
                        domain: "page",
                        name: "pullDownRefresh"
                    };
                    break;

                  case "WeappReachBottom":
                    t = {
                        domain: "page",
                        name: "reachBottom"
                    };
                    break;

                  default:
                    t = {
                        domain: "appEvent",
                        name: ""
                    };
                }
                return t;
            }
        },
        getStoreList: function(e, t) {
            var a = this, s = [], o = e || n.sessionId, r = JSON.stringify(i), d = n.Store.get("EVENT_" + o);
            return d && d.length && (d.forEach(function(e) {
                var i = a.getEventType(e), o = JSON.parse(r);
                t && o.appContext && (o.appContext.sessionStartTime = t);
                var d = JSON.parse(JSON.stringify(e));
                d.pageEvent && delete d.pageEvent, d.status = 2;
                var c = {
                    domain: i.domain,
                    name: i.name,
                    data: d
                };
                o.ts = d.startTime ? d.startTime : n.timestamp(), o.action = c, s.push(o);
            }), n.Store.remove("EVENT_" + o)), s;
        }
    }, o = !1, r = {
        timeout: null,
        init: function() {
            var e = wx.getLaunchOptionsSync() || {};
            n.appLaunchInfo = JSON.parse(JSON.stringify(e)), n.appLaunchInfo.scene = e.scene ? e.scene.toString() : "", 
            a.init(), r.judgeRequireData(), r.getLocalParams(), r.getSystemInfo(), r.getNetwork();
        },
        launchRequest: function() {
            s.statusType({
                domain: "app",
                name: "init",
                data: {
                    first: !0
                }
            });
        },
        sessionStart: function(e) {
            var t = n.appLaunchInfo || {}, i = {
                status: 1,
                duration: 0,
                name: t.path,
                scene: t.scene,
                query: t.query || {},
                shareTicket: t.shareTicket,
                referrerInfo: t.referrerInfo
            };
            e && r.setNewSession(), i.start = n.Store.get("session_time") || n.timestamp(), 
            i.url = r.getUrl(i.name, i.query), s.statusType({
                domain: "session",
                name: "begin",
                data: i
            });
        },
        getUrl: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = Object.keys(t).sort(function(e, t) {
                return e > t;
            }) || [], n = i.length ? e + "?" : e;
            return i.forEach(function(e, i) {
                0 !== i && (n += "&"), n += e + "=" + t[e];
            }), n;
        },
        sessionContinue: function() {
            s.dataType();
        },
        sessionEnd: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
                status: 3,
                start: e.startTime,
                duration: e.duration
            };
            s.statusType({
                domain: "session",
                name: "end",
                data: t
            });
        },
        sendTmpSession: function() {
            r.sessionContinue(), r.startLoop();
        },
        startLoop: function() {
            r.timeout && (clearTimeout(r.timeout), r.timeout = null);
            var e = 3e3 * (n.sendFailTimes + 1);
            r.timeout = setTimeout(function() {
                r.sendTmpSession();
            }, e);
        },
        judgeRequireData: function() {
            i.app.appKey || (i.app.appKey = "", console.error("请填写您在TalkingData申请的App ID")), 
            i.app.displayName || (i.app.displayName = "appname", console.error("请填写您的小程序名称"));
        },
        getLocalParams: function() {
            var e = n.Store.get("initTime");
            e ? n.initTime = e : (n.initTime = n.timestamp(), n.Store.set("initTime", n.initTime), 
            n.firstInit = !0), i.app.installTime = n.initTime;
            var t = n.appLaunchInfo.query || {}, a = t.TDChannelId ? t.TDChannelId : "";
            i.app.channel = a, r.setNewSession();
        },
        setNewSession: function() {
            n.sessionId = n.deviceId(), n.sessionStartTime = n.timestamp(), n.Store.set("session_time", n.sessionStartTime), 
            i.appContext.sessionId = n.sessionId, i.appContext.sessionStartTime = n.sessionStartTime;
        },
        getLaunchInfo: function() {
            var e = JSON.parse(JSON.stringify(r.launchOptions));
            return e.type = "appLaunch", e;
        },
        getAppProfile: function() {
            if (!o) {
                var e = !0;
                [ "device", "network", "uid" ].forEach(function(i) {
                    t[i] && (e = !1);
                }), e && (o = !0, this.startRequest());
            }
        },
        startRequest: function() {
            n.firstInit && r.launchRequest(), this.sessionStart(), this.startLoop();
        },
        getLocation: function() {
            wx.getLocation({
                type: "wgs84",
                complete: function(e) {
                    if (e.longitude || e.latitude || e.horizontalAccuracy || e.verticalAccuracy) {
                        var t = i.locations[0];
                        t.lng = e.longitude, t.lat = e.latitude, t.hAccuracy = e.horizontalAccuracy, t.vAccuracy = e.verticalAccuracy, 
                        t.speed = e.speed, t.altitude = e.altitude, t.ts = new Date().getTime();
                    }
                }
            });
        },
        getNetwork: function() {
            wx.getNetworkType({
                complete: function(e) {
                    var n = i.networks, a = e.networkType;
                    "wifi" === a ? (n[0].available = !0, n[0].connected = !0) : "unknown" === a ? (n[2].available = !0, 
                    n[2].connected = !0) : "none" !== a && (n[1].available = !0, n[1].connected = !0, 
                    n[1].current.push({
                        type: a
                    })), t.network = !1, r.getAppProfile();
                }
            });
        },
        getSystemInfo: function() {
            wx.getSystemInfo({
                complete: function(e) {
                    if (e.model || e.system || e.SDKVersion) {
                        var n = {
                            model: e.model,
                            pixel: e.screenWidth + "*" + e.screenHeight + "*" + e.pixelRatio,
                            densityDpi: e.pixelRatio,
                            brand: e.brand
                        }, a = {
                            os: e.system,
                            local: e.language,
                            language: "zh_CN",
                            osVersionCode: e.version,
                            timezone: -new Date().getTimezoneOffset() / 60,
                            mpVersion: e.SDKVersion
                        };
                        i.device.hardwareConfig = n, i.device.softwareConfig = a;
                    }
                    t.device = !1, r.getAppProfile();
                }
            });
        }
    }, d = {
        event: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = n.getEventId(e.id);
            if (t) {
                var i = {};
                i.eventId = t, i.label = n.getEventId(e.label), i.count = e.count || 1, i.params = e.params, 
                i.startTime = n.timestamp(), n.addStoreData([ i ]);
            }
        },
        share: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            n.eventHandle("WeappShare", e);
        },
        pullDownRefresh: function() {
            n.eventHandle("WeappPullDownRefresh");
        },
        reachBottom: function() {
            n.eventHandle("WeappReachBottom");
        },
        setAccount: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return e.accountId || /0{1}/.test(e.accountId) ? e.accountType || /0{1}/.test(e.accountType) ? void (i.appContext.account = e) : void console.warn("accountType为必填字段！") : void console.warn("accountId为必填字段！");
        }
    }, c = {
        isHide2Show: !1,
        appIsHide: !1,
        show: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (c.appIsHide = !1, c.getlastTmpData(), c.isHide2Show) {
                var t = n.Store.get("TMP_time_end_" + n.sessionId), i = e.scene ? e.scene.toString() : "";
                e.scene && i === n.appLaunchInfo.scene ? n.timestamp() - t > 3e4 ? c.sessionRestart(t) : n.Store.remove("TMP_time_end_" + n.sessionId) : (n.appLaunchInfo = JSON.parse(JSON.stringify(e)), 
                n.appLaunchInfo.scene = i, c.sessionRestart(t)), c.isHide2Show = !1, r.startLoop();
            }
        },
        sessionRestart: function(e) {
            var t = n.Store.get("TMP_time_start_" + n.sessionId), i = {
                startTime: t,
                duration: parseInt((e - t) / 1e3)
            };
            r.sessionEnd(i), n.Store.remove("TMP_time_start_" + n.sessionId), n.Store.remove("TMP_time_end_" + n.sessionId), 
            n.Store.remove("session_time"), r.sessionStart(!0);
        },
        hide: function() {
            c.appIsHide = !0, clearTimeout(r.timeout), r.timeout = null, r.sessionContinue(), 
            c.isHide2Show = !0, n.Store.set("TMP_time_start_" + n.sessionId, n.Store.get("session_time")), 
            n.Store.set("TMP_time_end_" + n.sessionId, n.timestamp());
        },
        getlastTmpData: function() {
            var e = [], t = wx.getStorageInfoSync().keys || [], i = void 0, a = void 0;
            t && t.length && (i = t.filter(function(e) {
                return e.indexOf("TDSDK_EVENT") > -1;
            }), a = t.filter(function(e) {
                return e.indexOf("TDSDK_RESEND") > -1;
            })), i && i.length && (i.forEach(function(t) {
                var i = {};
                t.split("_")[2], i.id = t.split("_")[2], i.time = i.id.split("-")[1], e.push(i);
            }), c.sendLastTmpData(e)), a && a.length && a.forEach(function(e) {
                wx.getStorage({
                    key: e,
                    success: function(t) {
                        n.getRequestData(t.data), wx.removeStorage({
                            key: e,
                            success: function(e) {}
                        });
                    }
                });
            });
        },
        sendLastTmpData: function() {
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(e) {
                s.dataType(e.id, e.time);
            });
        }
    };
    GameGlobal.tdAppSdk = d, GameGlobal.appInfo = i, GameGlobal.tdInit = r, wx.onShow(c.show), 
    wx.onHide(c.hide);
}