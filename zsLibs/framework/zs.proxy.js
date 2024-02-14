var e = require("../../@babel/runtime/helpers/interopRequireDefault"), 
possibleConstructorReturn = e(require("../../@babel/runtime/helpers/possibleConstructorReturn")), 
getPrototypeOf = e(require("../../@babel/runtime/helpers/getPrototypeOf")), n = e(require("../../@babel/runtime/helpers/inherits")), 
i = e(require("../../@babel/runtime/helpers/createClass")), 
classCallCheck = e(require("../../@babel/runtime/helpers/classCallCheck"));

function s() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
        !0;
    } catch (e) {
        return !1;
    }
}

function testsss() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
        !0;
    } catch (e) {
        return !1;
    }
}

window.zs = window.zs || {}, window.zs.proxy = window.zs.proxy || {}, function(e) {
    var u = function e() {
        (0, classCallCheck.default)(this, e);
    };
    u.gameCfgPath = "config/gameCfg.json", u.porductCfgPath = "config/productCfg.json", 
    u.uiCfgPath = "config/uiCfg.json";
    var c = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "FGUIEvent",
            value: function(e, a) {
                return zs.Handler.create(e, a, null, !1);
            }
        }, {
            key: "FGUIOnClick",
            value: function(e, a, t) {
                e.onClick(a, t);
            }
        }, {
            key: "FGUIOffClick",
            value: function(e, a, t) {
                e.offClick(a, t);
            }
        }, {
            key: "FGUIOn",
            value: function(e, a, t, n) {
                e.on(a, t, n);
            }
        }, {
            key: "FGUIOff",
            value: function(e, a, t, n) {
                e.off(a, t, n);
            }
        }, {
            key: "FGUIButtonTouchBegin",
            value: function(e) {
                e.on(Laya.Event.MOUSE_DOWN, e, e.__mousedown);
            }
        } ]), e;
    }();
    c.MOUSE_DOWN = Laya.Event.MOUSE_DOWN, c.MOUSE_MOVE = Laya.Event.MOUSE_MOVE, c.FGUI_CLICK_ITEM = fairygui.Events.CLICK_ITEM, 
    c.FGUI_DRAG_START = fairygui.Events.DRAG_START, c.FGUI_DRAG_END = fairygui.Events.DRAG_END, 
    e.Configs = u, e.LocalStorage = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "getItem",
            value: function(e) {
                return Laya.LocalStorage.getItem(e);
            }
        }, {
            key: "setItem",
            value: function(e, a) {
                Laya.LocalStorage.setItem(e, a);
            }
        } ]), e;
    }(), e.Event = c, e.Touch = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "touchX",
            get: function() {
                return Laya.stage.mouseX;
            }
        }, {
            key: "touchY",
            get: function() {
                return Laya.stage.mouseY;
            }
        } ]), e;
    }(), e.Tween = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "to",
            value: function(e, a, t) {
                var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, s = null;
                switch (n) {
                  case "linearNone":
                    s = Laya.Ease.linearNone;
                    break;

                  case "linearIn":
                    s = Laya.Ease.linearIn;
                    break;

                  case "linearInOut":
                    s = Laya.Ease.linearInOut;
                    break;

                  case "linearOut":
                    s = Laya.Ease.linearOut;
                    break;

                  case "bounceIn":
                    s = Laya.Ease.bounceIn;
                    break;

                  case "bounceInOut":
                    s = Laya.Ease.bounceInOut;
                    break;

                  case "bounceOut":
                    s = Laya.Ease.bounceOut;
                    break;

                  case "backIn":
                    s = Laya.Ease.backIn;
                    break;

                  case "backInOut":
                    s = Laya.Ease.backInOut;
                    break;

                  case "backOut":
                    s = Laya.Ease.backOut;
                    break;

                  case "elasticIn":
                    s = Laya.Ease.elasticIn;
                    break;

                  case "elasticInOut":
                    s = Laya.Ease.elasticInOut;
                    break;

                  case "elasticOut":
                    s = Laya.Ease.elasticOut;
                    break;

                  case "strongIn":
                    s = Laya.Ease.strongIn;
                    break;

                  case "strongInOut":
                    s = Laya.Ease.strongInOut;
                    break;

                  case "strongOut":
                    s = Laya.Ease.strongOut;
                    break;

                  case "sineInOut":
                    s = Laya.Ease.sineInOut;
                    break;

                  case "sineIn":
                    s = Laya.Ease.sineIn;
                    break;

                  case "sineOut":
                    s = Laya.Ease.sineOut;
                    break;

                  case "quintIn":
                    s = Laya.Ease.quintIn;
                    break;

                  case "quintInOut":
                    s = Laya.Ease.quintInOut;
                    break;

                  case "quintOut":
                    s = Laya.Ease.quintOut;
                    break;

                  case "quartIn":
                    s = Laya.Ease.quartIn;
                    break;

                  case "quartInOut":
                    s = Laya.Ease.quartInOut;
                    break;

                  case "quartOut":
                    s = Laya.Ease.quartOut;
                    break;

                  case "cubicIn":
                    s = Laya.Ease.cubicIn;
                    break;

                  case "cubicInOut":
                    s = Laya.Ease.cubicInOut;
                    break;

                  case "cubicOut":
                    s = Laya.Ease.cubicOut;
                    break;

                  case "quadIn":
                    s = Laya.Ease.quadIn;
                    break;

                  case "quadInOut":
                    s = Laya.Ease.quadInOut;
                    break;

                  case "quadOut":
                    s = Laya.Ease.quadOut;
                    break;

                  case "expoIn":
                    s = Laya.Ease.expoIn;
                    break;

                  case "expoInOut":
                    s = Laya.Ease.expoInOut;
                    break;

                  case "expoOut":
                    s = Laya.Ease.expoOut;
                    break;

                  case "circIn":
                    s = Laya.Ease.circIn;
                    break;

                  case "circInOut":
                    s = Laya.Ease.circInOut;
                    break;

                  case "circOut":
                    s = Laya.Ease.circOut;
                }
                return Laya.Tween.to(e, a, t, s, i, r, !1, !0, !0, !0);
            }
        }, {
            key: "clearAll",
            value: function(e) {
                Laya.Tween.clearAll(e);
            }
        } ]), e;
    }(), e.Loader = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "getRes",
            value: function(e) {
                return Laya.loader.getRes(e);
            }
        }, {
            key: "loadScene",
            value: function(e, a) {
                Laya.Scene.load(e, a);
            }
        }, {
            key: "loadScene3D",
            value: function(e, a) {
                Laya.Scene3D.load(e, a);
            }
        }, {
            key: "loadSprite3D",
            value: function(e, a) {
                Laya.Sprite3D.load(e, a);
            }
        }, {
            key: "load",
            value: function(e, a, t) {
                t ? Laya.loader.load(e, a, null, null, 1, null, null, !0) : Laya.loader.load(e, a);
            }
        } ]), e;
    }(), e.NativeLoading = function(e) {
        (0, n.default)(o, e);
        var u, c = (u = o, function() {
            var e, n = (0, getPrototypeOf.default)(u);
            if (testsss()) {
                var i = (0, getPrototypeOf.default)(this).constructor;
                e = Reflect.construct(n, arguments, i);
            } 
            
            else {
                console.log("nnnn",n);
                e = n.apply(this, arguments);
            }
            return (0, possibleConstructorReturn.default)(this, e);
        });
        function o() {
            var e;
            return (0, classCallCheck.default)(this, o), (e = c.apply(this, arguments)).progressTime = .01, 
            e.progressCount = 0, e.current = 0, e.progress = 0, e;
        }
        return (0, i.default)(o, [ {
            key: "init",
            value: function() {
                this.updateProgress(0);
            }
        }, {
            key: "updateProgress",
            value: function(e) {}
        }, {
            key: "run",
            value: function(e) {
                if (this.progress = e, this.current < this.progress) {
                    this.progressCount += .001 * zs.Timer.inst.delta;
                    var a = Math.round(this.progressCount / this.progressTime);
                    this.progressCount -= a * this.progressTime, this.current + a >= this.progress ? this.current = this.progress : this.current = this.current + a, 
                    this.updateProgress(this.current);
                } else if (this.progress >= 100) return !0;
                return !1;
            }
        } ], [ {
            key: "preload",
            value: function() {
                return Promise(function(e, a) {
                    e();
                });
            }
        }, {
            key: "make",
            value: function() {
                return null;
            }
        } ]), o;
    }(Laya.Script), e.UIScene = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, i.default)(e, null, [ {
            key: "init",
            value: function() {
                this.scene = Laya.stage.addChild(new Laya.Scene3D()), this.camera = this.scene.addChild(new Laya.Camera(0, .1, 100)), 
                this.camera.clearFlag = Laya.CameraClearFlags.DepthOnly, this.camera.clearColor = new Laya.Vector4(0, 0, 0, 0), 
                this.camera.transform.position = new Laya.Vector3(0, 0, 3), this.camera.transform.rotation = new Laya.Quaternion(), 
                this.camera.enableRender = !1, this.light = this.scene.addChild(new Laya.DirectionLight()), 
                this.light.color = new Laya.Vector3(1, 1, 1), this.light.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            }
        }, {
            key: "sync",
            value: function(e) {
                this.scene || this.init(), e instanceof Laya.Camera ? (this.camera.clearFlag = e.clearFlag, 
                this.camera.clearColor = e.clearColor, this.camera.cullingMask = e.cullingMask, 
                this.camera.aspectRatio = e.aspectRatio, this.camera.nearPlane = e.nearPlane, this.camera.farPlane = e.farPlane, 
                this.camera.fieldOfView = e.fieldOfView, this.camera.orthographic = e.orthographic, 
                this.camera.orthographicVerticalSize = e.orthographicVerticalSize) : e instanceof Laya.DirectionLight && (this.light.transform.rotation = e.transform.rotation, 
                this.light.color = e.color, this.light.intensity = e.intensity);
            }
        }, {
            key: "resetCamera",
            value: function() {
                this.scene || this.init(), this.camera.clearFlag = Laya.CameraClearFlags.DepthOnly, 
                this.camera.clearColor = new Laya.Vector4(0, 0, 0, 0), this.camera.aspectRatio = 0, 
                this.camera.nearPlane = .1, this.camera.farPlane = 100, this.camera.fieldOfView = 60, 
                this.camera.orthographic = !1, this.camera.orthographicVerticalSize = 10, this.camera.addAllLayers(), 
                this.camera.transform.position = new Laya.Vector3(0, 0, 3), this.camera.transform.rotation = new Laya.Quaternion();
            }
        }, {
            key: "resetLight",
            value: function() {
                this.scene || this.init(), this.light.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0)), 
                this.light.color = new Laya.Vector3(1, 1, 1), this.light.intensity = 1;
            }
        }, {
            key: "add",
            value: function(e, a, t) {
                return this.scene || this.init(), this.scene.addChild(e), this.list.push(e), e.transform.position = a || new Laya.Vector3(), 
                e.transform.rotationEuler = t || new Laya.Vector3(), this.camera.enableRender = !0, 
                e;
            }
        }, {
            key: "cloneAdd",
            value: function(e, a, t) {
                return this.add(e.clone(), a, t);
            }
        }, {
            key: "clear",
            value: function() {
                if (!(null == this.list || this.list.length <= 0)) {
                    for (var e = 0, a = this.list.length; e < a; e++) this.list[e].removeSelf();
                    this._list = [], this.camera && (this.camera.enableRender = !1);
                }
            }
        }, {
            key: "removeAt",
            value: function(e) {
                null == this.list || this.list.length <= 0 || e >= this.list.length || (this.list[e].removeSelf(), 
                this.list.splice(e, 1), this.list.length <= 0 && this.camera && (this.camera.enableRender = !1));
            }
        }, {
            key: "remove",
            value: function(e) {
                if (!(null == this.list || this.list.length <= 0)) {
                    for (var a = 0, t = this.list.length; a < t; a++) if (this.list[a].id == e.id) {
                        this.list[a].removeSelf(), this.list.splice(a, 1);
                        break;
                    }
                    this.list.length <= 0 && this.camera && (this.camera.enableRender = !1);
                }
            }
        }, {
            key: "list",
            get: function() {
                return null == this._list && (this._list = []), this._list;
            }
        } ]), e;
    }(), e.init = function() {}, e.playSound = function(e) {
        Laya.SoundManager.playSound(e, 1);
    }, e.color = function(e) {
        return e;
    }, e.point = function(e, a) {
        return Laya.Point.create().setTo(e, a);
    }, e.initFGUIRoot = function() {
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
    }, e.loadFGUIPack = function(e) {
        var a = this;
        return new Promise(function(t, n) {
            //_+_+_+_+_+_+_+_+_+_+_+_+
            fairygui.UIPackage.loadPackage(e, zs.Handler.create(a, function(e) {
                if (e && e.length > 0) {
                    console.log(e[0]._itemsByName);
                    // if(e[0]._itemsByName.msg_background)
                    // {
                    // }
                    
                    // e[0]._itemsByName.visible = 0;
                    for (var a = e[0], n = a._items, i = 0, r = n.length; i < r; i++) {
                        var s = n[i];
                        if (s.type == fairygui.PackageItemType.Atlas) {
                            var u = a.getItemAsset(s);
                            u._bitmap && (u._bitmap.lock = !0);
                        }
                    }
                    t(a);
                } else t(a);
            }));
        });
    }, e.setFGUIExtension = function(e, a) {
        null == fairygui.UIObjectFactory.extensions[e] && fairygui.UIObjectFactory.setPackageItemExtension(e, a);
    }, e.sortScene = function(e) {
        var a = 1;
        zs.ui.UIScene.scene && (Laya.stage.getChildIndex(zs.ui.UIScene.scene) < Laya.stage.numChildren - a && Laya.stage.setChildIndex(zs.ui.UIScene.scene, Laya.stage.numChildren - a), 
        a++), Laya.stage.getChildIndex(fairygui.GRoot.inst.displayObject) != Laya.stage.numChildren - a && Laya.stage.setChildIndex(fairygui.GRoot.inst.displayObject, Laya.stage.numChildren - a), 
        e && e.loading && e.loading.owner && Laya.stage.getChildIndex(e.loading.owner) != Laya.stage.numChildren - a && Laya.stage.setChildIndex(e.loading.owner, Laya.stage.numChildren - a);
    };
}(window.zs.proxy = window.zs.proxy || {});