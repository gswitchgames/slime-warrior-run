var e, t, s = require("../../@babel/runtime/helpers/interopRequireDefault"), 


atypeof = s(require("../../@babel/runtime/helpers/typeof")), 
n = s(require("../../@babel/runtime/helpers/classCallCheck")), r = s(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, e = window.zs = window.zs || {}, (t = function() {
    function e() {
        (0, classCallCheck.default)(this, e);
    }
    return (0, r.default)(e, null, [ {
        key: "cleanProductKey",
        value: function(e) {
            return e.replace(/\s/g, "").replace("（", "(").replace("）", ")");
        }
    }, {
        key: "init",
        value: function(e) {
            if (this.scene = zs.utils.getItem(this.firstSceneCache), this.scene || (//this.scene = zs.platform.sync.getScene(), 
            this.scene && zs.utils.setItem(this.firstSceneCache, this.scene)), null != e) for (var t in this._defines = e, 
            e) t = this.cleanProductKey(t), zs.configs.gameCfg.pure ? (this.keys[t] = null, 
            this._defines[t] = null) : this.keys[t] = e[t];
        }
    }, {
        key: "sync",
        value: function(t) {
            if (!(null == t || t.length <= 0 || zs.configs.gameCfg.pure)) {
                for (var s in t.zs_country_white_list && (this.country = t.zs_country_white_list), 
                t) this.registe(s, t[s]);
                if (zs.configs.gameCfg.debug) zs.network.edit("is_shielded", "0").catch(function(e) {
                    return e;
                }); else {
                    var i = !1, n = !1, r = !1, c = this.sceneCheck(this.keys[e.switchScene]), l = this.countryCheck(), h = zs.product.get("zs_block_switchs");
                    for (var u in this.keys) if (this.keys[u]) {
                        var a = this.blockCheck(u, h);
                        if (c || !a) if (l || !a) {
                            var f = u + "(" + this.sceneMark + ")", o = this.keys[f];
                            if (this.scene && o && o.length > 0) {
                                var y = this.sceneCheck(o);
                                if (!y) {
                                    this.keys[u] = y, this._defines && (this._defines[u] = y), i = !0;
                                    continue;
                                }
                            }
                            var k = u + "(" + this.cityMark + ")", d = this.keys[k];
                            if (this.city && d && d.length > 0) {
                                var g = this.cityCheck(d);
                                if (!g) {
                                    this.keys[u] = g, this._defines && (this._defines[u] = g), n = !0;
                                    continue;
                                }
                            }
                            var p = u + "(" + this.timeMark + ")", _ = this.keys[p];
                            if (this.timestamp && _ && _.length > 0) {
                                var v = _.split(/[|｜]/), m = 1;
                                if (v.length > 1) {
                                    for (var z = 0, C = v.length; z < C; z++) if (!this.timeCheck(v[z])) {
                                        m = 0;
                                        break;
                                    }
                                } else m = this.timeCheck(_);
                                m || (this.keys[u] = m, this._defines && (this._defines[u] = m), r = !0);
                            }
                        } else this.keys[u] = null, this._defines && (this._defines[u] = null); else this.keys[u] = null, 
                        this._defines && (this._defines[u] = null), i = !0;
                    }
                    l || zs.network.edit("is_shielded", "1").catch(function(e) {
                        return e;
                    }), i ? (console.log("场景值屏蔽生效", this.scene), zs.td.justTrack("场景值屏蔽生效", "场景值屏蔽生效", {
                        scene: this.scene
                    })) : n ? (console.log("地区屏蔽生效", this.city), zs.td.justTrack("地区屏蔽生效", "地区屏蔽生效", {
                        city: this.city
                    })) : r && (console.log("时间屏蔽生效", this.timestamp), zs.td.justTrack("时间屏蔽生效", "时间屏蔽生效", {
                        timestamp: this.timestamp
                    }));
                }
                this.synced = !0;
            }
        }
    }, {
        key: "blockCheck",
        value: function(e, t) {
            return e && t && "" !== t ? t.replace(/\s/g, "").split(/[|｜]/).indexOf(e) < 0 ? null : 1 : null;
        }
    }, {
        key: "countryCheck",
        value: function() {
            return zs.core.userInfo.is_shielded ? (zs.td.justTrack("黑名单屏蔽生效", "黑名单屏蔽生效"), null) : this.country && this.countryWhiteList && "" != this.countryWhiteList && this.countryWhiteList.replace(/\s/g, "").split(/[|｜]/).indexOf(this.country) < 0 ? (zs.td.justTrack("国家屏蔽生效", "国家屏蔽生效", {
                country: this.country
            }), null) : 1;
        }
    }, {
        key: "cityCheck",
        value: function(e) {
            return this.city && e && "" !== e ? e.replace(/\s/g, "").split(/[|｜]/).indexOf(this.city) < 0 ? 1 : null : 1;
        }
    }, {
        key: "sceneCheck",
        value: function(e) {
            return this.scene && e && "" !== e ? e.replace(/\s/g, "").split(/[|｜]/).indexOf(this.scene) < 0 ? 1 : null : 1;
        }
    }, {
        key: "timeCheck",
        value: function(e) {
            if (!this.timestamp || !e || "" === e) return 1;
            var t = e.split("-");
            if (t.length < 2) return 1;
            var s = t[0].split(/[:：]/), i = t[1].split(/[:：]/), n = new Date(this.timestamp), r = n.getHours(), c = n.getMinutes();
            if (s.length > 0) {
                var l = parseInt(s[0]);
                if (isNaN(l) && (l = 0), r < l) return 1;
                if (r == l && s.length > 1) {
                    var h = parseInt(s[1]);
                    if (isNaN(h) && (h = 0), c < h) return 1;
                }
            }
            if (i.length > 0) {
                var u = parseInt(i[0]);
                if (isNaN(u) && (u = 0), r > u) return 1;
                if (r == u && i.length > 1) {
                    var a = parseInt(i[1]);
                    if (isNaN(a) && (a = 0), c > a) return 1;
                }
            }
            return null;
        }
    }, {
        key: "registe",
        value: function(e, t) {
            if (null != t) {
                e = this.cleanProductKey(e);
                var s = this.keys[e];
                if (null == s || (0, atypeof.default)(s) == (0, atypeof.default)(t)) this.keys[e] = t, this._defines && (this._defines[e] = t); else if ("number" == typeof s && "string" == typeof t) {
                    var n = parseFloat(t);
                    isNaN(n) && (n = 0), this.keys[e] = n, this._defines && (this._defines[e] = n);
                } else zs.log.warn("关键词类型不匹配，无法注册产品关键词：" + e, "Product");
            }
        }
    }, {
        key: "get",
        value: function(e) {
            e = this.cleanProductKey(e);
            var t = this.keys[e];
            return "function" == typeof t ? t.call(this) : (null == t && zs.log.debug("产品开关 " + e + " 不存在"), 
            t);
        }
    }, {
        key: "keys",
        get: function() {
            return null == this._keys && (this._keys = {}), this._keys;
        }
    } ]), e;
}()).synced = !1, t.scene = null, t.city = null, t.country = null, t.timestamp = null, 
t.firstSceneCache = "first_enter_scene", t.switchScene = "zs_scene_value", t.sceneMark = "scene", 
t.cityMark = "city", t.timeMark = "time", t.countryWhiteList = "中国", e.product = t;