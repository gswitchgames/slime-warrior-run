var e, t, n = require("../../@babel/runtime/helpers/interopRequireDefault"), r = n(require("../../@babel/runtime/regenerator")), i = n(require("../../@babel/runtime/helpers/asyncToGenerator")), a = n(require("../../@babel/runtime/helpers/classCallCheck")), s = n(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, e = window.zs = window.zs || {}, (t = function() {
    function e() {
        (0, a.default)(this, e), this._isPreloading = !1, this._isSceneLoading = !1, this._current = null, 
        this._nodes = {};
    }
    var t, n, o;
    return (0, s.default)(e, [ {
        key: "load",
        value: (o = (0, i.default)(r.default.mark(function t(n, i, a) {
            var s, o;
            return r.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!this._isSceneLoading) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return", void zs.log.warn("正在加载其他场景······", "Scene"));

                  case 2:
                    if (s = "", s = n instanceof Laya.Scene3D ? n.url : i ? n : e.URLCombine(n, "ls"), 
                    null != this._current && s != this._current.url && (this._current.destroy(!0), Laya.loader.clearRes(this._current.url)), 
                    o = null, !(n instanceof Laya.Scene3D)) {
                        t.next = 9;
                        break;
                    }
                    o = n, t.next = 14;
                    break;

                  case 9:
                    return this._isSceneLoading = !0, t.next = 12, zs.resource.load(s, zs.ResourceType.Scene3D).catch(function(e) {
                        return e;
                    });

                  case 12:
                    o = t.sent, this._isSceneLoading = !1;

                  case 14:
                    this._current = Laya.stage.addChildAt(o, a || 0), this.build();

                  case 16:
                  case "end":
                    return t.stop();
                }
            }, t, this);
        })), function(e, t, n) {
            return o.apply(this, arguments);
        })
    }, {
        key: "loadNext",
        value: (n = (0, i.default)(r.default.mark(function e(t, n) {
            var i, a;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!this._isSceneLoading) {
                        e.next = 2;
                        break;
                    }
                    return e.abrupt("return", void zs.log.warn("正在加载其他场景······", "Scene"));

                  case 2:
                    return i = null, this._current && (i = this._current.url, this._current.destroy(!0)), 
                    t && null != this._next && i != this._next.url && (Laya.loader.clearRes(i), i = this._next.url), 
                    null == i && zs.log.fatal("场景加载错误，当前无场景且未预加载场景"), this._isSceneLoading = !0, e.next = 6, 
                    zs.resource.load(i, zs.ResourceType.Scene3D).catch(function(e) {
                        return e;
                    });

                  case 6:
                    a = e.sent, this._isSceneLoading = !1, this._current = Laya.stage.addChildAt(a, n || 0), 
                    this.build();

                  case 8:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e, t) {
            return n.apply(this, arguments);
        })
    }, {
        key: "preload",
        value: (t = (0, i.default)(r.default.mark(function e(t, n) {
            var i;
            return r.default.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!this._isPreloading) {
                        e.next = 4;
                        break;
                    }
                    console.warn("正在预加载其他场景······"), e.next = 10;
                    break;

                  case 4:
                    if (this._isPreloading = !0, null != this._current && this._current.url == t) {
                        e.next = 9;
                        break;
                    }
                    return e.next = 7, zs.utils.loadScene3D(url).catch(function(e) {
                        return e;
                    });

                  case 7:
                    i = e.sent, this._next = i;

                  case 9:
                    this._isPreloading = !1;

                  case 10:
                  case "end":
                    return e.stop();
                }
            }, e, this);
        })), function(e, n) {
            return t.apply(this, arguments);
        })
    }, {
        key: "build",
        value: function() {
            if (null != this._current) {
                if (e.nodesDef) for (var t in e.nodesDef) {
                    var n = this._current.getChildByName(t);
                    null == n && (n = this._current.addChild(new Laya.Sprite3D(t))), this._nodes[t] = n, 
                    e.nodesDef[t] = n;
                }
                if (this._staticNode = this._current.getChildByName(e.node_static), this._dynamicNode = this._current.getChildByName(e.node_dynamic), 
                this._preloadNode = this._current.getChildByName(e.node_preload), null == this._staticNode) return zs.log.warn("构建世界场景警告！节点Static丢失！无法自动构建场景！");
                if (null == this._dynamicNode) return zs.log.warn("构建世界场景警告！节点Dynamic丢失！无法自动构建场景！");
                if (null == this._preloadNode) return zs.log.warn("构建世界场景警告！节点Preload丢失！无法自动构建场景！");
                var r = [];
                if (this._preloadNode && this._staticNode) for (var i = 0, a = this._preloadNode.numChildren; i < a; i++) {
                    var s = this._preloadNode.getChildAt(i), o = this._current.getChildByName(s.name);
                    if (!(null == o || o.numChildren <= 0)) {
                        r.push(o), e.onBuildPrefab && e.onBuildPrefab.runWith(s);
                        for (var l = 0, u = o.numChildren; l < u; l++) {
                            var c = o.getChildAt(l);
                            e.onPlacePrefab ? e.onPlacePrefab.runWith([ s, c ]) : Laya.Sprite3D.instantiate(s, this._staticNode, !1, c.transform.position, c.transform.rotation).transform.setWorldLossyScale(c.transform.getWorldLossyScale());
                        }
                    }
                }
                e.onBuildWorld && e.onBuildWorld.run(), Laya.ILaya.Browser.onIOS && "qq_" == zs.platform.config.platformMark ? zs.log.warn("手Q平台IOS系统使用静态合批将引发崩溃，自动跳过场景静态合批", "Scene") : Laya.StaticBatchManager.combine(this._staticNode), 
                this._preloadNode.destroy(!0);
                for (var d = 0; d < r.length; d++) null != r[d] && r[d].destroy(!0);
            } else zs.log.fatal("当前场景为空，无法构建场景");
        }
    }, {
        key: "nodes",
        get: function() {
            return this._nodes;
        }
    }, {
        key: "current",
        get: function() {
            return this._current;
        }
    }, {
        key: "next",
        get: function() {
            return this._next;
        }
    }, {
        key: "staticNode",
        get: function() {
            return this._staticNode;
        }
    }, {
        key: "dynamicNode",
        get: function() {
            return this._dynamicNode;
        }
    }, {
        key: "preloadNode",
        get: function() {
            return this._preloadNode;
        }
    }, {
        key: "isSceneLoading",
        get: function() {
            return this._isSceneLoading;
        }
    }, {
        key: "isPreloading",
        get: function() {
            return this._isPreloading;
        }
    } ], [ {
        key: "URLCombine",
        value: function(e, t) {
            var n = this.basePath + "/" + e;
            return null != t && t.trim().length > 0 && (n += "." + t), n;
        }
    }, {
        key: "inst",
        get: function() {
            return null == e._inst && (e._inst = new e()), e._inst;
        }
    } ]), e;
}()).basePath = "3dres/Conventional", t.nodesDef = null, t.node_static = "static", 
t.node_dynamic = "dynamic", t.node_preload = "preload", t.onBuildPrefab = null, 
t.onPlacePrefab = null, t.onBuildWorld = null, e.scene = t;