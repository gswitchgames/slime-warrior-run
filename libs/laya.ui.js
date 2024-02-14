"use strict";
var t = require("../@babel/runtime/helpers/interopRequireDefault")
  , e = t(require("../@babel/runtime/helpers/assertThisInitialized"))
  , asetset = t(require("../@babel/runtime/helpers/set"))
  , s = t(require("../@babel/runtime/helpers/createClass"))
  , ngetget = t(require("../@babel/runtime/helpers/get"))
  , possibleConstructorReturn = t(require("../@babel/runtime/helpers/possibleConstructorReturn"))
  , getPrototypeOf = t(require("../@babel/runtime/helpers/getPrototypeOf"))
  , l = t(require("../@babel/runtime/helpers/inherits"))
  , classCallCheck = t(require("../@babel/runtime/helpers/classCallCheck"));
function o(t) {
    if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
        if (Array.isArray(t) || (t = function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return u(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(i);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return u(t, e)
        }(t))) {
            var e = 0
              , i = function() {};
            return {
                s: i,
                n: function() {
                    return e >= t.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: t[e++]
                    }
                },
                e: function(t) {
                    throw t
                },
                f: i
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var s, n, a = !0, h = !1;
    return {
        s: function() {
            s = t[Symbol.iterator]()
        },
        n: function() {
            var t = s.next();
            return a = t.done,
            t
        },
        e: function(t) {
            h = !0,
            n = t
        },
        f: function() {
            try {
                a || null == s.return || s.return()
            } finally {
                if (h)
                    throw n
            }
        }
    }
}
function u(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var i = 0, s = new Array(e); i < e; i++)
        s[i] = t[i];
    return s
}



function testd() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
        return !1;
    if (Reflect.construct.sham)
        return !1;
    if ("function" == typeof Proxy)
        return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
        ))),
        !0
    } catch (t) {
        return !1
    }
}

