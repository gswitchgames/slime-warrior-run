var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../@babel/runtime/helpers/assertThisInitialized")), 
igetget = t(require("../../@babel/runtime/helpers/get")), 
possibleConstructorReturn = t(require("../../@babel/runtime/helpers/possibleConstructorReturn")),
getPrototypeOf = t(require("../../@babel/runtime/helpers/getPrototypeOf")), a = t(require("../../@babel/runtime/helpers/inherits")), 
 regenerator = t(require("../../@babel/runtime/regenerator")), r = t(require("../../@babel/runtime/helpers/asyncToGenerator")), 
 classCallCheck = t(require("../../@babel/runtime/helpers/classCallCheck")), u = t(require("../../@babel/runtime/helpers/createClass"));

function h(t) {
    return function() {
        var e, i = (0, getPrototypeOf.default)(t);
        if (c()) {
            var a = (0, getPrototypeOf.default)(this).constructor;
            e = Reflect.construct(i, arguments, a);
        } else e = i.apply(this, arguments);
        return (0, possibleConstructorReturn.default)(this, e);
    };
}

function c() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
        !0;
    } catch (t) {
        return !1;
    }
}

window.zs = window.zs || {}, window.zs.exporter = window.zs.exporter || {}, function(t) {
    var s, c = zs.fgui.AlignType;
    !function(t) {
        t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical";
    }(s = s || (s = {}));
    var f = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        var e;
        return (0, u.default)(t, null, [ {
            key: "isSameDay",
            value: function(t) {
                return new Date(t).toDateString() === new Date().toDateString();
            }
        }, {
            key: "getStorageSync",
            value: function(t) {
                return this.cache[t];
            }
        }, {
            key: "setStorageSync",
            value: function(t, e) {
                this.cache[t] = e;
            }
        }, {
            key: "getCache",
            value: function(t, e) {
                if (e) {
                    var i = this.getStorageSync(t + "_time");
                    return null == i || Date.now() - Number(i) < e ? this.getStorageSync(t) : null;
                }
                return this.getStorageSync(t);
            }
        }, {
            key: "setCache",
            value: function(t, e) {
                this.setStorageSync(t, e), this.setStorageSync(t + "_time", Date.now());
            }
        }, {
            key: "getCacheNewDay",
            value: function(t, e) {
                if (e) {
                    var i = this.getStorageSync(t + "_time");
                    return null != i && this.isSameDay(i) ? null : this.getStorageSync(t);
                }
                return this.getStorageSync(t);
            }
        }, {
            key: "getDistance",
            value: function(t, e, i, s) {
                return Math.sqrt(Math.pow(t - e, 2) + Math.pow(i - s, 2));
            }
        }, {
            key: "checkScroll",
            value: function(t, e, i) {
                return this.getDistance(t, zs.proxy.Touch.touchX, e, zs.proxy.Touch.touchY) > i;
            }
        }, {
            key: "navigateToMiniProgram",
            value: (e = (0, r.default)(regenerator.default.mark(function e(i, s) {
                var n, a, r, o, u, h, c, f, d, y;
                return regenerator.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (n = i ? i.info : null, a = null, r = null, o = i ? i.img_index : null, !n) {
                            e.next = 25;
                            break;
                        }
                        if (!(u = this.getCacheNewDay("unlinkAd") || {})[n.appid]) {
                            e.next = 24;
                            break;
                        }
                        return zs.log.debug("广告位今日点击过", "Exporter"), e.next = 7, g.load().catch(function(t) {
                            return t;
                        });

                      case 7:
                        if (!((h = e.sent.filter(function(t) {
                            return !u[t.info.appid];
                        })) && h.length > 0)) {
                            e.next = 23;
                            break;
                        }
                        if (c = Math.floor(Math.random() * h.length), !n.imgs) {
                            e.next = 20;
                            break;
                        }
                        f = 0, d = n.imgs.length;

                      case 12:
                        if (!(f < d)) {
                            e.next = 20;
                            break;
                        }
                        if (n.imgs[f].icon != s) {
                            e.next = 17;
                            break;
                        }
                        return y = n.imgs[f], a = y.group_id, r = y.img_id, e.abrupt("break", 20);

                      case 17:
                        f++, e.next = 12;
                        break;

                      case 20:
                        n = h[c].info, zs.log.debug("新的导出", "Exporter", n), e.next = 24;
                        break;

                      case 23:
                        n = null;

                      case 24:
                        n || (n = i.info, this.setCache("unlinkAd", {}));

                      case 25:
                        return e.abrupt("return", new Promise(function(e, i) {
                            if (n) {
                                n.img_index = o, t.navigateCount++, t.readyExport = {
                                    target: n,
                                    icon: s,
                                    group: a,
                                    img: r
                                };
                                var l = zs.utils.getEventCode("export-" + t.navigateCount + "-" + n.app_id);
                                t.behaviorExport = {
                                    event_id: l,
                                    app_id: n.app_id
                                }, n.extraData = {
                                    event_id: l
                                }, zs.td.justTrack("导出跳转", "导出跳转"), zs.platform.async.navigateToOther({
                                    appInfo: n
                                }).then(function() {
                                    var i = t.getCacheNewDay("unlinkAd") || {};
                                    i[n.appid] = !0, t.setCache("unlinkAd", i), t.readyExport && (g.collectExport(n, s, a, r), 
                                    t.readyExport = null), e(null);
                                }).catch(function() {
                                    t.behaviorExport = null, t.readyExport = null, t.navigateErrorHandler && t.navigateErrorHandler.run(), 
                                    i(null);
                                });
                            } else zs.log.warn("跳转信息丢失，无法完成跳转！", "Exporter"), i(null);
                        }));

                      case 26:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            })), function(t, i) {
                return e.apply(this, arguments);
            })
        }, {
            key: "addBase",
            value: function(t, e) {
                this.bases[t] = e;
            }
        }, {
            key: "removeBase",
            value: function(t) {
                this.bases[t] && delete this.bases[t];
            }
        }, {
            key: "cache",
            get: function() {
                return null == this._cache && (this._cache = {}), this._cache;
            }
        }, {
            key: "bases",
            get: function() {
                return null == this._bases && (this._bases = {}), this._bases;
            }
        } ]), t;
    }();
    f.navigateErrorHandler = null, f.navigateCount = 0, f.readyExport = null, f.record = [];
    var g = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, u.default)(t, null, [ {
            key: "setCache",
            value: function(t, e, i) {
                this.cache[t] = {
                    data: e,
                    timestamp: Date.now(),
                    expire: i || this.expireTime
                };
            }
        }, {
            key: "getCache",
            value: function(t) {
                var e = this.cache[t];
                return null != e && Date.now() - e.timestamp < e.expire ? e.data : null;
            }
        }, {
            key: "getUUID",
            value: function() {
                var t = zs.utils.getItem("ads_uuid");
                if (!t || t.trim().length <= 0) {
                    for (var e = "", i = 0; i < 8; i++) e += zs.utils.randByte();
                    zs.utils.setItem("ads_uuid", e), t = e;
                }
                return t;
            }
        }, {
            key: "collectSource",
            value: function() {
                zs.configs.gameCfg.newAds ? this.collectSourceNew() : this.collectSourceOld();
            }
        }, {
            key: "collectSourceNew",
            value: function() {
                var e = t.NEWURL + "/" + zs.network.version + "/ad/source", i = zs.platform.sync.getLaunchOptions();
                if (i && i.referrerInfo && i.referrerInfo.appId) {
                    var s = {
                        from_app_id: i.referrerInfo.appId,
                        to_app_id: zs.core.appId,
                        scene: zs.platform.sync.getScene(),
                        gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                        open_id: this.getUUID(),
                        zhise: i && i.query && i.query.zhise ? i.query.zhise : "",
                        event_id: i.referrerInfo.extraData && i.referrerInfo.extraData.event_id ? i.referrerInfo.extraData.event_id : ""
                    };
                    zs.td.justTrack("来路统计", "来路统计"), zs.network.nativeRequest(e, s, "POST", !1, !1, !0).then(function(t) {
                        console.log("collect source success!", t);
                    }).catch(function(t) {
                        zs.td.justTrack("来路统计失败", "来路统计失败"), console.log("collect source failed!", t);
                    }), zs.network.log("来路:" + JSON.stringify(s));
                }
            }
        }, {
            key: "collectSourceOld",
            value: function() {
                var e = t.URL + "/api/app_jump/in", i = zs.platform.sync.getLaunchOptions(), s = "";
                i && i.referrerInfo && i.referrerInfo.extraData && i.referrerInfo.extraData.event_id && (s = i.referrerInfo.extraData.event_id);
                var n = {
                    ak: zs.core.appId,
                    uu: this.getUUID(),
                    wsr: i,
                    rq_c: 0,
                    eid: s
                };
                zs.td.justTrack("来路统计", "来路统计"), zs.network.nativeRequest(e, n, "POST", !1, !1, !0).then(function(t) {
                    console.log("collect source success!", t);
                }).catch(function(t) {
                    zs.td.justTrack("来路统计失败", "来路统计失败"), console.log("collect source failed!", t);
                }), zs.network.log("来路:" + JSON.stringify(n));
            }
        }, {
            key: "collectExport",
            value: function(t, e, i, s) {
                zs.configs.gameCfg.newAds ? this.collectExportNew(t, e, i, s) : this.collectExportOld(t);
            }
        }, {
            key: "collectExportNew",
            value: function(e, i, s, n) {
                if ("wx_" == zs.platform.config.platformMark && "undefined" != typeof wx) {
                    var a = t.NEWURL + "/" + zs.network.version + "/ad/jump", l = null;
                    if (null != s && null != n) (l = {}).group_id = s, l.img_id = n; else if (i) for (var r = 0, o = e.imgs.length; r < o; r++) if (e.imgs[r].icon == i) {
                        l = e.imgs[r];
                        break;
                    }
                    var u = {
                        user_id: zs.core.userId,
                        from_app_id: zs.core.appId,
                        to_app_id: e.app_id,
                        position: e.position_type,
                        group_id: null != l ? l.group_id : 0,
                        img_id: null != l ? l.img_id : 0,
                        event_id: zs.utils.getEventCode("export-" + zs.exporter.utils.navigateCount + "-" + e.app_id),
                        record: ""
                    };
                    zs.td.justTrack("跳转统计", "跳转统计"), zs.network.nativeRequest(a, u, "POST", !1).then(function(t) {
                        t && t.status && 1 == t.status || zs.td.justTrack("跳转统计失败", "跳转统计失败"), console.log("collect export success!", t);
                    }).catch(function(t) {
                        zs.td.justTrack("跳转统计失败", "跳转统计失败"), console.log("collect export failed!", t);
                    }), zs.network.log("跳转:" + JSON.stringify(u));
                }
            }
        }, {
            key: "collectExportOld",
            value: function(e) {
                if ("wx_" == zs.platform.config.platformMark && "undefined" != typeof wx) {
                    var i = t.URL + "/api/appad_new/collect", s = Math.round(new Date().getTime() / 1e3).toString(), n = zs.platform.sync.getLaunchOptions(), a = {
                        user_id: zs.core.userId,
                        from_id: zs.core.appId,
                        to_id: e.app_id,
                        timestamp: s,
                        scene: zs.product.scene,
                        zhise: n && n.query && n.query.zhise ? n.query.zhise : "",
                        event_id: zs.utils.getEventCode("export-" + zs.exporter.utils.navigateCount + "-" + e.app_id)
                    };
                    zs.td.justTrack("跳转统计", "跳转统计"), zs.network.nativeRequest(i, a, "POST", !0, !1, !0).then(function(t) {
                        t && t.status && 1 == t.status || zs.td.justTrack("跳转统计失败", "跳转统计失败"), console.log("collect export success!", t);
                    }).catch(function(t) {
                        zs.td.justTrack("跳转统计失败", "跳转统计失败"), console.log("collect export failed!", t);
                    });
                }
            }
        }, {
            key: "loadNew",
            value: function() {
                // var e = this, i = t.NEWURL + "/" + zs.network.version + "/ad/list", s = {
                //     appid: zs.configs.gameCfg.appId
                // };
                return new Promise(function(n, a) {
                    // var l = t.getCache(t.exportCacheNew);
                    return  n({}) //l ?
                //     : t.cacheSetting ? (null == t.requestList && (t.requestList = []), 
                //     void t.requestList.push(function(t) {
                //         n(t);
                //     })) : (t.cacheSetting = !0, zs.td.justTrack("拉取广告数据", "拉取广告数据"), void zs.network.nativeRequest(i, s, "POST", !0, !1).then(function(i) {
                //         var s = [];
                //         for (var a in i) {
                //             var l = i[a];
                //             if (null != l && Array.isArray(l) && !(l.length <= 0)) for (var r = function(t, e) {
                //                 var i = {}, n = l[t];
                //                 n.position_type = n.position, n.app_title = n.name, n.appid = n.app_id, i.info = n, 
                //                 i.info.imgs && i.info.imgs.length > 0 && (i.img_index = zs.utils.randInt(0, i.info.imgs.length), 
                //                 i.getIcon = function(t) {
                //                     return t = t || 0, i.info.imgs[t % i.info.imgs.length].icon;
                //                 }), s.push(i);
                //             }, o = 0, u = l.length; o < u; o++) r(o);
                //         }
                //         if (t.setCache(t.exportCacheNew, s), zs.log.debug("load success: ", "Exporter", s), 
                //         t.requestList && t.requestList.length > 0) for (var h = 0, c = t.requestList.length; h < c; h++) t.requestList[h].call(e, s);
                //         t.requestList = null, t.cacheSetting = !1, null == s || s.length <= 0 ? zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败") : zs.td.justTrack("拉取广告数据成功", "拉取广告数据成功"), 
                //         n(s);
                //     }).catch(function(i) {
                //         var s = [];
                //         if (t.requestList && t.requestList.length > 0) for (var a = 0, l = t.requestList.length; a < l; a++) t.requestList[a].call(e, s);
                //         t.requestList = null, t.cacheSetting = !1, zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败"), 
                //         n(s);
                //     }));
                });
            }
        }, {
            key: "loadOld",
            value: function() {
                var e = this, i = t.URL + "/api/appad_new/index", s = Math.round(new Date().getTime() / 1e3).toString(), n = {
                    appid: zs.configs.gameCfg.appId,
                    timestamp: s
                };
                return new Promise(function(s, a) {
                    var l = t.getCache(t.exportCache);
                    return l ? s(l) : t.cacheSetting ? (null == t.requestList && (t.requestList = []), 
                    void t.requestList.push(function(t) {
                        s(t);
                    })) : (t.cacheSetting = !0, zs.td.justTrack("拉取广告数据", "拉取广告数据"), void zs.network.nativeRequest(i, n, "POST", !0, !1, !0).then(function(i) {
                        var n = [];
                        for (var a in i) {
                            var l = i[a];
                            if (null != l && Array.isArray(l)) for (var r = function(t, e) {
                                var i = {}, s = l[t];
                                i.info = s;
                                for (var a = !1, r = 0, o = n.length; r < o; r++) {
                                    var u = n[r];
                                    if (u.info.appid == s.appid) {
                                        u.info.imgs || (u.info.imgs = [], u.info.imgs.push(u.info.app_icon)), u.info.imgs.push(s.app_icon), 
                                        u.img_index = zs.utils.randInt(0, u.info.imgs.length), a = !0;
                                        break;
                                    }
                                }
                                a || (i.getIcon = function(t) {
                                    return i.info.imgs ? (t = t || 0, i.info.imgs[t % i.info.imgs.length]) : i.info.app_icon;
                                }, n.push(i));
                            }, o = 0, u = l.length; o < u; o++) r(o);
                        }
                        if (t.setCache(t.exportCache, n), zs.log.debug("load success: ", "Exporter", n), 
                        t.requestList && t.requestList.length > 0) for (var h = 0, c = t.requestList.length; h < c; h++) t.requestList[h].call(e, n);
                        t.requestList = null, t.cacheSetting = !1, (null == n || n.length <= 0) && zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败"), 
                        s(n);
                    }).catch(function(i) {
                        var n = [];
                        if (t.requestList && t.requestList.length > 0) for (var a = 0, l = t.requestList.length; a < l; a++) t.requestList[a].call(e, n);
                        t.requestList = null, t.cacheSetting = !1, zs.td.justTrack("拉取广告数据失败", "拉取广告数据失败"), 
                        s(n);
                    }));
                });
            }
        }, {
            key: "load",
            value: function() {
                return zs.configs.gameCfg.newAds ? this.loadNew() : this.loadOld();
            }
        }, {
            key: "cache",
            get: function() {
                return null == this._cache && (this._cache = {}), this._cache;
            }
        } ]), t;
    }();
    g.URL = "",//https://zsad.zxmn2018.com 
    g.NEWURL = "", //https://gamesapi.zxmn2018.com
    g.expireTime = 6e5, g.exportCache = "ExpCache", g.exportCacheNew = "ExpCacheNew";
    var d = function(t) {
        (0, a.default)(r, t);
        var l = h(r);
        function r(t) {
            var i;
            return (0, classCallCheck.default)(this, r), (i = l.call(this, t))._cellWidth = 0, i._cellHeight = 0, 
            i._effectWidth = 0, i._effectHeight = 0, i._itemType = null, i._datas = [], i._maxItems = 0, 
            i._adaptScale = !1, i._keepRatio = s.None, i._autoScrollSpeed = 0, i._autoScrollForward = !0, 
            i._isAutoScrolling = !1, i._dragRecoverTime = 0, i._dragStopCount = 0, i._readyDrag = !1, 
            i._clickHandler = null, i._transition = null, i._bScrollExport = !1, t && t instanceof zs.ui.FGUI_list && (t.list.itemProvider = zs.proxy.Event.FGUIEvent((0, 
            e.default)(i), i.onItemProvider), t.list.itemRenderer = zs.proxy.Event.FGUIEvent((0, 
            e.default)(i), i.onItemRenderer), zs.proxy.Event.FGUIOn(t.list, zs.proxy.Event.FGUI_CLICK_ITEM, (0, 
            e.default)(i), i.onClickItem), zs.proxy.Event.FGUIOn(t.list, zs.proxy.Event.MOUSE_DOWN, (0, 
            e.default)(i), i.onDragStateBegin), zs.proxy.Event.FGUIOn(t.list, zs.proxy.Event.MOUSE_MOVE, (0, 
            e.default)(i), i.onDragStateChanged)), i;
        }
        return (0, u.default)(r, [ {
            key: "dispose",
            value: function() {
                (0, igetget.default)((0, getPrototypeOf.default)(r.prototype), "dispose", this).call(this), this.startOffsetDelayHandler && clearTimeout(this.startOffsetDelayHandler), 
                zs.Tween.clearAll(this.view), this.shakeTime > 0 && this.stopShake();
            }
        }, {
            key: "check",
            value: function(t) {
                return t instanceof zs.ui.FGUI_list;
            }
        }, {
            key: "setHorizontalList",
            value: function(t, e, i, n) {
                var a = this;
                return this.setItem(t).setLayout(fairygui.ListLayoutType.FlowVertical).setAlign(c.Center).setAdaptScale(!0).setKeepRatio(s.Vertical).setScrollType(fairygui.ScrollType.Horizontal).setColumnGap(25).setGridHeight(e).snapWidth().setAutoScrollSpeed(50).setDragRecoverTime(3).loop().setScrollExport().setMaxItems(i), 
                g.load().then(function(t) {
                    a.disposed || a.setDatas(t).apply();
                }).catch(function(t) {
                    return t;
                }), n ? this.apply() : this;
            }
        }, {
            key: "setVerticalList",
            value: function(t, e, i, n) {
                var a = this;
                return this.setItem(t).setLayout(fairygui.ListLayoutType.FlowHorizontal).setAlign(c.Center).setAdaptScale(!0).setKeepRatio(s.Horizontal).setScrollType(fairygui.ScrollType.Vertical).setLineGap(25).setGridWidth(e).snapHeight().setAutoScrollSpeed(50).setDragRecoverTime(3).loop().setMaxItems(i), 
                g.load().then(function(t) {
                    a.disposed || a.setDatas(t).apply();
                }).catch(function(t) {
                    return t;
                }), n ? this.apply() : this;
            }
        }, {
            key: "setSideList",
            value: function(t, e, i, n) {
                var a = this;
                return this.setItem(t).setLayout(fairygui.ListLayoutType.FlowHorizontal).setAlign(c.Center).setAdaptScale(!0).setKeepRatio(s.Horizontal).setCellWidth(.7 * e).setScrollType(fairygui.ScrollType.Vertical).setLineGap(25).setGridWidth(e).setListFit(!0).bounce(!1).setMaxItems(i), 
                g.load().then(function(t) {
                    a.disposed || (t && t.sort(function(t, e) {
                        return t < e ? -1 : 1;
                    }), a.setDatas(t).apply());
                }).catch(function(t) {
                    return t;
                }), n ? this.apply() : this;
            }
        }, {
            key: "setHorizontalGrid",
            value: function(t, e, i, n, a, l) {
                var r = this;
                return this.setItem(t).setLayout(fairygui.ListLayoutType.FlowHorizontal).setAlign(c.Center).setAdaptScale(!0).setKeepRatio(s.Horizontal).setCellWidth((e - 30 * n) / n).setScrollType(fairygui.ScrollType.Both).setLineGap(30).setLineCount(n).setColumnGap(30).setGridSize(e, i).bounce(!1).setMaxItems(a), 
                g.load().then(function(t) {
                    r.disposed || r.setDatas(t).apply();
                }).catch(function(t) {
                    return t;
                }), l ? this.apply() : this;
            }
        }, {
            key: "setVerticalGrid",
            value: function(t, e, i, n, a, l) {
                var r = this;
                return this.setItem(t).setLayout(fairygui.ListLayoutType.FlowHorizontal).setAlign(c.Center).setAdaptScale(!0).setKeepRatio(s.Vertical).setCellHeight((i - 30 * n) / n).setScrollType(fairygui.ScrollType.Both).setLineGap(30).setLineCount(n).setColumnGap(30).setGridSize(e, i).bounce(!1).setMaxItems(a), 
                g.load().then(function(t) {
                    r.disposed || r.setDatas(t).apply();
                }).catch(function(t) {
                    return t;
                }), l ? this.apply() : this;
            }
        }, {
            key: "setAdaptScale",
            value: function(t) {
                return this._adaptScale = t, this;
            }
        }, {
            key: "setListFit",
            value: function(t) {
                return this._listFit = t, this;
            }
        }, {
            key: "setKeepRatio",
            value: function(t) {
                return this._keepRatio = t, this;
            }
        }, {
            key: "setAlign",
            value: function(t) {
                var e = this.view;
                if (e && e.list) switch (t) {
                  case c.Center:
                    e.list.align = r.AlignCenter, e.list.verticalAlign = r.AlignMiddle;
                    break;

                  case c.Top:
                    e.list.align = r.AlignCenter, e.list.verticalAlign = r.AlignTop;
                    break;

                  case c.Bottom:
                    e.list.align = r.AlignCenter, e.list.verticalAlign = r.AlignBottom;
                    break;

                  case c.Left:
                    e.list.align = r.AlignLeft, e.list.verticalAlign = r.AlignMiddle;
                    break;

                  case c.Right:
                    e.list.align = r.AlignRight, e.list.verticalAlign = r.AlignMiddle;
                    break;

                  case c.TopLeft:
                    e.list.align = r.AlignLeft, e.list.verticalAlign = r.AlignTop;
                    break;

                  case c.BottomLeft:
                    e.list.align = r.AlignLeft, e.list.verticalAlign = r.AlignBottom;
                    break;

                  case c.TopRight:
                    e.list.align = r.AlignRight, e.list.verticalAlign = r.AlignTop;
                    break;

                  case c.BottomRight:
                    e.list.align = r.AlignRight, e.list.verticalAlign = r.AlignBottom;
                }
                return this;
            }
        }, {
            key: "setLineCount",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.lineCount = t), this;
            }
        }, {
            key: "setLineGap",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.lineGap = t), this;
            }
        }, {
            key: "setColumnCount",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.columnCount = t), this;
            }
        }, {
            key: "setColumnGap",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.columnGap = t), this;
            }
        }, {
            key: "setLayout",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.layout = t), this;
            }
        }, {
            key: "setCellWidth",
            value: function(t) {
                return this._cellWidth = t, this;
            }
        }, {
            key: "setCellHeight",
            value: function(t) {
                return this._cellHeight = t, this;
            }
        }, {
            key: "setCellSize",
            value: function(t, e) {
                return this._cellWidth = t, this._cellHeight = e, this;
            }
        }, {
            key: "setX",
            value: function(t) {
                return this.view && (this.view.x = t), this;
            }
        }, {
            key: "setY",
            value: function(t) {
                return this.view && (this.view.y = t), this;
            }
        }, {
            key: "setXY",
            value: function(t, e) {
                return this.view && (this.view.x = t, this.view.y = e), this;
            }
        }, {
            key: "setScaleX",
            value: function(t) {
                return this.view && (this.view.scaleX = t), this;
            }
        }, {
            key: "setScaleY",
            value: function(t) {
                return this.view && (this.view.scaleY = t), this;
            }
        }, {
            key: "setScaleXY",
            value: function(t, e) {
                return this.view && (this.view.scaleX = t, this.view.scaleY = e), this;
            }
        }, {
            key: "setGridWidth",
            value: function(t) {
                return this.view && (this.view.width = t), this;
            }
        }, {
            key: "snapWidth",
            value: function() {
                return this.view && (this.view.width = fairygui.GRoot.inst.width * (1 / this.view.scaleX)), 
                this;
            }
        }, {
            key: "setGridHeight",
            value: function(t) {
                return this.view && (this.view.height = t), this;
            }
        }, {
            key: "snapHeight",
            value: function() {
                return this.view && (this.view.height = fairygui.GRoot.inst.height * (1 / this.view.scaleY)), 
                this;
            }
        }, {
            key: "setGridSize",
            value: function(t, e) {
                return this.view && (this.view.width = t, this.view.height = e), this;
            }
        }, {
            key: "setMarginLeft",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.margin.left = t), this;
            }
        }, {
            key: "setMarginRight",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.margin.right = t), this;
            }
        }, {
            key: "setMarginTop",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.margin.top = t), this;
            }
        }, {
            key: "setMarginBottom",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.margin.bottom = t), this;
            }
        }, {
            key: "setMargin",
            value: function(t, e, i, s) {
                var n = this.view;
                return n && n.list && (n.list.margin.left = t, n.list.margin.right = e, n.list.margin.top = i, 
                n.list.margin.bottom = s), this;
            }
        }, {
            key: "setBackground",
            value: function(t) {
                var e = this.view;
                return e && e.background && (Array.isArray(t) && t.length > 1 ? zs.fgui.loadPack(t[0]).then(function(i) {
                    e.background.url = zs.ui.readURL(i, t[1]);
                }).catch(function(t) {
                    return t;
                }) : e.background.url = t), this;
            }
        }, {
            key: "setBackgroundAlpha",
            value: function(t) {
                return this.view && this.view.background && (this.view.background.alpha = t), this;
            }
        }, {
            key: "setItem",
            value: function(t) {
                this._itemType = t;
                var e = this.view;
                return e && e.list && (e.list.defaultItem = this._itemType.URL), this;
            }
        }, {
            key: "setDatas",
            value: function(t) {
                return this._datas = zs.utils.arrayDeepCopy(t), this._datas.sort(function(t, e) {
                    return Math.random() > .5 ? -1 : 1;
                }), this;
            }
        }, {
            key: "setMaxItems",
            value: function(t) {
                return this._maxItems = t, this;
            }
        }, {
            key: "setScrollType",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.scrollPane._scrollType = t), this;
            }
        }, {
            key: "setAutoScrollSpeed",
            value: function(t) {
                return this._autoScrollSpeed = t, this;
            }
        }, {
            key: "setDragRecoverTime",
            value: function(t) {
                return this._dragRecoverTime = t, this;
            }
        }, {
            key: "setTransition",
            value: function(t) {
                return this._transition = t, this;
            }
        }, {
            key: "setStartOffsetX",
            value: function(t) {
                return this._startoffsetx = t, this;
            }
        }, {
            key: "setStartOffsetY",
            value: function(t) {
                return this._startoffsety = t, this;
            }
        }, {
            key: "setStartOffsetTime",
            value: function(t) {
                this._startoffsettime = t;
            }
        }, {
            key: "setStartOffsetDelay",
            value: function(t) {
                this._startoffsetdelay = t;
            }
        }, {
            key: "setStartFadeDelay",
            value: function(t) {
                this._startfadedelay = t;
            }
        }, {
            key: "setStartFadeTime",
            value: function(t) {
                this._startfadetime = t;
            }
        }, {
            key: "setDataHandler",
            value: function(t) {
                return t && (t.once = !1, this._itemRendererHandler = t), this;
            }
        }, {
            key: "setClickHandler",
            value: function(t) {
                return this._clickHandler = t, this;
            }
        }, {
            key: "setScrollExport",
            value: function() {
                return this._bScrollExport = !0, this;
            }
        }, {
            key: "fit",
            value: function() {
                var t = this.view;
                if (t && t.list) {
                    t.list.resizeToFit();
                    var e = t.list.width, i = t.list.height;
                    t.width = e, t.height = i, t.list.width = e, t.list.height = i;
                }
                return this;
            }
        }, {
            key: "loop",
            value: function() {
                var t = this.view;
                return t && t.list && this._itemType && (t.list.layout == fairygui.ListLayoutType.FlowHorizontal ? t.list.layout = fairygui.ListLayoutType.SingleColumn : t.list.layout == fairygui.ListLayoutType.FlowVertical && (t.list.layout = fairygui.ListLayoutType.SingleRow), 
                t.list.setVirtualAndLoop()), this._itemType || zs.log.warn("请先使用SetItem设置列表组件，再执行loop", "Exporter"), 
                this;
            }
        }, {
            key: "virtual",
            value: function() {
                var t = this.view;
                return t && t.list && this._itemType && t.list.setVirtual(), this._itemType || zs.log.warn("请先使用SetItem设置列表组件，再执行virtual", "Exporter"), 
                this;
            }
        }, {
            key: "bounce",
            value: function(t) {
                var e = this.view;
                return e && e.list && (e.list.scrollPane.bouncebackEffect = t), this;
            }
        }, {
            key: "setShakeTime",
            value: function(t) {
                return this.shakeTime = t, this;
            }
        }, {
            key: "apply",
            value: function() {
                var t = this, e = this.view;
                if (e && e.list && !this.disposed) {
                    e.list.handleSizeChanged();
                    var i = this.margin;
                    this._effectWidth = this.gridWidth - i.left - i.right, this._effectHeight = this.gridHeight - i.top - i.bottom, 
                    this._effectWidth <= 0 || this._effectHeight <= 0 ? e.list.numItems = 0 : this.maxItems > 0 ? e.list.numItems = this._datas ? Math.min(this._datas.length, this._maxItems) : 0 : e.list.numItems = this._datas ? this._datas.length : 0, 
                    this._listFit && e.list.resizeToFit(e.list.numItems), 0 != this._autoScrollSpeed && (zs.Timer.inst.clear(this, this.onAutoScroll), 
                    zs.Timer.inst.frameLoop(1, this, this.onAutoScroll), this._isAutoScrolling = !0), 
                    this._bScrollExport && (zs.proxy.Event.FGUIOff(e.list, zs.proxy.Event.FGUI_DRAG_START, this, this.scrollStart), 
                    zs.proxy.Event.FGUIOff(e.list, zs.proxy.Event.FGUI_DRAG_END, this, this.scrollJumpExport), 
                    zs.proxy.Event.FGUIOn(e.list, zs.proxy.Event.FGUI_DRAG_START, this, this.scrollStart), 
                    zs.proxy.Event.FGUIOn(e.list, zs.proxy.Event.FGUI_DRAG_END, this, this.scrollJumpExport)), 
                    this.shakeTime && this.shakeTime > 0 && zs.Timer.inst.once(this.shakeTime, this, this.refreshItem);
                }
                return null == this._startoffsetx && null == this._startoffsety || null != this.startOffsetDelayHandler || (this.startOffsetDelayHandler = setTimeout(function() {
                    var e = t.view.x + (t._startoffsetx || 0), i = t.view.y + (t._startoffsety || 0);
                    zs.Tween.to(t.view, {
                        x: e,
                        y: i
                    }, t._startoffsettime || 500, null, null, t._startoffsetdelay || 0);
                }, 1)), null == this._startfadedelay && null == this._startfadetime || (this.view.alpha = 0, 
                zs.Tween.to(this.view, {
                    alpha: 1
                }, this._startfadetime || 500, null, null, this._startfadedelay || 0), this._startfadedelay = null, 
                this._startfadetime = null), this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                if (t) {
                    null != t.scalex && this.setScaleX(t.scalex), null != t.scale_x && this.setScaleX(t.scale_x), 
                    null != t.scaley && this.setScaleY(t.scaley), null != t.scale_y && this.setScaleY(t.scale_y);
                    var e = zs.fgui.configs.items[t.item];
                    if (t.mode && null != e) switch (t.mode) {
                      case "hlist":
                        null != t.height && this.setHorizontalList(e, t.height, t.max || 0, !1);
                        break;

                      case "vlist":
                        null != t.width && this.setVerticalList(e, t.width, t.max || 0, !1);
                        break;

                      case "hgrid":
                        null == t.width || null == t.height || null == t.linelimit && null == t.line_limit || this.setHorizontalGrid(e, t.width, t.height, null != t.line_limit ? t.line_limit : t.linelimit, t.max || 0, !1);
                        break;

                      case "vgrid":
                        null == t.width || null == t.height || null == t.columnlimit && null == t.column_limit || this.setVerticalGrid(e, t.width, t.height, null != t.column_limit ? t.column_limit : t.columnlimit, t.max || 0, !1);
                        break;

                      case "side":
                        null != t.width && this.setSideList(e, t.width, t.max || 0, !1);
                    }
                    null != t.adaptscale && this.setAdaptScale(t.adaptscale), null != t.adapt_scale && this.setAdaptScale(t.adapt_scale), 
                    null != t.listfit && this.setListFit(t.listfit), null != t.list_fit && this.setListFit(t.list_fit);
                    var i = t.keep_ratio || t.keepratio;
                    if (i) switch (i) {
                      case "horizontal":
                        this.setKeepRatio(zs.AdaptType.Horizontal);
                        break;

                      case "vertical":
                        this.setKeepRatio(zs.AdaptType.Vertical);
                        break;

                      default:
                        this.setKeepRatio(zs.AdaptType.None);
                    }
                    if (t.align) switch (t.align) {
                      case "center":
                        this.setAlign(zs.AlignType.Center);
                        break;

                      case "top":
                        this.setAlign(zs.AlignType.Top);
                        break;

                      case "bottom":
                        this.setAlign(zs.AlignType.Bottom);
                        break;

                      case "left":
                        this.setAlign(zs.AlignType.Left);
                        break;

                      case "right":
                        this.setAlign(zs.AlignType.Right);
                        break;

                      case "topleft":
                        this.setAlign(zs.AlignType.TopLeft);
                        break;

                      case "bottomleft":
                        this.setAlign(zs.AlignType.BottomLeft);
                        break;

                      case "topright":
                        this.setAlign(zs.AlignType.TopRight);
                        break;

                      case "bottomright":
                        this.setAlign(zs.AlignType.BottomRight);
                    }
                    if (null != t.linecount && this.setLineCount(t.linecount), null != t.line_count && this.setLineCount(t.line_count), 
                    null != t.linegap && this.setLineGap(t.linegap), null != t.line_gap && this.setLineGap(t.line_gap), 
                    null != t.columncount && this.setColumnCount(t.columncount), null != t.column_count && this.setColumnCount(t.column_count), 
                    null != t.columngap && this.setColumnGap(t.columngap), null != t.column_gap && this.setColumnGap(t.column_gap), 
                    t.layout) switch (t.layout) {
                      case "singlecolumn":
                      case "single_column":
                      case "column":
                        this.setLayout(fairygui.ListLayoutType.SingleColumn);
                        break;

                      case "singlerow":
                      case "single_row":
                      case "row":
                        this.setLayout(fairygui.ListLayoutType.SingleRow);
                        break;

                      case "flowhorizontal":
                      case "flow_horizontal":
                      case "horizontal":
                        this.setLayout(fairygui.ListLayoutType.FlowHorizontal);
                        break;

                      case "flowvertical":
                      case "flow_vertical":
                      case "vertical":
                        this.setLayout(fairygui.ListLayoutType.FlowVertical);
                        break;

                      case "pagination":
                      case "page":
                        this.setLayout(fairygui.ListLayoutType.Pagniation);
                    }
                    null != t.cellwidth && this.setCellWidth(t.cellwidth), null != t.cell_width && this.setCellWidth(t.cell_width), 
                    null != t.cellheight && this.setCellHeight(t.cellheight), null != t.cell_height && this.setCellHeight(t.cell_height), 
                    null != t.x && this.setX(x), null != t.y && this.setY(y), null != t.gridwidth && this.setGridWidth(t.gridWidth), 
                    null != t.grid_width && this.setGridWidth(t.grid_width), null != t.gridheight && this.setGridHeight(t.gridHeight), 
                    null != t.grid_height && this.setGridHeight(t.grid_height), (t.snap_width || t.snapwidth) && this.snapWidth(), 
                    (t.snap_height || t.snapheight) && this.snapheight(), null != t.marginleft && this.setMarginLeft(t.marginleft), 
                    null != t.margin_left && this.setMarginLeft(t.margin_left), null != t.marginright && this.setMarginRight(t.marginright), 
                    null != t.margin_right && this.setMarginRight(t.margin_right), null != t.margintop && this.setMarginTop(t.margintop), 
                    null != t.margin_top && this.setMarginTop(t.margin_top), null != t.marginbottom && this.setMarginBottom(t.marginbottom), 
                    null != t.margin_bottom && this.setMarginBottom(t.margin_bottom), t.background && this.setBackground(t.background), 
                    null != t.backgroundalpha && this.setBackgroundAlpha(t.backgroundalpha), null != t.background_alpha && this.setBackgroundAlpha(t.background_alpha), 
                    e && this.setItem(e), t.max && this.setMaxItems(t.max);
                    var s = t.scroll_type || t.scrolltype;
                    if (s) switch (s) {
                      case "horizontal":
                        this.setScrollType(fairygui.ScrollType.Horizontal);
                        break;

                      case "vertical":
                        this.setScrollType(fairygui.ScrollType.Vertical);
                        break;

                      case "both":
                        this.setScrollType(fairygui.ScrollType.Both);
                    }
                    null != t.autoscrollspeed && this.setAutoScrollSpeed(t.autoscrollspeed), null != t.auto_scroll_speed && this.setAutoScrollSpeed(t.auto_scroll_speed), 
                    null != t.dragrecovertime && this.setDragRecoverTime(t.dragrecovertime), null != t.drag_recover_time && this.setDragRecoverTime(t.drag_recover_time), 
                    t.transition && this.setTransition(t.transition), t.fit && this.fit(), t.loop && this.loop(), 
                    t.virtual && this.virtual(), null != t.bounce && this.bounce(t.bounce), null != t.shaketime && this.setShakeTime(t.shaketime), 
                    null != t.shake_time && this.setShakeTime(t.shake_time), null != t.startoffsetx && this.setStartOffsetX(t.startoffsetx), 
                    null != t.start_offset_x && this.setStartOffsetX(t.start_offset_x), null != t.startoffsety && this.setStartOffsetY(t.startoffsety), 
                    null != t.start_offset_y && this.setStartOffsetY(t.start_offset_y), null != t.startoffsettime && this.setStartOffsetTime(t.startoffsettime), 
                    null != t.start_offset_time && this.setStartOffsetTime(t.start_offset_time), null != t.startoffsetdelay && this.setStartOffsetDelay(t.startoffsetdelay), 
                    null != t.start_offset_delay && this.setStartOffsetDelay(t.start_offset_delay), 
                    null != t.startfadedelay && this.setStartFadeDelay(t.startfadedelay), null != t.start_fade_delay && this.setStartFadeDelay(t.start_fade_delay), 
                    null != t.startfadetime && this.setStartFadeTime(t.startfadetime), null != t.start_fade_time && this.setStartFadeTime(t.start_fade_time);
                }
                return this.apply();
            }
        }, {
            key: "startShake",
            value: function() {
                for (var t = this, e = 0; e < this.view.list.numChildren; e++) {
                    var i = this.view.list.getChildAt(e);
                    this.shakeNode(i);
                }
                zs.Timer.inst.once(this.shakeTime, this, function() {
                    t.refreshItem();
                });
            }
        }, {
            key: "stopShake",
            value: function() {
                for (var t = 0; t < this.view.list.numChildren; t++) {
                    var e = this.view.list.getChildAt(t);
                    zs.Tween.clearAll(e);
                }
            }
        }, {
            key: "refreshItem",
            value: function() {
                this._datas.sort(function(t, e) {
                    return Math.random() > .5 ? -1 : 1;
                }), this.maxItems > 0 ? this.view.list.numItems = this._datas ? Math.min(this._datas.length, this._maxItems) : 0 : this.view.list.numItems = this._datas ? this._datas.length : 0, 
                this.view.list._virtual && this.view.list.refreshVirtualList(), this.startShake();
            }
        }, {
            key: "shakeNode",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                switch (++e) {
                  case 0:
                    t.rotation = 0, zs.Tween.to(t, {
                        rotation: 5
                    }, 50, null, zs.Handler.create(this, this.shakeNode, [ t, e ]));
                    break;

                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                    zs.Tween.to(t, {
                        rotation: 10 * (e % 2 == 0 ? 1 : -1)
                    }, 100, null, zs.Handler.create(this, this.shakeNode, [ t, e ]));
                    break;

                  case 6:
                    zs.Tween.to(t, {
                        rotation: 0
                    }, 50);
                }
            }
        }, {
            key: "onDragStateBegin",
            value: function() {
                this._readyDrag = !0;
            }
        }, {
            key: "onDragStateChanged",
            value: function() {
                this._readyDrag && this._dragRecoverTime > 0 && (this._isAutoScrolling = !1, this._dragStopCount = 0), 
                this._readyDrag && (this._readyDrag = !1);
            }
        }, {
            key: "onItemProvider",
            value: function() {
                return this._itemType.URL;
            }
        }, {
            key: "onItemRenderer",
            value: function(t, e) {
                if (t < 0 || t >= this._datas.length) return e.picture.icon = "", e.title.text = "", 
                e.desc && (e.desc = ""), void (e.data = null);
                var i = this._datas[t];
                if (this._cellWidth > 0 || this._adaptScale && e.width > this._effectWidth) {
                    var n = this._adaptScale ? this._effectWidth : e.width;
                    this._cellWidth > 0 && (n = Math.min(n, this._cellWidth)), e.width = n;
                }
                if (this._cellHeight > 0 || this._adaptScale && e.height > this._effectHeight) {
                    var a = this._adaptScale ? this._effectHeight : e.height;
                    this._cellHeight > 0 && (a = Math.min(a, this._cellHeight)), e.height = a;
                }
                if (this.keepRatio == s.Horizontal ? e.height = e.width * (e.initHeight / e.initWidth) : this.keepRatio == s.Vertical && (e.width = e.height * (e.initWidth / e.initHeight)), 
                this._transition && this._transition.length >= 0) {
                    var l = e.getTransition(this._transition);
                    l && l.play();
                }
                this._itemRendererHandler ? this._itemRendererHandler.runWith([ e, i ]) : (e.picture && e.picture.icon && (e.picture.icon = i.getIcon(i.img_index)), 
                i.info.app_title && e.title ? e.title.text = i.info.app_title : e.title && (e.title.text = ""), 
                i.info.app_desc && e.desc ? e.desc.text = i.info.app_desc : e.desc && (e.desc.text = ""), 
                e.desc && (e.desc.text = "")), e.data = i;
            }
        }, {
            key: "onAutoScroll",
            value: function() {
                var t = this.view;
                if (t && t.list) if (this._isAutoScrolling && this.scrollType != fairygui.ScrollType.Both) {
                    var e = this._autoScrollSpeed * zs.Timer.inst.delta * .001 * (this._autoScrollForward ? 1 : -1), i = t.list.scrollPane;
                    this.scrollType == fairygui.ScrollType.Horizontal ? (i.setPosX(e + t.list.scrollPane.posX), 
                    i.percX >= 1 ? this._autoScrollForward = !1 : i.percX <= 0 && (this._autoScrollForward = !0)) : (i.setPosY(e + t.list.scrollPane.posY), 
                    i.percY >= 1 ? this._autoScrollForward = !1 : i.percY <= 0 && (this._autoScrollForward = !0));
                } else this.scrollType != fairygui.ScrollType.Both && (this._dragStopCount += .001 * zs.Timer.inst.delta, 
                this._dragStopCount > this._dragRecoverTime && (this._dragStopCount = 0, this._isAutoScrolling = !0));
            }
        }, {
            key: "refreshSingleItem",
            value: function(t) {
                var e = this._datas[t];
                if (null != e.img_index) e.img_index++; else {
                    var i = Math.floor(Math.random() * this._datas.length);
                    if (this._datas.length > 1 && i == t) return this.refreshSingleItem(t);
                    var s = this._datas[i];
                    s && (this._datas[t] = s, this._datas[i] = e);
                }
                this.apply(), this.view.list._virtual && this.view.list.refreshVirtualList();
            }
        }, {
            key: "onClickItem",
            value: function(t) {
                var e = this;
                this._clickHandler ? this._clickHandler.runWith(t) : (zs.td.justTrack("列表点击导出跳转", "列表点击导出跳转"), 
                f.navigateToMiniProgram(t.data, t.picture.icon).then(function() {
                    var i = e._datas.indexOf(t.data);
                    e.refreshSingleItem(i);
                }).catch(function(t) {
                    return t;
                }));
            }
        }, {
            key: "scrollStart",
            value: function() {
                this.touchX = zs.proxy.Touch.touchX, this.touchY = zs.proxy.Touch.touchY;
            }
        }, {
            key: "scrollJumpExport",
            value: function() {
                f.checkScroll(this.touchX, this.touchY, r.checkScrollDistance) && zs.product.get("zs_slide_jump_switch") && this.randomJumpExport();
            }
        }, {
            key: "randomJumpExport",
            value: function() {
                if (this._datas && !(this._datas.length <= 0)) {
                    var t = this._datas[Math.floor(Math.random() * this._datas.length)];
                    zs.td.justTrack("列表随机导出跳转", "列表随机导出跳转"), f.navigateToMiniProgram(t);
                }
            }
        }, {
            key: "adaptScale",
            get: function() {
                return this._adaptScale;
            }
        }, {
            key: "listFit",
            get: function() {
                return this._listFit;
            }
        }, {
            key: "keepRatio",
            get: function() {
                return this._keepRatio;
            }
        }, {
            key: "align",
            get: function() {
                var t = this.view, e = c.Center;
                if (t && t.list) {
                    var i = t.list.align, s = t.list.verticalAlign;
                    switch (i) {
                      case r.AlignMiddle:
                        switch (s) {
                          case r.AlignBottom:
                            e = c.Bottom;
                            break;

                          case r.AlignCenter:
                            e = c.Center;
                            break;

                          default:
                            e = c.Top;
                        }
                        break;

                      case r.AlignRight:
                        switch (s) {
                          case r.AlignBottom:
                            e = c.BottomRight;
                            break;

                          case r.AlignCenter:
                            e = c.Right;
                            break;

                          default:
                            e = c.TopRight;
                        }
                        break;

                      default:
                        switch (s) {
                          case r.AlignBottom:
                            e = c.BottomLeft;
                            break;

                          case r.AlignCenter:
                            e = c.Left;
                            break;

                          default:
                            e = c.TopLeft;
                        }
                    }
                }
                return e;
            }
        }, {
            key: "lineCount",
            get: function() {
                var t = this.view;
                return t && t.list ? t.list.lineCount : 0;
            }
        }, {
            key: "lineGap",
            get: function() {
                var t = this.view;
                return t && t.list ? t.list.lineGap : 0;
            }
        }, {
            key: "columnCount",
            get: function() {
                var t = this.view;
                return t && t.list ? t.list.columnCount : 0;
            }
        }, {
            key: "columnGap",
            get: function() {
                var t = this.view;
                return t && t.list ? t.list.columnGap : 0;
            }
        }, {
            key: "layout",
            get: function() {
                var t = this.view;
                return t ? t.list.layout : fairygui.ListLayoutType.FlowHorizontal;
            }
        }, {
            key: "cellWidth",
            get: function() {
                return this._cellWidth;
            }
        }, {
            key: "cellHeight",
            get: function() {
                return this._cellHeight;
            }
        }, {
            key: "x",
            get: function() {
                return this.view ? this.view.x : 0;
            }
        }, {
            key: "y",
            get: function() {
                return this.view ? this.view.y : 0;
            }
        }, {
            key: "scaleX",
            get: function() {
                return this.view ? this.view.scaleX : 1;
            }
        }, {
            key: "scaleY",
            get: function() {
                return this.view ? this.view.scaleY : 1;
            }
        }, {
            key: "gridWidth",
            get: function() {
                return this.view ? this.view.width : 0;
            }
        }, {
            key: "gridHeight",
            get: function() {
                return this.view ? this.view.height : 0;
            }
        }, {
            key: "marginLeft",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.list.margin.left : 0;
            }
        }, {
            key: "marginRight",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.list.margin.right : 0;
            }
        }, {
            key: "marginTop",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.list.margin.top : 0;
            }
        }, {
            key: "marginBottom",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.list.margin.bottom : 0;
            }
        }, {
            key: "margin",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.list.margin : null;
            }
        }, {
            key: "background",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.background.url : null;
            }
        }, {
            key: "backgroundAlpha",
            get: function() {
                return this.view && this.view instanceof zs.ui.FGUI_list ? this.view.background.alpha : 0;
            }
        }, {
            key: "item",
            get: function() {
                return this._itemType;
            }
        }, {
            key: "datas",
            get: function() {
                return this._datas;
            }
        }, {
            key: "maxItems",
            get: function() {
                return this._maxItems;
            }
        }, {
            key: "scrollType",
            get: function() {
                var t = this.view;
                return t && t.list ? t.list.scrollPane._scrollType : fairygui.ScrollType.Both;
            }
        }, {
            key: "autoScrollSpeed",
            get: function() {
                return this._autoScrollSpeed;
            }
        }, {
            key: "dragRecoverTime",
            get: function() {
                return this._dragRecoverTime;
            }
        }, {
            key: "transition",
            get: function() {
                return this._transition;
            }
        }, {
            key: "startOffsetX",
            get: function() {
                return this._startoffsetx;
            }
        }, {
            key: "startOffsetY",
            get: function() {
                return this._startoffsety;
            }
        }, {
            key: "startOffsetTime",
            get: function() {
                return this._startoffsettime;
            }
        }, {
            key: "startOffsetDelay",
            get: function() {
                return this._startoffsetdelay;
            }
        }, {
            key: "startFadeDelay",
            get: function() {
                return this._startfadedelay;
            }
        }, {
            key: "startFadeTime",
            get: function() {
                return this._startfadetime;
            }
        } ], [ {
            key: "make",
            value: function() {
                return zs.ui.FGUI_list.createInstance();
            }
        }, {
            key: "type",
            value: function() {
                return zs.ui.FGUI_list;
            }
        } ]), r;
    }(zs.fgui.base);
    d.checkScrollDistance = 30, d.AlignTop = "top", d.AlignBottom = "bottom", d.AlignMiddle = "middle", 
    d.AlignLeft = "left", d.AlignRight = "right", d.AlignCenter = "center", d.transitionShakeLeft = "shakeLeft", 
    d.transitionShakeRight = "shakeRight";
    var p = function(t) {
        (0, a.default)(s, t);
        var e = h(s);
        function s(t) {
            var i;
            return (0, classCallCheck.default)(this, s), i = e.call(this, t), s.gid++, i.fullId = s.gid, 
            i.record = [], i;
        }
        return (0, u.default)(s, [ {
            key: "dispose",
            value: function() {
                (0, igetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this), zs.network.behavior(zs.utils.getEventCode("full-" + this.fullId), 3, JSON.stringify(this.record)), 
                this.record = [];
            }
        }, {
            key: "setMistaken",
            value: function() {
                return this;
            }
        }, {
            key: "setClickContinue",
            value: function(t) {
                return this._clickContinue = t, this;
            }
        }, {
            key: "onClickContinue",
            value: function() {
                this._clickContinue && this._clickContinue.run();
            }
        }, {
            key: "enterJumpExport",
            value: function() {
                return zs.product.get("zs_auto_jump_switch") && this.randomJumpExport(), this;
            }
        }, {
            key: "scrollJumpExport",
            value: function() {
                f.checkScroll(this.touchX, this.touchY, s.checkScrollDistance) && zs.product.get("zs_slide_jump_switch") && this.randomJumpExport();
            }
        }, {
            key: "randomJumpExport",
            value: function() {}
        }, {
            key: "apply",
            value: function() {
                return this;
            }
        } ]), s;
    }(zs.fgui.base);
    p.gid = 0, p.checkScrollDistance = 30, t.utils = f, t.dataMgr = g, t.list = d, t.loader = function(t) {
        (0, a.default)(i, t);
        var e = h(i);
        function i(t) {
            var s;
            return (0, classCallCheck.default)(this, i), s = e.call(this, t), t.width = zs.configs.gameCfg.designWidth, 
            t.height = zs.configs.gameCfg.designHeight, t.alpha = 1, t.x = 0, t.y = 0, t.autoSize = !1, 
            t.fill = fairygui.LoaderFillType.ScaleFree, s;
        }
        return (0, u.default)(i, [ {
            key: "setURL",
            value: function(t) {
                var e = this;
                return Array.isArray(t) && t.length > 1 ? zs.fgui.loadPack(t[0]).then(function(i) {
                    e.view.url = zs.ui.readURL(i, t[1]);
                }).catch(function(t) {
                    return t;
                }) : this.view.url = t, this;
            }
        }, {
            key: "setAlpha",
            value: function(t) {
                return this.view.alpha = t, this;
            }
        }, {
            key: "setWidth",
            value: function(t) {
                return this.view.width = t, this;
            }
        }, {
            key: "setHeight",
            value: function(t) {
                return this.view.height = t, this;
            }
        }, {
            key: "setX",
            value: function(t) {
                return this.view.x = t, this;
            }
        }, {
            key: "setY",
            value: function(t) {
                return this.view.y = t, this;
            }
        }, {
            key: "setFill",
            value: function(t) {
                var e = fairygui.LoaderFillType.ScaleFree;
                switch (t) {
                  case "scale":
                    e = fairygui.LoaderFillType.Scale;
                    break;

                  case "height":
                    e = fairygui.LoaderFillType.ScaleMatchHeight;
                    break;

                  case "width":
                    e = fairygui.LoaderFillType.ScaleMatchWidth;
                    break;

                  case "free":
                    e = fairygui.LoaderFillType.ScaleFree;
                    break;

                  case "noborder":
                    e = fairygui.LoaderFillType.ScaleNoBorder;
                    break;

                  case "none":
                    e = fairygui.LoaderFillType.None;
                }
                return this.view.fill = e, this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                return t && (null != t.alpha && this.setAlpha(t.alpha), t.url && this.setURL(t.url), 
                null != t.width && this.setWidth(t.width), null != t.height && this.setHeight(t.height), 
                null != t.x && this.setX(t.x), null != t.y && this.setY(t.y), t.fill && this.setFill(t.fill)), 
                this;
            }
        }, {
            key: "url",
            get: function() {
                return this.view.url;
            }
        }, {
            key: "alpha",
            get: function() {
                return this.view.alpha;
            }
        }, {
            key: "width",
            get: function() {
                return this.view.width;
            }
        }, {
            key: "height",
            get: function() {
                return this.view.height;
            }
        }, {
            key: "x",
            get: function() {
                return this.view.x;
            }
        }, {
            key: "y",
            get: function() {
                return this.view.y;
            }
        }, {
            key: "fill",
            get: function() {
                var t = "free";
                switch (this.view.fill) {
                  case fairygui.LoaderFillType.None:
                    t = "none";
                    break;

                  case fairygui.LoaderFillType.Scale:
                    t = "scale";
                    break;

                  case fairygui.LoaderFillType.ScaleMatchHeight:
                    t = "height";
                    break;

                  case fairygui.LoaderFillType.ScaleMatchWidth:
                    t = "width";
                    break;

                  case fairygui.LoaderFillType.ScaleFree:
                    t = "free";
                    break;

                  case fairygui.LoaderFillType.ScaleNoBorder:
                    t = "noborder";
                }
                return t;
            }
        } ], [ {
            key: "make",
            value: function() {
                return new fairygui.GLoader();
            }
        } ]), i;
    }(zs.fgui.base), t.background = function(t) {
        (0, a.default)(i, t);
        var e = h(i);
        function i(t) {
            var s;
            return (0, classCallCheck.default)(this, i), s = e.call(this, t), t.width = zs.configs.gameCfg.designWidth, 
            t.height = zs.configs.gameCfg.designHeight, t.alpha = .5, t.x = 0, t.y = 0, t.drawRect(0, zs.proxy.color("#000000"), zs.proxy.color("#000000")), 
            s;
        }
        return (0, u.default)(i, [ {
            key: "setColor",
            value: function(t) {
                return this.view.color = zs.proxy.color(t), this;
            }
        }, {
            key: "setAlpha",
            value: function(t) {
                return this.view.alpha = t, this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                return t && (t.color && this.setColor(t.color), null != t.alpha && this.setAlpha(t.alpha)), 
                this;
            }
        }, {
            key: "color",
            get: function() {
                return this.view.color;
            }
        }, {
            key: "alpha",
            get: function() {
                return this.view.alpha;
            }
        } ], [ {
            key: "make",
            value: function() {
                return new fairygui.GGraph();
            }
        } ]), i;
    }(zs.fgui.base), t.banner = function(t) {
        (0, a.default)(i, t);
        var e = h(i);
        function i(t) {
            // var s;
            // return (0, classCallCheck.default)(this, i), s = e.call(this, t), t.width = zs.platform.config.bannerWidth ? zs.platform.config.bannerWidth : 600, 
            // t.height = zs.platform.config.bannerHeight ? zs.platform.config.bannerHeight : 200, 
            // t.drawRect(0, zs.proxy.color("#888888"), zs.proxy.color("#888888")), s;
        }
        return (0, u.default)(i, [ {
            key: "setWidth",
            value: function(t) {
                // this.view.width = t;
            }
        }, {
            key: "setHeight",
            value: function(t) {
                // this.view.height = t;
            }
        }, {
            key: "width",
            get: function() {
                return this.view.width;
            }
        }, {
            key: "height",
            get: function() {
                return this.view.height;
            }
        } ], [ {
            key: "make",
            value: function() {
                // return new fairygui.GGraph();
            }
        } ]), i;
    }(zs.fgui.base), t.button = function(t) {
        (0, a.default)(l, t);
        var s = h(l);
        function l(t) {
            var i;
            (0, classCallCheck.default)(this, l), i = s.call(this, t), t.width = 300, t.height = 80, t._downEffect = 2, 
            t._downEffectValue = .9, zs.proxy.Event.FGUIButtonTouchBegin(t), t.setPivot(.5, .5, !0), 
            zs.proxy.Event.FGUIOnClick(t, (0, e.default)(i), i.onClicked);
            var n = new fairygui.GLoader();
            n.x = 0, n.y = 0, n.width = t.width, n.height = t.height, n.addRelation(t, fairygui.RelationType.Width), 
            n.addRelation(t, fairygui.RelationType.Height), n.alpha = 1, n.autoSize = !1, n.fill = fairygui.LoaderFillType.ScaleFree, 
            //t.addChild(n), 
            i.icon = n, i.setURL([ zs.fgui.configs.pack_basic, "msg_background" ]);
            var a = new fairygui.GBasicTextField();
            return a.autoSize = fairygui.AutoSizeType.None, a.x = 0, a.y = 0, a.width = t.width, 
            a.height = t.height, a.addRelation(t, fairygui.RelationType.Width), a.addRelation(t, fairygui.RelationType.Height), 
            a.singleLine = !0, a.fontSize = 36, a.align = "center", a.valign = "middle", a.color = zs.proxy.color("#000000"), 
            t.addChild(a), i.title = a, i;
        }
        return (0, u.default)(l, null, [ {
            key: "make",
            value: function() {
                return new fairygui.GButton();
            }
        } ]), (0, u.default)(l, [ {
            key: "dispose",
            value: function() {
                zs.Tween.clearAll(this.view), this.fakeDelayHandler && clearTimeout(this.fakeDelayHandler), 
                this.clickDelayHandler && clearTimeout(this.clickDelayHandler), this.offsetDelayHandler && clearTimeout(this.offsetDelayHandler), 
                (0, igetget.default)((0, getPrototypeOf.default)(l.prototype), "dispose", this).call(this);
            }
        }, {
            key: "setURL",
            value: function(t) {
                var e = this;
                return this.icon && (Array.isArray(t) && t.length > 1 ? zs.fgui.loadPack(t[0]).then(function(i) {
                    e.icon.url = zs.ui.readURL(i, t[1]);
                }).catch(function(t) {
                    return t;
                }) : this.icon.url = t), this;
            }
        }, {
            key: "setAlpha",
            value: function(t) {
                return this.icon && (this.icon.alpha = t), this;
            }
        }, {
            key: "setWidth",
            value: function(t) {
                return this.view.width = t, this;
            }
        }, {
            key: "setHeight",
            value: function(t) {
                return this.view.height = t, this;
            }
        }, {
            key: "setFont",
            value: function(t) {
                return this.title && (this.title.font = t), this;
            }
        }, {
            key: "setFontSize",
            value: function(t) {
                return this.title && (this.title.fontSize = t), this;
            }
        }, {
            key: "setText",
            value: function(t) {
                return this.title && (this.title.text = t), this;
            }
        }, {
            key: "setFontColor",
            value: function(t) {
                return this.title && (this.title.color = zs.proxy.color(t)), this;
            }
        }, {
            key: "setSwitch",
            value: function(t, e) {
                return zs.core.workflow ? this._switch = zs.core.workflow.checkSwitch(t, e) : this._switch = !1, 
                this;
            }
        }, {
            key: "setFill",
            value: function(t) {
                if (this.icon) {
                    var e = fairygui.LoaderFillType.ScaleFree;
                    switch (t) {
                      case "scale":
                        e = fairygui.LoaderFillType.Scale;
                        break;

                      case "height":
                        e = fairygui.LoaderFillType.ScaleMatchHeight;
                        break;

                      case "width":
                        e = fairygui.LoaderFillType.ScaleMatchWidth;
                        break;

                      case "free":
                        e = fairygui.LoaderFillType.ScaleFree;
                        break;

                      case "noborder":
                        e = fairygui.LoaderFillType.ScaleNoBorder;
                        break;

                      case "none":
                        e = fairygui.LoaderFillType.None;
                    }
                    return this.icon.fill = e, this;
                }
            }
        }, {
            key: "setAutoFade",
            value: function(t) {
                return this.autofade = t, this.isFading = !1, this;
            }
        }, {
            key: "setAutoFadeTime",
            value: function(t) {
                return this.autofadetime = t, this;
            }
        }, {
            key: "setAutoOffset",
            value: function(t) {
                return this.autooffset = t, this;
            }
        }, {
            key: "setOffsetX",
            value: function(t) {
                return this.offsetx = t, this;
            }
        }, {
            key: "setOffsetY",
            value: function(t) {
                return this.offsety = t, this;
            }
        }, {
            key: "setOffsetTime",
            value: function(t) {
                return this.offsettime = t, this;
            }
        }, {
            key: "setClickIgnore",
            value: function(t) {
                return this.clickignore = t, this;
            }
        }, {
            key: "setClickAlways",
            value: function(t) {
                return this.clickalways = t, this;
            }
        }, {
            key: "setFakeDelay",
            value: function(t) {
                return this.fakedelay = t, this;
            }
        }, {
            key: "setFakeEvent",
            value: function(t) {
                return this.fakeevent = t, this;
            }
        }, {
            key: "setEvent",
            value: function(t) {
                return this.event = t, this;
            }
        }, {
            key: "onClicked",
            value: function() {
                var t = this;
                if (null == this.autooffset && null == this.autofade && !this.ignoreClick) {
                    this.ignoreClick = !0;
                    var e = !1;
                    if (this.switch && zs.core.workflow && (e = zs.core.workflow.checkSwitch(this.switch)), 
                    e && (this.offsetx || this.offsety)) {
                        var i = this.view.x + (this.offsetx || 0) * this.view.scaleX, s = this.view.y + (this.offsety || 0) * this.view.scaleY;
                        zs.Tween.to(this.view, {
                            x: i,
                            y: s
                        }, this.offsettime || 0, null, zs.Handler.create(this, function() {
                            t.ignoreClick = !1;
                        }), Number(zs.product.get("zs_button_delay_time"))), this.offsetx = null, this.offsety = null, 
                        this.onFakeClicked();
                    } else e && this.clickignore ? (this.clickDelayHandler = setTimeout(function() {
                        t.ignoreClick = !1;
                    }, Number(zs.product.get("zs_button_delay_time"))), this.clickignore = null, this.onFakeClicked()) : (this.clickalways && (this.ignoreClick = !1), 
                    this.event && zs.core.workflow && zs.core.workflow.runEventConfig(this.event));
                }
            }
        }, {
            key: "onFakeClicked",
            value: function() {
                var t = this;
                if (this.fakeevent) {
                    var e = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.fakedelay) : null;
                    !e || "number" != typeof e || e <= 0 ? zs.core.workflow.runEventConfig(this.fakeevent) : (this.readyEvent = this.fakeevent, 
                    this.fakeDelayHandler = setTimeout(function() {
                        zs.core.workflow.runEventConfig(t.readyEvent), t.readyEvent = null;
                    }, e)), this.fakeevent = null;
                }
            }
        }, {
            key: "autoOffset",
            value: function() {
                var t = this, e = !1;
                if (this.switch && zs.core.workflow && (e = zs.core.workflow.checkSwitch(this.switch)), 
                !e || null == this.autooffset || null == this.offsetx && null == this.offsety) this.autooffset = null, 
                this.view.x += (this.offsetx || 0) * this.view.scaleX, this.view.y += (this.offsety || 0) * this.view.scaleY; else {
                    var i = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.autooffset) : null;
                    (!i || "number" != typeof i || i <= 0) && (i = 0);
                    var s = this.view.x + (this.offsetx || 0) * this.view.scaleX, n = this.view.y + (this.offsety || 0) * this.view.scaleY;
                    zs.Tween.to(this.view, {
                        x: s,
                        y: n
                    }, this.offsettime || 0, null, zs.Handler.create(this, function() {
                        t.autooffset = null;
                    }), i), this.clickignore = null, this.offsetx = null, this.offsety = null;
                }
            }
        }, {
            key: "autoFade",
            value: function() {
                var t = this;
                if (null != this.autofade) {
                    var e = zs.core.workflow ? zs.core.workflow.readConfigReturn(this.autofade) : null;
                    (!e || "number" != typeof e || e <= 0) && (e = 0), zs.Tween.to(this.view, {
                        alpha: 1
                    }, this.autofadetime || 0, null, zs.Handler.create(this, function() {
                        t.ignoreClick = !1, t.autofade = null;
                    }), e);
                }
            }
        }, {
            key: "apply",
            value: function() {
                var t = this;
                return null != this.autooffset && null == this.offsetDelayHandler && (this.offsetDelayHandler = setTimeout(function() {
                    t.autoOffset();
                }, 1)), null == this.autofade || this.isFading || (this.view.alpha = 0, this.ignoreClick = !0, 
                this.autoFade(), this.isFading = !0), this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                return t && (t.url && this.setURL(t.url), t.fill && this.setFill(t.fill), null != t.alpha && this.setAlpha(t.alpha), 
                null != t.width && this.setWidth(t.width), null != t.height && this.setHeight(t.height), 
                t.font && this.setFont(t.font), null != t.fontsize && this.setFontSize(t.fontsize), 
                null != t.font_size && this.setFontSize(t.font_size), t.fontcolor && this.setFontColor(t.fontcolor), 
                t.font_color && this.setFontColor(t.font_color), t.text && this.setText(t.text), 
                null != t.autofade && this.setAutoFade(t.autofade), null != t.auto_fade && this.setAutoFade(t.auto_fade), 
                null != t.autofadetime && this.setAutoFadeTime(t.autofadetime), null != t.auto_fade_time && this.setAutoFadeTime(t.auto_fade_time), 
                null != t.autooffset && this.setAutoOffset(t.autooffset), null != t.auto_offset && this.setAutoOffset(t.auto_offset), 
                null != t.offsetx && this.setOffsetX(t.offsetx), null != t.offset_x && this.setOffsetX(t.offset_x), 
                null != t.offsety && this.setOffsetY(t.offsety), null != t.offset_y && this.setOffsetY(t.offset_y), 
                null != t.offsettime && this.setOffsetTime(t.offsettime), null != t.offset_time && this.setOffsetTime(t.offset_time), 
                t.clickignore && this.setClickIgnore(t.clickignore), t.click_ignore && this.setClickIgnore(t.click_ignore), 
                t.clickalways && this.setClickAlways(t.clickalways), t.click_always && this.setClickAlways(t.click_always), 
                null != t.fakedelay && this.setFakeDelay(t.fakedelay), null != t.fake_delay && this.setFakeDelay(t.fake_delay), 
                t.fakeevent && this.setFakeEvent(t.fakeevent), t.fake_event && this.setFakeEvent(t.fake_event), 
                t.event && this.setEvent(t.event), (t.switch || t.check) && this.setSwitch(t.switch, t.check)), 
                this.apply();
            }
        }, {
            key: "url",
            get: function() {
                return this.icon ? this.icon.url : null;
            }
        }, {
            key: "alpha",
            get: function() {
                return this.icon ? this.icon.alpha : null;
            }
        }, {
            key: "width",
            get: function() {
                return this.view.width;
            }
        }, {
            key: "height",
            get: function() {
                return this.view.height;
            }
        }, {
            key: "font",
            get: function() {
                return this.title ? this.title.font : null;
            }
        }, {
            key: "fontsize",
            get: function() {
                return this.title ? this.title.fontSize : 0;
            }
        }, {
            key: "text",
            get: function() {
                return this.title ? this.title.text : null;
            }
        }, {
            key: "fontcolor",
            get: function() {
                return this.title ? this.title.color : null;
            }
        }, {
            key: "switch",
            get: function() {
                return this._switch;
            }
        }, {
            key: "fill",
            get: function() {
                if (!this.icon) return null;
                var t = "free";
                switch (this.icon.fill) {
                  case fairygui.LoaderFillType.None:
                    t = "none";
                    break;

                  case fairygui.LoaderFillType.Scale:
                    t = "scale";
                    break;

                  case fairygui.LoaderFillType.ScaleMatchHeight:
                    t = "height";
                    break;

                  case fairygui.LoaderFillType.ScaleMatchWidth:
                    t = "width";
                    break;

                  case fairygui.LoaderFillType.ScaleFree:
                    t = "free";
                    break;

                  case fairygui.LoaderFillType.ScaleNoBorder:
                    t = "noborder";
                }
                return t;
            }
        } ]), l;
    }(zs.fgui.base), t.full = p, t.AlignType = c, t.AdaptType = s;
}(window.zs.exporter = window.zs.exporter || {});