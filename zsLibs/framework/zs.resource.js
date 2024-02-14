var e = require("../../@babel/runtime/helpers/interopRequireDefault"), 
regenerator = e(require("../../@babel/runtime/regenerator")), t = e(require("../../@babel/runtime/helpers/asyncToGenerator")), a = e(require("../../@babel/runtime/helpers/classCallCheck")), r = e(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, function(e) {
    var u;
    !function(e) {
        e[e.Common = 0] = "Common", e[e.Scene = 1] = "Scene", e[e.Scene3D = 2] = "Scene3D", 
        e[e.Sprite3D = 3] = "Sprite3D", e[e.FGUIPack = 4] = "FGUIPack";
    }(u = u || (u = {}));
    var c = function() {
        function e() {
            (0, a.default)(this, e);
        }
        var c;
        return (0, r.default)(e, null, [ {
            key: "init",
            value: function() {
                if (e.loadedPacks = [], e.preloadPacks = [], e.subpacks = {}, s.gameCfg && s.gameCfg.subpackages) {
                    var n = s.gameCfg.subpackages;
                    for (var t in s.gameCfg.subpackages) if (!(null == t || t.length <= 0)) {
                        var a = n[t];
                        "*" === t[0] && (!0, t = t.slice(1), e.preloadPacks.push(t)), e.subpacks[t] = a;
                    }
                }
            }
        }, {
            key: "preload",
            value: (c = (0, t.default)(regenerator.default.mark(function t() {
                var a, r, u;
                return regenerator.default.wrap(function(t) {
                    console.log("tt:",t.next)
                    for (;;) switch (t.prev = t.next) {

                      case 0:
                        if (null == e.preloadPacks || e.preloadPacks.length <= 0) {
                            t.next = 8;
                            break;
                        }
                        a = regenerator.default.mark(function t(a, r) {
                            var u;
                            return regenerator.default.wrap(function(n) {
                                for (;;) 
                                switch (n.prev = n.next) {
                                  case 0:
                                    return u = e.preloadPacks[a], n.next = 3, 
                                    
                                    e.loadedPacks.push(u)
                                    // zs.platform.async.loadSubpackage({
                                    //     pkgName: u
                                    // }).then(function() {
                                    //     e.loadedPacks.push(u), zs.log.debug("预加载分包" + u + "成功!");
                                    // }).catch(function() {
                                    //     zs.log.warn("预加载分包1111" + u + "失败!");
                                    // });

                                  case 3:
                                  case "end":
                                    return n.stop();
                                }
                            }, t);
                        }), r = 0, u = e.preloadPacks.length;

                      case 3:

                        if (!(r < u)) {
                            t.next = 8;
                            break;
                        }
                        
                        return t.delegateYield(a(r, u), "t0", 5);

                      case 5:
                        // console.error("tt:",t.next)
                        r++, t.next = 3;
                        break;

                      case 8:
                      case "end":
                        return t.stop();
                    }
                }, t);
            })), function() {
                return c.apply(this, arguments);
            })
        }, {
            key: "check",
            value: function(n) {
                for (var t in e.subpacks) if (zs.utils.startwith(n, e.subpacks[t])) return t;
                return null;
            }
        }, {
            key: "isPackLoaded",
            value: function(e) {
                return this.loadedPacks.indexOf(e) >= 0;
            }
        }, {
            key: "isLoading",
            value: function() {
                return e.numLoading > 0;
            }
        }, {
            key: "load",
            value: function(n, t) {
                var a = this;
                return new Promise(function(r, u) {
                    if (!n) return r();
                    var c = e.check(n);
                    e.numLoading++, c && !a.isPackLoaded(c) ? zs.platform.async.loadSubpackage({
                        pkgName: c
                    }).then(function() {
                        e.loadedPacks.push(c), e.nativeLoad(n, t).then(function(n) {
                            e.numLoading--, r(n);
                        }).catch(function(e) {
                            return e;
                        });
                    }).catch(function() {
                        e.nativeLoad(n, t).then(function(n) {
                            e.numLoading--, r(n);
                        }).catch(function(e) {
                            return e;
                        });
                    }) : e.nativeLoad(n, t).then(function(n) {
                        e.numLoading--, r(n);
                    }).catch(function(e) {
                        return e;
                    });
                });
            }
        }, {
            key: "nativeLoad",
            value: function(e, n, t) {
                return new Promise(function(a, r) {
                    var c = zs.proxy.Loader.getRes(e);
                    if (c) a(c); else switch (n) {
                      case u.Scene:
                        zs.proxy.Loader.loadScene(e, zs.Handler.create(null, function(e) {
                            a(e);
                        }));
                        break;

                      case u.Scene3D:
                        zs.proxy.Loader.loadScene3D(e, zs.Handler.create(null, function(e) {
                            a(e);
                        }));
                        break;

                      case u.Sprite3D:
                        zs.proxy.Loader.loadSprite3D(e, zs.Handler.create(null, function(e) {
                            a(e);
                        }));
                        break;

                      case u.FGUIPack:
                        zs.proxy.loadFGUIPack(e).then(a).catch(r);
                        break;

                      default:
                        zs.proxy.Loader.load(e, zs.Handler.create(null, function(e) {
                            a(e);
                        }), t);
                    }
                });
            }
        }, {
            key: "destroyFGUIPackage",
            value: function(e) {
                e && e.dispose();
            }
        }, {
            key: "destroyFGUIPackageByName",
            value: function(e) {
                var n = fairygui.UIPackage.getByName(e);
                this.destroyFGUIPackage(n);
            }
        } ]), e;
    }();
    c.subpacks = {}, c.preloadPacks = [], c.loadedPacks = [], c.numLoading = 0;
    var s = function() {
        function e() {
            (0, a.default)(this, e);
        }
        var u, c;
        return (0, r.default)(e, null, [ {
            key: "init",
            value: (c = (0, t.default)(regenerator.default.mark(function t() {
                return regenerator.default.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        return n.next = 2, zs.resource.load(e.gameCfgPath).catch(function(e) {
                            return e;
                        });

                      case 2:
                          console.log("n.sent",n.sent);
                          e.gameCfg = n.sent;
                        //   e.gameCfg.debug = true;
                        console.log("e.porductCfgPath",e.porductCfgPath);
                        return n.next = 5, zs.resource.load(e.porductCfgPath).catch(function(e) {
                            return e;
                        });

                      case 5:
                          console.log("productCfg",n.sent)
                        return e.productCfg = n.sent, n.next = 8, 
                        zs.resource.load(e.uiCfgPath).catch(function(e) {
                            return e;
                        });

                      case 8:
                        console.log("uiCfg",n.sent)
                        e.uiCfg = n.sent, e.gameCfg.secret || (e.gameCfg.secret = "7CaD3L23LlGnENd1");

                      case 10:
                      case "end":
                        console.log("stopstop")
                        return n.stop();
                    }
                }, t);
            })), function() {
                return c.apply(this, arguments);
            })
        }, {
            key: "load",
            value: (u = (0, t.default)(regenerator.default.mark(function t(a, r, u, c) {
                var s, i, o, l;
                return regenerator.default.wrap(function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        if (null == e.list && (e.list = {}), !e.list[a]) {
                            n.next = 2;
                            break;
                        }
                        return n.abrupt("return", new Promise(function(n, t) {
                            n(e.list[a]);
                        }));

                      case 2:
                        if (n.t0 = null == u || c, !n.t0) {
                            n.next = 6;
                            break;
                        }
                        return n.next = 6, zs.resource.load(r).then(function(n) {
                            e.list[a] = n;
                        }).catch(function() {
                            zs.log.warn("本地无法正确加载配置表 " + a + " 路径为 " + r, "Configs");
                        });

                      case 6:
                        if (!u) {
                            n.next = 18;
                            break;
                        }
                        if (!((s = u.split(">>", 2)).length > 0)) {
                            n.next = 18;
                            break;
                        }
                        if (i = s.length > 1 ? s[0] : null, o = s.length > 1 ? s[1] : s[0], !c) {
                            n.next = 14;
                            break;
                        }
                        zs.network.config(!1, i, o).then(function(n) {
                            n && (e.list[a] = n);
                        }).catch(function() {
                            zs.log.warn("远程无法正确加载配置表 " + a + " 路径为 " + u, "Configs");
                        }), n.next = 18;
                        break;

                      case 14:
                        return n.next = 16, zs.network.config(!1, i, o).catch(function() {
                            zs.log.warn("远程无法正确加载配置表 " + a + " 路径为 " + u, "Configs");
                        });

                      case 16:
                        (l = n.sent) && (e.list[a] = l);

                      case 18:
                        return n.abrupt("return", new Promise(function(n, t) {
                            n(e.list[a]);
                        }));

                      case 19:
                      case "end":
                        return n.stop();
                    }
                }, t);
            })), function(e, n, t, a) {
                return u.apply(this, arguments);
            })
        }, {
            key: "get",
            value: function(n) {
                return null == e.list || null == e.list[n] ? null : e.list[n];
            }
        } ]), e;
    }();
    s.gameCfgPath = zs.proxy.Configs.gameCfgPath, s.porductCfgPath = zs.proxy.Configs.porductCfgPath, 
    s.uiCfgPath = zs.proxy.Configs.uiCfgPath, e.ResourceType = u, e.resource = c, e.configs = s, 
    e.prefabs = function() {
        function e() {
            (0, a.default)(this, e);
        }
        var u;
        return (0, r.default)(e, null, [ {
            key: "load",
            value: (u = (0, t.default)(regenerator.default.mark(function e(t, a, r, u) {
                var c;
                return regenerator.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (null == s.list && (s.list = {}), !s.list[t]) {
                            e.next = 2;
                            break;
                        }
                        return e.abrupt("return", new Promise(function(e, n) {
                            e(s.list[t]);
                        }));

                      case 2:
                        if (null != r && !u) {
                            e.next = 7;
                            break;
                        }
                        console.log("rrrrrr")
                        return e.next = 5, zs.resource.load(a, zs.ResourceType.Sprite3D).catch(function() {
                            zs.log.warn("本地无法正确加载预制体 " + t + " 路径为 " + a, "Prefabs");
                        });

                      case 5:
                        c = e.sent, s.list[t] = c;

                      case 7:
                        return e.abrupt("return", new Promise(function(e, n) {
                            e(s.list[t]);
                        }));

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
            })), function(e, n, t, a) {
                return u.apply(this, arguments);
            })
        }, {
            key: "get",
            value: function(e) {
                return null == s.list || null == s.list[e] ? null : s.list[e];
            }
        } ]), e;
    }();
}(window.zs = window.zs || {});