function c(t) {
    return function() {
        var e, i = (0,
        getPrototypeOf.default)(t);
        if (testd()) {
            var s = (0,
            getPrototypeOf.default)(this).constructor;
            e = Reflect.construct(i, arguments, s)
        } else
            e = i.apply(this, arguments);
        return (0,
        possibleConstructorReturn.default)(this, e)
    }
}
function d() {
    if ("undefined" == typeof Reflect || !Reflect.construct)
        return !1;
    if (Reflect.construct.sham)
        return !1;
    if ("function" == typeof Proxy)
        return !0;
    try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
        ))),
        !0
    } catch (t) {
        return !1
    }
}
!function(t, a) {
    var u = function t() {
        (0,
        classCallCheck.default)(this, t)
    };
    u.touchScrollEnable = !0,
    u.mouseWheelEnable = !0,
    u.showButtons = !0,
    u.popupBgColor = "#000000",
    u.popupBgAlpha = .5,
    u.closeDialogOnSide = !0,
    window.UIConfig = u;
    var d = function t() {
        (0,
        classCallCheck.default)(this, t)
    };
    d.defaultSizeGrid = [4, 4, 4, 4, 0],
    d.labelColor = "#000000",
    d.labelPadding = [2, 2, 2, 2],
    d.inputLabelPadding = [1, 1, 1, 3],
    d.buttonStateNum = 3,
    d.buttonLabelColors = ["#32556b", "#32cc6b", "#ff0000", "#C0C0C0"],
    d.comboBoxItemColors = ["#5e95b6", "#ffffff", "#000000", "#8fa4b1", "#ffffff"],
    d.scrollBarMinNum = 15,
    d.scrollBarDelayTime = 500;
    var _ = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.apply(this, arguments)).autoCacheCmd = !0,
            t._width = 0,
            t._height = 0,
            t.uv = null,
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this),
                this._source = null,
                this._sizeGrid = null,
                this._offset = null
            }
        }, {
            key: "_setChanged",
            value: function() {
                this._isChanged || (this._isChanged = !0,
                a.ILaya.timer.callLater(this, this.changeSource))
            }
        }, {
            key: "changeSource",
            value: function() {
                this._isChanged = !1;
                var t = this._source;
                if (t && t.bitmap) {
                    var e = this.width
                      , i = this.height
                      , s = this._sizeGrid
                      , n = t.sourceWidth
                      , a = t.sourceHeight;
                    if (s && (n !== e || a !== i))
                        return this.clear(),
                        this.draw9Grid(t, 0, 0, e, i, s),
                        void this._repaint();
                    this.clear(),
                    this.drawTexture(t, this._offset ? this._offset[0] : 0, this._offset ? this._offset[1] : 0, e, i, null, 1, null, null, this.uv),
                    this._repaint()
                }
            }
        }, {
            key: "drawBitmap",
            value: function(t, e, i, s) {
                var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                  , a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                n < .1 || a < .1 || (!t || e.width == n && e.height == a ? this.drawImage(e, i, s, n, a) : this.fillTexture(e, i, s, n, a))
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._sizeGrid
            },
            set: function(t) {
                this._sizeGrid = t.map((function(t) {
                    return +t
                }
                )),
                this._setChanged()
            }
        }, {
            key: "width",
            get: function() {
                return this._width ? this._width : this._source ? this._source.sourceWidth : 0
            },
            set: function(t) {
                this._width != t && (this._width = t,
                this._setChanged())
            }
        }, {
            key: "height",
            get: function() {
                return this._height ? this._height : this._source ? this._source.sourceHeight : 0
            },
            set: function(t) {
                this._height != t && (this._height = t,
                this._setChanged())
            }
        }, {
            key: "source",
            get: function() {
                return this._source
            },
            set: function(t) {
                t ? (this._source = t,
                this._setChanged()) : (this._source = null,
                this.clear())
            }
        }], [{
            key: "getTexture",
            value: function(t, e, i, s, n) {
                var h;
                return s <= 0 && (s = 1),
                n <= 0 && (n = 1),
                t.$_GID || (t.$_GID = a.Utils.getGID()),
                h && h._getSource() || (h = a.Texture.createFromTexture(t, e, i, s, n)),
                h
            }
        }]),
        i
    }(a.Graphics);
    a.ClassUtils.regClass("laya.ui.AutoBitmap", _),
    a.ClassUtils.regClass("Laya.AutoBitmap", _);
    var f = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.apply(this, arguments))._top = NaN,
            t._bottom = NaN,
            t._left = NaN,
            t._right = NaN,
            t._centerX = NaN,
            t._centerY = NaN,
            t
        }
        return (0,
        s.default)(i, [{
            key: "onReset",
            value: function() {
                this._top = this._bottom = this._left = this._right = this._centerX = this._centerY = NaN
            }
        }, {
            key: "_onEnable",
            value: function() {
                this.owner.parent ? this._onAdded() : this.owner.once(a.Event.ADDED, this, this._onAdded)
            }
        }, {
            key: "_onDisable",
            value: function() {
                this.owner.off(a.Event.ADDED, this, this._onAdded),
                this.owner.parent && this.owner.parent.off(a.Event.RESIZE, this, this._onParentResize)
            }
        }, {
            key: "_onAdded",
            value: function() {
                this.owner.parent && this.owner.parent.on(a.Event.RESIZE, this, this._onParentResize),
                this.resetLayoutX(),
                this.resetLayoutY()
            }
        }, {
            key: "_onParentResize",
            value: function() {
                var t = this.resetLayoutX()
                  , e = this.resetLayoutY();
                (t || e) && this.owner.event(a.Event.RESIZE)
            }
        }, {
            key: "resetLayoutX",
            value: function() {
                var t = this.owner;
                if (!t)
                    return !1;
                var e = t.parent;
                if (e)
                    if (isNaN(this.centerX)) {
                        if (isNaN(this.left))
                            isNaN(this.right) || (t.x = Math.round(e.width - t.displayWidth - this.right + t.pivotX * t.scaleX));
                        else if (t.x = Math.round(this.left + t.pivotX * t.scaleX),
                        !isNaN(this.right)) {
                            var i = (e._width - this.left - this.right) / (t.scaleX || .01);
                            if (i != t.width)
                                return t.width = i,
                                !0
                        }
                    } else
                        t.x = Math.round(.5 * (e.width - t.displayWidth) + this.centerX + t.pivotX * t.scaleX);
                return !1
            }
        }, {
            key: "resetLayoutY",
            value: function() {
                var t = this.owner;
                if (!t)
                    return !1;
                var e = t.parent;
                if (e)
                    if (isNaN(this.centerY)) {
                        if (isNaN(this.top))
                            isNaN(this.bottom) || (t.y = Math.round(e.height - t.displayHeight - this.bottom + t.pivotY * t.scaleY));
                        else if (t.y = Math.round(this.top + t.pivotY * t.scaleY),
                        !isNaN(this.bottom)) {
                            var i = (e._height - this.top - this.bottom) / (t.scaleY || .01);
                            if (i != t.height)
                                return t.height = i,
                                !0
                        }
                    } else
                        t.y = Math.round(.5 * (e.height - t.displayHeight) + this.centerY + t.pivotY * t.scaleY);
                return !1
            }
        }, {
            key: "resetLayout",
            value: function() {
                this.owner && (this.resetLayoutX(),
                this.resetLayoutY())
            }
        }, {
            key: "top",
            get: function() {
                return this._top
            },
            set: function(t) {
                this._top != t && (this._top = t,
                this.resetLayoutY())
            }
        }, {
            key: "bottom",
            get: function() {
                return this._bottom
            },
            set: function(t) {
                this._bottom != t && (this._bottom = t,
                this.resetLayoutY())
            }
        }, {
            key: "left",
            get: function() {
                return this._left
            },
            set: function(t) {
                this._left != t && (this._left = t,
                this.resetLayoutX())
            }
        }, {
            key: "right",
            get: function() {
                return this._right
            },
            set: function(t) {
                this._right != t && (this._right = t,
                this.resetLayoutX())
            }
        }, {
            key: "centerX",
            get: function() {
                return this._centerX
            },
            set: function(t) {
                this._centerX != t && (this._centerX = t,
                this.resetLayoutX())
            }
        }, {
            key: "centerY",
            get: function() {
                return this._centerY
            },
            set: function(t) {
                this._centerY != t && (this._centerY = t,
                this.resetLayoutY())
            }
        }]),
        i
    }(a.Component);
    f.EMPTY = null,
    a.ILaya.regClass(f),
    f.EMPTY = new f,
    a.ClassUtils.regClass("laya.ui.Widget", f),
    a.ClassUtils.regClass("Laya.Widget", f);
    var g = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return i
    }(a.Event);
    g.SHOW_TIP = "showtip",
    g.HIDE_TIP = "hidetip",
    a.ILaya.regClass(g),
    a.ClassUtils.regClass("laya.ui.UIEvent", g),
    a.ClassUtils.regClass("Laya.UIEvent", g);
    var y = function() {
        function t() {
            (0,
            classCallCheck.default)(this, t)
        }
        return (0,
        s.default)(t, null, [{
            key: "fillArray",
            value: function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , s = t.concat();
                if (e)
                    for (var n = e.split(","), a = 0, h = Math.min(s.length, n.length); a < h; a++) {
                        var l = n[a];
                        s[a] = "true" == l || "false" != l && l,
                        null != i && (s[a] = i(l))
                    }
                return s
            }
        }, {
            key: "toColor",
            value: function(t) {
                return a.Utils.toHexColor(t)
            }
        }, {
            key: "gray",
            value: function(e) {
                var i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                i ? t.addFilter(e, t.grayFilter) : t.clearFilter(e, a.ColorFilter)
            }
        }, {
            key: "addFilter",
            value: function(t, e) {
                var i = t.filters || [];
                i.push(e),
                t.filters = i
            }
        }, {
            key: "clearFilter",
            value: function(t, e) {
                var i = t.filters;
                if (null != i && i.length > 0) {
                    for (var s = i.length - 1; s > -1; s--)
                        i[s]instanceof e && i.splice(s, 1);
                    t.filters = i
                }
            }
        }, {
            key: "_getReplaceStr",
            value: function(e) {
                return t.escapeSequence[e]
            }
        }, {
            key: "adptString",
            value: function(e) {
                return e.replace(/\\(\w)/g, t._getReplaceStr)
            }
        }, {
            key: "getBindFun",
            value: function(e) {
                t._funMap || (t._funMap = new a.WeakObject);
                var i = t._funMap.get(e);
                if (null == i) {
                    var s = '"' + e + '"'
                      , n = "(function(data){if(data==null)return;with(data){try{\nreturn " + (s = s.replace(/^"\${|}"$/g, "").replace(/\${/g, '"+').replace(/}/g, '+"')) + "\n}catch(e){}}})";
                    i = window.Laya._runScript(n),
                    t._funMap.set(e, i)
                }
                return i
            }
        }]),
        t
    }();
    y.grayFilter = new a.ColorFilter([.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0]),
    y.escapeSequence = {
        "\\n": "\n",
        "\\t": "\t"
    },
    y._funMap = null,
    a.ClassUtils.regClass("laya.ui.UIUtils", y),
    a.ClassUtils.regClass("Laya.UIUtils", y);
    var v = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this))._anchorX = NaN,
            t._anchorY = NaN,
            t._widget = f.EMPTY,
            s && (t.preinitialize(),
            t.createChildren(),
            t.initialize()),
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, t),
                this._dataSource = null,
                this._tag = null,
                this._toolTip = null
            }
        }, {
            key: "preinitialize",
            value: function() {}
        }, {
            key: "createChildren",
            value: function() {}
        }, {
            key: "initialize",
            value: function() {}
        }, {
            key: "get_width",
            value: function() {
                return this._width ? this._width : this.measureWidth()
            }
        }, {
            key: "measureWidth",
            value: function() {
                var t = 0;
                this.commitMeasure();
                for (var e = this.numChildren - 1; e > -1; e--) {
                    var i = this.getChildAt(e);
                    i._visible && (t = Math.max(i._x + i.width * i.scaleX, t))
                }
                return t
            }
        }, {
            key: "commitMeasure",
            value: function() {}
        }, {
            key: "get_height",
            value: function() {
                return this._height ? this._height : this.measureHeight()
            }
        }, {
            key: "measureHeight",
            value: function() {
                var t = 0;
                this.commitMeasure();
                for (var e = this.numChildren - 1; e > -1; e--) {
                    var i = this.getChildAt(e);
                    i._visible && (t = Math.max(i._y + i.height * i.scaleY, t))
                }
                return t
            }
        }, {
            key: "get_dataSource",
            value: function() {
                return this._dataSource
            }
        }, {
            key: "set_dataSource",
            value: function(t) {
                for (var e in this._dataSource = t,
                this._dataSource)
                    e in this && "function" != typeof this[e] && (this[e] = this._dataSource[e])
            }
        }, {
            key: "get_top",
            value: function() {
                return this._widget.top
            }
        }, {
            key: "set_top",
            value: function(t) {
                t != this._widget.top && (this._getWidget().top = t)
            }
        }, {
            key: "get_bottom",
            value: function() {
                return this._widget.bottom
            }
        }, {
            key: "set_bottom",
            value: function(t) {
                t != this._widget.bottom && (this._getWidget().bottom = t)
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                isNaN(this._anchorX) || (this.pivotX = this.anchorX * this.width),
                isNaN(this._anchorY) || (this.pivotY = this.anchorY * this.height),
                this.event(a.Event.RESIZE),
                this._widget !== f.EMPTY && this._widget.resetLayout()
            }
        }, {
            key: "onMouseOver",
            value: function(t) {
                a.ILaya.stage.event(g.SHOW_TIP, this._toolTip)
            }
        }, {
            key: "onMouseOut",
            value: function(t) {
                a.ILaya.stage.event(g.HIDE_TIP, this._toolTip)
            }
        }, {
            key: "_getWidget",
            value: function() {
                return this._widget === f.EMPTY && (this._widget = this.addComponent(f)),
                this._widget
            }
        }, {
            key: "set_scaleX",
            value: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_scaleX", this).call(this) != t && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_scaleX", this).call(this, t),
                this.event(a.Event.RESIZE))
            }
        }, {
            key: "set_scaleY",
            value: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_scaleY", this).call(this) != t && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_scaleY", this).call(this, t),
                this.event(a.Event.RESIZE))
            }
        }, {
            key: "onCompResize",
            value: function() {
                this._sizeChanged()
            }
        }, {
            key: "set_width",
            value: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_width", this).call(this) != t && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_width", this).call(this, t),
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "set_height",
            value: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_height", this).call(this) != t && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_height", this).call(this, t),
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "get_anchorX",
            value: function() {
                return this._anchorX
            }
        }, {
            key: "set_anchorX",
            value: function(t) {
                this._anchorX != t && (this._anchorX = t,
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "get_anchorY",
            value: function() {
                return this._anchorY
            }
        }, {
            key: "set_anchorY",
            value: function(t) {
                this._anchorY != t && (this._anchorY = t,
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "_childChanged",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.callLater(this._sizeChanged),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "_childChanged", this).call(this, t)
            }
        }, {
            key: "width",
            get: function() {
                return this.get_width()
            },
            set: function(t) {
                this.set_width(t)
            }
        }, {
            key: "height",
            get: function() {
                return this.get_height()
            },
            set: function(t) {
                this.set_height(t)
            }
        }, {
            key: "dataSource",
            get: function() {
                return this.get_dataSource()
            },
            set: function(t) {
                this.set_dataSource(t)
            }
        }, {
            key: "top",
            get: function() {
                return this.get_top()
            },
            set: function(t) {
                this.set_top(t)
            }
        }, {
            key: "bottom",
            get: function() {
                return this.get_bottom()
            },
            set: function(t) {
                this.set_bottom(t)
            }
        }, {
            key: "left",
            get: function() {
                return this._widget.left
            },
            set: function(t) {
                t != this._widget.left && (this._getWidget().left = t)
            }
        }, {
            key: "right",
            get: function() {
                return this._widget.right
            },
            set: function(t) {
                t != this._widget.right && (this._getWidget().right = t)
            }
        }, {
            key: "centerX",
            get: function() {
                return this._widget.centerX
            },
            set: function(t) {
                t != this._widget.centerX && (this._getWidget().centerX = t)
            }
        }, {
            key: "centerY",
            get: function() {
                return this._widget.centerY
            },
            set: function(t) {
                t != this._widget.centerY && (this._getWidget().centerY = t)
            }
        }, {
            key: "tag",
            get: function() {
                return this._tag
            },
            set: function(t) {
                this._tag = t
            }
        }, {
            key: "toolTip",
            get: function() {
                return this._toolTip
            },
            set: function(t) {
                this._toolTip != t && (this._toolTip = t,
                null != t ? (this.on(a.Event.MOUSE_OVER, this, this.onMouseOver),
                this.on(a.Event.MOUSE_OUT, this, this.onMouseOut)) : (this.off(a.Event.MOUSE_OVER, this, this.onMouseOver),
                this.off(a.Event.MOUSE_OUT, this, this.onMouseOut)))
            }
        }, {
            key: "gray",
            get: function() {
                return this._gray
            },
            set: function(t) {
                t !== this._gray && (this._gray = t,
                y.gray(this, t))
            }
        }, {
            key: "disabled",
            get: function() {
                return this._disabled
            },
            set: function(t) {
                t !== this._disabled && (this.gray = this._disabled = t,
                this.mouseEnabled = !t)
            }
        }, {
            key: "scaleX",
            set: function(t) {
                this.set_scaleX(t)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "scaleX", this)
            }
        }, {
            key: "scaleY",
            set: function(t) {
                this.set_scaleY(t)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "scaleY", this)
            }
        }, {
            key: "anchorX",
            get: function() {
                return this.get_anchorX()
            },
            set: function(t) {
                this.set_anchorX(t)
            }
        }, {
            key: "anchorY",
            get: function() {
                return this.get_anchorY()
            },
            set: function(t) {
                this.set_anchorY(t)
            }
        }]),
        i
    }(a.Sprite);
    a.ILaya.regClass(v),
    a.ClassUtils.regClass("laya.ui.UIComponent", v),
    a.ClassUtils.regClass("Laya.UIComponent", v);
    var p = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this)).skin = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._bitmap && this._bitmap.destroy(),
                this._bitmap = null
            }
        }, {
            key: "dispose",
            value: function() {
                this.destroy(!0),
                a.ILaya.loader.clearRes(this._skin)
            }
        }, {
            key: "createChildren",
            value: function() {
                this.graphics = this._bitmap = new _,
                this._bitmap.autoCacheCmd = !1
            }
        }, {
            key: "setSource",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                t === this._skin && e && (this.source = e,
                this.onCompResize())
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this._bitmap.width
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this._bitmap.height
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                if (this._skin != t)
                    if (this._skin = t,
                    t) {
                        var e = a.Loader.getRes(t);
                        e ? (this.source = e,
                        this.onCompResize()) : a.ILaya.loader.load(this._skin, a.Handler.create(this, this.setSource, [this._skin]), null, a.Loader.IMAGE, 1, !0, this._group)
                    } else
                        this.source = null
            }
        }, {
            key: "source",
            get: function() {
                return this._bitmap.source
            },
            set: function(t) {
                this._bitmap && (this._bitmap.source = t,
                this.event(a.Event.LOADED),
                this.repaint())
            }
        }, {
            key: "group",
            get: function() {
                return this._group
            },
            set: function(t) {
                t && this._skin && a.Loader.setGroup(this._skin, t),
                this._group = t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._bitmap.width = 0 == t ? 1e-7 : t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._bitmap.height = 0 == t ? 1e-7 : t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null
            },
            set: function(t) {
                this._bitmap.sizeGrid = y.fillArray(d.defaultSizeGrid, t, Number)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "string" == typeof t ? this.skin = t : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(p),
    a.ClassUtils.regClass("laya.ui.Image", p),
    a.ClassUtils.regClass("Laya.Image", p);
    var k = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this)).advsListArr = [],
            t.resUrl = "",//https://unioncdn.layabox.com/config/iconlist.json
            t._http = new a.Browser.window.XMLHttpRequest,
            t._data = [],
            t._resquestTime = 36e4,
            t._playIndex = 0,
            t._lunboTime = 5e3,
            t.skin = s,
            t.setLoadUrl(),
            t.init(),
            t.size(120, 120),
            t
        }
        return (0,
        s.default)(i, [{
            key: "setLoadUrl",
            value: function() {}
        }, {
            key: "init",
            value: function() {
                this.isSupportJump() ? ((a.Browser.onMiniGame || a.Browser.onBDMiniGame) && a.ILaya.timer.loop(this._resquestTime, this, this.onGetAdvsListData),
                this.onGetAdvsListData(),
                this.initEvent()) : this.visible = !1
            }
        }, {
            key: "initEvent",
            value: function() {
                this.on(a.Event.CLICK, this, this.onAdvsImgClick)
            }
        }, {
            key: "onAdvsImgClick",
            value: function() {
                this.getCurrentAppidObj() && this.jumptoGame()
            }
        }, {
            key: "revertAdvsData",
            value: function() {
                this.advsListArr[this._playIndex] && (this.visible = !0,
                this.skin = this.advsListArr[this._playIndex])
            }
        }, {
            key: "isSupportJump",
            value: function() {
                return a.Browser.onMiniGame ? window.wx.navigateToMiniProgram instanceof Function : !!a.Browser.onBDMiniGame
            }
        }, {
            key: "jumptoGame",
            value: function() {
                var t = this.advsListArr[this._playIndex];
                parseInt(t.gameid),
                t.extendInfo,
                t.path,
                a.Browser.onMiniGame ? this.isSupportJump() && window.wx.navigateToMiniProgram({
                    appId: this._appid,
                    path: "",
                    extraData: "",
                    envVersion: "release",
                    success: function() {
                        console.log("-------------跳转成功--------------")
                    },
                    fail: function() {
                        console.log("-------------跳转失败--------------")
                    },
                    complete: function() {
                        console.log("-------------跳转接口调用成功--------------"),
                        this.updateAdvsInfo()
                    }
                    .bind(this)
                }) : a.Browser.onBDMiniGame || (this.visible = !1)
            }
        }, {
            key: "updateAdvsInfo",
            value: function() {
                this.visible = !1,
                this.onLunbo(),
                a.ILaya.timer.loop(this._lunboTime, this, this.onLunbo)
            }
        }, {
            key: "onLunbo",
            value: function() {
                this._playIndex >= this.advsListArr.length - 1 ? this._playIndex = 0 : this._playIndex += 1,
                this.visible = !0,
                this.revertAdvsData()
            }
        }, {
            key: "getCurrentAppidObj",
            value: function() {
                return this.advsListArr[this._playIndex]
            }
        }, {
            key: "onGetAdvsListData",
            value: function() {
                var t = this
                  , e = i.randRange(1e4, 1e6)
                  , s = this.resUrl + "?" + e;
                this._http.open("get", s, !0),
                this._http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                this._http.responseType = "text",
                this._http.onerror = function(e) {
                    t._onError(e)
                }
                ,
                this._http.onload = function(e) {
                    t._onLoad(e)
                }
                ,
                this._http.send(null)
            }
        }, {
            key: "_onError",
            value: function(t) {
                this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText)
            }
        }, {
            key: "_onLoad",
            value: function(t) {
                var e = this._http
                  , i = void 0 !== e.status ? e.status : 200;
                200 === i || 204 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL)
            }
        }, {
            key: "error",
            value: function(t) {
                this.event(a.Event.ERROR, t)
            }
        }, {
            key: "complete",
            value: function() {
                try {
                    this._data = this._http.response || this._http.responseText,
                    this._data = JSON.parse(this._data),
                    this.advsListArr = this._data.list,
                    this._appid = this._data.appid,
                    this.updateAdvsInfo(),
                    this.revertAdvsData()
                } catch (t) {
                    this.error(t.message)
                }
            }
        }, {
            key: "getAdvsQArr",
            value: function(t) {
                var e = []
                  , i = a.LocalStorage.getJSON("gameObj");
                for (var s in t) {
                    var n = t[s];
                    i && i[n.gameid] && !n.isQiangZhi || e.push(n)
                }
                return e
            }
        }, {
            key: "clear",
            value: function() {
                var t = this._http;
                t.onerror = t.onabort = t.onprogress = t.onload = null
            }
        }, {
            key: "destroy",
            value: function() {
                a.ILaya.timer.clear(this, this.onLunbo),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, !0),
                this.clear(),
                a.ILaya.timer.clear(this, this.onGetAdvsListData)
            }
        }], [{
            key: "randRange",
            value: function(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            }
        }]),
        i
    }(p);
    a.ClassUtils.regClass("laya.ui.AdvImage", k),
    a.ClassUtils.regClass("Laya.AdvImage", k);
    var C = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(i, [{
            key: "_onResize",
            value: function(t) {
                this.graphics.clear(),
                this.graphics.drawRect(0, 0, this.width, this.height, this._bgColor)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                for (var e in this._dataSource = t,
                t) {
                    var i = this.getChildByName(e);
                    i ? i.dataSource = t[e] : e in this && !(this[e]instanceof Function) && (this[e] = t[e])
                }
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "dataSource", this)
            }
        }, {
            key: "bgColor",
            get: function() {
                return this._bgColor
            },
            set: function(t) {
                this._bgColor = t,
                t ? (this._onResize(null),
                this.on(a.Event.RESIZE, this, this._onResize)) : (this.graphics.clear(),
                this.off(a.Event.RESIZE, this, this._onResize))
            }
        }]),
        i
    }(v);
    a.ILaya.regClass(C),
    a.ClassUtils.regClass("laya.ui.Box", C),
    a.ClassUtils.regClass("Laya.Box", C);
    var m = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this))._labelColors = d.buttonLabelColors,
            t._state = 0,
            t._autoSize = !0,
            t._stateNum = d.buttonStateNum,
            t._stateChanged = !1,
            t.skin = s,
            t.label = n,
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, t),
                this._bitmap && this._bitmap.destroy(),
                this._text && this._text.destroy(t),
                this._bitmap = null,
                this._text = null,
                this._clickHandler = null,
                this._labelColors = this._sources = this._strokeColors = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.graphics = this._bitmap = new _
            }
        }, {
            key: "createText",
            value: function() {
                this._text || (this._text = new a.Text,
                this._text.overflow = a.Text.HIDDEN,
                this._text.align = "center",
                this._text.valign = "middle",
                this._text.width = this._width,
                this._text.height = this._height)
            }
        }, {
            key: "initialize",
            value: function() {
                1 !== this._mouseState && (this.mouseEnabled = !0,
                this._setBit(a.Const.HAS_MOUSE, !0)),
                this._createListener(a.Event.MOUSE_OVER, this, this.onMouse, null, !1, !1),
                this._createListener(a.Event.MOUSE_OUT, this, this.onMouse, null, !1, !1),
                this._createListener(a.Event.MOUSE_DOWN, this, this.onMouse, null, !1, !1),
                this._createListener(a.Event.MOUSE_UP, this, this.onMouse, null, !1, !1),
                this._createListener(a.Event.CLICK, this, this.onMouse, null, !1, !1)
            }
        }, {
            key: "onMouse",
            value: function(t) {
                if (!1 !== this.toggle || !this._selected)
                    return t.type === a.Event.CLICK ? (this.toggle && (this.selected = !this._selected),
                    void (this._clickHandler && this._clickHandler.run())) : void (!this._selected && (this.state = i.stateMap[t.type]))
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this.callLater(this.changeClips),
                this._setStateChanged(),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "changeClips",
            value: function() {
                var t = a.Loader.getRes(this._skin);
                if (t) {
                    var e = t.sourceWidth
                      , i = t.sourceHeight / this._stateNum;
                    t.$_GID || (t.$_GID = a.Utils.getGID());
                    var s = t.$_GID + "-" + this._stateNum
                      , n = a.WeakObject.I.get(s);
                    if (a.Utils.isOkTextureList(n) || (n = null),
                    n)
                        this._sources = n;
                    else {
                        if (this._sources = [],
                        1 === this._stateNum)
                            this._sources.push(t);
                        else
                            for (var h = 0; h < this._stateNum; h++)
                                this._sources.push(a.Texture.createFromTexture(t, 0, i * h, e, i));
                        a.WeakObject.I.set(s, this._sources)
                    }
                    this._autoSize ? (this._bitmap.width = this._width || e,
                    this._bitmap.height = this._height || i,
                    this._text && (this._text.width = this._bitmap.width,
                    this._text.height = this._bitmap.height)) : this._text && (this._text.x = e)
                } else
                    console.log("lose skin", this._skin)
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this.runCallLater(this.changeClips),
                this._autoSize ? this._bitmap.width : (this.runCallLater(this.changeState),
                this._bitmap.width + (this._text ? this._text.width : 0))
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this.runCallLater(this.changeClips),
                this._text ? Math.max(this._bitmap.height, this._text.height) : this._bitmap.height
            }
        }, {
            key: "changeState",
            value: function() {
                this._stateChanged = !1,
                this.runCallLater(this.changeClips);
                var t = this._state < this._stateNum ? this._state : this._stateNum - 1;
                this._sources && (this._bitmap.source = this._sources[t]),
                this.label && (this._text.color = this._labelColors[t],
                this._strokeColors && (this._text.strokeColor = this._strokeColors[t]))
            }
        }, {
            key: "_setStateChanged",
            value: function() {
                this._stateChanged || (this._stateChanged = !0,
                this.callLater(this.changeState))
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                t ? a.Loader.getRes(t) ? this._skinLoaded() : a.ILaya.loader.load(this._skin, a.Handler.create(this, this._skinLoaded), null, a.Loader.IMAGE, 1) : this._skinLoaded())
            }
        }, {
            key: "stateNum",
            get: function() {
                return this._stateNum
            },
            set: function(t) {
                "string" == typeof t && (t = parseInt(t)),
                this._stateNum != t && (this._stateNum = t < 1 ? 1 : t > 3 ? 3 : t,
                this.callLater(this.changeClips))
            }
        }, {
            key: "label",
            get: function() {
                return this._text ? this._text.text : null
            },
            set: function(t) {
                (this._text || t) && (this.createText(),
                this._text.text != t && (t && !this._text.parent && this.addChild(this._text),
                this._text.text = (t + "").replace(/\\n/g, "\n"),
                this._setStateChanged()))
            }
        }, {
            key: "selected",
            get: function() {
                return this._selected
            },
            set: function(t) {
                this._selected != t && (this._selected = t,
                this.state = this._selected ? 2 : 0,
                this.event(a.Event.CHANGE))
            }
        }, {
            key: "state",
            get: function() {
                return this._state
            },
            set: function(t) {
                this._state != t && (this._state = t,
                this._setStateChanged())
            }
        }, {
            key: "labelColors",
            get: function() {
                return this._labelColors.join(",")
            },
            set: function(t) {
                this._labelColors = y.fillArray(d.buttonLabelColors, t, String),
                this._setStateChanged()
            }
        }, {
            key: "strokeColors",
            get: function() {
                return this._strokeColors ? this._strokeColors.join(",") : ""
            },
            set: function(t) {
                this._strokeColors = y.fillArray(d.buttonLabelColors, t, String),
                this._setStateChanged()
            }
        }, {
            key: "labelPadding",
            get: function() {
                return this.createText(),
                this._text.padding.join(",")
            },
            set: function(t) {
                this.createText(),
                this._text.padding = y.fillArray(d.labelPadding, t, Number)
            }
        }, {
            key: "labelSize",
            get: function() {
                return this.createText(),
                this._text.fontSize
            },
            set: function(t) {
                this.createText(),
                this._text.fontSize = t
            }
        }, {
            key: "labelStroke",
            get: function() {
                return this.createText(),
                this._text.stroke
            },
            set: function(t) {
                this.createText(),
                this._text.stroke = t
            }
        }, {
            key: "labelStrokeColor",
            get: function() {
                return this.createText(),
                this._text.strokeColor
            },
            set: function(t) {
                this.createText(),
                this._text.strokeColor = t
            }
        }, {
            key: "labelBold",
            get: function() {
                return this.createText(),
                this._text.bold
            },
            set: function(t) {
                this.createText(),
                this._text.bold = t
            }
        }, {
            key: "labelFont",
            get: function() {
                return this.createText(),
                this._text.font
            },
            set: function(t) {
                this.createText(),
                this._text.font = t
            }
        }, {
            key: "labelAlign",
            get: function() {
                return this.createText(),
                this._text.align
            },
            set: function(t) {
                this.createText(),
                this._text.align = t
            }
        }, {
            key: "clickHandler",
            get: function() {
                return this._clickHandler
            },
            set: function(t) {
                this._clickHandler = t
            }
        }, {
            key: "text",
            get: function() {
                return this.createText(),
                this._text
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null
            },
            set: function(t) {
                this._bitmap.sizeGrid = y.fillArray(d.defaultSizeGrid, t, Number)
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_width", this).call(this, t),
                this._autoSize && (this._bitmap.width = t,
                this._text && (this._text.width = t))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_width", this).call(this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_height", this).call(this, t),
                this._autoSize && (this._bitmap.height = t,
                this._text && (this._text.height = t))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_height", this).call(this)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.label = t + "" : (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "set_dataSource", this).call(this, t)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "get_dataSource", this).call(this)
            }
        }, {
            key: "iconOffset",
            get: function() {
                return this._bitmap._offset ? this._bitmap._offset.join(",") : null
            },
            set: function(t) {
                this._bitmap._offset = t ? y.fillArray([1, 1], t, Number) : []
            }
        }]),
        i
    }(v);
    m.stateMap = {
        mouseup: 0,
        mouseover: 1,
        mousedown: 2,
        mouseout: 0
    },
    a.ILaya.regClass(m),
    a.ClassUtils.regClass("laya.ui.Button", m),
    a.ClassUtils.regClass("Laya.Button", m);
    var S = function(t) {
        (0,
        l.default)(a, t);
        var e = c(a);
        function a() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return (0,
            classCallCheck.default)(this, a),
            (t = e.call(this, i, s)).toggle = !0,
            t._autoSize = !1,
            t
        }
        return (0,
        s.default)(a, [{
            key: "preinitialize",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(a.prototype), "preinitialize", this).call(this),
                this.toggle = !0,
                this._autoSize = !1
            }
        }, {
            key: "initialize",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(a.prototype), "initialize", this).call(this),
                this.createText(),
                this._text.align = "left",
                this._text.valign = "top",
                this._text.width = 0
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                t instanceof Boolean ? this.selected = t : "string" == typeof t ? this.selected = "true" === t : (0,
                asetset.default)((0,
                getPrototypeOf.default)(a.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(a.prototype), "dataSource", this)
            }
        }]),
        a
    }(m);
    a.ILaya.regClass(S),
    a.ClassUtils.regClass("laya.ui.CheckBox", S),
    a.ClassUtils.regClass("Laya.CheckBox", S);
    var b = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._clipX = 1,
            t._clipY = 1,
            t._clipWidth = 0,
            t._clipHeight = 0,
            t._interval = 50,
            t._index = 0,
            t._toIndex = -1,
            t._clipX = s,
            t._clipY = n,
            t.skin = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, !0),
                this._bitmap && this._bitmap.destroy(),
                this._bitmap = null,
                this._sources = null
            }
        }, {
            key: "dispose",
            value: function() {
                this.destroy(!0),
                a.ILaya.loader.clearRes(this._skin)
            }
        }, {
            key: "createChildren",
            value: function() {
                this.graphics = this._bitmap = new _
            }
        }, {
            key: "_onDisplay",
            value: function(t) {
                this._isPlaying ? this._getBit(a.Const.DISPLAYED_INSTAGE) ? this.play() : this.stop() : this._autoPlay && this.play()
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this._setClipChanged(),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "changeClip",
            value: function() {
                if (this._clipChanged = !1,
                this._skin) {
                    var t = a.Loader.getRes(this._skin);
                    t ? this.loadComplete(this._skin, t) : a.ILaya.loader.load(this._skin, a.Handler.create(this, this.loadComplete, [this._skin]))
                }
            }
        }, {
            key: "loadComplete",
            value: function(t, e) {
                if (t === this._skin && e) {
                    var i = this._clipWidth || Math.ceil(e.sourceWidth / this._clipX)
                      , s = this._clipHeight || Math.ceil(e.sourceHeight / this._clipY)
                      , n = this._skin + i + s
                      , h = a.WeakObject.I.get(n);
                    if (a.Utils.isOkTextureList(h) || (h = null),
                    h)
                        this._sources = h;
                    else {
                        this._sources = [];
                        for (var l = 0; l < this._clipY; l++)
                            for (var r = 0; r < this._clipX; r++)
                                this._sources.push(a.Texture.createFromTexture(e, i * r, s * l, i, s));
                        a.WeakObject.I.set(n, this._sources)
                    }
                    this.index = this._index,
                    this.event(a.Event.LOADED),
                    this.onCompResize()
                }
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this.runCallLater(this.changeClip),
                this._bitmap.width
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this.runCallLater(this.changeClip),
                this._bitmap.height
            }
        }, {
            key: "play",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
                this._isPlaying = !0,
                this.index = t,
                this._toIndex = e,
                this._index++,
                a.ILaya.timer.loop(this.interval, this, this._loop),
                this.on(a.Event.DISPLAY, this, this._onDisplay),
                this.on(a.Event.UNDISPLAY, this, this._onDisplay)
            }
        }, {
            key: "_loop",
            value: function() {
                this._visible && this._sources && (this._index++,
                this._toIndex > -1 && this._index >= this._toIndex ? this.stop() : this._index >= this._sources.length && (this._index = 0),
                this.index = this._index)
            }
        }, {
            key: "stop",
            value: function() {
                this._isPlaying = !1,
                a.ILaya.timer.clear(this, this._loop),
                this.event(a.Event.COMPLETE)
            }
        }, {
            key: "_setClipChanged",
            value: function() {
                this._clipChanged || (this._clipChanged = !0,
                this.callLater(this.changeClip))
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                t ? a.Loader.getRes(t) ? this._skinLoaded() : a.ILaya.loader.load(this._skin, a.Handler.create(this, this._skinLoaded), null, a.Loader.IMAGE, 1) : this._bitmap.source = null)
            }
        }, {
            key: "clipX",
            get: function() {
                return this._clipX
            },
            set: function(t) {
                this._clipX = t || 1,
                this._setClipChanged()
            }
        }, {
            key: "clipY",
            get: function() {
                return this._clipY
            },
            set: function(t) {
                this._clipY = t || 1,
                this._setClipChanged()
            }
        }, {
            key: "clipWidth",
            get: function() {
                return this._clipWidth
            },
            set: function(t) {
                this._clipWidth = t,
                this._setClipChanged()
            }
        }, {
            key: "clipHeight",
            get: function() {
                return this._clipHeight
            },
            set: function(t) {
                this._clipHeight = t,
                this._setClipChanged()
            }
        }, {
            key: "sources",
            get: function() {
                return this._sources
            },
            set: function(t) {
                this._sources = t,
                this.index = this._index,
                this.event(a.Event.LOADED)
            }
        }, {
            key: "group",
            get: function() {
                return this._group
            },
            set: function(t) {
                t && this._skin && a.Loader.setGroup(this._skin, t),
                this._group = t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._bitmap.width = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._bitmap.height = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null
            },
            set: function(t) {
                this._bitmap.sizeGrid = y.fillArray(d.defaultSizeGrid, t, Number)
            }
        }, {
            key: "index",
            get: function() {
                return this._index
            },
            set: function(t) {
                this._index = t,
                this._bitmap && this._sources && (this._bitmap.source = this._sources[t]),
                this.event(a.Event.CHANGE)
            }
        }, {
            key: "total",
            get: function() {
                return this.runCallLater(this.changeClip),
                this._sources ? this._sources.length : 0
            }
        }, {
            key: "autoPlay",
            get: function() {
                return this._autoPlay
            },
            set: function(t) {
                this._autoPlay != t && (this._autoPlay = t,
                t ? this.play() : this.stop())
            }
        }, {
            key: "interval",
            get: function() {
                return this._interval
            },
            set: function(t) {
                this._interval != t && (this._interval = t,
                this._isPlaying && this.play())
            }
        }, {
            key: "isPlaying",
            get: function() {
                return this._isPlaying
            },
            set: function(t) {
                this._isPlaying = t
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.index = parseInt(t) : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "bitmap",
            get: function() {
                return this._bitmap
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(b),
    a.ClassUtils.regClass("laya.ui.Clip", b),
    a.ClassUtils.regClass("Laya.Clip", b);
    var w = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this, !1))._gridSize = 11,
            t._bgColor = "#ffffff",
            t._borderColor = "#000000",
            t._inputColor = "#000000",
            t._inputBgColor = "#efefef",
            t._colors = [],
            t._selectedColor = "#000000",
            s && (t.preinitialize(),
            t.createChildren(),
            t.initialize()),
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                a.ILaya.stage.off(a.Event.MOUSE_DOWN, this, this.removeColorBox),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, t),
                this._colorPanel && this._colorPanel.destroy(t),
                this._colorButton && this._colorButton.destroy(t),
                this._colorPanel = null,
                this._colorTiles = null,
                this._colorBlock = null,
                this._colorInput = null,
                this._colorButton = null,
                this._colors = null,
                this.changeHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._colorButton = new m),
                this._colorPanel = new C,
                this._colorPanel.size(230, 166),
                this._colorPanel.addChild(this._colorTiles = new a.Sprite),
                this._colorPanel.addChild(this._colorBlock = new a.Sprite),
                this._colorPanel.addChild(this._colorInput = new a.Input)
            }
        }, {
            key: "initialize",
            value: function() {
                this._colorButton.on(a.Event.CLICK, this, this.onColorButtonClick),
                this._colorBlock.pos(5, 5),
                this._colorInput.pos(60, 5),
                this._colorInput.size(60, 20),
                this._colorInput.on(a.Event.CHANGE, this, this.onColorInputChange),
                this._colorInput.on(a.Event.KEY_DOWN, this, this.onColorFieldKeyDown),
                this._colorTiles.pos(5, 30),
                this._colorTiles.on(a.Event.MOUSE_MOVE, this, this.onColorTilesMouseMove),
                this._colorTiles.on(a.Event.CLICK, this, this.onColorTilesClick),
                this._colorTiles.size(20 * this._gridSize, 12 * this._gridSize),
                this._colorPanel.on(a.Event.MOUSE_DOWN, this, this.onPanelMouseDown),
                this.bgColor = this._bgColor
            }
        }, {
            key: "onPanelMouseDown",
            value: function(t) {
                t.stopPropagation()
            }
        }, {
            key: "changePanel",
            value: function() {
                this._panelChanged = !1;
                var t = this._colorPanel.graphics;
                t.clear(!0),
                t.drawRect(0, 0, 230, 166, this._bgColor, this._borderColor),
                this.drawBlock(this._selectedColor),
                this._colorInput.borderColor = this._borderColor,
                this._colorInput.bgColor = this._inputBgColor,
                this._colorInput.color = this._inputColor,
                (t = this._colorTiles.graphics).clear(!0);
                for (var e = [0, 3355443, 6710886, 10066329, 13421772, 16777215, 16711680, 65280, 255, 16776960, 65535, 16711935], i = 0; i < 12; i++)
                    for (var s = 0; s < 20; s++) {
                        var n;
                        n = 0 === s ? e[i] : 1 === s ? 0 : 51 * (((3 * i + s / 6) % 3 << 0) + 3 * (i / 6 << 0)) << 16 | s % 6 * 51 << 8 | (i << 0) % 6 * 51;
                        var a = y.toColor(n);
                        this._colors.push(a);
                        var h = s * this._gridSize
                          , l = i * this._gridSize;
                        t.drawRect(h, l, this._gridSize, this._gridSize, a, "#000000")
                    }
            }
        }, {
            key: "onColorButtonClick",
            value: function(t) {
                this._colorPanel.parent ? this.close() : this.open()
            }
        }, {
            key: "open",
            value: function() {
                var t = a.ILaya.stage
                  , e = this.localToGlobal(new a.Point)
                  , i = e.x + this._colorPanel.width <= t.width ? e.x : t.width - this._colorPanel.width
                  , s = e.y + this._colorButton.height;
                s = s + this._colorPanel.height <= t.height ? s : e.y - this._colorPanel.height,
                this._colorPanel.pos(i, s),
                this._colorPanel.zOrder = 1001,
                t.addChild(this._colorPanel),
                t.on(a.Event.MOUSE_DOWN, this, this.removeColorBox)
            }
        }, {
            key: "close",
            value: function() {
                a.ILaya.stage.off(a.Event.MOUSE_DOWN, this, this.removeColorBox),
                this._colorPanel.removeSelf()
            }
        }, {
            key: "removeColorBox",
            value: function() {
                this.close()
            }
        }, {
            key: "onColorFieldKeyDown",
            value: function(t) {
                13 == t.keyCode && (this._colorInput.text ? this.selectedColor = this._colorInput.text : this.selectedColor = null,
                this.close(),
                t.stopPropagation())
            }
        }, {
            key: "onColorInputChange",
            value: function() {
                this._colorInput.text ? this.drawBlock(this._colorInput.text) : this.drawBlock("#FFFFFF")
            }
        }, {
            key: "onColorTilesClick",
            value: function(t) {
                this.selectedColor = this.getColorByMouse(),
                this.close()
            }
        }, {
            key: "onColorTilesMouseMove",
            value: function(t) {
                this._colorInput.focus = !1;
                var e = this.getColorByMouse();
                this._colorInput.text = e,
                this.drawBlock(e)
            }
        }, {
            key: "getColorByMouse",
            value: function() {
                var t = this._colorTiles.getMousePoint()
                  , e = Math.floor(t.x / this._gridSize)
                  , i = Math.floor(t.y / this._gridSize);
                return this._colors[20 * i + e]
            }
        }, {
            key: "drawBlock",
            value: function(t) {
                var e = this._colorBlock.graphics;
                e.clear(!0);
                var i = t || "#ffffff";
                e.drawRect(0, 0, 50, 20, i, this._borderColor),
                t || e.drawLine(0, 0, 50, 20, "#ff0000")
            }
        }, {
            key: "changeColor",
            value: function() {
                var t = this.graphics;
                t.clear(!0);
                var e = this._selectedColor || "#000000";
                t.drawRect(0, 0, this._colorButton.width, this._colorButton.height, e)
            }
        }, {
            key: "_setPanelChanged",
            value: function() {
                this._panelChanged || (this._panelChanged = !0,
                this.callLater(this.changePanel))
            }
        }, {
            key: "selectedColor",
            get: function() {
                return this._selectedColor
            },
            set: function(t) {
                this._selectedColor != t && (this._selectedColor = this._colorInput.text = t,
                this.drawBlock(t),
                this.changeColor(),
                this.changeHandler && this.changeHandler.runWith(this._selectedColor),
                this.event(a.Event.CHANGE, a.Event.EMPTY.setTo(a.Event.CHANGE, this, this)))
            }
        }, {
            key: "skin",
            get: function() {
                return this._colorButton.skin
            },
            set: function(t) {
                this._colorButton.once(a.Event.LOADED, this, this.changeColor),
                this._colorButton.skin = t
            }
        }, {
            key: "bgColor",
            get: function() {
                return this._bgColor
            },
            set: function(t) {
                this._bgColor = t,
                this._setPanelChanged()
            }
        }, {
            key: "borderColor",
            get: function() {
                return this._borderColor
            },
            set: function(t) {
                this._borderColor = t,
                this._setPanelChanged()
            }
        }, {
            key: "inputColor",
            get: function() {
                return this._inputColor
            },
            set: function(t) {
                this._inputColor = t,
                this._setPanelChanged()
            }
        }, {
            key: "inputBgColor",
            get: function() {
                return this._inputBgColor
            },
            set: function(t) {
                this._inputBgColor = t,
                this._setPanelChanged()
            }
        }]),
        i
    }(v);
    a.ILaya.regClass(w),
    a.ClassUtils.regClass("laya.ui.ColorPicker", w),
    a.ClassUtils.regClass("Laya.ColorPicker", w);
    var L = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this)).text = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._tf = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._tf = new a.Text)
            }
        }, {
            key: "changeText",
            value: function(t) {
                this._tf.changeText(t)
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this._tf.width
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this._tf.height
            }
        }, {
            key: "text",
            get: function() {
                return this._tf.text
            },
            set: function(t) {
                this._tf.text != t && (t && (t = y.adptString(t + "")),
                this._tf.text = t,
                this.event(a.Event.CHANGE),
                this._width && this._height || this.onCompResize())
            }
        }, {
            key: "wordWrap",
            get: function() {
                return this._tf.wordWrap
            },
            set: function(t) {
                this._tf.wordWrap = t
            }
        }, {
            key: "color",
            get: function() {
                return this._tf.color
            },
            set: function(t) {
                this._tf.color = t
            }
        }, {
            key: "font",
            get: function() {
                return this._tf.font
            },
            set: function(t) {
                this._tf.font = t
            }
        }, {
            key: "align",
            get: function() {
                return this._tf.align
            },
            set: function(t) {
                this._tf.align = t
            }
        }, {
            key: "valign",
            get: function() {
                return this._tf.valign
            },
            set: function(t) {
                this._tf.valign = t
            }
        }, {
            key: "bold",
            get: function() {
                return this._tf.bold
            },
            set: function(t) {
                this._tf.bold = t
            }
        }, {
            key: "italic",
            get: function() {
                return this._tf.italic
            },
            set: function(t) {
                this._tf.italic = t
            }
        }, {
            key: "leading",
            get: function() {
                return this._tf.leading
            },
            set: function(t) {
                this._tf.leading = t
            }
        }, {
            key: "fontSize",
            get: function() {
                return this._tf.fontSize
            },
            set: function(t) {
                this._tf.fontSize = t
            }
        }, {
            key: "padding",
            get: function() {
                return this._tf.padding.join(",")
            },
            set: function(t) {
                this._tf.padding = y.fillArray(d.labelPadding, t, Number)
            }
        }, {
            key: "bgColor",
            get: function() {
                return this._tf.bgColor
            },
            set: function(t) {
                this._tf.bgColor = t
            }
        }, {
            key: "borderColor",
            get: function() {
                return this._tf.borderColor
            },
            set: function(t) {
                this._tf.borderColor = t
            }
        }, {
            key: "stroke",
            get: function() {
                return this._tf.stroke
            },
            set: function(t) {
                this._tf.stroke = t
            }
        }, {
            key: "strokeColor",
            get: function() {
                return this._tf.strokeColor
            },
            set: function(t) {
                this._tf.strokeColor = t
            }
        }, {
            key: "textField",
            get: function() {
                return this._tf
            }
        }, {
            key: "width",
            get: function() {
                return this._width || this._tf.text ? (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this) : 0
            },
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._tf.width = t
            }
        }, {
            key: "height",
            get: function() {
                return this._height || this._tf.text ? (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this) : 0
            },
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._tf.height = t
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.text = t + "" : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "overflow",
            get: function() {
                return this._tf.overflow
            },
            set: function(t) {
                this._tf.overflow = t
            }
        }, {
            key: "underline",
            get: function() {
                return this._tf.underline
            },
            set: function(t) {
                this._tf.underline = t
            }
        }, {
            key: "underlineColor",
            get: function() {
                return this._tf.underlineColor
            },
            set: function(t) {
                this._tf.underlineColor = t
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(L),
    a.ClassUtils.regClass("laya.ui.Label", L),
    a.ClassUtils.regClass("Laya.Label", L);
    var x = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this)).isVertical = !0,
            t.showLabel = !0,
            t._max = 100,
            t._min = 0,
            t._tick = 1,
            t._value = 0,
            o.label || (o.label = new L),
            t.skin = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._bg && this._bg.destroy(t),
                this._bar && this._bar.destroy(t),
                this._progress && this._progress.destroy(t),
                this._bg = null,
                this._bar = null,
                this._progress = null,
                this.changeHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._bg = new p),
                this.addChild(this._bar = new m)
            }
        }, {
            key: "initialize",
            value: function() {
                this._bar.on(a.Event.MOUSE_DOWN, this, this.onBarMouseDown),
                this._bg.sizeGrid = this._bar.sizeGrid = "4,4,4,4,0",
                this._progress && (this._progress.sizeGrid = this._bar.sizeGrid),
                this.allowClickBack = !0
            }
        }, {
            key: "onBarMouseDown",
            value: function(t) {
                var e = a.ILaya;
                this._globalSacle || (this._globalSacle = new a.Point),
                this._globalSacle.setTo(this.globalScaleX || .01, this.globalScaleY || .01),
                this._maxMove = this.isVertical ? this.height - this._bar.height : this.width - this._bar.width,
                this._tx = e.stage.mouseX,
                this._ty = e.stage.mouseY,
                e.stage.on(a.Event.MOUSE_MOVE, this, this.mouseMove),
                e.stage.once(a.Event.MOUSE_UP, this, this.mouseUp),
                e.stage.once(a.Event.MOUSE_OUT, this, this.mouseUp),
                this.showValueText()
            }
        }, {
            key: "showValueText",
            value: function() {
                if (this.showLabel) {
                    var t = o.label;
                    this.addChild(t),
                    t.textField.changeText(this._value + ""),
                    this.isVertical ? (t.x = this._bar._x + 20,
                    t.y = .5 * (this._bar.height - t.height) + this._bar._y) : (t.y = this._bar._y - 20,
                    t.x = .5 * (this._bar.width - t.width) + this._bar._x)
                }
            }
        }, {
            key: "hideValueText",
            value: function() {
                o.label && o.label.removeSelf()
            }
        }, {
            key: "mouseUp",
            value: function(t) {
                var e = a.ILaya.stage;
                e.off(a.Event.MOUSE_MOVE, this, this.mouseMove),
                e.off(a.Event.MOUSE_UP, this, this.mouseUp),
                e.off(a.Event.MOUSE_OUT, this, this.mouseUp),
                this.sendChangeEvent(a.Event.CHANGED),
                this.hideValueText()
            }
        }, {
            key: "mouseMove",
            value: function(t) {
                var e = a.ILaya.stage
                  , i = this._value;
                if (this.isVertical ? (this._bar.y += (e.mouseY - this._ty) / this._globalSacle.y,
                this._bar._y > this._maxMove ? this._bar.y = this._maxMove : this._bar._y < 0 && (this._bar.y = 0),
                this._value = this._bar._y / this._maxMove * (this._max - this._min) + this._min,
                this._progress && (this._progress.height = this._bar._y + .5 * this._bar.height)) : (this._bar.x += (e.mouseX - this._tx) / this._globalSacle.x,
                this._bar._x > this._maxMove ? this._bar.x = this._maxMove : this._bar._x < 0 && (this._bar.x = 0),
                this._value = this._bar._x / this._maxMove * (this._max - this._min) + this._min,
                this._progress && (this._progress.width = this._bar._x + .5 * this._bar.width)),
                this._tx = e.mouseX,
                this._ty = e.mouseY,
                0 != this._tick) {
                    var s = Math.pow(10, (this._tick + "").length - 1);
                    this._value = Math.round(Math.round(this._value / this._tick) * this._tick * s) / s
                }
                this._value != i && this.sendChangeEvent(),
                this.showValueText()
            }
        }, {
            key: "sendChangeEvent",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.Event.CHANGE;
                this.event(t),
                this.changeHandler && this.changeHandler.runWith(this._value)
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this._bg.skin = this._skin,
                this._bar.skin = this._skin.replace(".png", "$bar.png");
                var t = this._skin.replace(".png", "$progress.png");
                a.Loader.getRes(t) && (this._progress || (this.addChild(this._progress = new p),
                this._progress.sizeGrid = this._bar.sizeGrid,
                this.setChildIndex(this._progress, 1)),
                this._progress.skin = t),
                this.setBarPoint(),
                this.callLater(this.changeValue),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "setBarPoint",
            value: function() {
                this.isVertical ? this._bar.x = Math.round(.5 * (this._bg.width - this._bar.width)) : this._bar.y = Math.round(.5 * (this._bg.height - this._bar.height))
            }
        }, {
            key: "measureWidth",
            value: function() {
                return Math.max(this._bg.width, this._bar.width)
            }
        }, {
            key: "measureHeight",
            value: function() {
                return Math.max(this._bg.height, this._bar.height)
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "_sizeChanged", this).call(this),
                this.isVertical ? this._bg.height = this.height : this._bg.width = this.width,
                this.setBarPoint(),
                this.changeValue()
            }
        }, {
            key: "setSlider",
            value: function(t, e, i) {
                this._value = -1,
                this._min = t,
                this._max = e > t ? e : t,
                this.value = i < t ? t : i > e ? e : i
            }
        }, {
            key: "changeValue",
            value: function() {
                if (0 != this.tick) {
                    var t = Math.pow(10, (this._tick + "").length - 1);
                    this._value = Math.round(Math.round(this._value / this._tick) * this._tick * t) / t
                }
                this._value = this._value > this._max ? this._max : this._value < this._min ? this._min : this._value;
                var e = this._max - this._min;
                0 === e && (e = 1),
                this.isVertical ? (this._bar.y = (this._value - this._min) / e * (this.height - this._bar.height),
                this._progress && (this._progress.height = this._bar._y + .5 * this._bar.height)) : (this._bar.x = (this._value - this._min) / e * (this.width - this._bar.width),
                this._progress && (this._progress.width = this._bar._x + .5 * this._bar.width))
            }
        }, {
            key: "onBgMouseDown",
            value: function(t) {
                var e = this._bg.getMousePoint();
                this.isVertical ? this.value = e.y / (this.height - this._bar.height) * (this._max - this._min) + this._min : this.value = e.x / (this.width - this._bar.width) * (this._max - this._min) + this._min
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                this._skin && !a.Loader.getRes(this._skin) ? a.ILaya.loader.load([this._skin, this._skin.replace(".png", "$bar.png")], a.Handler.create(this, this._skinLoaded)) : this._skinLoaded())
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bg.sizeGrid
            },
            set: function(t) {
                this._bg.sizeGrid = t,
                this._bar.sizeGrid = t,
                this._progress && (this._progress.sizeGrid = this._bar.sizeGrid)
            }
        }, {
            key: "tick",
            get: function() {
                return this._tick
            },
            set: function(t) {
                this._tick != t && (this._tick = t,
                this.callLater(this.changeValue))
            }
        }, {
            key: "max",
            get: function() {
                return this._max
            },
            set: function(t) {
                this._max != t && (this._max = t,
                this.callLater(this.changeValue))
            }
        }, {
            key: "min",
            get: function() {
                return this._min
            },
            set: function(t) {
                this._min != t && (this._min = t,
                this.callLater(this.changeValue))
            }
        }, {
            key: "value",
            get: function() {
                return this._value
            },
            set: function(t) {
                if (this._value != t) {
                    var e = this._value;
                    this._value = t,
                    this.changeValue(),
                    this._value != e && this.sendChangeEvent()
                }
            }
        }, {
            key: "allowClickBack",
            get: function() {
                return this._allowClickBack
            },
            set: function(t) {
                this._allowClickBack != t && (this._allowClickBack = t,
                t ? this._bg.on(a.Event.MOUSE_DOWN, this, this.onBgMouseDown) : this._bg.off(a.Event.MOUSE_DOWN, this, this.onBgMouseDown))
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.value = Number(t) : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "bar",
            get: function() {
                return this._bar
            }
        }]),
        o
    }(v);
    x.label = null,
    a.ILaya.regClass(x),
    a.ClassUtils.regClass("laya.ui.Slider", x),
    a.ClassUtils.regClass("Laya.Slider", x);
    var E = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this)).rollRatio = .97,
            t.scaleBar = !0,
            t.autoHide = !1,
            t.elasticDistance = 0,
            t.elasticBackTime = 500,
            t._showButtons = u.showButtons,
            t._scrollSize = 1,
            t._thumbPercent = 1,
            t._lastOffset = 0,
            t._checkElastic = !1,
            t._isElastic = !1,
            t._hide = !1,
            t._clickOnly = !0,
            t._touchScrollEnable = u.touchScrollEnable,
            t._mouseWheelEnable = u.mouseWheelEnable,
            t.skin = i,
            t.max = 1,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.stopScroll(),
                this.target = null,
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this.upButton && this.upButton.destroy(t),
                this.downButton && this.downButton.destroy(t),
                this.slider && this.slider.destroy(t),
                this.upButton = this.downButton = null,
                this.slider = null,
                this.changeHandler = null,
                this._offsets = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this.slider = new x),
                this.addChild(this.upButton = new m),
                this.addChild(this.downButton = new m)
            }
        }, {
            key: "initialize",
            value: function() {
                this.slider.showLabel = !1,
                this.slider.tick = 0,
                this.slider.on(a.Event.CHANGE, this, this.onSliderChange),
                this.slider.setSlider(0, 0, 0),
                this.upButton.on(a.Event.MOUSE_DOWN, this, this.onButtonMouseDown),
                this.downButton.on(a.Event.MOUSE_DOWN, this, this.onButtonMouseDown)
            }
        }, {
            key: "onSliderChange",
            value: function() {
                this._value != this.slider.value && (this.value = this.slider.value)
            }
        }, {
            key: "onButtonMouseDown",
            value: function(t) {
                var e = t.currentTarget === this.upButton;
                this.slide(e),
                a.ILaya.timer.once(d.scrollBarDelayTime, this, this.startLoop, [e]),
                a.ILaya.stage.once(a.Event.MOUSE_UP, this, this.onStageMouseUp)
            }
        }, {
            key: "startLoop",
            value: function(t) {
                a.ILaya.timer.frameLoop(1, this, this.slide, [t])
            }
        }, {
            key: "slide",
            value: function(t) {
                t ? this.value -= this._scrollSize : this.value += this._scrollSize
            }
        }, {
            key: "onStageMouseUp",
            value: function(t) {
                a.ILaya.timer.clear(this, this.startLoop),
                a.ILaya.timer.clear(this, this.slide)
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this.slider.skin = this._skin,
                this.callLater(this.changeScrollBar),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "changeScrollBar",
            value: function() {
                this.upButton.visible = this._showButtons,
                this.downButton.visible = this._showButtons,
                this._showButtons && (this.upButton.skin = this._skin.replace(".png", "$up.png"),
                this.downButton.skin = this._skin.replace(".png", "$down.png")),
                this.slider.isVertical ? this.slider.y = this._showButtons ? this.upButton.height : 0 : this.slider.x = this._showButtons ? this.upButton.width : 0,
                this.resetPositions(),
                this.repaint()
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "_sizeChanged", this).call(this),
                this.repaint(),
                this.resetPositions(),
                this.event(a.Event.CHANGE),
                this.changeHandler && this.changeHandler.runWith(this.value)
            }
        }, {
            key: "resetPositions",
            value: function() {
                this.slider.isVertical ? this.slider.height = this.height - (this._showButtons ? this.upButton.height + this.downButton.height : 0) : this.slider.width = this.width - (this._showButtons ? this.upButton.width + this.downButton.width : 0),
                this.resetButtonPosition()
            }
        }, {
            key: "resetButtonPosition",
            value: function() {
                this.slider.isVertical ? this.downButton.y = this.slider._y + this.slider.height : this.downButton.x = this.slider._x + this.slider.width
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this.slider.isVertical ? this.slider.width : 100
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this.slider.isVertical ? 100 : this.slider.height
            }
        }, {
            key: "setScroll",
            value: function(t, e, i) {
                this.runCallLater(this._sizeChanged),
                this.slider.setSlider(t, e, i),
                this.slider.bar.visible = e > 0,
                !this._hide && this.autoHide && (this.visible = !1)
            }
        }, {
            key: "onTargetMouseWheel",
            value: function(t) {
                this.value -= t.delta * this._scrollSize,
                this.target = this._target
            }
        }, {
            key: "onTargetMouseDown",
            value: function(t) {
                this.isLockedFun && !this.isLockedFun(t) || (this.event(a.Event.END),
                this._clickOnly = !0,
                this._lastOffset = 0,
                this._checkElastic = !1,
                this._lastPoint || (this._lastPoint = new a.Point),
                this._lastPoint.setTo(a.ILaya.stage.mouseX, a.ILaya.stage.mouseY),
                a.ILaya.timer.clear(this, this.tweenMove),
                a.Tween.clearTween(this),
                a.ILaya.stage.once(a.Event.MOUSE_UP, this, this.onStageMouseUp2),
                a.ILaya.stage.once(a.Event.MOUSE_OUT, this, this.onStageMouseUp2),
                a.ILaya.timer.frameLoop(1, this, this.loop))
            }
        }, {
            key: "startDragForce",
            value: function() {
                this._clickOnly = !0,
                this._lastOffset = 0,
                this._checkElastic = !1,
                this._lastPoint || (this._lastPoint = new a.Point),
                this._lastPoint.setTo(a.ILaya.stage.mouseX, a.ILaya.stage.mouseY),
                a.ILaya.timer.clear(this, this.tweenMove),
                a.Tween.clearTween(this),
                a.ILaya.stage.once(a.Event.MOUSE_UP, this, this.onStageMouseUp2),
                a.ILaya.stage.once(a.Event.MOUSE_OUT, this, this.onStageMouseUp2),
                a.ILaya.timer.frameLoop(1, this, this.loop)
            }
        }, {
            key: "cancelDragOp",
            value: function() {
                a.ILaya.stage.off(a.Event.MOUSE_UP, this, this.onStageMouseUp2),
                a.ILaya.stage.off(a.Event.MOUSE_OUT, this, this.onStageMouseUp2),
                a.ILaya.timer.clear(this, this.tweenMove),
                a.ILaya.timer.clear(this, this.loop),
                this._target.mouseEnabled = !0
            }
        }, {
            key: "checkTriggers",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return this.value >= 0 && this.value - this._lastOffset <= 0 && this.triggerDownDragLimit && this.triggerDownDragLimit(t) ? (this.cancelDragOp(),
                this.value = 0,
                !0) : !!(this.value <= this.max && this.value - this._lastOffset >= this.max && this.triggerUpDragLimit && this.triggerUpDragLimit(t)) && (this.cancelDragOp(),
                this.value = this.max,
                !0)
            }
        }, {
            key: "startTweenMoveForce",
            value: function(t) {
                this._lastOffset = t,
                a.ILaya.timer.frameLoop(1, this, this.tweenMove, [200])
            }
        }, {
            key: "loop",
            value: function() {
                var t = a.ILaya.stage.mouseY
                  , e = a.ILaya.stage.mouseX;
                if (this._lastOffset = this.isVertical ? t - this._lastPoint.y : e - this._lastPoint.x,
                this._clickOnly) {
                    if (!(Math.abs(this._lastOffset * (this.isVertical ? a.ILaya.stage._canvasTransform.getScaleY() : a.ILaya.stage._canvasTransform.getScaleX())) > 1))
                        return;
                    if (this._clickOnly = !1,
                    this.checkTriggers())
                        return;
                    this._offsets || (this._offsets = []),
                    this._offsets.length = 0,
                    this._target.mouseEnabled = !1,
                    !this.hide && this.autoHide && (this.alpha = 1,
                    this.visible = !0),
                    this.event(a.Event.START)
                } else if (this.checkTriggers())
                    return;
                this._offsets.push(this._lastOffset),
                this._lastPoint.x = e,
                this._lastPoint.y = t,
                0 !== this._lastOffset && (this._checkElastic || (this.elasticDistance > 0 ? this._checkElastic || 0 == this._lastOffset || (this._lastOffset > 0 && this._value <= this.min || this._lastOffset < 0 && this._value >= this.max ? (this._isElastic = !0,
                this._checkElastic = !0) : this._isElastic = !1) : this._checkElastic = !0),
                this._isElastic ? this._value <= this.min ? this._lastOffset > 0 ? this.value -= this._lastOffset * Math.max(0, 1 - (this.min - this._value) / this.elasticDistance) : (this.value -= .5 * this._lastOffset,
                this._value >= this.min && (this._checkElastic = !1)) : this._value >= this.max && (this._lastOffset < 0 ? this.value -= this._lastOffset * Math.max(0, 1 - (this._value - this.max) / this.elasticDistance) : (this.value -= .5 * this._lastOffset,
                this._value <= this.max && (this._checkElastic = !1))) : this.value -= this._lastOffset)
            }
        }, {
            key: "onStageMouseUp2",
            value: function(t) {
                if (a.ILaya.stage.off(a.Event.MOUSE_UP, this, this.onStageMouseUp2),
                a.ILaya.stage.off(a.Event.MOUSE_OUT, this, this.onStageMouseUp2),
                a.ILaya.timer.clear(this, this.loop),
                !(this._clickOnly && this._value >= this.min && this._value <= this.max))
                    if (this._target.mouseEnabled = !0,
                    this._isElastic)
                        this._value < this.min ? a.Tween.to(this, {
                            value: this.min
                        }, this.elasticBackTime, a.Ease.sineOut, a.Handler.create(this, this.elasticOver)) : this._value > this.max && a.Tween.to(this, {
                            value: this.max
                        }, this.elasticBackTime, a.Ease.sineOut, a.Handler.create(this, this.elasticOver));
                    else {
                        if (!this._offsets)
                            return;
                        this._offsets.length < 1 && (this._offsets[0] = this.isVertical ? a.ILaya.stage.mouseY - this._lastPoint.y : a.ILaya.stage.mouseX - this._lastPoint.x);
                        for (var e = 0, i = Math.min(this._offsets.length, 3), s = 0; s < i; s++)
                            e += this._offsets[this._offsets.length - 1 - s];
                        if (this._lastOffset = e / i,
                        (e = Math.abs(this._lastOffset)) < 2)
                            return void this.event(a.Event.END);
                        e > 250 && (this._lastOffset = this._lastOffset > 0 ? 250 : -250);
                        var n = Math.round(Math.abs(this.elasticDistance * (this._lastOffset / 150)));
                        a.ILaya.timer.frameLoop(1, this, this.tweenMove, [n])
                    }
            }
        }, {
            key: "elasticOver",
            value: function() {
                this._isElastic = !1,
                !this.hide && this.autoHide && a.Tween.to(this, {
                    alpha: 0
                }, 500),
                this.event(a.Event.END)
            }
        }, {
            key: "tweenMove",
            value: function(t) {
                var e;
                if (this._lastOffset *= this.rollRatio,
                !this.checkTriggers(!0) && (t > 0 && (this._lastOffset > 0 && this.value <= this.min ? (this._isElastic = !0,
                e = .5 * -(this.min - t - this.value),
                this._lastOffset > e && (this._lastOffset = e)) : this._lastOffset < 0 && this.value >= this.max && (this._isElastic = !0,
                e = .5 * -(this.max + t - this.value),
                this._lastOffset < e && (this._lastOffset = e))),
                this.value -= this._lastOffset,
                Math.abs(this._lastOffset) < .1)) {
                    if (a.ILaya.timer.clear(this, this.tweenMove),
                    this._isElastic)
                        return void (this._value < this.min ? a.Tween.to(this, {
                            value: this.min
                        }, this.elasticBackTime, a.Ease.sineOut, a.Handler.create(this, this.elasticOver)) : this._value > this.max ? a.Tween.to(this, {
                            value: this.max
                        }, this.elasticBackTime, a.Ease.sineOut, a.Handler.create(this, this.elasticOver)) : this.elasticOver());
                    this.event(a.Event.END),
                    !this.hide && this.autoHide && a.Tween.to(this, {
                        alpha: 0
                    }, 500)
                }
            }
        }, {
            key: "stopScroll",
            value: function() {
                this.onStageMouseUp2(null),
                a.ILaya.timer.clear(this, this.tweenMove),
                a.Tween.clearTween(this)
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                " " != t && this._skin != t && (this._skin = t,
                this._skin && !a.Loader.getRes(this._skin) ? a.ILaya.loader.load([this._skin, this._skin.replace(".png", "$up.png"), this._skin.replace(".png", "$down.png"), this._skin.replace(".png", "$bar.png")], a.Handler.create(this, this._skinLoaded)) : this._skinLoaded())
            }
        }, {
            key: "max",
            get: function() {
                return this.slider.max
            },
            set: function(t) {
                this.slider.max = t
            }
        }, {
            key: "min",
            get: function() {
                return this.slider.min
            },
            set: function(t) {
                this.slider.min = t
            }
        }, {
            key: "value",
            get: function() {
                return this._value
            },
            set: function(t) {
                t !== this._value && (this._value = t,
                this._isElastic || (this.slider._value != t && (this.slider._value = t,
                this.slider.changeValue()),
                this._value = this.slider._value),
                this.event(a.Event.CHANGE),
                this.changeHandler && this.changeHandler.runWith(this._value))
            }
        }, {
            key: "isVertical",
            get: function() {
                return this.slider.isVertical
            },
            set: function(t) {
                this.slider.isVertical = t
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this.slider.sizeGrid
            },
            set: function(t) {
                this.slider.sizeGrid = t
            }
        }, {
            key: "scrollSize",
            get: function() {
                return this._scrollSize
            },
            set: function(t) {
                this._scrollSize = t
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.value = Number(t) : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "thumbPercent",
            get: function() {
                return this._thumbPercent
            },
            set: function(t) {
                this.runCallLater(this.changeScrollBar),
                this.runCallLater(this._sizeChanged),
                t = t >= 1 ? .99 : t,
                this._thumbPercent = t,
                this.scaleBar && (this.slider.isVertical ? this.slider.bar.height = Math.max(this.slider.height * t, d.scrollBarMinNum) : this.slider.bar.width = Math.max(this.slider.width * t, d.scrollBarMinNum))
            }
        }, {
            key: "target",
            get: function() {
                return this._target
            },
            set: function(t) {
                this._target && (this._target.off(a.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel),
                this._target.off(a.Event.MOUSE_DOWN, this, this.onTargetMouseDown)),
                this._target = t,
                t && (this._mouseWheelEnable && this._target.on(a.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel),
                this._touchScrollEnable && this._target.on(a.Event.MOUSE_DOWN, this, this.onTargetMouseDown))
            }
        }, {
            key: "hide",
            get: function() {
                return this._hide
            },
            set: function(t) {
                this._hide = t,
                this.visible = !t
            }
        }, {
            key: "showButtons",
            get: function() {
                return this._showButtons
            },
            set: function(t) {
                this._showButtons = t,
                this.callLater(this.changeScrollBar)
            }
        }, {
            key: "touchScrollEnable",
            get: function() {
                return this._touchScrollEnable
            },
            set: function(t) {
                this._touchScrollEnable = t,
                this.target = this._target
            }
        }, {
            key: "mouseWheelEnable",
            get: function() {
                return this._mouseWheelEnable
            },
            set: function(t) {
                this._mouseWheelEnable = t,
                this.target = this._target
            }
        }, {
            key: "lastOffset",
            get: function() {
                return this._lastOffset
            }
        }, {
            key: "tick",
            get: function() {
                return this.slider.tick
            },
            set: function(t) {
                this.slider.tick = t
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(E),
    a.ClassUtils.regClass("laya.ui.ScrollBar", E),
    a.ClassUtils.regClass("Laya.ScrollBar", E);
    var I = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return i
    }(E);
    a.ILaya.regClass(I),
    a.ClassUtils.regClass("laya.ui.VScrollBar", I),
    a.ClassUtils.regClass("Laya.VScrollBar", I);
    var B = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(i, [{
            key: "initialize",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "initialize", this).call(this),
                this.slider.isVertical = !1
            }
        }]),
        i
    }(E);
    a.ILaya.regClass(B),
    a.ClassUtils.regClass("laya.ui.HScrollBar", B),
    a.ClassUtils.regClass("Laya.HScrollBar", B);
    var M = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.apply(this, arguments)).selectEnable = !1,
            t.totalPage = 0,
            t._$componentType = "List",
            t._repeatX = 0,
            t._repeatY = 0,
            t._repeatX2 = 0,
            t._repeatY2 = 0,
            t._spaceX = 0,
            t._spaceY = 0,
            t._cells = [],
            t._startIndex = 0,
            t._selectedIndex = -1,
            t._page = 0,
            t._isVertical = !0,
            t._cellSize = 20,
            t._cellOffset = 0,
            t._createdLine = 0,
            t._offset = new a.Point,
            t._usedCache = null,
            t._elasticEnabled = !1,
            t._preLen = 0,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._content && this._content.destroy(t),
                this._scrollBar && this._scrollBar.destroy(t),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._content = null,
                this._scrollBar = null,
                this._itemRender = null,
                this._cells = null,
                this._array = null,
                this.selectHandler = this.renderHandler = this.mouseHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._content = new C)
            }
        }, {
            key: "onScrollStart",
            value: function() {
                this._usedCache || (this._usedCache = (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this)),
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", "none", this, !0),
                this._scrollBar.once(a.Event.END, this, this.onScrollEnd)
            }
        }, {
            key: "onScrollEnd",
            value: function() {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this._usedCache, this, !0)
            }
        }, {
            key: "_removePreScrollBar",
            value: function() {
                var t = this.removeChildByName("scrollBar");
                t && t.destroy(!0)
            }
        }, {
            key: "changeCells",
            value: function() {
                if (this._cellChanged = !1,
                this._itemRender) {
                    this.scrollBar = this.getChildByName("scrollBar");
                    var t = this._getOneCell()
                      , e = t.width + this._spaceX || 1
                      , i = t.height + this._spaceY || 1;
                    this._width > 0 && (this._repeatX2 = this._isVertical ? Math.round(this._width / e) : Math.ceil(this._width / e)),
                    this._height > 0 && (this._repeatY2 = this._isVertical ? Math.ceil(this._height / i) : Math.round(this._height / i));
                    var s = this._width ? this._width : e * this.repeatX - this._spaceX
                      , n = this._height ? this._height : i * this.repeatY - this._spaceY;
                    this._cellSize = this._isVertical ? i : e,
                    this._cellOffset = this._isVertical ? i * Math.max(this._repeatY2, this._repeatY) - n - this._spaceY : e * Math.max(this._repeatX2, this._repeatX) - s - this._spaceX,
                    this._isVertical && this.vScrollBarSkin ? this._scrollBar.height = n : !this._isVertical && this.hScrollBarSkin && (this._scrollBar.width = s),
                    this.setContentSize(s, n);
                    var a = this._isVertical ? this.repeatX : this.repeatY
                      , h = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
                    this._createItems(0, a, h),
                    this._createdLine = h,
                    this._array && (this.array = this._array,
                    this.runCallLater(this.renderItems))
                }
            }
        }, {
            key: "_getOneCell",
            value: function() {
                if (0 === this._cells.length) {
                    var t = this.createItem();
                    if (this._offset.setTo(t._x, t._y),
                    this.cacheContent)
                        return t;
                    this._cells.push(t)
                }
                return this._cells[0]
            }
        }, {
            key: "_createItems",
            value: function(t, e, i) {
                var s = this._content
                  , n = this._getOneCell()
                  , a = n.width + this._spaceX
                  , h = n.height + this._spaceY;
                if (this.cacheContent) {
                    var l = new C;
                    l.cacheAs = "normal",
                    l.pos((this._isVertical ? 0 : t) * a, (this._isVertical ? t : 0) * h),
                    this._content.addChild(l),
                    s = l
                } else {
                    for (var r = [], o = this._cells.length - 1; o > -1; o--) {
                        var u = this._cells[o];
                        u.removeSelf(),
                        r.push(u)
                    }
                    this._cells.length = 0
                }
                for (var c = t; c < i; c++)
                    for (var d = 0; d < e; d++)
                        (n = r && r.length ? r.pop() : this.createItem()).x = (this._isVertical ? d : c) * a - s._x,
                        n.y = (this._isVertical ? c : d) * h - s._y,
                        n.name = "item" + (c * e + d),
                        s.addChild(n),
                        this.addCell(n)
            }
        }, {
            key: "createItem",
            value: function() {
                var t = [];
                if ("function" == typeof this._itemRender)
                    var e = new this._itemRender;
                else
                    e = a.SceneUtils.createComp(this._itemRender, null, null, t);
                if (0 == t.length && e._watchMap) {
                    var i = e._watchMap;
                    for (var s in i)
                        for (var n = i[s], h = 0; h < n.length; h++) {
                            var l = n[h];
                            t.push(l.comp, l.prop, l.value)
                        }
                }
                return t.length && (e._$bindData = t),
                e
            }
        }, {
            key: "addCell",
            value: function(t) {
                t.on(a.Event.CLICK, this, this.onCellMouse),
                t.on(a.Event.RIGHT_CLICK, this, this.onCellMouse),
                t.on(a.Event.MOUSE_OVER, this, this.onCellMouse),
                t.on(a.Event.MOUSE_OUT, this, this.onCellMouse),
                t.on(a.Event.MOUSE_DOWN, this, this.onCellMouse),
                t.on(a.Event.MOUSE_UP, this, this.onCellMouse),
                this._cells.push(t)
            }
        }, {
            key: "_afterInited",
            value: function() {
                this.initItems()
            }
        }, {
            key: "initItems",
            value: function() {
                if (!this._itemRender && null != this.getChildByName("item0")) {
                    var t;
                    this.repeatX = 1,
                    t = 0;
                    for (var e = 0; e < 1e4; e++) {
                        var i = this.getChildByName("item" + e);
                        if (!i)
                            break;
                        this.addCell(i),
                        t++
                    }
                    this.repeatY = t
                }
            }
        }, {
            key: "setContentSize",
            value: function(t, e) {
                this._content.width = t,
                this._content.height = e,
                (this._scrollBar || 0 != this._offset.x || 0 != this._offset.y) && (this._content._style.scrollRect || (this._content.scrollRect = a.Rectangle.create()),
                this._content._style.scrollRect.setTo(-this._offset.x, -this._offset.y, t, e),
                this._content.scrollRect = this._content.scrollRect),
                this.event(a.Event.RESIZE)
            }
        }, {
            key: "onCellMouse",
            value: function(t) {
                t.type === a.Event.MOUSE_DOWN && (this._isMoved = !1);
                var e = t.currentTarget
                  , i = this._startIndex + this._cells.indexOf(e);
                i < 0 || (t.type === a.Event.CLICK || t.type === a.Event.RIGHT_CLICK ? this.selectEnable && !this._isMoved ? this.selectedIndex = i : this.changeCellState(e, !0, 0) : t.type !== a.Event.MOUSE_OVER && t.type !== a.Event.MOUSE_OUT || this._selectedIndex === i || this.changeCellState(e, t.type === a.Event.MOUSE_OVER, 0),
                this.mouseHandler && this.mouseHandler.runWith([t, i]))
            }
        }, {
            key: "changeCellState",
            value: function(t, e, i) {
                var s = t.getChildByName("selectBox");
                s && (this.selectEnable = !0,
                s.visible = e,
                s.index = i)
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "_sizeChanged", this).call(this),
                this.setContentSize(this.width, this.height),
                this._scrollBar && this.callLater(this.onScrollBarChange)
            }
        }, {
            key: "onScrollBarChange",
            value: function() {
                this.runCallLater(this.changeCells);
                var t = this._scrollBar.value
                  , e = this._isVertical ? this.repeatX : this.repeatY
                  , i = this._isVertical ? this.repeatY : this.repeatX
                  , s = Math.floor(t / this._cellSize);
                if (this.cacheContent)
                    a = i + 1,
                    this._createdLine - s < a && (this._createItems(this._createdLine, e, this._createdLine + a),
                    this.renderItems(this._createdLine * e, 0),
                    this._createdLine += a);
                else {
                    var n = s * e
                      , a = 0;
                    if (n > this._startIndex) {
                        a = n - this._startIndex;
                        var h = !0
                          , l = this._startIndex + e * (i + 1);
                        this._isMoved = !0
                    } else
                        n < this._startIndex && (a = this._startIndex - n,
                        h = !1,
                        l = this._startIndex - 1,
                        this._isMoved = !0);
                    for (var r = 0; r < a; r++) {
                        if (h) {
                            var o = this._cells.shift();
                            this._cells[this._cells.length] = o;
                            var u = l + r
                        } else
                            o = this._cells.pop(),
                            this._cells.unshift(o),
                            u = l - r;
                        var c = Math.floor(u / e) * this._cellSize;
                        this._isVertical ? o.y = c : o.x = c,
                        this.renderItem(o, u)
                    }
                    this._startIndex = n,
                    this.changeSelectStatus()
                }
                var d = this._content._style.scrollRect;
                this._isVertical ? (d.y = t - this._offset.y,
                d.x = -this._offset.x) : (d.y = -this._offset.y,
                d.x = t - this._offset.x),
                this._content.scrollRect = d
            }
        }, {
            key: "posCell",
            value: function(t, e) {
                if (this._scrollBar) {
                    var i = this._isVertical ? this.repeatX : this.repeatY
                      , s = (this._isVertical ? this.repeatY : this.repeatX,
                    Math.floor(e / i) * this._cellSize);
                    this._isVertical ? t._y = s : t.x = s
                }
            }
        }, {
            key: "changeSelectStatus",
            value: function() {
                for (var t = 0, e = this._cells.length; t < e; t++)
                    this.changeCellState(this._cells[t], this._selectedIndex === this._startIndex + t, 1)
            }
        }, {
            key: "renderItems",
            value: function() {
                for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = t, s = e || this._cells.length; i < s; i++)
                    this.renderItem(this._cells[i], this._startIndex + i);
                this.changeSelectStatus()
            }
        }, {
            key: "renderItem",
            value: function(t, e) {
                this._array && e >= 0 && e < this._array.length ? (t.visible = !0,
                t._$bindData ? (t._dataSource = this._array[e],
                this._bindData(t, this._array[e])) : t.dataSource = this._array[e],
                this.cacheContent || this.posCell(t, e),
                this.hasListener(a.Event.RENDER) && this.event(a.Event.RENDER, [t, e]),
                this.renderHandler && this.renderHandler.runWith([t, e])) : (t.visible = !1,
                t.dataSource = null)
            }
        }, {
            key: "_bindData",
            value: function(t, e) {
                for (var i = t._$bindData, s = 0, n = i.length; s < n; s++) {
                    var a = i[s++]
                      , h = i[s++]
                      , l = i[s]
                      , r = y.getBindFun(l);
                    a[h] = r.call(this, e)
                }
            }
        }, {
            key: "updateArray",
            value: function(t) {
                var e;
                if (this._array = t,
                this._array && ((e = this._preLen - this._startIndex) >= 0 && this.renderItems(e),
                this._preLen = this._array.length),
                this._scrollBar) {
                    var i = t.length
                      , s = this._isVertical ? this.repeatX : this.repeatY
                      , n = this._isVertical ? this.repeatY : this.repeatX
                      , a = Math.ceil(i / s);
                    a >= n && (this._scrollBar.thumbPercent = n / a,
                    this._scrollBar.slider._max = (a - n) * this._cellSize + this._cellOffset)
                }
            }
        }, {
            key: "refresh",
            value: function() {
                this.array = this._array
            }
        }, {
            key: "getItem",
            value: function(t) {
                return t > -1 && t < this._array.length ? this._array[t] : null
            }
        }, {
            key: "changeItem",
            value: function(t, e) {
                t > -1 && t < this._array.length && (this._array[t] = e,
                t >= this._startIndex && t < this._startIndex + this._cells.length && this.renderItem(this.getCell(t), t))
            }
        }, {
            key: "setItem",
            value: function(t, e) {
                this.changeItem(t, e)
            }
        }, {
            key: "addItem",
            value: function(t) {
                this._array.push(t),
                this.array = this._array
            }
        }, {
            key: "addItemAt",
            value: function(t, e) {
                this._array.splice(e, 0, t),
                this.array = this._array
            }
        }, {
            key: "deleteItem",
            value: function(t) {
                this._array.splice(t, 1),
                this.array = this._array
            }
        }, {
            key: "getCell",
            value: function(t) {
                return this.runCallLater(this.changeCells),
                t > -1 && this._cells ? this._cells[(t - this._startIndex) % this._cells.length] : null
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                if (this._scrollBar) {
                    var e = this._isVertical ? this.repeatX : this.repeatY;
                    this._scrollBar.value = Math.floor(t / e) * this._cellSize
                } else
                    this.startIndex = t
            }
        }, {
            key: "tweenTo",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200
                  , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                if (this._scrollBar) {
                    this._scrollBar.stopScroll();
                    var s = this._isVertical ? this.repeatX : this.repeatY;
                    a.Tween.to(this._scrollBar, {
                        value: Math.floor(t / s) * this._cellSize
                    }, e, null, i, 0, !0)
                } else
                    this.startIndex = t,
                    i && i.run()
            }
        }, {
            key: "_setCellChanged",
            value: function() {
                this._cellChanged || (this._cellChanged = !0,
                this.callLater(this.changeCells))
            }
        }, {
            key: "commitMeasure",
            value: function() {
                this.runCallLater(this.changeCells)
            }
        }, {
            key: "cacheAs",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", t, this, !0),
                this._scrollBar && (this._usedCache = null,
                "none" !== t ? this._scrollBar.on(a.Event.START, this, this.onScrollStart) : this._scrollBar.off(a.Event.START, this, this.onScrollStart))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this)
            }
        }, {
            key: "content",
            get: function() {
                return this._content
            }
        }, {
            key: "vScrollBarSkin",
            get: function() {
                return this._scrollBar ? this._scrollBar.skin : null
            },
            set: function(t) {
                this._removePreScrollBar();
                var e = new I;
                e.name = "scrollBar",
                e.right = 0,
                e.skin = t,
                e.elasticDistance = this._elasticEnabled ? 200 : 0,
                this.scrollBar = e,
                this.addChild(e),
                this._setCellChanged()
            }
        }, {
            key: "hScrollBarSkin",
            get: function() {
                return this._scrollBar ? this._scrollBar.skin : null
            },
            set: function(t) {
                this._removePreScrollBar();
                var e = new B;
                e.name = "scrollBar",
                e.bottom = 0,
                e.skin = t,
                e.elasticDistance = this._elasticEnabled ? 200 : 0,
                this.scrollBar = e,
                this.addChild(e),
                this._setCellChanged()
            }
        }, {
            key: "scrollBar",
            get: function() {
                return this._scrollBar
            },
            set: function(t) {
                this._scrollBar != t && (this._scrollBar = t,
                t && (this._isVertical = this._scrollBar.isVertical,
                this.addChild(this._scrollBar),
                this._scrollBar.on(a.Event.CHANGE, this, this.onScrollBarChange)))
            }
        }, {
            key: "itemRender",
            get: function() {
                return this._itemRender
            },
            set: function(t) {
                if (this._itemRender != t) {
                    this._itemRender = t;
                    for (var e = this._cells.length - 1; e > -1; e--)
                        this._cells[e].destroy();
                    this._cells.length = 0,
                    this._setCellChanged()
                }
            }
        }, {
            key: "width",
            set: function(t) {
                t != this._width && ((0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._setCellChanged())
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                t != this._height && ((0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._setCellChanged())
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "repeatX",
            get: function() {
                return this._repeatX > 0 ? this._repeatX : this._repeatX2 > 0 ? this._repeatX2 : 1
            },
            set: function(t) {
                this._repeatX = t,
                this._setCellChanged()
            }
        }, {
            key: "repeatY",
            get: function() {
                return this._repeatY > 0 ? this._repeatY : this._repeatY2 > 0 ? this._repeatY2 : 1
            },
            set: function(t) {
                this._repeatY = t,
                this._setCellChanged()
            }
        }, {
            key: "spaceX",
            get: function() {
                return this._spaceX
            },
            set: function(t) {
                this._spaceX = t,
                this._setCellChanged()
            }
        }, {
            key: "spaceY",
            get: function() {
                return this._spaceY
            },
            set: function(t) {
                this._spaceY = t,
                this._setCellChanged()
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex
            },
            set: function(t) {
                this._selectedIndex != t && (this._selectedIndex = t,
                this.changeSelectStatus(),
                this.event(a.Event.CHANGE),
                this.selectHandler && this.selectHandler.runWith(t),
                this.startIndex = this._startIndex)
            }
        }, {
            key: "selectedItem",
            get: function() {
                return -1 != this._selectedIndex ? this._array[this._selectedIndex] : null
            },
            set: function(t) {
                this.selectedIndex = this._array.indexOf(t)
            }
        }, {
            key: "selection",
            get: function() {
                return this.getCell(this._selectedIndex)
            },
            set: function(t) {
                this.selectedIndex = this._startIndex + this._cells.indexOf(t)
            }
        }, {
            key: "startIndex",
            get: function() {
                return this._startIndex
            },
            set: function(t) {
                this._startIndex = t > 0 ? t : 0,
                this.callLater(this.renderItems)
            }
        }, {
            key: "array",
            get: function() {
                return this._array
            },
            set: function(t) {
                this.runCallLater(this.changeCells),
                this._array = t || [],
                this._preLen = this._array.length;
                var e = this._array.length;
                if (this.totalPage = Math.ceil(e / (this.repeatX * this.repeatY)),
                this._selectedIndex = this._selectedIndex < e ? this._selectedIndex : e - 1,
                this.startIndex = this._startIndex,
                this._scrollBar) {
                    this._scrollBar.stopScroll();
                    var i = this._isVertical ? this.repeatX : this.repeatY
                      , s = this._isVertical ? this.repeatY : this.repeatX
                      , n = Math.ceil(e / i);
                    (this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage) > 1 && n >= s ? (this._scrollBar.scrollSize = this._cellSize,
                    this._scrollBar.thumbPercent = s / n,
                    this._scrollBar.setScroll(0, (n - s) * this._cellSize + this._cellOffset, this._scrollBar.value),
                    this._scrollBar.target = this._content) : (this._scrollBar.setScroll(0, 0, 0),
                    this._scrollBar.target = this._content)
                }
            }
        }, {
            key: "page",
            get: function() {
                return this._page
            },
            set: function(t) {
                this._page = t,
                this._array && (this._page = t > 0 ? t : 0,
                this._page = this._page < this.totalPage ? this._page : this.totalPage - 1,
                this.startIndex = this._page * this.repeatX * this.repeatY)
            }
        }, {
            key: "length",
            get: function() {
                return this._array ? this._array.length : 0
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.array = t : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "cells",
            get: function() {
                return this.runCallLater(this.changeCells),
                this._cells
            }
        }, {
            key: "elasticEnabled",
            get: function() {
                return this._elasticEnabled
            },
            set: function(t) {
                this._elasticEnabled = t,
                this._scrollBar && (this._scrollBar.elasticDistance = t ? 200 : 0)
            }
        }]),
        o
    }(C);
    a.ILaya.regClass(M),
    a.ClassUtils.regClass("laya.ui.List", M),
    a.ClassUtils.regClass("Laya.List", M);
    var O = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._visibleNum = 6,
            t._itemColors = d.comboBoxItemColors,
            t._itemSize = 12,
            t._labels = [],
            t._selectedIndex = -1,
            t.itemRender = null,
            t.skin = i,
            t.labels = s,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._button && this._button.destroy(t),
                this._list && this._list.destroy(t),
                this._button = null,
                this._list = null,
                this._itemColors = null,
                this._labels = null,
                this._selectHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._button = new m),
                this._button.text.align = "left",
                this._button.labelPadding = "0,0,0,5",
                this._button.on(a.Event.MOUSE_DOWN, this, this.onButtonMouseDown)
            }
        }, {
            key: "_createList",
            value: function() {
                this._list = new M,
                this._scrollBarSkin && (this._list.vScrollBarSkin = this._scrollBarSkin),
                this._setListEvent(this._list)
            }
        }, {
            key: "_setListEvent",
            value: function(t) {
                this._list.selectEnable = !0,
                this._list.on(a.Event.MOUSE_DOWN, this, this.onListDown),
                this._list.mouseHandler = a.Handler.create(this, this.onlistItemMouse, null, !1),
                this._list.scrollBar && this._list.scrollBar.on(a.Event.MOUSE_DOWN, this, this.onScrollBarDown)
            }
        }, {
            key: "onListDown",
            value: function(t) {
                t.stopPropagation()
            }
        }, {
            key: "onScrollBarDown",
            value: function(t) {
                t.stopPropagation()
            }
        }, {
            key: "onButtonMouseDown",
            value: function(t) {
                this.callLater(this.switchTo, [!this._isOpen])
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this._button.width
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this._button.height
            }
        }, {
            key: "changeList",
            value: function() {
                this._listChanged = !1;
                var t = this.width - 2
                  , e = this._itemColors[2];
                this._itemHeight = this._itemSize + 6,
                this._list.itemRender = this.itemRender || {
                    type: "Box",
                    child: [{
                        type: "Label",
                        props: {
                            name: "label",
                            x: 1,
                            padding: "3,3,3,3",
                            width: t,
                            height: this._itemHeight,
                            fontSize: this._itemSize,
                            color: e
                        }
                    }]
                },
                this._list.repeatY = this._visibleNum,
                this._list.refresh()
            }
        }, {
            key: "onlistItemMouse",
            value: function(t, e) {
                var i = t.type;
                if (i === a.Event.MOUSE_OVER || i === a.Event.MOUSE_OUT) {
                    if (this._isCustomList)
                        return;
                    var s = this._list.getCell(e);
                    if (!s)
                        return;
                    var n = s.getChildByName("label");
                    n && (i === a.Event.ROLL_OVER ? (n.bgColor = this._itemColors[0],
                    n.color = this._itemColors[1]) : (n.bgColor = null,
                    n.color = this._itemColors[2]))
                } else
                    i === a.Event.CLICK && (this.selectedIndex = e,
                    this.isOpen = !1)
            }
        }, {
            key: "switchTo",
            value: function(t) {
                this.isOpen = t
            }
        }, {
            key: "changeOpen",
            value: function() {
                this.isOpen = !this._isOpen
            }
        }, {
            key: "changeItem",
            value: function() {
                if (this._itemChanged = !1,
                this._listHeight = this._labels.length > 0 ? Math.min(this._visibleNum, this._labels.length) * this._itemHeight : this._itemHeight,
                !this._isCustomList) {
                    var t = this._list.graphics;
                    t.clear(!0),
                    t.drawRect(0, 0, this.width - 1, this._listHeight, this._itemColors[4], this._itemColors[3])
                }
                var e = this._list.array || [];
                e.length = 0;
                for (var i = 0, s = this._labels.length; i < s; i++)
                    e.push({
                        label: this._labels[i]
                    });
                this._list.height = this._listHeight,
                this._list.array = e
            }
        }, {
            key: "changeSelected",
            value: function() {
                this._button.label = this.selectedLabel
            }
        }, {
            key: "_onStageMouseWheel",
            value: function(t) {
                this._list && !this._list.contains(t.target) && this.removeList(null)
            }
        }, {
            key: "removeList",
            value: function(t) {
                a.ILaya.stage.off(a.Event.MOUSE_DOWN, this, this.removeList),
                a.ILaya.stage.off(a.Event.MOUSE_WHEEL, this, this._onStageMouseWheel),
                this.isOpen = !1
            }
        }, {
            key: "skin",
            get: function() {
                return this._button.skin
            },
            set: function(t) {
                this._button.skin != t && (this._button.skin = t,
                this._listChanged = !0)
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._button.width = this._width,
                this._itemChanged = !0,
                this._listChanged = !0
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._button.height = this._height
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "labels",
            get: function() {
                return this._labels.join(",")
            },
            set: function(t) {
                this._labels.length > 0 && (this.selectedIndex = -1),
                t ? this._labels = t.split(",") : this._labels.length = 0,
                this._itemChanged = !0
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex
            },
            set: function(t) {
                this._selectedIndex != t && (this._selectedIndex = t,
                this._labels.length > 0 ? this.changeSelected() : this.callLater(this.changeSelected),
                this.event(a.Event.CHANGE, [a.Event.EMPTY.setTo(a.Event.CHANGE, this, this)]),
                this._selectHandler && this._selectHandler.runWith(this._selectedIndex))
            }
        }, {
            key: "selectHandler",
            get: function() {
                return this._selectHandler
            },
            set: function(t) {
                this._selectHandler = t
            }
        }, {
            key: "selectedLabel",
            get: function() {
                return this._selectedIndex > -1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] : null
            },
            set: function(t) {
                this.selectedIndex = this._labels.indexOf(t)
            }
        }, {
            key: "visibleNum",
            get: function() {
                return this._visibleNum
            },
            set: function(t) {
                this._visibleNum = t,
                this._listChanged = !0
            }
        }, {
            key: "itemColors",
            get: function() {
                return String(this._itemColors)
            },
            set: function(t) {
                this._itemColors = y.fillArray(this._itemColors, t, String),
                this._listChanged = !0
            }
        }, {
            key: "itemSize",
            get: function() {
                return this._itemSize
            },
            set: function(t) {
                this._itemSize = t,
                this._listChanged = !0
            }
        }, {
            key: "isOpen",
            get: function() {
                return this._isOpen
            },
            set: function(t) {
                if (this._isOpen != t)
                    if (this._isOpen = t,
                    this._button.selected = this._isOpen,
                    this._isOpen) {
                        this._list || this._createList(),
                        this._listChanged && !this._isCustomList && this.changeList(),
                        this._itemChanged && this.changeItem();
                        var e = this.localToGlobal(a.Point.TEMP.setTo(0, 0))
                          , i = e.y + this._button.height;
                        i = i + this._listHeight <= a.ILaya.stage.height ? i : e.y - this._listHeight,
                        this._list.pos(e.x, i),
                        this._list.zOrder = 1001,
                        a.ILaya.stage.addChild(this._list),
                        a.ILaya.stage.once(a.Event.MOUSE_DOWN, this, this.removeList),
                        a.ILaya.stage.on(a.Event.MOUSE_WHEEL, this, this._onStageMouseWheel),
                        this._list.selectedIndex = this._selectedIndex
                    } else
                        this._list && this._list.removeSelf()
            }
        }, {
            key: "scrollBarSkin",
            get: function() {
                return this._scrollBarSkin
            },
            set: function(t) {
                this._scrollBarSkin = t
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._button.sizeGrid
            },
            set: function(t) {
                this._button.sizeGrid = t
            }
        }, {
            key: "scrollBar",
            get: function() {
                return this.list.scrollBar
            }
        }, {
            key: "button",
            get: function() {
                return this._button
            }
        }, {
            key: "list",
            get: function() {
                return this._list || this._createList(),
                this._list
            },
            set: function(t) {
                t && (t.removeSelf(),
                this._isCustomList = !0,
                this._list = t,
                this._setListEvent(t),
                this._itemHeight = t.getCell(0).height + t.spaceY)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.labels = t.join(",") : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }, {
            key: "labelColors",
            get: function() {
                return this._button.labelColors
            },
            set: function(t) {
                this._button.labelColors != t && (this._button.labelColors = t)
            }
        }, {
            key: "labelPadding",
            get: function() {
                return this._button.text.padding.join(",")
            },
            set: function(t) {
                this._button.text.padding = y.fillArray(d.labelPadding, t, Number)
            }
        }, {
            key: "labelSize",
            get: function() {
                return this._button.text.fontSize
            },
            set: function(t) {
                this._button.text.fontSize = t
            }
        }, {
            key: "labelBold",
            get: function() {
                return this._button.text.bold
            },
            set: function(t) {
                this._button.text.bold = t
            }
        }, {
            key: "labelFont",
            get: function() {
                return this._button.text.font
            },
            set: function(t) {
                this._button.text.font = t
            }
        }, {
            key: "stateNum",
            get: function() {
                return this._button.stateNum
            },
            set: function(t) {
                this._button.stateNum = t
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(O),
    a.ClassUtils.regClass("laya.ui.ComboBox", O),
    a.ClassUtils.regClass("Laya.ComboBox", O);
    var T = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._value = .5,
            t.skin = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._bg && this._bg.destroy(t),
                this._bar && this._bar.destroy(t),
                this._bg = this._bar = null,
                this.changeHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._bg = new p),
                this.addChild(this._bar = new p),
                this._bar._bitmap.autoCacheCmd = !1
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this._bg.skin = this._skin,
                this._bar.skin = this._skin.replace(".png", "$bar.png"),
                this.callLater(this.changeValue),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this._bg.width
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this._bg.height
            }
        }, {
            key: "changeValue",
            value: function() {
                if (this.sizeGrid) {
                    var t = this.sizeGrid.split(",")
                      , e = Number(t[3])
                      , i = Number(t[1])
                      , s = (this.width - e - i) * this._value;
                    this._bar.width = e + i + s,
                    this._bar.visible = this._bar.width > e + i
                } else
                    this._bar.width = this.width * this._value
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                this._skin && !a.Loader.getRes(this._skin) ? a.ILaya.loader.load(this._skin, a.Handler.create(this, this._skinLoaded), null, a.Loader.IMAGE, 1) : this._skinLoaded())
            }
        }, {
            key: "value",
            get: function() {
                return this._value
            },
            set: function(t) {
                this._value != t && (t = t > 1 ? 1 : t < 0 ? 0 : t,
                this._value = t,
                this.callLater(this.changeValue),
                this.event(a.Event.CHANGE),
                this.changeHandler && this.changeHandler.runWith(t))
            }
        }, {
            key: "bar",
            get: function() {
                return this._bar
            }
        }, {
            key: "bg",
            get: function() {
                return this._bg
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bg.sizeGrid
            },
            set: function(t) {
                this._bg.sizeGrid = this._bar.sizeGrid = t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._bg.width = this._width,
                this.callLater(this.changeValue)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._bg.height = this._height,
                this._bar.height = this._height
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.value = Number(t) : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(T),
    a.ClassUtils.regClass("laya.ui.ProgressBar", T),
    a.ClassUtils.regClass("Laya.ProgressBar", T);
    var U = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this, s, n)).toggle = !1,
            t._autoSize = !1,
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, t),
                this._value = null
            }
        }, {
            key: "preinitialize",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "preinitialize", this).call(this),
                this.toggle = !1,
                this._autoSize = !1
            }
        }, {
            key: "initialize",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "initialize", this).call(this),
                this.createText(),
                this._text.align = "left",
                this._text.valign = "top",
                this._text.width = 0,
                this.on(a.Event.CLICK, this, this.onClick)
            }
        }, {
            key: "onClick",
            value: function(t) {
                this.selected = !0
            }
        }, {
            key: "value",
            get: function() {
                return null != this._value ? this._value : this.label
            },
            set: function(t) {
                this._value = t
            }
        }]),
        i
    }(m);
    a.ILaya.regClass(U),
    a.ClassUtils.regClass("laya.ui.Radio", U),
    a.ClassUtils.regClass("Laya.Radio", U);
    var z = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._selectedIndex = -1,
            t._direction = "horizontal",
            t._space = 0,
            t.skin = s,
            t.labels = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "preinitialize",
            value: function() {
                this.mouseEnabled = !0
            }
        }, {
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._items && (this._items.length = 0),
                this._items = null,
                this.selectHandler = null
            }
        }, {
            key: "addItem",
            value: function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , i = t
                  , s = this._items.length;
                if (i.name = "item" + s,
                this.addChild(i),
                this.initItems(),
                e && s > 0) {
                    var n = this._items[s - 1];
                    "horizontal" == this._direction ? i.x = n._x + n.width + this._space : i.y = n._y + n.height + this._space
                } else
                    e && (i.x = 0,
                    i.y = 0);
                return s
            }
        }, {
            key: "delItem",
            value: function(t) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , i = this._items.indexOf(t);
                if (-1 != i) {
                    var s, n = t;
                    this.removeChild(n);
                    for (var a = i + 1, h = this._items.length; a < h; a++) {
                        var l = this._items[a];
                        l.name = "item" + (a - 1),
                        e && ("horizontal" == this._direction ? l.x -= n.width + this._space : l.y -= n.height + this._space)
                    }
                    this.initItems(),
                    this._selectedIndex > -1 && (s = this._selectedIndex < this._items.length ? this._selectedIndex : this._selectedIndex - 1,
                    this._selectedIndex = -1,
                    this.selectedIndex = s)
                }
            }
        }, {
            key: "_afterInited",
            value: function() {
                this.initItems()
            }
        }, {
            key: "initItems",
            value: function() {
                this._items || (this._items = []),
                this._items.length = 0;
                for (var t = 0; t < 1e4; t++) {
                    var e = this.getChildByName("item" + t);
                    if (null == e)
                        break;
                    this._items.push(e),
                    e.selected = t === this._selectedIndex,
                    e.clickHandler = a.Handler.create(this, this.itemClick, [t], !1)
                }
            }
        }, {
            key: "itemClick",
            value: function(t) {
                this.selectedIndex = t
            }
        }, {
            key: "setSelect",
            value: function(t, e) {
                this._items && t > -1 && t < this._items.length && (this._items[t].selected = e)
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this._setLabelChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "createItem",
            value: function(t, e) {
                return null
            }
        }, {
            key: "changeLabels",
            value: function() {
                if (this._labelChanged = !1,
                this._items)
                    for (var t = 0, e = 0, i = this._items.length; e < i; e++) {
                        var s = this._items[e];
                        this._skin && (s.skin = this._skin),
                        this._labelColors && (s.labelColors = this._labelColors),
                        this._labelSize && (s.labelSize = this._labelSize),
                        this._labelStroke && (s.labelStroke = this._labelStroke),
                        this._labelStrokeColor && (s.labelStrokeColor = this._labelStrokeColor),
                        this._strokeColors && (s.strokeColors = this._strokeColors),
                        this._labelBold && (s.labelBold = this._labelBold),
                        this._labelPadding && (s.labelPadding = this._labelPadding),
                        this._labelAlign && (s.labelAlign = this._labelAlign),
                        this._stateNum && (s.stateNum = this._stateNum),
                        this._labelFont && (s.labelFont = this._labelFont),
                        "horizontal" === this._direction ? (s.y = 0,
                        s.x = t,
                        t += s.width + this._space) : (s.x = 0,
                        s.y = t,
                        t += s.height + this._space)
                    }
                this._sizeChanged()
            }
        }, {
            key: "commitMeasure",
            value: function() {
                this.runCallLater(this.changeLabels)
            }
        }, {
            key: "_setLabelChanged",
            value: function() {
                this._labelChanged || (this._labelChanged = !0,
                this.callLater(this.changeLabels))
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex
            },
            set: function(t) {
                this._selectedIndex != t && (this.setSelect(this._selectedIndex, !1),
                this._selectedIndex = t,
                this.setSelect(t, !0),
                this.event(a.Event.CHANGE),
                this.selectHandler && this.selectHandler.runWith(this._selectedIndex))
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                this._skin && !a.Loader.getRes(this._skin) ? a.ILaya.loader.load(this._skin, a.Handler.create(this, this._skinLoaded), null, a.Loader.IMAGE, 1) : this._skinLoaded())
            }
        }, {
            key: "labels",
            get: function() {
                return this._labels
            },
            set: function(t) {
                if (this._labels != t) {
                    if (this._labels = t,
                    this.removeChildren(),
                    this._setLabelChanged(),
                    this._labels)
                        for (var e = this._labels.split(","), i = 0, s = e.length; i < s; i++) {
                            var n = this.createItem(this._skin, e[i]);
                            n.name = "item" + i,
                            this.addChild(n)
                        }
                    this.initItems()
                }
            }
        }, {
            key: "labelColors",
            get: function() {
                return this._labelColors
            },
            set: function(t) {
                this._labelColors != t && (this._labelColors = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelStroke",
            get: function() {
                return this._labelStroke
            },
            set: function(t) {
                this._labelStroke != t && (this._labelStroke = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelStrokeColor",
            get: function() {
                return this._labelStrokeColor
            },
            set: function(t) {
                this._labelStrokeColor != t && (this._labelStrokeColor = t,
                this._setLabelChanged())
            }
        }, {
            key: "strokeColors",
            get: function() {
                return this._strokeColors
            },
            set: function(t) {
                this._strokeColors != t && (this._strokeColors = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelSize",
            get: function() {
                return this._labelSize
            },
            set: function(t) {
                this._labelSize != t && (this._labelSize = t,
                this._setLabelChanged())
            }
        }, {
            key: "stateNum",
            get: function() {
                return this._stateNum
            },
            set: function(t) {
                this._stateNum != t && (this._stateNum = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelBold",
            get: function() {
                return this._labelBold
            },
            set: function(t) {
                this._labelBold != t && (this._labelBold = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelFont",
            get: function() {
                return this._labelFont
            },
            set: function(t) {
                this._labelFont != t && (this._labelFont = t,
                this._setLabelChanged())
            }
        }, {
            key: "labelPadding",
            get: function() {
                return this._labelPadding
            },
            set: function(t) {
                this._labelPadding != t && (this._labelPadding = t,
                this._setLabelChanged())
            }
        }, {
            key: "direction",
            get: function() {
                return this._direction
            },
            set: function(t) {
                this._direction = t,
                this._setLabelChanged()
            }
        }, {
            key: "space",
            get: function() {
                return this._space
            },
            set: function(t) {
                this._space = t,
                this._setLabelChanged()
            }
        }, {
            key: "items",
            get: function() {
                return this._items
            }
        }, {
            key: "selection",
            get: function() {
                return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null
            },
            set: function(t) {
                this.selectedIndex = this._items.indexOf(t)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.labels = t.join(",") : (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }]),
        o
    }(C);
    a.ILaya.regClass(z),
    a.ClassUtils.regClass("laya.ui.UIGroup", z),
    a.ClassUtils.regClass("Laya.UIGroup", z);
    var D = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(i, [{
            key: "createItem",
            value: function(t, e) {
                return new U(t,e)
            }
        }]),
        i
    }(z);
    a.ILaya.regClass(D),
    a.ClassUtils.regClass("laya.ui.RadioGroup", D),
    a.ClassUtils.regClass("Laya.RadioGroup", D);
    var A = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(i, [{
            key: "createItem",
            value: function(t, e) {
                return new m(t,e)
            }
        }]),
        i
    }(z);
    a.ILaya.regClass(A),
    a.ClassUtils.regClass("laya.ui.Tab", A),
    a.ClassUtils.regClass("Laya.Tab", A);
    var H = function(t) {
        (0,
        l.default)(o, t);
        var i = c(o);
        function o() {
            var t;
            return (0,
            classCallCheck.default)(this, o),
            (t = i.apply(this, arguments))._setIndexHandler = a.Handler.create((0,
            e.default)(t), t.setIndex, null, !1),
            t
        }
        return (0,
        s.default)(o, [{
            key: "setItems",
            value: function(t) {
                this.removeChildren();
                for (var e = 0, i = 0, s = t.length; i < s; i++) {
                    var n = t[i];
                    n && (n.name = "item" + e,
                    this.addChild(n),
                    e++)
                }
                this.initItems()
            }
        }, {
            key: "addItem",
            value: function(t) {
                t.name = "item" + this._items.length,
                this.addChild(t),
                this.initItems()
            }
        }, {
            key: "_afterInited",
            value: function() {
                this.initItems()
            }
        }, {
            key: "initItems",
            value: function() {
                this._items = [];
                for (var t = 0; t < 1e4; t++) {
                    var e = this.getChildByName("item" + t);
                    if (null == e)
                        break;
                    this._items.push(e),
                    e.visible = t == this._selectedIndex
                }
            }
        }, {
            key: "setSelect",
            value: function(t, e) {
                this._items && t > -1 && t < this._items.length && (this._items[t].visible = e)
            }
        }, {
            key: "setIndex",
            value: function(t) {
                this.selectedIndex = t
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex
            },
            set: function(t) {
                this._selectedIndex != t && (this.setSelect(this._selectedIndex, !1),
                this._selectedIndex = t,
                this.setSelect(this._selectedIndex, !0))
            }
        }, {
            key: "selection",
            get: function() {
                return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null
            },
            set: function(t) {
                this.selectedIndex = this._items.indexOf(t)
            }
        }, {
            key: "setIndexHandler",
            get: function() {
                return this._setIndexHandler
            },
            set: function(t) {
                this._setIndexHandler = t
            }
        }, {
            key: "items",
            get: function() {
                return this._items
            }
        }, {
            key: "dataSource",
            set: function(t) {
                if (this._dataSource = t,
                "number" == typeof t || "string" == typeof t)
                    this.selectedIndex = parseInt(t);
                else
                    for (var e in this._dataSource)
                        e in this && (this[e] = this._dataSource[e])
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "dataSource", this)
            }
        }]),
        o
    }(C);
    a.ILaya.regClass(H),
    a.ClassUtils.regClass("laya.ui.ViewStack", H),
    a.ClassUtils.regClass("Laya.ViewStack", H);
    var N = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this)).text = i,
            t.skin = t.skin,
            t
        }
        return (0,
        s.default)(o, [{
            key: "preinitialize",
            value: function() {
                this.mouseEnabled = !0
            }
        }, {
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._bg && this._bg.destroy(),
                this._bg = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._tf = new a.Input),
                this._tf.padding = d.inputLabelPadding,
                this._tf.on(a.Event.INPUT, this, this._onInput),
                this._tf.on(a.Event.ENTER, this, this._onEnter),
                this._tf.on(a.Event.BLUR, this, this._onBlur),
                this._tf.on(a.Event.FOCUS, this, this._onFocus)
            }
        }, {
            key: "_onFocus",
            value: function() {
                this.event(a.Event.FOCUS, this)
            }
        }, {
            key: "_onBlur",
            value: function() {
                this.event(a.Event.BLUR, this)
            }
        }, {
            key: "_onInput",
            value: function() {
                this.event(a.Event.INPUT, this)
            }
        }, {
            key: "_onEnter",
            value: function() {
                this.event(a.Event.ENTER, this)
            }
        }, {
            key: "initialize",
            value: function() {
                this.width = 128,
                this.height = 22
            }
        }, {
            key: "_skinLoaded",
            value: function() {
                this._bg || (this.graphics = this._bg = new _),
                this._bg.source = a.Loader.getRes(this._skin),
                this._width && (this._bg.width = this._width),
                this._height && (this._bg.height = this._height),
                this._sizeChanged(),
                this.event(a.Event.LOADED)
            }
        }, {
            key: "select",
            value: function() {
                this._tf.select()
            }
        }, {
            key: "setSelection",
            value: function(t, e) {
                this._tf.setSelection(t, e)
            }
        }, {
            key: "bg",
            get: function() {
                return this._bg
            },
            set: function(t) {
                this.graphics = this._bg = t
            }
        }, {
            key: "skin",
            get: function() {
                return this._skin
            },
            set: function(t) {
                this._skin != t && (this._skin = t,
                this._skin && !a.Loader.getRes(this._skin) ? a.ILaya.loader.load(this._skin, a.Handler.create(this, this._skinLoaded), null, a.Loader.IMAGE, 1) : this._skinLoaded())
            }
        }, {
            key: "sizeGrid",
            get: function() {
                return this._bg && this._bg.sizeGrid ? this._bg.sizeGrid.join(",") : null
            },
            set: function(t) {
                this._bg || (this.graphics = this._bg = new _),
                this._bg.sizeGrid = y.fillArray(d.defaultSizeGrid, t, Number)
            }
        }, {
            key: "text",
            set: function(t) {
                this._tf.text != t && (t += "",
                this._tf.text = t,
                this.event(a.Event.CHANGE))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "text", this)
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._bg && (this._bg.width = t)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._bg && (this._bg.height = t)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "multiline",
            get: function() {
                return this._tf.multiline
            },
            set: function(t) {
                this._tf.multiline = t
            }
        }, {
            key: "editable",
            set: function(t) {
                this._tf.editable = t
            },
            get: function() {
                return this._tf.editable
            }
        }, {
            key: "restrict",
            get: function() {
                return this._tf.restrict
            },
            set: function(t) {
                this._tf.restrict = t
            }
        }, {
            key: "prompt",
            get: function() {
                return this._tf.prompt
            },
            set: function(t) {
                this._tf.prompt = t
            }
        }, {
            key: "promptColor",
            get: function() {
                return this._tf.promptColor
            },
            set: function(t) {
                this._tf.promptColor = t
            }
        }, {
            key: "maxChars",
            get: function() {
                return this._tf.maxChars
            },
            set: function(t) {
                this._tf.maxChars = t
            }
        }, {
            key: "focus",
            get: function() {
                return this._tf.focus
            },
            set: function(t) {
                this._tf.focus = t
            }
        }, {
            key: "type",
            get: function() {
                return this._tf.type
            },
            set: function(t) {
                this._tf.type = t
            }
        }]),
        o
    }(L);
    a.ILaya.regClass(N),
    a.ClassUtils.regClass("laya.ui.TextInput", N),
    a.ClassUtils.regClass("Laya.TextInput", N);
    var P = function(t) {
        (0,
        l.default)(u, t);
        var o = c(u);
        function u() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return (0,
            classCallCheck.default)(this, u),
            (t = o.call(this, i)).on(a.Event.CHANGE, (0,
            e.default)(t), t._onTextChange),
            t
        }
        return (0,
        s.default)(u, [{
            key: "_onTextChange",
            value: function() {
                this.callLater(this.changeScroll)
            }
        }, {
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._vScrollBar && this._vScrollBar.destroy(),
                this._hScrollBar && this._hScrollBar.destroy(),
                this._vScrollBar = null,
                this._hScrollBar = null,
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "destroy", this).call(this, t)
            }
        }, {
            key: "initialize",
            value: function() {
                this.width = 180,
                this.height = 150,
                this._tf.wordWrap = !0,
                this.multiline = !0
            }
        }, {
            key: "onVBarChanged",
            value: function(t) {
                this._tf.scrollY != this._vScrollBar.value && (this._tf.scrollY = this._vScrollBar.value)
            }
        }, {
            key: "onHBarChanged",
            value: function(t) {
                this._tf.scrollX != this._hScrollBar.value && (this._tf.scrollX = this._hScrollBar.value)
            }
        }, {
            key: "changeScroll",
            value: function() {
                var t = this._vScrollBar && this._tf.maxScrollY > 0
                  , e = this._hScrollBar && this._tf.maxScrollX > 0
                  , i = t ? this._width - this._vScrollBar.width : this._width
                  , s = e ? this._height - this._hScrollBar.height : this._height
                  , n = this._tf.padding || d.labelPadding;
                this._tf.width = i,
                this._tf.height = s,
                this._vScrollBar && (this._vScrollBar.x = this._width - this._vScrollBar.width - n[2],
                this._vScrollBar.y = n[1],
                this._vScrollBar.height = this._height - (e ? this._hScrollBar.height : 0) - n[1] - n[3],
                this._vScrollBar.scrollSize = 1,
                this._vScrollBar.thumbPercent = s / Math.max(this._tf.textHeight, s),
                this._vScrollBar.setScroll(1, this._tf.maxScrollY, this._tf.scrollY),
                this._vScrollBar.visible = t),
                this._hScrollBar && (this._hScrollBar.x = n[0],
                this._hScrollBar.y = this._height - this._hScrollBar.height - n[3],
                this._hScrollBar.width = this._width - (t ? this._vScrollBar.width : 0) - n[0] - n[2],
                this._hScrollBar.scrollSize = Math.max(.033 * i, 1),
                this._hScrollBar.thumbPercent = i / Math.max(this._tf.textWidth, i),
                this._hScrollBar.setScroll(0, this.maxScrollX, this.scrollX),
                this._hScrollBar.visible = e)
            }
        }, {
            key: "scrollTo",
            value: function(t) {
                this.commitMeasure(),
                this._tf.scrollY = t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "width", t, this, !0),
                this.callLater(this.changeScroll)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "height", t, this, !0),
                this.callLater(this.changeScroll)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "height", this)
            }
        }, {
            key: "vScrollBarSkin",
            get: function() {
                return this._vScrollBar ? this._vScrollBar.skin : null
            },
            set: function(t) {
                null == this._vScrollBar && (this.addChild(this._vScrollBar = new I),
                this._vScrollBar.on(a.Event.CHANGE, this, this.onVBarChanged),
                this._vScrollBar.target = this._tf,
                this.callLater(this.changeScroll)),
                this._vScrollBar.skin = t
            }
        }, {
            key: "hScrollBarSkin",
            get: function() {
                return this._hScrollBar ? this._hScrollBar.skin : null
            },
            set: function(t) {
                null == this._hScrollBar && (this.addChild(this._hScrollBar = new B),
                this._hScrollBar.on(a.Event.CHANGE, this, this.onHBarChanged),
                this._hScrollBar.mouseWheelEnable = !1,
                this._hScrollBar.target = this._tf,
                this.callLater(this.changeScroll)),
                this._hScrollBar.skin = t
            }
        }, {
            key: "vScrollBar",
            get: function() {
                return this._vScrollBar
            }
        }, {
            key: "hScrollBar",
            get: function() {
                return this._hScrollBar
            }
        }, {
            key: "maxScrollY",
            get: function() {
                return this._tf.maxScrollY
            }
        }, {
            key: "scrollY",
            get: function() {
                return this._tf.scrollY
            }
        }, {
            key: "maxScrollX",
            get: function() {
                return this._tf.maxScrollX
            }
        }, {
            key: "scrollX",
            get: function() {
                return this._tf.scrollX
            }
        }]),
        u
    }(N);
    a.ILaya.regClass(P),
    a.ClassUtils.regClass("laya.ui.TextArea", P),
    a.ClassUtils.regClass("Laya.TextArea", P);
    var R = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.apply(this, arguments))._oldW = 0,
            t._oldH = 0,
            t
        }
        return (0,
        s.default)(o, [{
            key: "onEnable",
            value: function() {
                a.ILaya.stage.on("resize", this, this.onResize),
                this.onResize()
            }
        }, {
            key: "onDisable",
            value: function() {
                a.ILaya.stage.off("resize", this, this.onResize)
            }
        }, {
            key: "onResize",
            value: function() {
                var t = a.ILaya.stage;
                if (this.width > 0 && this.height > 0) {
                    var e = Math.min(t.width / this._oldW, t.height / this._oldH);
                    (0,
                    asetset.default)((0,
                    getPrototypeOf.default)(o.prototype), "width", t.width, this, !0),
                    (0,
                    asetset.default)((0,
                    getPrototypeOf.default)(o.prototype), "height", t.height, this, !0),
                    this.scale(e, e)
                }
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._oldW = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._oldH = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }]),
        o
    }(C);
    a.ILaya.regClass(R),
    a.ClassUtils.regClass("laya.ui.ScaleBox", R),
    a.ClassUtils.regClass("Laya.ScaleBox", R);
    var Y = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t, s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this, s)).isVertical = !1,
            t
        }
        return i
    }(x);
    a.ILaya.regClass(Y),
    a.ClassUtils.regClass("laya.ui.HSlider", Y),
    a.ClassUtils.regClass("Laya.HSlider", Y);
    var X = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._usedCache = null,
            t._elasticEnabled = !1,
            t.width = t.height = 100,
            t
        }
        return (0,
        s.default)(o, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t),
                this._content && this._content.destroy(t),
                this._vScrollBar && this._vScrollBar.destroy(t),
                this._hScrollBar && this._hScrollBar.destroy(t),
                this._vScrollBar = null,
                this._hScrollBar = null,
                this._content = null
            }
        }, {
            key: "destroyChildren",
            value: function() {
                this._content.destroyChildren()
            }
        }, {
            key: "createChildren",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "addChild", this).call(this, this._content = new C)
            }
        }, {
            key: "addChild",
            value: function(t) {
                return t.on(a.Event.RESIZE, this, this.onResize),
                this._setScrollChanged(),
                this._content.addChild(t)
            }
        }, {
            key: "onResize",
            value: function() {
                this._setScrollChanged()
            }
        }, {
            key: "addChildAt",
            value: function(t, e) {
                return t.on(a.Event.RESIZE, this, this.onResize),
                this._setScrollChanged(),
                this._content.addChildAt(t, e)
            }
        }, {
            key: "removeChild",
            value: function(t) {
                return t.off(a.Event.RESIZE, this, this.onResize),
                this._setScrollChanged(),
                this._content.removeChild(t)
            }
        }, {
            key: "removeChildAt",
            value: function(t) {
                return this.getChildAt(t).off(a.Event.RESIZE, this, this.onResize),
                this._setScrollChanged(),
                this._content.removeChildAt(t)
            }
        }, {
            key: "removeChildren",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2147483647;
                return this._content.removeChildren(t, e),
                this._setScrollChanged(),
                this
            }
        }, {
            key: "getChildAt",
            value: function(t) {
                return this._content.getChildAt(t)
            }
        }, {
            key: "getChildByName",
            value: function(t) {
                return this._content.getChildByName(t)
            }
        }, {
            key: "getChildIndex",
            value: function(t) {
                return this._content.getChildIndex(t)
            }
        }, {
            key: "changeScroll",
            value: function() {
                this._scrollChanged = !1;
                var t = this.contentWidth || 1
                  , e = this.contentHeight || 1
                  , i = this._vScrollBar
                  , s = this._hScrollBar
                  , n = i && e > this._height
                  , a = s && t > this._width
                  , h = n ? this._width - i.width : this._width
                  , l = a ? this._height - s.height : this._height;
                i && (i.x = this._width - i.width,
                i.y = 0,
                i.height = this._height - (a ? s.height : 0),
                i.scrollSize = Math.max(.033 * this._height, 1),
                i.thumbPercent = l / e,
                i.setScroll(0, e - l, i.value)),
                s && (s.x = 0,
                s.y = this._height - s.height,
                s.width = this._width - (n ? i.width : 0),
                s.scrollSize = Math.max(.033 * this._width, 1),
                s.thumbPercent = h / t,
                s.setScroll(0, t - h, s.value))
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "_sizeChanged", this).call(this),
                this.setContentSize(this._width, this._height)
            }
        }, {
            key: "setContentSize",
            value: function(t, e) {
                var i = this._content;
                i.width = t,
                i.height = e,
                i._style.scrollRect || (i.scrollRect = a.Rectangle.create()),
                i._style.scrollRect.setTo(0, 0, t, e),
                i.scrollRect = i.scrollRect
            }
        }, {
            key: "onScrollBarChange",
            value: function(t) {
                var e = this._content._style.scrollRect;
                if (e) {
                    var i = Math.round(t.value);
                    t.isVertical ? e.y = i : e.x = i,
                    this._content.scrollRect = e
                }
            }
        }, {
            key: "scrollTo",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                this.vScrollBar && (this.vScrollBar.value = e),
                this.hScrollBar && (this.hScrollBar.value = t)
            }
        }, {
            key: "refresh",
            value: function() {
                this.changeScroll()
            }
        }, {
            key: "onScrollStart",
            value: function() {
                this._usedCache || (this._usedCache = (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this)),
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", "none", this, !0),
                this._hScrollBar && this._hScrollBar.once(a.Event.END, this, this.onScrollEnd),
                this._vScrollBar && this._vScrollBar.once(a.Event.END, this, this.onScrollEnd)
            }
        }, {
            key: "onScrollEnd",
            value: function() {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this._usedCache, this, !0)
            }
        }, {
            key: "_setScrollChanged",
            value: function() {
                this._scrollChanged || (this._scrollChanged = !0,
                this.callLater(this.changeScroll))
            }
        }, {
            key: "numChildren",
            get: function() {
                return this._content.numChildren
            }
        }, {
            key: "contentWidth",
            get: function() {
                for (var t = 0, e = this._content.numChildren - 1; e > -1; e--) {
                    var i = this._content.getChildAt(e);
                    t = Math.max(i._x + i.width * i.scaleX - i.pivotX, t)
                }
                return t
            }
        }, {
            key: "contentHeight",
            get: function() {
                for (var t = 0, e = this._content.numChildren - 1; e > -1; e--) {
                    var i = this._content.getChildAt(e);
                    t = Math.max(i._y + i.height * i.scaleY - i.pivotY, t)
                }
                return t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this._setScrollChanged()
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this._setScrollChanged()
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "vScrollBarSkin",
            get: function() {
                return this._vScrollBar ? this._vScrollBar.skin : null
            },
            set: function(t) {
                null == this._vScrollBar && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "addChild", this).call(this, this._vScrollBar = new I),
                this._vScrollBar.on(a.Event.CHANGE, this, this.onScrollBarChange, [this._vScrollBar]),
                this._vScrollBar.target = this._content,
                this._vScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0,
                this._setScrollChanged()),
                this._vScrollBar.skin = t
            }
        }, {
            key: "hScrollBarSkin",
            get: function() {
                return this._hScrollBar ? this._hScrollBar.skin : null
            },
            set: function(t) {
                null == this._hScrollBar && ((0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "addChild", this).call(this, this._hScrollBar = new B),
                this._hScrollBar.on(a.Event.CHANGE, this, this.onScrollBarChange, [this._hScrollBar]),
                this._hScrollBar.target = this._content,
                this._hScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0,
                this._setScrollChanged()),
                this._hScrollBar.skin = t
            }
        }, {
            key: "vScrollBar",
            get: function() {
                return this._vScrollBar
            }
        }, {
            key: "hScrollBar",
            get: function() {
                return this._hScrollBar
            }
        }, {
            key: "content",
            get: function() {
                return this._content
            }
        }, {
            key: "cacheAs",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", t, this, !0),
                this._usedCache = null,
                "none" !== t ? (this._hScrollBar && this._hScrollBar.on(a.Event.START, this, this.onScrollStart),
                this._vScrollBar && this._vScrollBar.on(a.Event.START, this, this.onScrollStart)) : (this._hScrollBar && this._hScrollBar.off(a.Event.START, this, this.onScrollStart),
                this._vScrollBar && this._vScrollBar.off(a.Event.START, this, this.onScrollStart))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "cacheAs", this)
            }
        }, {
            key: "elasticEnabled",
            get: function() {
                return this._elasticEnabled
            },
            set: function(t) {
                this._elasticEnabled = t,
                this._vScrollBar && (this._vScrollBar.elasticDistance = t ? 200 : 0),
                this._hScrollBar && (this._hScrollBar.elasticDistance = t ? 200 : 0)
            }
        }]),
        o
    }(C);
    a.ILaya.regClass(X),
    a.ClassUtils.regClass("laya.ui.Panel", X),
    a.ClassUtils.regClass("Laya.Panel", X);
    var W = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            return (0,
            classCallCheck.default)(this, i),
            e.apply(this, arguments)
        }
        return i
    }(x);
    a.ILaya.regClass(W),
    a.ClassUtils.regClass("laya.ui.VSlider", W),
    a.ClassUtils.regClass("Laya.VSlider", W);
    var G = function(t) {
        (0,
        l.default)(u, t);
        var e = c(u);
        function u() {
            var t;
            return (0,
            classCallCheck.default)(this, u),
            (t = e.call(this))._spaceLeft = 10,
            t._spaceBottom = 0,
            t._keepStatus = !0,
            t.width = t.height = 200,
            t
        }
        return (0,
        s.default)(u, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "destroy", this).call(this, t),
                this._list && this._list.destroy(t),
                this._list = null,
                this._source = null,
                this._renderHandler = null
            }
        }, {
            key: "createChildren",
            value: function() {
                this.addChild(this._list = new M),
                this._list.renderHandler = a.Handler.create(this, this.renderItem, null, !1),
                this._list.repeatX = 1,
                this._list.on(a.Event.CHANGE, this, this.onListChange)
            }
        }, {
            key: "onListChange",
            value: function() {
                this.event(a.Event.CHANGE)
            }
        }, {
            key: "getArray",
            value: function() {
                var t = [];
                for (var e in this._source) {
                    var i = this._source[e];
                    this.getParentOpenStatus(i) && (i.x = this._spaceLeft * this.getDepth(i),
                    t.push(i))
                }
                return t
            }
        }, {
            key: "getDepth",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return null == t.nodeParent ? e : this.getDepth(t.nodeParent, e + 1)
            }
        }, {
            key: "getParentOpenStatus",
            value: function(t) {
                var e = t.nodeParent;
                return null == e || !!e.isOpen && (null == e.nodeParent || this.getParentOpenStatus(e))
            }
        }, {
            key: "renderItem",
            value: function(t, e) {
                var i = t.dataSource;
                if (i) {
                    t.left = i.x;
                    var s = t.getChildByName("arrow");
                    s && (i.hasChild ? (s.visible = !0,
                    s.index = i.isOpen ? 1 : 0,
                    s.tag = e,
                    s.off(a.Event.CLICK, this, this.onArrowClick),
                    s.on(a.Event.CLICK, this, this.onArrowClick)) : s.visible = !1);
                    var n = t.getChildByName("folder");
                    n && (2 == n.clipY ? n.index = i.isDirectory ? 0 : 1 : n.index = i.isDirectory ? i.isOpen ? 1 : 0 : 2),
                    this._renderHandler && this._renderHandler.runWith([t, e])
                }
            }
        }, {
            key: "onArrowClick",
            value: function(t) {
                var e = t.currentTarget.tag;
                this._list.array[e].isOpen = !this._list.array[e].isOpen,
                this.event(a.Event.OPEN),
                this._list.array = this.getArray()
            }
        }, {
            key: "setItemState",
            value: function(t, e) {
                this._list.array[t] && (this._list.array[t].isOpen = e,
                this._list.array = this.getArray())
            }
        }, {
            key: "fresh",
            value: function() {
                this._list.array = this.getArray(),
                this.repaint()
            }
        }, {
            key: "parseXml",
            value: function(t, e, i, s) {
                var n, a = t.childNodes, h = a.length;
                if (!s) {
                    n = {};
                    var l = t.attributes;
                    for (var r in l) {
                        var o = l[r]
                          , u = o.nodeName
                          , c = o.nodeValue;
                        n[u] = "true" == c || "false" != c && c
                    }
                    n.nodeParent = i,
                    h > 0 && (n.isDirectory = !0),
                    n.hasChild = h > 0,
                    e.push(n)
                }
                for (var d = 0; d < h; d++) {
                    var _ = a[d];
                    this.parseXml(_, e, n, !1)
                }
            }
        }, {
            key: "parseOpenStatus",
            value: function(t, e) {
                for (var i = 0, s = e.length; i < s; i++) {
                    var n = e[i];
                    if (n.isDirectory)
                        for (var a = 0, h = t.length; a < h; a++) {
                            var l = t[a];
                            if (l.isDirectory && this.isSameParent(l, n) && n.label == l.label) {
                                n.isOpen = l.isOpen;
                                break
                            }
                        }
                }
            }
        }, {
            key: "isSameParent",
            value: function(t, e) {
                return null == t.nodeParent && null == e.nodeParent || null != t.nodeParent && null != e.nodeParent && t.nodeParent.label == e.nodeParent.label && this.isSameParent(t.nodeParent, e.nodeParent)
            }
        }, {
            key: "filter",
            value: function(t) {
                if (Boolean(t)) {
                    var e = [];
                    this.getFilterSource(this._source, e, t),
                    this._list.array = e
                } else
                    this._list.array = this.getArray()
            }
        }, {
            key: "getFilterSource",
            value: function(t, e, i) {
                i = i.toLocaleLowerCase();
                var s, n = o(t);
                try {
                    for (n.s(); !(s = n.n()).done; ) {
                        var a = s.value;
                        !a.isDirectory && String(a.label).toLowerCase().indexOf(i) > -1 && (a.x = 0,
                        e.push(a)),
                        a.child && a.child.length > 0 && this.getFilterSource(a.child, e, i)
                    }
                } catch (t) {
                    n.e(t)
                } finally {
                    n.f()
                }
            }
        }, {
            key: "keepStatus",
            get: function() {
                return this._keepStatus
            },
            set: function(t) {
                this._keepStatus = t
            }
        }, {
            key: "array",
            get: function() {
                return this._list.array
            },
            set: function(t) {
                this._keepStatus && this._list.array && t && this.parseOpenStatus(this._list.array, t),
                this._source = t,
                this._list.array = this.getArray()
            }
        }, {
            key: "source",
            get: function() {
                return this._source
            }
        }, {
            key: "list",
            get: function() {
                return this._list
            }
        }, {
            key: "itemRender",
            get: function() {
                return this._list.itemRender
            },
            set: function(t) {
                this._list.itemRender = t
            }
        }, {
            key: "scrollBarSkin",
            get: function() {
                return this._list.vScrollBarSkin
            },
            set: function(t) {
                this._list.vScrollBarSkin = t
            }
        }, {
            key: "scrollBar",
            get: function() {
                return this._list.scrollBar
            }
        }, {
            key: "mouseHandler",
            get: function() {
                return this._list.mouseHandler
            },
            set: function(t) {
                this._list.mouseHandler = t
            }
        }, {
            key: "renderHandler",
            get: function() {
                return this._renderHandler
            },
            set: function(t) {
                this._renderHandler = t
            }
        }, {
            key: "spaceLeft",
            get: function() {
                return this._spaceLeft
            },
            set: function(t) {
                this._spaceLeft = t
            }
        }, {
            key: "spaceBottom",
            get: function() {
                return this._list.spaceY
            },
            set: function(t) {
                this._list.spaceY = t
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._list.selectedIndex
            },
            set: function(t) {
                this._list.selectedIndex = t
            }
        }, {
            key: "selectedItem",
            get: function() {
                return this._list.selectedItem
            },
            set: function(t) {
                this._list.selectedItem = t
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "width", t, this, !0),
                this._list.width = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "height", t, this, !0),
                this._list.height = t
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "height", this)
            }
        }, {
            key: "dataSource",
            set: function(t) {
                this._dataSource = t,
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "dataSource", t, this, !0)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "dataSource", this)
            }
        }, {
            key: "xml",
            set: function(t) {
                var e = [];
                this.parseXml(t.childNodes[0], e, null, !0),
                this.array = e
            }
        }, {
            key: "selectedPath",
            get: function() {
                return this._list.selectedItem ? this._list.selectedItem.path : null
            }
        }]),
        u
    }(C);
    a.ILaya.regClass(G),
    a.ClassUtils.regClass("laya.ui.Tree", G),
    a.ClassUtils.regClass("Laya.Tree", G);
    var V = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.apply(this, arguments))._space = 0,
            t._align = "none",
            t._itemChanged = !1,
            t
        }
        return (0,
        s.default)(i, [{
            key: "addChild",
            value: function(t) {
                return t.on(a.Event.RESIZE, this, this.onResize),
                this._setItemChanged(),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "addChild", this).call(this, t)
            }
        }, {
            key: "onResize",
            value: function(t) {
                this._setItemChanged()
            }
        }, {
            key: "addChildAt",
            value: function(t, e) {
                return t.on(a.Event.RESIZE, this, this.onResize),
                this._setItemChanged(),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "addChildAt", this).call(this, t, e)
            }
        }, {
            key: "removeChildAt",
            value: function(t) {
                return this.getChildAt(t).off(a.Event.RESIZE, this, this.onResize),
                this._setItemChanged(),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "removeChildAt", this).call(this, t)
            }
        }, {
            key: "refresh",
            value: function() {
                this._setItemChanged()
            }
        }, {
            key: "changeItems",
            value: function() {
                this._itemChanged = !1
            }
        }, {
            key: "sortItem",
            value: function(t) {
                t && t.sort((function(t, e) {
                    return t.y - e.y
                }
                ))
            }
        }, {
            key: "_setItemChanged",
            value: function() {
                this._itemChanged || (this._itemChanged = !0,
                this.callLater(this.changeItems))
            }
        }, {
            key: "space",
            get: function() {
                return this._space
            },
            set: function(t) {
                this._space = t,
                this._setItemChanged()
            }
        }, {
            key: "align",
            get: function() {
                return this._align
            },
            set: function(t) {
                this._align = t,
                this._setItemChanged()
            }
        }]),
        i
    }(C);
    a.ILaya.regClass(V),
    a.ClassUtils.regClass("laya.ui.LayoutBox", V),
    a.ClassUtils.regClass("Laya.LayoutBox", V);
    var F = function(t) {
        (0,
        l.default)(a, t);
        var e = c(a);
        function a() {
            return (0,
            classCallCheck.default)(this, a),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(a, [{
            key: "sortItem",
            value: function(t) {
                t && t.sort((function(t, e) {
                    return t.x - e.x
                }
                ))
            }
        }, {
            key: "changeItems",
            value: function() {
                this._itemChanged = !1;
                for (var t = [], e = 0, i = 0, s = this.numChildren; i < s; i++) {
                    var n = this.getChildAt(i);
                    n && (t.push(n),
                    e = this._height ? this._height : Math.max(e, n.height * n.scaleY))
                }
                this.sortItem(t);
                var h = 0;
                for (i = 0,
                s = t.length; i < s; i++)
                    (n = t[i]).x = h,
                    h += n.width * n.scaleX + this._space,
                    this._align == a.TOP ? n.y = 0 : this._align == a.MIDDLE ? n.y = .5 * (e - n.height * n.scaleY) : this._align == a.BOTTOM && (n.y = e - n.height * n.scaleY);
                this._sizeChanged()
            }
        }, {
            key: "height",
            set: function(t) {
                this._height != t && ((0,
                asetset.default)((0,
                getPrototypeOf.default)(a.prototype), "height", t, this, !0),
                this.callLater(this.changeItems))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(a.prototype), "height", this)
            }
        }]),
        a
    }(V);
    F.NONE = "none",
    F.TOP = "top",
    F.MIDDLE = "middle",
    F.BOTTOM = "bottom",
    a.ILaya.regClass(F),
    a.ClassUtils.regClass("laya.ui.HBox", F),
    a.ClassUtils.regClass("Laya.HBox", F);
    var j = function(t) {
        (0,
        l.default)(a, t);
        var e = c(a);
        function a() {
            return (0,
            classCallCheck.default)(this, a),
            e.apply(this, arguments)
        }
        return (0,
        s.default)(a, [{
            key: "changeItems",
            value: function() {
                this._itemChanged = !1;
                for (var t = [], e = 0, i = 0, s = this.numChildren; i < s; i++) {
                    var n = this.getChildAt(i);
                    n && (t.push(n),
                    e = this._width ? this._width : Math.max(e, n.width * n.scaleX))
                }
                this.sortItem(t);
                var h = 0;
                for (i = 0,
                s = t.length; i < s; i++)
                    (n = t[i]).y = h,
                    h += n.height * n.scaleY + this._space,
                    this._align == a.LEFT ? n.x = 0 : this._align == a.CENTER ? n.x = .5 * (e - n.width * n.scaleX) : this._align == a.RIGHT && (n.x = e - n.width * n.scaleX);
                this._sizeChanged()
            }
        }, {
            key: "width",
            set: function(t) {
                this._width != t && ((0,
                asetset.default)((0,
                getPrototypeOf.default)(a.prototype), "width", t, this, !0),
                this.callLater(this.changeItems))
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(a.prototype), "width", this)
            }
        }]),
        a
    }(V);
    j.NONE = "none",
    j.LEFT = "left",
    j.CENTER = "center",
    j.RIGHT = "right",
    a.ILaya.regClass(j),
    a.ClassUtils.regClass("laya.ui.VBox", j),
    a.ClassUtils.regClass("Laya.VBox", j);
    var $ = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
            return (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._valueArr = "",
            t._indexMap = null,
            t._sheet = null,
            t._direction = "horizontal",
            t._spaceX = 0,
            t._spaceY = 0,
            t._align = "left",
            t._wordsW = 0,
            t._wordsH = 0,
            i && (t.skin = i),
            s && (t.sheet = s),
            t
        }
        return (0,
        s.default)(o, [{
            key: "createChildren",
            value: function() {
                this._bitmap = new _,
                this.on(a.Event.LOADED, this, this._onClipLoaded)
            }
        }, {
            key: "_onClipLoaded",
            value: function() {
                this.callLater(this.changeValue)
            }
        }, {
            key: "changeValue",
            value: function() {
                var t;
                if (this._sources && this._valueArr && (this.graphics.clear(!0),
                t = this._sources[0])) {
                    var e = "horizontal" === this._direction;
                    e ? (this._wordsW = this._valueArr.length * (t.sourceWidth + this.spaceX),
                    this._wordsH = t.sourceHeight) : (this._wordsW = t.sourceWidth,
                    this._wordsH = (t.sourceHeight + this.spaceY) * this._valueArr.length);
                    var i = 0;
                    if (this._width)
                        switch (this._align) {
                        case "center":
                            i = .5 * (this._width - this._wordsW);
                            break;
                        case "right":
                            i = this._width - this._wordsW;
                            break;
                        default:
                            i = 0
                        }
                    for (var s = 0, n = this._valueArr.length; s < n; s++) {
                        var a = this._indexMap[this._valueArr.charAt(s)];
                        this.sources[a] && (t = this.sources[a],
                        e ? this.graphics.drawImage(t, i + s * (t.sourceWidth + this.spaceX), 0, t.sourceWidth, t.sourceHeight) : this.graphics.drawImage(t, 0 + i, s * (t.sourceHeight + this.spaceY), t.sourceWidth, t.sourceHeight))
                    }
                    this._width || (this._widget.resetLayoutX(),
                    this.callLater(this._sizeChanged)),
                    this._height || (this._widget.resetLayoutY(),
                    this.callLater(this._sizeChanged))
                }
            }
        }, {
            key: "measureWidth",
            value: function() {
                return this._wordsW
            }
        }, {
            key: "measureHeight",
            value: function() {
                return this._wordsH
            }
        }, {
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._valueArr = null,
                this._indexMap = null,
                this.graphics.clear(!0),
                this.removeSelf(),
                this.off(a.Event.LOADED, this, this._onClipLoaded),
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "destroy", this).call(this, t)
            }
        }, {
            key: "sheet",
            get: function() {
                return this._sheet
            },
            set: function(t) {
                t += "",
                this._sheet = t;
                var e = t.split(" ");
                this._clipX = String(e[0]).length,
                this.clipY = e.length,
                this._indexMap = {};
                for (var i = 0; i < this._clipY; i++)
                    for (var s = e[i].split(""), n = 0, a = s.length; n < a; n++)
                        this._indexMap[s[n]] = i * this._clipX + n
            }
        }, {
            key: "value",
            get: function() {
                return this._valueArr ? this._valueArr : ""
            },
            set: function(t) {
                t += "",
                this._valueArr = t,
                this.callLater(this.changeValue)
            }
        }, {
            key: "direction",
            get: function() {
                return this._direction
            },
            set: function(t) {
                this._direction = t,
                this.callLater(this.changeValue)
            }
        }, {
            key: "spaceX",
            get: function() {
                return this._spaceX
            },
            set: function(t) {
                this._spaceX = t,
                "horizontal" === this._direction && this.callLater(this.changeValue)
            }
        }, {
            key: "spaceY",
            get: function() {
                return this._spaceY
            },
            set: function(t) {
                this._spaceY = t,
                "horizontal" !== this._direction && this.callLater(this.changeValue)
            }
        }, {
            key: "align",
            set: function(t) {
                this._align = t,
                this.callLater(this.changeValue)
            },
            get: function() {
                return this._align
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                this.callLater(this.changeValue)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                this.callLater(this.changeValue)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }]),
        o
    }(b);
    a.ILaya.regClass($),
    a.ClassUtils.regClass("laya.ui.FontClip", $),
    a.ClassUtils.regClass("Laya.FontClip", $);
    var Z = function(t) {
        (0,
        l.default)(i, t);
        var e = c(i);
        function i() {
            var t;
            return (0,
            classCallCheck.default)(this, i),
            (t = e.call(this, !1))._watchMap = {},
            t._anchorX = NaN,
            t._anchorY = NaN,
            t._widget = f.EMPTY,
            t.createChildren(),
            t
        }
        return (0,
        s.default)(i, [{
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this._watchMap = null,
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(i.prototype), "destroy", this).call(this, t)
            }
        }, {
            key: "changeData",
            value: function(t) {
                var e = this._watchMap[t];
                if (e)
                    for (var i = 0, s = e.length; i < s; i++)
                        e[i].exe(this)
            }
        }, {
            key: "_sizeChanged",
            value: function() {
                isNaN(this._anchorX) || (this.pivotX = this.anchorX * this.width),
                isNaN(this._anchorY) || (this.pivotY = this.anchorY * this.height),
                this.event(a.Event.RESIZE)
            }
        }, {
            key: "_getWidget",
            value: function() {
                return this._widget === f.EMPTY && (this._widget = this.addComponent(f)),
                this._widget
            }
        }, {
            key: "loadUI",
            value: function(t) {
                var e = i.uiMap[t];
                i.uiMap && this.createView(e)
            }
        }, {
            key: "top",
            get: function() {
                return this._widget.top
            },
            set: function(t) {
                t != this._widget.top && (this._getWidget().top = t)
            }
        }, {
            key: "bottom",
            get: function() {
                return this._widget.bottom
            },
            set: function(t) {
                t != this._widget.bottom && (this._getWidget().bottom = t)
            }
        }, {
            key: "left",
            get: function() {
                return this._widget.left
            },
            set: function(t) {
                t != this._widget.left && (this._getWidget().left = t)
            }
        }, {
            key: "right",
            get: function() {
                return this._widget.right
            },
            set: function(t) {
                t != this._widget.right && (this._getWidget().right = t)
            }
        }, {
            key: "centerX",
            get: function() {
                return this._widget.centerX
            },
            set: function(t) {
                t != this._widget.centerX && (this._getWidget().centerX = t)
            }
        }, {
            key: "centerY",
            get: function() {
                return this._widget.centerY
            },
            set: function(t) {
                t != this._widget.centerY && (this._getWidget().centerY = t)
            }
        }, {
            key: "anchorX",
            get: function() {
                return this._anchorX
            },
            set: function(t) {
                this._anchorX != t && (this._anchorX = t,
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "anchorY",
            get: function() {
                return this._anchorY
            },
            set: function(t) {
                this._anchorY != t && (this._anchorY = t,
                this.callLater(this._sizeChanged))
            }
        }, {
            key: "dataSource",
            get: function() {
                return this._dataSource
            },
            set: function(t) {
                for (var e in this._dataSource = t,
                t) {
                    var i = this.getChildByName(e);
                    i instanceof v ? i.dataSource = t[e] : e in this && !(this[e]instanceof Function) && (this[e] = t[e])
                }
            }
        }], [{
            key: "__init__",
            value: function() {
                a.ILaya.ClassUtils.regShortClassName([H, m, P, w, C, R, S, b, O, v, B, Y, p, L, M, X, T, U, D, E, x, A, N, i, I, W, G, F, j, a.Animation, a.Text, $])
            }
        }, {
            key: "regComponent",
            value: function(t, e) {
                a.ILaya.ClassUtils.regClass(t, e)
            }
        }, {
            key: "regViewRuntime",
            value: function(t, e) {
                a.ILaya.ClassUtils.regClass(t, e)
            }
        }, {
            key: "regUI",
            value: function(t, e) {
                a.ILaya.loader.cacheRes(t, e)
            }
        }]),
        i
    }(a.Scene);
    Z.uiMap = {},
    a.ILaya.regClass(Z),
    a.ClassUtils.regClass("laya.ui.View", Z),
    a.ClassUtils.regClass("Laya.View", Z);
    var K = function t() {
        (0,
        classCallCheck.default)(this, t)
    };
    K.Dialog = null;
    var q = function(t) {
        (0,
        l.default)(n, t);
        var i = c(n);
        function n() {
            var t;
            return (0,
            classCallCheck.default)(this, n),
            (t = i.call(this)).maskLayer = new a.Sprite,
            t.popupEffect = function(i) {
                i.scale(1, 1),
                i._effectTween = a.Tween.from(i, {
                    x: a.ILaya.stage.width / 2,
                    y: a.ILaya.stage.height / 2,
                    scaleX: 0,
                    scaleY: 0
                }, 300, a.Ease.backOut, a.Handler.create((0,
                e.default)(t), t.doOpen, [i]), 0, !1, !1)
            }
            ,
            t.closeEffect = function(i) {
                i._effectTween = a.Tween.to(i, {
                    x: a.ILaya.stage.width / 2,
                    y: a.ILaya.stage.height / 2,
                    scaleX: 0,
                    scaleY: 0
                }, 300, a.Ease.strongOut, a.Handler.create((0,
                e.default)(t), t.doClose, [i]), 0, !1, !1)
            }
            ,
            t.popupEffectHandler = new a.Handler((0,
            e.default)(t),t.popupEffect),
            t.closeEffectHandler = new a.Handler((0,
            e.default)(t),t.closeEffect),
            t.mouseEnabled = t.maskLayer.mouseEnabled = !0,
            t.zOrder = 1e3,
            a.ILaya.stage.addChild((0,
            e.default)(t)),
            a.ILaya.stage.on(a.Event.RESIZE, (0,
            e.default)(t), t._onResize),
            u.closeDialogOnSide && t.maskLayer.on("click", (0,
            e.default)(t), t._closeOnSide),
            t._onResize(null),
            t
        }
        return (0,
        s.default)(n, [{
            key: "_closeOnSide",
            value: function() {
                var t = this.getChildAt(this.numChildren - 1);
                t instanceof K.Dialog && t.close()
            }
        }, {
            key: "setLockView",
            value: function(t) {
                this.lockLayer || (this.lockLayer = new C,
                this.lockLayer.mouseEnabled = !0,
                this.lockLayer.size(a.ILaya.stage.width, a.ILaya.stage.height)),
                this.lockLayer.removeChildren(),
                t && (t.centerX = t.centerY = 0,
                this.lockLayer.addChild(t))
            }
        }, {
            key: "_onResize",
            value: function() {
                var t = this.maskLayer.width = a.ILaya.stage.width
                  , e = this.maskLayer.height = a.ILaya.stage.height;
                this.lockLayer && this.lockLayer.size(t, e),
                this.maskLayer.graphics.clear(!0),
                this.maskLayer.graphics.drawRect(0, 0, t, e, u.popupBgColor),
                this.maskLayer.alpha = u.popupBgAlpha;
                for (var i = this.numChildren - 1; i > -1; i--) {
                    var s = this.getChildAt(i);
                    s.isPopupCenter && this._centerDialog(s)
                }
            }
        }, {
            key: "_centerDialog",
            value: function(t) {
                t.x = Math.round((a.ILaya.stage.width - t.width >> 1) + t.pivotX),
                t.y = Math.round((a.ILaya.stage.height - t.height >> 1) + t.pivotY)
            }
        }, {
            key: "open",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                e && this._closeAll(),
                this._clearDialogEffect(t),
                t.isPopupCenter && this._centerDialog(t),
                this.addChild(t),
                (t.isModal || this._getBit(a.Const.HAS_ZORDER)) && a.ILaya.timer.callLater(this, this._checkMask),
                i && null != t.popupEffect ? t.popupEffect.runWith(t) : this.doOpen(t),
                this.event(a.Event.OPEN)
            }
        }, {
            key: "_clearDialogEffect",
            value: function(t) {
                t._effectTween && (a.Tween.clear(t._effectTween),
                t._effectTween = null)
            }
        }, {
            key: "doOpen",
            value: function(t) {
                t.onOpened(t._param)
            }
        }, {
            key: "lock",
            value: function(t) {
                this.lockLayer && (t ? this.addChild(this.lockLayer) : this.lockLayer.removeSelf())
            }
        }, {
            key: "close",
            value: function(t) {
                this._clearDialogEffect(t),
                t.isShowEffect && null != t.closeEffect ? t.closeEffect.runWith([t]) : this.doClose(t),
                this.event(a.Event.CLOSE)
            }
        }, {
            key: "doClose",
            value: function(t) {
                t.removeSelf(),
                t.isModal && this._checkMask(),
                t.closeHandler && t.closeHandler.runWith(t.closeType),
                t.onClosed(t.closeType),
                t.autoDestroyAtClosed && t.destroy()
            }
        }, {
            key: "closeAll",
            value: function() {
                this._closeAll(),
                this.event(a.Event.CLOSE)
            }
        }, {
            key: "_closeAll",
            value: function() {
                for (var t = this.numChildren - 1; t > -1; t--) {
                    var e = this.getChildAt(t);
                    e && null != e.close && this.doClose(e)
                }
            }
        }, {
            key: "getDialogsByGroup",
            value: function(t) {
                for (var e = [], i = this.numChildren - 1; i > -1; i--) {
                    var s = this.getChildAt(i);
                    s && s.group === t && e.push(s)
                }
                return e
            }
        }, {
            key: "closeByGroup",
            value: function(t) {
                for (var e = [], i = this.numChildren - 1; i > -1; i--) {
                    var s = this.getChildAt(i);
                    s && s.group === t && (s.close(),
                    e.push(s))
                }
                return e
            }
        }, {
            key: "_checkMask",
            value: function() {
                this.maskLayer.removeSelf();
                for (var t = this.numChildren - 1; t > -1; t--) {
                    var e = this.getChildAt(t);
                    if (e && e.isModal)
                        return void this.addChildAt(this.maskLayer, t)
                }
            }
        }]),
        n
    }(a.Sprite);
    a.ClassUtils.regClass("laya.ui.DialogManager", q),
    a.ClassUtils.regClass("Laya.DialogManager", q);
    var J = function(t) {
        (0,
        l.default)(u, t);
        var o = c(u);
        function u() {
            var t;
            return (0,
            classCallCheck.default)(this, u),
            (t = o.call(this)).isShowEffect = !0,
            t.isPopupCenter = !0,
            t.popupEffect = u.manager.popupEffectHandler,
            t.closeEffect = u.manager.closeEffectHandler,
            t._dealDragArea(),
            t.on(a.Event.CLICK, (0,
            e.default)(t), t._onClick),
            t
        }
        return (0,
        s.default)(u, [{
            key: "_dealDragArea",
            value: function() {
                var t = this.getChildByName("drag");
                t && (this.dragArea = t._x + "," + t._y + "," + t.width + "," + t.height,
                t.removeSelf())
            }
        }, {
            key: "_onMouseDown",
            value: function(t) {
                var e = this.getMousePoint();
                this._dragArea.contains(e.x, e.y) ? this.startDrag() : this.stopDrag()
            }
        }, {
            key: "_onClick",
            value: function(t) {
                var e = t.target;
                if (e)
                    switch (e.name) {
                    case u.CLOSE:
                    case u.CANCEL:
                    case u.SURE:
                    case u.NO:
                    case u.OK:
                    case u.YES:
                        return void this.close(e.name)
                    }
            }
        }, {
            key: "open",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
                  , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this._dealDragArea(),
                this._param = e,
                u.manager.open(this, t, this.isShowEffect),
                u.manager.lock(!1)
            }
        }, {
            key: "close",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                this.closeType = t,
                u.manager.close(this)
            }
        }, {
            key: "destroy",
            value: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.closeHandler = null,
                this.popupEffect = null,
                this.closeEffect = null,
                this._dragArea = null,
                (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "destroy", this).call(this, t)
            }
        }, {
            key: "show",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                this._open(!1, t, e)
            }
        }, {
            key: "popup",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                this._open(!0, t, e)
            }
        }, {
            key: "_open",
            value: function(t, e, i) {
                this.isModal = t,
                this.isShowEffect = i,
                u.manager.lock(!0),
                this.open(e)
            }
        }, {
            key: "dragArea",
            get: function() {
                return this._dragArea ? this._dragArea.toString() : null
            },
            set: function(t) {
                if (t) {
                    var e = y.fillArray([0, 0, 0, 0], t, Number);
                    this._dragArea = new a.Rectangle(e[0],e[1],e[2],e[3]),
                    this.on(a.Event.MOUSE_DOWN, this, this._onMouseDown)
                } else
                    this._dragArea = null,
                    this.off(a.Event.MOUSE_DOWN, this, this._onMouseDown)
            }
        }, {
            key: "isPopup",
            get: function() {
                return null != this.parent
            }
        }, {
            key: "zOrder",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(u.prototype), "zOrder", t, this, !0),
                u.manager._checkMask()
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(u.prototype), "zOrder", this)
            }
        }], [{
            key: "setLockView",
            value: function(t) {
                u.manager.setLockView(t)
            }
        }, {
            key: "lock",
            value: function(t) {
                u.manager.lock(t)
            }
        }, {
            key: "closeAll",
            value: function() {
                u.manager.closeAll()
            }
        }, {
            key: "getDialogsByGroup",
            value: function(t) {
                return u.manager.getDialogsByGroup(t)
            }
        }, {
            key: "closeByGroup",
            value: function(t) {
                return u.manager.closeByGroup(t)
            }
        }, {
            key: "manager",
            get: function() {
                return u._manager = u._manager || new q
            },
            set: function(t) {
                u._manager = t
            }
        }]),
        u
    }(Z);
    J.CLOSE = "close",
    J.CANCEL = "cancel",
    J.SURE = "sure",
    J.NO = "no",
    J.YES = "yes",
    J.OK = "ok",
    K.Dialog = J,
    a.ILaya.regClass(J),
    a.ClassUtils.regClass("laya.ui.Dialog", J),
    a.ClassUtils.regClass("Laya.Dialog", J);
    var Q = function(t) {
        (0,
        l.default)(n, t);
        var i = c(n);
        function n() {
            var t;
            return (0,
            classCallCheck.default)(this, n),
            (t = i.call(this))._tipBox = new v,
            t._tipBox.addChild(t._tipText = new a.Text),
            t._tipText.x = t._tipText.y = 5,
            t._tipText.color = n.tipTextColor,
            t._defaultTipHandler = t._showDefaultTip,
            a.ILaya.stage.on(g.SHOW_TIP, (0,
            e.default)(t), t._onStageShowTip),
            a.ILaya.stage.on(g.HIDE_TIP, (0,
            e.default)(t), t._onStageHideTip),
            t.zOrder = 1100,
            t
        }
        return (0,
        s.default)(n, [{
            key: "_onStageHideTip",
            value: function(t) {
                a.ILaya.timer.clear(this, this._showTip),
                this.closeAll(),
                this.removeSelf()
            }
        }, {
            key: "_onStageShowTip",
            value: function(t) {
                a.ILaya.timer.once(n.tipDelay, this, this._showTip, [t], !0)
            }
        }, {
            key: "_showTip",
            value: function(t) {
                if ("string" == typeof t) {
                    var e = String(t);
                    Boolean(e) && this._defaultTipHandler(e)
                } else
                    t instanceof a.Handler ? t.run() : t instanceof Function && t.apply();
                a.ILaya.stage.on(a.Event.MOUSE_MOVE, this, this._onStageMouseMove),
                a.ILaya.stage.on(a.Event.MOUSE_DOWN, this, this._onStageMouseDown),
                this._onStageMouseMove(null)
            }
        }, {
            key: "_onStageMouseDown",
            value: function(t) {
                this.closeAll()
            }
        }, {
            key: "_onStageMouseMove",
            value: function(t) {
                this._showToStage(this, n.offsetX, n.offsetY)
            }
        }, {
            key: "_showToStage",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                  , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                  , s = t.getBounds();
                t.x = a.ILaya.stage.mouseX + e,
                t.y = a.ILaya.stage.mouseY + i,
                t._x + s.width > a.ILaya.stage.width && (t.x -= s.width + e),
                t._y + s.height > a.ILaya.stage.height && (t.y -= s.height + i)
            }
        }, {
            key: "closeAll",
            value: function() {
                a.ILaya.timer.clear(this, this._showTip),
                a.ILaya.stage.off(a.Event.MOUSE_MOVE, this, this._onStageMouseMove),
                a.ILaya.stage.off(a.Event.MOUSE_DOWN, this, this._onStageMouseDown),
                this.removeChildren()
            }
        }, {
            key: "showDislayTip",
            value: function(t) {
                this.addChild(t),
                this._showToStage(this),
                a.ILaya.stage.addChild(this)
            }
        }, {
            key: "_showDefaultTip",
            value: function(t) {
                this._tipText.text = t;
                var e = this._tipBox.graphics;
                e.clear(!0),
                e.drawRect(0, 0, this._tipText.width + 10, this._tipText.height + 10, n.tipBackColor),
                this.addChild(this._tipBox),
                this._showToStage(this),
                a.ILaya.stage.addChild(this)
            }
        }, {
            key: "defaultTipHandler",
            get: function() {
                return this._defaultTipHandler
            },
            set: function(t) {
                this._defaultTipHandler = t
            }
        }]),
        n
    }(v);
    Q.offsetX = 10,
    Q.offsetY = 15,
    Q.tipTextColor = "#ffffff",
    Q.tipBackColor = "#111111",
    Q.tipDelay = 200,
    a.ILaya.regClass(Q),
    a.ClassUtils.regClass("laya.ui.TipManager", Q),
    a.ClassUtils.regClass("Laya.TipManager", Q);
    var tt = function(t) {
        (0,
        l.default)(o, t);
        var e = c(o);
        function o() {
            var t;
            (0,
            classCallCheck.default)(this, o),
            (t = e.call(this))._width = t._height = 200;
            var i = new a.Texture;
            return i.bitmap = new a.Texture2D,
            t.texture = i,
            t
        }
        return (0,
        s.default)(o, [{
            key: "onEnable",
            value: function() {
                this.postMsg({
                    type: "display",
                    rate: a.Laya.stage.frameRate
                }),
                window.wx && window.sharedCanvas && a.Laya.timer.frameLoop(1, this, this._onLoop)
            }
        }, {
            key: "onDisable",
            value: function() {
                this.postMsg({
                    type: "undisplay"
                }),
                a.Laya.timer.clear(this, this._onLoop)
            }
        }, {
            key: "_onLoop",
            value: function() {
                var t = window.sharedCanvas;
                this.texture.sourceWidth = t.width,
                this.texture.sourceHeight = t.height,
                this.texture.bitmap.loadImageSource(t)
            }
        }, {
            key: "_postMsg",
            value: function() {
                var t = new a.Matrix;
                t.translate(this.x, this.y);
                var e = a.Laya.stage;
                t.scale(e._canvasTransform.getScaleX() * this.globalScaleX * e.transform.getScaleX(), e._canvasTransform.getScaleY() * this.globalScaleY * e.transform.getScaleY()),
                this.postMsg({
                    type: "changeMatrix",
                    a: t.a,
                    b: t.b,
                    c: t.c,
                    d: t.d,
                    tx: t.tx,
                    ty: t.ty,
                    w: this.width,
                    h: this.height
                })
            }
        }, {
            key: "postMsg",
            value: function(t) {
                window.wx && window.wx.getOpenDataContext && window.wx.getOpenDataContext().postMessage(t)
            }
        }, {
            key: "width",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "width", t, this, !0),
                window.sharedCanvas && (window.sharedCanvas.width = t),
                this.callLater(this._postMsg)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "width", this)
            }
        }, {
            key: "height",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "height", t, this, !0),
                window.sharedCanvas && (window.sharedCanvas.height = t),
                this.callLater(this._postMsg)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "height", this)
            }
        }, {
            key: "x",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "x", t, this, !0),
                this.callLater(this._postMsg)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "x", this)
            }
        }, {
            key: "y",
            set: function(t) {
                (0,
                asetset.default)((0,
                getPrototypeOf.default)(o.prototype), "y", t, this, !0),
                this.callLater(this._postMsg)
            },
            get: function() {
                return (0,
                ngetget.default)((0,
                getPrototypeOf.default)(o.prototype), "y", this)
            }
        }]),
        o
    }(v);
    a.ILaya.regClass(tt),
    a.ClassUtils.regClass("laya.ui.WXOpenDataViewer", tt),
    a.ClassUtils.regClass("Laya.WXOpenDataViewer", tt),
    t.AdvImage = k,
    t.AutoBitmap = _,
    t.Box = C,
    t.Button = m,
    t.CheckBox = S,
    t.Clip = b,
    t.ColorPicker = w,
    t.ComboBox = O,
    t.Dialog = J,
    t.DialogManager = q,
    t.FontClip = $,
    t.HBox = F,
    t.HScrollBar = B,
    t.HSlider = Y,
    t.IUI = K,
    t.Image = p,
    t.Label = L,
    t.LayoutBox = V,
    t.List = M,
    t.Panel = X,
    t.ProgressBar = T,
    t.Radio = U,
    t.RadioGroup = D,
    t.ScaleBox = R,
    t.ScrollBar = E,
    t.Slider = x,
    t.Styles = d,
    t.Tab = A,
    t.TextArea = P,
    t.TextInput = N,
    t.TipManager = Q,
    t.Tree = G,
    t.UIComponent = v,
    t.UIConfig = u,
    t.UIEvent = g,
    t.UIGroup = z,
    t.UILib = function() {
        function t() {
            (0,
            classCallCheck.default)(this, t)
        }
        return (0,
        s.default)(t, null, [{
            key: "__init__",
            value: function() {}
        }]),
        t
    }(),
    t.UIUtils = y,
    t.VBox = j,
    t.VScrollBar = I,
    t.VSlider = W,
    t.View = Z,
    t.ViewStack = H,
    t.WXOpenDataViewer = tt,
    t.Widget = f
}(window.Laya = window.Laya || {}, Laya);
;