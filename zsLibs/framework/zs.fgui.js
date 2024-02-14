var t = require("../../@babel/runtime/helpers/interopRequireDefault"), 
regenerator = t(require("../../@babel/runtime/regenerator")), 
asyncToGenerator = t(require("../../@babel/runtime/helpers/asyncToGenerator")), n = t(require("../../@babel/runtime/helpers/assertThisInitialized")), 
possibleConstructorReturn = t(require("../../@babel/runtime/helpers/possibleConstructorReturn")), 
getPrototypeOf = t(require("../../@babel/runtime/helpers/getPrototypeOf")), o = t(require("../../@babel/runtime/helpers/inherits")), 
classCallCheck = t(require("../../@babel/runtime/helpers/classCallCheck")), h = t(require("../../@babel/runtime/helpers/createClass"));

function w(t) {
    return function() {
        var i, e = (0, getPrototypeOf.default)(t);
        if (testr()) {
            var n = (0, getPrototypeOf.default)(this).constructor;
            i = Reflect.construct(e, arguments, n);
        } else i = e.apply(this, arguments);
        return (0, possibleConstructorReturn.default)(this, i);
    };
}


function testr() {
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

function r() {
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

window.zs = window.zs || {}, window.zs.fgui = window.zs.fgui || {}, function(t) {
    var s, a;
    !function(t) {
        t[t.Center = 0] = "Center", t[t.Top = 1] = "Top", t[t.Bottom = 2] = "Bottom", t[t.Left = 3] = "Left", 
        t[t.Right = 4] = "Right", t[t.TopLeft = 5] = "TopLeft", t[t.BottomLeft = 6] = "BottomLeft", 
        t[t.TopRight = 7] = "TopRight", t[t.BottomRight = 8] = "BottomRight";
    }(s = s || (s = {})), function(t) {
        t[t.None = 0] = "None", t[t.Fit = 1] = "Fit", t[t.ScaleFit = 2] = "ScaleFit", t[t.Both = 3] = "Both";
    }(a = a || (a = {}));
    var r = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, h.default)(t, null, [ {
            key: "registeBase",
            value: function(t, i) {
                this.bases[t] = i;
            }
        }, {
            key: "unregisteBase",
            value: function(t) {
                this.bases[t] && delete this.bases[t];
            }
        }, {
            key: "registeItem",
            value: function(t, i) {
                this.items[t] = i;
            }
        }, {
            key: "unregisteItem",
            value: function(t) {
                this.items[t] && delete this.items[t];
            }
        }, {
            key: "bases",
            get: function() {
                return null == this._bases && (this._bases = {}), this._bases;
            }
        }, {
            key: "items",
            get: function() {
                return null == this._items && (this._items = {}), this._items;
            }
        } ]), t;
    }();
    function u(t, i) {
        return i || (t = r.path_root + "/" + t), zs.resource.load(t, zs.ResourceType.FGUIPack);
    }
    r.onInit = null, r.path_root = "fgui", r.pack_basic = "zs_basic";
    var f = function() {
        function t(i) {
            (0, classCallCheck.default)(this, t), this.disposed = !1, this._view = i, i.baseCtrl = this, 
            this._id = t.usedId, t.usedId++, this.init();
        }
        return (0, h.default)(t, [ {
            key: "check",
            value: function(t) {
                return !0;
            }
        }, {
            key: "dispose",
            value: function() {
                zs.Timer.inst.clearAll(this), zs.Tween.clearAll(this), this.disposed = !0;
            }
        }, {
            key: "show",
            value: function() {
                return this._view && (this._view.visible = !0), this;
            }
        }, {
            key: "hide",
            value: function() {
                return this._view && (this._view.visible = !1), this;
            }
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "apply",
            value: function() {
                return this;
            }
        }, {
            key: "applyConfig",
            value: function() {
                return this;
            }
        }, {
            key: "view",
            get: function() {
                return this._view;
            }
        }, {
            key: "id",
            get: function() {
                return this._id;
            }
        }, {
            key: "window",
            get: function() {
                return this._window;
            }
        } ], [ {
            key: "make",
            value: function(t) {
                return t && t.prototype instanceof fairygui.GComponent ? t.createInstance() : new fairygui.GComponent();
            }
        }, {
            key: "type",
            value: function() {
                return fairygui.GComponent;
            }
        } ]), t;
    }();
    f.usedId = 0, f.typeDefine = null;
    var d = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, h.default)(t, [ {
            key: "attach",
            value: function(t, i, e) {
                if (this.lastBase = null, null == t || null == this.window) return this;
                var n = t.make(t.typeDefine || t.type());
                null != i && null != i ? this.window.contentPane.addChildAt(n, i) : this.window.contentPane.addChild(n), 
                n instanceof fairygui.GButton ? n.opaque = !0 : n.opaque = !1;
                var s = new t(n);
                if (s._window = this, this.lastBase = s, e && (this.listByKeys[e] = s, s.baseKey = e), 
                this.list[s.id] = s, zs.configs.uiCfg && zs.configs.uiCfg.base && zs.configs.uiCfg.binder && zs.configs.uiCfg.binder[e]) {
                    s.bindBases = [];
                    var a = zs.configs.uiCfg.binder[e];
                    if (Array.isArray(a)) {
                        for (var o = 0, l = a.length; o < l; o++) if ("string" == typeof a[o]) {
                            var h = zs.configs.uiCfg.base[a[o]];
                            h && (zs.core.workflow || zs.core.workflow.checkSwitch(h.switch, h.check)) && s.bindBases.push(this.applyConfig(h).getBase());
                        }
                    } else if ("string" == typeof a) {
                        var w = zs.configs.uiCfg.base[a];
                        w && zs.core.workflow && zs.core.workflow.checkSwitch(w.switch, w.check) && s.bindBases.push(this.applyConfig(w).getBase());
                    }
                }
                return this.setBase(s), this;
            }
        }, {
            key: "detach",
            value: function(t) {
                if (null == t) return this;
                if ("number" == typeof t) this.window.contentPane.removeChildAt(t, !0); else if ("string" == typeof t) {
                    var i = this.listByKeys[t];
                    i && (i.dispose(), this.window.contentPane.removeChild(i.view, !0), this.list[i.id] && delete this.list[t.id]);
                } else {
                    if (t.baseKey && this.listByKeys[t.baseKey] && delete this.listByKeys[t.baseKey], 
                    t.bindBases && t.bindBases.length > 0) for (var e = 0; e < t.bindBases.length; e++) this.detach(t.bindBases[e]);
                    t.dispose(), this.window.contentPane.removeChild(t.view, !0), this.list[t.id] && delete this.list[t.id];
                }
                return this;
            }
        }, {
            key: "setBase",
            value: function(t, i) {
                return t && t.view ? (this.lastBase = t, i && (this.listByKeys[i] = t)) : this.lastBase = null, 
                this;
            }
        }, {
            key: "getBase",
            value: function() {
                return this.lastBase;
            }
        }, {
            key: "getBaseByKey",
            value: function(t) {
                var i = this.listByKeys[t];
                return !i || i.disposed ? null : i;
            }
        }, {
            key: "getBaseByType",
            value: function(t) {
                var i = [];
                for (var e in this.list) {
                    var n = this.list[e];
                    n && !n.disposed ? n instanceof t && i.push(n) : delete this.list[e];
                }
                return i;
            }
        }, {
            key: "clearBase",
            value: function() {
                return this.lastBase = null, this;
            }
        }, {
            key: "align",
            value: function(t, i, e) {
                if (this.lastBase) {
                    var n = this.lastBase.view.width * this.lastBase.view.scaleX, a = this.lastBase.view.height * this.lastBase.view.scaleY, o = 0;
                    switch (t) {
                      case s.Top:
                      case s.Center:
                      case s.Bottom:
                        o = .5 * (this.window.contentPane.width - n);
                        break;

                      case s.TopRight:
                      case s.Right:
                      case s.BottomRight:
                        o = this.window.contentPane.width - n;
                    }
                    var l = 0;
                    switch (t) {
                      case s.Left:
                      case s.Center:
                      case s.Right:
                        l = .5 * (this.window.contentPane.height - a);
                        break;

                      case s.BottomLeft:
                      case s.Bottom:
                      case s.BottomRight:
                        l = this.window.contentPane.height - a;
                    }
                    switch (this.lastBase.view.pivotAsAnchor && (o += n * this.lastBase.view.pivotX, 
                    l += a * this.lastBase.view.pivotY), i && (o += i), e && (l += e), this.lastBase.view.setXY(o, l), 
                    t) {
                      case s.TopLeft:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;

                      case s.Top:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;

                      case s.TopRight:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Top_Top);
                        break;

                      case s.Left:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;

                      case s.Center:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;

                      case s.Right:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Middle_Middle);
                        break;

                      case s.BottomLeft:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Left_Left), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                        break;

                      case s.Bottom:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Center_Center), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                        break;

                      case s.BottomRight:
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Right_Right), 
                        this.lastBase.view.addRelation(this.window.contentPane, fairygui.RelationType.Bottom_Bottom);
                    }
                }
                return this;
            }
        }, {
            key: "setX",
            value: function(t) {
                return this.lastBase && (this.lastBase.view.x = t), this;
            }
        }, {
            key: "setWindowX",
            value: function(t) {
                return this.window && (this.window.x = t), this;
            }
        }, {
            key: "setY",
            value: function(t) {
                return this.lastBase && (this.lastBase.view.y = t), this;
            }
        }, {
            key: "setWindowY",
            value: function(t) {
                return this.window && (this.window.y = t), this;
            }
        }, {
            key: "setXY",
            value: function(t, i) {
                return this.lastBase && (this.lastBase.view.x = t, this.lastBase.view.y = i), this;
            }
        }, {
            key: "setWindowXY",
            value: function(t, i) {
                return this.window && (this.window.x = t, this.window.y = i), this;
            }
        }, {
            key: "setWidth",
            value: function(t) {
                return this.lastBase && (this.lastBase.view.width = t), this;
            }
        }, {
            key: "setWindowWidth",
            value: function(t) {
                return this.window && (this.window.width = t), this;
            }
        }, {
            key: "setHeight",
            value: function(t) {
                return this.lastBase && (this.lastBase.view.height = t), this;
            }
        }, {
            key: "setWindowHeight",
            value: function(t) {
                return this.window && (this.window.height = t), this;
            }
        }, {
            key: "scaleFitWindow",
            value: function(t, i) {
                if (this.window) {
                    var e;
                    e = i / t >= fairygui.GRoot.inst.width / fairygui.GRoot.inst.height ? fairygui.GRoot.inst.height / i : fairygui.GRoot.inst.width / t, 
                    this.window.setScale(e, e);
                }
                return this;
            }
        }, {
            key: "scaleFit",
            value: function(t, i) {
                if (this.lastBase) {
                    var e;
                    e = i / t >= this.window.contentPane.height / this.window.contentPane.width ? this.window.contentPane.height / i : this.window.contentPane.width / t, 
                    this.lastBase.view.setScale(e, e);
                }
                return this;
            }
        }, {
            key: "scaleWindow",
            value: function(t, i) {
                return this.window && this.window.setScale(t, i), this;
            }
        }, {
            key: "scale",
            value: function(t, i) {
                return this.lastBase && this.lastBase.view.setScale(t, i), this;
            }
        }, {
            key: "fitScale",
            value: function(t, i) {
                return this.lastBase && this.lastBase.view.setScale(this.lastBase.view.scaleX * t, this.lastBase.view.scaleY * i), 
                this;
            }
        }, {
            key: "fit",
            value: function() {
                if (this.lastBase) {
                    var t = 0, i = 0;
                    this.lastBase.view.width = this.window.contentPane.width / this.lastBase.view.scaleX * (1 / this.window.scaleX), 
                    this.lastBase.view.height = this.window.contentPane.height / this.lastBase.view.scaleY * (1 / this.window.scaleY), 
                    this.lastBase.view.pivotAsAnchor && (t += this.lastBase.view.width * this.lastBase.view.scaleX * this.lastBase.view.pivotX, 
                    i += this.lastBase.view.height * this.lastBase.view.scaleY * this.lastBase.view.pivotY), 
                    this.lastBase.view.x = t, this.lastBase.view.y = i;
                }
                return this;
            }
        }, {
            key: "fitWidth",
            value: function(t) {
                if (this.lastBase) {
                    var i = this.window.contentPane.width / this.lastBase.view.width;
                    this.lastBase.view.width = this.window.contentPane.width * (1 / this.window.scaleX), 
                    this.lastBase.view.x = this.lastBase.view.pivotAsAnchor ? this.lastBase.view.width * this.lastBase.view.pivotX : 0, 
                    t && (this.lastBase.view.height *= i * (1 / this.window.scaleY), this.lastBase.view.y = this.lastBase.view.y + (this.lastBase.view.pivotAsAnchor ? this.lastBase.view.height * this.lastBase.view.pivotY : 0));
                }
                return this;
            }
        }, {
            key: "fitHeight",
            value: function(t) {
                if (this.lastBase) {
                    var i = this.window.contentPane.height / this.lastBase.view.height;
                    this.lastBase.view.height = this.window.contentPane.height * (1 / this.window.scaleY), 
                    this.lastBase.view.y = this.lastBase.view.pivotAsAnchor ? this.lastBase.view.height * this.lastBase.view.pivotY : 0, 
                    t && (this.lastBase.view.width *= i * (1 / this.window.scaleX), this.lastBase.view.x = this.lastBase.view.x + (this.lastBase.view.pivotAsAnchor ? this.lastBase.view.width * this.lastBase.view.pivotX : 0));
                }
                return this;
            }
        }, {
            key: "block",
            value: function(t) {
                return this.lastBase && (this.lastBase.view.opaque = t), this;
            }
        }, {
            key: "autoFront",
            value: function(t) {
                return null != this.window && (this.window.bringToFontOnClick = t), this;
            }
        }, {
            key: "front",
            value: function() {
                if (null != this.window) {
                    var t = this.window.root;
                    t.getChildIndex(this.window) >= 0 && t.setChildIndex(this.window, t.numChildren - 1), 
                    this.checkMsgbox();
                }
                return this;
            }
        }, {
            key: "top",
            value: function() {
                if (this.lastBase) {
                    var t = this.window.contentPane;
                    t.getChildIndex(this.lastBase.view) >= 0 && t.setChildIndex(this.lastBase.view, t.numChildren - 1);
                }
                return this;
            }
        }, {
            key: "update",
            value: function(t, i, e) {
                return this.lastBase && (this.lastBase instanceof t && this.lastBase.view ? i.call(e, this.lastBase, this.window) : zs.log.warn("UI类型不匹配，无法生成对应系统!", this.lastBase)), 
                this;
            }
        }, {
            key: "show",
            value: function() {
                return null != this.window && (this.window.show(), this.checkMsgbox()), this;
            }
        }, {
            key: "hide",
            value: function() {
                return null != this.window && this.window.hide(), this;
            }
        }, {
            key: "clear",
            value: function() {
                if (null != this.window) {
                    for (var t = this.window.contentPane.numChildren - 1; t >= 0; t--) {
                        var i = this.window.contentPane.getChildAt(t);
                        i && i.baseCtrl && i.baseCtrl.dispose && i.baseCtrl.dispose();
                    }
                    this.window.contentPane.removeChildren(0, -1, !0);
                }
                return this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                var i = r.bases[t.type];
                if (null == i) return this;
                if (this.attach(i, null, t.key), t.window) {
                    if (null != t.window.width && this.setWidth(t.window.width), null != t.window.height && this.setHeight(t.window.height), 
                    !t.window.ignoreautoscale && !t.window.ignore_auto_scale && (zs.configs.gameCfg.autoScaleFit || null != t.window.scale_fit || null != t.window.scalefit)) {
                        var e = t.window.scale_fit || t.window.scalefit;
                        null == e || !Array.isArray(e) || e.length <= 1 ? this.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight) : this.scaleFit(e[0], e[1]);
                    }
                    if (t.window.fitscale || t.window.fit_scale) {
                        var n = t.window.fit_scale || t.window.fitscale;
                        Array.isArray(n) && n.length > 1 && this.fitScale(n[0], n[1]);
                    }
                    t.window.scale && Array.isArray(t.window.scale) && t.window.scale.length > 1 && this.scale(t.window.scale[0], t.window.scale[1]), 
                    (t.window.fit_width || t.window.fitwidth) && this.fitWidth(), (t.window.fit_height || t.window.fitheight) && this.fitHeight(), 
                    t.window.fit && this.fit();
                }
                if (t.base ? this.update(i, function(i) {
                    i.applyConfig(t.base);
                }) : this.update(i, function(t) {
                    t.apply();
                }), t.window) {
                    if (t.window.align) switch (t.window.align) {
                      case "center":
                        this.align(s.Center, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "top":
                        this.align(s.Top, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "bottom":
                        this.align(s.Bottom, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "left":
                        this.align(s.Left, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "right":
                        this.align(s.Right, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "topleft":
                        this.align(s.TopLeft, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "bottomleft":
                        this.align(s.BottomLeft, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "topright":
                        this.align(s.TopRight, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                        break;

                      case "bottomright":
                        this.align(s.BottomRight, t.window.alignoffset_x || t.window.alignoffsetx || 0, t.window.alignoffset_y || t.window.alignoffsety || 0);
                    }
                    null != t.window.x && this.setX(t.window.x), null != t.window.y && this.setY(t.window.y), 
                    null != t.window.block && this.block(t.window.block), (null != t.window.auto_front || null != t.window.autofront) && this.autoFront(t.window.auto_front || t.window.autofront), 
                    t.window.front && this.front(), t.window.top && this.top();
                }
                return this;
            }
        }, {
            key: "dispose",
            value: function() {
                if (null != this.window) {
                    for (var t = this.window.contentPane.numChildren - 1; t >= 0; t--) {
                        var i = this.window.contentPane.getChildAt(t);
                        i && i.baseCtrl && i.baseCtrl.dispose && (i.baseCtrl.dispose(), i.dispose());
                    }
                    this.window.dispose();
                }
            }
        }, {
            key: "isShowing",
            value: function() {
                return null != this.window && this.window.isShowing;
            }
        }, {
            key: "checkMsgbox",
            value: function() {
                if (g._windowInst && g._windowInst.isShowing()) {
                    var t = g._windowInst.window, i = t.root;
                    i.getChildIndex(t) >= 0 && i.setChildIndex(t, i.numChildren - 1);
                }
                if (v.inst && v.inst.view.visible) {
                    var e = v._windowInst.window, n = e.root;
                    n.getChildIndex(e) >= 0 && n.setChildIndex(e, n.numChildren - 1);
                }
            }
        }, {
            key: "listByKeys",
            get: function() {
                return null == this._listByKeys && (this._listByKeys = {}), this._listByKeys;
            }
        }, {
            key: "list",
            get: function() {
                return null == this._list && (this._list = {}), this._list;
            }
        } ], [ {
            key: "create",
            value: function(i, e, n, s) {
                null == i && (i = 0), null == e && (e = 0), null == n && (n = fairygui.GRoot.inst.width), 
                null == s && (s = fairygui.GRoot.inst.height);
                var a = new t();
                a.window = new fairygui.Window(), a.window.x = i, a.window.y = e, a.window.width = n, 
                a.window.height = s;
                var o = new fairygui.GComponent();
                return a.window.contentPane = o, o.x = 0, o.y = 0, o.width = n, o.height = s, a;
            }
        } ]), t;
    }(), c = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, h.default)(t, null, [ {
            key: "get",
            value: function(t, i) {
                var e = this.defaultPanel;
                return null != t && t.trim().length > 0 && (t = t.trim(), e = this.list[t]), null == e && i && (e = d.create(), 
                null != t && t.trim().length > 0 ? this.list[t] = e : this.defaultPanel = e), e;
            }
        }, {
            key: "open",
            value: function(t, i, e) {
                var n = this.defaultPanel;
                if (null != i && i.trim().length > 0 && (i = i.trim(), n = this.list[i]), null != n && n.dispose(), 
                n = d.create(), t) switch (n.attach(t), null != e && null != e || (e = a.Both), 
                e) {
                  case a.Fit:
                    n.fit();
                    break;

                  case a.ScaleFit:
                    n.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight);
                    break;

                  case a.Both:
                    n.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight).fit();
                }
                return n.show(), null != i && i.trim().length > 0 ? this.list[i] = n : this.defaultPanel = n, 
                n;
            }
        }, {
            key: "show",
            value: function(t, i, e, n) {
                var s = this.defaultPanel;
                if (null != e && e.trim().length > 0 && (e = e.trim(), s = this.list[e]), null != s) {
                    if (i) {
                        var o = s.getBaseByType(i);
                        if (o && o.length > 0) s.setBase(o[0]); else switch (s.attach(i), null != n && null != n || (n = a.Both), 
                        n) {
                          case a.Fit:
                            s.fit();
                            break;

                          case a.ScaleFit:
                            s.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight);
                            break;

                          case a.Both:
                            s.scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight).fit();
                        }
                    }
                } else if (t) return this.open(i, e, n);
                return s.show();
            }
        }, {
            key: "hide",
            value: function(t) {
                var i = this.defaultPanel;
                return null != t && t.trim().length > 0 && (t = t.trim(), i = this.list[t]), null != i && i.hide(), 
                i;
            }
        }, {
            key: "list",
            get: function() {
                return null == this._list && (this._list = {}), this._list;
            }
        } ]), t;
    }();
    c.defaultPanel = null;
    var g = function(t) {
        (0, o.default)(e, t);
        var i = w(e);
        function e(t) {
            var s;
            return (0, classCallCheck.default)(this, e), s = i.call(this, t), zs.proxy.Event.FGUIOnClick(t.btn_confirm, (0, 
            n.default)(s), s.onConfirmClick), zs.proxy.Event.FGUIOnClick(t.btn_cancel, (0, n.default)(s), s.onCancelClick), 
            s;
        }
        return (0, h.default)(e, null, [ {
            key: "show",
            value: function(t) {
                e.windowInst.isShowing() ? e.msgList.push(t) : e.windowInst.update(e, function(i) {
                    i.setTitle(t.title).setContent(t.content).setConfirmText(t.confirmText).setCancelText(t.cancelText).setConfirmHandler(t.confirmHandler).setCancelHandler(t.cancelHandler).switchCancel(t.hideCancel).apply();
                }).align(s.Center).show().front();
            }
        }, {
            key: "hide",
            value: function() {
                e.windowInst.hide(), e.msgList.length > 0 && e.show(e.msgList.pop());
            }
        }, {
            key: "clear",
            value: function() {
                e._msgList = [];
            }
        }, {
            key: "msgList",
            get: function() {
                return null == this._msgList && (this._msgList = []), this._msgList;
            }
        }, {
            key: "windowInst",
            get: function() {
                return null == this._windowInst && (this._windowInst = d.create().attach(e).scaleFit(zs.configs.gameCfg.designWidth, zs.configs.gameCfg.designHeight).block(!0)), 
                this._windowInst;
            }
        } ]), (0, h.default)(e, [ {
            key: "check",
            value: function(t) {
                return t instanceof zs.ui.FGUI_msgbox;
            }
        }, {
            key: "setTitle",
            value: function(t) {
                return this.view.title.text = t || "提示", this;
            }
        }, {
            key: "setContent",
            value: function(t) {
                return this.view.content.text = t || "", this;
            }
        }, {
            key: "setConfirmText",
            value: function(t) {
                return this.view.btn_confirm.title = t || "确定", this;
            }
        }, {
            key: "setCancelText",
            value: function(t) {
                return this.view.btn_cancel.title = t || "取消", this;
            }
        }, {
            key: "switchCancel",
            value: function(t) {
                return t ? this.hideCancel() : this.showCancel();
            }
        }, {
            key: "showCancel",
            value: function() {
                return this.view.state.selectedIndex = 1, this;
            }
        }, {
            key: "hideCancel",
            value: function() {
                return this.view.state.selectedIndex = 0, this;
            }
        }, {
            key: "setConfirmHandler",
            value: function(t) {
                return this.confirmHandler = t, this;
            }
        }, {
            key: "setCancelHandler",
            value: function(t) {
                return this.cancelHandler = t, this;
            }
        }, {
            key: "onConfirmClick",
            value: function() {
                this.confirmHandler && this.confirmHandler.run(), e.hide();
            }
        }, {
            key: "onCancelClick",
            value: function() {
                this.cancelHandler && this.cancelHandler.run(), e.hide();
            }
        } ], [ {
            key: "make",
            value: function() {
                return zs.ui.FGUI_msgbox.createInstance();
            }
        }, {
            key: "type",
            value: function() {
                return zs.ui.FGUI_msgbox;
            }
        } ]), e;
    }(f), v = function(t) {
        (0, o.default)(e, t);
        var i = w(e);
        function e(t) {
            var n;
            return (0, classCallCheck.default)(this, e), n = i.call(this, t), t.text = "", t.color = "#ff0000", 
            t.fontSize = 30, t.bold = !0, t.singleLine = !0, t.autoSize = !0, n;
        }
        return (0, h.default)(e, [ {
            key: "setText",
            value: function(t) {
                this.view.text = t;
            }
        }, {
            key: "text",
            get: function() {
                return this.view.text;
            }
        } ], [ {
            key: "make",
            value: function() {
                return new fairygui.GBasicTextField();
            }
        }, {
            key: "show",
            value: function(t) {
                null == this.inst && (this.inst = this.windowInst.attach(e).align(zs.fgui.AlignType.BottomLeft).show().front().getBase()), 
                this.inst && (this.inst.view.visible = !0, this.inst.setText(t));
            }
        }, {
            key: "hide",
            value: function() {
                this.inst && (this.inst.view.visible = !1);
            }
        }, {
            key: "windowInst",
            get: function() {
                return null == this._windowInst && (this._windowInst = d.create()), this._windowInst;
            }
        } ]), e;
    }(f);
    t.AlignType = s, t.FitType = a, t.configs = r, t.init = function() {
        fairygui.UIConfig.packageFileExtension = "bin", fairygui.UIConfig.bringWindowToFrontOnClick = !1, 
        r.onInit && r.onInit.run(), zs.proxy.initFGUIRoot();
    }, t.loadPack = u, t.loadPacks = function(t, n) {
        return new Promise(function() {
            var s = (0, asyncToGenerator.default)(regenerator.default.mark(function e(s, a) {
                var o, l, h;
                return regenerator.default.wrap(function(i) {
                    console.log("loadPacks",i.next)
                    for (;;) switch (i.prev = i.next) {
                      case 0:
                        if (!(null == t || t.length <= 0)) {
                            i.next = 2;
                            break;
                        }
                        return i.abrupt("return", s(null));

                      case 2:
                        o = [], l = 0, h = t.length;

                      case 4:
                        if (!(l < h)) {
                            i.next = 13;
                            break;
                        }
                        return i.t0 = o, i.next = 8, u(t[l], n).catch(function(t) {
                            return t;
                        });

                      case 8:
                        i.t1 = i.sent, i.t0.push.call(i.t0, i.t1);

                      case 10:
                        l++, i.next = 4;
                        break;

                      case 13:
                        s(o);

                      case 14:
                      case "end":
                        return i.stop();
                    }
                }, e);
            }));
            return function(t, i) {
                return s.apply(this, arguments);
            };
        }());
    }, t.base = f, t.baseGeneric = function(t) {
        (0, o.default)(e, t);
        var i = w(e);
        function e() {
            return (0, classCallCheck.default)(this, e), i.apply(this, arguments);
        }
        return (0, h.default)(e, [ {
            key: "view",
            get: function() {
                return this._view;
            }
        } ]), e;
    }(f), t.window = d, t.manager = c, t.msgbox = g, t.msgtext = v;
}(window.zs.fgui = window.zs.fgui || {});