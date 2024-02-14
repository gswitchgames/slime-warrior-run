
var interopRequireDefault = require("../../@babel/runtime/helpers/interopRequireDefault"),
regenerator = interopRequireDefault(require("../../@babel/runtime/regenerator")),
    r = interopRequireDefault(require("../../@babel/runtime/helpers/asyncToGenerator")),
    stypeof = interopRequireDefault(require("../../@babel/runtime/helpers/typeof")),
    classCallCheck = interopRequireDefault(require("../../@babel/runtime/helpers/classCallCheck")),
    i = interopRequireDefault(require("../../@babel/runtime/helpers/createClass"));
window.zs = window.zs || {}, function (e) {



    var l = function () {
        function e() {
            (0, classCallCheck.default)(this, e), this.switchExporter = "zs_jump_switch", this.exporterPack = null;
        }
        return (0, i.default)(e, [{
            key: "exportWindow",
            get: function () {
                return null == this._exportWindow && (this._exportWindow = zs.fgui.window.create().show()),
                    this._exportWindow;
            }
        }, {
            key: "bannerWindow",
            get: function () {
                // return null == this._bannerWindow && (this._bannerWindow = zs.fgui.window.create().show()),
                //     this._bannerWindow;
            }
        }, {
            key: "fsmList",
            get: function () {
                return null == this._fsmList && (this._fsmList = {}), this._fsmList;
            }
        }, {
            key: "state",
            get: function () {
                return this.fsm ? this.fsm.current : null;
            }
        }, {
            key: "childState",
            get: function () {
                return this.fsm && this.fsmList[this.fsm.current] ? this.fsmList[this.fsm.current].current : null;
            }
        }, {
            key: "eventList",
            get: function () {
                return null == this._eventList && (this._eventList = {}), this._eventList;
            }
        }]), (0, i.default)(e, [{
            key: "registe",
            value: function () {
                var t = this;
                this.fsm = new zs.fsm().registe(zs.workflow.PRODUCT_START, zs.workflow.PRODUCT_BEGIN)
                .registe(zs.workflow.PRODUCT_BEGIN, zs.workflow.GAME_HOME).registe(zs.workflow.GAME_HOME, zs.workflow.PRODUCT_HOME_PLAY).registe(zs.workflow.PRODUCT_HOME_PLAY, zs.workflow.GAME_PLAY).registe(zs.workflow.GAME_PLAY, zs.workflow.PRODUCT_PLAY_END).registe(zs.workflow.PRODUCT_PLAY_END, zs.workflow.GAME_END).registe(zs.workflow.GAME_END, zs.workflow.PRODUCT_FINISH).registe(zs.workflow.PRODUCT_FINISH, zs.workflow.PRODUCT_BEGIN).setDefault(zs.workflow.PRODUCT_START),
                    this.registeEvent(e.eventNext, this, function (e) {
                        t.next(e);
                    }), this.registeEvent(e.eventChildNext, this, function (e) {
                        t.childNext(e);
                    }), this.registeEvent(e.eventCreateBase, this, function (e) {
                        t.createBase(e);
                    }), this.registeEvent(e.eventCloseBase, this, function (e) {
                        t.exportWindow.detach(e);
                    });
            }
        }, {
            key: "start",
            value: function () {
                this.fsm && (this.fsm.onBeforeChange = zs.Handler.create(this, this.onBeforeChange, null, !1),
                    this.fsm.onChanged = zs.Handler.create(this, this.onChanged, null, !1)), zs.fgui.configs.registeBase(e.exporterList, zs.exporter.list),
                    zs.fgui.configs.registeBase(e.exporterCard, zs.exporter.card), zs.fgui.configs.registeBase(e.exporterBackground, zs.exporter.background),
                    zs.fgui.configs.registeBase(e.exporterLoader, zs.exporter.loader), zs.fgui.configs.registeBase(e.exporterButton, zs.exporter.button),
                    a.addAppShow(zs.Handler.create(this, zs.platform.sync.clearDelayBanner, null, !1)),
                    this.fsm.init();
            }
        }, {
            key: "setFSM",
            value: function (e, t) {
                this.fsmList[e.trim()] = t;
            }
        }, {
            key: "registeEvent",
            value: function (e, t, r) {
                for (var s = arguments.length, n = new Array(s > 3 ? s - 3 : 0), i = 3; i < s; i++) n[i - 3] = arguments[i];
                this.eventList[e.trim()] = {
                    caller: t,
                    func: r,
                    args: n
                };
            }
        }, {
            key: "applyEvent",
            value: function (e, t) {
                var r = this.eventList[e.trim()];
                r && r.func && r.func.apply(r.caller, t && t.length > 0 ? t : r.args);
            }
        }, {
            key: "applyEventReturn",
            value: function (e, t) {
                var r = this.eventList[e.trim()];
                return r && r.func ? r.func.apply(r.caller, t && t.length > 0 ? t : r.args) : null;
            }
        }, {
            key: "callEvent",
            value: function (e) {
                for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) r[s - 1] = arguments[s];
                this.applyEvent(e, r);
            }
        }, {
            key: "callEventReturn",
            value: function (e) {
                for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) r[s - 1] = arguments[s];
                return this.applyEventReturn(e, r);
            }
        }, {
            key: "readConfigReturn",
            value: function (e) {
                if (null == e || null == e) return null;
                var t = null, r = (0, stypeof.default)(e);
                if ("number" === r || "boolean" === r || Array.isArray(e)) t = e; else if ("object" === r) for (var n in e) {
                    var i = e[n];
                    null == i || null == i || Array.isArray(i) || (i = [i]), t = this.applyEventReturn(n, i);
                    break;
                } else "string" === r && (t = this.applyEventReturn(e));
                return t;
            }
        }, {
            key: "runEventConfig",
            value: function (e) {
                if (null != e && null != e) {
                    var t = (0, stypeof.default)(e);
                    if ("string" === t) this.callEvent(e); else if (Array.isArray(e)) for (var r = 0, n = e.length; r < n; r++) this.runEventConfig(e[r]); else if ("object" == t) for (var i in e) {
                        var l = e[i];
                        Array.isArray(l) || null == l || null == l || (l = [l]), this.applyEvent(i, l);
                    }
                }
            }
        }, {
            key: "registeChildFSM",
            value: function () {
                var e = zs.configs.productCfg;
                for (var t in e) if (t = t.trim(), !this.fsmList[t]) {
                    var r = e[t].states;
                    if (r && !(r.length <= 0)) {
                        for (var s = null, n = null, i = new zs.fsm(), l = 0, a = r.length; l < a; l++) {
                            var o = r[l];
                            null != o && "string" == typeof o && ((o = o.trim()).length <= 0 || (s ? (i.registe(n, o),
                                n = o) : (s = o, n = o)));
                        }
                        if (s) {
                            i.setDefault(s);
                            var h = e[t].substates;
                            if (h && Array.isArray(h)) for (var u = 0, f = h.length; u < f; u++) {
                                var c = h[u];
                                if (null != c && Array.isArray(c) && !(c.length <= 1)) for (var g = null, p = 0, d = c.length; p < d; p++) {
                                    var k = c[p];
                                    null != k && "string" == typeof k && ((k = k.trim()).length <= 0 || i.getState(g, k) || (g && i.registe(g, k, null != i.list[g] ? -1 : 0),
                                        g = k));
                                }
                            }
                            this.fsmList[t] = i;
                        }
                    }
                }
            }
        }, {
            key: "on",
            value: function (e, t, r, s) {
                if (!(null == e || e.trim().length <= 0 || null == t)) {
                    e = e.trim(), t.once = !1, s = s || 0, t.priority = s;
                    var n = -1, i = null;
                    if (r ? (null == this.preListeners && (this.preListeners = {}), null == this.preListeners[e] && (this.preListeners[e] = []),
                        i = this.preListeners[e]) : (null == this.listeners && (this.listeners = {}), null == this.listeners[e] && (this.listeners[e] = []),
                            i = this.listeners[e]), i) {
                        for (var l = 0, a = i.length; l < a; l++) {
                            if (i[l]._id == t._id) return;
                            var o = i[l].priority || 0;
                            if (n < 0 && s > o) {
                                n = l;
                                break;
                            }
                        }
                        n < 0 ? i.push(t) : i.splice(n, 0, t);
                    }
                }
            }
        }, {
            key: "onLater",
            value: function (e, t, r, s) {
                if (!(null == e || e.trim().length <= 0 || null == t)) {
                    e = e.trim(), t.once = !1, s = s || 0, t.priority = s;
                    var n = -1, i = null;
                    if (r ? (null == this.laterPreListeners && (this.laterPreListeners = {}), null == this.laterPreListeners[e] && (this.laterPreListeners[e] = []),
                        i = this.laterPreListeners[e]) : (null == this.laterListeners && (this.laterListeners = {}),
                            null == this.laterListeners[e] && (this.laterListeners[e] = []), i = this.laterListeners[e]),
                        i) {
                        for (var l = 0, a = i.length; l < a; l++) {
                            if (i[l]._id == t._id) return;
                            var o = i[l].priority || 0;
                            if (n < 0 && s > o) {
                                n = l;
                                break;
                            }
                        }
                        n < 0 ? i.push(t) : i.splice(n, 0, t);
                    }
                }
            }
        }, {
            key: "once",
            value: function (e, t, r, s) {
                this.on(e, t, r, s), t && (t.once = !0);
            }
        }, {
            key: "onceLater",
            value: function (e, t, r, s) {
                this.onLater(e, t, r, s), t && (t.once = !0);
            }
        }, {
            key: "off",
            value: function (e, t, r) {
                if (!(null == e || e.trim().length <= 0 || null == t)) if (e = e.trim(), r) {
                    if (null == this.preListeners) return;
                    if (null == this.preListeners[e]) return;
                    for (var s = this.preListeners[e], n = 0, i = s.length; n < i; n++) if (s[n]._id == t._id) return void s.splice(n, 1);
                } else {
                    if (null == this.listeners) return;
                    if (null == this.listeners[e]) return;
                    for (var l = this.listeners[e], a = 0, o = l.length; a < o; a++) if (l[a]._id == t._id) return void l.splice(a, 1);
                }
            }
        }, {
            key: "offLater",
            value: function (e, t, r) {
                if (!(null == e || e.trim().length <= 0 || null == t)) if (e = e.trim(), r) {
                    if (null == this.laterPreListeners) return;
                    if (null == this.laterPreListeners[e]) return;
                    for (var s = this.laterPreListeners[e], n = 0, i = s.length; n < i; n++) if (s[n]._id == t._id) return void s.splice(n, 1);
                } else {
                    if (null == this.laterListeners) return;
                    if (null == this.laterListeners[e]) return;
                    for (var l = this.laterListeners[e], a = 0, o = l.length; a < o; a++) if (l[a]._id == t._id) return void l.splice(a, 1);
                }
            }
        }, {
            key: "offAll",
            value: function (e, t) {
                if (!(null == e || e.trim().length <= 0)) if (e = e.trim(), t) {
                    if (null == this.preListeners) return;
                    if (null == this.preListeners[e]) return;
                    delete this.preListeners[e];
                } else {
                    if (null == this.listeners) return;
                    if (null == this.listeners[e]) return;
                    delete this.listeners[e];
                }
            }
        }, {
            key: "offAllLater",
            value: function (e, t) {
                if (!(null == e || e.trim().length <= 0)) if (e = e.trim(), t) {
                    if (null == this.laterPreListeners) return;
                    if (null == this.laterPreListeners[e]) return;
                    delete this.laterPreListeners[e];
                } else {
                    if (null == this.laterListeners) return;
                    if (null == this.laterListeners[e]) return;
                    delete this.laterListeners[e];
                }
            }
        }, {
            key: "offAllCaller",
            value: function (e, t, r) {
                if (null != e) if (null == t || t.trim().length <= 0) if (r) for (var s in this.preListeners) for (var n = this.preListeners[s], i = 0, l = n.length; i < l; i++) n[i].caller == e && (n.splice(i, 1),
                    i--, l--); else for (var a in this.listeners) for (var o = this.listeners[a], h = 0, u = o.length; h < u; h++) o[h].caller == e && (o.splice(h, 1),
                        h--, u--); else if (t = t.trim(), r) {
                            var f = this.preListeners[t];
                            if (f) for (var c = 0, g = f.length; c < g; c++) f[c].caller == e && (f.splice(c, 1),
                                c--, g--);
                        } else {
                    var p = this.listeners[t];
                    if (p) for (var d = 0, k = p.length; d < k; d++) p[d].caller == e && (p.splice(d, 1),
                        d--, k--);
                }
            }
        }, {
            key: "offAllCallerLater",
            value: function (e, t, r) {
                if (null != e) if (null == t || t.trim().length <= 0) if (r) for (var s in this.laterPreListeners) for (var n = this.laterPreListeners[s], i = 0, l = n.length; i < l; i++) n[i].caller == e && (n.splice(i, 1),
                    i--, l--); else for (var a in this.laterListeners) for (var o = this.laterListeners[a], h = 0, u = o.length; h < u; h++) o[h].caller == e && (o.splice(h, 1),
                        h--, u--); else if (t = t.trim(), r) {
                            var f = this.laterPreListeners[t];
                            if (f) for (var c = 0, g = f.length; c < g; c++) f[c].caller == e && (f.splice(c, 1),
                                c--, g--);
                        } else {
                    var p = this.laterListeners[t];
                    if (p) for (var d = 0, k = p.length; d < k; d++) p[d].caller == e && (p.splice(d, 1),
                        d--, k--);
                }
            }
        }, {
            key: "clear",
            value: function (e) {
                e ? this.preListeners = null : this.listeners = null;
            }
        }, {
            key: "clearLater",
            value: function (e) {
                e ? this.laterPreListeners = null : this.laterListeners = null;
            }
        }, {
            key: "next",
            value: function (e) {
                console.log("---------------------------------");
                // console.log(e);
                this.wantNext = 1, this.nextTarget = e, this.step();
            }
        }, {
            key: "childNext",
            value: function (e) {
                this.wantNext || (this.wantNext = 2, this.nextTarget = e, this.step());
            }
        },  {
            key: "returnFsm",
            value: function () {
                return this.fsm;
            }
        }, {
            key: "step",
            value: function () {
                if (!this.lockStep) {
                    console.log("_____step______");
                    var e = this.nextTarget, t = this.wantNext;
                    switch (this.wantNext = 0, this.nextTarget = null, t) {
                        case 1:
                            if (null != this.fsm) {
                                var r = this.fsm.current;
                                // console.log(this.fsm.runNext);
                                e ? this.fsm.runTransition(e) || zs.log.error("无法执行从 " + r + " 到 " + e + " 的工作流，请检查是否完整注册流程!", "Core") :
                                    this.fsm.runNext() || zs.log.error("无法执行 " + r + " 的后续工作流，请检查是否完整注册流程!", "Core");
                            }
                            break;

                        case 2:
                            if (null != this.fsm) {
                                // var s = this.fsmList[this.fsm.current], n = !1;
                                // if (s && (e && !s.runTransition(e) || !e && !s.runNext()) && (this.onChildFSMBeforeChanged(null, s.current),
                                //     n = !0), !s || n) {
                                //     var i = this.fsm.current;
                                //     this.fsm.runNext() || zs.log.error("无法执行 " + i + " 的后续工作流，请检查是否完整注册流程!", "Core");
                                // }
                                this.fsm.runNext()
                            }
                    }
                }
            }
        }, {
            key: "onBeforeChange",
            value: function (e, t) {
                if (zs.product.synced || zs.network.config(!0).catch(function (e) {
                    return e;
                }).then(function (e) {
                    null == e || e.length <= 0 ? zs.td.justTrack("请求配置数据失败", "请求配置数据失败") : (zs.td.justTrack("请求配置数据成功", "请求配置数据成功"),
                        zs.product.sync(e), zs.fgui.msgtext.hide());
                }), "wx_" == zs.platform.config.platformMark && zs.exporter.dataMgr.load(), this.lockStep = !0,
                    null != this.preListeners && null != this.preListeners[e]) for (var r = this.preListeners[e], s = 0, n = r.length; s < n; s++) {
                        var i = r[s].once;
                        r[s].run(), i && (r.splice(s, 1), s--, n--);
                    }
                if (this.checkExitEvent(t), this.exportWindow.clear(), zs.platform.sync.hideBanner(),
                    zs.platform.sync.clearDelayBanner(), null != this.laterPreListeners && null != this.laterPreListeners[e]) for (var l = this.laterPreListeners[e], a = 0, o = l.length; a < o; a++) {
                        var h = l[a].once;
                        l[a].run(), h && (l.splice(a, 1), a--, o--);
                    }
                this.lockStep = !1, this.step();
            }
        }, {
            key: "checkSwitch",
            value: function (e, t) {
                var r = !0;
                if (e) if ("boolean" == typeof e) r = e; else if (Array.isArray(e)) for (var n = 0, i = e.length; n < i; n++) {
                    var l = e[n];
                    if (l && !(l.length <= 0)) if ("!" == l[0] || "！" == l[0]) {
                        if (!(l.length > 1)) {
                            r = !1;
                            break;
                        }
                        if (l = l.slice(1, l.length), zs.product.get(l)) {
                            r = !1;
                            break;
                        }
                    } else if (!zs.product.get(l)) {
                        r = !1;
                        break;
                    }
                } else if ("string" == typeof (0, stypeof.default)(e)) {
                    var a = e;
                    a && a.length > 0 && ("!" == a[0] || "！" == a[0] ? a.length > 1 ? (a = a.slice(1, a.length),
                        zs.product.get(a) && (r = !1)) : r = !1 : zs.product.get(a) || (r = !1));
                }
                return !!r && (t && (r = this.readConfigReturn(t)), r);
            }
        }, {
            key: "onChanged",
            value: function (e) {
                this.lockStep = !0, zs.td.justTrack(zs.td.workflowKey + e, zs.td.workflowDesc + e);
                var t = zs.configs.productCfg[e], r = !1;
                t && (t.switch || t.check) && (r = !this.checkSwitch(t.switch, t.check));
                var s = this.fsmList[e];
                if (r) this.next(); else {
                    if (null != this.listeners && null != this.listeners[e]) for (var n = this.listeners[e], i = 0, l = n.length; i < l; i++) {
                        var a = n[i].once;
                        n[i].run(), a && (n.splice(i, 1), i--, l--);
                    }
                    if (this.checkEvent(e), s ? (s.onBeforeChange = zs.Handler.create(this, this.onChildFSMBeforeChanged, null, !1),
                        s.onChanged = zs.Handler.create(this, this.onChildFSMChanged, null, !1), s.init(),
                        zs.configs.productCfg[e] && zs.log.info(e + " 状态存在子状态机，无法自动创建应用运营配置，请使用子状态进行配置!", "Workflow", s.list)) : (this.checkBase(e),
                            zs.product.get(this.switchExporter) && this.checkExporter(e), this.checkBanner(e)),
                        this.checkLaterEvent(e), null != this.laterListeners && null != this.laterListeners[e]) for (var o = this.laterListeners[e], h = 0, u = o.length; h < u; h++) {
                            var f = o[h].once;
                            o[h].run(), f && (o.splice(h, 1), h--, u--);
                        }
                }
                this.lockStep = !1, this.step();
            }
        }, {
            key: "onChildFSMBeforeChanged",
            value: function (e, t) {
                if (null != this.fsm) {
                    this.lockStep = !0;
                    var r = this.fsm.current + "." + e;
                    if (null != this.preListeners && null != this.preListeners[r]) for (var s = this.preListeners[r], n = 0, i = s.length; n < i; n++) {
                        var l = s[n].once;
                        s[n].run(), l && (s.splice(n, 1), n--, i--);
                    }
                    if (this.checkExitEvent(this.fsm.current + "." + t), this.exportWindow.clear(),
                        zs.platform.sync.hideBanner(), zs.platform.sync.clearDelayBanner(), null != this.laterPreListeners && null != this.laterPreListeners[r]) for (var a = this.laterPreListeners[r], o = 0, h = a.length; o < h; o++) {
                            var u = a[o].once;
                            a[o].run(), u && (a.splice(o, 1), o--, h--);
                        }
                    this.lockStep = !1, this.step();
                }
            }
        }, {
            key: "onChildFSMChanged",
            value: function (e) {
                if (null != this.fsm) {
                    this.lockStep = !0;
                    var t = this.fsm.current + "." + e;
                    zs.td.justTrack(zs.td.workflowKey + t, zs.td.workflowDesc + t);
                    var r = zs.configs.productCfg[t], s = !1;
                    if (r && (r.switch || r.check) && (s = !this.checkSwitch(r.switch, r.check)), s) this.childNext(); else {
                        if (null != this.listeners && null != this.listeners[t]) for (var n = this.listeners[t], i = 0, l = n.length; i < l; i++) {
                            var a = n[i].once;
                            n[i].run(), a && (n.splice(i, 1), i--, l--);
                        }
                        if (this.checkEvent(t), this.checkBase(t), zs.product.get(this.switchExporter) && this.checkExporter(t),
                            this.checkBanner(t), this.checkLaterEvent(t), null != this.laterListeners && null != this.laterListeners[t]) for (var o = this.laterListeners[t], h = 0, u = o.length; h < u; h++) {
                                var f = o[h].once;
                                o[h].run(), f && (o.splice(h, 1), h--, u--);
                            }
                    }
                    this.lockStep = !1, this.step();
                }
            }
        }, {
            key: "checkEvent",
            value: function (e) {
                var t = zs.configs.productCfg[e];
                t && t.event && this.runEventConfig(t.event);
            }
        }, {
            key: "checkLaterEvent",
            value: function (e) {
                var t = zs.configs.productCfg[e];
                t && t.laterevent && this.runEventConfig(t.laterevent);
            }
        }, {
            key: "checkExitEvent",
            value: function (e) {
                var t = zs.configs.productCfg[e];
                t && t.exitevent && this.runEventConfig(t.exitevent);
            }
        }, {
            key: "showPreviewBanner",
            value: function (e) {
                // var t = this, r = e ? e.pos : null, s = e ? e.size : null, n = e ? e.checkInit : null, i = e && null != e.isWait ? e.isWait : null, l = r && r.right ? r.right : null, a = r && r.bottom ? r.bottom : null;
                // r && r.left && (l = -r.left), r && r.top && (a = -r.top), e && e.empty ? s = {
                //     width: zs.configs.gameCfg.debug ? 10 : 1,
                //     height: zs.configs.gameCfg.debug ? 10 : 1
                // } : null == s && (s = {
                //     width: zs.platform.config.bannerWidth || 600,
                //     height: zs.platform.config.bannerHeight || 200
                // }), n ? this.banner || (this.bannerWindow.attach(zs.exporter.banner).update(zs.exporter.banner, function (e) {
                //     t.banner = e, s && (s.width && e.setWidth(s.width), s.height && e.setHeight(s.height)),
                //         t.banner.view.visible = !i;
                // }, this), e && e.empty ? this.bannerWindow.align(zs.fgui.AlignType.TopLeft) : this.bannerWindow.align(zs.fgui.AlignType.Bottom, l, a),
                //     this.bannerWindow.show().front()) : this.banner && (s && (s.width && this.banner.setWidth(s.width),
                //         s.height && this.banner.setHeight(s.height)), this.bannerWindow.setBase(this.banner),
                //         e && e.empty ? this.bannerWindow.align(zs.fgui.AlignType.TopLeft) : this.bannerWindow.align(zs.fgui.AlignType.Bottom, l, a),
                //         this.bannerWindow.show().front(), this.banner.view.visible = !0);
            }
        }, {
            key: "hidePreviewBanner",
            value: function () {
                // this.banner && (this.bannerWindow.detach(this.banner), this.banner = null);
            }
        }, {
            key: "checkBanner",
            value: function (e) {
                // var t = zs.configs.productCfg[e], r = zs.product.get("zs_skip_empty_banner") || "wx_" != zs.platform.config.platformMark;
                // if (t && t.banner) {
                //     if (this.bannerIgnoreList && this.bannerIgnoreList.indexOf(e) >= 0) return zs.log.info("状态 " + e + " 在横幅广告忽略列表中，无法自动生成，请自主管理横幅广告展示或将该状态移出忽略列表", "Workflow"),
                //         void (!r && zs.platform.sync.updateBanner({
                //             empty: !0,
                //             checkInit: !0
                //         }));
                //     if ((t.banner.switch || t.banner.check) && !this.checkSwitch(t.banner.switch, t.banner.check)) return void (!r && zs.platform.sync.updateBanner({
                //         empty: !0,
                //         checkInit: !0
                //     }));
                //     zs.platform.sync.checkBanner({
                //         data: t
                //     });
                // } else !r && zs.platform.sync.updateBanner({
                //     empty: !0,
                //     checkInit: !0
                // });
            }
        }, {
            key: "checkExporter",
            value: function (e) {
                var t = zs.configs.productCfg[e];
                if (this.exporterIgnoreList && this.exporterIgnoreList.indexOf(e) >= 0) t && t.exporter && t.exporter.length > 0 && zs.log.info("状态 " + e + " 在导出忽略列表中，无法自动生成，请自主管理导出展示或将该状态移出忽略列表", "Workflow"); else if (t && t.exporter) {
                    var r = t.exporter;
                    if (Array.isArray(r) && r.length > 0) for (var n = 0, i = t.exporter.length; n < i; n++) {
                        var l = t.exporter[n];
                        l && (!l.switch && !l.check || this.checkSwitch(l.switch, l.check)) && this.exportWindow.applyConfig(l).front();
                    } else "object" == (0, stypeof.default)(r) && (!r.switch && !r.check || this.checkSwitch(r.switch, r.check)) && this.exportWindow.applyConfig(r).front();
                }
            }
        }, {
            key: "checkBase",
            value: function (e) {
                var t = zs.configs.productCfg[e];
                if (t && t.base) {
                    var r = t.base;
                    if (Array.isArray(r) && r.length > 0) for (var n = 0, i = t.base.length; n < i; n++) {
                        var l = t.base[n];
                        l && (!l.switch && !l.check || this.checkSwitch(l.switch, l.check)) && this.exportWindow.applyConfig(l).front();
                    } else "object" == (0, stypeof.default)(r) && (!r.switch && !r.check || this.checkSwitch(r.switch, r.check)) && this.exportWindow.applyConfig(r).front();
                }
            }
        }, {
            key: "createBase",
            value: function (e) {
                var t = zs.configs.uiCfg.base[e];
                return t && this.checkSwitch(t.switch, t.check) ? this.exportWindow.applyConfig(t).front().getBase() : null;
            }
        }]), e;
    }();
    l.exporterList = "export_list", l.exporterCard = "export_card", l.exporterBackground = "export_background",
        l.exporterLoader = "export_loader", l.exporterButton = "export_button", l.eventNext = "event_next",
        l.eventChildNext = "event_childnext", l.eventCreateBase = "event_createbase", l.eventCloseBase = "event_closebase",
        l.PRODUCT_START = "PRODUCT_START", l.PRODUCT_BEGIN = "PRODUCT_BEGIN", l.GAME_HOME = "GAME_HOME",
        l.PRODUCT_HOME_PLAY = "PRODUCT_HOME_PLAY", l.GAME_PLAY = "GAME_PLAY", l.PRODUCT_PLAY_END = "PRODUCT_PLAY_END",
        l.GAME_END = "GAME_END", l.PRODUCT_FINISH = "PRODUCT_FINISH";
    var a = function () {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        var s, l;
        return (0, i.default)(e, null, [{
            key: "registeBase",
            value: function (e, t) {
                zs.fgui.configs.registeBase(e, t);
            }
        }, {
            key: "unregisteBase",
            value: function (e) {
                zs.fgui.configs.unregisteBase(e);
            }
        }, {
            key: "registeItem",
            value: function (e, t) {
                zs.fgui.configs.registeItem(e, t);
            }
        }, {
            key: "unregisteItem",
            value: function (e) {
                zs.fgui.configs.unregisteItem(e);
            }
        }, {
            key: "init",
            value: (l = (0, r.default)(regenerator.default.mark(function r(s) {
                var n;
                return regenerator.default.wrap(function (t) {
                    for (; ;) switch (t.prev = t.next) {
                        case 0:
                            return zs.proxy.init(), zs.Timer.gTimer = new zs.Timer(), window.requestAnimationFrame(function e(t) {
                                zs.Timer.gTimer._update(),
                                    zs.Timer.inst._update(),
                                    window.requestAnimationFrame(e);
                            }), zs.platform.init()
                                , zs.platform.sync.addEventShow({
                                    showHandler: function (t) {
                                        e.onAppShow(t);
                                    }
                                })
                                , zs.platform.sync.addEventHide({
                                    hideHandler: function (t) {
                                        e.onAppHide(t);
                                    }
                                })
                                , t.next = 8, zs.configs.init().catch(function (e) {
                                    return e;
                                });

                        case 8:
                            if (zs.configs.gameCfg.debug &&
                                (zs.log.Configs.logLevel = zs.log.Level.DEBUG),
                                zs.platform.proxy && "wx_" == zs.platform.config.platformMark && "undefined" != typeof wx && zs.exporter.dataMgr.collectSource(),
                                zs.td.appKey = this.tdKey, zs.td.appName = this.appName, zs.td.appId = this.appId,
                                zs.configs.gameCfg.tdVersion &&
                                (zs.td.versionName = zs.configs.gameCfg.tdVersion),
                                zs.td.init(), zs.td.justTrack(zs.td.startupKey, zs.td.startupDesc), zs.resource.init(),
                                this.onConfigInit && this.onConfigInit.run(), zs.product.init(s), this._readyStart = !1,
                                //))))))))))))))))))))))))))))))))))
                                zs.fgui.init(), 
                                n = this.entry ? this.entry : zs.base.entry, !this.loadingPage) {
                                t.next = 28;
                                break;
                            }
                            return t.next = 25, this.loadingPage.preload().catch(function (e) {
                                return e;
                            });

                        case 25:
                            this.entryInst = n.init(this.loadingPage, this, this.ready), t.next = 35;
                            break;

                        case 28:
                            if (!this.layaLoadingPage) {
                                t.next = 34;
                                break;
                            }
                            return t.next = 31, this.layaLoadingPage.preload().catch(function (e) {
                                return e;
                            });

                        case 31:
                            this.entryInst = n.init(this.layaLoadingPage, this, this.ready), t.next = 35;
                            break;

                        case 34:
                            this.entryInst = null, this.ready();

                        case 35:
                        case "end":
                            return t.stop();
                    }
                }, r, this);
            })), function (e) {
                return l.apply(this, arguments);
            })
        }, {
            key: "ready",
            value: (s = (0, r.default)(regenerator.default.mark(function r() {
                var s, n, i, l, a, o, h, u, f, c, g, p, d, k;
                return regenerator.default.wrap(function (r) {
                    for (; ;) switch (r.prev = r.next) {
                        case 0:
                            return zs.log.debug("web 设置", "Core"), r.next = 3, zs.network.init().catch(function (e) {
                                return e;
                            });

                        case 3:
                            if (e.userInfo = r.sent, e.userId = e.userInfo.user_id, r.t0 = "wx_" == zs.platform.config.platformMark,
                                !r.t0) {
                                r.next = 9;
                                break;
                            }
                            return r.next = 9, zs.exporter.dataMgr.load();

                        case 9:
                            return this.progress = 10, zs.log.debug("运营设置", "Core"), zs.td.justTrack("请求配置数据", "请求配置数据"),
                                r.next = 14, zs.network.config(!0).catch(function (e) {
                                    return e;
                                });

                        case 14:
                            if (null == (s = r.sent) || s.length <= 0 ? zs.td.justTrack("请求配置数据失败", "请求配置数据失败") : zs.td.justTrack("请求配置数据成功", "请求配置数据成功"),
                                zs.product.sync(s), !(n = zs.product.get("zs_sync_product")) || "0" == n) {
                                r.next = 22;
                                break;
                            }
                            return r.next = 20, zs.network.jsonConfig("productCfg,uiCfg").catch(function (e) {
                                return e;
                            });

                        case 20:
                            (i = r.sent) && i.productCfg && (zs.configs.productCfg = i.productCfg), i && i.uiCfg && (zs.configs.uiCfg = i.uiCfg);

                        case 22:
                            return this.progress = 20, zs.log.debug("初始化广告与导出组件", "Core"), r.next = 25, zs.fgui.loadPack(zs.fgui.configs.pack_basic).catch(function (e) {
                                return e;
                            });

                        case 25:
                            return l = r.sent, zs.ui.FGUI_msgbox.bind(l), zs.ui.FGUI_list.bind(l), this.progress = 30,
                                zs.log.debug("加载必要分包", "Core"), r.next = 32, zs.resource.preload().catch(function (e) {
                                    return e;
                                });

                        case 32:
                            console.log("(zs.configs.gameCfg.fguiPacks",zs.configs.gameCfg.fguiPacks)
                            return this.progress = 40, zs.log.debug("加载 main", "Core"), r.next = 36, 
                            zs.fgui.loadPacks(zs.configs.gameCfg.fguiPacks, !0).catch(function (e) {
                                return e;
                            });

                        case 36:
                            return this.onFGUIBind && this.onFGUIBind.run(), this.progress = 50, zs.log.debug("初始化数据统计", "Core"),
                                r.next = 41, zs.td.registeConfig(zs.configs.gameCfg.tdConfig).catch(function (e) {
                                    return e;
                                });

                        case 41:
                            if (zs.EggKnock && (zs.EggKnock.init(), zs.core.onWorkflow(zs.workflow.PRODUCT_PLAY_END, zs.Handler.create(this, function () {
                                zs.EggKnock.markGameNum(!0);
                            }), !0)), this.progress = 60, zs.log.debug("加载基础配置", "Core"), !(zs.configs.gameCfg && zs.configs.gameCfg.resources && zs.configs.gameCfg.resources.configs)) {
                                r.next = 65;
                                break;
                            }
                            a = zs.configs.gameCfg.resources.configs, r.t1 = regenerator.default.keys(a);

                        case 47:
                            if ((r.t2 = r.t1()).done) {
                                r.next = 65;
                                break;
                            }
                            if (o = r.t2.value, h = a[o], r.t3 = h, !r.t3) {
                                r.next = 63;
                                break;
                            }
                            if (!Array.isArray(h)) {
                                r.next = 59;
                                break;
                            }
                            if (r.t4 = h.length > 0 && null != h[0] && h[0].trim().length > 0, !r.t4) {
                                r.next = 57;
                                break;
                            }
                            return r.next = 57, zs.configs.load(o, h[0], h.length > 1 ? h[1] : null, !(h.length > 2) || h[2]).catch(function (e) {
                                return e;
                            });

                        case 57:
                            r.next = 63;
                            break;

                        case 59:
                            if (r.t5 = "string" == typeof h, !r.t5) {
                                r.next = 63;
                                break;
                            }
                            return r.next = 63, zs.configs.load(o, h, null, !0).catch(function (e) {
                                return e;
                            });

                        case 63:
                            r.next = 47;
                            break;

                        case 65:
                            if (this.progress = 70, !(zs.configs.gameCfg && zs.configs.gameCfg.resources && zs.configs.gameCfg.resources.prefabs)) {
                                r.next = 86;
                                break;
                            }
                            u = zs.configs.gameCfg.resources.prefabs, r.t6 = regenerator.default.keys(u);

                        case 68:
                            if ((r.t7 = r.t6()).done) {
                                r.next = 86;
                                break;
                            }
                            if (f = r.t7.value, c = u[f], r.t8 = c, !r.t8) {
                                r.next = 84;
                                break;
                            }
                            if (!Array.isArray(c)) {
                                r.next = 80;
                                break;
                            }
                            if (r.t9 = c.length > 0 && null != c[0] && c[0].trim().length > 0, !r.t9) {
                                r.next = 78;
                                break;
                            }
                            return r.next = 78, zs.prefabs.load(f, c[0], c.length > 1 ? c[1] : null, !(c.length > 2) || c[2]).catch(function (e) {
                                return e;
                            });

                        case 78:
                            r.next = 84;
                            break;

                        case 80:
                            if (r.t10 = "string" == typeof c, !r.t10) {
                                r.next = 84;
                                break;
                            }
                            return r.next = 84, zs.prefabs.load(f, c, null, !0).catch(function (e) {
                                return e;
                            });

                        case 84:
                            r.next = 68;
                            break;

                        case 86:
                            if (this.progress = 80, zs.log.debug("广告组件初始化", "Core"), g = e.userId % zs.configs.gameCfg.adsGroup * 2,
                                zs.platform.initAds({
                                    num: zs.configs.gameCfg.adsNum,
                                    idx: g
                                }), this.progress = 85, zs.log.debug("业务流程拼装", "Core"), this.progress = 95, null == this.workflow && (this.workflow = new zs.workflow()),
                                r.t11 = this.workflow.exporterPack, !r.t11) {
                                r.next = 102;
                                break;
                            }
                            if (!Array.isArray(this.workflow.exporterPack)) {
                                r.next = 100;
                                break;
                            }
                            return r.next = 98, zs.fgui.loadPacks(this.workflow.exporterPack).catch(function (e) {
                                return e;
                            });

                        case 98:
                            r.next = 102;
                            break;

                        case 100:
                            return r.next = 102, zs.fgui.loadPack(this.workflow.exporterPack).catch(function (e) {
                                return e;
                            });

                        case 102:
                            if (this.workflow.registe(), this.workflow.registeChildFSM(), !this.workListeners) {
                                r.next = 107;
                                break;
                            }
                            for (p = 0, d = this.workListeners.length; p < d; p++) (k = this.workListeners[p]).handler.once ? k.later ? this.workflow.onceLater(k.key, k.handler, k.isBefore) : this.workflow.once(k.key, k.handler, k.isBefore) : k.later ? this.workflow.onLater(k.key, k.handler, k.isBefore) : this.workflow.on(k.key, k.handler, k.isBefore);
                            this.workListeners = null;

                        case 107:
                            this.checkGameCfg(s), this.onPrepare ? this.onPrepare.run() : this.readyFinish();

                        case 108:
                        case "end":
                            return r.stop();
                    }
                }, r, this);
            })), function () {
                return s.apply(this, arguments);
            })
        }, {
            key: "readyFinish",
            value: function () {
                this.checkPanelSort(), zs.Timer.inst.frameLoop(1, this, this.step), this.progress = 100,
                    this._readyStart = !0, this.loadingPage || this.layaLoadingPage || this.start();
            }
        }, {
            key: "step",
            value: function () {
                this.checkPanelSort();
            }
        }, {
            key: "start",
            value: function () {
                zs.log.debug("启动业务", "Core"), this.readyStart && (this.workflow.start(), this.onStart && this.onStart.run(),
                    zs.td.justTrack(zs.td.gameStartKey, zs.td.gameStartDesc, {
                        uid: e.userId
                    }));
            }
        }, {
            key: "onWorkflow",
            value: function (e, t, r, s) {
                null == e || e.length <= 0 || null == t || (null == this.workListeners && (this.workListeners = []),
                    this.workflow ? this.workflow.on(e, t, r, s) : (t.once = !1, this.workListeners.push({
                        key: e,
                        handler: t,
                        priority: s,
                        isBefore: r
                    })));
            }
        }, {
            key: "onWorkflowLater",
            value: function (e, t, r, s) {
                null == e || e.length <= 0 || null == t || (null == this.workListeners && (this.workListeners = []),
                    this.workflow ? this.workflow.onLater(e, t, r, s) : (t.once = !1, this.workListeners.push({
                        key: e,
                        handler: t,
                        priority: s,
                        isBefore: r,
                        later: !0
                    })));
            }
        }, {
            key: "onceWorkflow",
            value: function (e, t, r, s) {
                null == e || e.length <= 0 || null == t || (null == this.workListeners && (this.workListeners = []),
                    this.workflow ? this.workflow.once(e, t, r, s) : (t.once = !0, this.workListeners.push({
                        key: e,
                        handler: t,
                        priority: s,
                        isBefore: r
                    })));
            }
        }, {
            key: "onceWorkflowLater",
            value: function (e, t, r, s) {
                null == e || e.length <= 0 || null == t || (null == this.workListeners && (this.workListeners = []),
                    this.workflow ? this.workflow.onceLater(e, t, r, s) : (t.once = !0, this.workListeners.push({
                        key: e,
                        handler: t,
                        priority: s,
                        isBefore: r,
                        later: !0
                    })));
            }
        }, {
            key: "onAppShow",
            value: function (e) {
                if (!(null == this.appShowListeners || this.appShowListeners.length <= 0)) for (var t = 0, r = this.appShowListeners.length; t < r; t++) {
                    var s = this.appShowListeners[t];
                    s && s.runWith(e), s && !s.once || (this.appShowListeners.splice(t, 1), t--, r--);
                }
            }
        }, {
            key: "onAppHide",
            value: function (e) {
                if (!(null == this.appHideListeners || this.appHideListeners.length <= 0)) for (var t = 0, r = this.appHideListeners.length; t < r; t++) {
                    var s = this.appHideListeners[t];
                    s && s.runWith(e), s && !s.once || (this.appHideListeners.splice(t, 1), t--, r--);
                }
            }
        }, {
            key: "addAppShow",
            value: function (e) {
                null != e && (null == this.appShowListeners && (this.appShowListeners = []), this.appShowListeners.push(e));
            }
        }, {
            key: "removeAppShow",
            value: function (e) {
                if (!(null == e || null == this.appShowListeners || this.appShowListeners.length <= 0)) for (var t = e.caller, r = e.method, s = e.once, n = 0, i = this.appShowListeners.length; n < i; n++) {
                    var l = this.appShowListeners[n];
                    !l || t && l.caller !== t || null != r && l.method !== r || s && !l.once || (this.appShowListeners.splice(n, 1),
                        n--, i--, l.recover());
                }
            }
        }, {
            key: "addAppHide",
            value: function (e) {
                null != e && (null == this.appHideListeners && (this.appHideListeners = []), this.appHideListeners.push(e));
            }
        }, {
            key: "removeAppHide",
            value: function (e) {
                if (!(null == e || null == this.appHideListeners || this.appHideListeners.length <= 0)) for (var t = e.caller, r = e.method, s = e.once, n = 0, i = this.appHideListeners.length; n < i; n++) {
                    var l = this.appHideListeners[n];
                    !l || t && l.caller !== t || null != r && l.method !== r || s && !l.once || (this.appHideListeners.splice(n, 1),
                        n--, i--, l.recover());
                }
            }
        }, {
            key: "checkPanelSort",
            value: function () {
                zs.proxy.sortScene(this.entryInst);
            }
        }, {
            key: "checkGameCfg",
            value: function (t) {
                // var r = zs.configs.gameCfg;
                // if (null == r.appName || r.appName.trim().length <= 0) return zs.fgui.msgtext.show("未填写appName");
                // if (null == r.gameId || r.gameId.trim().length <= 0) return zs.fgui.msgtext.show("未填写gameId");
                // if (null == r.appId || r.appId.trim().length <= 0) return zs.fgui.msgtext.show("未填写appId");
                // if (1 == e.userId && zs.platform.proxy) return zs.fgui.msgtext.show("用户登录失败");
                // if (!r.cp && (null == r.tdKey || r.tdKey.trim().length <= 0) && "wx_" == zs.platform.config.platformMark) return zs.fgui.msgtext.show("未填写TalkingData密钥");
                // if (null == r.version || r.version.trim().length <= 0) return zs.fgui.msgtext.show("未填写版本号version");
                // if (null == t || t.length < 0) return zs.fgui.msgtext.show("配置数据同步失败");
                // var s = !1;
                // if (!zs.configs.gameCfg.skipGamePlayBanner) {
                //     var n = !1, i = zs.configs.productCfg, l = i.GAME_PLAY;
                //     if (l) {
                //         var a = l.states;
                //         if ((!a || a.length <= 0) && l.banner && l.banner.auto && l.banner.checkInit && (n = !0),
                //             !n && a && a.length > 0) for (var o = 0, h = a.length; o < h; o++) {
                //                 var u = i["GAME_PLAY." + a[o]];
                //                 if (u && u.banner && u.banner.auto && u.banner.checkInit) {
                //                     n = !0;
                //                     break;
                //                 }
                //             }
                //     }
                //     s = !n;
                // }
                // return s ? zs.fgui.msgtext.show("游戏内容中没有配置Banner") : r.pure && zs.platform.proxy ? zs.fgui.msgtext.show("当前处于纯净模式") : r.debug && zs.platform.proxy ? zs.fgui.msgtext.show("当前处于测试模式") : void 0;
            }
        }, {
            key: "appName",
            get: function () {
                return zs.configs.gameCfg ? zs.configs.gameCfg.appName : null;
            }
        }, {
            key: "appId",
            get: function () {
                return zs.configs.gameCfg ? zs.configs.gameCfg.appId : null;
            }
        }, {
            key: "tdKey",
            get: function () {
                return zs.configs.gameCfg ? zs.configs.gameCfg.tdKey : null;
            }
        }, {
            key: "readyStart",
            get: function () {
                return this.entryInst ? this.entryInst && this.entryInst.progress >= 100 && this._readyStart : this._readyStart;
            }
        }]), e;
    }();
    a.userInfo = null, a.userId = null, a.entry = null, a.onConfigInit = null, a.onFGUIBind = null,
        a.onPrepare = null, a.onStart = null, a.overrideWorkflow = null, a.workflow = null,
        a.loadingPage = null, a.layaLoadingPage = null, e.showMsgBox = function (e) {
            zs.fgui.msgbox.show(e);
        },
        e.hideMsgBox = function (e) {
            e && zs.fgui.msgbox.clear(), zs.fgui.msgbox.hide();
        },

        e.workflow = l,
        e.core = a;
}(window.zs = window.zs || {});