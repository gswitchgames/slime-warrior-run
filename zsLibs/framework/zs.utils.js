var e = require("../../@babel/runtime/helpers/interopRequireDefault"), 
t = e(require("../../@babel/runtime/helpers/typeof")), 
n = e(require("../../@babel/runtime/helpers/createClass")), 
classCallCheck = e(require("../../@babel/runtime/helpers/classCallCheck"));

window.zs = window.zs || {}, function(e) {
    var i = function e() {
        (0, classCallCheck.default)(this, e);
    };
    i.linearNone = "linearNone", i.linearIn = "linearIn", i.linearInOut = "linearInOut", 
    i.linearOut = "linearOut", i.bounceIn = "bounceIn", i.bounceInOut = "bounceInOut", 
    i.bounceOut = "bounceOut", i.backIn = "backIn", i.backInOut = "backInOut", i.backOut = "backOut", 
    i.elasticIn = "elasticIn", i.elasticInOut = "elasticInOut", i.elasticOut = "elasticOut", 
    i.strongIn = "strongIn", i.strongInOut = "strongInOut", i.strongOut = "strongOut", 
    i.sineInOut = "sineInOut", i.sineIn = "sineIn", i.sineOut = "sineOut", i.quintIn = "quintIn", 
    i.quintInOut = "quintInOut", i.quintOut = "quintOut", i.quartIn = "quartIn", i.quartInOut = "quartInOut", 
    i.quartOut = "quartOut", i.cubicIn = "cubicIn", i.cubicInOut = "cubicInOut", i.cubicOut = "cubicOut", 
    i.quadIn = "quadIn", i.quadInOut = "quadInOut", i.quadOut = "quadOut", i.expoIn = "expoIn", 
    i.expoInOut = "expoInOut", i.expoOut = "expoOut", i.circIn = "circIn", i.circInOut = "circInOut", 
    i.circOut = "circOut";
    var a = function() {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            (0, classCallCheck.default)(this, e), this.once = !1, this._id = 0, this.setTo(t, n, i, a);
        }
        return (0, n.default)(e, [ {
            key: "setTo",
            value: function(t, n, r) {
                var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                return this._id = e._gid++, this.caller = t, this.method = n, this.args = r, this.once = i, 
                this;
            }
        }, {
            key: "run",
            value: function() {
                if (null == this.method) return null;
                var e = this._id, t = this.method.apply(this.caller, this.args);
                return this._id === e && this.once && this.recover(), t;
            }
        }, {
            key: "runWith",
            value: function(e) {
                if (null == this.method) return null;
                var t = this._id;
                if (null == e) 
                    var n = this.method.apply(this.caller, this.args); 
                else 
                    n = this.args 
                    || e.unshift ? 
                                        this.args ? this.method.apply(this.caller, this.args.concat(e)) : this.method.apply(this.caller, e) : 
                                    this.method.call(this.caller, e);
                // console.log(this.method);
                return this._id === t && this.once && this.recover(), n;
            }
        }, {
            key: "clear",
            value: function() {
                return this.caller = null, this.method = null, this.args = null, this;
            }
        }, {
            key: "recover",
            value: function() {
                // console.log("------recover-------");
                this._id > 0 && (this._id = 0, e._pool.push(this.clear()));
            }
        } ], [ {
            key: "create",
            value: function(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                return e._pool.length ? e._pool.pop().setTo(t, n, r, i) : new e(t, n, r, i);
            }
        } ]), e;
    }();
    a._pool = [], a._gid = 1;
    var l = function() {
        function e() {
            var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            (0, classCallCheck.default)(this, e), this.scale = 1, this.currTimer = Date.now(), this.currFrame = 0, 
            this._delta = 0, this._lastTimer = Date.now(), this._map = [], this._handlers = [], 
            this._temp = [], this._count = 0, t && e.gTimer 
            //&& e.gTimer.frameLoop(1, this, this._update);
        }
        return (0, n.default)(e, null, [ {
            key: "getGID",
            value: function() {
                var e = this._gid;
                return this._gid++, e;
            }
        }, {
            key: "inst",
            get: function() {
                return this._inst || (this._inst = new e()), this._inst;
            }
        } ]), (0, n.default)(e, [ {
            key: "_update",
            value: function() {
                if (this.scale <= 0) return this._lastTimer = Date.now(), void (this._delta = 0);
                var e = this.currFrame = this.currFrame + this.scale, t = Date.now(), n = t - this._lastTimer > 3e4;
                this._delta = (t - this._lastTimer) * this.scale;
                var r = this.currTimer = this.currTimer + this._delta;
                this._lastTimer = t;
                var i = this._handlers;
                this._count = 0;
                for (var a = 0, l = i.length; a < l; a++) {
                    var u = i[a];
                    if (null !== u.method) {
                        var s = u.userFrame ? e : r;
                        if (s >= u.exeTime) if (u.repeat) if (!u.jumpFrame || n) u.exeTime += u.delay, u.run(!1), 
                        s > u.exeTime && (u.exeTime += Math.ceil((s - u.exeTime) / u.delay) * u.delay); else for (;s >= u.exeTime; ) u.exeTime += u.delay, 
                        u.run(!1); else u.run(!0);
                    } else this._count++;
                }
                (this._count > 30 || e % 200 == 0) && this._clearHandlers();
            }
        }, {
            key: "_clearHandlers",
            value: function() {
                for (var e = this._handlers, t = 0, n = e.length; t < n; t++) {
                    var r = e[t];
                    null !== r.method ? this._temp.push(r) : this._recoverHandler(r);
                }
                this._handlers = this._temp, e.length = 0, this._temp = e;
            }
        }, {
            key: "_recoverHandler",
            value: function(t) {
                this._map[t.key] == t && (this._map[t.key] = null), t.clear(), e._pool.push(t);
            }
        }, {
            key: "_create",
            value: function(t, n, r, i, a, l, s) {
                if (!r) return a.apply(i, l), null;
                if (s) {
                    var o = this._getHandler(i, a);
                    if (o) return o.repeat = n, o.userFrame = t, o.delay = r, o.caller = i, o.method = a, 
                    o.args = l, o.exeTime = r + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer), 
                    o;
                }
                return (o = e._pool.length > 0 ? e._pool.pop() : new u()).repeat = n, o.userFrame = t, 
                o.delay = r, o.caller = i, o.method = a, o.args = l, o.exeTime = r + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer), 
                this._indexHandler(o), this._handlers.push(o), o;
            }
        }, {
            key: "_indexHandler",
            value: function(t) {
                var n = t.caller, r = t.method, i = n ? n.$_GID || (n.$_GID = e.getGID()) : 0, a = r.$_TID || (r.$_TID = 1e5 * e._mid++);
                t.key = i + a, this._map[t.key] = t;
            }
        }, {
            key: "once",
            value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                this._create(!1, !1, e, t, n, r, i);
            }
        }, {
            key: "loop",
            value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4], a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], l = this._create(!1, !0, e, t, n, r, i);
                l && (l.jumpFrame = a);
            }
        }, {
            key: "frameOnce",
            value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                this._create(!0, !1, e, t, n, r, i);
            }
        }, {
            key: "frameLoop",
            value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
                this._create(!0, !0, e, t, n, r, i);
            }
        }, {
            key: "toString",
            value: function() {
                return " handlers:" + this._handlers.length + " pool:" + e._pool.length;
            }
        }, {
            key: "clear",
            value: function(e, t) {
                var n = this._getHandler(e, t);
                n && (this._map[n.key] = null, n.key = 0, n.clear());
            }
        }, {
            key: "clearAll",
            value: function(e) {
                if (e) for (var t = 0, n = this._handlers.length; t < n; t++) {
                    var r = this._handlers[t];
                    r.caller === e && (this._map[r.key] = null, r.key = 0, r.clear());
                }
            }
        }, {
            key: "_getHandler",
            value: function(t, n) {
                var r = t ? t.$_GID || (t.$_GID = e.getGID()) : 0, i = n.$_TID || (n.$_TID = 1e5 * e._mid++);
                return this._map[r + i];
            }
        }, {
            key: "callLater",
            value: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                CallLater.I.callLater(e, t, n);
            }
        }, {
            key: "runCallLater",
            value: function(e, t) {
                CallLater.I.runCallLater(e, t);
            }
        }, {
            key: "runTimer",
            value: function(e, t) {
                var n = this._getHandler(e, t);
                n && null != n.method && (this._map[n.key] = null, n.run(!0));
            }
        }, {
            key: "pause",
            value: function() {
                this.scale = 0;
            }
        }, {
            key: "resume",
            value: function() {
                this.scale = 1;
            }
        }, {
            key: "delta",
            get: function() {
                return this._delta;
            }
        } ]), e;
    }();
    l.gTimer = null, l._pool = [], l._gid = 1, l._mid = 1;
    var u = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, n.default)(e, [ {
            key: "clear",
            value: function() {
                this.caller = null, this.method = null, this.args = null;
            }
        }, {
            key: "run",
            value: function(e) {
                var t = this.caller;
                if (t && t.destroyed) return this.clear();
                var n = this.method, r = this.args;
                e && this.clear(), null != n && (r ? n.apply(t, r) : n.call(t));
            }
        } ]), e;
    }(), s = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, n.default)(e, null, [ {
            key: "getOrAddComponent",
            value: function(e, t) {
                if (null != e) {
                    var n = e.getComponent(t);
                    return null == n && (n = e.addComponent(t)), n;
                }
            }
        }, {
            key: "sleep",
            value: function(e) {
                return new Promise(function(t, n) {
                    setTimeout(function() {
                        t();
                    }, e);
                });
            }
        }, {
            key: "isToday",
            value: function(e, t) {
                var n = Date.now();
                if (n - e > (t ? 86400 : 864e5)) return !1;
                var r = new Date(n), i = new Date(e);
                return r.getDate() == i.getDate();
            }
        }, {
            key: "randInt",
            value: function(e, t) {
                return Math.random() * (t - e) + e << 0;
            }
        }, {
            key: "srandInt",
            value: function(e, t) {
                return this.seedRandom() * (t - e) + e << 0;
            }
        }, {
            key: "rand",
            value: function(e, t) {
                return Math.random() * (t - e) + e;
            }
        }, {
            key: "srand",
            value: function(e, t) {
                return this.seedRandom() * (t - e) + e;
            }
        }, {
            key: "seedRandom",
            value: function() {
                return this.randSeed = (9301 * this.randSeed + 49297) % 233280, this.randSeed / 233280;
            }
        }, {
            key: "setRandSeed",
            value: function(e) {
                this.randSeed = e, this.randSeed = (9301 * this.randSeed + 49297) % 233280;
            }
        }, {
            key: "pickNumbers",
            value: function(e, t, n) {
                var r;
                if (n <= 0) return [];
                e > t && (e = (r = [ t, e ])[0], t = r[1]);
                for (var i = [], a = [], l = e; l <= t; l++) a.push(l);
                n >= a.length && (n = a.length);
                for (var u = 0; u < n; u++) {
                    var s = this.randInt(0, a.length);
                    i.push(a[s]), a.splice(s, 1);
                }
                return i;
            }
        }, {
            key: "spickNumbers",
            value: function(e, t, n, r) {
                var i;
                if (n <= 0) return [];
                e > t && (e = (i = [ t, e ])[0], t = i[1]);
                for (var a = [], l = [], u = e; u <= t; u++) l.push(u);
                n >= l.length && (n = l.length), r && this.setRandSeed(r);
                for (var s = 0; s < n; s++) {
                    var o = this.srandInt(0, l.length);
                    a.push(l[o]), l.splice(o, 1);
                }
                return a;
            }
        }, {
            key: "pickArray",
            value: function(e, t) {
                if (null == e || e.length <= 0 || t <= 0) return [];
                var n = [], r = e.concat();
                t >= r.length && (t = r.length);
                for (var i = 0; i < t; i++) {
                    var a = this.randInt(0, r.length);
                    n.push(r[a]), r.splice(a, 1);
                }
                return n;
            }
        }, {
            key: "spickArray",
            value: function(e, t, n) {
                if (null == e || e.length <= 0 || t <= 0) return [];
                var r = [], i = e.concat();
                t >= i.length && (t = i.length), n && this.setRandSeed(n);
                for (var a = 0; a < t; a++) {
                    var l = this.srandInt(0, i.length);
                    r.push(i[l]), i.splice(l, 1);
                }
                return r;
            }
        }, {
            key: "isNumber",
            value: function(e) {
                return !(!/^\d+(\.\d+)?$/.test(e) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(e));
            }
        }, {
            key: "startwith",
            value: function(e, t) {
                return !(e.length < t.length) && e.slice(0, t.length) == t;
            }
        }, {
            key: "randByte",
            value: function() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            }
        }, {
            key: "flatKVJson",
            value: function(e, t) {
                var n = {};
                if (!Array.isArray(e) || e.length <= 0) return n;
                for (var r = 0, i = e.length; r < i; r++) {
                    var a = e[r];
                    if (a.key && a.value) {
                        var l = a.value;
                        if (t && "number" != typeof a.value) {
                            var u = parseFloat(a.value);
                            isNaN(u) || (l = a.value);
                        }
                        n[a.key] = l;
                    }
                }
                return n;
            }
        }, {
            key: "getItem",
            value: function(e) {
                return zs.proxy.LocalStorage.getItem(zs.core.appId + "." + e);
            }
        }, {
            key: "setItem",
            value: function(e, t) {
                zs.proxy.LocalStorage.setItem(zs.core.appId + "." + e, t);
            }
        }, {
            key: "arrayDeepCopy",
            value: function(e) {
                if (!Array.isArray(e) || e.length <= 0) return [];
                for (var n = [], r = 0, i = e.length; r < i; r++) {
                    var a = e[r];
                    if ("object" == (0, t.default)(a)) {
                        var l = {};
                        for (var u in a) l[u] = a[u];
                        n.push(l);
                    } else n.push(a);
                }
                return n;
            }
        }, {
            key: "getEventCode",
            value: function(e) {
                return null == zs.network.loginCode || null == zs.core.userId ? null : zs.configs.gameCfg.appId + "-" + zs.network.loginCode + "-" + zs.core.userId + "-" + e;
            }
        } ]), e;
    }();
    s.randSeed = 5, e.Ease = i, e.Handler = a, e.Timer = l, e.Tween = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, n.default)(e, null, [ {
            key: "to",
            value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                return zs.proxy.Tween.to(e, t, n, r, i, a);
            }
        }, {
            key: "clearAll",
            value: function(e) {
                zs.proxy.Tween.clearAll(e);
            }
        } ]), e;
    }(), e.utils = s;
}(window.zs = window.zs || {});