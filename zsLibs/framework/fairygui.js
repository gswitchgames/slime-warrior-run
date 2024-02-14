var t = require("../../@babel/runtime/helpers/interopRequireDefault"), 
e = t(require("../../@babel/runtime/helpers/typeof")), 
assertThisInitialized = t(require("../../@babel/runtime/helpers/assertThisInitialized")), 
ssetset = t(require("../../@babel/runtime/helpers/set")),
agetget = t(require("../../@babel/runtime/helpers/get")), 
possibleConstructorReturn = t(require("../../@babel/runtime/helpers/possibleConstructorReturn")),
 getPrototypeOf = t(require("../../@babel/runtime/helpers/getPrototypeOf")), h = t(require("../../@babel/runtime/helpers/inherits")),
 classCallCheck = t(require("../../@babel/runtime/helpers/classCallCheck")), l = t(require("../../@babel/runtime/helpers/createClass"));

 function _() {
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



function testReflect() {
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

function u(t) {
    return function() {
        var e, i = (0, getPrototypeOf.default)(t);
        if (testReflect()) {
            var s = (0, getPrototypeOf.default)(this).constructor;
            e = Reflect.construct(i, arguments, s);
        } else e = i.apply(this, arguments);
        return (0, possibleConstructorReturn.default)(this, e);
    };
}



window.fgui = window.fgui || {}, window.fairygui = window.fgui || {}, function(t) {
    var _ = function() {
        function t() {
            (0, classCallCheck.default)(this, t), this._asset = Laya.loader;
        }
        return (0, l.default)(t, [ {
            key: "getRes",
            value: function(t) {
                return this._asset.getRes(t);
            }
        }, {
            key: "load",
            value: function(t, e, i, s, n, a) {
                this._asset.load(t, e, i, s, n, a);
            }
        }, {
            key: "setAsset",
            value: function(t) {
                this._asset = t;
            }
        } ], [ {
            key: "inst",
            get: function() {
                return t._inst || (t._inst = new t()), t._inst;
            }
        } ]), t;
    }();
    t.AssetProxy = _, t.AsyncOperation = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._itemList = new Array(), this._objectPool = [];
        }
        return (0, l.default)(e, [ {
            key: "createObject",
            value: function(e, i) {
                var s = t.UIPackage.getByName(e);
                if (!s) throw new Error("package not found: " + e);
                var n = s.getItemByName(i);
                if (!n) throw new Error("resource not found: " + i);
                this.internalCreateObject(n);
            }
        }, {
            key: "createObjectFromURL",
            value: function(e) {
                var i = t.UIPackage.getItemByURL(e);
                if (!i) throw new Error("resource not found: " + e);
                this.internalCreateObject(i);
            }
        }, {
            key: "cancel",
            value: function() {
                if (Laya.timer.clear(this, this.run), this._itemList.length = 0, this._objectPool.length > 0) {
                    for (var t = this._objectPool.length, e = 0; e < t; e++) this._objectPool[e].dispose();
                    this._objectPool.length = 0;
                }
            }
        }, {
            key: "internalCreateObject",
            value: function(t) {
                this._itemList.length = 0, this._objectPool.length = 0;
                var e = {
                    pi: t,
                    type: t.objectType
                };
                e.childCount = this.collectComponentChildren(t), this._itemList.push(e), this._index = 0, 
                Laya.timer.frameLoop(1, this, this.run);
            }
        }, {
            key: "collectComponentChildren",
            value: function(e) {
                var i, s, n, a, o, h, r = e.rawData;
                r.seek(0, 2);
                var l = r.getInt16();
                for (n = 0; n < l; n++) {
                    a = r.getInt16(), o = r.pos, r.seek(o, 0);
                    var u = r.readByte(), _ = r.readS(), c = r.readS();
                    r.pos = o, null != _ ? (i = {
                        pi: s = (h = null != c ? t.UIPackage.getById(c) : e.owner) ? h.getItemById(_) : null,
                        type: u
                    }, s && s.type == t.PackageItemType.Component && (i.childCount = this.collectComponentChildren(s))) : (i = {
                        type: u
                    }, u == t.ObjectType.List && (i.listItemCount = this.collectListChildren(r))), this._itemList.push(i), 
                    r.pos = o + a;
                }
                return l;
            }
        }, {
            key: "collectListChildren",
            value: function(e) {
                e.seek(e.pos, 8);
                var i, s, n, a, o, h = 0, r = e.readS(), l = e.getInt16();
                for (i = 0; i < l; i++) s = e.getInt16(), s += e.pos, null == (n = e.readS()) && (n = r), 
                n && (a = t.UIPackage.getItemByURL(n)) && (o = {
                    pi: a,
                    type: a.objectType
                }, a.type == t.PackageItemType.Component && (o.childCount = this.collectComponentChildren(a)), 
                this._itemList.push(o), h++), e.pos = s;
                return h;
            }
        }, {
            key: "run",
            value: function() {
                for (var e, i, s, n, a = Laya.Browser.now(), o = t.UIConfig.frameTimeForAsyncUIConstruction, h = this._itemList.length; this._index < h; ) {
                    if ((i = this._itemList[this._index]).pi) e = t.UIObjectFactory.newObject(i.pi), 
                    this._objectPool.push(e), t.UIPackage._constructing++, i.pi.type == t.PackageItemType.Component ? (s = this._objectPool.length - i.childCount - 1, 
                    e.constructFromResource2(this._objectPool, s), this._objectPool.splice(s, i.childCount)) : e.constructFromResource(), 
                    t.UIPackage._constructing--; else if (e = t.UIObjectFactory.newObject(i.type), this._objectPool.push(e), 
                    i.type == t.ObjectType.List && i.listItemCount > 0) {
                        for (s = this._objectPool.length - i.listItemCount - 1, n = 0; n < i.listItemCount; n++) e.itemPool.returnObject(this._objectPool[n + s]);
                        this._objectPool.splice(s, i.listItemCount);
                    }
                    if (this._index++, this._index % 5 == 0 && Laya.Browser.now() - a >= o) return;
                }
                Laya.timer.clear(this, this.run);
                var r = this._objectPool[0];
                this._itemList.length = 0, this._objectPool.length = 0, null != this.callback && this.callback.runWith(r);
            }
        } ]), e;
    }();
    var c = 0;
    t.Controller = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._pageIds = [], t._pageNames = [], 
            t._selectedIndex = -1, t._previousIndex = -1, t;
        }
        return (0, l.default)(s, [ {
            key: "dispose",
            value: function() {
                this.offAll();
            }
        }, {
            key: "setSelectedIndex",
            value: function(t) {
                if (this._selectedIndex != t) {
                    if (t > this._pageIds.length - 1) throw "index out of bounds: " + t;
                    this.changing = !0, this._previousIndex = this._selectedIndex, this._selectedIndex = t, 
                    this.parent.applyController(this), this.changing = !1;
                }
            }
        }, {
            key: "setSelectedPage",
            value: function(t) {
                var e = this._pageNames.indexOf(t);
                -1 == e && (e = 0), this.setSelectedIndex(e);
            }
        }, {
            key: "getPageName",
            value: function(t) {
                return this._pageNames[t];
            }
        }, {
            key: "addPage",
            value: function(t) {
                this.addPageAt(t, this._pageIds.length);
            }
        }, {
            key: "addPageAt",
            value: function(t, e) {
                var i = "" + c++;
                e == this._pageIds.length ? (this._pageIds.push(i), this._pageNames.push(t)) : (this._pageIds.splice(e, 0, i), 
                this._pageNames.splice(e, 0, t));
            }
        }, {
            key: "removePage",
            value: function(t) {
                var e = this._pageNames.indexOf(t);
                -1 != e && (this._pageIds.splice(e, 1), this._pageNames.splice(e, 1), this._selectedIndex >= this._pageIds.length ? this.selectedIndex = this._selectedIndex - 1 : this.parent.applyController(this));
            }
        }, {
            key: "removePageAt",
            value: function(t) {
                this._pageIds.splice(t, 1), this._pageNames.splice(t, 1), this._selectedIndex >= this._pageIds.length ? this.selectedIndex = this._selectedIndex - 1 : this.parent.applyController(this);
            }
        }, {
            key: "clearPages",
            value: function() {
                this._pageIds.length = 0, this._pageNames.length = 0, -1 != this._selectedIndex ? this.selectedIndex = -1 : this.parent.applyController(this);
            }
        }, {
            key: "hasPage",
            value: function(t) {
                return -1 != this._pageNames.indexOf(t);
            }
        }, {
            key: "getPageIndexById",
            value: function(t) {
                return this._pageIds.indexOf(t);
            }
        }, {
            key: "getPageIdByName",
            value: function(t) {
                var e = this._pageNames.indexOf(t);
                return -1 != e ? this._pageIds[e] : null;
            }
        }, {
            key: "getPageNameById",
            value: function(t) {
                var e = this._pageIds.indexOf(t);
                return -1 != e ? this._pageNames[e] : null;
            }
        }, {
            key: "getPageId",
            value: function(t) {
                return this._pageIds[t];
            }
        }, {
            key: "runActions",
            value: function() {
                if (this._actions) for (var t = this._actions.length, e = 0; e < t; e++) this._actions[e].run(this, this.previousPageId, this.selectedPageId);
            }
        }, {
            key: "setup",
            value: function(e) {
                var i, s, n = e.pos;
                e.seek(n, 0), this.name = e.readS(), e.readBool() && (this.autoRadioGroupDepth = !0), 
                e.seek(n, 1);
                var a = e.getInt16();
                for (i = 0; i < a; i++) this._pageIds.push(e.readS()), this._pageNames.push(e.readS());
                var o = 0;
                if (e.version >= 2) switch (e.getByte()) {
                  case 1:
                    o = e.getInt16();
                    break;

                  case 2:
                    -1 == (o = this._pageNames.indexOf(t.UIPackage.branch)) && (o = 0);
                    break;

                  case 3:
                    -1 == (o = this._pageNames.indexOf(t.UIPackage.getVar(e.readS()))) && (o = 0);
                }
                if (e.seek(n, 2), (a = e.getInt16()) > 0) for (this._actions || (this._actions = []), 
                i = 0; i < a; i++) {
                    s = e.getInt16(), s += e.pos;
                    var h = t.ControllerAction.createAction(e.readByte());
                    h.setup(e), this._actions.push(h), e.pos = s;
                }
                this.parent && this._pageIds.length > 0 ? this._selectedIndex = o : this._selectedIndex = -1;
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex;
            },
            set: function(e) {
                if (this._selectedIndex != e) {
                    if (e > this._pageIds.length - 1) throw "index out of bounds: " + e;
                    this.changing = !0, this._previousIndex = this._selectedIndex, this._selectedIndex = e, 
                    this.parent.applyController(this), this.event(t.Events.STATE_CHANGED, this), this.changing = !1;
                }
            }
        }, {
            key: "previsousIndex",
            get: function() {
                return this._previousIndex;
            }
        }, {
            key: "selectedPage",
            get: function() {
                return -1 == this._selectedIndex ? null : this._pageNames[this._selectedIndex];
            },
            set: function(t) {
                var e = this._pageNames.indexOf(t);
                -1 == e && (e = 0), this.selectedIndex = e;
            }
        }, {
            key: "previousPage",
            get: function() {
                return -1 == this._previousIndex ? null : this._pageNames[this._previousIndex];
            }
        }, {
            key: "pageCount",
            get: function() {
                return this._pageIds.length;
            }
        }, {
            key: "selectedPageId",
            get: function() {
                return -1 == this._selectedIndex ? null : this._pageIds[this._selectedIndex];
            },
            set: function(t) {
                var e = this._pageIds.indexOf(t);
                this.selectedIndex = e;
            }
        }, {
            key: "oppositePageId",
            set: function(t) {
                this._pageIds.indexOf(t) > 0 ? this.selectedIndex = 0 : this._pageIds.length > 1 && (this.selectedIndex = 1);
            }
        }, {
            key: "previousPageId",
            get: function() {
                return -1 == this._previousIndex ? null : this._pageIds[this._previousIndex];
            }
        } ]), s;
    }(Laya.EventDispatcher);
    var d = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._agent = new t.GLoader(), this._agent.draggable = !0, 
            this._agent.touchable = !1, this._agent.setSize(100, 100), this._agent.setPivot(.5, .5, !0), 
            this._agent.align = "center", this._agent.verticalAlign = "middle", this._agent.sortingOrder = 1e6, 
            this._agent.on(t.Events.DRAG_END, this, this.__dragEnd);
        }
        return (0, l.default)(e, [ {
            key: "startDrag",
            value: function(e, i, s, n) {
                if (!this._agent.parent) {
                    this._sourceData = s, this._agent.url = i, t.GRoot.inst.addChild(this._agent);
                    var a = t.GRoot.inst.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY);
                    this._agent.setXY(a.x, a.y), this._agent.startDrag(n);
                }
            }
        }, {
            key: "cancel",
            value: function() {
                this._agent.parent && (this._agent.stopDrag(), t.GRoot.inst.removeChild(this._agent), 
                this._sourceData = null);
            }
        }, {
            key: "__dragEnd",
            value: function(e) {
                if (this._agent.parent) {
                    t.GRoot.inst.removeChild(this._agent);
                    var i = this._sourceData;
                    this._sourceData = null;
                    for (var s = t.GObject.cast(e.target); s; ) {
                        if (s.displayObject.hasListener(t.Events.DROP)) return s.requestFocus(), void s.displayObject.event(t.Events.DROP, [ i, t.Events.createEvent(t.Events.DROP, s.displayObject, e) ]);
                        s = s.parent;
                    }
                }
            }
        }, {
            key: "dragAgent",
            get: function() {
                return this._agent;
            }
        }, {
            key: "dragging",
            get: function() {
                return null != this._agent.parent;
            }
        } ], [ {
            key: "inst",
            get: function() {
                return e._inst || (e._inst = new e()), e._inst;
            }
        } ]), e;
    }();
    t.DragDropManager = d;
    var g = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, l.default)(t, null, [ {
            key: "createEvent",
            value: function(t, e, i) {
                return this.$event.setTo(t, e, i && i.target || e), this.$event.touchId = i && i.touchId || 0, 
                this.$event.nativeEvent = i, this.$event._stoped = !1, this.$event;
            }
        }, {
            key: "dispatch",
            value: function(t, e, i) {
                e.event(t, this.createEvent(t, e, i));
            }
        } ]), t;
    }();
    g.STATE_CHANGED = "fui_state_changed", g.XY_CHANGED = "fui_xy_changed", g.SIZE_CHANGED = "fui_size_changed", 
    g.SIZE_DELAY_CHANGE = "fui_size_delay_change", g.CLICK_ITEM = "fui_click_item", 
    g.SCROLL = "fui_scroll", g.SCROLL_END = "fui_scroll_end", g.DROP = "fui_drop", g.DRAG_START = "fui_drag_start", 
    g.DRAG_MOVE = "fui_drag_move", g.DRAG_END = "fui_drag_end", g.PULL_DOWN_RELEASE = "fui_pull_down_release", 
    g.PULL_UP_RELEASE = "fui_pull_up_release", g.GEAR_STOP = "fui_gear_stop", g.$event = new Laya.Event(), 
    t.Events = g, function(t) {
        t[t.Common = 0] = "Common", t[t.Check = 1] = "Check", t[t.Radio = 2] = "Radio";
    }(t.ButtonMode || (t.ButtonMode = {})), function(t) {
        t[t.None = 0] = "None", t[t.Both = 1] = "Both", t[t.Height = 2] = "Height";
    }(t.AutoSizeType || (t.AutoSizeType = {})), function(t) {
        t[t.Left = 0] = "Left", t[t.Center = 1] = "Center", t[t.Right = 2] = "Right";
    }(t.AlignType || (t.AlignType = {})), function(t) {
        t[t.Top = 0] = "Top", t[t.Middle = 1] = "Middle", t[t.Bottom = 2] = "Bottom";
    }(t.VertAlignType || (t.VertAlignType = {})), function(t) {
        t[t.None = 0] = "None", t[t.Scale = 1] = "Scale", t[t.ScaleMatchHeight = 2] = "ScaleMatchHeight", 
        t[t.ScaleMatchWidth = 3] = "ScaleMatchWidth", t[t.ScaleFree = 4] = "ScaleFree", 
        t[t.ScaleNoBorder = 5] = "ScaleNoBorder";
    }(t.LoaderFillType || (t.LoaderFillType = {})), function(t) {
        t[t.SingleColumn = 0] = "SingleColumn", t[t.SingleRow = 1] = "SingleRow", t[t.FlowHorizontal = 2] = "FlowHorizontal", 
        t[t.FlowVertical = 3] = "FlowVertical", t[t.Pagination = 4] = "Pagination";
    }(t.ListLayoutType || (t.ListLayoutType = {})), function(t) {
        t[t.Single = 0] = "Single", t[t.Multiple = 1] = "Multiple", t[t.Multiple_SingleClick = 2] = "Multiple_SingleClick", 
        t[t.None = 3] = "None";
    }(t.ListSelectionMode || (t.ListSelectionMode = {})), function(t) {
        t[t.Visible = 0] = "Visible", t[t.Hidden = 1] = "Hidden", t[t.Scroll = 2] = "Scroll";
    }(t.OverflowType || (t.OverflowType = {})), function(t) {
        t[t.Image = 0] = "Image", t[t.MovieClip = 1] = "MovieClip", t[t.Sound = 2] = "Sound", 
        t[t.Component = 3] = "Component", t[t.Atlas = 4] = "Atlas", t[t.Font = 5] = "Font", 
        t[t.Swf = 6] = "Swf", t[t.Misc = 7] = "Misc", t[t.Unknown = 8] = "Unknown", t[t.Spine = 9] = "Spine", 
        t[t.DragonBones = 10] = "DragonBones";
    }(t.PackageItemType || (t.PackageItemType = {})), function(t) {
        t[t.Image = 0] = "Image", t[t.MovieClip = 1] = "MovieClip", t[t.Swf = 2] = "Swf", 
        t[t.Graph = 3] = "Graph", t[t.Loader = 4] = "Loader", t[t.Group = 5] = "Group", 
        t[t.Text = 6] = "Text", t[t.RichText = 7] = "RichText", t[t.InputText = 8] = "InputText", 
        t[t.Component = 9] = "Component", t[t.List = 10] = "List", t[t.Label = 11] = "Label", 
        t[t.Button = 12] = "Button", t[t.ComboBox = 13] = "ComboBox", t[t.ProgressBar = 14] = "ProgressBar", 
        t[t.Slider = 15] = "Slider", t[t.ScrollBar = 16] = "ScrollBar", t[t.Tree = 17] = "Tree", 
        t[t.Loader3D = 18] = "Loader3D";
    }(t.ObjectType || (t.ObjectType = {})), function(t) {
        t[t.Percent = 0] = "Percent", t[t.ValueAndMax = 1] = "ValueAndMax", t[t.Value = 2] = "Value", 
        t[t.Max = 3] = "Max";
    }(t.ProgressTitleType || (t.ProgressTitleType = {})), function(t) {
        t[t.Default = 0] = "Default", t[t.Visible = 1] = "Visible", t[t.Auto = 2] = "Auto", 
        t[t.Hidden = 3] = "Hidden";
    }(t.ScrollBarDisplayType || (t.ScrollBarDisplayType = {})), function(t) {
        t[t.Horizontal = 0] = "Horizontal", t[t.Vertical = 1] = "Vertical", t[t.Both = 2] = "Both";
    }(t.ScrollType || (t.ScrollType = {})), function(t) {
        t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical", 
        t[t.Both = 3] = "Both";
    }(t.FlipType || (t.FlipType = {})), function(t) {
        t[t.Ascent = 0] = "Ascent", t[t.Descent = 1] = "Descent", t[t.Arch = 2] = "Arch";
    }(t.ChildrenRenderOrder || (t.ChildrenRenderOrder = {})), function(t) {
        t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical";
    }(t.GroupLayoutType || (t.GroupLayoutType = {})), function(t) {
        t[t.Auto = 0] = "Auto", t[t.Up = 1] = "Up", t[t.Down = 2] = "Down";
    }(t.PopupDirection || (t.PopupDirection = {})), function(t) {
        t[t.Left_Left = 0] = "Left_Left", t[t.Left_Center = 1] = "Left_Center", t[t.Left_Right = 2] = "Left_Right", 
        t[t.Center_Center = 3] = "Center_Center", t[t.Right_Left = 4] = "Right_Left", t[t.Right_Center = 5] = "Right_Center", 
        t[t.Right_Right = 6] = "Right_Right", t[t.Top_Top = 7] = "Top_Top", t[t.Top_Middle = 8] = "Top_Middle", 
        t[t.Top_Bottom = 9] = "Top_Bottom", t[t.Middle_Middle = 10] = "Middle_Middle", t[t.Bottom_Top = 11] = "Bottom_Top", 
        t[t.Bottom_Middle = 12] = "Bottom_Middle", t[t.Bottom_Bottom = 13] = "Bottom_Bottom", 
        t[t.Width = 14] = "Width", t[t.Height = 15] = "Height", t[t.LeftExt_Left = 16] = "LeftExt_Left", 
        t[t.LeftExt_Right = 17] = "LeftExt_Right", t[t.RightExt_Left = 18] = "RightExt_Left", 
        t[t.RightExt_Right = 19] = "RightExt_Right", t[t.TopExt_Top = 20] = "TopExt_Top", 
        t[t.TopExt_Bottom = 21] = "TopExt_Bottom", t[t.BottomExt_Top = 22] = "BottomExt_Top", 
        t[t.BottomExt_Bottom = 23] = "BottomExt_Bottom", t[t.Size = 24] = "Size";
    }(t.RelationType || (t.RelationType = {})), function(t) {
        t[t.None = 0] = "None", t[t.Horizontal = 1] = "Horizontal", t[t.Vertical = 2] = "Vertical", 
        t[t.Radial90 = 3] = "Radial90", t[t.Radial180 = 4] = "Radial180", t[t.Radial360 = 5] = "Radial360";
    }(t.FillMethod || (t.FillMethod = {})), function(t) {
        t[t.Top = 0] = "Top", t[t.Bottom = 1] = "Bottom", t[t.Left = 2] = "Left", t[t.Right = 3] = "Right", 
        t[t.TopLeft = 0] = "TopLeft", t[t.TopRight = 1] = "TopRight", t[t.BottomLeft = 2] = "BottomLeft", 
        t[t.BottomRight = 3] = "BottomRight";
    }(t.FillOrigin || (t.FillOrigin = {})), function(t) {
        t[t.TopLeft = 0] = "TopLeft", t[t.TopRight = 1] = "TopRight", t[t.BottomLeft = 2] = "BottomLeft", 
        t[t.BottomRight = 3] = "BottomRight";
    }(t.FillOrigin90 || (t.FillOrigin90 = {})), function(t) {
        t[t.Text = 0] = "Text", t[t.Icon = 1] = "Icon", t[t.Color = 2] = "Color", t[t.OutlineColor = 3] = "OutlineColor", 
        t[t.Playing = 4] = "Playing", t[t.Frame = 5] = "Frame", t[t.DeltaTime = 6] = "DeltaTime", 
        t[t.TimeScale = 7] = "TimeScale", t[t.FontSize = 8] = "FontSize", t[t.Selected = 9] = "Selected";
    }(t.ObjectPropID || (t.ObjectPropID = {}));
    var f = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._x = 0, this._y = 0, this._alpha = 1, this._rotation = 0, 
            this._visible = !0, this._touchable = !0, this._scaleX = 1, this._scaleY = 1, this._skewX = 0, 
            this._skewY = 0, this._pivotX = 0, this._pivotY = 0, this._pivotOffsetX = 0, this._pivotOffsetY = 0, 
            this._sortingOrder = 0, this._internalVisible = !0, this._yOffset = 0, this.minWidth = 0, 
            this.minHeight = 0, this.maxWidth = 0, this.maxHeight = 0, this.sourceWidth = 0, 
            this.sourceHeight = 0, this.initWidth = 0, this.initHeight = 0, this._width = 0, 
            this._height = 0, this._rawWidth = 0, this._rawHeight = 0, this._sizePercentInGroup = 0, 
            this._id = "" + v++, this._name = "", this.createDisplayObject(), this._relations = new t.Relations(this), 
            this._gears = new Array(10);
        }
        return (0, l.default)(e, [ {
            key: "setXY",
            value: function(i, s) {
                if (this._x != i || this._y != s) {
                    var n = i - this._x, a = s - this._y;
                    this._x = i, this._y = s, this.handleXYChanged(), this instanceof t.GGroup && this.moveChildren(n, a), 
                    this.updateGear(1), !this._parent || this._parent instanceof t.GList || (this._parent.setBoundsChangedFlag(), 
                    this._group && this._group.setBoundsChangedFlag(!0), this.displayObject.event(t.Events.XY_CHANGED)), 
                    e.draggingObject != this || p || this.localToGlobalRect(0, 0, this.width, this.height, k);
                }
            }
        }, {
            key: "center",
            value: function(e) {
                var i;
                i = this._parent ? this.parent : this.root, this.setXY((i.width - this.width) / 2, (i.height - this.height) / 2), 
                e && (this.addRelation(i, t.RelationType.Center_Center), this.addRelation(i, t.RelationType.Middle_Middle));
            }
        }, {
            key: "setSize",
            value: function(e, i, s) {
                if (this._rawWidth != e || this._rawHeight != i) {
                    this._rawWidth = e, this._rawHeight = i, e < this.minWidth && (e = this.minWidth), 
                    i < this.minHeight && (i = this.minHeight), this.maxWidth > 0 && e > this.maxWidth && (e = this.maxWidth), 
                    this.maxHeight > 0 && i > this.maxHeight && (i = this.maxHeight);
                    var n = e - this._width, a = i - this._height;
                    this._width = e, this._height = i, this.handleSizeChanged(), 0 == this._pivotX && 0 == this._pivotY || (this._pivotAsAnchor ? this.applyPivot() : (s || this.setXY(this.x - this._pivotX * n, this.y - this._pivotY * a), 
                    this.updatePivotOffset())), this instanceof t.GGroup && this.resizeChildren(n, a), 
                    this.updateGear(2), this._parent && (this._relations.onOwnerSizeChanged(n, a, this._pivotAsAnchor || !s), 
                    this._parent.setBoundsChangedFlag(), this._group && this._group.setBoundsChangedFlag()), 
                    this.displayObject.event(t.Events.SIZE_CHANGED);
                }
            }
        }, {
            key: "ensureSizeCorrect",
            value: function() {}
        }, {
            key: "makeFullScreen",
            value: function() {
                this.setSize(t.GRoot.inst.width, t.GRoot.inst.height);
            }
        }, {
            key: "setScale",
            value: function(t, e) {
                this._scaleX == t && this._scaleY == e || (this._scaleX = t, this._scaleY = e, this.handleScaleChanged(), 
                this.applyPivot(), this.updateGear(2));
            }
        }, {
            key: "setSkew",
            value: function(t, e) {
                this._skewX == t && this._skewY == e || (this._skewX = t, this._skewY = e, this._displayObject && (this._displayObject.skew(-t, e), 
                this.applyPivot()));
            }
        }, {
            key: "setPivot",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = arguments.length > 2 ? arguments[2] : void 0;
                this._pivotX == t && this._pivotY == e && this._pivotAsAnchor == i || (this._pivotX = t, 
                this._pivotY = e, this._pivotAsAnchor = i, this.updatePivotOffset(), this.handleXYChanged());
            }
        }, {
            key: "internalSetPivot",
            value: function(t, e, i) {
                this._pivotX = t, this._pivotY = e, this._pivotAsAnchor = i, this._pivotAsAnchor && this.handleXYChanged();
            }
        }, {
            key: "updatePivotOffset",
            value: function() {
                if (this._displayObject) if (!this._displayObject.transform || 0 == this._pivotX && 0 == this._pivotY) this._pivotOffsetX = 0, 
                this._pivotOffsetY = 0; else {
                    w.x = this._pivotX * this._width, w.y = this._pivotY * this._height;
                    var t = this._displayObject.transform.transformPoint(w);
                    this._pivotOffsetX = this._pivotX * this._width - t.x, this._pivotOffsetY = this._pivotY * this._height - t.y;
                }
            }
        }, {
            key: "applyPivot",
            value: function() {
                0 == this._pivotX && 0 == this._pivotY || (this.updatePivotOffset(), this.handleXYChanged());
            }
        }, {
            key: "requestFocus",
            value: function() {
                this.root.focus = this;
            }
        }, {
            key: "__rollOver",
            value: function(t) {
                Laya.timer.once(100, this, this.__doShowTooltips);
            }
        }, {
            key: "__doShowTooltips",
            value: function() {
                this.root && this.root.showTooltips(this._tooltips);
            }
        }, {
            key: "__rollOut",
            value: function(t) {
                Laya.timer.clear(this, this.__doShowTooltips), this.root.hideTooltips();
            }
        }, {
            key: "getGear",
            value: function(e) {
                var i = this._gears[e];
                return i || (this._gears[e] = i = t.GearBase.create(this, e)), i;
            }
        }, {
            key: "updateGear",
            value: function(t) {
                if (!this._underConstruct && !this._gearLocked) {
                    var e = this._gears[t];
                    e && e.controller && e.updateState();
                }
            }
        }, {
            key: "checkGearController",
            value: function(t, e) {
                return this._gears[t] && this._gears[t].controller == e;
            }
        }, {
            key: "updateGearFromRelations",
            value: function(t, e, i) {
                this._gears[t] && this._gears[t].updateFromRelations(e, i);
            }
        }, {
            key: "addDisplayLock",
            value: function() {
                var t = this._gears[0];
                if (t && t.controller) {
                    var e = t.addLock();
                    return this.checkGearDisplay(), e;
                }
                return 0;
            }
        }, {
            key: "releaseDisplayLock",
            value: function(t) {
                var e = this._gears[0];
                e && e.controller && (e.releaseLock(t), this.checkGearDisplay());
            }
        }, {
            key: "checkGearDisplay",
            value: function() {
                if (!this._handlingController) {
                    var t = !this._gears[0] || this._gears[0].connected;
                    this._gears[8] && (t = this._gears[8].evaluate(t)), t != this._internalVisible && (this._internalVisible = t, 
                    this._parent && (this._parent.childStateChanged(this), this._group && this._group.excludeInvisibles && this._group.setBoundsChangedFlag()));
                }
            }
        }, {
            key: "addRelation",
            value: function(t, e, i) {
                this._relations.add(t, e, i);
            }
        }, {
            key: "removeRelation",
            value: function(t, e) {
                this._relations.remove(t, e);
            }
        }, {
            key: "removeFromParent",
            value: function() {
                this._parent && this._parent.removeChild(this);
            }
        }, {
            key: "dispose",
            value: function() {
                this.removeFromParent(), this._relations.dispose(), this._displayObject.destroy(), 
                this._displayObject = null;
                for (var t = 0; t < 10; t++) {
                    var e = this._gears[t];
                    e && e.dispose();
                }
            }
        }, {
            key: "onClick",
            value: function(t, e, i) {
                this.on(Laya.Event.CLICK, t, e, i);
            }
        }, {
            key: "offClick",
            value: function(t, e) {
                this.off(Laya.Event.CLICK, t, e);
            }
        }, {
            key: "hasClickListener",
            value: function() {
                return this._displayObject.hasListener(Laya.Event.CLICK);
            }
        }, {
            key: "on",
            value: function(t, e, i, s) {
                this._displayObject.on(t, e, i, s);
            }
        }, {
            key: "off",
            value: function(t, e, i) {
                this._displayObject.off(t, e, i);
            }
        }, {
            key: "startDrag",
            value: function(t) {
                null != this._displayObject.stage && this.dragBegin(t);
            }
        }, {
            key: "stopDrag",
            value: function() {
                this.dragEnd();
            }
        }, {
            key: "localToGlobal",
            value: function(t, e, i) {
                return t = t || 0, e = e || 0, this._pivotAsAnchor && (t += this._pivotX * this._width, 
                e += this._pivotY * this._height), (i = i || new Laya.Point()).x = t, i.y = e, this._displayObject.localToGlobal(i, !1);
            }
        }, {
            key: "globalToLocal",
            value: function(t, e, i) {
                return t = t || 0, e = e || 0, (i = i || new Laya.Point()).x = t, i.y = e, i = this._displayObject.globalToLocal(i, !1), 
                this._pivotAsAnchor && (i.x -= this._pivotX * this._width, i.y -= this._pivotY * this._height), 
                i;
            }
        }, {
            key: "localToGlobalRect",
            value: function(t, e, i, s, n) {
                t = t || 0, e = e || 0, i = i || 0, s = s || 0, n = n || new Laya.Rectangle();
                var a = this.localToGlobal(t, e);
                return n.x = a.x, n.y = a.y, a = this.localToGlobal(t + i, e + s), n.width = a.x - n.x, 
                n.height = a.y - n.y, n;
            }
        }, {
            key: "globalToLocalRect",
            value: function(t, e, i, s, n) {
                t = t || 0, e = e || 0, i = i || 0, s = s || 0, n = n || new Laya.Rectangle();
                var a = this.globalToLocal(t, e);
                return n.x = a.x, n.y = a.y, a = this.globalToLocal(t + i, e + s), n.width = a.x - n.x, 
                n.height = a.y - n.y, n;
            }
        }, {
            key: "handleControllerChanged",
            value: function(t) {
                this._handlingController = !0;
                for (var e = 0; e < 10; e++) {
                    var i = this._gears[e];
                    i && i.controller == t && i.apply();
                }
                this._handlingController = !1, this.checkGearDisplay();
            }
        }, {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = new Laya.Sprite(), this._displayObject.$owner = this;
            }
        }, {
            key: "handleXYChanged",
            value: function() {
                var t = this._x, e = this._y + this._yOffset;
                this._pivotAsAnchor && (t -= this._pivotX * this._width, e -= this._pivotY * this._height), 
                this._pixelSnapping && (t = Math.round(t), e = Math.round(e)), this._displayObject.pos(t + this._pivotOffsetX, e + this._pivotOffsetY);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                this._displayObject.size(this._width, this._height);
            }
        }, {
            key: "handleScaleChanged",
            value: function() {
                this._displayObject.scale(this._scaleX, this._scaleY, !0);
            }
        }, {
            key: "handleGrayedChanged",
            value: function() {
                t.ToolSet.setColorFilter(this._displayObject, this._grayed);
            }
        }, {
            key: "handleAlphaChanged",
            value: function() {
                this._displayObject.alpha = this._alpha;
            }
        }, {
            key: "handleVisibleChanged",
            value: function() {
                this._displayObject.visible = this.internalVisible2;
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Text:
                    return this.text;

                  case t.ObjectPropID.Icon:
                    return this.icon;

                  case t.ObjectPropID.Color:
                  case t.ObjectPropID.OutlineColor:
                    return null;

                  case t.ObjectPropID.Playing:
                    return !1;

                  case t.ObjectPropID.Frame:
                  case t.ObjectPropID.DeltaTime:
                    return 0;

                  case t.ObjectPropID.TimeScale:
                    return 1;

                  case t.ObjectPropID.FontSize:
                    return 0;

                  case t.ObjectPropID.Selected:
                    return !1;

                  default:
                    return;
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Text:
                    this.text = i;
                    break;

                  case t.ObjectPropID.Icon:
                    this.icon = i;
                }
            }
        }, {
            key: "constructFromResource",
            value: function() {}
        }, {
            key: "setup_beforeAdd",
            value: function(e, i) {
                var s, n;
                e.seek(i, 0), e.skip(5), this._id = e.readS(), this._name = e.readS(), s = e.getInt32(), 
                n = e.getInt32(), this.setXY(s, n), e.readBool() && (this.initWidth = e.getInt32(), 
                this.initHeight = e.getInt32(), this.setSize(this.initWidth, this.initHeight, !0)), 
                e.readBool() && (this.minWidth = e.getInt32(), this.maxWidth = e.getInt32(), this.minHeight = e.getInt32(), 
                this.maxHeight = e.getInt32()), e.readBool() && (s = e.getFloat32(), n = e.getFloat32(), 
                this.setScale(s, n)), e.readBool() && (s = e.getFloat32(), n = e.getFloat32(), this.setSkew(s, n)), 
                e.readBool() && (s = e.getFloat32(), n = e.getFloat32(), this.setPivot(s, n, e.readBool())), 
                1 != (s = e.getFloat32()) && (this.alpha = s), 0 != (s = e.getFloat32()) && (this.rotation = s), 
                e.readBool() || (this.visible = !1), e.readBool() || (this.touchable = !1), e.readBool() && (this.grayed = !0);
                var a = e.readByte();
                t.BlendMode[a] && (this.blendMode = t.BlendMode[a]), 1 == e.readByte() && t.ToolSet.setColorFilter(this._displayObject, [ e.getFloat32(), e.getFloat32(), e.getFloat32(), e.getFloat32() ]);
                var o = e.readS();
                null != o && (this.data = o);
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                t.seek(e, 1);
                var i = t.readS();
                null != i && (this.tooltips = i);
                var s = t.getInt16();
                s >= 0 && (this.group = this.parent.getChildAt(s)), t.seek(e, 2);
                for (var n = t.getInt16(), a = 0; a < n; a++) {
                    var o = t.getInt16();
                    o += t.pos, this.getGear(t.readByte()).setup(t), t.pos = o;
                }
            }
        }, {
            key: "initDrag",
            value: function() {
                this._draggable ? this.on(Laya.Event.MOUSE_DOWN, this, this.__begin) : this.off(Laya.Event.MOUSE_DOWN, this, this.__begin);
            }
        }, {
            key: "dragBegin",
            value: function(i) {
                if (e.draggingObject) {
                    var s = e.draggingObject;
                    s.stopDrag(), e.draggingObject = null, t.Events.dispatch(t.Events.DRAG_END, s._displayObject, {
                        touchId: i
                    });
                }
                m.x = Laya.stage.mouseX, m.y = Laya.stage.mouseY, this.localToGlobalRect(0, 0, this.width, this.height, k), 
                this._dragTesting = !0, e.draggingObject = this, Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.__moving), 
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__end);
            }
        }, {
            key: "dragEnd",
            value: function() {
                e.draggingObject == this && (this.reset(), this._dragTesting = !1, e.draggingObject = null), 
                y = !1;
            }
        }, {
            key: "reset",
            value: function() {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.__moving), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.__end);
            }
        }, {
            key: "__begin",
            value: function() {
                this._dragStartPos || (this._dragStartPos = new Laya.Point()), this._dragStartPos.x = Laya.stage.mouseX, 
                this._dragStartPos.y = Laya.stage.mouseY, this._dragTesting = !0, Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.__moving), 
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__end);
            }
        }, {
            key: "__moving",
            value: function(i) {
                if (e.draggingObject != this && this._draggable && this._dragTesting) {
                    var s = t.UIConfig.touchDragSensitivity;
                    if (this._dragStartPos && Math.abs(this._dragStartPos.x - Laya.stage.mouseX) < s && Math.abs(this._dragStartPos.y - Laya.stage.mouseY) < s) return;
                    this._dragTesting = !1, y = !0, t.Events.dispatch(t.Events.DRAG_START, this._displayObject, i), 
                    y && this.dragBegin();
                }
                if (e.draggingObject == this) {
                    var n = Laya.stage.mouseX - m.x + k.x, a = Laya.stage.mouseY - m.y + k.y;
                    if (this._dragBounds) {
                        var o = t.GRoot.inst.localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, C);
                        (n < o.x || n + k.width > o.right && (n = o.right - k.width) < o.x) && (n = o.x), 
                        (a < o.y || a + k.height > o.bottom && (a = o.bottom - k.height) < o.y) && (a = o.y);
                    }
                    p = !0;
                    var h = this.parent.globalToLocal(n, a, w);
                    this.setXY(Math.round(h.x), Math.round(h.y)), p = !1, t.Events.dispatch(t.Events.DRAG_MOVE, this._displayObject, i);
                }
            }
        }, {
            key: "__end",
            value: function(i) {
                e.draggingObject == this ? (e.draggingObject = null, this.reset(), t.Events.dispatch(t.Events.DRAG_END, this._displayObject, i)) : this._dragTesting && (this._dragTesting = !1, 
                this.reset());
            }
        }, {
            key: "id",
            get: function() {
                return this._id;
            }
        }, {
            key: "name",
            get: function() {
                return this._name;
            },
            set: function(t) {
                this._name = t;
            }
        }, {
            key: "x",
            get: function() {
                return this._x;
            },
            set: function(t) {
                this.setXY(t, this._y);
            }
        }, {
            key: "y",
            get: function() {
                return this._y;
            },
            set: function(t) {
                this.setXY(this._x, t);
            }
        }, {
            key: "xMin",
            get: function() {
                return this._pivotAsAnchor ? this._x - this._width * this._pivotX : this._x;
            },
            set: function(t) {
                this._pivotAsAnchor ? this.setXY(t + this._width * this._pivotX, this._y) : this.setXY(t, this._y);
            }
        }, {
            key: "yMin",
            get: function() {
                return this._pivotAsAnchor ? this._y - this._height * this._pivotY : this._y;
            },
            set: function(t) {
                this._pivotAsAnchor ? this.setXY(this._x, t + this._height * this._pivotY) : this.setXY(this._x, t);
            }
        }, {
            key: "pixelSnapping",
            get: function() {
                return this._pixelSnapping;
            },
            set: function(t) {
                this._pixelSnapping != t && (this._pixelSnapping = t, this.handleXYChanged());
            }
        }, {
            key: "width",
            get: function() {
                return this.ensureSizeCorrect(), this._relations.sizeDirty && this._relations.ensureRelationsSizeCorrect(), 
                this._width;
            },
            set: function(t) {
                this.setSize(t, this._rawHeight);
            }
        }, {
            key: "height",
            get: function() {
                return this.ensureSizeCorrect(), this._relations.sizeDirty && this._relations.ensureRelationsSizeCorrect(), 
                this._height;
            },
            set: function(t) {
                this.setSize(this._rawWidth, t);
            }
        }, {
            key: "actualWidth",
            get: function() {
                return this.width * Math.abs(this._scaleX);
            }
        }, {
            key: "actualHeight",
            get: function() {
                return this.height * Math.abs(this._scaleY);
            }
        }, {
            key: "scaleX",
            get: function() {
                return this._scaleX;
            },
            set: function(t) {
                this.setScale(t, this._scaleY);
            }
        }, {
            key: "scaleY",
            get: function() {
                return this._scaleY;
            },
            set: function(t) {
                this.setScale(this._scaleX, t);
            }
        }, {
            key: "skewX",
            get: function() {
                return this._skewX;
            },
            set: function(t) {
                this.setSkew(t, this._skewY);
            }
        }, {
            key: "skewY",
            get: function() {
                return this._skewY;
            },
            set: function(t) {
                this.setSkew(this._skewX, t);
            }
        }, {
            key: "pivotX",
            get: function() {
                return this._pivotX;
            },
            set: function(t) {
                this.setPivot(t, this._pivotY);
            }
        }, {
            key: "pivotY",
            get: function() {
                return this._pivotY;
            },
            set: function(t) {
                this.setPivot(this._pivotX, t);
            }
        }, {
            key: "pivotAsAnchor",
            get: function() {
                return this._pivotAsAnchor;
            }
        }, {
            key: "touchable",
            get: function() {
                return this._touchable;
            },
            set: function(e) {
                if (this._touchable != e) {
                    if (this._touchable = e, this.updateGear(3), this instanceof t.GImage || this instanceof t.GMovieClip || this instanceof t.GTextField && !(this instanceof t.GTextInput) && !(this instanceof t.GRichTextField)) return;
                    this._displayObject && (this._displayObject.mouseEnabled = this._touchable);
                }
            }
        }, {
            key: "grayed",
            get: function() {
                return this._grayed;
            },
            set: function(t) {
                this._grayed != t && (this._grayed = t, this.handleGrayedChanged(), this.updateGear(3));
            }
        }, {
            key: "enabled",
            get: function() {
                return !this._grayed && this._touchable;
            },
            set: function(t) {
                this.grayed = !t, this.touchable = t;
            }
        }, {
            key: "rotation",
            get: function() {
                return this._rotation;
            },
            set: function(t) {
                this._rotation != t && (this._rotation = t, this._displayObject && (this._displayObject.rotation = this.normalizeRotation, 
                this.applyPivot()), this.updateGear(3));
            }
        }, {
            key: "normalizeRotation",
            get: function() {
                var t = this._rotation % 360;
                return t > 180 ? t -= 360 : t < -180 && (t = 360 + t), t;
            }
        }, {
            key: "alpha",
            get: function() {
                return this._alpha;
            },
            set: function(t) {
                this._alpha != t && (this._alpha = t, this.handleAlphaChanged(), this.updateGear(3));
            }
        }, {
            key: "visible",
            get: function() {
                return this._visible;
            },
            set: function(t) {
                this._visible != t && (this._visible = t, this.handleVisibleChanged(), this._parent && this._parent.setBoundsChangedFlag(), 
                this._group && this._group.excludeInvisibles && this._group.setBoundsChangedFlag());
            }
        }, {
            key: "internalVisible",
            get: function() {
                return this._internalVisible && (!this._group || this._group.internalVisible) && !this._displayObject._cacheStyle.maskParent;
            }
        }, {
            key: "internalVisible2",
            get: function() {
                return this._visible && (!this._group || this._group.internalVisible2);
            }
        }, {
            key: "internalVisible3",
            get: function() {
                return this._internalVisible && this._visible;
            }
        }, {
            key: "sortingOrder",
            get: function() {
                return this._sortingOrder;
            },
            set: function(t) {
                if (t < 0 && (t = 0), this._sortingOrder != t) {
                    var e = this._sortingOrder;
                    this._sortingOrder = t, this._parent && this._parent.childSortingOrderChanged(this, e, this._sortingOrder);
                }
            }
        }, {
            key: "focused",
            get: function() {
                return this.root.focus == this;
            }
        }, {
            key: "tooltips",
            get: function() {
                return this._tooltips;
            },
            set: function(t) {
                this._tooltips && (this.off(Laya.Event.ROLL_OVER, this, this.__rollOver), this.off(Laya.Event.ROLL_OUT, this, this.__rollOut)), 
                this._tooltips = t, this._tooltips && (this.on(Laya.Event.ROLL_OVER, this, this.__rollOver), 
                this.on(Laya.Event.ROLL_OUT, this, this.__rollOut));
            }
        }, {
            key: "blendMode",
            get: function() {
                return this._displayObject.blendMode;
            },
            set: function(t) {
                this._displayObject.blendMode = t;
            }
        }, {
            key: "filters",
            get: function() {
                return this._displayObject.filters;
            },
            set: function(t) {
                this._displayObject.filters = t;
            }
        }, {
            key: "inContainer",
            get: function() {
                return null != this._displayObject && null != this._displayObject.parent;
            }
        }, {
            key: "onStage",
            get: function() {
                return null != this._displayObject && null != this._displayObject.stage;
            }
        }, {
            key: "resourceURL",
            get: function() {
                return this.packageItem ? "ui://" + this.packageItem.owner.id + this.packageItem.id : null;
            }
        }, {
            key: "group",
            set: function(t) {
                this._group != t && (this._group && this._group.setBoundsChangedFlag(), this._group = t, 
                this._group && this._group.setBoundsChangedFlag());
            },
            get: function() {
                return this._group;
            }
        }, {
            key: "relations",
            get: function() {
                return this._relations;
            }
        }, {
            key: "displayObject",
            get: function() {
                return this._displayObject;
            }
        }, {
            key: "parent",
            get: function() {
                return this._parent;
            },
            set: function(t) {
                this._parent = t;
            }
        }, {
            key: "root",
            get: function() {
                if (this instanceof t.GRoot) return this;
                for (var e = this._parent; e; ) {
                    if (e instanceof t.GRoot) return e;
                    e = e.parent;
                }
                return t.GRoot.inst;
            }
        }, {
            key: "asCom",
            get: function() {
                return this;
            }
        }, {
            key: "asButton",
            get: function() {
                return this;
            }
        }, {
            key: "asLabel",
            get: function() {
                return this;
            }
        }, {
            key: "asProgress",
            get: function() {
                return this;
            }
        }, {
            key: "asTextField",
            get: function() {
                return this;
            }
        }, {
            key: "asRichTextField",
            get: function() {
                return this;
            }
        }, {
            key: "asTextInput",
            get: function() {
                return this;
            }
        }, {
            key: "asLoader",
            get: function() {
                return this;
            }
        }, {
            key: "asList",
            get: function() {
                return this;
            }
        }, {
            key: "asTree",
            get: function() {
                return this;
            }
        }, {
            key: "asGraph",
            get: function() {
                return this;
            }
        }, {
            key: "asGroup",
            get: function() {
                return this;
            }
        }, {
            key: "asSlider",
            get: function() {
                return this;
            }
        }, {
            key: "asComboBox",
            get: function() {
                return this;
            }
        }, {
            key: "asImage",
            get: function() {
                return this;
            }
        }, {
            key: "asMovieClip",
            get: function() {
                return this;
            }
        }, {
            key: "text",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "icon",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "treeNode",
            get: function() {
                return this._treeNode;
            }
        }, {
            key: "isDisposed",
            get: function() {
                return null == this._displayObject;
            }
        }, {
            key: "draggable",
            get: function() {
                return this._draggable;
            },
            set: function(t) {
                this._draggable != t && (this._draggable = t, this.initDrag());
            }
        }, {
            key: "dragBounds",
            get: function() {
                return this._dragBounds;
            },
            set: function(t) {
                this._dragBounds = t;
            }
        }, {
            key: "dragging",
            get: function() {
                return e.draggingObject == this;
            }
        } ], [ {
            key: "cast",
            value: function(t) {
                return t.$owner;
            }
        } ]), e;
    }();
    t.GObject = f, t.BlendMode = {
        2: Laya.BlendMode.LIGHTER,
        3: Laya.BlendMode.MULTIPLY,
        4: Laya.BlendMode.SCREEN
    };
    var p, y, v = 0, m = new Laya.Point(), k = new Laya.Rectangle(), w = new Laya.Point(), C = new Laya.Rectangle();
    t.GTextField = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            return (0, classCallCheck.default)(this, s), i.call(this);
        }
        return (0, l.default)(s, [ {
            key: "updateAutoSize",
            value: function() {}
        }, {
            key: "parseTemplate",
            value: function(t) {
                for (var e, i, s, n, a = 0, o = ""; -1 != (e = t.indexOf("{", a)); ) if (e > 0 && 92 == t.charCodeAt(e - 1)) o += t.substring(a, e - 1), 
                o += "{", a = e + 1; else {
                    if (o += t.substring(a, e), a = e, -1 == (e = t.indexOf("}", a))) break;
                    e != a + 1 ? (-1 != (i = (s = t.substring(a + 1, e)).indexOf("=")) ? o += null == (n = this._templateVars[s.substring(0, i)]) ? s.substring(i + 1) : n : null != (n = this._templateVars[s]) && (o += n), 
                    a = e + 1) : (o += t.substr(a, 2), a = e + 1);
                }
                return a < t.length && (o += t.substr(a)), o;
            }
        }, {
            key: "setVar",
            value: function(t, e) {
                return this._templateVars || (this._templateVars = {}), this._templateVars[t] = e, 
                this;
            }
        }, {
            key: "flushVars",
            value: function() {
                this.text = this._text;
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.color;

                  case t.ObjectPropID.OutlineColor:
                    return this.strokeColor;

                  case t.ObjectPropID.FontSize:
                    return this.fontSize;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.color = i;
                    break;

                  case t.ObjectPropID.OutlineColor:
                    this.strokeColor = i;
                    break;

                  case t.ObjectPropID.FontSize:
                    this.fontSize = i;
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                var i;
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), this.font = t.readS(), this.fontSize = t.getInt16(), this.color = t.readColorS(), 
                i = t.readByte(), this.align = 0 == i ? "left" : 1 == i ? "center" : "right", i = t.readByte(), 
                this.valign = 0 == i ? "top" : 1 == i ? "middle" : "bottom", this.leading = t.getInt16(), 
                this.letterSpacing = t.getInt16(), this.ubbEnabled = t.readBool(), this.autoSize = t.readByte(), 
                this.underline = t.readBool(), this.italic = t.readBool(), this.bold = t.readBool(), 
                this.singleLine = t.readBool(), t.readBool() && (this.strokeColor = t.readColorS(), 
                this.stroke = t.getFloat32() + 1), t.readBool() && t.skip(12), t.readBool() && (this._templateVars = {});
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6);
                var i = t.readS();
                null != i && (this.text = i);
            }
        }, {
            key: "font",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "fontSize",
            get: function() {
                return 0;
            },
            set: function(t) {}
        }, {
            key: "color",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "align",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "valign",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "leading",
            get: function() {
                return 0;
            },
            set: function(t) {}
        }, {
            key: "letterSpacing",
            get: function() {
                return 0;
            },
            set: function(t) {}
        }, {
            key: "bold",
            get: function() {
                return !1;
            },
            set: function(t) {}
        }, {
            key: "italic",
            get: function() {
                return !1;
            },
            set: function(t) {}
        }, {
            key: "underline",
            get: function() {
                return !1;
            },
            set: function(t) {}
        }, {
            key: "singleLine",
            get: function() {
                return !1;
            },
            set: function(t) {}
        }, {
            key: "stroke",
            get: function() {
                return 0;
            },
            set: function(t) {}
        }, {
            key: "strokeColor",
            get: function() {
                return null;
            },
            set: function(t) {}
        }, {
            key: "ubbEnabled",
            set: function(t) {
                this._ubbEnabled = t;
            },
            get: function() {
                return this._ubbEnabled;
            }
        }, {
            key: "autoSize",
            get: function() {
                return this._autoSize;
            },
            set: function(e) {
                this._autoSize != e && (this._autoSize = e, this._widthAutoSize = this._autoSize == t.AutoSizeType.Both, 
                this._heightAutoSize = this._autoSize == t.AutoSizeType.Both || this._autoSize == t.AutoSizeType.Height, 
                this.updateAutoSize());
            }
        }, {
            key: "textWidth",
            get: function() {
                return 0;
            }
        }, {
            key: "templateVars",
            get: function() {
                return this._templateVars;
            },
            set: function(t) {
                (this._templateVars || t) && (this._templateVars = t, this.flushVars());
            }
        } ]), s;
    }(t.GObject), t.GBasicTextField = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._letterSpacing = 0, e._textWidth = 0, 
            e._textHeight = 0, e._text = "", e._color = "#000000", e._textField.align = "left", 
            e._textField.font = t.UIConfig.defaultFont, e._autoSize = t.AutoSizeType.Both, e._widthAutoSize = e._heightAutoSize = !0, 
            e._textField._sizeDirty = !1, e;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = this._textField = new b(this), this._displayObject.$owner = this, 
                this._displayObject.mouseEnabled = !1;
            }
        }, {
            key: "updateAutoSize",
            value: function() {
                this._textField.wordWrap = !this._widthAutoSize && !this._singleLine, this._underConstruct || (this._heightAutoSize ? this._widthAutoSize || (this._textField.width = this.width) : this._textField.size(this.width, this.height));
            }
        }, {
            key: "ensureSizeCorrect",
            value: function() {
                !this._underConstruct && this._textField._isChanged && this._textField.typeset();
            }
        }, {
            key: "typeset",
            value: function() {
                this._bitmapFont ? this.renderWithBitmapFont() : (this._widthAutoSize || this._heightAutoSize) && this.updateSize();
            }
        }, {
            key: "updateSize",
            value: function() {
                this._textWidth = Math.ceil(this._textField.textWidth), this._textHeight = Math.ceil(this._textField.textHeight);
                var t, e = 0;
                this._widthAutoSize ? (t = this._textWidth, this._textField.width != t && (this._textField.width = t, 
                "left" != this._textField.align && this._textField.baseTypeset())) : t = this.width, 
                this._heightAutoSize ? (e = this._textHeight, this._widthAutoSize || this._textField.height != this._textHeight && (this._textField.height = this._textHeight)) : (e = this.height, 
                this._textHeight > e && (this._textHeight = e), this._textField.height != this._textHeight && (this._textField.height = this._textHeight)), 
                this._updatingSize = !0, this.setSize(t, e), this._updatingSize = !1;
            }
        }, {
            key: "renderWithBitmapFont",
            value: function() {
                var e = this._displayObject.graphics;
                e.clear(), this._lines ? function(t) {
                    for (var e = t.length, i = 0; i < e; i++) {
                        var s = t[i];
                        S.push(s);
                    }
                    t.length = 0;
                }(this._lines) : this._lines = new Array();
                var i, s = this.leading - 1, n = this.width - 2 * I, a = 0, o = 0, h = 0, r = 0, l = 0, u = 0, _ = 0, c = 0, d = 0, g = "", f = T, p = !this._widthAutoSize && !this._singleLine, y = this.fontSize, v = this._bitmapFont.resizable ? y / this._bitmapFont.size : 1;
                this._textWidth = 0, this._textHeight = 0;
                var m = this._text;
                this._templateVars && (m = this.parseTemplate(m));
                for (var k = m.length, w = 0; w < k; ++w) {
                    var C = m.charAt(w), b = C.charCodeAt(0);
                    if (10 != b) {
                        if (b >= 65 && b <= 90 || b >= 97 && b <= 122 ? (0 == u && (_ = a), u++) : (u > 0 && (c = a), 
                        u = 0), 32 == b) r = Math.ceil(y / 2), l = y; else {
                            var P = this._bitmapFont.glyphs[C];
                            P ? (r = Math.ceil(P.advance * v), l = Math.ceil(P.lineHeight * v)) : (r = 0, l = 0);
                        }
                        if (l > h && (h = l), l > o && (o = l), 0 != a && (a += this._letterSpacing), a += r, 
                        !p || a <= n) g += C; else {
                            if ((i = x()).height = o, i.textHeight = h, 0 == g.length) i.text = C; else if (u > 0 && c > 0) {
                                var L = (g += C).length - u;
                                i.text = t.ToolSet.trimRight(g.substr(0, L)), i.width = c, g = g.substr(L), a -= _;
                            } else i.text = g, i.width = a - (r + this._letterSpacing), g = C, a = r, o = l, 
                            h = l;
                            i.y = f, f += i.height + s, i.width > this._textWidth && (this._textWidth = i.width), 
                            u = 0, _ = 0, c = 0, this._lines.push(i);
                        }
                    } else g += C, (i = x()).width = a, 0 == h && (0 == d && (d = y), 0 == o && (o = d), 
                    h = o), i.height = o, d = o, i.textHeight = h, i.text = g, i.y = f, f += i.height + s, 
                    i.width > this._textWidth && (this._textWidth = i.width), this._lines.push(i), g = "", 
                    a = 0, o = 0, h = 0, u = 0, _ = 0, c = 0;
                }
                g.length > 0 && ((i = x()).width = a, 0 == o && (o = d), 0 == h && (h = o), i.height = o, 
                i.textHeight = h, i.text = g, i.y = f, i.width > this._textWidth && (this._textWidth = i.width), 
                this._lines.push(i)), this._textWidth > 0 && (this._textWidth += 2 * I), 0 == this._lines.length ? this._textHeight = 0 : (i = this._lines[this._lines.length - 1], 
                this._textHeight = i.y + i.height + T);
                var O, B;
                if (O = this._widthAutoSize ? 0 == this._textWidth ? 0 : this._textWidth : this.width, 
                B = this._heightAutoSize ? 0 == this._textHeight ? 0 : this._textHeight : this.height, 
                this._updatingSize = !0, this.setSize(O, B), this._updatingSize = !1, this.doAlign(), 
                0 != O && 0 != B) {
                    var z = I, j = 0, M = 0;
                    n = this.width - 2 * I;
                    for (var A = this._lines.length, E = this._bitmapFont.tint ? this._color : null, F = 0; F < A; F++) {
                        i = this._lines[F], z = I, j = "center" == this.align ? (n - i.width) / 2 : "right" == this.align ? n - i.width : 0, 
                        k = i.text.length;
                        for (var R = 0; R < k; R++) 10 != (b = (C = i.text.charAt(R)).charCodeAt(0)) && (32 != b ? (P = this._bitmapFont.glyphs[C]) ? (M = (i.height + i.textHeight) / 2 - Math.ceil(P.lineHeight * v), 
                        P.texture && e.drawTexture(P.texture, z + j + Math.ceil(P.x * v), i.y + M + Math.ceil(P.y * v), P.width * v, P.height * v, null, 1, E), 
                        z += this._letterSpacing + Math.ceil(P.advance * v)) : z += this._letterSpacing : z += this._letterSpacing + Math.ceil(y / 2));
                    }
                }
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                this._updatingSize || (this._underConstruct ? this._textField.size(this._width, this._height) : this._bitmapFont ? this._widthAutoSize ? this.doAlign() : this._textField.setChanged() : this._widthAutoSize || (this._heightAutoSize ? this._textField.width = this._width : this._textField.size(this._width, this._height)));
            }
        }, {
            key: "handleGrayedChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleGrayedChanged", this).call(this), 
                this.grayed ? this._textField.color = "#AAAAAA" : this._textField.color = this._color;
            }
        }, {
            key: "doAlign",
            value: function() {
                if ("top" == this.valign || 0 == this._textHeight) this._yOffset = T; else {
                    var t = this.height - this._textHeight;
                    t < 0 && (t = 0), "middle" == this.valign ? this._yOffset = Math.floor(t / 2) : this._yOffset = Math.floor(t);
                }
                this.handleXYChanged();
            }
        }, {
            key: "flushVars",
            value: function() {
                this.text = this._text;
            }
        }, {
            key: "nativeText",
            get: function() {
                return this._textField;
            }
        }, {
            key: "text",
            set: function(e) {
                if (this._text = e, null == this._text && (this._text = ""), null == this._bitmapFont) {
                    this._widthAutoSize && (this._textField.width = 1e4);
                    var i = this._text;
                    this._templateVars && (i = this.parseTemplate(i)), this._ubbEnabled ? this._textField.text = t.UBBParser.inst.parse(i, !0) : this._textField.text = i;
                } else this._textField.text = "", this._textField.setChanged();
                !this.parent || !this.parent._underConstruct || Laya.ILaya.Browser.onIOS && "qq_" == zs.platform.config.platformMark || this._textField.typeset();
            },
            get: function() {
                return this._text;
            }
        }, {
            key: "font",
            get: function() {
                return this._textField.font;
            },
            set: function(e) {
                this._font = e, t.ToolSet.startsWith(this._font, "ui://") ? this._bitmapFont = t.UIPackage.getItemAssetByURL(this._font) : delete this._bitmapFont, 
                this._bitmapFont ? this._textField.setChanged() : this._font ? this._textField.font = this._font : this._textField.font = t.UIConfig.defaultFont;
            }
        }, {
            key: "fontSize",
            get: function() {
                return this._textField.fontSize;
            },
            set: function(t) {
                this._textField.fontSize = t;
            }
        }, {
            key: "color",
            get: function() {
                return this._color;
            },
            set: function(t) {
                this._color != t && (this._color = t, this.updateGear(4), this.grayed ? this._textField.color = "#AAAAAA" : this._textField.color = this._color);
            }
        }, {
            key: "align",
            get: function() {
                return this._textField.align;
            },
            set: function(t) {
                this._textField.align = t;
            }
        }, {
            key: "valign",
            get: function() {
                return this._textField.valign;
            },
            set: function(t) {
                this._textField.valign = t;
            }
        }, {
            key: "leading",
            get: function() {
                return this._textField.leading;
            },
            set: function(t) {
                this._textField.leading = t;
            }
        }, {
            key: "letterSpacing",
            get: function() {
                return this._letterSpacing;
            },
            set: function(t) {
                this._letterSpacing = t;
            }
        }, {
            key: "bold",
            get: function() {
                return this._textField.bold;
            },
            set: function(t) {
                this._textField.bold = t;
            }
        }, {
            key: "italic",
            get: function() {
                return this._textField.italic;
            },
            set: function(t) {
                this._textField.italic = t;
            }
        }, {
            key: "underline",
            get: function() {
                return this._textField.underline;
            },
            set: function(t) {
                this._textField.underline = t;
            }
        }, {
            key: "singleLine",
            get: function() {
                return this._singleLine;
            },
            set: function(t) {
                this._singleLine = t, this._textField.wordWrap = !this._widthAutoSize && !this._singleLine;
            }
        }, {
            key: "stroke",
            get: function() {
                return this._textField.stroke;
            },
            set: function(t) {
                this._textField.stroke = t;
            }
        }, {
            key: "strokeColor",
            get: function() {
                return this._textField.strokeColor;
            },
            set: function(t) {
                this._textField.strokeColor != t && (this._textField.strokeColor = t, this.updateGear(4));
            }
        }, {
            key: "textWidth",
            get: function() {
                return this._textField._isChanged && this._textField.typeset(), this._textWidth;
            }
        } ]), s;
    }(t.GTextField);
    var b = function(e) {
        (0, h.default)(a, e);
        var i = u(a);
        function a(t) {
            var e;
            return (0, classCallCheck.default)(this, a), (e = i.call(this))._owner = t, e;
        }
        return (0, l.default)(a, [ {
            key: "baseTypeset",
            value: function() {
                this._lock = !0, this.typeset(), this._lock = !1;
            }
        }, {
            key: "typeset",
            value: function() {
                this._sizeDirty = !0, (0, agetget.default)((0, getPrototypeOf.default)(a.prototype), "typeset", this).call(this), 
                this._lock || this._owner.typeset(), this._isChanged && (Laya.timer.clear(this, this.typeset), 
                this._isChanged = !1), this._sizeDirty = !1;
            }
        }, {
            key: "setChanged",
            value: function() {
                this.isChanged = !0;
            }
        }, {
            key: "isChanged",
            set: function(e) {
                e && !this._sizeDirty && this._owner.autoSize != t.AutoSizeType.None && this._owner.parent && (this._sizeDirty = !0, 
                this.event(t.Events.SIZE_DELAY_CHANGE)), (0, ssetset.default)((0, getPrototypeOf.default)(a.prototype), "isChanged", e, this, !0);
            }
        } ]), a;
    }(Laya.Text), S = [];
    function x() {
        if (S.length) {
            var t = S.pop();
            return t.width = 0, t.height = 0, t.textHeight = 0, t.text = null, t.y = 0, t;
        }
        return {
            width: 0,
            height: 0,
            textHeight: 0,
            text: null,
            y: 0
        };
    }
    var I = 2, T = 2;
    t.Margin = function() {
        function t() {
            (0, classCallCheck.default)(this, t), this.left = 0, this.right = 0, this.top = 0, this.bottom = 0;
        }
        return (0, l.default)(t, [ {
            key: "copy",
            value: function(t) {
                this.top = t.top, this.bottom = t.bottom, this.left = t.left, this.right = t.right;
            }
        } ]), t;
    }();
    var P = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._sortingChildCount = 0, e._children = [], 
            e._controllers = [], e._transitions = [], e._margin = new t.Margin(), e._alignOffset = new Laya.Point(), 
            e._opaque = !1, e._childrenRenderOrder = 0, e._apexIndex = 0, e;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "createDisplayObject", this).call(this), 
                this._displayObject.mouseEnabled = !0, this._displayObject.mouseThrough = !0, this._container = this._displayObject;
            }
        }, {
            key: "dispose",
            value: function() {
                var t, e;
                for (e = this._transitions.length, t = 0; t < e; ++t) this._transitions[t].dispose();
                for (e = this._controllers.length, t = 0; t < e; ++t) this._controllers[t].dispose();
                for (this.scrollPane && this.scrollPane.dispose(), t = (e = this._children.length) - 1; t >= 0; --t) {
                    var i = this._children[t];
                    i.parent = null, i.dispose();
                }
                this._boundsChanged = !1, (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "addChild",
            value: function(t) {
                return this.addChildAt(t, this._children.length), t;
            }
        }, {
            key: "addChildAt",
            value: function(t, e) {
                if (!t) throw "child is null";
                if (e >= 0 && e <= this._children.length) {
                    if (t.parent == this) this.setChildIndex(t, e); else {
                        t.removeFromParent(), t.parent = this;
                        var i = this._children.length;
                        0 != t.sortingOrder ? (this._sortingChildCount++, e = this.getInsertPosForSortingChild(t)) : this._sortingChildCount > 0 && e > i - this._sortingChildCount && (e = i - this._sortingChildCount), 
                        e == i ? this._children.push(t) : this._children.splice(e, 0, t), this.childStateChanged(t), 
                        this.setBoundsChangedFlag();
                    }
                    return t;
                }
                throw "Invalid child index";
            }
        }, {
            key: "getInsertPosForSortingChild",
            value: function(t) {
                var e = this._children.length, i = 0;
                for (i = 0; i < e; i++) {
                    var s = this._children[i];
                    if (s != t && t.sortingOrder < s.sortingOrder) break;
                }
                return i;
            }
        }, {
            key: "removeChild",
            value: function(t, e) {
                var i = this._children.indexOf(t);
                return -1 != i && this.removeChildAt(i, e), t;
            }
        }, {
            key: "removeChildAt",
            value: function(e, i) {
                if (e >= 0 && e < this._children.length) {
                    var s = this._children[e];
                    return s.parent = null, 0 != s.sortingOrder && this._sortingChildCount--, this._children.splice(e, 1), 
                    s.group = null, s.inContainer && (this._container.removeChild(s.displayObject), 
                    this._childrenRenderOrder == t.ChildrenRenderOrder.Arch && Laya.timer.callLater(this, this.buildNativeDisplayList)), 
                    i && s.dispose(), this.setBoundsChangedFlag(), s;
                }
                throw "Invalid child index";
            }
        }, {
            key: "removeChildren",
            value: function(t, e, i) {
                null == t && (t = 0), null == e && (e = -1), (e < 0 || e >= this._children.length) && (e = this._children.length - 1);
                for (var s = t; s <= e; ++s) this.removeChildAt(t, i);
            }
        }, {
            key: "getChildAt",
            value: function(t) {
                if (t >= 0 && t < this._children.length) return this._children[t];
                throw "Invalid child index";
            }
        }, {
            key: "getChild",
            value: function(t) {
                for (var e = this._children.length, i = 0; i < e; ++i) if (this._children[i].name == t) return this._children[i];
                return null;
            }
        }, {
            key: "getChildByPath",
            value: function(t) {
                for (var e, i = t.split("."), n = i.length, a = this, o = 0; o < n && (e = a.getChild(i[o])); ++o) if (o != n - 1) {
                    if (!(e instanceof s)) {
                        e = null;
                        break;
                    }
                    a = e;
                }
                return e;
            }
        }, {
            key: "getVisibleChild",
            value: function(t) {
                for (var e = this._children.length, i = 0; i < e; ++i) {
                    var s = this._children[i];
                    if (s.internalVisible && s.internalVisible2 && s.name == t) return s;
                }
                return null;
            }
        }, {
            key: "getChildInGroup",
            value: function(t, e) {
                for (var i = this._children.length, s = 0; s < i; ++s) {
                    var n = this._children[s];
                    if (n.group == e && n.name == t) return n;
                }
                return null;
            }
        }, {
            key: "getChildById",
            value: function(t) {
                for (var e = this._children.length, i = 0; i < e; ++i) if (this._children[i]._id == t) return this._children[i];
                return null;
            }
        }, {
            key: "getChildIndex",
            value: function(t) {
                return this._children.indexOf(t);
            }
        }, {
            key: "setChildIndex",
            value: function(t, e) {
                var i = this._children.indexOf(t);
                if (-1 == i) throw "Not a child of this container";
                if (0 == t.sortingOrder) {
                    var s = this._children.length;
                    this._sortingChildCount > 0 && e > s - this._sortingChildCount - 1 && (e = s - this._sortingChildCount - 1), 
                    this._setChildIndex(t, i, e);
                }
            }
        }, {
            key: "setChildIndexBefore",
            value: function(t, e) {
                var i = this._children.indexOf(t);
                if (-1 == i) throw "Not a child of this container";
                if (0 != t.sortingOrder) return i;
                var s = this._children.length;
                return this._sortingChildCount > 0 && e > s - this._sortingChildCount - 1 && (e = s - this._sortingChildCount - 1), 
                i < e ? this._setChildIndex(t, i, e - 1) : this._setChildIndex(t, i, e);
            }
        }, {
            key: "_setChildIndex",
            value: function(e, i, s) {
                var n = this._children.length;
                if (s > n && (s = n), i == s) return i;
                if (this._children.splice(i, 1), this._children.splice(s, 0, e), e.inContainer) {
                    var a, o = 0;
                    if (this._childrenRenderOrder == t.ChildrenRenderOrder.Ascent) {
                        for (a = 0; a < s; a++) this._children[a].inContainer && o++;
                        o == this._container.numChildren && o--, this._container.setChildIndex(e.displayObject, o);
                    } else if (this._childrenRenderOrder == t.ChildrenRenderOrder.Descent) {
                        for (a = n - 1; a > s; a--) this._children[a].inContainer && o++;
                        o == this._container.numChildren && o--, this._container.setChildIndex(e.displayObject, o);
                    } else Laya.timer.callLater(this, this.buildNativeDisplayList);
                    this.setBoundsChangedFlag();
                }
                return s;
            }
        }, {
            key: "swapChildren",
            value: function(t, e) {
                var i = this._children.indexOf(t), s = this._children.indexOf(e);
                if (-1 == i || -1 == s) throw "Not a child of this container";
                this.swapChildrenAt(i, s);
            }
        }, {
            key: "swapChildrenAt",
            value: function(t, e) {
                var i = this._children[t], s = this._children[e];
                this.setChildIndex(i, e), this.setChildIndex(s, t);
            }
        }, {
            key: "isAncestorOf",
            value: function(t) {
                if (!t) return !1;
                for (var e = t.parent; e; ) {
                    if (e == this) return !0;
                    e = e.parent;
                }
                return !1;
            }
        }, {
            key: "addController",
            value: function(t) {
                this._controllers.push(t), t.parent = this, this.applyController(t);
            }
        }, {
            key: "getControllerAt",
            value: function(t) {
                return this._controllers[t];
            }
        }, {
            key: "getController",
            value: function(t) {
                for (var e = this._controllers.length, i = 0; i < e; ++i) {
                    var s = this._controllers[i];
                    if (s.name == t) return s;
                }
                return null;
            }
        }, {
            key: "removeController",
            value: function(t) {
                var e = this._controllers.indexOf(t);
                if (-1 == e) throw new Error("controller not exists");
                t.parent = null, this._controllers.splice(e, 1);
                for (var i = this._children.length, s = 0; s < i; s++) this._children[s].handleControllerChanged(t);
            }
        }, {
            key: "childStateChanged",
            value: function(e) {
                if (!this._buildingDisplayList) {
                    var i = this._children.length;
                    if (e instanceof t.GGroup) for (var s = 0; s < i; s++) {
                        var n = this._children[s];
                        n.group == e && this.childStateChanged(n);
                    } else if (e.displayObject) if (e.internalVisible && e.displayObject != this._displayObject.mask) {
                        if (!e.displayObject.parent) {
                            var a = 0;
                            if (this._childrenRenderOrder == t.ChildrenRenderOrder.Ascent) {
                                for (s = 0; s < i && (n = this._children[s]) != e; s++) n.displayObject && n.displayObject.parent && a++;
                                this._container.addChildAt(e.displayObject, a);
                            } else if (this._childrenRenderOrder == t.ChildrenRenderOrder.Descent) {
                                for (s = i - 1; s >= 0 && (n = this._children[s]) != e; s--) n.displayObject && n.displayObject.parent && a++;
                                this._container.addChildAt(e.displayObject, a);
                            } else this._container.addChild(e.displayObject), Laya.timer.callLater(this, this.buildNativeDisplayList);
                        }
                    } else e.displayObject.parent && (this._container.removeChild(e.displayObject), 
                    this._childrenRenderOrder == t.ChildrenRenderOrder.Arch && Laya.timer.callLater(this, this.buildNativeDisplayList));
                }
            }
        }, {
            key: "buildNativeDisplayList",
            value: function() {
                if (this._displayObject) {
                    var e, i, s = this._children.length;
                    if (0 != s) switch (this._childrenRenderOrder) {
                      case t.ChildrenRenderOrder.Ascent:
                        for (e = 0; e < s; e++) (i = this._children[e]).displayObject && i.internalVisible && this._container.addChild(i.displayObject);
                        break;

                      case t.ChildrenRenderOrder.Descent:
                        for (e = s - 1; e >= 0; e--) (i = this._children[e]).displayObject && i.internalVisible && this._container.addChild(i.displayObject);
                        break;

                      case t.ChildrenRenderOrder.Arch:
                        var n = t.ToolSet.clamp(this._apexIndex, 0, s);
                        for (e = 0; e < n; e++) (i = this._children[e]).displayObject && i.internalVisible && this._container.addChild(i.displayObject);
                        for (e = s - 1; e >= n; e--) (i = this._children[e]).displayObject && i.internalVisible && this._container.addChild(i.displayObject);
                    }
                }
            }
        }, {
            key: "applyController",
            value: function(t) {
                this._applyingController = t;
                for (var e = this._children.length, i = 0; i < e; i++) this._children[i].handleControllerChanged(t);
                this._applyingController = null, t.runActions();
            }
        }, {
            key: "applyAllControllers",
            value: function() {
                for (var t = this._controllers.length, e = 0; e < t; ++e) this.applyController(this._controllers[e]);
            }
        }, {
            key: "adjustRadioGroupDepth",
            value: function(e, i) {
                var s, n, a = this._children.length, o = -1, h = -1;
                for (s = 0; s < a; s++) (n = this._children[s]) == e ? o = s : n instanceof t.GButton && n.relatedController == i && s > h && (h = s);
                o < h && (this._applyingController && this._children[h].handleControllerChanged(this._applyingController), 
                this.swapChildrenAt(o, h));
            }
        }, {
            key: "getTransitionAt",
            value: function(t) {
                return this._transitions[t];
            }
        }, {
            key: "getTransition",
            value: function(t) {
                for (var e = this._transitions.length, i = 0; i < e; ++i) {
                    var s = this._transitions[i];
                    if (s.name == t) return s;
                }
                return null;
            }
        }, {
            key: "isChildInView",
            value: function(t) {
                return this._displayObject.scrollRect ? t.x + t.width >= 0 && t.x <= this.width && t.y + t.height >= 0 && t.y <= this.height : !this._scrollPane || this._scrollPane.isChildInView(t);
            }
        }, {
            key: "getFirstChildInView",
            value: function() {
                for (var t = this._children.length, e = 0; e < t; ++e) {
                    var i = this._children[e];
                    if (this.isChildInView(i)) return e;
                }
                return -1;
            }
        }, {
            key: "setMask",
            value: function(e, i) {
                if (this._mask && this._mask != e && "destination-out" == this._mask.blendMode && (this._mask.blendMode = null), 
                this._mask = e, !this._mask) return this._displayObject.mask = null, void (this._displayObject.hitArea instanceof t.ChildHitArea && (this._displayObject.hitArea = null));
                this._mask.hitArea && (this._displayObject.hitArea = new t.ChildHitArea(this._mask, i), 
                this._displayObject.mouseThrough = !1, this._displayObject.hitTestPrior = !0), i ? (this._displayObject.mask = null, 
                this._displayObject.cacheAs = "bitmap", this._mask.blendMode = "destination-out") : this._displayObject.mask = this._mask;
            }
        }, {
            key: "updateHitArea",
            value: function() {
                if (this._displayObject.hitArea instanceof t.PixelHitTest) {
                    var e = this._displayObject.hitArea;
                    0 != this.sourceWidth && (e.scaleX = this._width / this.sourceWidth), 0 != this.sourceHeight && (e.scaleY = this._height / this.sourceHeight);
                } else this._displayObject.hitArea instanceof Laya.Rectangle && this._displayObject.hitArea.setTo(0, 0, this._width, this._height);
            }
        }, {
            key: "updateMask",
            value: function() {
                var t = this._displayObject.scrollRect;
                t || (t = new Laya.Rectangle()), t.x = this._margin.left, t.y = this._margin.top, 
                t.width = this._width - this._margin.right, t.height = this._height - this._margin.bottom, 
                this._displayObject.scrollRect = t;
            }
        }, {
            key: "setupScroll",
            value: function(e) {
                this._displayObject == this._container && (this._container = new Laya.Sprite(), 
                this._displayObject.addChild(this._container)), this._scrollPane = new t.ScrollPane(this), 
                this._scrollPane.setup(e);
            }
        }, {
            key: "setupOverflow",
            value: function(e) {
                e == t.OverflowType.Hidden ? (this._displayObject == this._container && (this._container = new Laya.Sprite(), 
                this._displayObject.addChild(this._container)), this.updateMask(), this._container.pos(this._margin.left, this._margin.top)) : 0 == this._margin.left && 0 == this._margin.top || (this._displayObject == this._container && (this._container = new Laya.Sprite(), 
                this._displayObject.addChild(this._container)), this._container.pos(this._margin.left, this._margin.top));
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this._scrollPane ? this._scrollPane.onOwnerSizeChanged() : this._displayObject.scrollRect && this.updateMask(), 
                this._displayObject.hitArea && this.updateHitArea();
            }
        }, {
            key: "handleGrayedChanged",
            value: function() {
                var t = this.getController("grayed");
                if (t) t.selectedIndex = this.grayed ? 1 : 0; else for (var e = this.grayed, i = this._children.length, s = 0; s < i; ++s) this._children[s].grayed = e;
            }
        }, {
            key: "handleControllerChanged",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleControllerChanged", this).call(this, t), 
                this._scrollPane && this._scrollPane.handleControllerChanged(t);
            }
        }, {
            key: "setBoundsChangedFlag",
            value: function() {
                (this._scrollPane || this._trackBounds) && (this._boundsChanged || (this._boundsChanged = !0, 
                Laya.timer.callLater(this, this.__render)));
            }
        }, {
            key: "__render",
            value: function() {
                if (this._boundsChanged) {
                    var t = 0, e = this._children.length;
                    for (t = 0; t < e; t++) this._children[t].ensureSizeCorrect();
                    this.updateBounds();
                }
            }
        }, {
            key: "ensureBoundsCorrect",
            value: function() {
                var t = 0, e = this._children.length;
                for (t = 0; t < e; t++) this._children[t].ensureSizeCorrect();
                this._boundsChanged && this.updateBounds();
            }
        }, {
            key: "updateBounds",
            value: function() {
                var t = 0, e = 0, i = 0, s = 0, n = this._children.length;
                if (n > 0) {
                    t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY;
                    var a = Number.NEGATIVE_INFINITY, o = Number.NEGATIVE_INFINITY, h = 0, r = 0;
                    for (r = 0; r < n; r++) {
                        var l = this._children[r];
                        (h = l.x) < t && (t = h), (h = l.y) < e && (e = h), (h = l.x + l.actualWidth) > a && (a = h), 
                        (h = l.y + l.actualHeight) > o && (o = h);
                    }
                    i = a - t, s = o - e;
                }
                this.setBounds(t, e, i, s);
            }
        }, {
            key: "setBounds",
            value: function(t, e, i, s) {
                this._boundsChanged = !1, this._scrollPane && this._scrollPane.setContentSize(Math.round(t + i), Math.round(e + s));
            }
        }, {
            key: "getSnappingPosition",
            value: function(t, e, i) {
                return this.getSnappingPositionWithDir(t, e, 0, 0, i);
            }
        }, {
            key: "getSnappingPositionWithDir",
            value: function(t, e, i, s, n) {
                n || (n = new Laya.Point());
                var a = this._children.length;
                if (0 == a) return n.x = 0, n.y = 0, n;
                this.ensureBoundsCorrect();
                var o = null, h = null, r = 0;
                if (0 != e) {
                    for (;r < a; r++) if (e < (o = this._children[r]).y) {
                        if (0 == r) {
                            e = 0;
                            break;
                        }
                        e = e < (h = this._children[r - 1]).y + h.actualHeight / 2 ? h.y : o.y;
                        break;
                    }
                    r == a && (e = o.y);
                }
                if (0 != t) {
                    for (r > 0 && r--; r < a; r++) if (t < (o = this._children[r]).x) {
                        if (0 == r) {
                            t = 0;
                            break;
                        }
                        t = t < (h = this._children[r - 1]).x + h.actualWidth / 2 ? h.x : o.x;
                        break;
                    }
                    r == a && (t = o.x);
                }
                return n.x = t, n.y = e, n;
            }
        }, {
            key: "childSortingOrderChanged",
            value: function(t, e, i) {
                if (0 == i) this._sortingChildCount--, this.setChildIndex(t, this._children.length); else {
                    0 == e && this._sortingChildCount++;
                    var s = this._children.indexOf(t), n = this.getInsertPosForSortingChild(t);
                    s < n ? this._setChildIndex(t, s, n - 1) : this._setChildIndex(t, s, n);
                }
            }
        }, {
            key: "constructFromResource",
            value: function() {
                this.constructFromResource2(null, 0);
            }
        }, {
            key: "constructFromResource2",
            value: function(e, i) {
                var s, n, a, o, h, r, l, u, _ = this.packageItem.getBranch();
                _.decoded || (_.decoded = !0, t.TranslationHelper.translateComponent(_));
                var c = _.rawData;
                c.seek(0, 0), this._underConstruct = !0, this.sourceWidth = c.getInt32(), this.sourceHeight = c.getInt32(), 
                this.initWidth = this.sourceWidth, this.initHeight = this.sourceHeight, this.setSize(this.sourceWidth, this.sourceHeight), 
                c.readBool() && (this.minWidth = c.getInt32(), this.maxWidth = c.getInt32(), this.minHeight = c.getInt32(), 
                this.maxHeight = c.getInt32()), c.readBool() && (h = c.getFloat32(), r = c.getFloat32(), 
                this.internalSetPivot(h, r, c.readBool())), c.readBool() && (this._margin.top = c.getInt32(), 
                this._margin.bottom = c.getInt32(), this._margin.left = c.getInt32(), this._margin.right = c.getInt32());
                var d = c.readByte();
                if (d == t.OverflowType.Scroll) {
                    var g = c.pos;
                    c.seek(0, 7), this.setupScroll(c), c.pos = g;
                } else this.setupOverflow(d);
                c.readBool() && c.skip(8), this._buildingDisplayList = !0, c.seek(0, 1);
                var f, p = c.getInt16();
                for (s = 0; s < p; s++) {
                    o = c.getInt16(), o += c.pos;
                    var y = new t.Controller();
                    this._controllers.push(y), y.parent = this, y.setup(c), c.pos = o;
                }
                c.seek(0, 2);
                var v = c.getInt16();
                for (s = 0; s < v; s++) {
                    if (n = c.getInt16(), a = c.pos, e) f = e[i + s]; else {
                        c.seek(a, 0);
                        var m, k = c.readByte(), w = c.readS(), C = c.readS(), b = null;
                        null != w && (b = (m = null != C ? t.UIPackage.getById(C) : _.owner) ? m.getItemById(w) : null), 
                        b ? (f = t.UIObjectFactory.newObject(b)).constructFromResource() : f = t.UIObjectFactory.newObject(k);
                    }
                    f._underConstruct = !0, f.setup_beforeAdd(c, a), f.parent = this, this._children.push(f), 
                    c.pos = a + n;
                }
                for (c.seek(0, 3), this.relations.setup(c, !0), c.seek(0, 2), c.skip(2), s = 0; s < v; s++) o = c.getInt16(), 
                o += c.pos, c.seek(c.pos, 3), this._children[s].relations.setup(c, !1), c.pos = o;
                for (c.seek(0, 2), c.skip(2), s = 0; s < v; s++) o = c.getInt16(), o += c.pos, (f = this._children[s]).setup_afterAdd(c, c.pos), 
                f._underConstruct = !1, c.pos = o;
                c.seek(0, 4), c.skip(2), this.opaque = c.readBool();
                var S = c.getInt16();
                -1 != S && this.setMask(this.getChildAt(S).displayObject, c.readBool());
                var x, I = c.readS();
                l = c.getInt32(), u = c.getInt32(), I ? (b = _.owner.getItemById(I)) && b.pixelHitTestData && (x = new t.PixelHitTest(b.pixelHitTestData, l, u)) : 0 != l && -1 != u && (x = new t.ChildHitArea(this.getChildAt(u).displayObject)), 
                x && (this._displayObject.hitArea = x, this._displayObject.mouseThrough = !1, this._displayObject.hitTestPrior = !0), 
                c.seek(0, 5);
                var T = c.getInt16();
                for (s = 0; s < T; s++) {
                    o = c.getInt16(), o += c.pos;
                    var P = new t.Transition(this);
                    P.setup(c), this._transitions.push(P), c.pos = o;
                }
                this._transitions.length > 0 && (this.displayObject.on(Laya.Event.DISPLAY, this, this.___added), 
                this.displayObject.on(Laya.Event.UNDISPLAY, this, this.___removed)), this.applyAllControllers(), 
                this._buildingDisplayList = !1, this._underConstruct = !1, this.buildNativeDisplayList(), 
                this.setBoundsChangedFlag(), _.objectType != t.ObjectType.Component && this.constructExtension(c), 
                this.onConstruct();
            }
        }, {
            key: "constructExtension",
            value: function(t) {}
        }, {
            key: "onConstruct",
            value: function() {
                this.constructFromXML(null);
            }
        }, {
            key: "constructFromXML",
            value: function(t) {}
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 4);
                var i, a, h = t.getInt16();
                for (-1 != h && this._scrollPane && (this._scrollPane.pageController = this._parent.getControllerAt(h)), 
                i = t.getInt16(), a = 0; a < i; a++) {
                    var r = this.getController(t.readS()), l = t.readS();
                    r && (r.selectedPageId = l);
                }
                if (t.version >= 2) for (i = t.getInt16(), a = 0; a < i; a++) {
                    var u = t.readS(), _ = t.getInt16(), c = t.readS(), d = this.getChildByPath(u);
                    d && d.setProp(_, c);
                }
            }
        }, {
            key: "___added",
            value: function() {
                for (var t = this._transitions.length, e = 0; e < t; ++e) this._transitions[e].onOwnerAddedToStage();
            }
        }, {
            key: "___removed",
            value: function() {
                for (var t = this._transitions.length, e = 0; e < t; ++e) this._transitions[e].onOwnerRemovedFromStage();
            }
        }, {
            key: "displayListContainer",
            get: function() {
                return this._container;
            }
        }, {
            key: "numChildren",
            get: function() {
                return this._children.length;
            }
        }, {
            key: "controllers",
            get: function() {
                return this._controllers;
            }
        }, {
            key: "scrollPane",
            get: function() {
                return this._scrollPane;
            }
        }, {
            key: "opaque",
            get: function() {
                return this._opaque;
            },
            set: function(t) {
                this._opaque != t && (this._opaque = t, this._opaque ? (this._displayObject.hitArea || (this._displayObject.hitArea = new Laya.Rectangle()), 
                this._displayObject.hitArea instanceof Laya.Rectangle && this._displayObject.hitArea.setTo(0, 0, this._width, this._height), 
                this._displayObject.mouseThrough = !1) : (this._displayObject.hitArea instanceof Laya.Rectangle && (this._displayObject.hitArea = null), 
                this._displayObject.mouseThrough = !0));
            }
        }, {
            key: "margin",
            get: function() {
                return this._margin;
            },
            set: function(t) {
                this._margin.copy(t), this._displayObject.scrollRect && this._container.pos(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y), 
                this.handleSizeChanged();
            }
        }, {
            key: "childrenRenderOrder",
            get: function() {
                return this._childrenRenderOrder;
            },
            set: function(t) {
                this._childrenRenderOrder != t && (this._childrenRenderOrder = t, this.buildNativeDisplayList());
            }
        }, {
            key: "apexIndex",
            get: function() {
                return this._apexIndex;
            },
            set: function(e) {
                this._apexIndex != e && (this._apexIndex = e, this._childrenRenderOrder == t.ChildrenRenderOrder.Arch && this.buildNativeDisplayList());
            }
        }, {
            key: "mask",
            get: function() {
                return this._mask;
            },
            set: function(t) {
                this.setMask(t, !1);
            }
        }, {
            key: "baseUserData",
            get: function() {
                var t = this.packageItem.rawData;
                return t.seek(0, 4), t.readS();
            }
        }, {
            key: "viewWidth",
            get: function() {
                return this._scrollPane ? this._scrollPane.viewWidth : this.width - this._margin.left - this._margin.right;
            },
            set: function(t) {
                this._scrollPane ? this._scrollPane.viewWidth = t : this.width = t + this._margin.left + this._margin.right;
            }
        }, {
            key: "viewHeight",
            get: function() {
                return this._scrollPane ? this._scrollPane.viewHeight : this.height - this._margin.top - this._margin.bottom;
            },
            set: function(t) {
                this._scrollPane ? this._scrollPane.viewHeight = t : this.height = t + this._margin.top + this._margin.bottom;
            }
        } ]), s;
    }(t.GObject);
    t.GComponent = P;
    var L = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._soundVolumeScale = 0, e._downEffect = 0, 
            e._mode = t.ButtonMode.Common, e._title = "", e._icon = "", e._sound = t.UIConfig.buttonSound, 
            e._soundVolumeScale = t.UIConfig.buttonSoundVolumeScale, e._changeStateOnClick = !0, 
            e._downEffectValue = .8, e;
        }
        return (0, l.default)(s, [ {
            key: "getTextField",
            value: function() {
                return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof t.GLabel || this._titleObject instanceof s ? this._titleObject.getTextField() : null;
            }
        }, {
            key: "fireClick",
            value: function(e) {
                null == e && (e = !0), e && this._mode == t.ButtonMode.Common && (this.setState(s.OVER), 
                Laya.timer.once(100, this, this.setState, [ s.DOWN ], !1), Laya.timer.once(200, this, this.setState, [ s.UP ], !1)), 
                this.__click(t.Events.createEvent(Laya.Event.CLICK, this.displayObject));
            }
        }, {
            key: "setState",
            value: function(e) {
                if (this._buttonController && (this._buttonController.selectedPage = e), 1 == this._downEffect) {
                    var i = this.numChildren;
                    if (e == s.DOWN || e == s.SELECTED_OVER || e == s.SELECTED_DISABLED) for (var n = 255 * this._downEffectValue, a = Laya.Utils.toHexColor((n << 16) + (n << 8) + n), o = 0; o < i; o++) {
                        var h = this.getChildAt(o);
                        h instanceof t.GTextField || h.setProp(t.ObjectPropID.Color, a);
                    } else for (o = 0; o < i; o++) (h = this.getChildAt(o)) instanceof t.GTextField || h.setProp(t.ObjectPropID.Color, "#FFFFFF");
                } else 2 == this._downEffect && (e == s.DOWN || e == s.SELECTED_OVER || e == s.SELECTED_DISABLED ? this._downScaled || (this.setScale(this.scaleX * this._downEffectValue, this.scaleY * this._downEffectValue), 
                this._downScaled = !0) : this._downScaled && (this.setScale(this.scaleX / this._downEffectValue, this.scaleY / this._downEffectValue), 
                this._downScaled = !1));
            }
        }, {
            key: "handleControllerChanged",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleControllerChanged", this).call(this, t), 
                this._relatedController == t && (this.selected = this._relatedPageId == t.selectedPageId);
            }
        }, {
            key: "handleGrayedChanged",
            value: function() {
                this._buttonController && this._buttonController.hasPage(s.DISABLED) ? this.grayed ? this._selected && this._buttonController.hasPage(s.SELECTED_DISABLED) ? this.setState(s.SELECTED_DISABLED) : this.setState(s.DISABLED) : this._selected ? this.setState(s.DOWN) : this.setState(s.UP) : (0, 
                agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleGrayedChanged", this).call(this);
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.titleColor;

                  case t.ObjectPropID.OutlineColor:
                    var i = this.getTextField();
                    return i ? i.strokeColor : 0;

                  case t.ObjectPropID.FontSize:
                    return this.titleFontSize;

                  case t.ObjectPropID.Selected:
                    return this.selected;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.titleColor = i;
                    break;

                  case t.ObjectPropID.OutlineColor:
                    var a = this.getTextField();
                    a && (a.strokeColor = i);
                    break;

                  case t.ObjectPropID.FontSize:
                    this.titleFontSize = i;
                    break;

                  case t.ObjectPropID.Selected:
                    this.selected = i;
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "constructExtension",
            value: function(e) {
                e.seek(0, 6), this._mode = e.readByte();
                var i = e.readS();
                i && (this._sound = i), this._soundVolumeScale = e.getFloat32(), this._downEffect = e.readByte(), 
                this._downEffectValue = e.getFloat32(), 2 == this._downEffect && this.setPivot(.5, .5, this.pivotAsAnchor), 
                this._buttonController = this.getController("button"), this._titleObject = this.getChild("title"), 
                this._iconObject = this.getChild("icon"), this._titleObject && (this._title = this._titleObject.text), 
                this._iconObject && (this._icon = this._iconObject.icon), this._mode == t.ButtonMode.Common && this.setState(s.UP), 
                this.on(Laya.Event.ROLL_OVER, this, this.__rollover), this.on(Laya.Event.ROLL_OUT, this, this.__rollout), 
                this.on(Laya.Event.MOUSE_DOWN, this, this.__mousedown), this.on(Laya.Event.CLICK, this, this.__click);
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                var i, a;
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6) && t.readByte() == this.packageItem.objectType && (null != (i = t.readS()) && (this.title = i), 
                null != (i = t.readS()) && (this.selectedTitle = i), null != (i = t.readS()) && (this.icon = i), 
                null != (i = t.readS()) && (this.selectedIcon = i), t.readBool() && (this.titleColor = t.readColorS()), 
                0 != (a = t.getInt32()) && (this.titleFontSize = a), (a = t.getInt16()) >= 0 && (this._relatedController = this.parent.getControllerAt(a)), 
                this._relatedPageId = t.readS(), null != (i = t.readS()) && (this._sound = i), t.readBool() && (this._soundVolumeScale = t.getFloat32()), 
                this.selected = t.readBool());
            }
        }, {
            key: "__rollover",
            value: function() {
                this._buttonController && this._buttonController.hasPage(s.OVER) && (this._over = !0, 
                this._down || this.grayed && this._buttonController.hasPage(s.DISABLED) || this.setState(this._selected ? s.SELECTED_OVER : s.OVER));
            }
        }, {
            key: "__rollout",
            value: function() {
                this._buttonController && this._buttonController.hasPage(s.OVER) && (this._over = !1, 
                this._down || this.grayed && this._buttonController.hasPage(s.DISABLED) || this.setState(this._selected ? s.DOWN : s.UP));
            }
        }, {
            key: "__mousedown",
            value: function(e) {
                this._down = !0, t.GRoot.inst.checkPopups(e.target), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__mouseup), 
                this._mode == t.ButtonMode.Common && (this.grayed && this._buttonController && this._buttonController.hasPage(s.DISABLED) ? this.setState(s.SELECTED_DISABLED) : this.setState(s.DOWN)), 
                this._linkedPopup && (this._linkedPopup instanceof t.Window ? this._linkedPopup.toggleStatus() : this.root.togglePopup(this._linkedPopup, this));
            }
        }, {
            key: "__mouseup",
            value: function() {
                if (this._down) {
                    if (Laya.stage.off(Laya.Event.MOUSE_UP, this, this.__mouseup), this._down = !1, 
                    null == this._displayObject) return;
                    this._mode == t.ButtonMode.Common && (this.grayed && this._buttonController && this._buttonController.hasPage(s.DISABLED) ? this.setState(s.DISABLED) : this._over ? this.setState(s.OVER) : this.setState(s.UP));
                }
            }
        }, {
            key: "__click",
            value: function(e) {
                if (this._sound) {
                    var i = t.UIPackage.getItemByURL(this._sound);
                    i ? t.GRoot.inst.playOneShotSound(i.file) : t.GRoot.inst.playOneShotSound(this._sound);
                }
                this._mode == t.ButtonMode.Check ? this._changeStateOnClick && (this.selected = !this._selected, 
                t.Events.dispatch(t.Events.STATE_CHANGED, this.displayObject, e)) : this._mode == t.ButtonMode.Radio ? this._changeStateOnClick && !this._selected && (this.selected = !0, 
                t.Events.dispatch(t.Events.STATE_CHANGED, this.displayObject, e)) : this._relatedController && (this._relatedController.selectedPageId = this._relatedPageId);
            }
        }, {
            key: "icon",
            get: function() {
                return this._icon;
            },
            set: function(t) {
                this._icon = t, t = this._selected && this._selectedIcon ? this._selectedIcon : this._icon, 
                this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
            }
        }, {
            key: "selectedIcon",
            get: function() {
                return this._selectedIcon;
            },
            set: function(t) {
                this._selectedIcon = t, t = this._selected && this._selectedIcon ? this._selectedIcon : this._icon, 
                this._iconObject && (this._iconObject.icon = t);
            }
        }, {
            key: "title",
            get: function() {
                return this._title;
            },
            set: function(t) {
                this._title = t, this._titleObject && (this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title), 
                this.updateGear(6);
            }
        }, {
            key: "text",
            get: function() {
                return this.title;
            },
            set: function(t) {
                this.title = t;
            }
        }, {
            key: "selectedTitle",
            get: function() {
                return this._selectedTitle;
            },
            set: function(t) {
                this._selectedTitle = t, this._titleObject && (this._titleObject.text = this._selected && this._selectedTitle ? this._selectedTitle : this._title);
            }
        }, {
            key: "titleColor",
            get: function() {
                var t = this.getTextField();
                return t ? t.color : "#000000";
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.color = t), this.updateGear(4);
            }
        }, {
            key: "titleFontSize",
            get: function() {
                var t = this.getTextField();
                return t ? t.fontSize : 0;
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.fontSize = t);
            }
        }, {
            key: "sound",
            get: function() {
                return this._sound;
            },
            set: function(t) {
                this._sound = t;
            }
        }, {
            key: "soundVolumeScale",
            get: function() {
                return this._soundVolumeScale;
            },
            set: function(t) {
                this._soundVolumeScale = t;
            }
        }, {
            key: "selected",
            set: function(e) {
                if (this._mode != t.ButtonMode.Common && this._selected != e) {
                    if (this._selected = e, this.grayed && this._buttonController && this._buttonController.hasPage(s.DISABLED) ? this._selected ? this.setState(s.SELECTED_DISABLED) : this.setState(s.DISABLED) : this._selected ? this.setState(this._over ? s.SELECTED_OVER : s.DOWN) : this.setState(this._over ? s.OVER : s.UP), 
                    this._selectedTitle && this._titleObject && (this._titleObject.text = this._selected ? this._selectedTitle : this._title), 
                    this._selectedIcon) {
                        var i = this._selected ? this._selectedIcon : this._icon;
                        this._iconObject && (this._iconObject.icon = i);
                    }
                    this._relatedController && this._parent && !this._parent._buildingDisplayList && (this._selected ? (this._relatedController.selectedPageId = this._relatedPageId, 
                    this._relatedController.autoRadioGroupDepth && this._parent.adjustRadioGroupDepth(this, this._relatedController)) : this._mode == t.ButtonMode.Check && this._relatedController.selectedPageId == this._relatedPageId && (this._relatedController.oppositePageId = this._relatedPageId));
                }
            },
            get: function() {
                return this._selected;
            }
        }, {
            key: "mode",
            get: function() {
                return this._mode;
            },
            set: function(e) {
                this._mode != e && (e == t.ButtonMode.Common && (this.selected = !1), this._mode = e);
            }
        }, {
            key: "relatedController",
            get: function() {
                return this._relatedController;
            },
            set: function(t) {
                t != this._relatedController && (this._relatedController = t, this._relatedPageId = null);
            }
        }, {
            key: "relatedPageId",
            get: function() {
                return this._relatedPageId;
            },
            set: function(t) {
                this._relatedPageId = t;
            }
        }, {
            key: "changeStateOnClick",
            get: function() {
                return this._changeStateOnClick;
            },
            set: function(t) {
                this._changeStateOnClick = t;
            }
        }, {
            key: "linkedPopup",
            get: function() {
                return this._linkedPopup;
            },
            set: function(t) {
                this._linkedPopup = t;
            }
        } ]), s;
    }(t.GComponent);
    L.UP = "up", L.DOWN = "down", L.OVER = "over", L.SELECTED_OVER = "selectedOver", 
    L.DISABLED = "disabled", L.SELECTED_DISABLED = "selectedDisabled", t.GButton = L, 
    t.GComboBox = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._visibleItemCount = t.UIConfig.defaultComboBoxVisibleItemCount, 
            e._itemsUpdated = !0, e._selectedIndex = -1, e._popupDirection = 0, e._items = [], 
            e._values = [], e;
        }
        return (0, l.default)(s, [ {
            key: "getTextField",
            value: function() {
                return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof t.GLabel || this._titleObject instanceof t.GButton ? this._titleObject.getTextField() : null;
            }
        }, {
            key: "setState",
            value: function(t) {
                this._buttonController && (this._buttonController.selectedPage = t);
            }
        }, {
            key: "handleControllerChanged",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleControllerChanged", this).call(this, t), 
                this._selectionController == t && (this.selectedIndex = t.selectedIndex);
            }
        }, {
            key: "updateSelectionController",
            value: function() {
                if (this._selectionController && !this._selectionController.changing && this._selectedIndex < this._selectionController.pageCount) {
                    var t = this._selectionController;
                    this._selectionController = null, t.selectedIndex = this._selectedIndex, this._selectionController = t;
                }
            }
        }, {
            key: "dispose",
            value: function() {
                this.dropdown && (this.dropdown.dispose(), this.dropdown = null), this._selectionController = null, 
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.titleColor;

                  case t.ObjectPropID.OutlineColor:
                    var i = this.getTextField();
                    return i ? i.strokeColor : 0;

                  case t.ObjectPropID.FontSize:
                    return (i = this.getTextField()) ? i.fontSize : 0;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.titleColor = i;
                    break;

                  case t.ObjectPropID.OutlineColor:
                    var a = this.getTextField();
                    a && (a.strokeColor = i);
                    break;

                  case t.ObjectPropID.FontSize:
                    (a = this.getTextField()) && (a.fontSize = i);
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "constructExtension",
            value: function(e) {
                var i;
                if (this._buttonController = this.getController("button"), this._titleObject = this.getChild("title"), 
                this._iconObject = this.getChild("icon"), i = e.readS()) {
                    if (this.dropdown = t.UIPackage.createObjectFromURL(i), !this.dropdown) return void Laya.Log.print("下拉框必须为元件");
                    if (this.dropdown.name = "this._dropdownObject", this._list = this.dropdown.getChild("list"), 
                    !this._list) return void Laya.Log.print(this.resourceURL + ": 下拉框的弹出元件里必须包含名为list的列表");
                    this._list.on(t.Events.CLICK_ITEM, this, this.__clickItem), this._list.addRelation(this.dropdown, t.RelationType.Width), 
                    this._list.removeRelation(this.dropdown, t.RelationType.Height), this.dropdown.addRelation(this._list, t.RelationType.Height), 
                    this.dropdown.removeRelation(this._list, t.RelationType.Width), this.dropdown.displayObject.on(Laya.Event.UNDISPLAY, this, this.__popupWinClosed);
                }
                this.on(Laya.Event.ROLL_OVER, this, this.__rollover), this.on(Laya.Event.ROLL_OUT, this, this.__rollout), 
                this.on(Laya.Event.MOUSE_DOWN, this, this.__mousedown);
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                if ((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6) && t.readByte() == this.packageItem.objectType) {
                    var i, a, h, r, l = t.getInt16();
                    for (i = 0; i < l; i++) h = t.getInt16(), h += t.pos, this._items[i] = t.readS(), 
                    this._values[i] = t.readS(), null != (r = t.readS()) && (this._icons || (this._icons = []), 
                    this._icons[i] = r), t.pos = h;
                    null != (r = t.readS()) ? (this.text = r, this._selectedIndex = this._items.indexOf(r)) : this._items.length > 0 ? (this._selectedIndex = 0, 
                    this.text = this._items[0]) : this._selectedIndex = -1, null != (r = t.readS()) && (this.icon = r), 
                    t.readBool() && (this.titleColor = t.readColorS()), (a = t.getInt32()) > 0 && (this._visibleItemCount = a), 
                    this._popupDirection = t.readByte(), (a = t.getInt16()) >= 0 && (this._selectionController = this.parent.getControllerAt(a));
                }
            }
        }, {
            key: "showDropdown",
            value: function() {
                if (this._itemsUpdated) {
                    this._itemsUpdated = !1, this._list.removeChildrenToPool();
                    for (var e = this._items.length, i = 0; i < e; i++) {
                        var s = this._list.addItemFromPool();
                        s.name = i < this._values.length ? this._values[i] : "", s.text = this._items[i], 
                        s.icon = this._icons && i < this._icons.length ? this._icons[i] : null;
                    }
                    this._list.resizeToFit(this._visibleItemCount);
                }
                this._list.selectedIndex = -1, this.dropdown.width = this.width, this._list.ensureBoundsCorrect();
                var n = null;
                this._popupDirection == t.PopupDirection.Down ? n = !0 : this._popupDirection == t.PopupDirection.Up && (n = !1), 
                this.root.togglePopup(this.dropdown, this, n), this.dropdown.parent && this.setState(t.GButton.DOWN);
            }
        }, {
            key: "__popupWinClosed",
            value: function() {
                this._over ? this.setState(t.GButton.OVER) : this.setState(t.GButton.UP);
            }
        }, {
            key: "__clickItem",
            value: function(t, e) {
                Laya.timer.callLater(this, this.__clickItem2, [ this._list.getChildIndex(t), e ]);
            }
        }, {
            key: "__clickItem2",
            value: function(e, i) {
                this.dropdown.parent instanceof t.GRoot && this.dropdown.parent.hidePopup(), this._selectedIndex = -1, 
                this.selectedIndex = e, t.Events.dispatch(t.Events.STATE_CHANGED, this.displayObject, i);
            }
        }, {
            key: "__rollover",
            value: function() {
                this._over = !0, this._down || this.dropdown && this.dropdown.parent || this.setState(t.GButton.OVER);
            }
        }, {
            key: "__rollout",
            value: function() {
                this._over = !1, this._down || this.dropdown && this.dropdown.parent || this.setState(t.GButton.UP);
            }
        }, {
            key: "__mousedown",
            value: function(e) {
                e.target instanceof Laya.Input || (this._down = !0, t.GRoot.inst.checkPopups(e.target), 
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__mouseup), this.dropdown && this.showDropdown());
            }
        }, {
            key: "__mouseup",
            value: function() {
                this._down && (this._down = !1, Laya.stage.off(Laya.Event.MOUSE_UP, this, this.__mouseup), 
                this.dropdown && !this.dropdown.parent && (this._over ? this.setState(t.GButton.OVER) : this.setState(t.GButton.UP)));
            }
        }, {
            key: "text",
            get: function() {
                return this._titleObject ? this._titleObject.text : null;
            },
            set: function(t) {
                this._titleObject && (this._titleObject.text = t), this.updateGear(6);
            }
        }, {
            key: "titleColor",
            get: function() {
                var t = this.getTextField();
                return t ? t.color : "#000000";
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.color = t), this.updateGear(4);
            }
        }, {
            key: "titleFontSize",
            get: function() {
                var t = this.getTextField();
                return t ? t.fontSize : 0;
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.fontSize = t);
            }
        }, {
            key: "icon",
            get: function() {
                return this._iconObject ? this._iconObject.icon : null;
            },
            set: function(t) {
                this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
            }
        }, {
            key: "visibleItemCount",
            get: function() {
                return this._visibleItemCount;
            },
            set: function(t) {
                this._visibleItemCount = t;
            }
        }, {
            key: "popupDirection",
            get: function() {
                return this._popupDirection;
            },
            set: function(t) {
                this._popupDirection = t;
            }
        }, {
            key: "items",
            get: function() {
                return this._items;
            },
            set: function(t) {
                t ? this._items = t.concat() : this._items.length = 0, this._items.length > 0 ? (this._selectedIndex >= this._items.length ? this._selectedIndex = this._items.length - 1 : -1 == this._selectedIndex && (this._selectedIndex = 0), 
                this.text = this._items[this._selectedIndex], this._icons && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex])) : (this.text = "", 
                this._icons && (this.icon = null), this._selectedIndex = -1), this._itemsUpdated = !0;
            }
        }, {
            key: "icons",
            get: function() {
                return this._icons;
            },
            set: function(t) {
                this._icons = t, this._icons && -1 != this._selectedIndex && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex]);
            }
        }, {
            key: "values",
            get: function() {
                return this._values;
            },
            set: function(t) {
                t ? this._values = t.concat() : this._values.length = 0;
            }
        }, {
            key: "selectedIndex",
            get: function() {
                return this._selectedIndex;
            },
            set: function(t) {
                this._selectedIndex != t && (this._selectedIndex = t, this._selectedIndex >= 0 && this._selectedIndex < this._items.length ? (this.text = this._items[this._selectedIndex], 
                this._icons && this._selectedIndex < this._icons.length && (this.icon = this._icons[this._selectedIndex])) : (this.text = "", 
                this._icons && (this.icon = null)), this.updateSelectionController());
            }
        }, {
            key: "value",
            get: function() {
                return this._values[this._selectedIndex];
            },
            set: function(t) {
                var e = this._values.indexOf(t);
                -1 == e && null == t && (e = this._values.indexOf("")), this.selectedIndex = e;
            }
        }, {
            key: "selectionController",
            get: function() {
                return this._selectionController;
            },
            set: function(t) {
                this._selectionController = t;
            }
        } ]), s;
    }(t.GComponent), t.GGraph = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._type = 0, t._lineSize = 1, t._lineColor = "#000000", 
            t._fillColor = "#FFFFFF", t;
        }
        return (0, l.default)(s, [ {
            key: "drawRect",
            value: function(t, e, i, s) {
                this._type = 1, this._lineSize = t, this._lineColor = e, this._fillColor = i, this._cornerRadius = s, 
                this.updateGraph();
            }
        }, {
            key: "drawEllipse",
            value: function(t, e, i) {
                this._type = 2, this._lineSize = t, this._lineColor = e, this._fillColor = i, this.updateGraph();
            }
        }, {
            key: "drawRegularPolygon",
            value: function(t, e, i, s, n, a) {
                this._type = 4, this._lineSize = t, this._lineColor = e, this._fillColor = i, this._sides = s, 
                this._startAngle = n || 0, this._distances = a, this.updateGraph();
            }
        }, {
            key: "drawPolygon",
            value: function(t, e, i, s) {
                this._type = 3, this._lineSize = t, this._lineColor = e, this._fillColor = i, this._polygonPoints = s, 
                this.updateGraph();
            }
        }, {
            key: "updateGraph",
            value: function() {
                this._displayObject.mouseEnabled = this.touchable;
                var e = this._displayObject.graphics;
                e.clear();
                var i = this.width, s = this.height;
                if (0 != i && 0 != s) {
                    var n = this._fillColor, a = this._lineColor;
                    if (t.ToolSet.startsWith(n, "rgba")) {
                        var o = n.substring(5, n.lastIndexOf(")")).split(","), h = parseFloat(o[3]);
                        0 == h ? n = null : (n = Laya.Utils.toHexColor((parseInt(o[0]) << 16) + (parseInt(o[1]) << 8) + parseInt(o[2])), 
                        this.alpha = h);
                    }
                    if (1 == this._type) if (this._cornerRadius) {
                        var r = [ [ "moveTo", this._cornerRadius[0], 0 ], [ "lineTo", i - this._cornerRadius[1], 0 ], [ "arcTo", i, 0, i, this._cornerRadius[1], this._cornerRadius[1] ], [ "lineTo", i, s - this._cornerRadius[3] ], [ "arcTo", i, s, i - this._cornerRadius[3], s, this._cornerRadius[3] ], [ "lineTo", this._cornerRadius[2], s ], [ "arcTo", 0, s, 0, s - this._cornerRadius[2], this._cornerRadius[2] ], [ "lineTo", 0, this._cornerRadius[0] ], [ "arcTo", 0, 0, this._cornerRadius[0], 0, this._cornerRadius[0] ], [ "closePath" ] ];
                        e.drawPath(0, 0, r, n ? {
                            fillStyle: n
                        } : null, this._lineSize > 0 ? {
                            strokeStyle: a,
                            lineWidth: this._lineSize
                        } : null);
                    } else e.drawRect(0, 0, i, s, n, this._lineSize > 0 ? a : null, this._lineSize); else if (2 == this._type) e.drawCircle(i / 2, s / 2, i / 2, n, this._lineSize > 0 ? a : null, this._lineSize); else if (3 == this._type) e.drawPoly(0, 0, this._polygonPoints, n, this._lineSize > 0 ? a : null, this._lineSize); else if (4 == this._type) {
                        this._polygonPoints || (this._polygonPoints = []);
                        var l = Math.min(this._width, this._height) / 2;
                        this._polygonPoints.length = 0;
                        for (var u, _ = Laya.Utils.toRadian(this._startAngle), c = 2 * Math.PI / this._sides, d = 0; d < this._sides; d++) {
                            this._distances ? (u = this._distances[d], isNaN(u) && (u = 1)) : u = 1;
                            var g = l + l * u * Math.cos(_), f = l + l * u * Math.sin(_);
                            this._polygonPoints.push(g, f), _ += c;
                        }
                        e.drawPoly(0, 0, this._polygonPoints, n, this._lineSize > 0 ? a : null, this._lineSize);
                    }
                    this._displayObject.repaint();
                }
            }
        }, {
            key: "replaceMe",
            value: function(t) {
                if (!this._parent) throw "parent not set";
                t.name = this.name, t.alpha = this.alpha, t.rotation = this.rotation, t.visible = this.visible, 
                t.touchable = this.touchable, t.grayed = this.grayed, t.setXY(this.x, this.y), t.setSize(this.width, this.height);
                var e = this._parent.getChildIndex(this);
                this._parent.addChildAt(t, e), t.relations.copyFrom(this.relations), this._parent.removeChild(this, !0);
            }
        }, {
            key: "addBeforeMe",
            value: function(t) {
                if (!this._parent) throw "parent not set";
                var e = this._parent.getChildIndex(this);
                this._parent.addChildAt(t, e);
            }
        }, {
            key: "addAfterMe",
            value: function(t) {
                if (!this._parent) throw "parent not set";
                var e = this._parent.getChildIndex(this);
                e++, this._parent.addChildAt(t, e);
            }
        }, {
            key: "setNativeObject",
            value: function(t) {
                this._type = 0, this._displayObject.mouseEnabled = this.touchable, this._displayObject.graphics.clear(), 
                this._displayObject.addChild(t);
            }
        }, {
            key: "createDisplayObject",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "createDisplayObject", this).call(this), 
                this._displayObject.mouseEnabled = !1, this._hitArea = new Laya.HitArea(), this._hitArea.hit = this._displayObject.graphics, 
                this._displayObject.hitArea = this._hitArea;
            }
        }, {
            key: "getProp",
            value: function(e) {
                return e == t.ObjectPropID.Color ? this.color : (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                e == t.ObjectPropID.Color ? this.color = i : (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                0 != this._type && this.updateGraph();
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                if ((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), this._type = t.readByte(), 0 != this._type) {
                    var i, a;
                    if (this._lineSize = t.getInt32(), this._lineColor = t.readColorS(!0), this._fillColor = t.readColorS(!0), 
                    t.readBool()) for (this._cornerRadius = [], i = 0; i < 4; i++) this._cornerRadius[i] = t.getFloat32();
                    if (3 == this._type) for (a = t.getInt16(), this._polygonPoints = [], this._polygonPoints.length = a, 
                    i = 0; i < a; i++) this._polygonPoints[i] = t.getFloat32(); else if (4 == this._type && (this._sides = t.getInt16(), 
                    this._startAngle = t.getFloat32(), (a = t.getInt16()) > 0)) for (this._distances = [], 
                    i = 0; i < a; i++) this._distances[i] = t.getFloat32();
                    this.updateGraph();
                }
            }
        }, {
            key: "distances",
            get: function() {
                return this._distances;
            },
            set: function(t) {
                this._distances = t, 3 == this._type && this.updateGraph();
            }
        }, {
            key: "color",
            get: function() {
                return this._fillColor;
            },
            set: function(t) {
                this._fillColor = t, this.updateGear(4), 0 != this._type && this.updateGraph();
            }
        } ]), s;
    }(t.GObject), t.GGroup = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._layout = 0, t._lineGap = 0, 
            t._columnGap = 0, t._mainGridIndex = -1, t._mainGridMinSize = 50, t._mainChildIndex = -1, 
            t._totalSize = 0, t._numChildren = 0, t._updating = 0, t;
        }
        return (0, l.default)(s, [ {
            key: "dispose",
            value: function() {
                this._boundsChanged = !1, (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "setBoundsChangedFlag",
            value: function(e) {
                0 == this._updating && this._parent && (e || (this._percentReady = !1), this._boundsChanged || (this._boundsChanged = !0, 
                this._layout != t.GroupLayoutType.None && Laya.timer.callLater(this, this.ensureBoundsCorrect)));
            }
        }, {
            key: "ensureSizeCorrect",
            value: function() {
                this._parent && this._boundsChanged && 0 != this._layout && (this._boundsChanged = !1, 
                this._autoSizeDisabled ? this.resizeChildren(0, 0) : (this.handleLayout(), this.updateBounds()));
            }
        }, {
            key: "ensureBoundsCorrect",
            value: function() {
                this._parent && this._boundsChanged && (this._boundsChanged = !1, 0 == this._layout ? this.updateBounds() : this._autoSizeDisabled ? this.resizeChildren(0, 0) : (this.handleLayout(), 
                this.updateBounds()));
            }
        }, {
            key: "updateBounds",
            value: function() {
                Laya.timer.clear(this, this.ensureBoundsCorrect);
                var t, e, i, s = this._parent.numChildren, n = Number.POSITIVE_INFINITY, a = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY, h = Number.NEGATIVE_INFINITY, r = !0;
                for (t = 0; t < s; t++) (e = this._parent.getChildAt(t)).group != this || this._excludeInvisibles && !e.internalVisible3 || ((i = e.xMin) < n && (n = i), 
                (i = e.yMin) < a && (a = i), (i = e.xMin + e.width) > o && (o = i), (i = e.yMin + e.height) > h && (h = i), 
                r = !1);
                var l = 0, u = 0;
                r || (this._updating |= 1, this.setXY(n, a), this._updating &= 2, l = o - n, u = h - a), 
                0 == (2 & this._updating) ? (this._updating |= 2, this.setSize(l, u), this._updating &= 1) : (this._updating &= 1, 
                this.resizeChildren(this._width - l, this._height - u));
            }
        }, {
            key: "handleLayout",
            value: function() {
                var e, i, s;
                if (this._updating |= 1, this._layout == t.GroupLayoutType.Horizontal) {
                    var n = this.x;
                    for (s = this._parent.numChildren, i = 0; i < s; i++) (e = this._parent.getChildAt(i)).group == this && (this._excludeInvisibles && !e.internalVisible3 || (e.xMin = n, 
                    0 != e.width && (n += e.width + this._columnGap)));
                } else if (this._layout == t.GroupLayoutType.Vertical) {
                    var a = this.y;
                    for (s = this._parent.numChildren, i = 0; i < s; i++) (e = this._parent.getChildAt(i)).group == this && (this._excludeInvisibles && !e.internalVisible3 || (e.yMin = a, 
                    0 != e.height && (a += e.height + this._lineGap)));
                }
                this._updating &= 2;
            }
        }, {
            key: "moveChildren",
            value: function(t, e) {
                if (0 == (1 & this._updating) && this._parent) {
                    this._updating |= 1;
                    var i, s, n = this._parent.numChildren;
                    for (i = 0; i < n; i++) (s = this._parent.getChildAt(i)).group == this && s.setXY(s.x + t, s.y + e);
                    this._updating &= 2;
                }
            }
        }, {
            key: "resizeChildren",
            value: function(e, i) {
                if (this._layout != t.GroupLayoutType.None && 0 == (2 & this._updating) && this._parent) if (this._updating |= 2, 
                !this._boundsChanged || (this._boundsChanged = !1, this._autoSizeDisabled)) {
                    var s, n, a = this._parent.numChildren;
                    if (!this._percentReady) {
                        this._percentReady = !0, this._numChildren = 0, this._totalSize = 0, this._mainChildIndex = -1;
                        var o = 0;
                        for (s = 0; s < a; s++) (n = this._parent.getChildAt(s)).group == this && (this._excludeInvisibles && !n.internalVisible3 || (o == this._mainGridIndex && (this._mainChildIndex = s), 
                        this._numChildren++, 1 == this._layout ? this._totalSize += n.width : this._totalSize += n.height), 
                        o++);
                        for (-1 != this._mainChildIndex && (1 == this._layout ? (n = this._parent.getChildAt(this._mainChildIndex), 
                        this._totalSize += this._mainGridMinSize - n.width, n._sizePercentInGroup = this._mainGridMinSize / this._totalSize) : (n = this._parent.getChildAt(this._mainChildIndex), 
                        this._totalSize += this._mainGridMinSize - n.height, n._sizePercentInGroup = this._mainGridMinSize / this._totalSize)), 
                        s = 0; s < a; s++) (n = this._parent.getChildAt(s)).group == this && s != this._mainChildIndex && (this._totalSize > 0 ? n._sizePercentInGroup = (1 == this._layout ? n.width : n.height) / this._totalSize : n._sizePercentInGroup = 0);
                    }
                    var h = 0, r = 1, l = !1;
                    if (1 == this._layout) {
                        h = this.width - (this._numChildren - 1) * this._columnGap, -1 != this._mainChildIndex && h >= this._totalSize && ((n = this._parent.getChildAt(this._mainChildIndex)).setSize(h - (this._totalSize - this._mainGridMinSize), n._rawHeight + i, !0), 
                        h -= n.width, r -= n._sizePercentInGroup, l = !0);
                        var u = this.x;
                        for (s = 0; s < a; s++) (n = this._parent.getChildAt(s)).group == this && (!this._excludeInvisibles || n.internalVisible3 ? (l && s == this._mainChildIndex || (n.setSize(Math.round(n._sizePercentInGroup / r * h), n._rawHeight + i, !0), 
                        r -= n._sizePercentInGroup, h -= n.width), n.xMin = u, 0 != n.width && (u += n.width + this._columnGap)) : n.setSize(n._rawWidth, n._rawHeight + i, !0));
                    } else {
                        h = this.height - (this._numChildren - 1) * this._lineGap, -1 != this._mainChildIndex && h >= this._totalSize && ((n = this._parent.getChildAt(this._mainChildIndex)).setSize(n._rawWidth + e, h - (this._totalSize - this._mainGridMinSize), !0), 
                        h -= n.height, r -= n._sizePercentInGroup, l = !0);
                        var _ = this.y;
                        for (s = 0; s < a; s++) (n = this._parent.getChildAt(s)).group == this && (!this._excludeInvisibles || n.internalVisible3 ? (l && s == this._mainChildIndex || (n.setSize(n._rawWidth + e, Math.round(n._sizePercentInGroup / r * h), !0), 
                        r -= n._sizePercentInGroup, h -= n.height), n.yMin = _, 0 != n.height && (_ += n.height + this._lineGap)) : n.setSize(n._rawWidth + e, n._rawHeight, !0));
                    }
                    this._updating &= 1;
                } else this.updateBounds();
            }
        }, {
            key: "handleAlphaChanged",
            value: function() {
                if (!this._underConstruct) for (var t = this._parent.numChildren, e = 0; e < t; e++) {
                    var i = this._parent.getChildAt(e);
                    i.group == this && (i.alpha = this.alpha);
                }
            }
        }, {
            key: "handleVisibleChanged",
            value: function() {
                if (this._parent) for (var t = this._parent.numChildren, e = 0; e < t; e++) {
                    var i = this._parent.getChildAt(e);
                    i.group == this && i.handleVisibleChanged();
                }
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), this._layout = t.readByte(), this._lineGap = t.getInt32(), this._columnGap = t.getInt32(), 
                t.version >= 2 && (this._excludeInvisibles = t.readBool(), this._autoSizeDisabled = t.readBool(), 
                this._mainGridIndex = t.getInt16());
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                this.visible || this.handleVisibleChanged();
            }
        }, {
            key: "layout",
            get: function() {
                return this._layout;
            },
            set: function(t) {
                this._layout != t && (this._layout = t, this.setBoundsChangedFlag());
            }
        }, {
            key: "lineGap",
            get: function() {
                return this._lineGap;
            },
            set: function(t) {
                this._lineGap != t && (this._lineGap = t, this.setBoundsChangedFlag(!0));
            }
        }, {
            key: "columnGap",
            get: function() {
                return this._columnGap;
            },
            set: function(t) {
                this._columnGap != t && (this._columnGap = t, this.setBoundsChangedFlag(!0));
            }
        }, {
            key: "excludeInvisibles",
            get: function() {
                return this._excludeInvisibles;
            },
            set: function(t) {
                this._excludeInvisibles != t && (this._excludeInvisibles = t, this.setBoundsChangedFlag());
            }
        }, {
            key: "autoSizeDisabled",
            get: function() {
                return this._autoSizeDisabled;
            },
            set: function(t) {
                this._autoSizeDisabled = t;
            }
        }, {
            key: "mainGridMinSize",
            get: function() {
                return this._mainGridMinSize;
            },
            set: function(t) {
                this._mainGridMinSize != t && (this._mainGridMinSize = t, this.setBoundsChangedFlag());
            }
        }, {
            key: "mainGridIndex",
            get: function() {
                return this._mainGridIndex;
            },
            set: function(t) {
                this._mainGridIndex != t && (this._mainGridIndex = t, this.setBoundsChangedFlag());
            }
        } ]), s;
    }(t.GObject), t.GImage = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._flip = 0, t;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = this._image = new t.Image(), this.image.mouseEnabled = !1, 
                this._displayObject.$owner = this;
            }
        }, {
            key: "constructFromResource",
            value: function() {
                this._contentItem = this.packageItem.getBranch(), this.sourceWidth = this._contentItem.width, 
                this.sourceHeight = this._contentItem.height, this.initWidth = this.sourceWidth, 
                this.initHeight = this.sourceHeight, this._contentItem = this._contentItem.getHighResolution(), 
                this._contentItem.load(), this.image.scale9Grid = this._contentItem.scale9Grid, 
                this.image.scaleByTile = this._contentItem.scaleByTile, this.image.tileGridIndice = this._contentItem.tileGridIndice, 
                this.image.texture = this._contentItem.texture, this.setSize(this.sourceWidth, this.sourceHeight);
            }
        }, {
            key: "handleXYChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleXYChanged", this).call(this), 
                this._flip != t.FlipType.None && (-1 == this.scaleX && (this.image.x += this.width), 
                -1 == this.scaleY && (this.image.y += this.height));
            }
        }, {
            key: "getProp",
            value: function(e) {
                return e == t.ObjectPropID.Color ? this.color : (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                e == t.ObjectPropID.Color ? this.color = i : (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), t.readBool() && (this.color = t.readColorS()), this.flip = t.readByte(), 
                this.image.fillMethod = t.readByte(), 0 != this.image.fillMethod && (this.image.fillOrigin = t.readByte(), 
                this.image.fillClockwise = t.readBool(), this.image.fillAmount = t.getFloat32());
            }
        }, {
            key: "image",
            get: function() {
                return this._image;
            }
        }, {
            key: "color",
            get: function() {
                return this.image.color;
            },
            set: function(t) {
                this.image.color != t && (this.image.color = t, this.updateGear(4));
            }
        }, {
            key: "flip",
            get: function() {
                return this._flip;
            },
            set: function(e) {
                if (this._flip != e) {
                    this._flip = e;
                    var i = 1, s = 1;
                    this._flip != t.FlipType.Horizontal && this._flip != t.FlipType.Both || (i = -1), 
                    this._flip != t.FlipType.Vertical && this._flip != t.FlipType.Both || (s = -1), 
                    this.setScale(i, s), this.handleXYChanged();
                }
            }
        }, {
            key: "fillMethod",
            get: function() {
                return this.image.fillMethod;
            },
            set: function(t) {
                this.image.fillMethod = t;
            }
        }, {
            key: "fillOrigin",
            get: function() {
                return this.image.fillOrigin;
            },
            set: function(t) {
                this.image.fillOrigin = t;
            }
        }, {
            key: "fillClockwise",
            get: function() {
                return this.image.fillClockwise;
            },
            set: function(t) {
                this.image.fillClockwise = t;
            }
        }, {
            key: "fillAmount",
            get: function() {
                return this.image.fillAmount;
            },
            set: function(t) {
                this.image.fillAmount = t;
            }
        } ]), s;
    }(t.GObject);
    var O = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            return (0, classCallCheck.default)(this, s), i.call(this);
        }
        return (0, l.default)(s, [ {
            key: "getTextField",
            value: function() {
                return this._titleObject instanceof t.GTextField ? this._titleObject : this._titleObject instanceof s || this._titleObject instanceof t.GButton ? this._titleObject.getTextField() : null;
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.titleColor;

                  case t.ObjectPropID.OutlineColor:
                    var i = this.getTextField();
                    return i ? i.strokeColor : 0;

                  case t.ObjectPropID.FontSize:
                    return this.titleFontSize;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.titleColor = i;
                    break;

                  case t.ObjectPropID.OutlineColor:
                    var a = this.getTextField();
                    a && (a.strokeColor = i);
                    break;

                  case t.ObjectPropID.FontSize:
                    this.titleFontSize = i;
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "constructExtension",
            value: function(t) {
                this._titleObject = this.getChild("title"), this._iconObject = this.getChild("icon");
            }
        }, {
            key: "setup_afterAdd",
            value: function(e, i) {
                if ((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, e, i), 
                e.seek(i, 6) && e.readByte() == this.packageItem.objectType) {
                    var a;
                    null != (a = e.readS()) && (this.title = a), null != (a = e.readS()) && (this.icon = a), 
                    e.readBool() && (this.titleColor = e.readColorS());
                    var h = e.getInt32();
                    if (0 != h && (this.titleFontSize = h), e.readBool()) {
                        var r = this.getTextField();
                        r instanceof t.GTextInput ? (null != (a = e.readS()) && (r.promptText = a), null != (a = e.readS()) && (r.restrict = a), 
                        0 != (h = e.getInt32()) && (r.maxLength = h), 0 != (h = e.getInt32()) && (4 == h ? r.keyboardType = Laya.Input.TYPE_NUMBER : 3 == h && (r.keyboardType = Laya.Input.TYPE_URL)), 
                        e.readBool() && (r.password = !0)) : e.skip(13);
                    }
                }
            }
        }, {
            key: "icon",
            get: function() {
                return this._iconObject ? this._iconObject.icon : null;
            },
            set: function(t) {
                this._iconObject && (this._iconObject.icon = t), this.updateGear(7);
            }
        }, {
            key: "title",
            get: function() {
                return this._titleObject ? this._titleObject.text : null;
            },
            set: function(t) {
                this._titleObject && (this._titleObject.text = t), this.updateGear(6);
            }
        }, {
            key: "text",
            get: function() {
                return this.title;
            },
            set: function(t) {
                this.title = t;
            }
        }, {
            key: "titleColor",
            get: function() {
                var t = this.getTextField();
                return t ? t.color : "#000000";
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.color = t), this.updateGear(4);
            }
        }, {
            key: "titleFontSize",
            get: function() {
                var t = this.getTextField();
                return t ? t.fontSize : 0;
            },
            set: function(t) {
                var e = this.getTextField();
                e && (e.fontSize = t);
            }
        }, {
            key: "color",
            get: function() {
                return this.titleColor;
            },
            set: function(t) {
                this.titleColor = t;
            }
        }, {
            key: "editable",
            set: function(t) {
                this._titleObject && (this._titleObject.asTextInput.editable = t);
            },
            get: function() {
                return this._titleObject instanceof t.GTextInput && this._titleObject.asTextInput.editable;
            }
        } ]), s;
    }(t.GComponent);
    t.GLabel = O, t.GList = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._lineCount = 0, e._columnCount = 0, 
            e._lineGap = 0, e._columnGap = 0, e._lastSelectedIndex = 0, e._numItems = 0, e._firstIndex = 0, 
            e._curLineItemCount = 0, e._virtualListChanged = 0, e.itemInfoVer = 0, e._trackBounds = !0, 
            e._pool = new t.GObjectPool(), e._layout = t.ListLayoutType.SingleColumn, e._autoResizeItem = !0, 
            e._lastSelectedIndex = -1, e._selectionMode = t.ListSelectionMode.Single, e.opaque = !0, 
            e.scrollItemToViewOnClick = !0, e._align = "left", e._verticalAlign = "top", e._container = new Laya.Sprite(), 
            e._displayObject.addChild(e._container), e;
        }
        return (0, l.default)(s, [ {
            key: "dispose",
            value: function() {
                this._pool.clear(), (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "getFromPool",
            value: function(t) {
                t || (t = this._defaultItem);
                var e = this._pool.getObject(t);
                return e && (e.visible = !0), e;
            }
        }, {
            key: "returnToPool",
            value: function(t) {
                t.displayObject.cacheAs = "none", this._pool.returnObject(t);
            }
        }, {
            key: "addChildAt",
            value: function(e, i) {
                return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "addChildAt", this).call(this, e, i), 
                e instanceof t.GButton && (e.selected = !1, e.changeStateOnClick = !1), e.on(Laya.Event.CLICK, this, this.__clickItem), 
                e;
            }
        }, {
            key: "addItem",
            value: function(e) {
                return e || (e = this._defaultItem), this.addChild(t.UIPackage.createObjectFromURL(e));
            }
        }, {
            key: "addItemFromPool",
            value: function(t) {
                return this.addChild(this.getFromPool(t));
            }
        }, {
            key: "removeChildAt",
            value: function(t, e) {
                var i = (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "removeChildAt", this).call(this, t);
                return e ? i.dispose() : i.off(Laya.Event.CLICK, this, this.__clickItem), i;
            }
        }, {
            key: "removeChildToPoolAt",
            value: function(t) {
                var e = (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "removeChildAt", this).call(this, t);
                this.returnToPool(e);
            }
        }, {
            key: "removeChildToPool",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "removeChild", this).call(this, t), 
                this.returnToPool(t);
            }
        }, {
            key: "removeChildrenToPool",
            value: function(t, e) {
                null == t && (t = 0), null == e && (e = -1), (e < 0 || e >= this._children.length) && (e = this._children.length - 1);
                for (var i = t; i <= e; ++i) this.removeChildToPoolAt(t);
            }
        }, {
            key: "getSelection",
            value: function(e) {
                var i;
                if (e || (e = new Array()), this._virtual) for (i = 0; i < this._realNumItems; i++) {
                    var s = this._virtualItems[i];
                    if (s.obj instanceof t.GButton && s.obj.selected || null == s.obj && s.selected) {
                        var n = i;
                        if (this._loop && (n = i % this._numItems, -1 != e.indexOf(n))) continue;
                        e.push(n);
                    }
                } else {
                    var a = this._children.length;
                    for (i = 0; i < a; i++) {
                        var o = this._children[i];
                        o instanceof t.GButton && o.selected && e.push(i);
                    }
                }
                return e;
            }
        }, {
            key: "addSelection",
            value: function(e, i) {
                if (this._selectionMode != t.ListSelectionMode.None) {
                    var s;
                    if (this.checkVirtualList(), this._selectionMode == t.ListSelectionMode.Single && this.clearSelection(), 
                    i && this.scrollToView(e), this._lastSelectedIndex = e, this._virtual) {
                        var n = this._virtualItems[e];
                        n.obj && (s = n.obj), n.selected = !0;
                    } else s = this.getChildAt(e);
                    s instanceof t.GButton && !s.selected && (s.selected = !0, this.updateSelectionController(e));
                }
            }
        }, {
            key: "removeSelection",
            value: function(e) {
                if (this._selectionMode != t.ListSelectionMode.None) {
                    var i;
                    if (this._virtual) {
                        var s = this._virtualItems[e];
                        s.obj && (i = s.obj), s.selected = !1;
                    } else i = this.getChildAt(e);
                    i instanceof t.GButton && (i.selected = !1);
                }
            }
        }, {
            key: "clearSelection",
            value: function() {
                var e;
                if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
                    var i = this._virtualItems[e];
                    i.obj instanceof t.GButton && (i.obj.selected = !1), i.selected = !1;
                } else {
                    var s = this._children.length;
                    for (e = 0; e < s; e++) {
                        var n = this._children[e];
                        n instanceof t.GButton && (n.selected = !1);
                    }
                }
            }
        }, {
            key: "clearSelectionExcept",
            value: function(e) {
                var i;
                if (this._virtual) for (i = 0; i < this._realNumItems; i++) {
                    var s = this._virtualItems[i];
                    s.obj != e && (s.obj instanceof t.GButton && (s.obj.selected = !1), s.selected = !1);
                } else {
                    var n = this._children.length;
                    for (i = 0; i < n; i++) {
                        var a = this._children[i];
                        a instanceof t.GButton && a != e && (a.selected = !1);
                    }
                }
            }
        }, {
            key: "selectAll",
            value: function() {
                this.checkVirtualList();
                var e, i = -1;
                if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
                    var s = this._virtualItems[e];
                    s.obj instanceof t.GButton && !s.obj.selected && (s.obj.selected = !0, i = e), s.selected = !0;
                } else {
                    var n = this._children.length;
                    for (e = 0; e < n; e++) {
                        var a = this._children[e];
                        a instanceof t.GButton && !a.selected && (a.selected = !0, i = e);
                    }
                }
                -1 != i && this.updateSelectionController(i);
            }
        }, {
            key: "selectNone",
            value: function() {
                this.clearSelection();
            }
        }, {
            key: "selectReverse",
            value: function() {
                this.checkVirtualList();
                var e, i = -1;
                if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
                    var s = this._virtualItems[e];
                    s.obj instanceof t.GButton && (s.obj.selected = !s.obj.selected, s.obj.selected && (i = e)), 
                    s.selected = !s.selected;
                } else {
                    var n = this._children.length;
                    for (e = 0; e < n; e++) {
                        var a = this._children[e];
                        a instanceof t.GButton && (a.selected = !a.selected, a.selected && (i = e));
                    }
                }
                -1 != i && this.updateSelectionController(i);
            }
        }, {
            key: "handleArrowKey",
            value: function(e) {
                var i = this.selectedIndex;
                if (-1 != i) switch (e) {
                  case 1:
                    if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowVertical) --i >= 0 && (this.clearSelection(), 
                    this.addSelection(i, !0)); else if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) {
                        for (var s = this._children[i], n = 0, a = i - 1; a >= 0; a--) {
                            var o = this._children[a];
                            if (o.y != s.y) {
                                s = o;
                                break;
                            }
                            n++;
                        }
                        for (;a >= 0; a--) if ((o = this._children[a]).y != s.y) {
                            this.clearSelection(), this.addSelection(a + n + 1, !0);
                            break;
                        }
                    }
                    break;

                  case 3:
                    if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) ++i < this.numItems && (this.clearSelection(), 
                    this.addSelection(i, !0)); else if (this._layout == t.ListLayoutType.FlowVertical) {
                        s = this._children[i], n = 0;
                        var h = this._children.length;
                        for (a = i + 1; a < h; a++) {
                            if ((o = this._children[a]).x != s.x) {
                                s = o;
                                break;
                            }
                            n++;
                        }
                        for (;a < h; a++) if ((o = this._children[a]).x != s.x) {
                            this.clearSelection(), this.addSelection(a - n - 1, !0);
                            break;
                        }
                    }
                    break;

                  case 5:
                    if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowVertical) ++i < this.numItems && (this.clearSelection(), 
                    this.addSelection(i, !0)); else if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) {
                        for (s = this._children[i], n = 0, h = this._children.length, a = i + 1; a < h; a++) {
                            if ((o = this._children[a]).y != s.y) {
                                s = o;
                                break;
                            }
                            n++;
                        }
                        for (;a < h; a++) if ((o = this._children[a]).y != s.y) {
                            this.clearSelection(), this.addSelection(a - n - 1, !0);
                            break;
                        }
                    }
                    break;

                  case 7:
                    if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.Pagination) --i >= 0 && (this.clearSelection(), 
                    this.addSelection(i, !0)); else if (this._layout == t.ListLayoutType.FlowVertical) {
                        for (s = this._children[i], n = 0, a = i - 1; a >= 0; a--) {
                            if ((o = this._children[a]).x != s.x) {
                                s = o;
                                break;
                            }
                            n++;
                        }
                        for (;a >= 0; a--) if ((o = this._children[a]).x != s.x) {
                            this.clearSelection(), this.addSelection(a + n + 1, !0);
                            break;
                        }
                    }
                }
            }
        }, {
            key: "__clickItem",
            value: function(e) {
                if (!this._scrollPane || !this._scrollPane.isDragged) {
                    var i = t.GObject.cast(e.currentTarget);
                    this.setSelectionOnEvent(i, e), this._scrollPane && this.scrollItemToViewOnClick && this._scrollPane.scrollToView(i, !0), 
                    this.dispatchItemEvent(i, t.Events.createEvent(t.Events.CLICK_ITEM, this.displayObject, e));
                }
            }
        }, {
            key: "dispatchItemEvent",
            value: function(e, i) {
                this.displayObject.event(t.Events.CLICK_ITEM, [ e, i ]);
            }
        }, {
            key: "setSelectionOnEvent",
            value: function(e, i) {
                if (e instanceof t.GButton && this._selectionMode != t.ListSelectionMode.None) {
                    var s = !1, n = this.childIndexToItemIndex(this.getChildIndex(e));
                    if (this._selectionMode == t.ListSelectionMode.Single) e.selected || (this.clearSelectionExcept(e), 
                    e.selected = !0); else if (i.shiftKey) {
                        if (!e.selected) if (-1 != this._lastSelectedIndex) {
                            var a, o = Math.min(this._lastSelectedIndex, n), h = Math.max(this._lastSelectedIndex, n);
                            if (h = Math.min(h, this.numItems - 1), this._virtual) for (a = o; a <= h; a++) {
                                var r = this._virtualItems[a];
                                r.obj instanceof t.GButton && (r.obj.selected = !0), r.selected = !0;
                            } else for (a = o; a <= h; a++) {
                                var l = this.getChildAt(a);
                                l instanceof t.GButton && (l.selected = !0);
                            }
                            s = !0;
                        } else e.selected = !0;
                    } else i.ctrlKey || this._selectionMode == t.ListSelectionMode.Multiple_SingleClick ? e.selected = !e.selected : e.selected ? this.clearSelectionExcept(e) : (this.clearSelectionExcept(e), 
                    e.selected = !0);
                    s || (this._lastSelectedIndex = n), e.selected && this.updateSelectionController(n);
                }
            }
        }, {
            key: "resizeToFit",
            value: function(e, i) {
                null == e && (e = 1e5), i = i || 0, this.ensureBoundsCorrect();
                var s = this.numItems;
                if (e > s && (e = s), this._virtual) {
                    var n = Math.ceil(e / this._curLineItemCount);
                    this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = n * this._itemSize.y + Math.max(0, n - 1) * this._lineGap : this.viewWidth = n * this._itemSize.x + Math.max(0, n - 1) * this._columnGap;
                } else if (0 == e) this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = i : this.viewWidth = i; else {
                    for (var a = e - 1, o = null; a >= 0 && (o = this.getChildAt(a), this.foldInvisibleItems && !o.visible); ) a--;
                    if (a < 0) this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? this.viewHeight = i : this.viewWidth = i; else {
                        var h = 0;
                        this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? ((h = o.y + o.height) < i && (h = i), 
                        this.viewHeight = h) : ((h = o.x + o.width) < i && (h = i), this.viewWidth = h);
                    }
                }
            }
        }, {
            key: "getMaxItemWidth",
            value: function() {
                for (var t = this._children.length, e = 0, i = 0; i < t; i++) {
                    var s = this.getChildAt(i);
                    s.width > e && (e = s.width);
                }
                return e;
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0);
            }
        }, {
            key: "handleControllerChanged",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleControllerChanged", this).call(this, t), 
                this._selectionController == t && (this.selectedIndex = t.selectedIndex);
            }
        }, {
            key: "updateSelectionController",
            value: function(t) {
                if (this._selectionController && !this._selectionController.changing && t < this._selectionController.pageCount) {
                    var e = this._selectionController;
                    this._selectionController = null, e.selectedIndex = t, this._selectionController = e;
                }
            }
        }, {
            key: "shouldSnapToNext",
            value: function(e, i, s) {
                return e < 0 && i > t.UIConfig.defaultScrollSnappingThreshold * s || e > 0 && i > (1 - t.UIConfig.defaultScrollSnappingThreshold) * s || 0 == e && i > s / 2;
            }
        }, {
            key: "getSnappingPositionWithDir",
            value: function(e, i, a, h, r) {
                var l, u, _;
                return this._virtual ? (r || (r = new Laya.Point()), this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? (l = i, 
                B = i, u = this.getIndexOnPos1(!1), i = B, u < this._virtualItems.length && u < this._realNumItems && (_ = this._virtualItems[u].height, 
                this.shouldSnapToNext(h, l - i, _) && (i += _ + this._lineGap))) : this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical ? (l = e, 
                B = e, u = this.getIndexOnPos2(!1), e = B, u < this._virtualItems.length && u < this._realNumItems && (_ = this._virtualItems[u].width, 
                this.shouldSnapToNext(a, l - e, _) && (e += _ + this._columnGap))) : (l = e, B = e, 
                u = this.getIndexOnPos3(!1), e = B, u < this._virtualItems.length && u < this._realNumItems && (_ = this._virtualItems[u].width, 
                this.shouldSnapToNext(a, l - e, _) && (e += _ + this._columnGap))), r.x = e, r.y = i, 
                r) : (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getSnappingPositionWithDir", this).call(this, e, i, a, h, r);
            }
        }, {
            key: "scrollToView",
            value: function(e, i, s) {
                if (this._virtual) {
                    if (0 == this._numItems) return;
                    if (this.checkVirtualList(), e >= this._virtualItems.length) throw new Error("Invalid child index: " + e + ">" + this._virtualItems.length);
                    var n;
                    this._loop && (e = Math.floor(this._firstIndex / this._numItems) * this._numItems + e);
                    var a, o = this._virtualItems[e], h = 0;
                    if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
                        for (a = this._curLineItemCount - 1; a < e; a += this._curLineItemCount) h += this._virtualItems[a].height + this._lineGap;
                        n = new Laya.Rectangle(0, h, this._itemSize.x, o.height);
                    } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
                        for (a = this._curLineItemCount - 1; a < e; a += this._curLineItemCount) h += this._virtualItems[a].width + this._columnGap;
                        n = new Laya.Rectangle(h, 0, o.width, this._itemSize.y);
                    } else {
                        var r = e / (this._curLineItemCount * this._curLineItemCount2);
                        n = new Laya.Rectangle(r * this.viewWidth + e % this._curLineItemCount * (o.width + this._columnGap), e / this._curLineItemCount % this._curLineItemCount2 * (o.height + this._lineGap), o.width, o.height);
                    }
                    this._scrollPane && this._scrollPane.scrollToView(n, i, s);
                } else {
                    var l = this.getChildAt(e);
                    this._scrollPane ? this._scrollPane.scrollToView(l, i, s) : this._parent && this._parent.scrollPane && this._parent.scrollPane.scrollToView(l, i, s);
                }
            }
        }, {
            key: "getFirstChildInView",
            value: function() {
                return this.childIndexToItemIndex((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getFirstChildInView", this).call(this));
            }
        }, {
            key: "childIndexToItemIndex",
            value: function(e) {
                if (!this._virtual) return e;
                if (this._layout == t.ListLayoutType.Pagination) {
                    for (var i = this._firstIndex; i < this._realNumItems; i++) if (this._virtualItems[i].obj && --e < 0) return i;
                    return e;
                }
                return e += this._firstIndex, this._loop && this._numItems > 0 && (e %= this._numItems), 
                e;
            }
        }, {
            key: "itemIndexToChildIndex",
            value: function(e) {
                if (!this._virtual) return e;
                if (this._layout == t.ListLayoutType.Pagination) return this.getChildIndex(this._virtualItems[e].obj);
                if (this._loop && this._numItems > 0) {
                    var i = this._firstIndex % this._numItems;
                    e >= i ? e -= i : e = this._numItems - i + e;
                } else e -= this._firstIndex;
                return e;
            }
        }, {
            key: "setVirtual",
            value: function() {
                this._setVirtual(!1);
            }
        }, {
            key: "setVirtualAndLoop",
            value: function() {
                this._setVirtual(!0);
            }
        }, {
            key: "_setVirtual",
            value: function(e) {
                if (!this._virtual) {
                    if (null == this._scrollPane) throw new Error("Virtual list must be scrollable!");
                    if (e) {
                        if (this._layout == t.ListLayoutType.FlowHorizontal || this._layout == t.ListLayoutType.FlowVertical) throw new Error("Loop list instanceof not supported for FlowHorizontal or FlowVertical this.layout!");
                        this._scrollPane.bouncebackEffect = !1;
                    }
                    if (this._virtual = !0, this._loop = e, this._virtualItems = new Array(), this.removeChildrenToPool(), 
                    null == this._itemSize) {
                        this._itemSize = new Laya.Point();
                        var i = this.getFromPool(null);
                        if (null == i) throw new Error("Virtual List must have a default list item resource.");
                        this._itemSize.x = i.width, this._itemSize.y = i.height, this.returnToPool(i);
                    }
                    this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal ? (this._scrollPane.scrollStep = this._itemSize.y, 
                    this._loop && (this._scrollPane._loop = 2)) : (this._scrollPane.scrollStep = this._itemSize.x, 
                    this._loop && (this._scrollPane._loop = 1)), this.on(t.Events.SCROLL, this, this.__scrolled), 
                    this.setVirtualListChangedFlag(!0);
                }
            }
        }, {
            key: "refreshVirtualList",
            value: function() {
                this.setVirtualListChangedFlag(!1);
            }
        }, {
            key: "checkVirtualList",
            value: function() {
                0 != this._virtualListChanged && (this._refreshVirtualList(), Laya.timer.clear(this, this._refreshVirtualList));
            }
        }, {
            key: "setVirtualListChangedFlag",
            value: function(t) {
                t ? this._virtualListChanged = 2 : 0 == this._virtualListChanged && (this._virtualListChanged = 1), 
                Laya.timer.callLater(this, this._refreshVirtualList);
            }
        }, {
            key: "_refreshVirtualList",
            value: function() {
                if (this._displayObject) {
                    var e = 2 == this._virtualListChanged;
                    this._virtualListChanged = 0, this._eventLocked = !0, e && (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.SingleRow ? this._curLineItemCount = 1 : this._layout == t.ListLayoutType.FlowHorizontal ? this._columnCount > 0 ? this._curLineItemCount = this._columnCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap)), 
                    this._curLineItemCount <= 0 && (this._curLineItemCount = 1)) : this._layout == t.ListLayoutType.FlowVertical ? this._lineCount > 0 ? this._curLineItemCount = this._lineCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap)), 
                    this._curLineItemCount <= 0 && (this._curLineItemCount = 1)) : (this._columnCount > 0 ? this._curLineItemCount = this._columnCount : (this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap)), 
                    this._curLineItemCount <= 0 && (this._curLineItemCount = 1)), this._lineCount > 0 ? this._curLineItemCount2 = this._lineCount : (this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap)), 
                    this._curLineItemCount2 <= 0 && (this._curLineItemCount2 = 1))));
                    var i = 0, s = 0;
                    if (this._realNumItems > 0) {
                        var n, a = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount, o = Math.min(this._curLineItemCount, this._realNumItems);
                        if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
                            for (n = 0; n < a; n += this._curLineItemCount) i += this._virtualItems[n].height + this._lineGap;
                            if (i > 0 && (i -= this._lineGap), this._autoResizeItem) s = this._scrollPane.viewWidth; else {
                                for (n = 0; n < o; n++) s += this._virtualItems[n].width + this._columnGap;
                                s > 0 && (s -= this._columnGap);
                            }
                        } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
                            for (n = 0; n < a; n += this._curLineItemCount) s += this._virtualItems[n].width + this._columnGap;
                            if (s > 0 && (s -= this._columnGap), this._autoResizeItem) i = this._scrollPane.viewHeight; else {
                                for (n = 0; n < o; n++) i += this._virtualItems[n].height + this._lineGap;
                                i > 0 && (i -= this._lineGap);
                            }
                        } else s = Math.ceil(a / (this._curLineItemCount * this._curLineItemCount2)) * this.viewWidth, 
                        i = this.viewHeight;
                    }
                    this.handleAlign(s, i), this._scrollPane.setContentSize(s, i), this._eventLocked = !1, 
                    this.handleScroll(!0);
                }
            }
        }, {
            key: "__scrolled",
            value: function(t) {
                this.handleScroll(!1);
            }
        }, {
            key: "getIndexOnPos1",
            value: function(t) {
                if (this._realNumItems < this._curLineItemCount) return B = 0, 0;
                var e, i, s;
                if (this.numChildren > 0 && !t) {
                    if ((i = this.getChildAt(0).y) > B) {
                        for (e = this._firstIndex - this._curLineItemCount; e >= 0; e -= this._curLineItemCount) if ((i -= this._virtualItems[e].height + this._lineGap) <= B) return B = i, 
                        e;
                        return B = 0, 0;
                    }
                    for (e = this._firstIndex; e < this._realNumItems; e += this._curLineItemCount) {
                        if ((s = i + this._virtualItems[e].height + this._lineGap) > B) return B = i, e;
                        i = s;
                    }
                    return B = i, this._realNumItems - this._curLineItemCount;
                }
                for (i = 0, e = 0; e < this._realNumItems; e += this._curLineItemCount) {
                    if ((s = i + this._virtualItems[e].height + this._lineGap) > B) return B = i, e;
                    i = s;
                }
                return B = i, this._realNumItems - this._curLineItemCount;
            }
        }, {
            key: "getIndexOnPos2",
            value: function(t) {
                if (this._realNumItems < this._curLineItemCount) return B = 0, 0;
                var e, i, s;
                if (this.numChildren > 0 && !t) {
                    if ((i = this.getChildAt(0).x) > B) {
                        for (e = this._firstIndex - this._curLineItemCount; e >= 0; e -= this._curLineItemCount) if ((i -= this._virtualItems[e].width + this._columnGap) <= B) return B = i, 
                        e;
                        return B = 0, 0;
                    }
                    for (e = this._firstIndex; e < this._realNumItems; e += this._curLineItemCount) {
                        if ((s = i + this._virtualItems[e].width + this._columnGap) > B) return B = i, e;
                        i = s;
                    }
                    return B = i, this._realNumItems - this._curLineItemCount;
                }
                for (i = 0, e = 0; e < this._realNumItems; e += this._curLineItemCount) {
                    if ((s = i + this._virtualItems[e].width + this._columnGap) > B) return B = i, e;
                    i = s;
                }
                return B = i, this._realNumItems - this._curLineItemCount;
            }
        }, {
            key: "getIndexOnPos3",
            value: function(t) {
                if (this._realNumItems < this._curLineItemCount) return B = 0, 0;
                var e, i, s = this.viewWidth, n = Math.floor(B / s), a = n * (this._curLineItemCount * this._curLineItemCount2), o = n * s;
                for (e = 0; e < this._curLineItemCount; e++) {
                    if ((i = o + this._virtualItems[a + e].width + this._columnGap) > B) return B = o, 
                    a + e;
                    o = i;
                }
                return B = o, a + this._curLineItemCount - 1;
            }
        }, {
            key: "handleScroll",
            value: function(e) {
                if (!this._eventLocked) {
                    if (this._layout == t.ListLayoutType.SingleColumn || this._layout == t.ListLayoutType.FlowHorizontal) {
                        for (var i = 0; this.handleScroll1(e); ) if (e = !1, ++i > 20) {
                            console.log("FairyGUI: list will never be <the> filled item renderer function always returns a different size.");
                            break;
                        }
                        this.handleArchOrder1();
                    } else if (this._layout == t.ListLayoutType.SingleRow || this._layout == t.ListLayoutType.FlowVertical) {
                        for (i = 0; this.handleScroll2(e); ) if (e = !1, ++i > 20) {
                            console.log("FairyGUI: list will never be <the> filled item renderer function always returns a different size.");
                            break;
                        }
                        this.handleArchOrder2();
                    } else this.handleScroll3(e);
                    this._boundsChanged = !1;
                }
            }
        }, {
            key: "handleScroll1",
            value: function(e) {
                var i = this._scrollPane.scrollingPosY, s = i + this._scrollPane.viewHeight, n = s == this._scrollPane.contentHeight;
                B = i;
                var a = this.getIndexOnPos1(e);
                if (i = B, a == this._firstIndex && !e) return !1;
                var o = this._firstIndex;
                this._firstIndex = a;
                var h, r, l, u, _, c = a, d = o > a, g = this.numChildren, f = o + g - 1, p = d ? f : o, y = 0, v = i, m = 0, k = 0, w = this._defaultItem, C = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
                for (this.itemInfoVer++; c < this._realNumItems && (n || v < s); ) {
                    if ((null == (r = this._virtualItems[c]).obj || e) && (null != this.itemProvider && (null == (w = this.itemProvider.runWith(c % this._numItems)) && (w = this._defaultItem), 
                    w = t.UIPackage.normalizeURL(w)), r.obj && r.obj.resourceURL != w && (r.obj instanceof t.GButton && (r.selected = r.obj.selected), 
                    this.removeChildToPool(r.obj), r.obj = null)), null == r.obj) {
                        if (d) {
                            for (_ = p; _ >= o; _--) if ((l = this._virtualItems[_]).obj && l.updateFlag != this.itemInfoVer && l.obj.resourceURL == w) {
                                l.obj instanceof t.GButton && (l.selected = l.obj.selected), r.obj = l.obj, l.obj = null, 
                                _ == p && p--;
                                break;
                            }
                        } else for (_ = p; _ <= f; _++) if ((l = this._virtualItems[_]).obj && l.updateFlag != this.itemInfoVer && l.obj.resourceURL == w) {
                            l.obj instanceof t.GButton && (l.selected = l.obj.selected), r.obj = l.obj, l.obj = null, 
                            _ == p && p++;
                            break;
                        }
                        r.obj ? this.setChildIndex(r.obj, d ? c - a : this.numChildren) : (r.obj = this._pool.getObject(w), 
                        d ? this.addChildAt(r.obj, c - a) : this.addChild(r.obj)), r.obj instanceof t.GButton && (r.obj.selected = r.selected), 
                        h = !0;
                    } else h = e;
                    h && (this._autoResizeItem && (this._layout == t.ListLayoutType.SingleColumn || this._columnCount > 0) && r.obj.setSize(C, r.obj.height, !0), 
                    this.itemRenderer.runWith([ c % this._numItems, r.obj ]), c % this._curLineItemCount == 0 && (m += Math.ceil(r.obj.height) - r.height, 
                    c == a && o > a && (k = Math.ceil(r.obj.height) - r.height)), r.width = Math.ceil(r.obj.width), 
                    r.height = Math.ceil(r.obj.height)), r.updateFlag = this.itemInfoVer, r.obj.setXY(y, v), 
                    c == a && (s += r.height), y += r.width + this._columnGap, c % this._curLineItemCount == this._curLineItemCount - 1 && (y = 0, 
                    v += r.height + this._lineGap), c++;
                }
                for (u = 0; u < g; u++) (r = this._virtualItems[o + u]).updateFlag != this.itemInfoVer && r.obj && (r.obj instanceof t.GButton && (r.selected = r.obj.selected), 
                this.removeChildToPool(r.obj), r.obj = null);
                for (g = this._children.length, u = 0; u < g; u++) {
                    var b = this._virtualItems[a + u].obj;
                    this._children[u] != b && this.setChildIndex(b, u);
                }
                return 0 == m && 0 == k || this._scrollPane.changeContentSizeOnScrolling(0, m, 0, k), 
                c > 0 && this.numChildren > 0 && this._container.y <= 0 && this.getChildAt(0).y > -this._container.y;
            }
        }, {
            key: "handleScroll2",
            value: function(e) {
                var i = this._scrollPane.scrollingPosX, s = i + this._scrollPane.viewWidth, n = i == this._scrollPane.contentWidth;
                B = i;
                var a = this.getIndexOnPos2(e);
                if (i = B, a == this._firstIndex && !e) return !1;
                var o = this._firstIndex;
                this._firstIndex = a;
                var h, r, l, u, _, c = a, d = o > a, g = this.numChildren, f = o + g - 1, p = d ? f : o, y = i, v = 0, m = 0, k = 0, w = this._defaultItem, C = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
                for (this.itemInfoVer++; c < this._realNumItems && (n || y < s); ) {
                    if ((null == (r = this._virtualItems[c]).obj || e) && (null != this.itemProvider && (null == (w = this.itemProvider.runWith(c % this._numItems)) && (w = this._defaultItem), 
                    w = t.UIPackage.normalizeURL(w)), r.obj && r.obj.resourceURL != w && (r.obj instanceof t.GButton && (r.selected = r.obj.selected), 
                    this.removeChildToPool(r.obj), r.obj = null)), null == r.obj) {
                        if (d) {
                            for (_ = p; _ >= o; _--) if ((l = this._virtualItems[_]).obj && l.updateFlag != this.itemInfoVer && l.obj.resourceURL == w) {
                                l.obj instanceof t.GButton && (l.selected = l.obj.selected), r.obj = l.obj, l.obj = null, 
                                _ == p && p--;
                                break;
                            }
                        } else for (_ = p; _ <= f; _++) if ((l = this._virtualItems[_]).obj && l.updateFlag != this.itemInfoVer && l.obj.resourceURL == w) {
                            l.obj instanceof t.GButton && (l.selected = l.obj.selected), r.obj = l.obj, l.obj = null, 
                            _ == p && p++;
                            break;
                        }
                        r.obj ? this.setChildIndex(r.obj, d ? c - a : this.numChildren) : (r.obj = this._pool.getObject(w), 
                        d ? this.addChildAt(r.obj, c - a) : this.addChild(r.obj)), r.obj instanceof t.GButton && (r.obj.selected = r.selected), 
                        h = !0;
                    } else h = e;
                    h && (this._autoResizeItem && (this._layout == t.ListLayoutType.SingleRow || this._lineCount > 0) && r.obj.setSize(r.obj.width, C, !0), 
                    this.itemRenderer.runWith([ c % this._numItems, r.obj ]), c % this._curLineItemCount == 0 && (m += Math.ceil(r.obj.width) - r.width, 
                    c == a && o > a && (k = Math.ceil(r.obj.width) - r.width)), r.width = Math.ceil(r.obj.width), 
                    r.height = Math.ceil(r.obj.height)), r.updateFlag = this.itemInfoVer, r.obj.setXY(y, v), 
                    c == a && (s += r.width), v += r.height + this._lineGap, c % this._curLineItemCount == this._curLineItemCount - 1 && (v = 0, 
                    y += r.width + this._columnGap), c++;
                }
                for (u = 0; u < g; u++) (r = this._virtualItems[o + u]).updateFlag != this.itemInfoVer && r.obj && (r.obj instanceof t.GButton && (r.selected = r.obj.selected), 
                this.removeChildToPool(r.obj), r.obj = null);
                for (g = this._children.length, u = 0; u < g; u++) {
                    var b = this._virtualItems[a + u].obj;
                    this._children[u] != b && this.setChildIndex(b, u);
                }
                return 0 == m && 0 == k || this._scrollPane.changeContentSizeOnScrolling(m, 0, k, 0), 
                c > 0 && this.numChildren > 0 && this._container.x <= 0 && this.getChildAt(0).x > -this._container.x;
            }
        }, {
            key: "handleScroll3",
            value: function(e) {
                var i = this._scrollPane.scrollingPosX;
                B = i;
                var s = this.getIndexOnPos3(e);
                if (i = B, s != this._firstIndex || e) {
                    var n = this._firstIndex;
                    this._firstIndex = s;
                    var a, o, h, r, l, u = n, _ = this._virtualItems.length, c = this._curLineItemCount * this._curLineItemCount2, d = s % this._curLineItemCount, g = this.viewWidth, f = Math.floor(s / c) * c, p = f + 2 * c, y = this._defaultItem, v = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount, m = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
                    for (this.itemInfoVer++, o = f; o < p; o++) if (!(o >= this._realNumItems)) {
                        if (l = o % this._curLineItemCount, o - f < c) {
                            if (l < d) continue;
                        } else if (l > d) continue;
                        (h = this._virtualItems[o]).updateFlag = this.itemInfoVer;
                    }
                    var k = null, w = 0;
                    for (o = f; o < p; o++) if (!(o >= this._realNumItems) && (h = this._virtualItems[o]).updateFlag == this.itemInfoVer) {
                        if (null == h.obj) {
                            for (;u < _; ) {
                                if ((r = this._virtualItems[u]).obj && r.updateFlag != this.itemInfoVer) {
                                    r.obj instanceof t.GButton && (r.selected = r.obj.selected), h.obj = r.obj, r.obj = null;
                                    break;
                                }
                                u++;
                            }
                            -1 == w && (w = this.getChildIndex(k) + 1), null == h.obj ? (null != this.itemProvider && (null == (y = this.itemProvider.runWith(o % this._numItems)) && (y = this._defaultItem), 
                            y = t.UIPackage.normalizeURL(y)), h.obj = this._pool.getObject(y), this.addChildAt(h.obj, w)) : w = this.setChildIndexBefore(h.obj, w), 
                            w++, h.obj instanceof t.GButton && (h.obj.selected = h.selected), a = !0;
                        } else a = e, w = -1, k = h.obj;
                        a && (this._autoResizeItem && (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount ? h.obj.setSize(v, m, !0) : this._curLineItemCount == this._columnCount ? h.obj.setSize(v, h.obj.height, !0) : this._curLineItemCount2 == this._lineCount && h.obj.setSize(h.obj.width, m, !0)), 
                        this.itemRenderer.runWith([ o % this._numItems, h.obj ]), h.width = Math.ceil(h.obj.width), 
                        h.height = Math.ceil(h.obj.height));
                    }
                    var C = f / c * g, b = C, S = 0, x = 0;
                    for (o = f; o < p; o++) o >= this._realNumItems || ((h = this._virtualItems[o]).updateFlag == this.itemInfoVer && h.obj.setXY(b, S), 
                    h.height > x && (x = h.height), o % this._curLineItemCount == this._curLineItemCount - 1 ? (b = C, 
                    S += x + this._lineGap, x = 0, o == f + c - 1 && (b = C += g, S = 0)) : b += h.width + this._columnGap);
                    for (o = u; o < _; o++) (h = this._virtualItems[o]).updateFlag != this.itemInfoVer && h.obj && (h.obj instanceof t.GButton && (h.selected = h.obj.selected), 
                    this.removeChildToPool(h.obj), h.obj = null);
                }
            }
        }, {
            key: "handleArchOrder1",
            value: function() {
                if (this.childrenRenderOrder == t.ChildrenRenderOrder.Arch) {
                    for (var e = this._scrollPane.posY + this.viewHeight / 2, i = Number.POSITIVE_INFINITY, s = 0, n = 0, a = this.numChildren, o = 0; o < a; o++) {
                        var h = this.getChildAt(o);
                        this.foldInvisibleItems && !h.visible || (s = Math.abs(e - h.y - h.height / 2)) < i && (i = s, 
                        n = o);
                    }
                    this.apexIndex = n;
                }
            }
        }, {
            key: "handleArchOrder2",
            value: function() {
                if (this.childrenRenderOrder == t.ChildrenRenderOrder.Arch) {
                    for (var e = this._scrollPane.posX + this.viewWidth / 2, i = Number.POSITIVE_INFINITY, s = 0, n = 0, a = this.numChildren, o = 0; o < a; o++) {
                        var h = this.getChildAt(o);
                        this.foldInvisibleItems && !h.visible || (s = Math.abs(e - h.x - h.width / 2)) < i && (i = s, 
                        n = o);
                    }
                    this.apexIndex = n;
                }
            }
        }, {
            key: "handleAlign",
            value: function(t, e) {
                var i = 0, s = 0;
                e < this.viewHeight && ("middle" == this._verticalAlign ? s = Math.floor((this.viewHeight - e) / 2) : "bottom" == this._verticalAlign && (s = this.viewHeight - e)), 
                t < this.viewWidth && ("center" == this._align ? i = Math.floor((this.viewWidth - t) / 2) : "right" == this._align && (i = this.viewWidth - t)), 
                i == this._alignOffset.x && s == this._alignOffset.y || (this._alignOffset.setTo(i, s), 
                this._scrollPane ? this._scrollPane.adjustMaskContainer() : this._container.pos(this._margin.left + this._alignOffset.x, this._margin.top + this._alignOffset.y));
            }
        }, {
            key: "updateBounds",
            value: function() {
                if (!this._virtual) {
                    var e, i, s, n, a, o = 0, h = 0, r = 0, l = 0, u = 0, _ = 0, c = 0, d = this._children.length, g = this.viewWidth, f = this.viewHeight, p = 0, y = 0;
                    if (this._layout == t.ListLayoutType.SingleColumn) {
                        for (e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != h && (h += this._lineGap), 
                        i.y = h, this._autoResizeItem && i.setSize(g, i.height, !0), h += Math.ceil(i.height), 
                        i.width > r && (r = i.width));
                        if ((n = h) <= f && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.vtScrollBar) for (g += this._scrollPane.vtScrollBar.width, 
                        e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (i.setSize(g, i.height, !0), 
                        i.width > r && (r = i.width));
                        s = Math.ceil(r);
                    } else if (this._layout == t.ListLayoutType.SingleRow) {
                        for (e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), 
                        i.x = o, this._autoResizeItem && i.setSize(i.width, f, !0), o += Math.ceil(i.width), 
                        i.height > l && (l = i.height));
                        if ((s = o) <= g && this._autoResizeItem && this._scrollPane && this._scrollPane._displayInDemand && this._scrollPane.hzScrollBar) for (f += this._scrollPane.hzScrollBar.height, 
                        e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (i.setSize(i.width, f, !0), 
                        i.height > l && (l = i.height));
                        n = Math.ceil(l);
                    } else if (this._layout == t.ListLayoutType.FlowHorizontal) if (this._autoResizeItem && this._columnCount > 0) {
                        for (e = 0; e < d; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (p += i.sourceWidth, 
                        ++u == this._columnCount || e == d - 1)) {
                            for (a = (g - p - (u - 1) * this._columnGap) / p, o = 0, u = y; u <= e; u++) i = this.getChildAt(u), 
                            this.foldInvisibleItems && !i.visible || (i.setXY(o, h), u < e ? (i.setSize(i.sourceWidth + Math.round(i.sourceWidth * a), i.height, !0), 
                            o += Math.ceil(i.width) + this._columnGap) : i.setSize(g - o, i.height, !0), i.height > l && (l = i.height));
                            h += Math.ceil(l) + this._lineGap, l = 0, u = 0, y = e + 1, p = 0;
                        }
                        n = h + Math.ceil(l), s = g;
                    } else {
                        for (e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), 
                        (0 != this._columnCount && u >= this._columnCount || 0 == this._columnCount && o + i.width > g && 0 != l) && (o = 0, 
                        h += Math.ceil(l) + this._lineGap, l = 0, u = 0), i.setXY(o, h), (o += Math.ceil(i.width)) > r && (r = o), 
                        i.height > l && (l = i.height), u++);
                        n = h + Math.ceil(l), s = Math.ceil(r);
                    } else if (this._layout == t.ListLayoutType.FlowVertical) if (this._autoResizeItem && this._lineCount > 0) {
                        for (e = 0; e < d; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (p += i.sourceHeight, 
                        ++u == this._lineCount || e == d - 1)) {
                            for (a = (f - p - (u - 1) * this._lineGap) / p, h = 0, u = y; u <= e; u++) i = this.getChildAt(u), 
                            this.foldInvisibleItems && !i.visible || (i.setXY(o, h), u < e ? (i.setSize(i.width, i.sourceHeight + Math.round(i.sourceHeight * a), !0), 
                            h += Math.ceil(i.height) + this._lineGap) : i.setSize(i.width, f - h, !0), i.width > r && (r = i.width));
                            o += Math.ceil(r) + this._columnGap, r = 0, u = 0, y = e + 1, p = 0;
                        }
                        s = o + Math.ceil(r), n = f;
                    } else {
                        for (e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != h && (h += this._lineGap), 
                        (0 != this._lineCount && u >= this._lineCount || 0 == this._lineCount && h + i.height > f && 0 != r) && (h = 0, 
                        o += Math.ceil(r) + this._columnGap, r = 0, u = 0), i.setXY(o, h), (h += Math.ceil(i.height)) > l && (l = h), 
                        i.width > r && (r = i.width), u++);
                        s = o + Math.ceil(r), n = Math.ceil(l);
                    } else {
                        var v;
                        if (this._autoResizeItem && this._lineCount > 0 && (v = Math.floor((f - (this._lineCount - 1) * this._lineGap) / this._lineCount)), 
                        this._autoResizeItem && this._columnCount > 0) {
                            for (e = 0; e < d; e++) if (i = this.getChildAt(e), (!this.foldInvisibleItems || i.visible) && (0 == u && (0 != this._lineCount && c >= this._lineCount || 0 == this._lineCount && h + i.height > f) && (_++, 
                            h = 0, c = 0), p += i.sourceWidth, ++u == this._columnCount || e == d - 1)) {
                                for (a = (g - p - (u - 1) * this._columnGap) / p, o = 0, u = y; u <= e; u++) i = this.getChildAt(u), 
                                this.foldInvisibleItems && !i.visible || (i.setXY(_ * g + o, h), u < e ? (i.setSize(i.sourceWidth + Math.round(i.sourceWidth * a), this._lineCount > 0 ? v : i.height, !0), 
                                o += Math.ceil(i.width) + this._columnGap) : i.setSize(g - o, this._lineCount > 0 ? v : i.height, !0), 
                                i.height > l && (l = i.height));
                                h += Math.ceil(l) + this._lineGap, l = 0, u = 0, y = e + 1, p = 0, c++;
                            }
                        } else for (e = 0; e < d; e++) i = this.getChildAt(e), this.foldInvisibleItems && !i.visible || (0 != o && (o += this._columnGap), 
                        this._autoResizeItem && this._lineCount > 0 && i.setSize(i.width, v, !0), (0 != this._columnCount && u >= this._columnCount || 0 == this._columnCount && o + i.width > g && 0 != l) && (o = 0, 
                        h += Math.ceil(l) + this._lineGap, l = 0, u = 0, c++, (0 != this._lineCount && c >= this._lineCount || 0 == this._lineCount && h + i.height > f && 0 != r) && (_++, 
                        h = 0, c = 0)), i.setXY(_ * g + o, h), (o += Math.ceil(i.width)) > r && (r = o), 
                        i.height > l && (l = i.height), u++);
                        n = _ > 0 ? f : h + Math.ceil(l), s = (_ + 1) * g;
                    }
                    this.handleAlign(s, n), this.setBounds(0, 0, s, n);
                }
            }
        }, {
            key: "setup_beforeAdd",
            value: function(e, i) {
                var a;
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, e, i), 
                e.seek(i, 5), this._layout = e.readByte(), this._selectionMode = e.readByte(), a = e.readByte(), 
                this._align = 0 == a ? "left" : 1 == a ? "center" : "right", a = e.readByte(), this._verticalAlign = 0 == a ? "top" : 1 == a ? "middle" : "bottom", 
                this._lineGap = e.getInt16(), this._columnGap = e.getInt16(), this._lineCount = e.getInt16(), 
                this._columnCount = e.getInt16(), this._autoResizeItem = e.readBool(), this._childrenRenderOrder = e.readByte(), 
                this._apexIndex = e.getInt16(), e.readBool() && (this._margin.top = e.getInt32(), 
                this._margin.bottom = e.getInt32(), this._margin.left = e.getInt32(), this._margin.right = e.getInt32());
                var h = e.readByte();
                if (h == t.OverflowType.Scroll) {
                    var r = e.pos;
                    e.seek(i, 7), this.setupScroll(e), e.pos = r;
                } else this.setupOverflow(h);
                e.readBool() && e.skip(8), e.version >= 2 && (this.scrollItemToViewOnClick = e.readBool(), 
                this.foldInvisibleItems = e.readBool()), e.seek(i, 8), this._defaultItem = e.readS(), 
                this.readItems(e);
            }
        }, {
            key: "readItems",
            value: function(t) {
                var e, i, s, n;
                for (e = t.getInt16(), i = 0; i < e; i++) if (s = t.getInt16(), s += t.pos, null != (n = t.readS()) || (n = this._defaultItem)) {
                    var a = this.getFromPool(n);
                    a && (this.addChild(a), this.setupItem(t, a)), t.pos = s;
                } else t.pos = s;
            }
        }, {
            key: "setupItem",
            value: function(e, i) {
                var s, n, a;
                if (null != (s = e.readS()) && (i.text = s), null != (s = e.readS()) && i instanceof t.GButton && (i.selectedTitle = s), 
                null != (s = e.readS()) && (i.icon = s), null != (s = e.readS()) && i instanceof t.GButton && (i.selectedIcon = s), 
                null != (s = e.readS()) && (i.name = s), i instanceof t.GComponent) {
                    for (n = e.getInt16(), a = 0; a < n; a++) {
                        var o = i.getController(e.readS());
                        s = e.readS(), o && (o.selectedPageId = s);
                    }
                    if (e.version >= 2) for (n = e.getInt16(), a = 0; a < n; a++) {
                        var h = e.readS(), r = e.getInt16(), l = e.readS(), u = i.getChildByPath(h);
                        u && u.setProp(r, l);
                    }
                }
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6);
                var i = t.getInt16();
                -1 != i && (this._selectionController = this._parent.getControllerAt(i));
            }
        }, {
            key: "layout",
            get: function() {
                return this._layout;
            },
            set: function(t) {
                this._layout != t && (this._layout = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "lineCount",
            get: function() {
                return this._lineCount;
            },
            set: function(e) {
                this._lineCount != e && (this._lineCount = e, this._layout != t.ListLayoutType.FlowVertical && this._layout != t.ListLayoutType.Pagination || (this.setBoundsChangedFlag(), 
                this._virtual && this.setVirtualListChangedFlag(!0)));
            }
        }, {
            key: "columnCount",
            get: function() {
                return this._columnCount;
            },
            set: function(e) {
                this._columnCount != e && (this._columnCount = e, this._layout != t.ListLayoutType.FlowHorizontal && this._layout != t.ListLayoutType.Pagination || (this.setBoundsChangedFlag(), 
                this._virtual && this.setVirtualListChangedFlag(!0)));
            }
        }, {
            key: "lineGap",
            get: function() {
                return this._lineGap;
            },
            set: function(t) {
                this._lineGap != t && (this._lineGap = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "columnGap",
            get: function() {
                return this._columnGap;
            },
            set: function(t) {
                this._columnGap != t && (this._columnGap = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "align",
            get: function() {
                return this._align;
            },
            set: function(t) {
                this._align != t && (this._align = t, this.setBoundsChangedFlag(), this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "verticalAlign",
            get: function() {
                return this._verticalAlign;
            },
            set: function(t) {
                this._verticalAlign != t && (this._verticalAlign = t, this.setBoundsChangedFlag(), 
                this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "virtualItemSize",
            get: function() {
                return this._itemSize;
            },
            set: function(t) {
                this._virtual && (null == this._itemSize && (this._itemSize = new Laya.Point()), 
                this._itemSize.setTo(t.x, t.y), this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "defaultItem",
            get: function() {
                return this._defaultItem;
            },
            set: function(e) {
                this._defaultItem = t.UIPackage.normalizeURL(e);
            }
        }, {
            key: "autoResizeItem",
            get: function() {
                return this._autoResizeItem;
            },
            set: function(t) {
                this._autoResizeItem != t && (this._autoResizeItem = t, this.setBoundsChangedFlag(), 
                this._virtual && this.setVirtualListChangedFlag(!0));
            }
        }, {
            key: "selectionMode",
            get: function() {
                return this._selectionMode;
            },
            set: function(t) {
                this._selectionMode = t;
            }
        }, {
            key: "selectionController",
            get: function() {
                return this._selectionController;
            },
            set: function(t) {
                this._selectionController = t;
            }
        }, {
            key: "itemPool",
            get: function() {
                return this._pool;
            }
        }, {
            key: "selectedIndex",
            get: function() {
                var e;
                if (this._virtual) for (e = 0; e < this._realNumItems; e++) {
                    var i = this._virtualItems[e];
                    if (i.obj instanceof t.GButton && i.obj.selected || null == i.obj && i.selected) return this._loop ? e % this._numItems : e;
                } else {
                    var s = this._children.length;
                    for (e = 0; e < s; e++) {
                        var n = this._children[e];
                        if (n instanceof t.GButton && n.selected) return e;
                    }
                }
                return -1;
            },
            set: function(e) {
                e >= 0 && e < this.numItems ? (this._selectionMode != t.ListSelectionMode.Single && this.clearSelection(), 
                this.addSelection(e)) : this.clearSelection();
            }
        }, {
            key: "numItems",
            get: function() {
                return this._virtual ? this._numItems : this._children.length;
            },
            set: function(t) {
                var e;
                if (this._virtual) {
                    if (null == this.itemRenderer) throw new Error("set itemRenderer first!");
                    this._numItems = t, this._loop ? this._realNumItems = 6 * this._numItems : this._realNumItems = this._numItems;
                    var i = this._virtualItems.length;
                    if (this._realNumItems > i) for (e = i; e < this._realNumItems; e++) {
                        var s = {
                            width: this._itemSize.x,
                            height: this._itemSize.y,
                            updateFlag: 0
                        };
                        this._virtualItems.push(s);
                    } else for (e = this._realNumItems; e < i; e++) this._virtualItems[e].selected = !1;
                    0 != this._virtualListChanged && Laya.timer.clear(this, this._refreshVirtualList), 
                    this._refreshVirtualList();
                } else {
                    var n = this._children.length;
                    if (t > n) for (e = n; e < t; e++) null == this.itemProvider ? this.addItemFromPool() : this.addItemFromPool(this.itemProvider.runWith(e)); else this.removeChildrenToPool(t, n);
                    if (null != this.itemRenderer) for (e = 0; e < t; e++) this.itemRenderer.runWith([ e, this.getChildAt(e) ]);
                }
            }
        } ]), s;
    }(t.GComponent);
    var B = 0;
    t.GObjectPool = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._count = 0, this._pool = {};
        }
        return (0, l.default)(e, [ {
            key: "clear",
            value: function() {
                for (var t in this._pool) for (var e = this._pool[t], i = e.length, s = 0; s < i; s++) e[s].dispose();
                this._pool = {}, this._count = 0;
            }
        }, {
            key: "getObject",
            value: function(e) {
                if (null == (e = t.UIPackage.normalizeURL(e))) return null;
                var i = this._pool[e];
                return i && i.length > 0 ? (this._count--, i.shift()) : t.UIPackage.createObjectFromURL(e);
            }
        }, {
            key: "returnObject",
            value: function(t) {
                var e = t.resourceURL;
                if (e) {
                    var i = this._pool[e];
                    null == i && (i = [], this._pool[e] = i), this._count++, i.push(t);
                }
            }
        }, {
            key: "count",
            get: function() {
                return this._count;
            }
        } ]), e;
    }();
    var z = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._url = "", e._fill = t.LoaderFillType.None, 
            e._align = "left", e._valign = "top", e._showErrorSign = !0, e;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "createDisplayObject", this).call(this), 
                this._content = new t.MovieClip(), this._displayObject.addChild(this._content), 
                this._displayObject.mouseEnabled = !0;
            }
        }, {
            key: "dispose",
            value: function() {
                !this._contentItem && this._content.texture && this.freeExternal(this._content.texture), 
                this._content2 && this._content2.dispose(), (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "loadContent",
            value: function() {
                this.clearContent(), this._url && (t.ToolSet.startsWith(this._url, "ui://") ? this.loadFromPackage(this._url) : this.loadExternal());
            }
        }, {
            key: "loadFromPackage",
            value: function(e) {
                if (this._contentItem = t.UIPackage.getItemByURL(e), this._contentItem) if (this._contentItem = this._contentItem.getBranch(), 
                this.sourceWidth = this._contentItem.width, this.sourceHeight = this._contentItem.height, 
                this._contentItem = this._contentItem.getHighResolution(), this._contentItem.load(), 
                this._autoSize && this.setSize(this.sourceWidth, this.sourceHeight), this._contentItem.type == t.PackageItemType.Image) this._contentItem.texture ? (this._content.texture = this._contentItem.texture, 
                this._content.scale9Grid = this._contentItem.scale9Grid, this._content.scaleByTile = this._contentItem.scaleByTile, 
                this._content.tileGridIndice = this._contentItem.tileGridIndice, this.sourceWidth = this._contentItem.width, 
                this.sourceHeight = this._contentItem.height, this.updateLayout()) : this.setErrorState(); else if (this._contentItem.type == t.PackageItemType.MovieClip) this.sourceWidth = this._contentItem.width, 
                this.sourceHeight = this._contentItem.height, this._content.interval = this._contentItem.interval, 
                this._content.swing = this._contentItem.swing, this._content.repeatDelay = this._contentItem.repeatDelay, 
                this._content.frames = this._contentItem.frames, this.updateLayout(); else if (this._contentItem.type == t.PackageItemType.Component) {
                    var i = t.UIPackage.createObjectFromURL(e);
                    i ? i instanceof t.GComponent ? (this._content2 = i.asCom, this._displayObject.addChild(this._content2.displayObject), 
                    this.updateLayout()) : (i.dispose(), this.setErrorState()) : this.setErrorState();
                } else this.setErrorState(); else this.setErrorState();
            }
        }, {
            key: "loadExternal",
            value: function() {
                t.AssetProxy.inst.load(this._url, Laya.Handler.create(this, this.__getResCompleted), null, Laya.Loader.IMAGE);
            }
        }, {
            key: "freeExternal",
            value: function(t) {}
        }, {
            key: "onExternalLoadSuccess",
            value: function(t) {
                this._content.texture = t, this._content.scale9Grid = null, this._content.scaleByTile = !1, 
                this.sourceWidth = t.width, this.sourceHeight = t.height, this.updateLayout();
            }
        }, {
            key: "onExternalLoadFailed",
            value: function() {
                this.setErrorState();
            }
        }, {
            key: "__getResCompleted",
            value: function(t) {
                null != t ? this.onExternalLoadSuccess(t) : this.onExternalLoadFailed();
            }
        }, {
            key: "setErrorState",
            value: function() {
                this._showErrorSign && (this._errorSign || null != t.UIConfig.loaderErrorSign && (this._errorSign = s._errorSignPool.getObject(t.UIConfig.loaderErrorSign)), 
                this._errorSign && (this._errorSign.setSize(this.width, this.height), this._displayObject.addChild(this._errorSign.displayObject)));
            }
        }, {
            key: "clearErrorState",
            value: function() {
                this._errorSign && (this._displayObject.removeChild(this._errorSign.displayObject), 
                s._errorSignPool.returnObject(this._errorSign), this._errorSign = null);
            }
        }, {
            key: "updateLayout",
            value: function() {
                if (this._content2 || this._content.texture || this._content.frames) {
                    var e = this.sourceWidth, i = this.sourceHeight;
                    if (this._autoSize && (this._updatingLayout = !0, 0 == e && (e = 50), 0 == i && (i = 30), 
                    this.setSize(e, i), this._updatingLayout = !1, e == this._width && i == this._height)) this._content2 ? (this._content2.setXY(0, 0), 
                    this._content2.setScale(1, 1)) : (this._content.size(e, i), this._content.pos(0, 0)); else {
                        var s, n, a = 1, o = 1;
                        this._fill != t.LoaderFillType.None && (a = this.width / this.sourceWidth, o = this.height / this.sourceHeight, 
                        1 == a && 1 == o || (this._fill == t.LoaderFillType.ScaleMatchHeight ? a = o : this._fill == t.LoaderFillType.ScaleMatchWidth ? o = a : this._fill == t.LoaderFillType.Scale ? a > o ? a = o : o = a : this._fill == t.LoaderFillType.ScaleNoBorder && (a > o ? o = a : a = o), 
                        this._shrinkOnly && (a > 1 && (a = 1), o > 1 && (o = 1)), e = this.sourceWidth * a, 
                        i = this.sourceHeight * o)), this._content2 ? this._content2.setScale(a, o) : this._content.size(e, i), 
                        s = "center" == this._align ? Math.floor((this.width - e) / 2) : "right" == this._align ? this.width - e : 0, 
                        n = "middle" == this._valign ? Math.floor((this.height - i) / 2) : "bottom" == this._valign ? this.height - i : 0, 
                        this._content2 ? this._content2.setXY(s, n) : this._content.pos(s, n);
                    }
                } else this._autoSize && (this._updatingLayout = !0, this.setSize(50, 30), this._updatingLayout = !1);
            }
        }, {
            key: "clearContent",
            value: function() {
                this.clearErrorState(), !this._contentItem && this._content.texture && this.freeExternal(this._content.texture), 
                this._content.texture = null, this._content.frames = null, this._content2 && (this._content2.dispose(), 
                this._content2 = null), this._contentItem = null;
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this._updatingLayout || this.updateLayout();
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.color;

                  case t.ObjectPropID.Playing:
                    return this.playing;

                  case t.ObjectPropID.Frame:
                    return this.frame;

                  case t.ObjectPropID.TimeScale:
                    return this._content.timeScale;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.color = i;
                    break;

                  case t.ObjectPropID.Playing:
                    this.playing = i;
                    break;

                  case t.ObjectPropID.Frame:
                    this.frame = i;
                    break;

                  case t.ObjectPropID.TimeScale:
                    this._content.timeScale = i;
                    break;

                  case t.ObjectPropID.DeltaTime:
                    this._content.advance(i);
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                var i;
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), this._url = t.readS(), i = t.readByte(), this._align = 0 == i ? "left" : 1 == i ? "center" : "right", 
                i = t.readByte(), this._valign = 0 == i ? "top" : 1 == i ? "middle" : "bottom", 
                this._fill = t.readByte(), this._shrinkOnly = t.readBool(), this._autoSize = t.readBool(), 
                this._showErrorSign = t.readBool(), this._content.playing = t.readBool(), this._content.frame = t.getInt32(), 
                t.readBool() && (this.color = t.readColorS()), this._content.fillMethod = t.readByte(), 
                0 != this._content.fillMethod && (this._content.fillOrigin = t.readByte(), this._content.fillClockwise = t.readBool(), 
                this._content.fillAmount = t.getFloat32()), this._url && this.loadContent();
            }
        }, {
            key: "url",
            get: function() {
                return this._url;
            },
            set: function(t) {
                this._url != t && (this._url = t, this.loadContent(), this.updateGear(7));
            }
        }, {
            key: "icon",
            get: function() {
                return this._url;
            },
            set: function(t) {
                this.url = t;
            }
        }, {
            key: "align",
            get: function() {
                return this._align;
            },
            set: function(t) {
                this._align != t && (this._align = t, this.updateLayout());
            }
        }, {
            key: "verticalAlign",
            get: function() {
                return this._valign;
            },
            set: function(t) {
                this._valign != t && (this._valign = t, this.updateLayout());
            }
        }, {
            key: "fill",
            get: function() {
                return this._fill;
            },
            set: function(t) {
                this._fill != t && (this._fill = t, this.updateLayout());
            }
        }, {
            key: "shrinkOnly",
            get: function() {
                return this._shrinkOnly;
            },
            set: function(t) {
                this._shrinkOnly != t && (this._shrinkOnly = t, this.updateLayout());
            }
        }, {
            key: "autoSize",
            get: function() {
                return this._autoSize;
            },
            set: function(t) {
                this._autoSize != t && (this._autoSize = t, this.updateLayout());
            }
        }, {
            key: "playing",
            get: function() {
                return this._content.playing;
            },
            set: function(t) {
                this._content.playing != t && (this._content.playing = t, this.updateGear(5));
            }
        }, {
            key: "frame",
            get: function() {
                return this._content.frame;
            },
            set: function(t) {
                this._content.frame != t && (this._content.frame = t, this.updateGear(5));
            }
        }, {
            key: "color",
            get: function() {
                return this._content.color;
            },
            set: function(t) {
                this._content.color != t && (this._content.color = t, this.updateGear(4));
            }
        }, {
            key: "fillMethod",
            get: function() {
                return this._content.fillMethod;
            },
            set: function(t) {
                this._content.fillMethod = t;
            }
        }, {
            key: "fillOrigin",
            get: function() {
                return this._content.fillOrigin;
            },
            set: function(t) {
                this._content.fillOrigin = t;
            }
        }, {
            key: "fillClockwise",
            get: function() {
                return this._content.fillClockwise;
            },
            set: function(t) {
                this._content.fillClockwise = t;
            }
        }, {
            key: "fillAmount",
            get: function() {
                return this._content.fillAmount;
            },
            set: function(t) {
                this._content.fillAmount = t;
            }
        }, {
            key: "showErrorSign",
            get: function() {
                return this._showErrorSign;
            },
            set: function(t) {
                this._showErrorSign = t;
            }
        }, {
            key: "content",
            get: function() {
                return this._content;
            }
        }, {
            key: "component",
            get: function() {
                return this._content2;
            }
        } ]), s;
    }(t.GObject);
    z._errorSignPool = new t.GObjectPool(), t.GLoader = z, t.GLoader3D = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._frame = 0, e._playing = !0, 
            e._url = "", e._fill = t.LoaderFillType.None, e._align = t.AlignType.Left, e._verticalAlign = t.VertAlignType.Top, 
            e._color = "#FFFFFF", e;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "createDisplayObject", this).call(this), 
                this._container = new Laya.Sprite(), this._displayObject.addChild(this._container);
            }
        }, {
            key: "dispose",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "dispose", this).call(this);
            }
        }, {
            key: "loadContent",
            value: function() {
                this.clearContent(), this._url && (t.ToolSet.startsWith(this._url, "ui://") ? this.loadFromPackage(this._url) : this.loadExternal());
            }
        }, {
            key: "loadFromPackage",
            value: function(e) {
                this._contentItem = t.UIPackage.getItemByURL(e), this._contentItem && (this._contentItem = this._contentItem.getBranch(), 
                this.sourceWidth = this._contentItem.width, this.sourceHeight = this._contentItem.height, 
                this._contentItem = this._contentItem.getHighResolution(), this._autoSize && this.setSize(this.sourceWidth, this.sourceHeight), 
                this._contentItem.type != t.PackageItemType.Spine && this._contentItem.type != t.PackageItemType.DragonBones || this._contentItem.owner.getItemAssetAsync(this._contentItem, this.onLoaded.bind(this)));
            }
        }, {
            key: "onLoaded",
            value: function(t, e) {
                this._contentItem == e && (t && console.warn(t), this._contentItem.templet && this.setSkeleton(this._contentItem.templet.buildArmature(1), this._contentItem.skeletonAnchor));
            }
        }, {
            key: "setSkeleton",
            value: function(e, i) {
                this.url = null, this._content = e, this._container.addChild(this._content), this._content.pos(i.x, i.y), 
                t.ToolSet.setColorFilter(this._content, this._color), this.onChange(), this.updateLayout();
            }
        }, {
            key: "onChange",
            value: function() {
                this._content && (this._animationName ? this._playing ? this._content.play(this._animationName, this._loop) : this._content.play(this._animationName, !1, !0, this._frame, this._frame) : this._content.stop(), 
                this._skinName ? this._content.showSkinByName(this._skinName) : this._content.showSkinByIndex(0));
            }
        }, {
            key: "loadExternal",
            value: function() {}
        }, {
            key: "updateLayout",
            value: function() {
                var e = this.sourceWidth, i = this.sourceHeight;
                if (this._autoSize && (this._updatingLayout = !0, 0 == e && (e = 50), 0 == i && (i = 30), 
                this.setSize(e, i), this._updatingLayout = !1, e == this._width && i == this._height)) return this._container.scale(1, 1), 
                void this._container.pos(0, 0);
                var s, n, a = 1, o = 1;
                this._fill != t.LoaderFillType.None && (a = this.width / this.sourceWidth, o = this.height / this.sourceHeight, 
                1 == a && 1 == o || (this._fill == t.LoaderFillType.ScaleMatchHeight ? a = o : this._fill == t.LoaderFillType.ScaleMatchWidth ? o = a : this._fill == t.LoaderFillType.Scale ? a > o ? a = o : o = a : this._fill == t.LoaderFillType.ScaleNoBorder && (a > o ? o = a : a = o), 
                this._shrinkOnly && (a > 1 && (a = 1), o > 1 && (o = 1)), e = this.sourceWidth * a, 
                i = this.sourceHeight * o)), this._container.scale(a, o), s = this._align == t.AlignType.Center ? Math.floor((this.width - e) / 2) : this._align == t.AlignType.Right ? this.width - e : 0, 
                n = this._verticalAlign == t.VertAlignType.Middle ? Math.floor((this.height - i) / 2) : this._verticalAlign == t.VertAlignType.Bottom ? this.height - i : 0, 
                this._container.pos(s, n);
            }
        }, {
            key: "clearContent",
            value: function() {
                this._contentItem = null, this._content && (this._container.removeChild(this._content), 
                this._content.destroy(), this._content = null);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this._updatingLayout || this.updateLayout();
            }
        }, {
            key: "handleGrayedChanged",
            value: function() {}
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.color;

                  case t.ObjectPropID.Playing:
                    return this.playing;

                  case t.ObjectPropID.Frame:
                    return this.frame;

                  case t.ObjectPropID.TimeScale:
                    return 1;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.color = i;
                    break;

                  case t.ObjectPropID.Playing:
                    this.playing = i;
                    break;

                  case t.ObjectPropID.Frame:
                    this.frame = i;
                    break;

                  case t.ObjectPropID.TimeScale:
                  case t.ObjectPropID.DeltaTime:
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), this._url = t.readS(), this._align = t.readByte(), this._verticalAlign = t.readByte(), 
                this._fill = t.readByte(), this._shrinkOnly = t.readBool(), this._autoSize = t.readBool(), 
                this._animationName = t.readS(), this._skinName = t.readS(), this._playing = t.readBool(), 
                this._frame = t.getInt32(), this._loop = t.readBool(), t.readBool() && (this.color = t.readColorS()), 
                this._url && this.loadContent();
            }
        }, {
            key: "url",
            get: function() {
                return this._url;
            },
            set: function(t) {
                this._url != t && (this._url = t, this.loadContent(), this.updateGear(7));
            }
        }, {
            key: "icon",
            get: function() {
                return this._url;
            },
            set: function(t) {
                this.url = t;
            }
        }, {
            key: "align",
            get: function() {
                return this._align;
            },
            set: function(t) {
                this._align != t && (this._align = t, this.updateLayout());
            }
        }, {
            key: "verticalAlign",
            get: function() {
                return this._verticalAlign;
            },
            set: function(t) {
                this._verticalAlign != t && (this._verticalAlign = t, this.updateLayout());
            }
        }, {
            key: "fill",
            get: function() {
                return this._fill;
            },
            set: function(t) {
                this._fill != t && (this._fill = t, this.updateLayout());
            }
        }, {
            key: "shrinkOnly",
            get: function() {
                return this._shrinkOnly;
            },
            set: function(t) {
                this._shrinkOnly != t && (this._shrinkOnly = t, this.updateLayout());
            }
        }, {
            key: "autoSize",
            get: function() {
                return this._autoSize;
            },
            set: function(t) {
                this._autoSize != t && (this._autoSize = t, this.updateLayout());
            }
        }, {
            key: "playing",
            get: function() {
                return this._playing;
            },
            set: function(t) {
                this._playing != t && (this._playing = t, this.updateGear(5), this.onChange());
            }
        }, {
            key: "frame",
            get: function() {
                return this._frame;
            },
            set: function(t) {
                this._frame != t && (this._frame = t, this.updateGear(5), this.onChange());
            }
        }, {
            key: "animationName",
            get: function() {
                return this._animationName;
            },
            set: function(t) {
                this._animationName != t && (this._animationName = t, this.onChange());
            }
        }, {
            key: "skinName",
            get: function() {
                return this._skinName;
            },
            set: function(t) {
                this._skinName != t && (this._skinName = t, this.onChange());
            }
        }, {
            key: "loop",
            get: function() {
                return this._loop;
            },
            set: function(t) {
                this._loop != t && (this._loop = t, this.onChange());
            }
        }, {
            key: "color",
            get: function() {
                return this._color;
            },
            set: function(e) {
                this._color != e && (this._color = e, this.updateGear(4), this._content && t.ToolSet.setColorFilter(this._content, this._color));
            }
        }, {
            key: "content",
            get: function() {}
        } ]), s;
    }(t.GObject), t.GMovieClip = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            return (0, classCallCheck.default)(this, s), i.call(this);
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = this._movieClip = new t.MovieClip(), this._movieClip.mouseEnabled = !1, 
                this._displayObject.$owner = this;
            }
        }, {
            key: "rewind",
            value: function() {
                this._movieClip.rewind();
            }
        }, {
            key: "syncStatus",
            value: function(t) {
                this._movieClip.syncStatus(t._movieClip);
            }
        }, {
            key: "advance",
            value: function(t) {
                this._movieClip.advance(t);
            }
        }, {
            key: "setPlaySettings",
            value: function(t, e, i, s, n) {
                this._movieClip.setPlaySettings(t, e, i, s, n);
            }
        }, {
            key: "getProp",
            value: function(e) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    return this.color;

                  case t.ObjectPropID.Playing:
                    return this.playing;

                  case t.ObjectPropID.Frame:
                    return this.frame;

                  case t.ObjectPropID.TimeScale:
                    return this.timeScale;

                  default:
                    return (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "getProp", this).call(this, e);
                }
            }
        }, {
            key: "setProp",
            value: function(e, i) {
                switch (e) {
                  case t.ObjectPropID.Color:
                    this.color = i;
                    break;

                  case t.ObjectPropID.Playing:
                    this.playing = i;
                    break;

                  case t.ObjectPropID.Frame:
                    this.frame = i;
                    break;

                  case t.ObjectPropID.TimeScale:
                    this.timeScale = i;
                    break;

                  case t.ObjectPropID.DeltaTime:
                    this.advance(i);
                    break;

                  default:
                    (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setProp", this).call(this, e, i);
                }
            }
        }, {
            key: "constructFromResource",
            value: function() {
                var t = this.packageItem.getBranch();
                this.sourceWidth = t.width, this.sourceHeight = t.height, this.initWidth = this.sourceWidth, 
                this.initHeight = this.sourceHeight, this.setSize(this.sourceWidth, this.sourceHeight), 
                (t = t.getHighResolution()).load(), this._movieClip.interval = t.interval, this._movieClip.swing = t.swing, 
                this._movieClip.repeatDelay = t.repeatDelay, this._movieClip.frames = t.frames;
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 5), t.readBool() && (this.color = t.readColorS()), t.readByte(), this._movieClip.frame = t.getInt32(), 
                this._movieClip.playing = t.readBool();
            }
        }, {
            key: "color",
            get: function() {
                return this._movieClip.color;
            },
            set: function(t) {
                this._movieClip.color = t;
            }
        }, {
            key: "playing",
            get: function() {
                return this._movieClip.playing;
            },
            set: function(t) {
                this._movieClip.playing != t && (this._movieClip.playing = t, this.updateGear(5));
            }
        }, {
            key: "frame",
            get: function() {
                return this._movieClip.frame;
            },
            set: function(t) {
                this._movieClip.frame != t && (this._movieClip.frame = t, this.updateGear(5));
            }
        }, {
            key: "timeScale",
            get: function() {
                return this._movieClip.timeScale;
            },
            set: function(t) {
                this._movieClip.timeScale = t;
            }
        } ]), s;
    }(t.GObject), t.GProgressBar = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._min = 0, e._max = 0, e._value = 0, 
            e._barMaxWidth = 0, e._barMaxHeight = 0, e._barMaxWidthDelta = 0, e._barMaxHeightDelta = 0, 
            e._barStartX = 0, e._barStartY = 0, e._titleType = t.ProgressTitleType.Percent, 
            e._value = 50, e._max = 100, e;
        }
        return (0, l.default)(s, [ {
            key: "tweenValue",
            value: function(e, i) {
                var s, n = t.GTween.getTween(this, this.update);
                return n ? (s = n.value.x, n.kill()) : s = this._value, this._value = e, t.GTween.to(s, this._value, i).setTarget(this, this.update).setEase(t.EaseType.Linear);
            }
        }, {
            key: "update",
            value: function(e) {
                var i = t.ToolSet.clamp01((e - this._min) / (this._max - this._min));
                if (this._titleObject) switch (this._titleType) {
                  case t.ProgressTitleType.Percent:
                    this._titleObject.text = Math.floor(100 * i) + "%";
                    break;

                  case t.ProgressTitleType.ValueAndMax:
                    this._titleObject.text = Math.floor(e) + "/" + Math.floor(this._max);
                    break;

                  case t.ProgressTitleType.Value:
                    this._titleObject.text = "" + Math.floor(e);
                    break;

                  case t.ProgressTitleType.Max:
                    this._titleObject.text = "" + Math.floor(this._max);
                }
                var s = this.width - this._barMaxWidthDelta, n = this.height - this._barMaxHeightDelta;
                this._reverse ? (this._barObjectH && (this.setFillAmount(this._barObjectH, 1 - i) || (this._barObjectH.width = Math.round(s * i), 
                this._barObjectH.x = this._barStartX + (s - this._barObjectH.width))), this._barObjectV && (this.setFillAmount(this._barObjectV, 1 - i) || (this._barObjectV.height = Math.round(n * i), 
                this._barObjectV.y = this._barStartY + (n - this._barObjectV.height)))) : (this._barObjectH && (this.setFillAmount(this._barObjectH, i) || (this._barObjectH.width = Math.round(s * i))), 
                this._barObjectV && (this.setFillAmount(this._barObjectV, i) || (this._barObjectV.height = Math.round(n * i)))), 
                this._aniObject && this._aniObject.setProp(t.ObjectPropID.Frame, Math.floor(100 * i));
            }
        }, {
            key: "setFillAmount",
            value: function(e, i) {
                return (e instanceof t.GImage || e instanceof t.GLoader) && e.fillMethod != t.FillMethod.None && (e.fillAmount = i, 
                !0);
            }
        }, {
            key: "constructExtension",
            value: function(t) {
                t.seek(0, 6), this._titleType = t.readByte(), this._reverse = t.readBool(), this._titleObject = this.getChild("title"), 
                this._barObjectH = this.getChild("bar"), this._barObjectV = this.getChild("bar_v"), 
                this._aniObject = this.getChild("ani"), this._barObjectH && (this._barMaxWidth = this._barObjectH.width, 
                this._barMaxWidthDelta = this.width - this._barMaxWidth, this._barStartX = this._barObjectH.x), 
                this._barObjectV && (this._barMaxHeight = this._barObjectV.height, this._barMaxHeightDelta = this.height - this._barMaxHeight, 
                this._barStartY = this._barObjectV.y);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this._barObjectH && (this._barMaxWidth = this.width - this._barMaxWidthDelta), this._barObjectV && (this._barMaxHeight = this.height - this._barMaxHeightDelta), 
                this._underConstruct || this.update(this._value);
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6) && t.readByte() == this.packageItem.objectType ? (this._value = t.getInt32(), 
                this._max = t.getInt32(), t.version >= 2 && (this._min = t.getInt32()), this.update(this._value)) : this.update(this._value);
            }
        }, {
            key: "titleType",
            get: function() {
                return this._titleType;
            },
            set: function(t) {
                this._titleType != t && (this._titleType = t, this.update(t));
            }
        }, {
            key: "min",
            get: function() {
                return this._min;
            },
            set: function(t) {
                this._min != t && (this._min = t, this.update(this._value));
            }
        }, {
            key: "max",
            get: function() {
                return this._max;
            },
            set: function(t) {
                this._max != t && (this._max = t, this.update(this._value));
            }
        }, {
            key: "value",
            get: function() {
                return this._value;
            },
            set: function(e) {
                this._value != e && (t.GTween.kill(this, !1, this.update), this._value = e, this.update(e));
            }
        } ]), s;
    }(t.GComponent), t.GRichTextField = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._text = "", t;
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = this._div = new Laya.HTMLDivElement(), this._displayObject.mouseEnabled = !0, 
                this._displayObject.$owner = this;
            }
        }, {
            key: "refresh",
            value: function() {
                this._text.length > 0 && this._div._refresh && this._div._refresh();
            }
        }, {
            key: "updateAutoSize",
            value: function() {
                this._div.style.wordWrap = !this._widthAutoSize;
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                this._updatingSize || (this._div.size(this._width, this._height), this._div.style.width = this._width, 
                this._div.style.height = this._height);
            }
        }, {
            key: "div",
            get: function() {
                return this._div;
            }
        }, {
            key: "text",
            set: function(e) {
                this._text = e;
                var i = this._text;
                this._templateVars && (i = this.parseTemplate(i));
                try {
                    if (this._div.size(this._width, this._height), this._ubbEnabled ? this._div.innerHTML = t.UBBParser.inst.parse(i) : this._div.innerHTML = i, 
                    this._widthAutoSize || this._heightAutoSize) {
                        var s, n;
                        this._widthAutoSize ? (s = this._div.contextWidth) > 0 && (s += 8) : s = this._width, 
                        n = this._heightAutoSize ? this._div.contextHeight : this._height, this._updatingSize = !0, 
                        this.setSize(s, n), this._updatingSize = !1;
                    }
                } catch (t) {
                    console.log("laya reports html error:" + t);
                }
            },
            get: function() {
                return this._text;
            }
        }, {
            key: "font",
            get: function() {
                return this._div.style.font;
            },
            set: function(e) {
                this._div.style.font = e || t.UIConfig.defaultFont;
            }
        }, {
            key: "fontSize",
            get: function() {
                return this._div.style.fontSize;
            },
            set: function(t) {
                this._div.style.fontSize = t;
            }
        }, {
            key: "color",
            get: function() {
                return this._div.style.color;
            },
            set: function(t) {
                this._div.style.color != t && (this._div.style.color = t, this.refresh(), this.updateGear(4));
            }
        }, {
            key: "align",
            get: function() {
                return this._div.style.align;
            },
            set: function(t) {
                this._div.style.align != t && (this._div.style.align = t, this.refresh());
            }
        }, {
            key: "valign",
            get: function() {
                return this._div.style.valign;
            },
            set: function(t) {
                this._div.style.valign != t && (this._div.style.valign = t, this.refresh());
            }
        }, {
            key: "leading",
            get: function() {
                return this._div.style.leading;
            },
            set: function(t) {
                this._div.style.leading != t && (this._div.style.leading = t, this.refresh());
            }
        }, {
            key: "bold",
            get: function() {
                return this._div.style.bold;
            },
            set: function(t) {
                this._div.style.bold != t && (this._div.style.bold = t, this.refresh());
            }
        }, {
            key: "italic",
            get: function() {
                return this._div.style.italic;
            },
            set: function(t) {
                this._div.style.italic != t && (this._div.style.italic = t, this.refresh());
            }
        }, {
            key: "stroke",
            get: function() {
                return this._div.style.stroke;
            },
            set: function(t) {
                this._div.style.stroke != t && (this._div.style.stroke = t, this.refresh());
            }
        }, {
            key: "strokeColor",
            get: function() {
                return this._div.style.strokeColor;
            },
            set: function(t) {
                this._div.style.strokeColor != t && (this._div.style.strokeColor = t, this.refresh(), 
                this.updateGear(4));
            }
        }, {
            key: "ubbEnabled",
            set: function(t) {
                this._ubbEnabled = t;
            },
            get: function() {
                return this._ubbEnabled;
            }
        }, {
            key: "textWidth",
            get: function() {
                var t = this._div.contextWidth;
                return t > 0 && (t += 8), t;
            }
        } ]), s;
    }(t.GTextField);
    var j = function(e) {
        (0, h.default)(n, e);
        var s = u(n);
        function n() {
            var t;
            return (0, classCallCheck.default)(this, n), t = s.call(this), n._inst || (n._inst = (0, assertThisInitialized.default)(t)), 
            t.opaque = !1, t._popupStack = [], t._justClosedPopups = [], t.displayObject.once(Laya.Event.DISPLAY, (0, 
            assertThisInitialized.default)(t), t.__addedToStage), t;
        }
        return (0, l.default)(n, [ {
            key: "showWindow",
            value: function(t) {
                this.addChild(t), t.requestFocus(), t.x > this.width ? t.x = this.width - t.width : t.x + t.width < 0 && (t.x = 0), 
                t.y > this.height ? t.y = this.height - t.height : t.y + t.height < 0 && (t.y = 0), 
                this.adjustModalLayer();
            }
        }, {
            key: "hideWindow",
            value: function(t) {
                t.hide();
            }
        }, {
            key: "hideWindowImmediately",
            value: function(t) {
                t.parent == this && this.removeChild(t), this.adjustModalLayer();
            }
        }, {
            key: "bringToFront",
            value: function(e) {
                var i, s = this.numChildren;
                for (i = this._modalLayer.parent && !e.modal ? this.getChildIndex(this._modalLayer) - 1 : s - 1; i >= 0; i--) {
                    var n = this.getChildAt(i);
                    if (n == e) return;
                    if (n instanceof t.Window) break;
                }
                i >= 0 && this.setChildIndex(e, i);
            }
        }, {
            key: "showModalWait",
            value: function(e) {
                null != t.UIConfig.globalModalWaiting && (null == this._modalWaitPane && (this._modalWaitPane = t.UIPackage.createObjectFromURL(t.UIConfig.globalModalWaiting)), 
                this._modalWaitPane.setSize(this.width, this.height), this._modalWaitPane.addRelation(this, t.RelationType.Size), 
                this.addChild(this._modalWaitPane), this._modalWaitPane.text = e);
            }
        }, {
            key: "closeModalWait",
            value: function() {
                this._modalWaitPane && this._modalWaitPane.parent && this.removeChild(this._modalWaitPane);
            }
        }, {
            key: "closeAllExceptModals",
            value: function() {
                for (var e = this._children.slice(), i = e.length, s = 0; s < i; s++) {
                    var n = e[s];
                    n instanceof t.Window && !n.modal && n.hide();
                }
            }
        }, {
            key: "closeAllWindows",
            value: function() {
                for (var e = this._children.slice(), i = e.length, s = 0; s < i; s++) {
                    var n = e[s];
                    n instanceof t.Window && n.hide();
                }
            }
        }, {
            key: "getTopWindow",
            value: function() {
                for (var e = this.numChildren - 1; e >= 0; e--) {
                    var i = this.getChildAt(e);
                    if (i instanceof t.Window) return i;
                }
                return null;
            }
        }, {
            key: "showPopup",
            value: function(e, i, s) {
                if (this._popupStack.length > 0) {
                    var n = this._popupStack.indexOf(e);
                    if (-1 != n) for (var a = this._popupStack.length - 1; a >= n; a--) this.removeChild(this._popupStack.pop());
                }
                if (this._popupStack.push(e), i) for (var o = i; o; ) {
                    if (o.parent == this) {
                        e.sortingOrder < o.sortingOrder && (e.sortingOrder = o.sortingOrder);
                        break;
                    }
                    o = o.parent;
                }
                var h;
                this.addChild(e), this.adjustModalLayer();
                var r, l, u = 0, _ = 0;
                i ? (h = i.localToGlobal(), u = i.width, _ = i.height) : h = this.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY), 
                (r = h.x) + e.width > this.width && (r = r + u - e.width), l = h.y + _, ((void 0 === s || s === t.PopupDirection.Auto) && h.y + e.height > this.height || !1 === s || s === t.PopupDirection.Up) && (l = h.y - e.height - 1) < 0 && (l = 0, 
                r += u / 2), e.x = r, e.y = l;
            }
        }, {
            key: "togglePopup",
            value: function(t, e, i) {
                -1 == this._justClosedPopups.indexOf(t) && this.showPopup(t, e, i);
            }
        }, {
            key: "hidePopup",
            value: function(t) {
                if (t) {
                    var e = this._popupStack.indexOf(t);
                    if (-1 != e) for (var i = this._popupStack.length - 1; i >= e; i--) this.closePopup(this._popupStack.pop());
                } else {
                    for (i = this._popupStack.length - 1; i >= 0; i--) this.closePopup(this._popupStack[i]);
                    this._popupStack.length = 0;
                }
            }
        }, {
            key: "closePopup",
            value: function(e) {
                e.parent && (e instanceof t.Window ? e.hide() : this.removeChild(e));
            }
        }, {
            key: "showTooltips",
            value: function(e) {
                if (null == this._defaultTooltipWin) {
                    var i = t.UIConfig.tooltipsWin;
                    if (!i) return void Laya.Log.print("UIConfig.tooltipsWin not defined");
                    this._defaultTooltipWin = t.UIPackage.createObjectFromURL(i);
                }
                this._defaultTooltipWin.text = e, this.showTooltipsWin(this._defaultTooltipWin);
            }
        }, {
            key: "showTooltipsWin",
            value: function(t, e) {
                this.hideTooltips(), this._tooltipWin = t;
                var i = 0, s = 0;
                null == e ? (i = Laya.stage.mouseX + 10, s = Laya.stage.mouseY + 20) : (i = e.x, 
                s = e.y);
                var n = this.globalToLocal(i, s);
                i = n.x, s = n.y, i + this._tooltipWin.width > this.width && (i = i - this._tooltipWin.width - 1) < 0 && (i = 10), 
                s + this._tooltipWin.height > this.height && (s = s - this._tooltipWin.height - 1, 
                i - this._tooltipWin.width - 1 > 0 && (i = i - this._tooltipWin.width - 1), s < 0 && (s = 10)), 
                this._tooltipWin.x = i, this._tooltipWin.y = s, this.addChild(this._tooltipWin);
            }
        }, {
            key: "hideTooltips",
            value: function() {
                this._tooltipWin && (this._tooltipWin.parent && this.removeChild(this._tooltipWin), 
                this._tooltipWin = null);
            }
        }, {
            key: "setFocus",
            value: function(t) {}
        }, {
            key: "playOneShotSound",
            value: function(e, i) {
                t.ToolSet.startsWith(e, "ui://") || Laya.SoundManager.playSound(e);
            }
        }, {
            key: "adjustModalLayer",
            value: function() {
                var e = this.numChildren;
                null != this._modalWaitPane && null != this._modalWaitPane.parent && this.setChildIndex(this._modalWaitPane, e - 1);
                for (var i = e - 1; i >= 0; i--) {
                    var s = this.getChildAt(i);
                    if (s instanceof t.Window && s.modal) return void (null == this._modalLayer.parent ? this.addChildAt(this._modalLayer, i) : this.setChildIndexBefore(this._modalLayer, i));
                }
                this._modalLayer.parent && this.removeChild(this._modalLayer);
            }
        }, {
            key: "__addedToStage",
            value: function() {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.__stageMouseDown), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__stageMouseUp), 
                this._modalLayer = new t.GGraph(), this._modalLayer.setSize(this.width, this.height), 
                this._modalLayer.drawRect(0, null, t.UIConfig.modalLayerColor), this._modalLayer.addRelation(this, t.RelationType.Size), 
                this.displayObject.stage.on(Laya.Event.RESIZE, this, this.__winResize), this.__winResize();
            }
        }, {
            key: "checkPopups",
            value: function(t) {
                if (!this._checkPopups && (this._checkPopups = !0, this._justClosedPopups.length = 0, 
                this._popupStack.length > 0)) {
                    for (var e = t; e != this.displayObject.stage && e; ) {
                        if (e.$owner) {
                            var i = this._popupStack.indexOf(e.$owner);
                            if (-1 != i) {
                                for (var s = this._popupStack.length - 1; s > i; s--) {
                                    var n = this._popupStack.pop();
                                    this.closePopup(n), this._justClosedPopups.push(n);
                                }
                                return;
                            }
                        }
                        e = e.parent;
                    }
                    for (s = this._popupStack.length - 1; s >= 0; s--) n = this._popupStack[s], this.closePopup(n), 
                    this._justClosedPopups.push(n);
                    this._popupStack.length = 0;
                }
            }
        }, {
            key: "__stageMouseDown",
            value: function(t) {
                this._tooltipWin && this.hideTooltips(), this.checkPopups(t.target);
            }
        }, {
            key: "__stageMouseUp",
            value: function() {
                this._checkPopups = !1;
            }
        }, {
            key: "__winResize",
            value: function() {
                this.setSize(Laya.stage.width, Laya.stage.height), this.updateContentScaleLevel();
            }
        }, {
            key: "updateContentScaleLevel",
            value: function() {
                var t = Laya.stage._canvasTransform, e = Math.max(t.getScaleX(), t.getScaleY());
                n.contentScaleLevel = e >= 3.5 ? 3 : e >= 2.5 ? 2 : e >= 1.5 ? 1 : 0;
            }
        }, {
            key: "modalLayer",
            get: function() {
                return this._modalLayer;
            }
        }, {
            key: "hasModalWindow",
            get: function() {
                return null != this._modalLayer.parent;
            }
        }, {
            key: "modalWaiting",
            get: function() {
                return this._modalWaitPane && this._modalWaitPane.inContainer;
            }
        }, {
            key: "hasAnyPopup",
            get: function() {
                return 0 != this._popupStack.length;
            }
        }, {
            key: "focus",
            get: function() {
                return null;
            },
            set: function(t) {
                this.setFocus(t);
            }
        }, {
            key: "volumeScale",
            get: function() {
                return Laya.SoundManager.soundVolume;
            },
            set: function(t) {
                Laya.SoundManager.soundVolume = t;
            }
        } ], [ {
            key: "inst",
            get: function() {
                return n._inst || new n(), n._inst;
            }
        } ]), n;
    }(t.GComponent);
    j.contentScaleLevel = 0, t.GRoot = j, t.GScrollBar = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i() {
            var t;
            return (0, classCallCheck.default)(this, i), (t = e.call(this))._dragOffset = new Laya.Point(), 
            t._scrollPerc = 0, t;
        }
        return (0, l.default)(i, [ {
            key: "setScrollPane",
            value: function(t, e) {
                this._target = t, this._vertical = e;
            }
        }, {
            key: "setDisplayPerc",
            value: function(t) {
                this._vertical ? (this._fixedGripSize || (this._grip.height = Math.floor(t * this._bar.height)), 
                this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc) : (this._fixedGripSize || (this._grip.width = Math.floor(t * this._bar.width)), 
                this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc), 
                this._grip.visible = 0 != t && 1 != t;
            }
        }, {
            key: "setScrollPerc",
            value: function(t) {
                this._scrollPerc = t, this._vertical ? this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc : this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
            }
        }, {
            key: "constructExtension",
            value: function(t) {
                t.seek(0, 6), this._fixedGripSize = t.readBool(), this._grip = this.getChild("grip"), 
                this._grip ? (this._bar = this.getChild("bar"), this._bar ? (this._arrowButton1 = this.getChild("arrow1"), 
                this._arrowButton2 = this.getChild("arrow2"), this._grip.on(Laya.Event.MOUSE_DOWN, this, this.__gripMouseDown), 
                this._arrowButton1 && this._arrowButton1.on(Laya.Event.MOUSE_DOWN, this, this.__arrowButton1Click), 
                this._arrowButton2 && this._arrowButton2.on(Laya.Event.MOUSE_DOWN, this, this.__arrowButton2Click), 
                this.on(Laya.Event.MOUSE_DOWN, this, this.__barMouseDown)) : Laya.Log.print("需要定义bar")) : Laya.Log.print("需要定义grip");
            }
        }, {
            key: "__gripMouseDown",
            value: function(t) {
                t.stopPropagation(), this._gripDragging = !0, this._target.updateScrollBarVisible(), 
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.__gripMouseMove), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__gripMouseUp), 
                this.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, this._dragOffset), this._dragOffset.x -= this._grip.x, 
                this._dragOffset.y -= this._grip.y;
            }
        }, {
            key: "__gripMouseMove",
            value: function() {
                if (this.onStage) {
                    var t = this.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, M);
                    if (this._vertical) {
                        var e = t.y - this._dragOffset.y;
                        this._target.setPercY((e - this._bar.y) / (this._bar.height - this._grip.height), !1);
                    } else {
                        var i = t.x - this._dragOffset.x;
                        this._target.setPercX((i - this._bar.x) / (this._bar.width - this._grip.width), !1);
                    }
                }
            }
        }, {
            key: "__gripMouseUp",
            value: function(t) {
                this.onStage && (Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.__gripMouseMove), 
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.__gripMouseUp), this._gripDragging = !1, 
                this._target.updateScrollBarVisible());
            }
        }, {
            key: "__arrowButton1Click",
            value: function(t) {
                t.stopPropagation(), this._vertical ? this._target.scrollUp() : this._target.scrollLeft();
            }
        }, {
            key: "__arrowButton2Click",
            value: function(t) {
                t.stopPropagation(), this._vertical ? this._target.scrollDown() : this._target.scrollRight();
            }
        }, {
            key: "__barMouseDown",
            value: function(t) {
                var e = this._grip.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, M);
                this._vertical ? e.y < 0 ? this._target.scrollUp(4) : this._target.scrollDown(4) : e.x < 0 ? this._target.scrollLeft(4) : this._target.scrollRight(4);
            }
        }, {
            key: "minSize",
            get: function() {
                return this._vertical ? (this._arrowButton1 ? this._arrowButton1.height : 0) + (this._arrowButton2 ? this._arrowButton2.height : 0) : (this._arrowButton1 ? this._arrowButton1.width : 0) + (this._arrowButton2 ? this._arrowButton2.width : 0);
            }
        }, {
            key: "gripDragging",
            get: function() {
                return this._gripDragging;
            }
        } ]), i;
    }(t.GComponent);
    var M = new Laya.Point();
    t.GSlider = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this))._min = 0, e._max = 0, e._value = 0, 
            e._barMaxWidth = 0, e._barMaxHeight = 0, e._barMaxWidthDelta = 0, e._barMaxHeightDelta = 0, 
            e._clickPercent = 0, e._barStartX = 0, e._barStartY = 0, e.changeOnClick = !0, e.canDrag = !0, 
            e._titleType = t.ProgressTitleType.Percent, e._value = 50, e._max = 100, e._clickPos = new Laya.Point(), 
            e;
        }
        return (0, l.default)(s, [ {
            key: "update",
            value: function() {
                this.updateWithPercent((this._value - this._min) / (this._max - this._min));
            }
        }, {
            key: "updateWithPercent",
            value: function(e, i) {
                if (e = t.ToolSet.clamp01(e), i) {
                    var s = t.ToolSet.clamp(this._min + (this._max - this._min) * e, this._min, this._max);
                    this._wholeNumbers && (s = Math.round(s), e = t.ToolSet.clamp01((s - this._min) / (this._max - this._min))), 
                    s != this._value && (this._value = s, t.Events.dispatch(t.Events.STATE_CHANGED, this.displayObject, i));
                }
                if (this._titleObject) switch (this._titleType) {
                  case t.ProgressTitleType.Percent:
                    this._titleObject.text = Math.floor(100 * e) + "%";
                    break;

                  case t.ProgressTitleType.ValueAndMax:
                    this._titleObject.text = this._value + "/" + this._max;
                    break;

                  case t.ProgressTitleType.Value:
                    this._titleObject.text = "" + this._value;
                    break;

                  case t.ProgressTitleType.Max:
                    this._titleObject.text = "" + this._max;
                }
                var n = this.width - this._barMaxWidthDelta, a = this.height - this._barMaxHeightDelta;
                this._reverse ? (this._barObjectH && (this._barObjectH.width = Math.round(n * e), 
                this._barObjectH.x = this._barStartX + (n - this._barObjectH.width)), this._barObjectV && (this._barObjectV.height = Math.round(a * e), 
                this._barObjectV.y = this._barStartY + (a - this._barObjectV.height))) : (this._barObjectH && (this._barObjectH.width = Math.round(n * e)), 
                this._barObjectV && (this._barObjectV.height = Math.round(a * e)));
            }
        }, {
            key: "constructExtension",
            value: function(t) {
                t.seek(0, 6), this._titleType = t.readByte(), this._reverse = t.readBool(), t.version >= 2 && (this._wholeNumbers = t.readBool(), 
                this.changeOnClick = t.readBool()), this._titleObject = this.getChild("title"), 
                this._barObjectH = this.getChild("bar"), this._barObjectV = this.getChild("bar_v"), 
                this._gripObject = this.getChild("grip"), this._barObjectH && (this._barMaxWidth = this._barObjectH.width, 
                this._barMaxWidthDelta = this.width - this._barMaxWidth, this._barStartX = this._barObjectH.x), 
                this._barObjectV && (this._barMaxHeight = this._barObjectV.height, this._barMaxHeightDelta = this.height - this._barMaxHeight, 
                this._barStartY = this._barObjectV.y), this._gripObject && this._gripObject.on(Laya.Event.MOUSE_DOWN, this, this.__gripMouseDown), 
                this.displayObject.on(Laya.Event.MOUSE_DOWN, this, this.__barMouseDown);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "handleSizeChanged", this).call(this), 
                this._barObjectH && (this._barMaxWidth = this.width - this._barMaxWidthDelta), this._barObjectV && (this._barMaxHeight = this.height - this._barMaxHeightDelta), 
                this._underConstruct || this.update();
            }
        }, {
            key: "setup_afterAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_afterAdd", this).call(this, t, e), 
                t.seek(e, 6) && t.readByte() == this.packageItem.objectType ? (this._value = t.getInt32(), 
                this._max = t.getInt32(), t.version >= 2 && (this._min = t.getInt32()), this.update()) : this.update();
            }
        }, {
            key: "__gripMouseDown",
            value: function(e) {
                this.canDrag = !0, e.stopPropagation(), this._clickPos = this.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY), 
                this._clickPercent = t.ToolSet.clamp01((this._value - this._min) / (this._max - this._min)), 
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.__gripMouseMove), Laya.stage.on(Laya.Event.MOUSE_UP, this, this.__gripMouseUp);
            }
        }, {
            key: "__gripMouseMove",
            value: function(t) {
                if (this.canDrag) {
                    var e, i = this.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, M), s = i.x - this._clickPos.x, n = i.y - this._clickPos.y;
                    this._reverse && (s = -s, n = -n), e = this._barObjectH ? this._clickPercent + s / this._barMaxWidth : this._clickPercent + n / this._barMaxHeight, 
                    this.updateWithPercent(e, t);
                }
            }
        }, {
            key: "__gripMouseUp",
            value: function(t) {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.__gripMouseMove), Laya.stage.off(Laya.Event.MOUSE_UP, this, this.__gripMouseUp);
            }
        }, {
            key: "__barMouseDown",
            value: function(e) {
                if (this.changeOnClick) {
                    var i, s = this._gripObject.globalToLocal(e.stageX, e.stageY, M), n = t.ToolSet.clamp01((this._value - this._min) / (this._max - this._min));
                    this._barObjectH && (i = s.x / this._barMaxWidth), this._barObjectV && (i = s.y / this._barMaxHeight), 
                    this._reverse ? n -= i : n += i, this.updateWithPercent(n, e);
                }
            }
        }, {
            key: "titleType",
            get: function() {
                return this._titleType;
            },
            set: function(t) {
                this._titleType = t;
            }
        }, {
            key: "wholeNumbers",
            get: function() {
                return this._wholeNumbers;
            },
            set: function(t) {
                this._wholeNumbers != t && (this._wholeNumbers = t, this.update());
            }
        }, {
            key: "min",
            get: function() {
                return this._min;
            },
            set: function(t) {
                this._min != t && (this._min = t, this.update());
            }
        }, {
            key: "max",
            get: function() {
                return this._max;
            },
            set: function(t) {
                this._max != t && (this._max = t, this.update());
            }
        }, {
            key: "value",
            get: function() {
                return this._value;
            },
            set: function(t) {
                this._value != t && (this._value = t, this.update());
            }
        } ]), s;
    }(t.GComponent), M = new Laya.Point(), t.GTextInput = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            return (0, classCallCheck.default)(this, s), i.call(this);
        }
        return (0, l.default)(s, [ {
            key: "createDisplayObject",
            value: function() {
                this._displayObject = this._input = new Laya.Input(), this._displayObject.mouseEnabled = !0, 
                this._displayObject.$owner = this;
            }
        }, {
            key: "requestFocus",
            value: function() {
                this._input.focus = !0, (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "requestFocus", this).call(this);
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                this._input.size(this._width, this._height);
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 4);
                var i = t.readS();
                null != i && (this.promptText = i), null != (i = t.readS()) && (this._input.restrict = i);
                var a = t.getInt32();
                0 != a && (this._input.maxChars = a), 0 != (a = t.getInt32()) && (4 == a ? this.keyboardType = Laya.Input.TYPE_NUMBER : 3 == a && (this.keyboardType = Laya.Input.TYPE_URL)), 
                t.readBool() && (this.password = !0);
            }
        }, {
            key: "nativeInput",
            get: function() {
                return this._input;
            }
        }, {
            key: "text",
            set: function(t) {
                this._input.text = t;
            },
            get: function() {
                return this._input.text;
            }
        }, {
            key: "font",
            get: function() {
                return this._input.font;
            },
            set: function(e) {
                this._input.font = e || t.UIConfig.defaultFont;
            }
        }, {
            key: "fontSize",
            get: function() {
                return this._input.fontSize;
            },
            set: function(t) {
                this._input.fontSize = t;
            }
        }, {
            key: "color",
            get: function() {
                return this._input.color;
            },
            set: function(t) {
                this._input.color = t;
            }
        }, {
            key: "align",
            get: function() {
                return this._input.align;
            },
            set: function(t) {
                this._input.align = t;
            }
        }, {
            key: "valign",
            get: function() {
                return this._input.valign;
            },
            set: function(t) {
                this._input.valign = t;
            }
        }, {
            key: "leading",
            get: function() {
                return this._input.leading;
            },
            set: function(t) {
                this._input.leading = t;
            }
        }, {
            key: "bold",
            get: function() {
                return this._input.bold;
            },
            set: function(t) {
                this._input.bold = t;
            }
        }, {
            key: "italic",
            get: function() {
                return this._input.italic;
            },
            set: function(t) {
                this._input.italic = t;
            }
        }, {
            key: "singleLine",
            get: function() {
                return !this._input.multiline;
            },
            set: function(t) {
                this._input.multiline = !t;
            }
        }, {
            key: "stroke",
            get: function() {
                return this._input.stroke;
            },
            set: function(t) {
                this._input.stroke = t;
            }
        }, {
            key: "strokeColor",
            get: function() {
                return this._input.strokeColor;
            },
            set: function(t) {
                this._input.strokeColor = t, this.updateGear(4);
            }
        }, {
            key: "password",
            get: function() {
                return "password" == this._input.type;
            },
            set: function(t) {
                this._input.type = t ? "password" : "text";
            }
        }, {
            key: "keyboardType",
            get: function() {
                return this._input.type;
            },
            set: function(t) {
                this._input.type = t;
            }
        }, {
            key: "editable",
            set: function(t) {
                this._input.editable = t;
            },
            get: function() {
                return this._input.editable;
            }
        }, {
            key: "maxLength",
            set: function(t) {
                this._input.maxChars = t;
            },
            get: function() {
                return this._input.maxChars;
            }
        }, {
            key: "promptText",
            set: function(e) {
                this._prompt = e;
                var i = t.UBBParser.inst.parse(e, !0);
                this._input.prompt = i, t.UBBParser.inst.lastColor && (this._input.promptColor = t.UBBParser.inst.lastColor);
            },
            get: function() {
                return this._prompt;
            }
        }, {
            key: "restrict",
            set: function(t) {
                this._input.restrict = t;
            },
            get: function() {
                return this._input.restrict;
            }
        }, {
            key: "textWidth",
            get: function() {
                return this._input.textWidth;
            }
        } ]), s;
    }(t.GTextField), t.GTree = function(e) {
        (0, h.default)(a, e);
        var s = u(a);
        function a() {
            var e;
            return (0, classCallCheck.default)(this, a), (e = s.call(this))._indent = 15, e._rootNode = new t.GTreeNode(!0), 
            e._rootNode._setTree((0, assertThisInitialized.default)(e)), e._rootNode.expanded = !0, e;
        }
        return (0, l.default)(a, [ {
            key: "getSelectedNode",
            value: function() {
                return -1 != this.selectedIndex ? this.getChildAt(this.selectedIndex)._treeNode : null;
            }
        }, {
            key: "getSelectedNodes",
            value: function(t) {
                t || (t = new Array()), A.length = 0, (0, agetget.default)((0, getPrototypeOf.default)(a.prototype), "getSelection", this).call(this, A);
                for (var e = A.length, i = new Array(), s = 0; s < e; s++) {
                    var h = this.getChildAt(A[s])._treeNode;
                    i.push(h);
                }
                return i;
            }
        }, {
            key: "selectNode",
            value: function(t, e) {
                for (var i = t.parent; i && i != this._rootNode; ) i.expanded = !0, i = i.parent;
                t._cell && this.addSelection(this.getChildIndex(t._cell), e);
            }
        }, {
            key: "unselectNode",
            value: function(t) {
                t._cell && this.removeSelection(this.getChildIndex(t._cell));
            }
        }, {
            key: "expandAll",
            value: function(t) {
                t || (t = this._rootNode), t.expanded = !0;
                for (var e = t.numChildren, i = 0; i < e; i++) {
                    var s = t.getChildAt(i);
                    s.isFolder && this.expandAll(s);
                }
            }
        }, {
            key: "collapseAll",
            value: function(t) {
                t || (t = this._rootNode), t != this._rootNode && (t.expanded = !1);
                for (var e = t.numChildren, i = 0; i < e; i++) {
                    var s = t.getChildAt(i);
                    s.isFolder && this.collapseAll(s);
                }
            }
        }, {
            key: "createCell",
            value: function(e) {
                var i = this.getFromPool(e._resURL ? e._resURL : this.defaultItem);
                if (!i) throw new Error("cannot create tree node object.");
                i._treeNode = e, e._cell = i;
                var s, n = i.getChild("indent");
                n && (n.width = (e.level - 1) * this._indent), (s = i.getController("expanded")) && (s.on(t.Events.STATE_CHANGED, this, this.__expandedStateChanged), 
                s.selectedIndex = e.expanded ? 1 : 0), (s = i.getController("leaf")) && (s.selectedIndex = e.isFolder ? 0 : 1), 
                e.isFolder && i.on(Laya.Event.MOUSE_DOWN, this, this.__cellMouseDown), this.treeNodeRender && this.treeNodeRender.runWith([ e, i ]);
            }
        }, {
            key: "_afterInserted",
            value: function(t) {
                t._cell || this.createCell(t);
                var e = this.getInsertIndexForNode(t);
                this.addChildAt(t._cell, e), this.treeNodeRender && this.treeNodeRender.runWith([ t, t._cell ]), 
                t.isFolder && t.expanded && this.checkChildren(t, e);
            }
        }, {
            key: "getInsertIndexForNode",
            value: function(t) {
                var e = t.getPrevSibling();
                e || (e = t.parent);
                for (var i = this.getChildIndex(e._cell) + 1, s = t.level, n = this.numChildren, a = i; a < n && !(this.getChildAt(a)._treeNode.level <= s); a++) i++;
                return i;
            }
        }, {
            key: "_afterRemoved",
            value: function(t) {
                this.removeNode(t);
            }
        }, {
            key: "_afterExpanded",
            value: function(t) {
                if (t != this._rootNode) {
                    if (null != this.treeNodeWillExpand && this.treeNodeWillExpand.runWith([ t, !0 ]), 
                    t._cell) {
                        this.treeNodeRender && this.treeNodeRender.runWith([ t, t._cell ]);
                        var e = t._cell.getController("expanded");
                        e && (e.selectedIndex = 1), t._cell.parent && this.checkChildren(t, this.getChildIndex(t._cell));
                    }
                } else this.checkChildren(this._rootNode, 0);
            }
        }, {
            key: "_afterCollapsed",
            value: function(t) {
                if (t != this._rootNode) {
                    if (this.treeNodeWillExpand && this.treeNodeWillExpand.runWith([ t, !1 ]), t._cell) {
                        this.treeNodeRender && this.treeNodeRender.runWith([ t, t._cell ]);
                        var e = t._cell.getController("expanded");
                        e && (e.selectedIndex = 0), t._cell.parent && this.hideFolderNode(t);
                    }
                } else this.checkChildren(this._rootNode, 0);
            }
        }, {
            key: "_afterMoved",
            value: function(t) {
                var e, i = this.getChildIndex(t._cell);
                e = t.isFolder ? this.getFolderEndIndex(i, t.level) : i + 1;
                var s, n, a = this.getInsertIndexForNode(t), o = e - i;
                if (a < i) for (s = 0; s < o; s++) n = this.getChildAt(i + s), this.setChildIndex(n, a + s); else for (s = 0; s < o; s++) n = this.getChildAt(i), 
                this.setChildIndex(n, a);
            }
        }, {
            key: "getFolderEndIndex",
            value: function(t, e) {
                for (var i = this.numChildren, s = t + 1; s < i; s++) if (this.getChildAt(s)._treeNode.level <= e) return s;
                return i;
            }
        }, {
            key: "checkChildren",
            value: function(t, e) {
                for (var i = t.numChildren, s = 0; s < i; s++) {
                    e++;
                    var n = t.getChildAt(s);
                    n._cell || this.createCell(n), n._cell.parent || this.addChildAt(n._cell, e), n.isFolder && n.expanded && (e = this.checkChildren(n, e));
                }
                return e;
            }
        }, {
            key: "hideFolderNode",
            value: function(t) {
                for (var e = t.numChildren, i = 0; i < e; i++) {
                    var s = t.getChildAt(i);
                    s._cell && this.removeChild(s._cell), s.isFolder && s.expanded && this.hideFolderNode(s);
                }
            }
        }, {
            key: "removeNode",
            value: function(t) {
                if (t._cell && (t._cell.parent && this.removeChild(t._cell), this.returnToPool(t._cell), 
                t._cell._treeNode = null, t._cell = null), t.isFolder) for (var e = t.numChildren, i = 0; i < e; i++) {
                    var s = t.getChildAt(i);
                    this.removeNode(s);
                }
            }
        }, {
            key: "__cellMouseDown",
            value: function(e) {
                var i = t.GObject.cast(e.currentTarget)._treeNode;
                this._expandedStatusInEvt = i.expanded;
            }
        }, {
            key: "__expandedStateChanged",
            value: function(t) {
                t.parent._treeNode.expanded = 1 == t.selectedIndex;
            }
        }, {
            key: "dispatchItemEvent",
            value: function(t, e) {
                if (0 != this._clickToExpand) {
                    var i = t._treeNode;
                    i && i.isFolder && this._expandedStatusInEvt == i.expanded && (2 == this._clickToExpand || (i.expanded = !i.expanded));
                }
                (0, agetget.default)((0, getPrototypeOf.default)(a.prototype), "dispatchItemEvent", this).call(this, t, e);
            }
        }, {
            key: "setup_beforeAdd",
            value: function(t, e) {
                (0, agetget.default)((0, getPrototypeOf.default)(a.prototype), "setup_beforeAdd", this).call(this, t, e), 
                t.seek(e, 9), this._indent = t.getInt32(), this._clickToExpand = t.getUint8();
            }
        }, {
            key: "readItems",
            value: function(e) {
                var i, s, n, a, o, h, r, l = 0;
                for (i = e.getInt16(), s = 0; s < i; s++) if (n = e.getInt16(), n += e.pos, null != (a = e.readS()) || (a = this.defaultItem)) {
                    o = e.readBool(), r = e.getUint8();
                    var u = new t.GTreeNode(o, a);
                    if (u.expanded = !0, 0 == s) this._rootNode.addChild(u); else if (r > l) h.addChild(u); else if (r < l) {
                        for (var _ = r; _ <= l; _++) h = h.parent;
                        h.addChild(u);
                    } else h.parent.addChild(u);
                    h = u, l = r, this.setupItem(e, u.cell), e.pos = n;
                } else e.pos = n;
            }
        }, {
            key: "rootNode",
            get: function() {
                return this._rootNode;
            }
        }, {
            key: "indent",
            get: function() {
                return this._indent;
            },
            set: function(t) {
                this._indent = t;
            }
        }, {
            key: "clickToExpand",
            get: function() {
                return this._clickToExpand;
            },
            set: function(t) {
                this._clickToExpand = t;
            }
        } ]), a;
    }(t.GList);
    var A = new Array();
    t.GTreeNode = function() {
        function t(e, i) {
            (0, classCallCheck.default)(this, t), this._level = 0, this._resURL = i, e && (this._children = new Array());
        }
        return (0, l.default)(t, [ {
            key: "_setLevel",
            value: function(t) {
                this._level = t;
            }
        }, {
            key: "addChild",
            value: function(t) {
                return this.addChildAt(t, this._children.length), t;
            }
        }, {
            key: "addChildAt",
            value: function(t, e) {
                if (!t) throw new Error("child is null");
                var i = this._children.length;
                if (e >= 0 && e <= i) return t._parent == this ? this.setChildIndex(t, e) : (t._parent && t._parent.removeChild(t), 
                e == this._children.length ? this._children.push(t) : this._children.splice(e, 0, t), 
                t._parent = this, t._level = this._level + 1, t._setTree(this._tree), (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) && this._tree._afterInserted(t)), 
                t;
                throw new RangeError("Invalid child index");
            }
        }, {
            key: "removeChild",
            value: function(t) {
                var e = this._children.indexOf(t);
                return -1 != e && this.removeChildAt(e), t;
            }
        }, {
            key: "removeChildAt",
            value: function(t) {
                if (t >= 0 && t < this.numChildren) {
                    var e = this._children[t];
                    return this._children.splice(t, 1), e._parent = null, this._tree && (e._setTree(null), 
                    this._tree._afterRemoved(e)), e;
                }
                throw "Invalid child index";
            }
        }, {
            key: "removeChildren",
            value: function(t, e) {
                t = t || 0, null == e && (e = -1), (e < 0 || e >= this.numChildren) && (e = this.numChildren - 1);
                for (var i = t; i <= e; ++i) this.removeChildAt(t);
            }
        }, {
            key: "getChildAt",
            value: function(t) {
                if (t >= 0 && t < this.numChildren) return this._children[t];
                throw "Invalid child index";
            }
        }, {
            key: "getChildIndex",
            value: function(t) {
                return this._children.indexOf(t);
            }
        }, {
            key: "getPrevSibling",
            value: function() {
                if (null == this._parent) return null;
                var t = this._parent._children.indexOf(this);
                return t <= 0 ? null : this._parent._children[t - 1];
            }
        }, {
            key: "getNextSibling",
            value: function() {
                if (null == this._parent) return null;
                var t = this._parent._children.indexOf(this);
                return t < 0 || t >= this._parent._children.length - 1 ? null : this._parent._children[t + 1];
            }
        }, {
            key: "setChildIndex",
            value: function(t, e) {
                var i = this._children.indexOf(t);
                if (-1 == i) throw "Not a child of this container";
                var s = this._children.length;
                e < 0 ? e = 0 : e > s && (e = s), i != e && (this._children.splice(i, 1), this._children.splice(e, 0, t), 
                (this._tree && this == this._tree.rootNode || this._cell && this._cell.parent && this._expanded) && this._tree._afterMoved(t));
            }
        }, {
            key: "swapChildren",
            value: function(t, e) {
                var i = this._children.indexOf(t), s = this._children.indexOf(e);
                if (-1 == i || -1 == s) throw "Not a child of this container";
                this.swapChildrenAt(i, s);
            }
        }, {
            key: "swapChildrenAt",
            value: function(t, e) {
                var i = this._children[t], s = this._children[e];
                this.setChildIndex(i, e), this.setChildIndex(s, t);
            }
        }, {
            key: "expandToRoot",
            value: function() {
                for (var t = this; t; ) t.expanded = !0, t = t.parent;
            }
        }, {
            key: "_setTree",
            value: function(t) {
                if (this._tree = t, this._tree && this._tree.treeNodeWillExpand && this._expanded && this._tree.treeNodeWillExpand.runWith([ this, !0 ]), 
                this._children) for (var e = this._children.length, i = 0; i < e; i++) {
                    var s = this._children[i];
                    s._level = this._level + 1, s._setTree(t);
                }
            }
        }, {
            key: "expanded",
            set: function(t) {
                null != this._children && this._expanded != t && (this._expanded = t, this._tree && (this._expanded ? this._tree._afterExpanded(this) : this._tree._afterCollapsed(this)));
            },
            get: function() {
                return this._expanded;
            }
        }, {
            key: "isFolder",
            get: function() {
                return null != this._children;
            }
        }, {
            key: "parent",
            get: function() {
                return this._parent;
            }
        }, {
            key: "text",
            get: function() {
                return this._cell ? this._cell.text : null;
            },
            set: function(t) {
                this._cell && (this._cell.text = t);
            }
        }, {
            key: "icon",
            get: function() {
                return this._cell ? this._cell.icon : null;
            },
            set: function(t) {
                this._cell && (this._cell.icon = t);
            }
        }, {
            key: "cell",
            get: function() {
                return this._cell;
            }
        }, {
            key: "level",
            get: function() {
                return this._level;
            }
        }, {
            key: "numChildren",
            get: function() {
                return this._children.length;
            }
        }, {
            key: "tree",
            get: function() {
                return this._tree;
            }
        } ]), t;
    }(), t.PackageItem = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this.width = 0, this.height = 0;
        }
        return (0, l.default)(e, [ {
            key: "load",
            value: function() {
                return this.owner.getItemAsset(this);
            }
        }, {
            key: "getBranch",
            value: function() {
                if (this.branches && -1 != this.owner._branchIndex) {
                    var t = this.branches[this.owner._branchIndex];
                    if (t) return this.owner.getItemById(t);
                }
                return this;
            }
        }, {
            key: "getHighResolution",
            value: function() {
                if (this.highResolution && t.GRoot.contentScaleLevel > 0) {
                    var e = this.highResolution[t.GRoot.contentScaleLevel - 1];
                    if (e) return this.owner.getItemById(e);
                }
                return this;
            }
        }, {
            key: "toString",
            value: function() {
                return this.name;
            }
        } ]), e;
    }(), t.PopupMenu = function() {
        function e(i) {
            if ((0, classCallCheck.default)(this, e), !i && !(i = t.UIConfig.popupMenu)) throw "UIConfig.popupMenu not defined";
            this._contentPane = t.UIPackage.createObjectFromURL(i).asCom, this._contentPane.on(Laya.Event.DISPLAY, this, this.__addedToStage), 
            this._list = this._contentPane.getChild("list"), this._list.removeChildrenToPool(), 
            this._list.addRelation(this._contentPane, t.RelationType.Width), this._list.removeRelation(this._contentPane, t.RelationType.Height), 
            this._contentPane.addRelation(this._list, t.RelationType.Height), this._list.on(t.Events.CLICK_ITEM, this, this.__clickItem);
        }
        return (0, l.default)(e, [ {
            key: "dispose",
            value: function() {
                this._contentPane.dispose();
            }
        }, {
            key: "addItem",
            value: function(t, e) {
                var i = this._list.addItemFromPool().asButton;
                i.title = t, i.data = e, i.grayed = !1;
                var s = i.getController("checked");
                return s && (s.selectedIndex = 0), i;
            }
        }, {
            key: "addItemAt",
            value: function(t, e, i) {
                var s = this._list.getFromPool().asButton;
                this._list.addChildAt(s, e), s.title = t, s.data = i, s.grayed = !1;
                var n = s.getController("checked");
                return n && (n.selectedIndex = 0), s;
            }
        }, {
            key: "addSeperator",
            value: function() {
                if (null == t.UIConfig.popupMenu_seperator) throw "UIConfig.popupMenu_seperator not defined";
                this.list.addItemFromPool(t.UIConfig.popupMenu_seperator);
            }
        }, {
            key: "getItemName",
            value: function(t) {
                return this._list.getChildAt(t).name;
            }
        }, {
            key: "setItemText",
            value: function(t, e) {
                this._list.getChild(t).asButton.title = e;
            }
        }, {
            key: "setItemVisible",
            value: function(t, e) {
                var i = this._list.getChild(t).asButton;
                i.visible != e && (i.visible = e, this._list.setBoundsChangedFlag());
            }
        }, {
            key: "setItemGrayed",
            value: function(t, e) {
                this._list.getChild(t).asButton.grayed = e;
            }
        }, {
            key: "setItemCheckable",
            value: function(t, e) {
                var i = this._list.getChild(t).asButton.getController("checked");
                i && (e ? 0 == i.selectedIndex && (i.selectedIndex = 1) : i.selectedIndex = 0);
            }
        }, {
            key: "setItemChecked",
            value: function(t, e) {
                var i = this._list.getChild(t).asButton.getController("checked");
                i && (i.selectedIndex = e ? 2 : 1);
            }
        }, {
            key: "isItemChecked",
            value: function(t) {
                var e = this._list.getChild(t).asButton.getController("checked");
                return !!e && 2 == e.selectedIndex;
            }
        }, {
            key: "removeItem",
            value: function(t) {
                var e = this._list.getChild(t);
                if (e) {
                    var i = this._list.getChildIndex(e);
                    return this._list.removeChildToPoolAt(i), !0;
                }
                return !1;
            }
        }, {
            key: "clearItems",
            value: function() {
                this._list.removeChildrenToPool();
            }
        }, {
            key: "show",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i = arguments.length > 1 ? arguments[1] : void 0;
                (null != e ? e.root : t.GRoot.inst).showPopup(this.contentPane, e instanceof t.GRoot ? null : e, i);
            }
        }, {
            key: "__clickItem",
            value: function(t) {
                Laya.timer.once(100, this, this.__clickItem2, [ t ]);
            }
        }, {
            key: "__clickItem2",
            value: function(e) {
                if (e instanceof t.GButton) if (e.grayed) this._list.selectedIndex = -1; else {
                    var i = e.asCom.getController("checked");
                    i && 0 != i.selectedIndex && (1 == i.selectedIndex ? i.selectedIndex = 2 : i.selectedIndex = 1), 
                    this._contentPane.parent.hidePopup(this.contentPane), null != e.data && e.data.run();
                }
            }
        }, {
            key: "__addedToStage",
            value: function() {
                this._list.selectedIndex = -1, this._list.resizeToFit(1e5, 10);
            }
        }, {
            key: "itemCount",
            get: function() {
                return this._list.numChildren;
            }
        }, {
            key: "contentPane",
            get: function() {
                return this._contentPane;
            }
        }, {
            key: "list",
            get: function() {
                return this._list;
            }
        } ]), e;
    }(), t.RelationItem = function() {
        function e(t) {
            (0, classCallCheck.default)(this, e), this._owner = t, this._defs = new Array();
        }
        return (0, l.default)(e, [ {
            key: "add",
            value: function(e, i) {
                if (e == t.RelationType.Size) return this.add(t.RelationType.Width, i), void this.add(t.RelationType.Height, i);
                for (var s = this._defs.length, n = 0; n < s; n++) if (this._defs[n].type == e) return;
                this.internalAdd(e, i);
            }
        }, {
            key: "internalAdd",
            value: function(e, i) {
                if (e == t.RelationType.Size) return this.internalAdd(t.RelationType.Width, i), 
                void this.internalAdd(t.RelationType.Height, i);
                var s = new E();
                s.percent = i, s.type = e, s.axis = e <= t.RelationType.Right_Right || e == t.RelationType.Width || e >= t.RelationType.LeftExt_Left && e <= t.RelationType.RightExt_Right ? 0 : 1, 
                this._defs.push(s);
            }
        }, {
            key: "remove",
            value: function(e) {
                if (e == t.RelationType.Size) return this.remove(t.RelationType.Width), void this.remove(t.RelationType.Height);
                for (var i = this._defs.length, s = 0; s < i; s++) if (this._defs[s].type == e) {
                    this._defs.splice(s, 1);
                    break;
                }
            }
        }, {
            key: "copyFrom",
            value: function(t) {
                this._target = t.target, this._defs.length = 0;
                for (var e = t._defs.length, i = 0; i < e; i++) {
                    var s = t._defs[i], n = new E();
                    n.copyFrom(s), this._defs.push(n);
                }
            }
        }, {
            key: "dispose",
            value: function() {
                this._target && (this.releaseRefTarget(), this._target = null);
            }
        }, {
            key: "applyOnSelfResized",
            value: function(e, i, s) {
                var n = this._defs.length;
                if (0 != n) {
                    for (var a = this._owner.x, o = this._owner.y, h = 0; h < n; h++) switch (this._defs[h].type) {
                      case t.RelationType.Center_Center:
                        this._owner.x -= (.5 - (s ? this._owner.pivotX : 0)) * e;
                        break;

                      case t.RelationType.Right_Center:
                      case t.RelationType.Right_Left:
                      case t.RelationType.Right_Right:
                        this._owner.x -= (1 - (s ? this._owner.pivotX : 0)) * e;
                        break;

                      case t.RelationType.Middle_Middle:
                        this._owner.y -= (.5 - (s ? this._owner.pivotY : 0)) * i;
                        break;

                      case t.RelationType.Bottom_Middle:
                      case t.RelationType.Bottom_Top:
                      case t.RelationType.Bottom_Bottom:
                        this._owner.y -= (1 - (s ? this._owner.pivotY : 0)) * i;
                    }
                    if ((a != this._owner.x || o != this._owner.y) && (a = this._owner.x - a, o = this._owner.y - o, 
                    this._owner.updateGearFromRelations(1, a, o), this._owner.parent && this._owner.parent._transitions.length > 0)) {
                        n = this._owner.parent._transitions.length;
                        for (var r = 0; r < n; r++) this._owner.parent._transitions[r].updateFromRelations(this._owner.id, a, o);
                    }
                }
            }
        }, {
            key: "applyOnXYChanged",
            value: function(e, i, s) {
                var n;
                switch (e.type) {
                  case t.RelationType.Left_Left:
                  case t.RelationType.Left_Center:
                  case t.RelationType.Left_Right:
                  case t.RelationType.Center_Center:
                  case t.RelationType.Right_Left:
                  case t.RelationType.Right_Center:
                  case t.RelationType.Right_Right:
                    this._owner.x += i;
                    break;

                  case t.RelationType.Top_Top:
                  case t.RelationType.Top_Middle:
                  case t.RelationType.Top_Bottom:
                  case t.RelationType.Middle_Middle:
                  case t.RelationType.Bottom_Top:
                  case t.RelationType.Bottom_Middle:
                  case t.RelationType.Bottom_Bottom:
                    this._owner.y += s;
                    break;

                  case t.RelationType.Width:
                  case t.RelationType.Height:
                    break;

                  case t.RelationType.LeftExt_Left:
                  case t.RelationType.LeftExt_Right:
                    this._owner != this._target.parent ? (n = this._owner.xMin, this._owner.width = this._owner._rawWidth - i, 
                    this._owner.xMin = n + i) : this._owner.width = this._owner._rawWidth - i;
                    break;

                  case t.RelationType.RightExt_Left:
                  case t.RelationType.RightExt_Right:
                    this._owner != this._target.parent ? (n = this._owner.xMin, this._owner.width = this._owner._rawWidth + i, 
                    this._owner.xMin = n) : this._owner.width = this._owner._rawWidth + i;
                    break;

                  case t.RelationType.TopExt_Top:
                  case t.RelationType.TopExt_Bottom:
                    this._owner != this._target.parent ? (n = this._owner.yMin, this._owner.height = this._owner._rawHeight - s, 
                    this._owner.yMin = n + s) : this._owner.height = this._owner._rawHeight - s;
                    break;

                  case t.RelationType.BottomExt_Top:
                  case t.RelationType.BottomExt_Bottom:
                    this._owner != this._target.parent ? (n = this._owner.yMin, this._owner.height = this._owner._rawHeight + s, 
                    this._owner.yMin = n) : this._owner.height = this._owner._rawHeight + s;
                }
            }
        }, {
            key: "applyOnSizeChanged",
            value: function(e) {
                var i, s, n = 0, a = 0, o = 0;
                switch (0 == e.axis ? (this._target != this._owner.parent && (n = this._target.x, 
                this._target.pivotAsAnchor && (a = this._target.pivotX)), e.percent ? 0 != this._targetWidth && (o = this._target._width / this._targetWidth) : o = this._target._width - this._targetWidth) : (this._target != this._owner.parent && (n = this._target.y, 
                this._target.pivotAsAnchor && (a = this._target.pivotY)), e.percent ? 0 != this._targetHeight && (o = this._target._height / this._targetHeight) : o = this._target._height - this._targetHeight), 
                e.type) {
                  case t.RelationType.Left_Left:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * o : 0 != a && (this._owner.x += o * -a);
                    break;

                  case t.RelationType.Left_Center:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * o : this._owner.x += o * (.5 - a);
                    break;

                  case t.RelationType.Left_Right:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin - n) * o : this._owner.x += o * (1 - a);
                    break;

                  case t.RelationType.Center_Center:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin + .5 * this._owner._rawWidth - n) * o - .5 * this._owner._rawWidth : this._owner.x += o * (.5 - a);
                    break;

                  case t.RelationType.Right_Left:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * o - this._owner._rawWidth : 0 != a && (this._owner.x += o * -a);
                    break;

                  case t.RelationType.Right_Center:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * o - this._owner._rawWidth : this._owner.x += o * (.5 - a);
                    break;

                  case t.RelationType.Right_Right:
                    e.percent ? this._owner.xMin = n + (this._owner.xMin + this._owner._rawWidth - n) * o - this._owner._rawWidth : this._owner.x += o * (1 - a);
                    break;

                  case t.RelationType.Top_Top:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * o : 0 != a && (this._owner.y += o * -a);
                    break;

                  case t.RelationType.Top_Middle:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * o : this._owner.y += o * (.5 - a);
                    break;

                  case t.RelationType.Top_Bottom:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin - n) * o : this._owner.y += o * (1 - a);
                    break;

                  case t.RelationType.Middle_Middle:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin + .5 * this._owner._rawHeight - n) * o - .5 * this._owner._rawHeight : this._owner.y += o * (.5 - a);
                    break;

                  case t.RelationType.Bottom_Top:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * o - this._owner._rawHeight : 0 != a && (this._owner.y += o * -a);
                    break;

                  case t.RelationType.Bottom_Middle:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * o - this._owner._rawHeight : this._owner.y += o * (.5 - a);
                    break;

                  case t.RelationType.Bottom_Bottom:
                    e.percent ? this._owner.yMin = n + (this._owner.yMin + this._owner._rawHeight - n) * o - this._owner._rawHeight : this._owner.y += o * (1 - a);
                    break;

                  case t.RelationType.Width:
                    i = this._owner._underConstruct && this._owner == this._target.parent ? this._owner.sourceWidth - this._target.initWidth : this._owner._rawWidth - this._targetWidth, 
                    e.percent && (i *= o), this._target == this._owner.parent ? this._owner.pivotAsAnchor ? (s = this._owner.xMin, 
                    this._owner.setSize(this._target._width + i, this._owner._rawHeight, !0), this._owner.xMin = s) : this._owner.setSize(this._target._width + i, this._owner._rawHeight, !0) : this._owner.width = this._target._width + i;
                    break;

                  case t.RelationType.Height:
                    i = this._owner._underConstruct && this._owner == this._target.parent ? this._owner.sourceHeight - this._target.initHeight : this._owner._rawHeight - this._targetHeight, 
                    e.percent && (i *= o), this._target == this._owner.parent ? this._owner.pivotAsAnchor ? (s = this._owner.yMin, 
                    this._owner.setSize(this._owner._rawWidth, this._target._height + i, !0), this._owner.yMin = s) : this._owner.setSize(this._owner._rawWidth, this._target._height + i, !0) : this._owner.height = this._target._height + i;
                    break;

                  case t.RelationType.LeftExt_Left:
                    s = this._owner.xMin, i = e.percent ? n + (s - n) * o - s : o * -a, this._owner.width = this._owner._rawWidth - i, 
                    this._owner.xMin = s + i;
                    break;

                  case t.RelationType.LeftExt_Right:
                    s = this._owner.xMin, i = e.percent ? n + (s - n) * o - s : o * (1 - a), this._owner.width = this._owner._rawWidth - i, 
                    this._owner.xMin = s + i;
                    break;

                  case t.RelationType.RightExt_Left:
                    s = this._owner.xMin, i = e.percent ? n + (s + this._owner._rawWidth - n) * o - (s + this._owner._rawWidth) : o * -a, 
                    this._owner.width = this._owner._rawWidth + i, this._owner.xMin = s;
                    break;

                  case t.RelationType.RightExt_Right:
                    s = this._owner.xMin, e.percent ? this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.width = n + this._target._width - this._target._width * a + (this._owner.sourceWidth - n - this._target.initWidth + this._target.initWidth * a) * o : this._owner.width = n + (this._owner._rawWidth - n) * o : (i = n + (s + this._owner._rawWidth - n) * o - (s + this._owner._rawWidth), 
                    this._owner.width = this._owner._rawWidth + i, this._owner.xMin = s) : this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - a) : this._owner.width = this._owner._rawWidth + o * (1 - a) : (i = o * (1 - a), 
                    this._owner.width = this._owner._rawWidth + i, this._owner.xMin = s);
                    break;

                  case t.RelationType.TopExt_Top:
                    s = this._owner.yMin, i = e.percent ? n + (s - n) * o - s : o * -a, this._owner.height = this._owner._rawHeight - i, 
                    this._owner.yMin = s + i;
                    break;

                  case t.RelationType.TopExt_Bottom:
                    s = this._owner.yMin, i = e.percent ? n + (s - n) * o - s : o * (1 - a), this._owner.height = this._owner._rawHeight - i, 
                    this._owner.yMin = s + i;
                    break;

                  case t.RelationType.BottomExt_Top:
                    s = this._owner.yMin, i = e.percent ? n + (s + this._owner._rawHeight - n) * o - (s + this._owner._rawHeight) : o * -a, 
                    this._owner.height = this._owner._rawHeight + i, this._owner.yMin = s;
                    break;

                  case t.RelationType.BottomExt_Bottom:
                    s = this._owner.yMin, e.percent ? this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.height = n + this._target._height - this._target._height * a + (this._owner.sourceHeight - n - this._target.initHeight + this._target.initHeight * a) * o : this._owner.height = n + (this._owner._rawHeight - n) * o : (i = n + (s + this._owner._rawHeight - n) * o - (s + this._owner._rawHeight), 
                    this._owner.height = this._owner._rawHeight + i, this._owner.yMin = s) : this._owner == this._target.parent ? this._owner._underConstruct ? this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - a) : this._owner.height = this._owner._rawHeight + o * (1 - a) : (i = o * (1 - a), 
                    this._owner.height = this._owner._rawHeight + i, this._owner.yMin = s);
                }
            }
        }, {
            key: "addRefTarget",
            value: function() {
                this._target != this._owner.parent && this._target.on(t.Events.XY_CHANGED, this, this.__targetXYChanged), 
                this._target.on(t.Events.SIZE_CHANGED, this, this.__targetSizeChanged), this._target.on(t.Events.SIZE_DELAY_CHANGE, this, this.__targetSizeWillChange), 
                this._targetX = this._target.x, this._targetY = this._target.y, this._targetWidth = this._target._width, 
                this._targetHeight = this._target._height;
            }
        }, {
            key: "releaseRefTarget",
            value: function() {
                null != this._target.displayObject && (this._target.off(t.Events.XY_CHANGED, this, this.__targetXYChanged), 
                this._target.off(t.Events.SIZE_CHANGED, this, this.__targetSizeChanged), this._target.off(t.Events.SIZE_DELAY_CHANGE, this, this.__targetSizeWillChange));
            }
        }, {
            key: "__targetXYChanged",
            value: function() {
                if (null != this._owner.relations.handling || null != this._owner.group && this._owner.group._updating) return this._targetX = this._target.x, 
                void (this._targetY = this._target.y);
                this._owner.relations.handling = this._target;
                for (var t = this._owner.x, e = this._owner.y, i = this._target.x - this._targetX, s = this._target.y - this._targetY, n = this._defs.length, a = 0; a < n; a++) this.applyOnXYChanged(this._defs[a], i, s);
                if (this._targetX = this._target.x, this._targetY = this._target.y, (t != this._owner.x || e != this._owner.y) && (t = this._owner.x - t, 
                e = this._owner.y - e, this._owner.updateGearFromRelations(1, t, e), this._owner.parent && this._owner.parent._transitions.length > 0)) {
                    n = this._owner.parent._transitions.length;
                    for (var o = 0; o < n; o++) this._owner.parent._transitions[o].updateFromRelations(this._owner.id, t, e);
                }
                this._owner.relations.handling = null;
            }
        }, {
            key: "__targetSizeChanged",
            value: function() {
                if (this._owner.relations.sizeDirty && this._owner.relations.ensureRelationsSizeCorrect(), 
                null != this._owner.relations.handling) return this._targetWidth = this._target._width, 
                void (this._targetHeight = this._target._height);
                this._owner.relations.handling = this._target;
                for (var t = this._owner.x, e = this._owner.y, i = this._owner._rawWidth, s = this._owner._rawHeight, n = this._defs.length, a = 0; a < n; a++) this.applyOnSizeChanged(this._defs[a]);
                if (this._targetWidth = this._target._width, this._targetHeight = this._target._height, 
                (t != this._owner.x || e != this._owner.y) && (t = this._owner.x - t, e = this._owner.y - e, 
                this._owner.updateGearFromRelations(1, t, e), this._owner.parent && this._owner.parent._transitions.length > 0)) {
                    n = this._owner.parent._transitions.length;
                    for (var o = 0; o < n; o++) this._owner.parent._transitions[o].updateFromRelations(this._owner.id, t, e);
                }
                i == this._owner._rawWidth && s == this._owner._rawHeight || (i = this._owner._rawWidth - i, 
                s = this._owner._rawHeight - s, this._owner.updateGearFromRelations(2, i, s)), this._owner.relations.handling = null;
            }
        }, {
            key: "__targetSizeWillChange",
            value: function() {
                this._owner.relations.sizeDirty = !0;
            }
        }, {
            key: "owner",
            get: function() {
                return this._owner;
            }
        }, {
            key: "target",
            set: function(t) {
                this._target != t && (this._target && this.releaseRefTarget(), this._target = t, 
                this._target && this.addRefTarget());
            },
            get: function() {
                return this._target;
            }
        }, {
            key: "isEmpty",
            get: function() {
                return 0 == this._defs.length;
            }
        } ]), e;
    }();
    var E = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, l.default)(t, [ {
            key: "copyFrom",
            value: function(t) {
                this.percent = t.percent, this.type = t.type, this.axis = t.axis;
            }
        } ]), t;
    }();
    t.Relations = function() {
        function e(t) {
            (0, classCallCheck.default)(this, e), this._owner = t, this._items = [];
        }
        return (0, l.default)(e, [ {
            key: "add",
            value: function(e, i, s) {
                for (var n = this._items.length, a = 0; a < n; a++) {
                    var o = this._items[a];
                    if (o.target == e) return void o.add(i, s);
                }
                var h = new t.RelationItem(this._owner);
                h.target = e, h.add(i, s), this._items.push(h);
            }
        }, {
            key: "remove",
            value: function(t, e) {
                e = e || 0;
                for (var i = this._items.length, s = 0; s < i; ) {
                    var n = this._items[s];
                    n.target == t ? (n.remove(e), n.isEmpty ? (n.dispose(), this._items.splice(s, 1), 
                    i--) : s++) : s++;
                }
            }
        }, {
            key: "contains",
            value: function(t) {
                for (var e = this._items.length, i = 0; i < e; i++) if (this._items[i].target == t) return !0;
                return !1;
            }
        }, {
            key: "clearFor",
            value: function(t) {
                for (var e = this._items.length, i = 0; i < e; ) {
                    var s = this._items[i];
                    s.target == t ? (s.dispose(), this._items.splice(i, 1), e--) : i++;
                }
            }
        }, {
            key: "clearAll",
            value: function() {
                for (var t = this._items.length, e = 0; e < t; e++) this._items[e].dispose();
                this._items.length = 0;
            }
        }, {
            key: "copyFrom",
            value: function(e) {
                this.clearAll();
                for (var i = e._items, s = i.length, n = 0; n < s; n++) {
                    var a = i[n], o = new t.RelationItem(this._owner);
                    o.copyFrom(a), this._items.push(o);
                }
            }
        }, {
            key: "dispose",
            value: function() {
                this.clearAll();
            }
        }, {
            key: "onOwnerSizeChanged",
            value: function(t, e, i) {
                if (0 != this._items.length) for (var s = this._items.length, n = 0; n < s; n++) this._items[n].applyOnSelfResized(t, e, i);
            }
        }, {
            key: "ensureRelationsSizeCorrect",
            value: function() {
                if (0 != this._items.length) {
                    this.sizeDirty = !1;
                    for (var t = this._items.length, e = 0; e < t; e++) this._items[e].target.ensureSizeCorrect();
                }
            }
        }, {
            key: "setup",
            value: function(e, i) {
                for (var s, n = e.readByte(), a = 0; a < n; a++) {
                    var o = e.getInt16();
                    s = -1 == o ? this._owner.parent : i ? this._owner.getChildAt(o) : this._owner.parent.getChildAt(o);
                    var h = new t.RelationItem(this._owner);
                    h.target = s, this._items.push(h);
                    for (var r = e.readByte(), l = 0; l < r; l++) {
                        var u = e.readByte(), _ = e.readBool();
                        h.internalAdd(u, _);
                    }
                }
            }
        }, {
            key: "empty",
            get: function() {
                return 0 == this._items.length;
            }
        } ]), e;
    }();
    var F = function() {
        function e(i) {
            (0, classCallCheck.default)(this, e), this._owner = i, this._maskContainer = new Laya.Sprite(), 
            this._owner.displayObject.addChild(this._maskContainer), this._container = this._owner._container, 
            this._container.pos(0, 0), this._maskContainer.addChild(this._container), this._mouseWheelEnabled = !0, 
            this._xPos = 0, this._yPos = 0, this._aniFlag = 0, this._tweening = 0, this._loop = 0, 
            this._footerLockedSize = 0, this._headerLockedSize = 0, this._scrollBarMargin = new t.Margin(), 
            this._viewSize = new Laya.Point(), this._contentSize = new Laya.Point(), this._pageSize = new Laya.Point(1, 1), 
            this._overlapSize = new Laya.Point(), this._tweenTime = new Laya.Point(), this._tweenStart = new Laya.Point(), 
            this._tweenDuration = new Laya.Point(), this._tweenChange = new Laya.Point(), this._velocity = new Laya.Point(), 
            this._containerPos = new Laya.Point(), this._beginTouchPos = new Laya.Point(), this._lastTouchPos = new Laya.Point(), 
            this._lastTouchGlobalPos = new Laya.Point(), this._scrollStep = t.UIConfig.defaultScrollStep, 
            this._mouseWheelStep = 2 * this._scrollStep, this._decelerationRate = t.UIConfig.defaultScrollDecelerationRate, 
            this._owner.on(Laya.Event.MOUSE_DOWN, this, this.__mouseDown), this._owner.on(Laya.Event.MOUSE_WHEEL, this, this.__mouseWheel);
        }
        return (0, l.default)(e, [ {
            key: "setup",
            value: function(e) {
                this._scrollType = e.readByte();
                var i = e.readByte(), s = e.getInt32();
                e.readBool() && (this._scrollBarMargin.top = e.getInt32(), this._scrollBarMargin.bottom = e.getInt32(), 
                this._scrollBarMargin.left = e.getInt32(), this._scrollBarMargin.right = e.getInt32());
                var n = e.readS(), a = e.readS(), o = e.readS(), h = e.readS();
                if (0 != (1 & s) && (this._displayOnLeft = !0), 0 != (2 & s) && (this._snapToItem = !0), 
                0 != (4 & s) && (this._displayInDemand = !0), 0 != (8 & s) && (this._pageMode = !0), 
                this._touchEffect = !!(16 & s) || !(32 & s) && t.UIConfig.defaultScrollTouchEffect, 
                this._bouncebackEffect = !!(64 & s) || !(128 & s) && t.UIConfig.defaultScrollBounceEffect, 
                0 != (256 & s) && (this._inertiaDisabled = !0), 0 == (512 & s) && (this._maskContainer.scrollRect = new Laya.Rectangle()), 
                0 != (1024 & s) && (this._floating = !0), 0 != (2048 & s) && (this._dontClipMargin = !0), 
                i == t.ScrollBarDisplayType.Default && (i = t.UIConfig.defaultScrollBarDisplay), 
                i != t.ScrollBarDisplayType.Hidden) {
                    if (this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Vertical) {
                        var r = n || t.UIConfig.verticalScrollBar;
                        if (r) {
                            if (this._vtScrollBar = t.UIPackage.createObjectFromURL(r), !this._vtScrollBar) throw "cannot create scrollbar from " + r;
                            this._vtScrollBar.setScrollPane(this, !0), this._owner.displayObject.addChild(this._vtScrollBar.displayObject);
                        }
                    }
                    if ((this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Horizontal) && (r = a || t.UIConfig.horizontalScrollBar)) {
                        if (this._hzScrollBar = t.UIPackage.createObjectFromURL(r), !this._hzScrollBar) throw "cannot create scrollbar from " + r;
                        this._hzScrollBar.setScrollPane(this, !1), this._owner.displayObject.addChild(this._hzScrollBar.displayObject);
                    }
                    i == t.ScrollBarDisplayType.Auto && (this._scrollBarDisplayAuto = !0), this._scrollBarDisplayAuto && (this._vtScrollBar && (this._vtScrollBar.displayObject.visible = !1), 
                    this._hzScrollBar && (this._hzScrollBar.displayObject.visible = !1));
                } else this._mouseWheelEnabled = !1;
                if (o && (this._header = t.UIPackage.createObjectFromURL(o), !this._header)) throw new Error("FairyGUI: cannot create scrollPane this.header from " + o);
                if (h && (this._footer = t.UIPackage.createObjectFromURL(h), !this._footer)) throw new Error("FairyGUI: cannot create scrollPane this.footer from " + h);
                (this._header || this._footer) && (this._refreshBarAxis = this._scrollType == t.ScrollType.Both || this._scrollType == t.ScrollType.Vertical ? "y" : "x"), 
                this.setSize(this.owner.width, this.owner.height);
            }
        }, {
            key: "dispose",
            value: function() {
                e.draggingPane == this && (e.draggingPane = null), 0 != this._tweening && Laya.timer.clear(this, this.tweenUpdate), 
                this._pageController = null, this._hzScrollBar && this._hzScrollBar.dispose(), this._vtScrollBar && this._vtScrollBar.dispose(), 
                this._header && this._header.dispose(), this._footer && this._footer.dispose();
            }
        }, {
            key: "setPercX",
            value: function(e, i) {
                this._owner.ensureBoundsCorrect(), this.setPosX(this._overlapSize.x * t.ToolSet.clamp01(e), i);
            }
        }, {
            key: "setPercY",
            value: function(e, i) {
                this._owner.ensureBoundsCorrect(), this.setPosY(this._overlapSize.y * t.ToolSet.clamp01(e), i);
            }
        }, {
            key: "setPosX",
            value: function(e, i) {
                this._owner.ensureBoundsCorrect(), 1 == this._loop && (e = this.loopCheckingNewPos(e, "x")), 
                (e = t.ToolSet.clamp(e, 0, this._overlapSize.x)) != this._xPos && (this._xPos = e, 
                this.posChanged(i));
            }
        }, {
            key: "setPosY",
            value: function(e, i) {
                this._owner.ensureBoundsCorrect(), 1 == this._loop && (e = this.loopCheckingNewPos(e, "y")), 
                (e = t.ToolSet.clamp(e, 0, this._overlapSize.y)) != this._yPos && (this._yPos = e, 
                this.posChanged(i));
            }
        }, {
            key: "setCurrentPageX",
            value: function(t, e) {
                this._pageMode && (this._owner.ensureBoundsCorrect(), this._overlapSize.x > 0 && this.setPosX(t * this._pageSize.x, e));
            }
        }, {
            key: "setCurrentPageY",
            value: function(t, e) {
                this._pageMode && (this._owner.ensureBoundsCorrect(), this._overlapSize.y > 0 && this.setPosY(t * this._pageSize.y, e));
            }
        }, {
            key: "scrollTop",
            value: function(t) {
                this.setPercY(0, t);
            }
        }, {
            key: "scrollBottom",
            value: function(t) {
                this.setPercY(1, t);
            }
        }, {
            key: "scrollUp",
            value: function(t, e) {
                t = t || 1, this._pageMode ? this.setPosY(this._yPos - this._pageSize.y * t, e) : this.setPosY(this._yPos - this._scrollStep * t, e);
            }
        }, {
            key: "scrollDown",
            value: function(t, e) {
                t = t || 1, this._pageMode ? this.setPosY(this._yPos + this._pageSize.y * t, e) : this.setPosY(this._yPos + this._scrollStep * t, e);
            }
        }, {
            key: "scrollLeft",
            value: function(t, e) {
                t = t || 1, this._pageMode ? this.setPosX(this._xPos - this._pageSize.x * t, e) : this.setPosX(this._xPos - this._scrollStep * t, e);
            }
        }, {
            key: "scrollRight",
            value: function(t, e) {
                t = t || 1, this._pageMode ? this.setPosX(this._xPos + this._pageSize.x * t, e) : this.setPosX(this._xPos + this._scrollStep * t, e);
            }
        }, {
            key: "scrollToView",
            value: function(e, i, s) {
                var n;
                if (this._owner.ensureBoundsCorrect(), this._needRefresh && this.refresh(), e instanceof t.GObject ? e.parent != this._owner ? (e.parent.localToGlobalRect(e.x, e.y, e.width, e.height, W), 
                n = this._owner.globalToLocalRect(W.x, W.y, W.width, W.height, W)) : (n = W).setTo(e.x, e.y, e.width, e.height) : n = e, 
                this._overlapSize.y > 0) {
                    var a = this._yPos + this._viewSize.y;
                    s || n.y <= this._yPos || n.height >= this._viewSize.y ? this._pageMode ? this.setPosY(Math.floor(n.y / this._pageSize.y) * this._pageSize.y, i) : this.setPosY(n.y, i) : n.y + n.height > a && (this._pageMode ? this.setPosY(Math.floor(n.y / this._pageSize.y) * this._pageSize.y, i) : n.height <= this._viewSize.y / 2 ? this.setPosY(n.y + 2 * n.height - this._viewSize.y, i) : this.setPosY(n.y + n.height - this._viewSize.y, i));
                }
                if (this._overlapSize.x > 0) {
                    var o = this._xPos + this._viewSize.x;
                    s || n.x <= this._xPos || n.width >= this._viewSize.x ? this._pageMode ? this.setPosX(Math.floor(n.x / this._pageSize.x) * this._pageSize.x, i) : this.setPosX(n.x, i) : n.x + n.width > o && (this._pageMode ? this.setPosX(Math.floor(n.x / this._pageSize.x) * this._pageSize.x, i) : n.width <= this._viewSize.x / 2 ? this.setPosX(n.x + 2 * n.width - this._viewSize.x, i) : this.setPosX(n.x + n.width - this._viewSize.x, i));
                }
                !i && this._needRefresh && this.refresh();
            }
        }, {
            key: "isChildInView",
            value: function(t) {
                if (this._overlapSize.y > 0) {
                    var e = t.y + this._container.y;
                    if (e < -t.height || e > this._viewSize.y) return !1;
                }
                return !(this._overlapSize.x > 0 && ((e = t.x + this._container.x) < -t.width || e > this._viewSize.x));
            }
        }, {
            key: "cancelDragging",
            value: function() {
                this._owner.displayObject.stage.off(Laya.Event.MOUSE_MOVE, this, this.__mouseMove), 
                this._owner.displayObject.stage.off(Laya.Event.MOUSE_UP, this, this.__mouseUp), 
                this._owner.displayObject.stage.off(Laya.Event.CLICK, this, this.__click), e.draggingPane == this && (e.draggingPane = null), 
                R = 0, this._dragged = !1, this._maskContainer.mouseEnabled = !0;
            }
        }, {
            key: "lockHeader",
            value: function(t) {
                this._headerLockedSize != t && (this._headerLockedSize = t, !this._refreshEventDispatching && this._container[this._refreshBarAxis] >= 0 && (this._tweenStart.setTo(this._container.x, this._container.y), 
                this._tweenChange.setTo(0, 0), this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis], 
                this._tweenDuration.setTo(D, D), this.startTween(2)));
            }
        }, {
            key: "lockFooter",
            value: function(t) {
                if (this._footerLockedSize != t && (this._footerLockedSize = t, !this._refreshEventDispatching && this._container[this._refreshBarAxis] <= -this._overlapSize[this._refreshBarAxis])) {
                    this._tweenStart.setTo(this._container.x, this._container.y), this._tweenChange.setTo(0, 0);
                    var e = this._overlapSize[this._refreshBarAxis];
                    0 == e ? e = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : e += this._footerLockedSize, 
                    this._tweenChange[this._refreshBarAxis] = -e - this._tweenStart[this._refreshBarAxis], 
                    this._tweenDuration.setTo(D, D), this.startTween(2);
                }
            }
        }, {
            key: "onOwnerSizeChanged",
            value: function() {
                this.setSize(this._owner.width, this._owner.height), this.posChanged(!1);
            }
        }, {
            key: "handleControllerChanged",
            value: function(e) {
                this._pageController == e && (this._scrollType == t.ScrollType.Horizontal ? this.setCurrentPageX(e.selectedIndex, !0) : this.setCurrentPageY(e.selectedIndex, !0));
            }
        }, {
            key: "updatePageController",
            value: function() {
                var e;
                if (null != this._pageController && !this._pageController.changing && (e = this._scrollType == t.ScrollType.Horizontal ? this.currentPageX : this.currentPageY) < this._pageController.pageCount) {
                    var i = this._pageController;
                    this._pageController = null, i.selectedIndex = e, this._pageController = i;
                }
            }
        }, {
            key: "adjustMaskContainer",
            value: function() {
                var t = 0, e = 0;
                this._dontClipMargin ? this._displayOnLeft && this._vtScrollBar && !this._floating && (t = this._vtScrollBar.width) : (t = this._displayOnLeft && this._vtScrollBar && !this._floating ? this._owner.margin.left + this._vtScrollBar.width : this._owner.margin.left, 
                e = this._owner.margin.top), this._maskContainer.pos(t, e), t = this._owner._alignOffset.x, 
                e = this._owner._alignOffset.y, (0 != t || 0 != e || this._dontClipMargin) && (this._alignContainer || (this._alignContainer = new Laya.Sprite(), 
                this._maskContainer.addChild(this._alignContainer), this._alignContainer.addChild(this._container))), 
                this._alignContainer && (this._dontClipMargin && (t += this._owner.margin.left, 
                e += this._owner.margin.top), this._alignContainer.pos(t, e));
            }
        }, {
            key: "setSize",
            value: function(t, e) {
                this.adjustMaskContainer(), this._hzScrollBar && (this._hzScrollBar.y = e - this._hzScrollBar.height, 
                this._vtScrollBar ? (this._hzScrollBar.width = t - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right, 
                this._displayOnLeft ? this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width : this._hzScrollBar.x = this._scrollBarMargin.left) : (this._hzScrollBar.width = t - this._scrollBarMargin.left - this._scrollBarMargin.right, 
                this._hzScrollBar.x = this._scrollBarMargin.left)), this._vtScrollBar && (this._displayOnLeft || (this._vtScrollBar.x = t - this._vtScrollBar.width), 
                this._hzScrollBar ? this._vtScrollBar.height = e - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom : this._vtScrollBar.height = e - this._scrollBarMargin.top - this._scrollBarMargin.bottom, 
                this._vtScrollBar.y = this._scrollBarMargin.top), this._viewSize.x = t, this._viewSize.y = e, 
                this._hzScrollBar && !this._floating && (this._viewSize.y -= this._hzScrollBar.height), 
                this._vtScrollBar && !this._floating && (this._viewSize.x -= this._vtScrollBar.width), 
                this._viewSize.x -= this._owner.margin.left + this._owner.margin.right, this._viewSize.y -= this._owner.margin.top + this._owner.margin.bottom, 
                this._viewSize.x = Math.max(1, this._viewSize.x), this._viewSize.y = Math.max(1, this._viewSize.y), 
                this._pageSize.x = this._viewSize.x, this._pageSize.y = this._viewSize.y, this.handleSizeChanged();
            }
        }, {
            key: "setContentSize",
            value: function(t, e) {
                this._contentSize.x == t && this._contentSize.y == e || (this._contentSize.x = t, 
                this._contentSize.y = e, this.handleSizeChanged());
            }
        }, {
            key: "changeContentSizeOnScrolling",
            value: function(t, e, i, s) {
                var n = this._xPos == this._overlapSize.x, a = this._yPos == this._overlapSize.y;
                this._contentSize.x += t, this._contentSize.y += e, this.handleSizeChanged(), 1 == this._tweening ? (0 != t && n && this._tweenChange.x < 0 && (this._xPos = this._overlapSize.x, 
                this._tweenChange.x = -this._xPos - this._tweenStart.x), 0 != e && a && this._tweenChange.y < 0 && (this._yPos = this._overlapSize.y, 
                this._tweenChange.y = -this._yPos - this._tweenStart.y)) : 2 == this._tweening ? (0 != i && (this._container.x -= i, 
                this._tweenStart.x -= i, this._xPos = -this._container.x), 0 != s && (this._container.y -= s, 
                this._tweenStart.y -= s, this._yPos = -this._container.y)) : this._dragged ? (0 != i && (this._container.x -= i, 
                this._containerPos.x -= i, this._xPos = -this._container.x), 0 != s && (this._container.y -= s, 
                this._containerPos.y -= s, this._yPos = -this._container.y)) : (0 != t && n && (this._xPos = this._overlapSize.x, 
                this._container.x = -this._xPos), 0 != e && a && (this._yPos = this._overlapSize.y, 
                this._container.y = -this._yPos)), this._pageMode && this.updatePageController();
            }
        }, {
            key: "handleSizeChanged",
            value: function() {
                this._displayInDemand && (this._vScrollNone = this._contentSize.y <= this._viewSize.y, 
                this._hScrollNone = this._contentSize.x <= this._viewSize.x), this._vtScrollBar && (0 == this._contentSize.y ? this._vtScrollBar.setDisplayPerc(0) : this._vtScrollBar.setDisplayPerc(Math.min(1, this._viewSize.y / this._contentSize.y))), 
                this._hzScrollBar && (0 == this._contentSize.x ? this._hzScrollBar.setDisplayPerc(0) : this._hzScrollBar.setDisplayPerc(Math.min(1, this._viewSize.x / this._contentSize.x))), 
                this.updateScrollBarVisible();
                var e = this._maskContainer.scrollRect;
                if (e && (e.width = this._viewSize.x, e.height = this._viewSize.y, this._vScrollNone && this._vtScrollBar && (e.width += this._vtScrollBar.width), 
                this._hScrollNone && this._hzScrollBar && (e.height += this._hzScrollBar.height), 
                this._dontClipMargin && (e.width += this._owner.margin.left + this._owner.margin.right, 
                e.height += this._owner.margin.top + this._owner.margin.bottom), this._maskContainer.scrollRect = e), 
                this._scrollType == t.ScrollType.Horizontal || this._scrollType == t.ScrollType.Both ? this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x)) : this._overlapSize.x = 0, 
                this._scrollType == t.ScrollType.Vertical || this._scrollType == t.ScrollType.Both ? this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y)) : this._overlapSize.y = 0, 
                this._xPos = t.ToolSet.clamp(this._xPos, 0, this._overlapSize.x), this._yPos = t.ToolSet.clamp(this._yPos, 0, this._overlapSize.y), 
                null != this._refreshBarAxis) {
                    var i = this._overlapSize[this._refreshBarAxis];
                    0 == i ? i = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : i += this._footerLockedSize, 
                    "x" == this._refreshBarAxis ? this._container.pos(t.ToolSet.clamp(this._container.x, -i, this._headerLockedSize), t.ToolSet.clamp(this._container.y, -this._overlapSize.y, 0)) : this._container.pos(t.ToolSet.clamp(this._container.x, -this._overlapSize.x, 0), t.ToolSet.clamp(this._container.y, -i, this._headerLockedSize)), 
                    this._header && ("x" == this._refreshBarAxis ? this._header.height = this._viewSize.y : this._header.width = this._viewSize.x), 
                    this._footer && ("y" == this._refreshBarAxis ? this._footer.height = this._viewSize.y : this._footer.width = this._viewSize.x);
                } else this._container.pos(t.ToolSet.clamp(this._container.x, -this._overlapSize.x, 0), t.ToolSet.clamp(this._container.y, -this._overlapSize.y, 0));
                this.updateScrollBarPos(), this._pageMode && this.updatePageController();
            }
        }, {
            key: "posChanged",
            value: function(t) {
                0 == this._aniFlag ? this._aniFlag = t ? 1 : -1 : 1 != this._aniFlag || t || (this._aniFlag = -1), 
                this._needRefresh = !0, Laya.timer.callLater(this, this.refresh);
            }
        }, {
            key: "refresh",
            value: function() {
                this._owner.displayObject && (this._needRefresh = !1, Laya.timer.clear(this, this.refresh), 
                (this._pageMode || this._snapToItem) && (H.setTo(-this._xPos, -this._yPos), this.alignPosition(H, !1), 
                this._xPos = -H.x, this._yPos = -H.y), this.refresh2(), t.Events.dispatch(t.Events.SCROLL, this._owner.displayObject), 
                this._needRefresh && (this._needRefresh = !1, Laya.timer.clear(this, this.refresh), 
                this.refresh2()), this.updateScrollBarPos(), this._aniFlag = 0);
            }
        }, {
            key: "refresh2",
            value: function() {
                var t, e;
                1 != this._aniFlag || this._dragged ? (0 != this._tweening && this.killTween(), 
                this._container.pos(Math.floor(-this._xPos), Math.floor(-this._yPos)), this.loopCheckingCurrent()) : (this._overlapSize.x > 0 ? t = -Math.floor(this._xPos) : (0 != this._container.x && (this._container.x = 0), 
                t = 0), this._overlapSize.y > 0 ? e = -Math.floor(this._yPos) : (0 != this._container.y && (this._container.y = 0), 
                e = 0), t != this._container.x || e != this._container.y ? (this._tweenDuration.setTo(G, G), 
                this._tweenStart.setTo(this._container.x, this._container.y), this._tweenChange.setTo(t - this._tweenStart.x, e - this._tweenStart.y), 
                this.startTween(1)) : 0 != this._tweening && this.killTween()), this._pageMode && this.updatePageController();
            }
        }, {
            key: "__mouseDown",
            value: function() {
                if (this._touchEffect) {
                    0 != this._tweening ? (this.killTween(), this._dragged = !0) : this._dragged = !1;
                    var e = this._owner.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, M);
                    this._containerPos.setTo(this._container.x, this._container.y), this._beginTouchPos.setTo(e.x, e.y), 
                    this._lastTouchPos.setTo(e.x, e.y), this._lastTouchGlobalPos.setTo(Laya.stage.mouseX, Laya.stage.mouseY), 
                    this._isHoldAreaDone = !1, this._velocity.setTo(0, 0), this._velocityScale = 1, 
                    this._lastMoveTime = Laya.timer.currTimer / 1e3, this._owner.displayObject.stage.on(Laya.Event.MOUSE_MOVE, this, this.__mouseMove), 
                    this._owner.displayObject.stage.on(Laya.Event.MOUSE_UP, this, this.__mouseUp), this._owner.displayObject.stage.on(Laya.Event.CLICK, this, this.__click), 
                    t.Events.dispatch(t.Events.DRAG_START, this._owner.displayObject);
                }
            }
        }, {
            key: "__mouseMove",
            value: function() {
                if (this._touchEffect && !this.owner.isDisposed && !(e.draggingPane && e.draggingPane != this || t.GObject.draggingObject)) {
                    var i, s, n, a = t.UIConfig.touchScrollSensitivity, o = this._owner.globalToLocal(Laya.stage.mouseX, Laya.stage.mouseY, M);
                    if (this._scrollType == t.ScrollType.Vertical) {
                        if (!this._isHoldAreaDone) {
                            if (R |= 1, (i = Math.abs(this._beginTouchPos.y - o.y)) < a) return;
                            if (0 != (2 & R) && i < Math.abs(this._beginTouchPos.x - o.x)) return;
                        }
                        s = !0;
                    } else if (this._scrollType == t.ScrollType.Horizontal) {
                        if (!this._isHoldAreaDone) {
                            if (R |= 2, (i = Math.abs(this._beginTouchPos.x - o.x)) < a) return;
                            if (0 != (1 & R) && i < Math.abs(this._beginTouchPos.y - o.y)) return;
                        }
                        n = !0;
                    } else {
                        if (R = 3, !this._isHoldAreaDone && (i = Math.abs(this._beginTouchPos.y - o.y)) < a && (i = Math.abs(this._beginTouchPos.x - o.x)) < a) return;
                        s = n = !0;
                    }
                    var h = Math.floor(this._containerPos.x + o.x - this._beginTouchPos.x), r = Math.floor(this._containerPos.y + o.y - this._beginTouchPos.y);
                    s && (r > 0 ? this._bouncebackEffect ? this._header && 0 != this._header.maxHeight ? this._container.y = Math.floor(Math.min(.5 * r, this._header.maxHeight)) : this._container.y = Math.floor(Math.min(.5 * r, this._viewSize.y * V)) : this._container.y = 0 : r < -this._overlapSize.y ? this._bouncebackEffect ? this._footer && this._footer.maxHeight > 0 ? this._container.y = Math.floor(Math.max(.5 * (r + this._overlapSize.y), -this._footer.maxHeight) - this._overlapSize.y) : this._container.y = Math.floor(Math.max(.5 * (r + this._overlapSize.y), -this._viewSize.y * V) - this._overlapSize.y) : this._container.y = -this._overlapSize.y : this._container.y = r), 
                    n && (h > 0 ? this._bouncebackEffect ? this._header && 0 != this._header.maxWidth ? this._container.x = Math.floor(Math.min(.5 * h, this._header.maxWidth)) : this._container.x = Math.floor(Math.min(.5 * h, this._viewSize.x * V)) : this._container.x = 0 : h < 0 - this._overlapSize.x ? this._bouncebackEffect ? this._footer && this._footer.maxWidth > 0 ? this._container.x = Math.floor(Math.max(.5 * (h + this._overlapSize.x), -this._footer.maxWidth) - this._overlapSize.x) : this._container.x = Math.floor(Math.max(.5 * (h + this._overlapSize.x), -this._viewSize.x * V) - this._overlapSize.x) : this._container.x = -this._overlapSize.x : this._container.x = h);
                    var l = Laya.stage.frameRate == Laya.Stage.FRAME_SLOW ? 30 : 60, u = Laya.timer.currTimer / 1e3, _ = Math.max(u - this._lastMoveTime, 1 / l), c = o.x - this._lastTouchPos.x, d = o.y - this._lastTouchPos.y;
                    if (n || (c = 0), s || (d = 0), 0 != _) {
                        var g = _ * l - 1;
                        if (g > 1) {
                            var f = Math.pow(.833, g);
                            this._velocity.x = this._velocity.x * f, this._velocity.y = this._velocity.y * f;
                        }
                        this._velocity.x = t.ToolSet.lerp(this._velocity.x, 60 * c / l / _, 10 * _), this._velocity.y = t.ToolSet.lerp(this._velocity.y, 60 * d / l / _, 10 * _);
                    }
                    var p = this._lastTouchGlobalPos.x - Laya.stage.mouseX, y = this._lastTouchGlobalPos.y - Laya.stage.mouseY;
                    0 != c ? this._velocityScale = Math.abs(p / c) : 0 != d && (this._velocityScale = Math.abs(y / d)), 
                    this._lastTouchPos.setTo(o.x, o.y), this._lastTouchGlobalPos.setTo(Laya.stage.mouseX, Laya.stage.mouseY), 
                    this._lastMoveTime = u, this._overlapSize.x > 0 && (this._xPos = t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x)), 
                    this._overlapSize.y > 0 && (this._yPos = t.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y)), 
                    0 != this._loop && (h = this._container.x, r = this._container.y, this.loopCheckingCurrent() && (this._containerPos.x += this._container.x - h, 
                    this._containerPos.y += this._container.y - r)), e.draggingPane = this, this._isHoldAreaDone = !0, 
                    this._dragged = !0, this._maskContainer.mouseEnabled = !1, this.updateScrollBarPos(), 
                    this.updateScrollBarVisible(), this._pageMode && this.updatePageController(), t.Events.dispatch(t.Events.SCROLL, this._owner.displayObject);
                }
            }
        }, {
            key: "__mouseUp",
            value: function() {
                if (!this._owner.isDisposed) {
                    if (this._owner.displayObject.stage.off(Laya.Event.MOUSE_MOVE, this, this.__mouseMove), 
                    this._owner.displayObject.stage.off(Laya.Event.MOUSE_UP, this, this.__mouseUp), 
                    this._owner.displayObject.stage.off(Laya.Event.CLICK, this, this.__click), t.Events.dispatch(t.Events.DRAG_END, this._owner.displayObject), 
                    e.draggingPane == this && (e.draggingPane = null), R = 0, !this._dragged || !this._touchEffect) return this._dragged = !1, 
                    void (this._maskContainer.mouseEnabled = !0);
                    this._dragged = !1, this._maskContainer.mouseEnabled = !0, this._tweenStart.setTo(this._container.x, this._container.y), 
                    H.setTo(this._tweenStart.x, this._tweenStart.y);
                    var i = !1;
                    if (this._container.x > 0 ? (H.x = 0, i = !0) : this._container.x < -this._overlapSize.x && (H.x = -this._overlapSize.x, 
                    i = !0), this._container.y > 0 ? (H.y = 0, i = !0) : this._container.y < -this._overlapSize.y && (H.y = -this._overlapSize.y, 
                    i = !0), i) {
                        if (this._tweenChange.setTo(H.x - this._tweenStart.x, H.y - this._tweenStart.y), 
                        this._tweenChange.x < -t.UIConfig.touchDragSensitivity || this._tweenChange.y < -t.UIConfig.touchDragSensitivity ? (this._refreshEventDispatching = !0, 
                        t.Events.dispatch(t.Events.PULL_DOWN_RELEASE, this._owner.displayObject), this._refreshEventDispatching = !1) : (this._tweenChange.x > t.UIConfig.touchDragSensitivity || this._tweenChange.y > t.UIConfig.touchDragSensitivity) && (this._refreshEventDispatching = !0, 
                        t.Events.dispatch(t.Events.PULL_UP_RELEASE, this._owner.displayObject), this._refreshEventDispatching = !1), 
                        this._headerLockedSize > 0 && 0 == H[this._refreshBarAxis]) H[this._refreshBarAxis] = this._headerLockedSize, 
                        this._tweenChange.x = H.x - this._tweenStart.x, this._tweenChange.y = H.y - this._tweenStart.y; else if (this._footerLockedSize > 0 && H[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
                            var s = this._overlapSize[this._refreshBarAxis];
                            0 == s ? s = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : s += this._footerLockedSize, 
                            H[this._refreshBarAxis] = -s, this._tweenChange.x = H.x - this._tweenStart.x, this._tweenChange.y = H.y - this._tweenStart.y;
                        }
                        this._tweenDuration.setTo(D, D);
                    } else {
                        if (this._inertiaDisabled) this._tweenDuration.setTo(D, D); else {
                            var n = Laya.stage.frameRate == Laya.Stage.FRAME_SLOW ? 30 : 60, a = (Laya.timer.currTimer / 1e3 - this._lastMoveTime) * n - 1;
                            if (a > 1) {
                                var o = Math.pow(.833, a);
                                this._velocity.x = this._velocity.x * o, this._velocity.y = this._velocity.y * o;
                            }
                            this.updateTargetAndDuration(this._tweenStart, H);
                        }
                        if (U.setTo(H.x - this._tweenStart.x, H.y - this._tweenStart.y), this.loopCheckingTarget(H), 
                        (this._pageMode || this._snapToItem) && this.alignPosition(H, !0), this._tweenChange.x = H.x - this._tweenStart.x, 
                        this._tweenChange.y = H.y - this._tweenStart.y, 0 == this._tweenChange.x && 0 == this._tweenChange.y) return void this.updateScrollBarVisible();
                        (this._pageMode || this._snapToItem) && (this.fixDuration("x", U.x), this.fixDuration("y", U.y));
                    }
                    this.startTween(2);
                }
            }
        }, {
            key: "__click",
            value: function() {
                this._dragged = !1;
            }
        }, {
            key: "__mouseWheel",
            value: function(t) {
                if (this._mouseWheelEnabled) {
                    var e = t.delta;
                    e = e > 0 ? -1 : e < 0 ? 1 : 0, this._overlapSize.x > 0 && 0 == this._overlapSize.y ? this._pageMode ? this.setPosX(this._xPos + this._pageSize.x * e, !1) : this.setPosX(this._xPos + this._mouseWheelStep * e, !1) : this._pageMode ? this.setPosY(this._yPos + this._pageSize.y * e, !1) : this.setPosY(this._yPos + this._mouseWheelStep * e, !1);
                }
            }
        }, {
            key: "updateScrollBarPos",
            value: function() {
                this._vtScrollBar && this._vtScrollBar.setScrollPerc(0 == this._overlapSize.y ? 0 : t.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y) / this._overlapSize.y), 
                this._hzScrollBar && this._hzScrollBar.setScrollPerc(0 == this._overlapSize.x ? 0 : t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x), 
                this.checkRefreshBar();
            }
        }, {
            key: "updateScrollBarVisible",
            value: function() {
                this._vtScrollBar && (this._viewSize.y <= this._vtScrollBar.minSize || this._vScrollNone ? this._vtScrollBar.displayObject.visible = !1 : this.updateScrollBarVisible2(this._vtScrollBar)), 
                this._hzScrollBar && (this._viewSize.x <= this._hzScrollBar.minSize || this._hScrollNone ? this._hzScrollBar.displayObject.visible = !1 : this.updateScrollBarVisible2(this._hzScrollBar));
            }
        }, {
            key: "updateScrollBarVisible2",
            value: function(e) {
                this._scrollBarDisplayAuto && t.GTween.kill(e, !1, "alpha"), !this._scrollBarDisplayAuto || 0 != this._tweening || this._dragged || e.gripDragging ? (e.alpha = 1, 
                e.displayObject.visible = !0) : e.displayObject.visible && t.GTween.to(1, 0, .5).setDelay(.5).onComplete(this.__barTweenComplete, this).setTarget(e, "alpha");
            }
        }, {
            key: "__barTweenComplete",
            value: function(t) {
                var e = t.target;
                e.alpha = 1, e.displayObject.visible = !1;
            }
        }, {
            key: "getLoopPartSize",
            value: function(t, e) {
                return (this._contentSize[e] + ("x" == e ? this._owner.columnGap : this._owner.lineGap)) / t;
            }
        }, {
            key: "loopCheckingCurrent",
            value: function() {
                var t = !1;
                return 1 == this._loop && this._overlapSize.x > 0 ? this._xPos < .001 ? (this._xPos += this.getLoopPartSize(2, "x"), 
                t = !0) : this._xPos >= this._overlapSize.x && (this._xPos -= this.getLoopPartSize(2, "x"), 
                t = !0) : 2 == this._loop && this._overlapSize.y > 0 && (this._yPos < .001 ? (this._yPos += this.getLoopPartSize(2, "y"), 
                t = !0) : this._yPos >= this._overlapSize.y && (this._yPos -= this.getLoopPartSize(2, "y"), 
                t = !0)), t && this._container.pos(Math.floor(-this._xPos), Math.floor(-this._yPos)), 
                t;
            }
        }, {
            key: "loopCheckingTarget",
            value: function(t) {
                1 == this._loop && this.loopCheckingTarget2(t, "x"), 2 == this._loop && this.loopCheckingTarget2(t, "y");
            }
        }, {
            key: "loopCheckingTarget2",
            value: function(t, e) {
                var i, s;
                t[e] > 0 ? (i = this.getLoopPartSize(2, e), (s = this._tweenStart[e] - i) <= 0 && s >= -this._overlapSize[e] && (t[e] -= i, 
                this._tweenStart[e] = s)) : t[e] < -this._overlapSize[e] && (i = this.getLoopPartSize(2, e), 
                (s = this._tweenStart[e] + i) <= 0 && s >= -this._overlapSize[e] && (t[e] += i, 
                this._tweenStart[e] = s));
            }
        }, {
            key: "loopCheckingNewPos",
            value: function(e, i) {
                if (0 == this._overlapSize[i]) return e;
                var s, n = "x" == i ? this._xPos : this._yPos, a = !1;
                return e < .001 ? (e += this.getLoopPartSize(2, i)) > n && (s = this.getLoopPartSize(6, i), 
                s = Math.ceil((e - n) / s) * s, n = t.ToolSet.clamp(n + s, 0, this._overlapSize[i]), 
                a = !0) : e >= this._overlapSize[i] && (e -= this.getLoopPartSize(2, i)) < n && (s = this.getLoopPartSize(6, i), 
                s = Math.ceil((n - e) / s) * s, n = t.ToolSet.clamp(n - s, 0, this._overlapSize[i]), 
                a = !0), a && ("x" == i ? this._container.x = -Math.floor(n) : this._container.y = -Math.floor(n)), 
                e;
            }
        }, {
            key: "alignPosition",
            value: function(t, e) {
                if (this._pageMode) t.x = this.alignByPage(t.x, "x", e), t.y = this.alignByPage(t.y, "y", e); else if (this._snapToItem) {
                    var i = 0, s = 0;
                    e && (i = t.x - this._containerPos.x, s = t.y - this._containerPos.y);
                    var n = this._owner.getSnappingPositionWithDir(-t.x, -t.y, i, s, M);
                    t.x < 0 && t.x > -this._overlapSize.x && (t.x = -n.x), t.y < 0 && t.y > -this._overlapSize.y && (t.y = -n.y);
                }
            }
        }, {
            key: "alignByPage",
            value: function(e, i, s) {
                var n;
                if (e > 0) n = 0; else if (e < -this._overlapSize[i]) n = Math.ceil(this._contentSize[i] / this._pageSize[i]) - 1; else {
                    n = Math.floor(-e / this._pageSize[i]);
                    var a = s ? e - this._containerPos[i] : e - this._container[i], o = Math.min(this._pageSize[i], this._contentSize[i] - (n + 1) * this._pageSize[i]), h = -e - n * this._pageSize[i];
                    Math.abs(a) > this._pageSize[i] ? h > .5 * o && n++ : h > o * (a < 0 ? t.UIConfig.defaultScrollPagingThreshold : 1 - t.UIConfig.defaultScrollPagingThreshold) && n++, 
                    (e = -n * this._pageSize[i]) < -this._overlapSize[i] && (e = -this._overlapSize[i]);
                }
                if (s) {
                    var r, l = this._tweenStart[i];
                    r = l > 0 ? 0 : l < -this._overlapSize[i] ? Math.ceil(this._contentSize[i] / this._pageSize[i]) - 1 : Math.floor(-l / this._pageSize[i]);
                    var u = Math.floor(-this._containerPos[i] / this._pageSize[i]);
                    Math.abs(n - u) > 1 && Math.abs(r - u) <= 1 && (e = -(n = n > u ? u + 1 : u - 1) * this._pageSize[i]);
                }
                return e;
            }
        }, {
            key: "updateTargetAndDuration",
            value: function(t, e) {
                e.x = this.updateTargetAndDuration2(t.x, "x"), e.y = this.updateTargetAndDuration2(t.y, "y");
            }
        }, {
            key: "updateTargetAndDuration2",
            value: function(t, e) {
                var i = this._velocity[e], s = 0;
                if (t > 0) t = 0; else if (t < -this._overlapSize[e]) t = -this._overlapSize[e]; else {
                    var n = Math.abs(i) * this._velocityScale;
                    Laya.Browser.onMobile && (n *= 1136 / Math.max(Laya.stage.width, Laya.stage.height));
                    var a = 0;
                    this._pageMode || !Laya.Browser.onMobile ? n > 500 && (a = Math.pow((n - 500) / 500, 2)) : n > 1e3 && (a = Math.pow((n - 1e3) / 1e3, 2)), 
                    0 != a && (a > 1 && (a = 1), n *= a, i *= a, this._velocity[e] = i, s = Math.log(60 / n) / Math.log(this._decelerationRate) / 60, 
                    t += Math.floor(i * s * .4));
                }
                return s < D && (s = D), this._tweenDuration[e] = s, t;
            }
        }, {
            key: "fixDuration",
            value: function(t, e) {
                if (!(0 == this._tweenChange[t] || Math.abs(this._tweenChange[t]) >= Math.abs(e))) {
                    var i = Math.abs(this._tweenChange[t] / e) * this._tweenDuration[t];
                    i < D && (i = D), this._tweenDuration[t] = i;
                }
            }
        }, {
            key: "startTween",
            value: function(t) {
                this._tweenTime.setTo(0, 0), this._tweening = t, Laya.timer.frameLoop(1, this, this.tweenUpdate), 
                this.updateScrollBarVisible();
            }
        }, {
            key: "killTween",
            value: function() {
                1 == this._tweening && (this._container.pos(this._tweenStart.x + this._tweenChange.x, this._tweenStart.y + this._tweenChange.y), 
                t.Events.dispatch(t.Events.SCROLL, this._owner.displayObject)), this._tweening = 0, 
                Laya.timer.clear(this, this.tweenUpdate), this.updateScrollBarVisible(), t.Events.dispatch(t.Events.SCROLL_END, this._owner.displayObject);
            }
        }, {
            key: "checkRefreshBar",
            value: function() {
                if (this._header || this._footer) {
                    var t = this._container[this._refreshBarAxis];
                    if (this._header) if (t > 0) {
                        this._header.displayObject.parent || this._maskContainer.addChildAt(this._header.displayObject, 0);
                        var e = M;
                        e.setTo(this._header.width, this._header.height), e[this._refreshBarAxis] = t, this._header.setSize(e.x, e.y);
                    } else this._header.displayObject.parent && this._maskContainer.removeChild(this._header.displayObject);
                    if (this._footer) {
                        var i = this._overlapSize[this._refreshBarAxis];
                        t < -i || 0 == i && this._footerLockedSize > 0 ? (this._footer.displayObject.parent || this._maskContainer.addChildAt(this._footer.displayObject, 0), 
                        (e = M).setTo(this._footer.x, this._footer.y), e[this._refreshBarAxis] = i > 0 ? t + this._contentSize[this._refreshBarAxis] : Math.max(Math.min(t + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]), 
                        this._footer.setXY(e.x, e.y), e.setTo(this._footer.width, this._footer.height), 
                        e[this._refreshBarAxis] = i > 0 ? -i - t : this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis], 
                        this._footer.setSize(e.x, e.y)) : this._footer.displayObject.parent && this._maskContainer.removeChild(this._footer.displayObject);
                    }
                }
            }
        }, {
            key: "tweenUpdate",
            value: function() {
                var e = this.runTween("x"), i = this.runTween("y");
                this._container.pos(e, i), 2 == this._tweening && (this._overlapSize.x > 0 && (this._xPos = t.ToolSet.clamp(-e, 0, this._overlapSize.x)), 
                this._overlapSize.y > 0 && (this._yPos = t.ToolSet.clamp(-i, 0, this._overlapSize.y)), 
                this._pageMode && this.updatePageController()), 0 == this._tweenChange.x && 0 == this._tweenChange.y ? (this._tweening = 0, 
                Laya.timer.clear(this, this.tweenUpdate), this.loopCheckingCurrent(), this.updateScrollBarPos(), 
                this.updateScrollBarVisible(), t.Events.dispatch(t.Events.SCROLL, this._owner.displayObject), 
                t.Events.dispatch(t.Events.SCROLL_END, this._owner.displayObject)) : (this.updateScrollBarPos(), 
                t.Events.dispatch(t.Events.SCROLL, this._owner.displayObject));
            }
        }, {
            key: "runTween",
            value: function(t) {
                var e, i;
                if (0 != this._tweenChange[t]) {
                    if (this._tweenTime[t] += Laya.timer.delta / 1e3, this._tweenTime[t] >= this._tweenDuration[t]) e = this._tweenStart[t] + this._tweenChange[t], 
                    this._tweenChange[t] = 0; else {
                        var s = (i = (i = this._tweenTime[t]) / this._tweenDuration[t] - 1) * i * i + 1;
                        e = this._tweenStart[t] + Math.floor(this._tweenChange[t] * s);
                    }
                    var n = 0, a = -this._overlapSize[t];
                    if (this._headerLockedSize > 0 && this._refreshBarAxis == t && (n = this._headerLockedSize), 
                    this._footerLockedSize > 0 && this._refreshBarAxis == t) {
                        var o = this._overlapSize[this._refreshBarAxis];
                        0 == o ? o = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0) : o += this._footerLockedSize, 
                        a = -o;
                    }
                    2 == this._tweening && this._bouncebackEffect ? e > 20 + n && this._tweenChange[t] > 0 || e > n && 0 == this._tweenChange[t] ? (this._tweenTime[t] = 0, 
                    this._tweenDuration[t] = D, this._tweenChange[t] = -e + n, this._tweenStart[t] = e) : (e < a - 20 && this._tweenChange[t] < 0 || e < a && 0 == this._tweenChange[t]) && (this._tweenTime[t] = 0, 
                    this._tweenDuration[t] = D, this._tweenChange[t] = a - e, this._tweenStart[t] = e) : e > n ? (e = n, 
                    this._tweenChange[t] = 0) : e < a && (e = a, this._tweenChange[t] = 0);
                } else e = this._container[t];
                return e;
            }
        }, {
            key: "owner",
            get: function() {
                return this._owner;
            }
        }, {
            key: "hzScrollBar",
            get: function() {
                return this._hzScrollBar;
            }
        }, {
            key: "vtScrollBar",
            get: function() {
                return this._vtScrollBar;
            }
        }, {
            key: "header",
            get: function() {
                return this._header;
            }
        }, {
            key: "footer",
            get: function() {
                return this._footer;
            }
        }, {
            key: "bouncebackEffect",
            get: function() {
                return this._bouncebackEffect;
            },
            set: function(t) {
                this._bouncebackEffect = t;
            }
        }, {
            key: "touchEffect",
            get: function() {
                return this._touchEffect;
            },
            set: function(t) {
                this._touchEffect = t;
            }
        }, {
            key: "scrollStep",
            set: function(e) {
                this._scrollStep = e, 0 == this._scrollStep && (this._scrollStep = t.UIConfig.defaultScrollStep), 
                this._mouseWheelStep = 2 * this._scrollStep;
            },
            get: function() {
                return this._scrollStep;
            }
        }, {
            key: "snapToItem",
            get: function() {
                return this._snapToItem;
            },
            set: function(t) {
                this._snapToItem = t;
            }
        }, {
            key: "mouseWheelEnabled",
            get: function() {
                return this._mouseWheelEnabled;
            },
            set: function(t) {
                this._mouseWheelEnabled = t;
            }
        }, {
            key: "decelerationRate",
            get: function() {
                return this._decelerationRate;
            },
            set: function(t) {
                this._decelerationRate = t;
            }
        }, {
            key: "isDragged",
            get: function() {
                return this._dragged;
            }
        }, {
            key: "percX",
            get: function() {
                return 0 == this._overlapSize.x ? 0 : this._xPos / this._overlapSize.x;
            },
            set: function(t) {
                this.setPercX(t, !1);
            }
        }, {
            key: "percY",
            get: function() {
                return 0 == this._overlapSize.y ? 0 : this._yPos / this._overlapSize.y;
            },
            set: function(t) {
                this.setPercY(t, !1);
            }
        }, {
            key: "posX",
            get: function() {
                return this._xPos;
            },
            set: function(t) {
                this.setPosX(t, !1);
            }
        }, {
            key: "posY",
            get: function() {
                return this._yPos;
            },
            set: function(t) {
                this.setPosY(t, !1);
            }
        }, {
            key: "contentWidth",
            get: function() {
                return this._contentSize.x;
            }
        }, {
            key: "contentHeight",
            get: function() {
                return this._contentSize.y;
            }
        }, {
            key: "viewWidth",
            get: function() {
                return this._viewSize.x;
            },
            set: function(t) {
                t = t + this._owner.margin.left + this._owner.margin.right, this._vtScrollBar && !this._floating && (t += this._vtScrollBar.width), 
                this._owner.width = t;
            }
        }, {
            key: "viewHeight",
            get: function() {
                return this._viewSize.y;
            },
            set: function(t) {
                t = t + this._owner.margin.top + this._owner.margin.bottom, this._hzScrollBar && !this._floating && (t += this._hzScrollBar.height), 
                this._owner.height = t;
            }
        }, {
            key: "currentPageX",
            get: function() {
                if (!this._pageMode) return 0;
                var t = Math.floor(this._xPos / this._pageSize.x);
                return this._xPos - t * this._pageSize.x > .5 * this._pageSize.x && t++, t;
            },
            set: function(t) {
                this.setCurrentPageX(t, !1);
            }
        }, {
            key: "currentPageY",
            get: function() {
                if (!this._pageMode) return 0;
                var t = Math.floor(this._yPos / this._pageSize.y);
                return this._yPos - t * this._pageSize.y > .5 * this._pageSize.y && t++, t;
            },
            set: function(t) {
                this.setCurrentPageY(t, !1);
            }
        }, {
            key: "isBottomMost",
            get: function() {
                return this._yPos == this._overlapSize.y || 0 == this._overlapSize.y;
            }
        }, {
            key: "isRightMost",
            get: function() {
                return this._xPos == this._overlapSize.x || 0 == this._overlapSize.x;
            }
        }, {
            key: "pageController",
            get: function() {
                return this._pageController;
            },
            set: function(t) {
                this._pageController = t;
            }
        }, {
            key: "scrollingPosX",
            get: function() {
                return t.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x);
            }
        }, {
            key: "scrollingPosY",
            get: function() {
                return t.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y);
            }
        } ]), e;
    }();
    t.ScrollPane = F;
    var R = 0, G = .5, D = .3, V = .5;
    M = new Laya.Point();
    var W = new Laya.Rectangle(), H = new Laya.Point(), U = new Laya.Point();
    t.Transition = function() {
        function e(t) {
            (0, classCallCheck.default)(this, e), this._owner = t, this._items = new Array(), this._totalDuration = 0, 
            this._autoPlayTimes = 1, this._autoPlayDelay = 0, this._timeScale = 1, this._startTime = 0, 
            this._endTime = 0;
        }
        return (0, l.default)(e, [ {
            key: "play",
            value: function(t, e, i, s, n) {
                this._play(t, e, i, s, n, !1);
            }
        }, {
            key: "playReverse",
            value: function(t, e, i, s, n) {
                this._play(t, 1, i, s, n, !0);
            }
        }, {
            key: "changePlayTimes",
            value: function(t) {
                this._totalTimes = t;
            }
        }, {
            key: "setAutoPlay",
            value: function(t, e, i) {
                null == e && (e = -1), null == i && (i = 0), this._autoPlay != t && (this._autoPlay = t, 
                this._autoPlayTimes = e, this._autoPlayDelay = i, this._autoPlay ? this._owner.onStage && this.play(null, null, this._autoPlayTimes, this._autoPlayDelay) : this._owner.onStage || this.stop(!1, !0));
            }
        }, {
            key: "_play",
            value: function(e, i, s, n, a, o) {
                null == i && (i = 1), null == s && (s = 0), null == n && (n = 0), null == a && (a = -1), 
                this.stop(!0, !0), this._totalTimes = i, this._reversed = o, this._startTime = n, 
                this._endTime = a, this._playing = !0, this._paused = !1, this._onComplete = e;
                for (var h = this._items.length, r = 0; r < h; r++) {
                    var l = this._items[r];
                    if (null == l.target ? l.targetId ? l.target = this._owner.getChildById(l.targetId) : l.target = this._owner : l.target != this._owner && l.target.parent != this._owner && (l.target = null), 
                    l.target && l.type == N.Transition) {
                        var u = l.target.getTransition(l.value.transName);
                        if (u == this && (u = null), u) if (0 == l.value.playTimes) {
                            var _;
                            for (_ = r - 1; _ >= 0; _--) {
                                var c = this._items[_];
                                if (c.type == N.Transition && c.value.trans == u) {
                                    c.value.stopTime = l.time - c.time;
                                    break;
                                }
                            }
                            _ < 0 ? l.value.stopTime = 0 : u = null;
                        } else l.value.stopTime = -1;
                        l.value.trans = u;
                    }
                }
                0 == s ? this.onDelayedPlay() : t.GTween.delayedCall(s).setTarget(this).onComplete(this.onDelayedPlay, this);
            }
        }, {
            key: "stop",
            value: function(e, i) {
                if (this._playing) {
                    null == e && (e = !0), this._playing = !1, this._totalTasks = 0, this._totalTimes = 0;
                    var s = this._onComplete;
                    this._onComplete = null, t.GTween.kill(this);
                    var n = this._items.length;
                    if (this._reversed) for (var a = n - 1; a >= 0; a--) {
                        var o = this._items[a];
                        null != o.target && this.stopItem(o, e);
                    } else for (a = 0; a < n; a++) null != (o = this._items[a]).target && this.stopItem(o, e);
                    i && s && s.run();
                }
            }
        }, {
            key: "stopItem",
            value: function(t, e) {
                if (0 != t.displayLockToken && (t.target.releaseDisplayLock(t.displayLockToken), 
                t.displayLockToken = 0), t.tweener && (t.tweener.kill(e), t.tweener = null, t.type != N.Shake || e || (t.target._gearLocked = !0, 
                t.target.setXY(t.target.x - t.value.lastOffsetX, t.target.y - t.value.lastOffsetY), 
                t.target._gearLocked = !1)), t.type == N.Transition) {
                    var i = t.value.trans;
                    i && i.stop(e, !1);
                }
            }
        }, {
            key: "setPaused",
            value: function(e) {
                if (this._playing && this._paused != e) {
                    this._paused = e;
                    var i = t.GTween.getTween(this);
                    i && i.setPaused(e);
                    for (var s = this._items.length, n = 0; n < s; n++) {
                        var a = this._items[n];
                        null != a.target && (a.type == N.Transition ? a.value.trans && a.value.trans.setPaused(e) : a.type == N.Animation && (e ? (a.value.flag = a.target.getProp(t.ObjectPropID.Playing), 
                        a.target.setProp(t.ObjectPropID.Playing, !1)) : a.target.setProp(t.ObjectPropID.Playing, a.value.flag)), 
                        a.tweener && a.tweener.setPaused(e));
                    }
                }
            }
        }, {
            key: "dispose",
            value: function() {
                this._playing && t.GTween.kill(this);
                for (var e = this._items.length, i = 0; i < e; i++) {
                    var s = this._items[i];
                    s.tweener && (s.tweener.kill(), s.tweener = null), s.target = null, s.hook = null, 
                    s.tweenConfig && (s.tweenConfig.endHook = null);
                }
                this._items.length = 0, this._playing = !1, this._onComplete = null;
            }
        }, {
            key: "setValue",
            value: function(t) {
                for (var e, i = this._items.length, s = !1, n = 0; n < i; n++) {
                    var a = this._items[n];
                    if (a.label == t) e = a.tweenConfig ? a.tweenConfig.startValue : a.value, s = !0; else {
                        if (!a.tweenConfig || a.tweenConfig.endLabel != t) continue;
                        e = a.tweenConfig.endValue, s = !0;
                    }
                    switch (a.type) {
                      case N.XY:
                      case N.Size:
                      case N.Pivot:
                      case N.Scale:
                      case N.Skew:
                        e.b1 = !0, e.b2 = !0, e.f1 = parseFloat(arguments.length <= 1 ? void 0 : arguments[1]), 
                        e.f2 = parseFloat(arguments.length <= 2 ? void 0 : arguments[2]);
                        break;

                      case N.Alpha:
                      case N.Rotation:
                      case N.Color:
                        e.f1 = parseFloat(arguments.length <= 1 ? void 0 : arguments[1]);
                        break;

                      case N.Animation:
                        e.frame = parseInt(arguments.length <= 1 ? void 0 : arguments[1]), (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 && (e.playing = arguments.length <= 2 ? void 0 : arguments[2]);
                        break;

                      case N.Visible:
                        e.visible = arguments.length <= 1 ? void 0 : arguments[1];
                        break;

                      case N.Sound:
                        e.sound = arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 && (e.volume = parseFloat(arguments.length <= 2 ? void 0 : arguments[2]));
                        break;

                      case N.Transition:
                        e.transName = arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 && (e.playTimes = parseInt(arguments.length <= 2 ? void 0 : arguments[2]));
                        break;

                      case N.Shake:
                        e.amplitude = parseFloat(arguments.length <= 1 ? void 0 : arguments[1]), (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 && (e.duration = parseFloat(arguments.length <= 2 ? void 0 : arguments[2]));
                        break;

                      case N.ColorFilter:
                        e.f1 = parseFloat(arguments.length <= 1 ? void 0 : arguments[1]), e.f2 = parseFloat(arguments.length <= 2 ? void 0 : arguments[2]), 
                        e.f3 = parseFloat(arguments.length <= 3 ? void 0 : arguments[3]), e.f4 = parseFloat(arguments.length <= 4 ? void 0 : arguments[4]);
                        break;

                      case N.Text:
                      case N.Icon:
                        e.text = arguments.length <= 1 ? void 0 : arguments[1];
                    }
                }
                if (!s) throw new Error("this.label not exists");
            }
        }, {
            key: "setHook",
            value: function(t, e) {
                for (var i = this._items.length, s = !1, n = 0; n < i; n++) {
                    var a = this._items[n];
                    if (a.label == t) {
                        a.hook = e, s = !0;
                        break;
                    }
                    if (a.tweenConfig && a.tweenConfig.endLabel == t) {
                        a.tweenConfig.endHook = e, s = !0;
                        break;
                    }
                }
                if (!s) throw new Error("this.label not exists");
            }
        }, {
            key: "clearHooks",
            value: function() {
                for (var t = this._items.length, e = 0; e < t; e++) {
                    var i = this._items[e];
                    i.hook = null, i.tweenConfig && (i.tweenConfig.endHook = null);
                }
            }
        }, {
            key: "setTarget",
            value: function(t, e) {
                for (var i = this._items.length, s = !1, n = 0; n < i; n++) {
                    var a = this._items[n];
                    a.label == t && (a.targetId = e == this._owner || null == e ? "" : e.id, this._playing ? a.targetId.length > 0 ? a.target = this._owner.getChildById(a.targetId) : a.target = this._owner : a.target = null, 
                    s = !0);
                }
                if (!s) throw new Error("this.label not exists");
            }
        }, {
            key: "setDuration",
            value: function(t, e) {
                for (var i = this._items.length, s = !1, n = 0; n < i; n++) {
                    var a = this._items[n];
                    a.tweenConfig && a.label == t && (a.tweenConfig.duration = e, s = !0);
                }
                if (!s) throw new Error("this.label not exists");
            }
        }, {
            key: "getLabelTime",
            value: function(t) {
                for (var e = this._items.length, i = 0; i < e; i++) {
                    var s = this._items[i];
                    if (s.label == t) return s.time;
                    if (s.tweenConfig && s.tweenConfig.endLabel == t) return s.time + s.tweenConfig.duration;
                }
                return NaN;
            }
        }, {
            key: "updateFromRelations",
            value: function(t, e, i) {
                var s = this._items.length;
                if (0 != s) for (var n = 0; n < s; n++) {
                    var a = this._items[n];
                    a.type == N.XY && a.targetId == t && (a.tweenConfig ? (a.tweenConfig.startValue.b3 || (a.tweenConfig.startValue.f1 += e, 
                    a.tweenConfig.startValue.f2 += i), a.tweenConfig.endValue.b3 || (a.tweenConfig.endValue.f1 += e, 
                    a.tweenConfig.endValue.f2 += i)) : a.value.b3 || (a.value.f1 += e, a.value.f2 += i));
                }
            }
        }, {
            key: "onOwnerAddedToStage",
            value: function() {
                this._autoPlay && !this._playing && this.play(null, this._autoPlayTimes, this._autoPlayDelay);
            }
        }, {
            key: "onOwnerRemovedFromStage",
            value: function() {
                0 == (this._options & K) && this.stop(0 != (this._options & $), !1);
            }
        }, {
            key: "onDelayedPlay",
            value: function() {
                if (this.internalPlay(), this._playing = this._totalTasks > 0, this._playing) {
                    if (0 != (this._options & q)) for (var t = this._items.length, e = 0; e < t; e++) {
                        var i = this._items[e];
                        i.target && i.target != this._owner && (i.displayLockToken = i.target.addDisplayLock());
                    }
                } else if (this._onComplete) {
                    var s = this._onComplete;
                    this._onComplete = null, s.run();
                }
            }
        }, {
            key: "internalPlay",
            value: function() {
                this._ownerBaseX = this._owner.x, this._ownerBaseY = this._owner.y, this._totalTasks = 1;
                var t, e = this._items.length, i = !1;
                if (this._reversed) for (s = e - 1; s >= 0; s--) null != (t = this._items[s]).target && this.playItem(t); else for (var s = 0; s < e; s++) null != (t = this._items[s]).target && (t.type == N.Animation && 0 != this._startTime && t.time <= this._startTime ? (i = !0, 
                t.value.flag = !1) : this.playItem(t));
                i && this.skipAnimations(), this._totalTasks--;
            }
        }, {
            key: "playItem",
            value: function(e) {
                var i;
                if (e.tweenConfig) {
                    if (i = this._reversed ? this._totalDuration - e.time - e.tweenConfig.duration : e.time, 
                    -1 == this._endTime || i <= this._endTime) {
                        var s, n;
                        switch (this._reversed ? (s = e.tweenConfig.endValue, n = e.tweenConfig.startValue) : (s = e.tweenConfig.startValue, 
                        n = e.tweenConfig.endValue), e.value.b1 = s.b1 || n.b1, e.value.b2 = s.b2 || n.b2, 
                        e.type) {
                          case N.XY:
                          case N.Size:
                          case N.Scale:
                          case N.Skew:
                            e.tweener = t.GTween.to2(s.f1, s.f2, n.f1, n.f2, e.tweenConfig.duration);
                            break;

                          case N.Alpha:
                          case N.Rotation:
                            e.tweener = t.GTween.to(s.f1, n.f1, e.tweenConfig.duration);
                            break;

                          case N.Color:
                            e.tweener = t.GTween.toColor(s.f1, n.f1, e.tweenConfig.duration);
                            break;

                          case N.ColorFilter:
                            e.tweener = t.GTween.to4(s.f1, s.f2, s.f3, s.f4, n.f1, n.f2, n.f3, n.f4, e.tweenConfig.duration);
                        }
                        e.tweener.setDelay(i).setEase(e.tweenConfig.easeType).setRepeat(e.tweenConfig.repeat, e.tweenConfig.yoyo).setTimeScale(this._timeScale).setTarget(e).onStart(this.onTweenStart, this).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this), 
                        this._endTime >= 0 && e.tweener.setBreakpoint(this._endTime - i), this._totalTasks++;
                    }
                } else e.type == N.Shake ? (i = this._reversed ? this._totalDuration - e.time - e.value.duration : e.time, 
                e.value.offsetX = e.value.offsetY = 0, e.value.lastOffsetX = e.value.lastOffsetY = 0, 
                e.tweener = t.GTween.shake(0, 0, e.value.amplitude, e.value.duration).setDelay(i).setTimeScale(this._timeScale).setTarget(e).onUpdate(this.onTweenUpdate, this).onComplete(this.onTweenComplete, this), 
                this._endTime >= 0 && e.tweener.setBreakpoint(this._endTime - e.time), this._totalTasks++) : (i = this._reversed ? this._totalDuration - e.time : e.time) <= this._startTime ? (this.applyValue(e), 
                this.callHook(e, !1)) : (-1 == this._endTime || i <= this._endTime) && (this._totalTasks++, 
                e.tweener = t.GTween.delayedCall(i).setTimeScale(this._timeScale).setTarget(e).onComplete(this.onDelayedPlayItem, this));
                e.tweener && e.tweener.seek(this._startTime);
            }
        }, {
            key: "skipAnimations",
            value: function() {
                for (var e, i, s, n, a, o, h = this._items.length, r = 0; r < h; r++) if (!((o = this._items[r]).type != N.Animation || o.time > this._startTime || (n = o.value).flag)) {
                    e = (a = o.target).getProp(t.ObjectPropID.Frame), i = a.getProp(t.ObjectPropID.Playing) ? 0 : -1, 
                    s = 0;
                    for (var l = r; l < h; l++) (o = this._items[l]).type != N.Animation || o.target != a || o.time > this._startTime || ((n = o.value).flag = !0, 
                    -1 != n.frame ? (e = n.frame, i = n.playing ? o.time : -1, s = 0) : n.playing ? i < 0 && (i = o.time) : (i >= 0 && (s += o.time - i), 
                    i = -1), this.callHook(o, !1));
                    i >= 0 && (s += this._startTime - i), a.setProp(t.ObjectPropID.Playing, i >= 0), 
                    a.setProp(t.ObjectPropID.Frame, e), s > 0 && a.setProp(t.ObjectPropID.DeltaTime, 1e3 * s);
                }
            }
        }, {
            key: "onDelayedPlayItem",
            value: function(t) {
                var e = t.target;
                e.tweener = null, this._totalTasks--, this.applyValue(e), this.callHook(e, !1), 
                this.checkAllComplete();
            }
        }, {
            key: "onTweenStart",
            value: function(t) {
                var e, i, s = t.target;
                s.type != N.XY && s.type != N.Size || (this._reversed ? (e = s.tweenConfig.endValue, 
                i = s.tweenConfig.startValue) : (e = s.tweenConfig.startValue, i = s.tweenConfig.endValue), 
                s.type == N.XY ? s.target != this._owner ? (e.b1 ? e.b3 && (t.startValue.x = e.f1 * this._owner.width) : t.startValue.x = s.target.x, 
                e.b2 ? e.b3 && (t.startValue.y = e.f2 * this._owner.height) : t.startValue.y = s.target.y, 
                i.b1 ? i.b3 && (t.endValue.x = i.f1 * this._owner.width) : t.endValue.x = t.startValue.x, 
                i.b2 ? i.b3 && (t.endValue.y = i.f2 * this._owner.height) : t.endValue.y = t.startValue.y) : (e.b1 || (t.startValue.x = s.target.x - this._ownerBaseX), 
                e.b2 || (t.startValue.y = s.target.y - this._ownerBaseY), i.b1 || (t.endValue.x = t.startValue.x), 
                i.b2 || (t.endValue.y = t.startValue.y)) : (e.b1 || (t.startValue.x = s.target.width), 
                e.b2 || (t.startValue.y = s.target.height), i.b1 || (t.endValue.x = t.startValue.x), 
                i.b2 || (t.endValue.y = t.startValue.y)), s.tweenConfig.path && (s.value.b1 = s.value.b2 = !0, 
                t.setPath(s.tweenConfig.path))), this.callHook(s, !1);
            }
        }, {
            key: "onTweenUpdate",
            value: function(t) {
                var e = t.target;
                switch (e.type) {
                  case N.XY:
                  case N.Size:
                  case N.Scale:
                  case N.Skew:
                    e.value.f1 = t.value.x, e.value.f2 = t.value.y, e.tweenConfig.path && (e.value.f1 += t.startValue.x, 
                    e.value.f2 += t.startValue.y);
                    break;

                  case N.Alpha:
                  case N.Rotation:
                    e.value.f1 = t.value.x;
                    break;

                  case N.Color:
                    e.value.f1 = t.value.color;
                    break;

                  case N.ColorFilter:
                    e.value.f1 = t.value.x, e.value.f2 = t.value.y, e.value.f3 = t.value.z, e.value.f4 = t.value.w;
                    break;

                  case N.Shake:
                    e.value.offsetX = t.deltaValue.x, e.value.offsetY = t.deltaValue.y;
                }
                this.applyValue(e);
            }
        }, {
            key: "onTweenComplete",
            value: function(t) {
                var e = t.target;
                e.tweener = null, this._totalTasks--, t.allCompleted && this.callHook(e, !0), this.checkAllComplete();
            }
        }, {
            key: "onPlayTransCompleted",
            value: function(t) {
                this._totalTasks--, this.checkAllComplete();
            }
        }, {
            key: "callHook",
            value: function(t, e) {
                e ? t.tweenConfig && t.tweenConfig.endHook && t.tweenConfig.endHook.run() : t.time >= this._startTime && t.hook && t.hook.run();
            }
        }, {
            key: "checkAllComplete",
            value: function() {
                if (this._playing && 0 == this._totalTasks) if (this._totalTimes < 0) this.internalPlay(), 
                0 == this._totalTasks && t.GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this); else if (this._totalTimes--, 
                this._totalTimes > 0) this.internalPlay(), 0 == this._totalTasks && t.GTween.delayedCall(0).setTarget(this).onComplete(this.checkAllComplete, this); else {
                    this._playing = !1;
                    for (var e = this._items.length, i = 0; i < e; i++) {
                        var s = this._items[i];
                        s.target && 0 != s.displayLockToken && (s.target.releaseDisplayLock(s.displayLockToken), 
                        s.displayLockToken = 0);
                    }
                    if (this._onComplete) {
                        var n = this._onComplete;
                        this._onComplete = null, n.run();
                    }
                }
            }
        }, {
            key: "applyValue",
            value: function(e) {
                e.target._gearLocked = !0;
                var i = e.value;
                switch (e.type) {
                  case N.XY:
                    e.target == this._owner ? i.b1 && i.b2 ? e.target.setXY(i.f1 + this._ownerBaseX, i.f2 + this._ownerBaseY) : i.b1 ? e.target.x = i.f1 + this._ownerBaseX : e.target.y = i.f2 + this._ownerBaseY : i.b3 ? i.b1 && i.b2 ? e.target.setXY(i.f1 * this._owner.width, i.f2 * this._owner.height) : i.b1 ? e.target.x = i.f1 * this._owner.width : i.b2 && (e.target.y = i.f2 * this._owner.height) : i.b1 && i.b2 ? e.target.setXY(i.f1, i.f2) : i.b1 ? e.target.x = i.f1 : i.b2 && (e.target.y = i.f2);
                    break;

                  case N.Size:
                    i.b1 || (i.f1 = e.target.width), i.b2 || (i.f2 = e.target.height), e.target.setSize(i.f1, i.f2);
                    break;

                  case N.Pivot:
                    e.target.setPivot(i.f1, i.f2, e.target.pivotAsAnchor);
                    break;

                  case N.Alpha:
                    e.target.alpha = i.f1;
                    break;

                  case N.Rotation:
                    e.target.rotation = i.f1;
                    break;

                  case N.Scale:
                    e.target.setScale(i.f1, i.f2);
                    break;

                  case N.Skew:
                    e.target.setSkew(i.f1, i.f2);
                    break;

                  case N.Color:
                    e.target.setProp(t.ObjectPropID.Color, t.ToolSet.convertToHtmlColor(i.f1, !1));
                    break;

                  case N.Animation:
                    i.frame >= 0 && e.target.setProp(t.ObjectPropID.Frame, i.frame), e.target.setProp(t.ObjectPropID.Playing, i.playing), 
                    e.target.setProp(t.ObjectPropID.TimeScale, this._timeScale);
                    break;

                  case N.Visible:
                    e.target.visible = i.visible;
                    break;

                  case N.Transition:
                    if (this._playing) {
                        var s = i.trans;
                        if (s) {
                            this._totalTasks++;
                            var n = this._startTime > e.time ? this._startTime - e.time : 0, a = this._endTime >= 0 ? this._endTime - e.time : -1;
                            i.stopTime >= 0 && (a < 0 || a > i.stopTime) && (a = i.stopTime), s.timeScale = this._timeScale, 
                            s._play(Laya.Handler.create(this, this.onPlayTransCompleted, [ e ]), i.playTimes, 0, n, a, this._reversed);
                        }
                    }
                    break;

                  case N.Sound:
                    if (this._playing && e.time >= this._startTime) {
                        if (null == i.audioClip) {
                            var o = t.UIPackage.getItemByURL(i.sound);
                            i.audioClip = o ? o.file : i.sound;
                        }
                        i.audioClip && t.GRoot.inst.playOneShotSound(i.audioClip, i.volume);
                    }
                    break;

                  case N.Shake:
                    e.target.setXY(e.target.x - i.lastOffsetX + i.offsetX, e.target.y - i.lastOffsetY + i.offsetY), 
                    i.lastOffsetX = i.offsetX, i.lastOffsetY = i.offsetY;
                    break;

                  case N.ColorFilter:
                    t.ToolSet.setColorFilter(e.target.displayObject, [ i.f1, i.f2, i.f3, i.f4 ]);
                    break;

                  case N.Text:
                    e.target.text = i.text;
                    break;

                  case N.Icon:
                    e.target.icon = i.text;
                }
                e.target._gearLocked = !1;
            }
        }, {
            key: "setup",
            value: function(e) {
                this.name = e.readS(), this._options = e.getInt32(), this._autoPlay = e.readBool(), 
                this._autoPlayTimes = e.getInt32(), this._autoPlayDelay = e.getFloat32();
                for (var i = e.getInt16(), s = 0; s < i; s++) {
                    var n = e.getInt16(), a = e.pos;
                    e.seek(a, 0);
                    var o = new Y(e.readByte());
                    this._items[s] = o, o.time = e.getFloat32();
                    var h = e.getInt16();
                    if (o.targetId = h < 0 ? "" : this._owner.getChildAt(h).id, o.label = e.readS(), 
                    e.readBool()) {
                        if (e.seek(a, 1), o.tweenConfig = new X(), o.tweenConfig.duration = e.getFloat32(), 
                        o.time + o.tweenConfig.duration > this._totalDuration && (this._totalDuration = o.time + o.tweenConfig.duration), 
                        o.tweenConfig.easeType = e.readByte(), o.tweenConfig.repeat = e.getInt32(), o.tweenConfig.yoyo = e.readBool(), 
                        o.tweenConfig.endLabel = e.readS(), e.seek(a, 2), this.decodeValue(o, e, o.tweenConfig.startValue), 
                        e.seek(a, 3), this.decodeValue(o, e, o.tweenConfig.endValue), e.version >= 2) {
                            var r = e.getInt32();
                            if (r > 0) {
                                o.tweenConfig.path = new t.GPath();
                                for (var l = new Array(), u = 0; u < r; u++) {
                                    var _ = e.getUint8();
                                    switch (_) {
                                      case t.CurveType.Bezier:
                                        l.push(t.GPathPoint.newBezierPoint(e.getFloat32(), e.getFloat32(), e.getFloat32(), e.getFloat32()));
                                        break;

                                      case t.CurveType.CubicBezier:
                                        l.push(t.GPathPoint.newCubicBezierPoint(e.getFloat32(), e.getFloat32(), e.getFloat32(), e.getFloat32(), e.getFloat32(), e.getFloat32()));
                                        break;

                                      default:
                                        l.push(t.GPathPoint.newPoint(e.getFloat32(), e.getFloat32(), _));
                                    }
                                }
                                o.tweenConfig.path.create(l);
                            }
                        }
                    } else o.time > this._totalDuration && (this._totalDuration = o.time), e.seek(a, 2), 
                    this.decodeValue(o, e, o.value);
                    e.pos = a + n;
                }
            }
        }, {
            key: "decodeValue",
            value: function(t, e, i) {
                switch (t.type) {
                  case N.XY:
                  case N.Size:
                  case N.Pivot:
                  case N.Skew:
                    i.b1 = e.readBool(), i.b2 = e.readBool(), i.f1 = e.getFloat32(), i.f2 = e.getFloat32(), 
                    e.version >= 2 && t.type == N.XY && (i.b3 = e.readBool());
                    break;

                  case N.Alpha:
                  case N.Rotation:
                    i.f1 = e.getFloat32();
                    break;

                  case N.Scale:
                    i.f1 = e.getFloat32(), i.f2 = e.getFloat32();
                    break;

                  case N.Color:
                    i.f1 = e.readColor();
                    break;

                  case N.Animation:
                    i.playing = e.readBool(), i.frame = e.getInt32();
                    break;

                  case N.Visible:
                    i.visible = e.readBool();
                    break;

                  case N.Sound:
                    i.sound = e.readS(), i.volume = e.getFloat32();
                    break;

                  case N.Transition:
                    i.transName = e.readS(), i.playTimes = e.getInt32();
                    break;

                  case N.Shake:
                    i.amplitude = e.getFloat32(), i.duration = e.getFloat32();
                    break;

                  case N.ColorFilter:
                    i.f1 = e.getFloat32(), i.f2 = e.getFloat32(), i.f3 = e.getFloat32(), i.f4 = e.getFloat32();
                    break;

                  case N.Text:
                  case N.Icon:
                    i.text = e.readS();
                }
            }
        }, {
            key: "playing",
            get: function() {
                return this._playing;
            }
        }, {
            key: "timeScale",
            get: function() {
                return this._timeScale;
            },
            set: function(e) {
                if (this._timeScale != e && (this._timeScale = e, this._playing)) for (var i = this._items.length, s = 0; s < i; s++) {
                    var n = this._items[s];
                    n.tweener ? n.tweener.setTimeScale(e) : n.type == N.Transition ? n.value.trans && (n.value.trans.timeScale = e) : n.type == N.Animation && n.target && n.target.setProp(t.ObjectPropID.TimeScale, e);
                }
            }
        } ]), e;
    }();
    var N = function t() {
        (0, classCallCheck.default)(this, t);
    };
    N.XY = 0, N.Size = 1, N.Scale = 2, N.Pivot = 3, N.Alpha = 4, N.Rotation = 5, N.Color = 6, 
    N.Animation = 7, N.Visible = 8, N.Sound = 9, N.Transition = 10, N.Shake = 11, N.ColorFilter = 12, 
    N.Skew = 13, N.Text = 14, N.Icon = 15, N.Unknown = 16;
    var Y = function t(e) {
        (0, classCallCheck.default)(this, t), this.type = e, this.value = {}, this.displayLockToken = 0;
    }, X = function e() {
        (0, classCallCheck.default)(this, e), this.easeType = t.EaseType.QuadOut, this.startValue = {
            b1: !0,
            b2: !0
        }, this.endValue = {
            b1: !0,
            b2: !0
        };
    }, q = 1, K = 2, $ = 4, Q = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, l.default)(e, null, [ {
            key: "loadFromXML",
            value: function(t) {
                var i = {};
                e.strings = i;
                for (var s = function(t, e) {
                    var i = t.childNodes, s = i.length;
                    if (s > 0) for (var n = 0; n < s; n++) {
                        var a = i[n];
                        if ("resources" == a.nodeName) return a;
                    }
                    return null;
                }(Laya.Utils.parseXMLFromString(t)).childNodes, n = s.length, a = 0; a < n; a++) {
                    var o = s[a];
                    if ("string" == o.nodeName) {
                        var h = o.getAttribute("name"), r = o.textContent, l = h.indexOf("-");
                        if (-1 == l) continue;
                        var u = h.substr(0, l), _ = h.substr(l + 1), c = i[u];
                        c || (c = {}, i[u] = c), c[_] = r;
                    }
                }
            }
        }, {
            key: "translateComponent",
            value: function(i) {
                if (null != e.strings) {
                    var s = e.strings[i.owner.id + i.id];
                    if (null != s) {
                        var n, a, o, h, r, l, u, _, c, d = i.rawData;
                        d.seek(0, 2);
                        var g = d.getInt16();
                        for (r = 0; r < g; r++) {
                            u = d.getInt16(), _ = d.pos, d.seek(_, 0);
                            var f = d.readByte(), p = f;
                            d.skip(4), n = d.readS(), p == t.ObjectType.Component && d.seek(_, 6) && (p = d.readByte()), 
                            d.seek(_, 1), null != (a = s[n + "-tips"]) && d.writeS(a), d.seek(_, 2);
                            var y = d.getInt16();
                            for (l = 0; l < y; l++) {
                                if (o = d.getInt16(), o += d.pos, 6 == d.readByte()) {
                                    for (d.skip(2), c = d.getInt16(), m = 0; m < c; m++) null != d.readS() && (null != (a = s[n + "-texts_" + m]) ? d.writeS(a) : d.skip(2));
                                    d.readBool() && null != (a = s[n + "-texts_def"]) && d.writeS(a);
                                }
                                d.pos = o;
                            }
                            if (f == t.ObjectType.Component && d.version >= 2) {
                                d.seek(_, 4), d.skip(2), d.skip(4 * d.getUint16());
                                for (var v = d.getUint16(), m = 0; m < v; m++) {
                                    var k = d.readS();
                                    0 == d.getUint16() && null != (a = s[n + "-cp-" + k]) ? d.writeS(a) : d.skip(2);
                                }
                            }
                            switch (p) {
                              case t.ObjectType.Text:
                              case t.ObjectType.RichText:
                              case t.ObjectType.InputText:
                                null != (a = s[n]) && (d.seek(_, 6), d.writeS(a)), null != (a = s[n + "-prompt"]) && (d.seek(_, 4), 
                                d.writeS(a));
                                break;

                              case t.ObjectType.List:
                              case t.ObjectType.Tree:
                                for (d.seek(_, 8), d.skip(2), h = d.getUint16(), l = 0; l < h; l++) {
                                    if (o = d.getUint16(), o += d.pos, d.skip(2), p == t.ObjectType.Tree && d.skip(2), 
                                    null != (a = s[n + "-" + l]) ? d.writeS(a) : d.skip(2), null != (a = s[n + "-" + l + "-0"]) ? d.writeS(a) : d.skip(2), 
                                    d.version >= 2) for (d.skip(6), d.skip(4 * d.getUint16()), v = d.getUint16(), m = 0; m < v; m++) k = d.readS(), 
                                    0 == d.getUint16() && null != (a = s[n + "-" + l + "-" + k]) ? d.writeS(a) : d.skip(2);
                                    d.pos = o;
                                }
                                break;

                              case t.ObjectType.Label:
                                d.seek(_, 6) && d.readByte() == p && (null != (a = s[n]) ? d.writeS(a) : d.skip(2), 
                                d.skip(2), d.readBool() && d.skip(4), d.skip(4), d.readBool() && null != (a = s[n + "-prompt"]) && d.writeS(a));
                                break;

                              case t.ObjectType.Button:
                                d.seek(_, 6) && d.readByte() == p && (null != (a = s[n]) ? d.writeS(a) : d.skip(2), 
                                null != (a = s[n + "-0"]) && d.writeS(a));
                                break;

                              case t.ObjectType.ComboBox:
                                if (d.seek(_, 6) && d.readByte() == p) {
                                    for (h = d.getInt16(), l = 0; l < h; l++) o = d.getInt16(), o += d.pos, null != (a = s[n + "-" + l]) && d.writeS(a), 
                                    d.pos = o;
                                    null != (a = s[n]) && d.writeS(a);
                                }
                            }
                            d.pos = _ + u;
                        }
                    }
                }
            }
        } ]), e;
    }();
    t.TranslationHelper = Q;
    var Z = function t() {
        (0, classCallCheck.default)(this, t);
    };
    Z.defaultFont = "SimSun", Z.modalLayerColor = "rgba(33,33,33,0.2)", Z.buttonSoundVolumeScale = 1, 
    Z.defaultScrollStep = 25, Z.defaultScrollDecelerationRate = .967, Z.defaultScrollBarDisplay = t.ScrollBarDisplayType.Visible, 
    Z.defaultScrollTouchEffect = !0, Z.defaultScrollBounceEffect = !0, Z.defaultScrollSnappingThreshold = .1, 
    Z.defaultScrollPagingThreshold = .3, Z.defaultComboBoxVisibleItemCount = 10, Z.touchScrollSensitivity = 20, 
    Z.touchDragSensitivity = 10, Z.clickDragSensitivity = 2, Z.bringWindowToFrontOnClick = !0, 
    Z.frameTimeForAsyncUIConstruction = 2, Z.textureLinearSampling = !0, Z.packageFileExtension = "fui", 
    t.UIConfig = Z;
    var J = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, l.default)(e, null, [ {
            key: "setExtension",
            value: function(i, s) {
                if (null == i) throw "Invaild url: " + i;
                var n = t.UIPackage.getItemByURL(i);
                n && (n.extensionType = s), e.extensions[i] = s;
            }
        }, {
            key: "setPackageItemExtension",
            value: function(t, i) {
                e.setExtension(t, i);
            }
        }, {
            key: "setLoaderExtension",
            value: function(t) {
                e.loaderType = t;
            }
        }, {
            key: "resolvePackageItemExtension",
            value: function(t) {
                var i = e.extensions["ui://" + t.owner.id + t.id];
                i || (i = e.extensions["ui://" + t.owner.name + "/" + t.name]), i && (t.extensionType = i);
            }
        }, {
            key: "newObject",
            value: function(i, s) {
                var n;
                if ("number" == typeof i) switch (i) {
                  case t.ObjectType.Image:
                    return new t.GImage();

                  case t.ObjectType.MovieClip:
                    return new t.GMovieClip();

                  case t.ObjectType.Component:
                    return new t.GComponent();

                  case t.ObjectType.Text:
                    return new t.GBasicTextField();

                  case t.ObjectType.RichText:
                    return new t.GRichTextField();

                  case t.ObjectType.InputText:
                    return new t.GTextInput();

                  case t.ObjectType.Group:
                    return new t.GGroup();

                  case t.ObjectType.List:
                    return new t.GList();

                  case t.ObjectType.Graph:
                    return new t.GGraph();

                  case t.ObjectType.Loader:
                    return e.loaderType ? new e.loaderType() : new t.GLoader();

                  case t.ObjectType.Button:
                    return new t.GButton();

                  case t.ObjectType.Label:
                    return new t.GLabel();

                  case t.ObjectType.ProgressBar:
                    return new t.GProgressBar();

                  case t.ObjectType.Slider:
                    return new t.GSlider();

                  case t.ObjectType.ScrollBar:
                    return new t.GScrollBar();

                  case t.ObjectType.ComboBox:
                    return new t.GComboBox();

                  case t.ObjectType.Tree:
                    return new t.GTree();

                  case t.ObjectType.Loader3D:
                    return new t.GLoader3D();

                  default:
                    return null;
                } else (n = i.type == t.PackageItemType.Component ? s ? new s() : i.extensionType ? new i.extensionType() : e.newObject(i.objectType) : e.newObject(i.objectType)) && (n.packageItem = i);
                return n;
            }
        } ]), e;
    }();
    J.extensions = {}, t.UIObjectFactory = J;
    var tt, et = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._items = [], this._itemsById = {}, this._itemsByName = {}, 
            this._sprites = {}, this._dependencies = [], this._branches = [], this._branchIndex = -1;
        }
        return (0, l.default)(e, [ {
            key: "loadPackage",
            value: function(i) {
                if (1179080009 != i.getUint32()) throw new Error("FairyGUI: old package format found in '" + this._resKey + "'");
                i.version = i.getInt32();
                var s = i.readBool();
                if (this._id = i.readUTFString(), this._name = i.readUTFString(), i.skip(20), s) {
                    var n = new Uint8Array(i.buffer, i.pos, i.length - i.pos);
                    n = new Zlib.RawInflate(n).decompress();
                    var a = new t.ByteBuffer(n);
                    a.version = i.version, i = a;
                }
                var o, h, r, l, u, _ = i.version >= 2, c = i.pos;
                i.seek(c, 4), o = i.getInt32();
                var d, g = [];
                for (h = 0; h < o; h++) g[h] = i.readUTFString();
                for (i.stringTable = g, i.seek(c, 0), o = i.getInt16(), h = 0; h < o; h++) this._dependencies.push({
                    id: i.readS(),
                    name: i.readS()
                });
                _ && ((o = i.getInt16()) > 0 && (this._branches = i.readSArray(o), e._branch && (this._branchIndex = this._branches.indexOf(e._branch))), 
                u = o > 0), i.seek(c, 1);
                var f = this._resKey, p = f.lastIndexOf("/"), y = -1 == p ? "" : f.substr(0, p + 1);
                for (f += "_", o = i.getUint16(), h = 0; h < o; h++) {
                    switch (r = i.getInt32(), r += i.pos, (d = new t.PackageItem()).owner = this, d.type = i.readByte(), 
                    d.id = i.readS(), d.name = i.readS(), i.readS(), (l = i.readS()) && (d.file = l), 
                    i.readBool(), d.width = i.getInt32(), d.height = i.getInt32(), d.type) {
                      case t.PackageItemType.Image:
                        d.objectType = t.ObjectType.Image;
                        var v = i.readByte();
                        1 == v ? (d.scale9Grid = new Laya.Rectangle(), d.scale9Grid.x = i.getInt32(), d.scale9Grid.y = i.getInt32(), 
                        d.scale9Grid.width = i.getInt32(), d.scale9Grid.height = i.getInt32(), d.tileGridIndice = i.getInt32()) : 2 == v && (d.scaleByTile = !0), 
                        d.smoothing = i.readBool();
                        break;

                      case t.PackageItemType.MovieClip:
                        d.smoothing = i.readBool(), d.objectType = t.ObjectType.MovieClip, d.rawData = i.readBuffer();
                        break;

                      case t.PackageItemType.Font:
                        d.rawData = i.readBuffer();
                        break;

                      case t.PackageItemType.Component:
                        var m = i.readByte();
                        d.objectType = m > 0 ? m : t.ObjectType.Component, d.rawData = i.readBuffer(), t.UIObjectFactory.resolvePackageItemExtension(d);
                        break;

                      case t.PackageItemType.Atlas:
                      case t.PackageItemType.Sound:
                      case t.PackageItemType.Misc:
                        d.file = f + d.file;
                        break;

                      case t.PackageItemType.Spine:
                      case t.PackageItemType.DragonBones:
                        d.file = y + d.file, d.skeletonAnchor = new Laya.Point(), d.skeletonAnchor.x = i.getFloat32(), 
                        d.skeletonAnchor.y = i.getFloat32();
                    }
                    if (_) {
                        (l = i.readS()) && (d.name = l + "/" + d.name);
                        var k = i.getUint8();
                        k > 0 && (u ? d.branches = i.readSArray(k) : this._itemsById[i.readS()] = d);
                        var w = i.getUint8();
                        w > 0 && (d.highResolution = i.readSArray(w));
                    }
                    this._items.push(d), this._itemsById[d.id] = d, null != d.name && (this._itemsByName[d.name] = d), 
                    i.pos = r;
                }
                for (i.seek(c, 2), o = i.getUint16(), h = 0; h < o; h++) {
                    r = i.getUint16(), r += i.pos;
                    var C = i.readS(), b = {
                        atlas: d = this._itemsById[i.readS()],
                        rect: new Laya.Rectangle(),
                        offset: new Laya.Point(),
                        originalSize: new Laya.Point()
                    };
                    b.atlas = d, b.rect.x = i.getInt32(), b.rect.y = i.getInt32(), b.rect.width = i.getInt32(), 
                    b.rect.height = i.getInt32(), b.rotated = i.readBool(), _ && i.readBool() ? (b.offset.x = i.getInt32(), 
                    b.offset.y = i.getInt32(), b.originalSize.x = i.getInt32(), b.originalSize.y = i.getInt32()) : (b.originalSize.x = b.rect.width, 
                    b.originalSize.y = b.rect.height), this._sprites[C] = b, i.pos = r;
                }
                if (i.seek(c, 3)) for (o = i.getUint16(), h = 0; h < o; h++) r = i.getInt32(), r += i.pos, 
                (d = this._itemsById[i.readS()]) && d.type == t.PackageItemType.Image && (d.pixelHitTestData = new t.PixelHitTestData(), 
                d.pixelHitTestData.load(i)), i.pos = r;
            }
        }, {
            key: "loadAllAssets",
            value: function() {
                for (var t = this._items.length, e = 0; e < t; e++) {
                    var i = this._items[e];
                    this.getItemAsset(i);
                }
            }
        }, {
            key: "unloadAssets",
            value: function() {
                for (var e = this._items.length, i = 0; i < e; i++) {
                    var s = this._items[i];
                    s.type == t.PackageItemType.Atlas && s.texture && Laya.loader.clearTextureRes(s.texture.url);
                }
            }
        }, {
            key: "dispose",
            value: function() {
                for (var e = this._items.length, i = 0; i < e; i++) {
                    var s = this._items[i];
                    s.type == t.PackageItemType.Atlas ? s.texture && (s.texture.destroy(), s.texture = null) : s.type == t.PackageItemType.Sound ? Laya.SoundManager.destroySound(s.file) : s.templet && s.templet.destroy();
                }
            }
        }, {
            key: "createObject",
            value: function(t, e) {
                var i = this._itemsByName[t];
                return i ? this.internalCreateObject(i, e) : null;
            }
        }, {
            key: "internalCreateObject",
            value: function(i, s) {
                var n = t.UIObjectFactory.newObject(i, s);
                return null == n ? null : (e._constructing++, n.constructFromResource(), e._constructing--, 
                n);
            }
        }, {
            key: "getItemById",
            value: function(t) {
                return this._itemsById[t];
            }
        }, {
            key: "getItemByName",
            value: function(t) {
                return this._itemsByName[t];
            }
        }, {
            key: "getItemAssetByName",
            value: function(t) {
                var e = this._itemsByName[t];
                if (null == e) throw "Resource not found -" + t;
                return this.getItemAsset(e);
            }
        }, {
            key: "getItemAsset",
            value: function(e) {
                switch (e.type) {
                  case t.PackageItemType.Image:
                    if (!e.decoded) {
                        e.decoded = !0;
                        var i = this._sprites[e.id];
                        if (i) {
                            var s = this.getItemAsset(i.atlas);
                            e.texture = s ? Laya.Texture.create(s, i.rect.x, i.rect.y, i.rect.width, i.rect.height, i.offset.x, i.offset.y, i.originalSize.x, i.originalSize.y) : null;
                        } else e.texture = null;
                    }
                    return e.texture;

                  case t.PackageItemType.Atlas:
                    return e.decoded || (e.decoded = !0, e.texture = t.AssetProxy.inst.getRes(e.file)), 
                    e.texture;

                  case t.PackageItemType.Font:
                    return e.decoded || (e.decoded = !0, this.loadFont(e)), e.bitmapFont;

                  case t.PackageItemType.MovieClip:
                    return e.decoded || (e.decoded = !0, this.loadMovieClip(e)), e.frames;

                  case t.PackageItemType.Component:
                    return e.rawData;

                  case t.PackageItemType.Misc:
                    return e.file ? t.AssetProxy.inst.getRes(e.file) : null;

                  default:
                    return null;
                }
            }
        }, {
            key: "getItemAssetAsync",
            value: function(e, i) {
                if (e.decoded) i(null, e); else if (e.loading) e.loading.push(i); else switch (e.type) {
                  case t.PackageItemType.Spine:
                  case t.PackageItemType.DragonBones:
                    e.loading = [ i ], e.templet = new Laya.Templet(), e.templet.on(Laya.Event.COMPLETE, this, function() {
                        var t = e.loading;
                        delete e.loading, t.forEach(function(t) {
                            return t(null, e);
                        });
                    }), e.templet.on(Laya.Event.ERROR, this, function() {
                        var t = e.loading;
                        delete e.loading, delete e.templet, t.forEach(function(t) {
                            return t("parse error", e);
                        });
                    });
                    var s = e.file.lastIndexOf("."), n = e.file.substring(0, s + 1).replace("_ske", "") + "sk";
                    e.templet.loadAni(n);
                    break;

                  default:
                    this.getItemAsset(e), i(null, e);
                }
            }
        }, {
            key: "loadMovieClip",
            value: function(t) {
                var e = t.rawData;
                e.seek(0, 0), t.interval = e.getInt32(), t.swing = e.readBool(), t.repeatDelay = e.getInt32(), 
                e.seek(0, 1);
                var i, s, n, a, o = e.getInt16();
                t.frames = [];
                for (var h = 0; h < o; h++) {
                    var r = e.getInt16();
                    r += e.pos, n = e.getInt32(), a = e.getInt32(), e.getInt32(), e.getInt32();
                    var l = {
                        addDelay: e.getInt32()
                    };
                    if (null != (i = e.readS()) && null != (s = this._sprites[i])) {
                        var u = this.getItemAsset(s.atlas);
                        l.texture = Laya.Texture.create(u, s.rect.x, s.rect.y, s.rect.width, s.rect.height, n, a, t.width, t.height);
                    }
                    t.frames[h] = l, e.pos = r;
                }
            }
        }, {
            key: "loadFont",
            value: function(e) {
                e = e.getBranch();
                var i = new t.BitmapFont();
                e.bitmapFont = i;
                var s = e.rawData;
                s.seek(0, 0), i.ttf = s.readBool(), i.tint = s.readBool(), i.resizable = s.readBool(), 
                s.readBool(), i.size = s.getInt32();
                var n = s.getInt32(), a = s.getInt32(), o = null, h = this._sprites[e.id];
                h && (o = this.getItemAsset(h.atlas)), s.seek(0, 1);
                for (var r = null, l = s.getInt32(), u = 0; u < l; u++) {
                    var _ = s.getInt16();
                    _ += s.pos, r = {};
                    var c = s.readChar();
                    i.glyphs[c] = r;
                    var d = s.readS(), g = s.getInt32(), f = s.getInt32();
                    if (r.x = s.getInt32(), r.y = s.getInt32(), r.width = s.getInt32(), r.height = s.getInt32(), 
                    r.advance = s.getInt32(), r.channel = s.readByte(), 1 == r.channel ? r.channel = 3 : 2 == r.channel ? r.channel = 2 : 3 == r.channel && (r.channel = 1), 
                    i.ttf) r.texture = Laya.Texture.create(o, g + h.rect.x, f + h.rect.y, r.width, r.height), 
                    r.lineHeight = a; else {
                        var p = this._itemsById[d];
                        p && (p = p.getBranch(), r.width = p.width, r.height = p.height, p = p.getHighResolution(), 
                        this.getItemAsset(p), r.texture = p.texture), 0 == r.advance && (r.advance = 0 == n ? r.x + r.width : n), 
                        r.lineHeight = r.y < 0 ? r.height : r.y + r.height, r.lineHeight < i.size && (r.lineHeight = i.size);
                    }
                    s.pos = _;
                }
            }
        }, {
            key: "id",
            get: function() {
                return this._id;
            }
        }, {
            key: "name",
            get: function() {
                return this._name;
            }
        }, {
            key: "customId",
            get: function() {
                return this._customId;
            },
            set: function(t) {
                this._customId && delete e._instById[this._customId], this._customId = t, this._customId && (e._instById[this._customId] = this);
            }
        } ], [ {
            key: "getVar",
            value: function(t) {
                return e._vars[t];
            }
        }, {
            key: "setVar",
            value: function(t, i) {
                e._vars[t] = i;
            }
        }, {
            key: "getById",
            value: function(t) {
                return e._instById[t];
            }
        }, {
            key: "getByName",
            value: function(t) {
                return e._instByName[t];
            }
        }, {
            key: "addPackage",
            value: function(i, s) {
                if (!(s || (s = t.AssetProxy.inst.getRes(i + "." + t.UIConfig.packageFileExtension)) && 0 != s.byteLength)) throw new Error("resource '" + i + "' not found");
                var n = new t.ByteBuffer(s), a = new e();
                return a._resKey = i, a.loadPackage(n), e._instById[a.id] = a, e._instByName[a.name] = a, 
                e._instById[i] = a, a;
            }
        }, {
            key: "loadPackage",
            value: function(i, s, n) {
                var a, o = [], h = [];
                if (Array.isArray(i)) for (a = 0; a < i.length; a++) o.push({
                    url: i[a] + "." + t.UIConfig.packageFileExtension,
                    type: Laya.Loader.BUFFER
                }), h.push(i[a]); else o = [ {
                    url: i + "." + t.UIConfig.packageFileExtension,
                    type: Laya.Loader.BUFFER
                } ], h = [ i ];
                var r, l = [];
                for (a = 0; a < o.length; a++) (r = e._instById[h[a]]) && (l.push(r), o.splice(a, 1), 
                h.splice(a, 1), a--);
                if (0 != o.length) {
                    var u = Laya.Handler.create(this, function() {
                        var i, r = [];
                        for (a = 0; a < o.length; a++) {
                            var u = t.AssetProxy.inst.getRes(o[a].url);
                            if (u) {
                                i = new e(), l.push(i), i._resKey = h[a], i.loadPackage(new t.ByteBuffer(u));
                                for (var _ = i._items.length, c = 0; c < _; c++) {
                                    var d = i._items[c];
                                    d.type == t.PackageItemType.Atlas ? r.push({
                                        url: d.file,
                                        type: Laya.Loader.IMAGE
                                    }) : d.type == t.PackageItemType.Sound && r.push({
                                        url: d.file,
                                        type: Laya.Loader.SOUND
                                    });
                                }
                            }
                        }
                        if (r.length > 0) t.AssetProxy.inst.load(r, Laya.Handler.create(this, function() {
                            for (a = 0; a < l.length; a++) i = l[a], e._instById[i.id] || (e._instById[i.id] = i, 
                            e._instByName[i.name] = i, e._instById[i._resKey] = i);
                            s.runWith([ l ]);
                        }, null, !0), n); else {
                            for (a = 0; a < l.length; a++) i = l[a], e._instById[i.id] || (e._instById[i.id] = i, 
                            e._instByName[i.name] = i, e._instById[i._resKey] = i);
                            s.runWith([ l ]);
                        }
                    }, null, !0);
                    t.AssetProxy.inst.load(o, u, null, Laya.Loader.BUFFER);
                } else s.runWith([ l ]);
            }
        }, {
            key: "removePackage",
            value: function(t) {
                var i = e._instById[t];
                if (i || (i = e._instByName[t]), !i) throw new Error("unknown package: " + t);
                i.dispose(), delete e._instById[i.id], delete e._instByName[i.name], delete e._instById[i._resKey], 
                i._customId && delete e._instById[i._customId];
            }
        }, {
            key: "createObject",
            value: function(t, i, s) {
                var n = e.getByName(t);
                return n ? n.createObject(i, s) : null;
            }
        }, {
            key: "createObjectFromURL",
            value: function(t, i) {
                var s = e.getItemByURL(t);
                return s ? s.owner.internalCreateObject(s, i) : null;
            }
        }, {
            key: "getItemURL",
            value: function(t, i) {
                var s = e.getByName(t);
                if (!s) return null;
                var n = s._itemsByName[i];
                return n ? "ui://" + s.id + n.id : null;
            }
        }, {
            key: "getItemByURL",
            value: function(t) {
                var i = t.indexOf("//");
                if (-1 == i) return null;
                var s = t.indexOf("/", i + 2);
                if (-1 == s) {
                    if (t.length > 13) {
                        var n = t.substr(5, 8), a = e.getById(n);
                        if (a) {
                            var o = t.substr(13);
                            return a.getItemById(o);
                        }
                    }
                } else {
                    var h = t.substr(i + 2, s - i - 2);
                    if (a = e.getByName(h)) {
                        var r = t.substr(s + 1);
                        return a.getItemByName(r);
                    }
                }
                return null;
            }
        }, {
            key: "getItemAssetByURL",
            value: function(t) {
                var i = e.getItemByURL(t);
                return null == i ? null : i.owner.getItemAsset(i);
            }
        }, {
            key: "normalizeURL",
            value: function(t) {
                if (null == t) return null;
                var i = t.indexOf("//");
                if (-1 == i) return null;
                var s = t.indexOf("/", i + 2);
                if (-1 == s) return t;
                var n = t.substr(i + 2, s - i - 2), a = t.substr(s + 1);
                return e.getItemURL(n, a);
            }
        }, {
            key: "setStringsSource",
            value: function(e) {
                t.TranslationHelper.loadFromXML(e);
            }
        }, {
            key: "branch",
            get: function() {
                return e._branch;
            },
            set: function(t) {
                for (var i in e._branch = t, e._instById) {
                    var s = e._instById[i];
                    s._branches && (s._branchIndex = s._branches.indexOf(t));
                }
            }
        } ]), e;
    }();
    function it(e, i, s, n, a) {
        var o, h, r;
        switch ((!n || s != t.FillOrigin.TopRight && s != t.FillOrigin.BottomLeft) && (n || s != t.FillOrigin.TopLeft && s != t.FillOrigin.BottomRight) || (a = 1 - a), 
        o = ((h = e * Math.tan(Math.PI / 2 * a)) - i) / h, s) {
          case t.FillOrigin.TopLeft:
            r = n ? h <= i ? [ 0, 0, e, h, e, 0 ] : [ 0, 0, e * (1 - o), i, e, i, e, 0 ] : h <= i ? [ 0, 0, e, h, e, i, 0, i ] : [ 0, 0, e * (1 - o), i, 0, i ];
            break;

          case t.FillOrigin.TopRight:
            r = n ? h <= i ? [ e, 0, 0, h, 0, i, e, i ] : [ e, 0, e * o, i, e, i ] : h <= i ? [ e, 0, 0, h, 0, 0 ] : [ e, 0, e * o, i, 0, i, 0, 0 ];
            break;

          case t.FillOrigin.BottomLeft:
            r = n ? h <= i ? [ 0, i, e, i - h, e, 0, 0, 0 ] : [ 0, i, e * (1 - o), 0, 0, 0 ] : h <= i ? [ 0, i, e, i - h, e, i ] : [ 0, i, e * (1 - o), 0, e, 0, e, i ];
            break;

          case t.FillOrigin.BottomRight:
            r = n ? h <= i ? [ e, i, 0, i - h, 0, i ] : [ e, i, e * o, 0, 0, 0, 0, i ] : h <= i ? [ e, i, 0, i - h, 0, 0, e, 0 ] : [ e, i, e * o, 0, e, 0 ];
        }
        return r;
    }
    function st(t, e, i) {
        for (var s = t.length, n = 0; n < s; n += 2) t[n] += e, t[n + 1] += i;
    }
    function nt(e, i, s, n, a) {
        var o;
        switch (s) {
          case t.FillOrigin.Top:
            a <= .5 ? (a /= .5, o = it(e / 2, i, n ? t.FillOrigin.TopLeft : t.FillOrigin.TopRight, n, a), 
            n && st(o, e / 2, 0)) : (a = (a - .5) / .5, o = it(e / 2, i, n ? t.FillOrigin.TopRight : t.FillOrigin.TopLeft, n, a), 
            n ? o.push(e, i, e, 0) : (st(o, e / 2, 0), o.push(0, i, 0, 0)));
            break;

          case t.FillOrigin.Bottom:
            a <= .5 ? (a /= .5, o = it(e / 2, i, n ? t.FillOrigin.BottomRight : t.FillOrigin.BottomLeft, n, a), 
            n || st(o, e / 2, 0)) : (a = (a - .5) / .5, o = it(e / 2, i, n ? t.FillOrigin.BottomLeft : t.FillOrigin.BottomRight, n, a), 
            n ? (st(o, e / 2, 0), o.push(0, 0, 0, i)) : o.push(e, 0, e, i));
            break;

          case t.FillOrigin.Left:
            a <= .5 ? (a /= .5, o = it(e, i / 2, n ? t.FillOrigin.BottomLeft : t.FillOrigin.TopLeft, n, a), 
            n || st(o, 0, i / 2)) : (a = (a - .5) / .5, o = it(e, i / 2, n ? t.FillOrigin.TopLeft : t.FillOrigin.BottomLeft, n, a), 
            n ? (st(o, 0, i / 2), o.push(e, 0, 0, 0)) : o.push(e, i, 0, i));
            break;

          case t.FillOrigin.Right:
            a <= .5 ? (a /= .5, o = it(e, i / 2, n ? t.FillOrigin.TopRight : t.FillOrigin.BottomRight, n, a), 
            n && st(o, 0, i / 2)) : (a = (a - .5) / .5, o = it(e, i / 2, n ? t.FillOrigin.BottomRight : t.FillOrigin.TopRight, n, a), 
            n ? o.push(0, i, e, i) : (st(o, 0, i / 2), o.push(0, 0, e, 0)));
        }
        return o;
    }
    et._constructing = 0, et._instById = {}, et._instByName = {}, et._branch = "", et._vars = {}, 
    t.UIPackage = et, t.Window = function(e) {
        (0, h.default)(a, e);
        var s = u(a);
        function a() {
            var e;
            return (0, classCallCheck.default)(this, a), (e = s.call(this))._requestingCmd = 0, e._uiSources = [], 
            e.bringToFontOnClick = t.UIConfig.bringWindowToFrontOnClick, e.displayObject.on(Laya.Event.DISPLAY, (0, 
            assertThisInitialized.default)(e), e.__onShown), e.displayObject.on(Laya.Event.UNDISPLAY, (0, assertThisInitialized.default)(e), e.__onHidden), 
            e.displayObject.on(Laya.Event.MOUSE_DOWN, (0, assertThisInitialized.default)(e), e.__mouseDown), e;
        }
        return (0, l.default)(a, [ {
            key: "addUISource",
            value: function(t) {
                this._uiSources.push(t);
            }
        }, {
            key: "show",
            value: function() {
                t.GRoot.inst.showWindow(this);
            }
        }, {
            key: "showOn",
            value: function(t) {
                t.showWindow(this);
            }
        }, {
            key: "hide",
            value: function() {
                this.isShowing && this.doHideAnimation();
            }
        }, {
            key: "hideImmediately",
            value: function() {
                var e = this.parent instanceof t.GRoot ? this.parent : null;
                e || (e = t.GRoot.inst), e.hideWindowImmediately(this);
            }
        }, {
            key: "centerOn",
            value: function(e, i) {
                this.setXY(Math.round((e.width - this.width) / 2), Math.round((e.height - this.height) / 2)), 
                i && (this.addRelation(e, t.RelationType.Center_Center), this.addRelation(e, t.RelationType.Middle_Middle));
            }
        }, {
            key: "toggleStatus",
            value: function() {
                this.isTop ? this.hide() : this.show();
            }
        }, {
            key: "bringToFront",
            value: function() {
                this.root.bringToFront(this);
            }
        }, {
            key: "showModalWait",
            value: function(e) {
                null != e && (this._requestingCmd = e), t.UIConfig.windowModalWaiting && (this._modalWaitPane || (this._modalWaitPane = t.UIPackage.createObjectFromURL(t.UIConfig.windowModalWaiting)), 
                this.layoutModalWaitPane(), this.addChild(this._modalWaitPane));
            }
        }, {
            key: "layoutModalWaitPane",
            value: function() {
                if (this._contentArea) {
                    var t = this._frame.localToGlobal();
                    t = this.globalToLocal(t.x, t.y, t), this._modalWaitPane.setXY(t.x + this._contentArea.x, t.y + this._contentArea.y), 
                    this._modalWaitPane.setSize(this._contentArea.width, this._contentArea.height);
                } else this._modalWaitPane.setSize(this.width, this.height);
            }
        }, {
            key: "closeModalWait",
            value: function(t) {
                return (null == t || this._requestingCmd == t) && (this._requestingCmd = 0, this._modalWaitPane && null != this._modalWaitPane.parent && this.removeChild(this._modalWaitPane), 
                !0);
            }
        }, {
            key: "init",
            value: function() {
                if (!this._inited && !this._loading) if (this._uiSources.length > 0) {
                    this._loading = !1;
                    for (var t = this._uiSources.length, e = 0; e < t; e++) {
                        var i = this._uiSources[e];
                        i.loaded || (i.load(this.__uiLoadComplete, this), this._loading = !0);
                    }
                    this._loading || this._init();
                } else this._init();
            }
        }, {
            key: "onInit",
            value: function() {}
        }, {
            key: "onShown",
            value: function() {}
        }, {
            key: "onHide",
            value: function() {}
        }, {
            key: "doShowAnimation",
            value: function() {
                this.onShown();
            }
        }, {
            key: "doHideAnimation",
            value: function() {
                this.hideImmediately();
            }
        }, {
            key: "__uiLoadComplete",
            value: function() {
                for (var t = this._uiSources.length, e = 0; e < t; e++) if (!this._uiSources[e].loaded) return;
                this._loading = !1, this._init();
            }
        }, {
            key: "_init",
            value: function() {
                this._inited = !0, this.onInit(), this.isShowing && this.doShowAnimation();
            }
        }, {
            key: "dispose",
            value: function() {
                this.parent && this.hideImmediately(), (0, agetget.default)((0, getPrototypeOf.default)(a.prototype), "dispose", this).call(this);
            }
        }, {
            key: "closeEventHandler",
            value: function() {
                this.hide();
            }
        }, {
            key: "__onShown",
            value: function() {
                this._inited ? this.doShowAnimation() : this.init();
            }
        }, {
            key: "__onHidden",
            value: function() {
                this.closeModalWait(), this.onHide();
            }
        }, {
            key: "__mouseDown",
            value: function() {
                this.isShowing && this.bringToFontOnClick && this.bringToFront();
            }
        }, {
            key: "__dragStart",
            value: function(e) {
                t.GObject.cast(e.currentTarget).stopDrag(), this.startDrag();
            }
        }, {
            key: "contentPane",
            set: function(e) {
                this._contentPane != e && (this._contentPane && this.removeChild(this._contentPane), 
                this._contentPane = e, this._contentPane && (this.addChild(this._contentPane), this.setSize(this._contentPane.width, this._contentPane.height), 
                this._contentPane.addRelation(this, t.RelationType.Size), this._frame = this._contentPane.getChild("frame"), 
                this._frame && (this.closeButton = this._frame.getChild("closeButton"), this.dragArea = this._frame.getChild("dragArea"), 
                this.contentArea = this._frame.getChild("contentArea"))));
            },
            get: function() {
                return this._contentPane;
            }
        }, {
            key: "frame",
            get: function() {
                return this._frame;
            }
        }, {
            key: "closeButton",
            get: function() {
                return this._closeButton;
            },
            set: function(t) {
                this._closeButton && this._closeButton.offClick(this, this.closeEventHandler), this._closeButton = t, 
                this._closeButton && this._closeButton.onClick(this, this.closeEventHandler);
            }
        }, {
            key: "dragArea",
            get: function() {
                return this._dragArea;
            },
            set: function(e) {
                this._dragArea != e && (this._dragArea && (this._dragArea.draggable = !1, this._dragArea.off(t.Events.DRAG_START, this, this.__dragStart)), 
                this._dragArea = e, this._dragArea && (this._dragArea instanceof t.GGraph && this._dragArea.asGraph.drawRect(0, null, null), 
                this._dragArea.draggable = !0, this._dragArea.on(t.Events.DRAG_START, this, this.__dragStart)));
            }
        }, {
            key: "contentArea",
            get: function() {
                return this._contentArea;
            },
            set: function(t) {
                this._contentArea = t;
            }
        }, {
            key: "isShowing",
            get: function() {
                return null != this.parent;
            }
        }, {
            key: "isTop",
            get: function() {
                return null != this.parent && this.parent.getChildIndex(this) == this.parent.numChildren - 1;
            }
        }, {
            key: "modal",
            get: function() {
                return this._modal;
            },
            set: function(t) {
                this._modal = t;
            }
        }, {
            key: "modalWaiting",
            get: function() {
                return this._modalWaitPane && null != this._modalWaitPane.parent;
            }
        } ]), a;
    }(t.GComponent), t.ControllerAction = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, l.default)(e, [ {
            key: "run",
            value: function(t, e, i) {
                null != this.fromPage && 0 != this.fromPage.length && -1 == this.fromPage.indexOf(e) || null != this.toPage && 0 != this.toPage.length && -1 == this.toPage.indexOf(i) ? this.leave(t) : this.enter(t);
            }
        }, {
            key: "enter",
            value: function(t) {}
        }, {
            key: "leave",
            value: function(t) {}
        }, {
            key: "setup",
            value: function(t) {
                var e, i;
                for (e = t.getInt16(), this.fromPage = [], i = 0; i < e; i++) this.fromPage[i] = t.readS();
                for (e = t.getInt16(), this.toPage = [], i = 0; i < e; i++) this.toPage[i] = t.readS();
            }
        } ], [ {
            key: "createAction",
            value: function(e) {
                switch (e) {
                  case 0:
                    return new t.PlayTransitionAction();

                  case 1:
                    return new t.ChangePageAction();
                }
                return null;
            }
        } ]), e;
    }(), t.ChangePageAction = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i() {
            return (0, classCallCheck.default)(this, i), e.call(this);
        }
        return (0, l.default)(i, [ {
            key: "enter",
            value: function(t) {
                var e;
                if (this.controllerName && (e = this.objectId ? t.parent.getChildById(this.objectId) : t.parent)) {
                    var i = e.getController(this.controllerName);
                    i && i != t && !i.changing && ("~1" == this.targetPage ? t.selectedIndex < i.pageCount && (i.selectedIndex = t.selectedIndex) : "~2" == this.targetPage ? i.selectedPage = t.selectedPage : i.selectedPageId = this.targetPage);
                }
            }
        }, {
            key: "setup",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(i.prototype), "setup", this).call(this, t), this.objectId = t.readS(), 
                this.controllerName = t.readS(), this.targetPage = t.readS();
            }
        } ]), i;
    }(t.ControllerAction), t.PlayTransitionAction = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i() {
            return (0, classCallCheck.default)(this, i), e.call(this);
        }
        return (0, l.default)(i, [ {
            key: "enter",
            value: function(t) {
                var e = t.parent.getTransition(this.transitionName);
                e && (this._currentTransition && this._currentTransition.playing ? e.changePlayTimes(this.playTimes) : e.play(null, this.playTimes, this.delay), 
                this._currentTransition = e);
            }
        }, {
            key: "leave",
            value: function(t) {
                this.stopOnExit && this._currentTransition && (this._currentTransition.stop(), this._currentTransition = null);
            }
        }, {
            key: "setup",
            value: function(t) {
                (0, agetget.default)((0, getPrototypeOf.default)(i.prototype), "setup", this).call(this, t), this.transitionName = t.readS(), 
                this.playTimes = t.getInt32(), this.delay = t.getFloat32(), this.stopOnExit = t.readBool();
            }
        } ]), i;
    }(t.ControllerAction), t.BitmapFont = function() {
        return function t() {
            (0, classCallCheck.default)(this, t), this.size = 0, this.glyphs = {};
        };
    }(), t.fillImage = function(e, i, s, n, a, o) {
        if (o <= 0) return null;
        if (o >= .9999) return [ 0, 0, e, 0, e, i, 0, i ];
        var h;
        switch (s) {
          case t.FillMethod.Horizontal:
            h = function(e, i, s, n) {
                var a = e * n;
                return s == t.FillOrigin.Left || s == t.FillOrigin.Top ? [ 0, 0, a, 0, a, i, 0, i ] : [ e, 0, e, i, e - a, i, e - a, 0 ];
            }(e, i, n, o);
            break;

          case t.FillMethod.Vertical:
            h = function(e, i, s, n) {
                var a = i * n;
                return s == t.FillOrigin.Left || s == t.FillOrigin.Top ? [ 0, 0, 0, a, e, a, e, 0 ] : [ 0, i, e, i, e, i - a, 0, i - a ];
            }(e, i, n, o);
            break;

          case t.FillMethod.Radial90:
            h = it(e, i, n, a, o);
            break;

          case t.FillMethod.Radial180:
            h = nt(e, i, n, a, o);
            break;

          case t.FillMethod.Radial360:
            h = function(e, i, s, n, a) {
                var o;
                switch (s) {
                  case t.FillOrigin.Top:
                    a <= .5 ? (a /= .5, o = nt(e / 2, i, n ? t.FillOrigin.Left : t.FillOrigin.Right, n, a), 
                    n && st(o, e / 2, 0)) : (a = (a - .5) / .5, o = nt(e / 2, i, n ? t.FillOrigin.Right : t.FillOrigin.Left, n, a), 
                    n ? o.push(e, i, e, 0, e / 2, 0) : (st(o, e / 2, 0), o.push(0, i, 0, 0, e / 2, 0)));
                    break;

                  case t.FillOrigin.Bottom:
                    a <= .5 ? (a /= .5, o = nt(e / 2, i, n ? t.FillOrigin.Right : t.FillOrigin.Left, n, a), 
                    n || st(o, e / 2, 0)) : (a = (a - .5) / .5, o = nt(e / 2, i, n ? t.FillOrigin.Left : t.FillOrigin.Right, n, a), 
                    n ? (st(o, e / 2, 0), o.push(0, 0, 0, i, e / 2, i)) : o.push(e, 0, e, i, e / 2, i));
                    break;

                  case t.FillOrigin.Left:
                    a <= .5 ? (a /= .5, o = nt(e, i / 2, n ? t.FillOrigin.Bottom : t.FillOrigin.Top, n, a), 
                    n || st(o, 0, i / 2)) : (a = (a - .5) / .5, o = nt(e, i / 2, n ? t.FillOrigin.Top : t.FillOrigin.Bottom, n, a), 
                    n ? (st(o, 0, i / 2), o.push(e, 0, 0, 0, 0, i / 2)) : o.push(e, i, 0, i, 0, i / 2));
                    break;

                  case t.FillOrigin.Right:
                    a <= .5 ? (a /= .5, o = nt(e, i / 2, n ? t.FillOrigin.Top : t.FillOrigin.Bottom, n, a), 
                    n && st(o, 0, i / 2)) : (a = (a - .5) / .5, o = nt(e, i / 2, n ? t.FillOrigin.Bottom : t.FillOrigin.Top, n, a), 
                    n ? o.push(0, i, e, i, e, i / 2) : (st(o, 0, i / 2), o.push(0, 0, e, 0, e, i / 2)));
                }
                return o;
            }(e, i, n, a, o);
        }
        return h;
    }, t.Image = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = i.call(this))._tileGridIndice = 0, t._needRebuild = 0, 
            t._fillMethod = 0, t._fillOrigin = 0, t._fillAmount = 0, t.mouseEnabled = !1, t._color = "#FFFFFF", 
            t;
        }
        return (0, l.default)(s, [ {
            key: "markChanged",
            value: function(t) {
                this._needRebuild ? this._needRebuild |= t : (this._needRebuild = t, Laya.timer.callLater(this, this.rebuild));
            }
        }, {
            key: "rebuild",
            value: function() {
                0 != (1 & this._needRebuild) && this.doDraw(), 0 != (2 & this._needRebuild) && 0 != this._fillMethod && this.doFill(), 
                this._needRebuild = 0;
            }
        }, {
            key: "doDraw",
            value: function() {
                var t = this._width, e = this._height, i = this.graphics, s = this._source;
                if (i.clear(), null != s && 0 != t && 0 != e) if (this._scaleByTile) i.fillTexture(s, 0, 0, t, e); else if (this._scale9Grid) {
                    if (!this._sizeGrid) {
                        var n = s.width, a = s.height, o = this._scale9Grid.x, h = Math.max(n - this._scale9Grid.right, 0), r = this._scale9Grid.y, l = Math.max(a - this._scale9Grid.bottom, 0);
                        this._sizeGrid = [ r, h, l, o, this._tileGridIndice ];
                    }
                    i.draw9Grid(s, 0, 0, t, e, this._sizeGrid);
                } else i.drawImage(s, 0, 0, t, e);
            }
        }, {
            key: "doFill",
            value: function() {
                var e = this._width, i = this._height, s = this._mask.graphics;
                if (s.clear(), 0 != e && 0 != i) {
                    var n = t.fillImage(e, i, this._fillMethod, this._fillOrigin, this._fillClockwise, this._fillAmount);
                    if (null == n) return this.mask = null, void (this.mask = this._mask);
                    s.drawPoly(0, 0, n, "#FFFFFF");
                }
            }
        }, {
            key: "width",
            set: function(t) {
                this._width !== t && ((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "set_width", this).call(this, t), 
                this.markChanged(1));
            }
        }, {
            key: "height",
            set: function(t) {
                this._height !== t && ((0, agetget.default)((0, getPrototypeOf.default)(s.prototype), "set_height", this).call(this, t), 
                this.markChanged(1));
            }
        }, {
            key: "texture",
            get: function() {
                return this._source;
            },
            set: function(t) {
                this._source != t && (this._source = t, 0 == this._width && (this._source ? this.size(this._source.width, this._source.height) : this.size(0, 0)), 
                this.repaint(), this.markChanged(1));
            }
        }, {
            key: "scale9Grid",
            get: function() {
                return this._scale9Grid;
            },
            set: function(t) {
                this._scale9Grid = t, this._sizeGrid = null, this.markChanged(1);
            }
        }, {
            key: "scaleByTile",
            get: function() {
                return this._scaleByTile;
            },
            set: function(t) {
                this._scaleByTile != t && (this._scaleByTile = t, this.markChanged(1));
            }
        }, {
            key: "tileGridIndice",
            get: function() {
                return this._tileGridIndice;
            },
            set: function(t) {
                this._tileGridIndice != t && (this._tileGridIndice = t, this.markChanged(1));
            }
        }, {
            key: "fillMethod",
            get: function() {
                return this._fillMethod;
            },
            set: function(t) {
                this._fillMethod != t && (this._fillMethod = t, 0 != this._fillMethod ? (this._mask || (this._mask = new Laya.Sprite(), 
                this._mask.mouseEnabled = !1), this.mask = this._mask, this.markChanged(2)) : this.mask && (this._mask.graphics.clear(), 
                this.mask = null));
            }
        }, {
            key: "fillOrigin",
            get: function() {
                return this._fillOrigin;
            },
            set: function(t) {
                this._fillOrigin != t && (this._fillOrigin = t, 0 != this._fillMethod && this.markChanged(2));
            }
        }, {
            key: "fillClockwise",
            get: function() {
                return this._fillClockwise;
            },
            set: function(t) {
                this._fillClockwise != t && (this._fillClockwise = t, 0 != this._fillMethod && this.markChanged(2));
            }
        }, {
            key: "fillAmount",
            get: function() {
                return this._fillAmount;
            },
            set: function(t) {
                this._fillAmount != t && (this._fillAmount = t, 0 != this._fillMethod && this.markChanged(2));
            }
        }, {
            key: "color",
            get: function() {
                return this._color;
            },
            set: function(e) {
                this._color != e && (this._color = e, t.ToolSet.setColorFilter(this, e));
            }
        } ]), s;
    }(Laya.Sprite), t.MovieClip = function(t) {
        (0, h.default)(s, t);
        var e = u(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = e.call(this)).interval = 0, t.repeatDelay = 0, 
            t.timeScale = 1, t._playing = !0, t._frameCount = 0, t._frame = 0, t._start = 0, 
            t._end = 0, t._times = 0, t._endAt = 0, t._status = 0, t._frameElapsed = 0, t._repeatedCount = 0, 
            t.mouseEnabled = !1, t.setPlaySettings(), t.on(Laya.Event.DISPLAY, (0, assertThisInitialized.default)(t), t.__addToStage), 
            t.on(Laya.Event.UNDISPLAY, (0, assertThisInitialized.default)(t), t.__removeFromStage), t;
        }
        return (0, l.default)(s, [ {
            key: "rewind",
            value: function() {
                this._frame = 0, this._frameElapsed = 0, this._reversed = !1, this._repeatedCount = 0, 
                this.drawFrame();
            }
        }, {
            key: "syncStatus",
            value: function(t) {
                this._frame = t._frame, this._frameElapsed = t._frameElapsed, this._reversed = t._reversed, 
                this._repeatedCount = t._repeatedCount, this.drawFrame();
            }
        }, {
            key: "advance",
            value: function(t) {
                for (var e = this._frame, i = this._reversed, s = t; ;) {
                    var n = this.interval + this._frames[this._frame].addDelay;
                    if (0 == this._frame && this._repeatedCount > 0 && (n += this.repeatDelay), t < n) {
                        this._frameElapsed = 0;
                        break;
                    }
                    if (t -= n, this.swing ? this._reversed ? (this._frame--, this._frame <= 0 && (this._frame = 0, 
                    this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = Math.max(0, this._frameCount - 2), 
                    this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = 0, 
                    this._repeatedCount++)), this._frame == e && this._reversed == i) {
                        var a = s - t;
                        t -= Math.floor(t / a) * a;
                    }
                }
                this.drawFrame();
            }
        }, {
            key: "setPlaySettings",
            value: function(t, e, i, s, n) {
                null == t && (t = 0), null == e && (e = -1), null == i && (i = 0), null == s && (s = -1), 
                this._start = t, this._end = e, (-1 == this._end || this._end > this._frameCount - 1) && (this._end = this._frameCount - 1), 
                this._times = i, this._endAt = s, -1 == this._endAt && (this._endAt = this._end), 
                this._status = 0, this._endHandler = n, this.frame = t;
            }
        }, {
            key: "update",
            value: function() {
                if (this._playing && 0 != this._frameCount && 3 != this._status) {
                    var t = Laya.timer.delta;
                    t > 100 && (t = 100), 1 != this.timeScale && (t *= this.timeScale), this._frameElapsed += t;
                    var e = this.interval + this._frames[this._frame].addDelay;
                    if (0 == this._frame && this._repeatedCount > 0 && (e += this.repeatDelay), !(this._frameElapsed < e)) {
                        if (this._frameElapsed -= e, this._frameElapsed > this.interval && (this._frameElapsed = this.interval), 
                        this.swing ? this._reversed ? (this._frame--, this._frame <= 0 && (this._frame = 0, 
                        this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = Math.max(0, this._frameCount - 2), 
                        this._repeatedCount++, this._reversed = !this._reversed)) : (this._frame++, this._frame > this._frameCount - 1 && (this._frame = 0, 
                        this._repeatedCount++)), 1 == this._status) this._frame = this._start, this._frameElapsed = 0, 
                        this._status = 0; else if (2 == this._status) {
                            if (this._frame = this._endAt, this._frameElapsed = 0, this._status = 3, this._endHandler) {
                                var i = this._endHandler;
                                this._endHandler = null, i.run();
                            }
                        } else this._frame == this._end && (this._times > 0 ? (this._times--, 0 == this._times ? this._status = 2 : this._status = 1) : this._status = 1);
                        this.drawFrame();
                    }
                }
            }
        }, {
            key: "drawFrame",
            value: function() {
                if (this._frameCount > 0 && this._frame < this._frames.length) {
                    var t = this._frames[this._frame];
                    this.texture = t.texture;
                } else this.texture = null;
                this.rebuild();
            }
        }, {
            key: "checkTimer",
            value: function() {
                this._playing && this._frameCount > 0 && null != this.stage ? Laya.timer.frameLoop(1, this, this.update) : Laya.timer.clear(this, this.update);
            }
        }, {
            key: "__addToStage",
            value: function() {
                this._playing && this._frameCount > 0 && Laya.timer.frameLoop(1, this, this.update);
            }
        }, {
            key: "__removeFromStage",
            value: function() {
                Laya.timer.clear(this, this.update);
            }
        }, {
            key: "frames",
            get: function() {
                return this._frames;
            },
            set: function(t) {
                this._frames = t, this._scaleByTile = !1, this._scale9Grid = null, this._frames ? (this._frameCount = this._frames.length, 
                (-1 == this._end || this._end > this._frameCount - 1) && (this._end = this._frameCount - 1), 
                (-1 == this._endAt || this._endAt > this._frameCount - 1) && (this._endAt = this._frameCount - 1), 
                (this._frame < 0 || this._frame > this._frameCount - 1) && (this._frame = this._frameCount - 1), 
                this._frameElapsed = 0, this._repeatedCount = 0, this._reversed = !1) : this._frameCount = 0, 
                this.drawFrame(), this.checkTimer();
            }
        }, {
            key: "frameCount",
            get: function() {
                return this._frameCount;
            }
        }, {
            key: "frame",
            get: function() {
                return this._frame;
            },
            set: function(t) {
                this._frame != t && (this._frames && t >= this._frameCount && (t = this._frameCount - 1), 
                this._frame = t, this._frameElapsed = 0, this.drawFrame());
            }
        }, {
            key: "playing",
            get: function() {
                return this._playing;
            },
            set: function(t) {
                this._playing != t && (this._playing = t, this.checkTimer());
            }
        } ]), s;
    }(t.Image), t.GearBase = function() {
        function e(t) {
            (0, classCallCheck.default)(this, e), this._owner = t;
        }
        return (0, l.default)(e, [ {
            key: "dispose",
            value: function() {
                this._tweenConfig && this._tweenConfig._tweener && (this._tweenConfig._tweener.kill(), 
                this._tweenConfig._tweener = null);
            }
        }, {
            key: "setup",
            value: function(e) {
                var i, s;
                this._controller = this._owner.parent.getControllerAt(e.getInt16()), this.init();
                var n = e.getInt16();
                if (this instanceof t.GearDisplay) this.pages = e.readSArray(n); else if (this instanceof t.GearDisplay2) this.pages = e.readSArray(n); else {
                    for (i = 0; i < n; i++) null != (s = e.readS()) && this.addStatus(s, e);
                    e.readBool() && this.addStatus(null, e);
                }
                if (e.readBool() && (this._tweenConfig = new at(), this._tweenConfig.easeType = e.readByte(), 
                this._tweenConfig.duration = e.getFloat32(), this._tweenConfig.delay = e.getFloat32()), 
                e.version >= 2) if (this instanceof t.GearXY) {
                    if (e.readBool()) {
                        for (this.positionsInPercent = !0, i = 0; i < n; i++) null != (s = e.readS()) && this.addExtStatus(s, e);
                        e.readBool() && this.addExtStatus(null, e);
                    }
                } else this instanceof t.GearDisplay2 && (this.condition = e.readByte());
            }
        }, {
            key: "updateFromRelations",
            value: function(t, e) {}
        }, {
            key: "addStatus",
            value: function(t, e) {}
        }, {
            key: "init",
            value: function() {}
        }, {
            key: "apply",
            value: function() {}
        }, {
            key: "updateState",
            value: function() {}
        }, {
            key: "controller",
            get: function() {
                return this._controller;
            },
            set: function(t) {
                t != this._controller && (this._controller = t, this._controller && this.init());
            }
        }, {
            key: "tweenConfig",
            get: function() {
                return this._tweenConfig || (this._tweenConfig = new at()), this._tweenConfig;
            }
        } ], [ {
            key: "create",
            value: function(e, i) {
                return tt || (tt = [ t.GearDisplay, t.GearXY, t.GearSize, t.GearLook, t.GearColor, t.GearAnimation, t.GearText, t.GearIcon, t.GearDisplay2, t.GearFontSize ]), 
                new tt[i](e);
            }
        } ]), e;
    }();
    var at = function e() {
        (0, classCallCheck.default)(this, e), this.tween = !0, this.easeType = t.EaseType.QuadOut, this.duration = .3, 
        this.delay = 0;
    };
    t.GearTweenConfig = at, t.GearAnimation = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            return (0, classCallCheck.default)(this, s), i.call(this, t);
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = {
                    playing: this._owner.getProp(t.ObjectPropID.Playing),
                    frame: this._owner.getProp(t.ObjectPropID.Frame)
                }, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                var i;
                null == t ? i = this._default : this._storage[t] = i = {}, i.playing = e.readBool(), 
                i.frame = e.getInt32();
            }
        }, {
            key: "apply",
            value: function() {
                this._owner._gearLocked = !0;
                var e = this._storage[this._controller.selectedPageId];
                e || (e = this._default), this._owner.setProp(t.ObjectPropID.Playing, e.playing), 
                this._owner.setProp(t.ObjectPropID.Frame, e.frame), this._owner._gearLocked = !1;
            }
        }, {
            key: "updateState",
            value: function() {
                var e = this._storage[this._controller.selectedPageId];
                e || (this._storage[this._controller.selectedPageId] = e = {}), e.playing = this._owner.getProp(t.ObjectPropID.Playing), 
                e.frame = this._owner.getProp(t.ObjectPropID.Frame);
            }
        } ]), s;
    }(t.GearBase), t.GearColor = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            return (0, classCallCheck.default)(this, s), i.call(this, t);
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = {
                    color: this._owner.getProp(t.ObjectPropID.Color),
                    strokeColor: this._owner.getProp(t.ObjectPropID.OutlineColor)
                }, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                var i;
                null == t ? i = this._default : this._storage[t] = i = {}, i.color = e.readColorS(), 
                i.strokeColor = e.readColorS();
            }
        }, {
            key: "apply",
            value: function() {
                this._owner._gearLocked = !0;
                var e = this._storage[this._controller.selectedPageId];
                e || (e = this._default), this._owner.setProp(t.ObjectPropID.Color, e.color), this._owner.setProp(t.ObjectPropID.OutlineColor, e.strokeColor), 
                this._owner._gearLocked = !1;
            }
        }, {
            key: "updateState",
            value: function() {
                var e = this._storage[this._controller.selectedPageId];
                e || (this._storage[this._controller.selectedPageId] = e = {}), e.color = this._owner.getProp(t.ObjectPropID.Color), 
                e.strokeColor = this._owner.getProp(t.ObjectPropID.OutlineColor);
            }
        } ]), s;
    }(t.GearBase), t.GearDisplay = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t) {
            var s;
            return (0, classCallCheck.default)(this, i), (s = e.call(this, t))._displayLockToken = 1, s._visible = 0, 
            s;
        }
        return (0, l.default)(i, [ {
            key: "init",
            value: function() {
                this.pages = null;
            }
        }, {
            key: "apply",
            value: function() {
                this._displayLockToken++, 0 == this._displayLockToken && (this._displayLockToken = 1), 
                null == this.pages || 0 == this.pages.length || -1 != this.pages.indexOf(this._controller.selectedPageId) ? this._visible = 1 : this._visible = 0;
            }
        }, {
            key: "addLock",
            value: function() {
                return this._visible++, this._displayLockToken;
            }
        }, {
            key: "releaseLock",
            value: function(t) {
                t == this._displayLockToken && this._visible--;
            }
        }, {
            key: "connected",
            get: function() {
                return null == this._controller || this._visible > 0;
            }
        } ]), i;
    }(t.GearBase), t.GearDisplay2 = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t) {
            var s;
            return (0, classCallCheck.default)(this, i), (s = e.call(this, t))._visible = 0, s;
        }
        return (0, l.default)(i, [ {
            key: "init",
            value: function() {
                this.pages = null;
            }
        }, {
            key: "apply",
            value: function() {
                null == this.pages || 0 == this.pages.length || -1 != this.pages.indexOf(this._controller.selectedPageId) ? this._visible = 1 : this._visible = 0;
            }
        }, {
            key: "evaluate",
            value: function(t) {
                var e = null == this._controller || this._visible > 0;
                return 0 == this.condition ? e && t : e || t;
            }
        } ]), i;
    }(t.GearBase), t.GearFontSize = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            var e;
            return (0, classCallCheck.default)(this, s), (e = i.call(this, t))._default = 0, e;
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = this._owner.getProp(t.ObjectPropID.FontSize), this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                null == t ? this._default = e.getInt32() : this._storage[t] = e.getInt32();
            }
        }, {
            key: "apply",
            value: function() {
                this._owner._gearLocked = !0;
                var e = this._storage[this._controller.selectedPageId];
                null != e ? this._owner.setProp(t.ObjectPropID.FontSize, e) : this._owner.setProp(t.ObjectPropID.FontSize, this._default), 
                this._owner._gearLocked = !1;
            }
        }, {
            key: "updateState",
            value: function() {
                this._storage[this._controller.selectedPageId] = this._owner.getProp(t.ObjectPropID.FontSize);
            }
        } ]), s;
    }(t.GearBase), t.GearIcon = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t) {
            return (0, classCallCheck.default)(this, i), e.call(this, t);
        }
        return (0, l.default)(i, [ {
            key: "init",
            value: function() {
                this._default = this._owner.icon, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                null == t ? this._default = e.readS() : this._storage[t] = e.readS();
            }
        }, {
            key: "apply",
            value: function() {
                this._owner._gearLocked = !0;
                var t = this._storage[this._controller.selectedPageId];
                this._owner.icon = void 0 !== t ? t : this._default, this._owner._gearLocked = !1;
            }
        }, {
            key: "updateState",
            value: function() {
                this._storage[this._controller.selectedPageId] = this._owner.icon;
            }
        } ]), i;
    }(t.GearBase), t.GearLook = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            return (0, classCallCheck.default)(this, s), i.call(this, t);
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = {
                    alpha: this._owner.alpha,
                    rotation: this._owner.rotation,
                    grayed: this._owner.grayed,
                    touchable: this._owner.touchable
                }, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                var i;
                null == t ? i = this._default : this._storage[t] = i = {}, i.alpha = e.getFloat32(), 
                i.rotation = e.getFloat32(), i.grayed = e.readBool(), i.touchable = e.readBool();
            }
        }, {
            key: "apply",
            value: function() {
                var e = this._storage[this._controller.selectedPageId];
                if (e || (e = this._default), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
                    if (this._owner._gearLocked = !0, this._owner.grayed = e.grayed, this._owner.touchable = e.touchable, 
                    this._owner._gearLocked = !1, this._tweenConfig._tweener) {
                        if (this._tweenConfig._tweener.endValue.x == e.alpha && this._tweenConfig._tweener.endValue.y == e.rotation) return;
                        this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
                    }
                    var i = e.alpha != this._owner.alpha, s = e.rotation != this._owner.rotation;
                    (i || s) && (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), 
                    this._tweenConfig._tweener = t.GTween.to2(this._owner.alpha, this._owner.rotation, e.alpha, e.rotation, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((i ? 1 : 0) + (s ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
                } else this._owner._gearLocked = !0, this._owner.grayed = e.grayed, this._owner.touchable = e.touchable, 
                this._owner.alpha = e.alpha, this._owner.rotation = e.rotation, this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenUpdate",
            value: function(t) {
                var e = t.userData;
                this._owner._gearLocked = !0, 0 != (1 & e) && (this._owner.alpha = t.value.x), 0 != (2 & e) && (this._owner.rotation = t.value.y), 
                this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenComplete",
            value: function() {
                0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), 
                this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
            }
        }, {
            key: "updateState",
            value: function() {
                var t = this._storage[this._controller.selectedPageId];
                t || (this._storage[this._controller.selectedPageId] = t = {}), t.alpha = this._owner.alpha, 
                t.rotation = this._owner.rotation, t.grayed = this._owner.grayed, t.touchable = this._owner.touchable;
            }
        } ]), s;
    }(t.GearBase), t.GearSize = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            return (0, classCallCheck.default)(this, s), i.call(this, t);
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = {
                    width: this._owner.width,
                    height: this._owner.height,
                    scaleX: this._owner.scaleX,
                    scaleY: this._owner.scaleY
                }, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                var i;
                null == t ? i = this._default : this._storage[t] = i = {}, i.width = e.getInt32(), 
                i.height = e.getInt32(), i.scaleX = e.getFloat32(), i.scaleY = e.getFloat32();
            }
        }, {
            key: "apply",
            value: function() {
                var e = this._storage[this._controller.selectedPageId];
                if (e || (e = this._default), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
                    if (this._tweenConfig._tweener) {
                        if (this._tweenConfig._tweener.endValue.x == e.width && this._tweenConfig._tweener.endValue.y == e.height && this._tweenConfig._tweener.endValue.z == e.scaleX && this._tweenConfig._tweener.endValue.w == e.scaleY) return;
                        this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
                    }
                    var i = e.width != this._owner.width || e.height != this._owner.height, s = e.scaleX != this._owner.scaleX || e.scaleY != this._owner.scaleY;
                    (i || s) && (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), 
                    this._tweenConfig._tweener = t.GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, e.width, e.height, e.scaleX, e.scaleY, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setUserData((i ? 1 : 0) + (s ? 2 : 0)).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
                } else this._owner._gearLocked = !0, this._owner.setSize(e.width, e.height, this._owner.getGear(1).controller == this._controller), 
                this._owner.setScale(e.scaleX, e.scaleY), this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenUpdate",
            value: function(t) {
                var e = t.userData;
                this._owner._gearLocked = !0, 0 != (1 & e) && this._owner.setSize(t.value.x, t.value.y, this._owner.checkGearController(1, this._controller)), 
                0 != (2 & e) && this._owner.setScale(t.value.z, t.value.w), this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenComplete",
            value: function() {
                0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), 
                this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
            }
        }, {
            key: "updateState",
            value: function() {
                var t = this._storage[this._controller.selectedPageId];
                t || (this._storage[this._controller.selectedPageId] = t = {}), t.width = this._owner.width, 
                t.height = this._owner.height, t.scaleX = this._owner.scaleX, t.scaleY = this._owner.scaleY;
            }
        }, {
            key: "updateFromRelations",
            value: function(t, e) {
                if (null != this._controller && null != this._storage) {
                    for (var i in this._storage) {
                        var s = this._storage[i];
                        s.width += t, s.height += e;
                    }
                    this._default.width += t, this._default.height += e, this.updateState();
                }
            }
        } ]), s;
    }(t.GearBase), t.GearText = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t) {
            return (0, classCallCheck.default)(this, i), e.call(this, t);
        }
        return (0, l.default)(i, [ {
            key: "init",
            value: function() {
                this._default = this._owner.text, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                null == t ? this._default = e.readS() : this._storage[t] = e.readS();
            }
        }, {
            key: "apply",
            value: function() {
                this._owner._gearLocked = !0;
                var t = this._storage[this._controller.selectedPageId];
                this._owner.text = void 0 !== t ? t : this._default, this._owner._gearLocked = !1;
            }
        }, {
            key: "updateState",
            value: function() {
                this._storage[this._controller.selectedPageId] = this._owner.text;
            }
        } ]), i;
    }(t.GearBase), t.GearXY = function(e) {
        (0, h.default)(s, e);
        var i = u(s);
        function s(t) {
            return (0, classCallCheck.default)(this, s), i.call(this, t);
        }
        return (0, l.default)(s, [ {
            key: "init",
            value: function() {
                this._default = {
                    x: this._owner.x,
                    y: this._owner.y,
                    px: this._owner.x / this._owner.parent.width,
                    py: this._owner.y / this._owner.parent.height
                }, this._storage = {};
            }
        }, {
            key: "addStatus",
            value: function(t, e) {
                var i;
                null == t ? i = this._default : this._storage[t] = i = {}, i.x = e.getInt32(), i.y = e.getInt32();
            }
        }, {
            key: "addExtStatus",
            value: function(t, e) {
                var i;
                (i = null == t ? this._default : this._storage[t]).px = e.getFloat32(), i.py = e.getFloat32();
            }
        }, {
            key: "apply",
            value: function() {
                var e, i, s = this._storage[this._controller.selectedPageId];
                if (s || (s = this._default), this.positionsInPercent && this._owner.parent ? (e = s.px * this._owner.parent.width, 
                i = s.py * this._owner.parent.height) : (e = s.x, i = s.y), this._tweenConfig && this._tweenConfig.tween && !t.UIPackage._constructing && !t.GearBase.disableAllTweenEffect) {
                    if (this._tweenConfig._tweener) {
                        if (this._tweenConfig._tweener.endValue.x == e && this._tweenConfig._tweener.endValue.y == i) return;
                        this._tweenConfig._tweener.kill(!0), this._tweenConfig._tweener = null;
                    }
                    var n = this._owner.x, a = this._owner.y;
                    n == e && a == i || (this._owner.checkGearController(0, this._controller) && (this._tweenConfig._displayLockToken = this._owner.addDisplayLock()), 
                    this._tweenConfig._tweener = t.GTween.to2(n, a, e, i, this._tweenConfig.duration).setDelay(this._tweenConfig.delay).setEase(this._tweenConfig.easeType).setTarget(this).onUpdate(this.__tweenUpdate, this).onComplete(this.__tweenComplete, this));
                } else this._owner._gearLocked = !0, this._owner.setXY(e, i), this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenUpdate",
            value: function(t) {
                this._owner._gearLocked = !0, this._owner.setXY(t.value.x, t.value.y), this._owner._gearLocked = !1;
            }
        }, {
            key: "__tweenComplete",
            value: function() {
                0 != this._tweenConfig._displayLockToken && (this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken), 
                this._tweenConfig._displayLockToken = 0), this._tweenConfig._tweener = null;
            }
        }, {
            key: "updateState",
            value: function() {
                var t = this._storage[this._controller.selectedPageId];
                t || (this._storage[this._controller.selectedPageId] = t = {}), t.x = this._owner.x, 
                t.y = this._owner.y, t.px = this._owner.x / this._owner.parent.width, t.py = this._owner.y / this._owner.parent.height;
            }
        }, {
            key: "updateFromRelations",
            value: function(t, e) {
                if (null != this._controller && null != this._storage && !this.positionsInPercent) {
                    for (var i in this._storage) {
                        var s = this._storage[i];
                        s.x += t, s.y += e;
                    }
                    this._default.x += t, this._default.y += e, this.updateState();
                }
            }
        } ]), s;
    }(t.GearBase);
    var ot = .5 * Math.PI, ht = 2 * Math.PI;
    function rt(t, e) {
        return 1 - lt(e - t, e);
    }
    function lt(t, e) {
        return (t /= e) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }
    t.evaluateEase = function(e, i, s, n, a) {
        switch (e) {
          case t.EaseType.Linear:
            return i / s;

          case t.EaseType.SineIn:
            return 1 - Math.cos(i / s * ot);

          case t.EaseType.SineOut:
            return Math.sin(i / s * ot);

          case t.EaseType.SineInOut:
            return -.5 * (Math.cos(Math.PI * i / s) - 1);

          case t.EaseType.QuadIn:
            return (i /= s) * i;

          case t.EaseType.QuadOut:
            return -(i /= s) * (i - 2);

          case t.EaseType.QuadInOut:
            return (i /= .5 * s) < 1 ? .5 * i * i : -.5 * (--i * (i - 2) - 1);

          case t.EaseType.CubicIn:
            return (i /= s) * i * i;

          case t.EaseType.CubicOut:
            return (i = i / s - 1) * i * i + 1;

          case t.EaseType.CubicInOut:
            return (i /= .5 * s) < 1 ? .5 * i * i * i : .5 * ((i -= 2) * i * i + 2);

          case t.EaseType.QuartIn:
            return (i /= s) * i * i * i;

          case t.EaseType.QuartOut:
            return -((i = i / s - 1) * i * i * i - 1);

          case t.EaseType.QuartInOut:
            return (i /= .5 * s) < 1 ? .5 * i * i * i * i : -.5 * ((i -= 2) * i * i * i - 2);

          case t.EaseType.QuintIn:
            return (i /= s) * i * i * i * i;

          case t.EaseType.QuintOut:
            return (i = i / s - 1) * i * i * i * i + 1;

          case t.EaseType.QuintInOut:
            return (i /= .5 * s) < 1 ? .5 * i * i * i * i * i : .5 * ((i -= 2) * i * i * i * i + 2);

          case t.EaseType.ExpoIn:
            return 0 == i ? 0 : Math.pow(2, 10 * (i / s - 1));

          case t.EaseType.ExpoOut:
            return i == s ? 1 : 1 - Math.pow(2, -10 * i / s);

          case t.EaseType.ExpoInOut:
            return 0 == i ? 0 : i == s ? 1 : (i /= .5 * s) < 1 ? .5 * Math.pow(2, 10 * (i - 1)) : .5 * (2 - Math.pow(2, -10 * --i));

          case t.EaseType.CircIn:
            return -(Math.sqrt(1 - (i /= s) * i) - 1);

          case t.EaseType.CircOut:
            return Math.sqrt(1 - (i = i / s - 1) * i);

          case t.EaseType.CircInOut:
            return (i /= .5 * s) < 1 ? -.5 * (Math.sqrt(1 - i * i) - 1) : .5 * (Math.sqrt(1 - (i -= 2) * i) + 1);

          case t.EaseType.ElasticIn:
            var o;
            return 0 == i ? 0 : 1 == (i /= s) ? 1 : (0 == a && (a = .3 * s), n < 1 ? (n = 1, 
            o = a / 4) : o = a / ht * Math.asin(1 / n), -n * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * s - o) * ht / a));

          case t.EaseType.ElasticOut:
            var h;
            return 0 == i ? 0 : 1 == (i /= s) ? 1 : (0 == a && (a = .3 * s), n < 1 ? (n = 1, 
            h = a / 4) : h = a / ht * Math.asin(1 / n), n * Math.pow(2, -10 * i) * Math.sin((i * s - h) * ht / a) + 1);

          case t.EaseType.ElasticInOut:
            var r;
            return 0 == i ? 0 : 2 == (i /= .5 * s) ? 1 : (0 == a && (a = s * (.3 * 1.5)), n < 1 ? (n = 1, 
            r = a / 4) : r = a / ht * Math.asin(1 / n), i < 1 ? n * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * s - r) * ht / a) * -.5 : n * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * s - r) * ht / a) * .5 + 1);

          case t.EaseType.BackIn:
            return (i /= s) * i * ((n + 1) * i - n);

          case t.EaseType.BackOut:
            return (i = i / s - 1) * i * ((n + 1) * i + n) + 1;

          case t.EaseType.BackInOut:
            return (i /= .5 * s) < 1 ? i * i * ((1 + (n *= 1.525)) * i - n) * .5 : .5 * ((i -= 2) * i * ((1 + (n *= 1.525)) * i + n) + 2);

          case t.EaseType.BounceIn:
            return rt(i, s);

          case t.EaseType.BounceOut:
            return lt(i, s);

          case t.EaseType.BounceInOut:
            return function(t, e) {
                return t < .5 * e ? .5 * rt(2 * t, e) : .5 * lt(2 * t - e, e) + .5;
            }(i, s);

          default:
            return -(i /= s) * (i - 2);
        }
    };
    var ut = function t() {
        (0, classCallCheck.default)(this, t);
    };
    ut.Linear = 0, ut.SineIn = 1, ut.SineOut = 2, ut.SineInOut = 3, ut.QuadIn = 4, ut.QuadOut = 5, 
    ut.QuadInOut = 6, ut.CubicIn = 7, ut.CubicOut = 8, ut.CubicInOut = 9, ut.QuartIn = 10, 
    ut.QuartOut = 11, ut.QuartInOut = 12, ut.QuintIn = 13, ut.QuintOut = 14, ut.QuintInOut = 15, 
    ut.ExpoIn = 16, ut.ExpoOut = 17, ut.ExpoInOut = 18, ut.CircIn = 19, ut.CircOut = 20, 
    ut.CircInOut = 21, ut.ElasticIn = 22, ut.ElasticOut = 23, ut.ElasticInOut = 24, 
    ut.BackIn = 25, ut.BackOut = 26, ut.BackInOut = 27, ut.BounceIn = 28, ut.BounceOut = 29, 
    ut.BounceInOut = 30, ut.Custom = 31, t.EaseType = ut, t.GPath = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._segments = new Array(), this._points = new Array();
        }
        return (0, l.default)(e, [ {
            key: "create",
            value: function(e, i, s, n) {
                var a;
                Array.isArray(e) ? a = e : ((a = new Array()).push(e), a.push(i), s && a.push(s), 
                n && a.push(n)), this._segments.length = 0, this._points.length = 0, this._fullLength = 0;
                var o = a.length;
                if (0 != o) {
                    var h = ct;
                    h.length = 0;
                    var r = a[0];
                    r.curveType == t.CurveType.CRSpline && h.push(new Laya.Point(r.x, r.y));
                    for (var l = 1; l < o; l++) {
                        var u = a[l];
                        if (r.curveType != t.CurveType.CRSpline) {
                            var _ = {};
                            _.type = r.curveType, _.ptStart = this._points.length, r.curveType == t.CurveType.Straight ? (_.ptCount = 2, 
                            this._points.push(new Laya.Point(r.x, r.y)), this._points.push(new Laya.Point(u.x, u.y))) : r.curveType == t.CurveType.Bezier ? (_.ptCount = 3, 
                            this._points.push(new Laya.Point(r.x, r.y)), this._points.push(new Laya.Point(u.x, u.y)), 
                            this._points.push(new Laya.Point(r.control1_x, r.control1_y))) : r.curveType == t.CurveType.CubicBezier && (_.ptCount = 4, 
                            this._points.push(new Laya.Point(r.x, r.y)), this._points.push(new Laya.Point(u.x, u.y)), 
                            this._points.push(new Laya.Point(r.control1_x, r.control1_y)), this._points.push(new Laya.Point(r.control2_x, r.control2_y))), 
                            _.length = t.ToolSet.distance(r.x, r.y, u.x, u.y), this._fullLength += _.length, 
                            this._segments.push(_);
                        }
                        u.curveType != t.CurveType.CRSpline ? h.length > 0 && (h.push(new Laya.Point(u.x, u.y)), 
                        this.createSplineSegment()) : h.push(new Laya.Point(u.x, u.y)), r = u;
                    }
                    h.length > 1 && this.createSplineSegment();
                }
            }
        }, {
            key: "createSplineSegment",
            value: function() {
                var e = ct, i = e.length;
                e.splice(0, 0, e[0]), e.push(e[i]), e.push(e[i]), i += 3;
                var s = {};
                s.type = t.CurveType.CRSpline, s.ptStart = this._points.length, s.ptCount = i, this._points = this._points.concat(e), 
                s.length = 0;
                for (var n = 1; n < i; n++) s.length += t.ToolSet.distance(e[n - 1].x, e[n - 1].y, e[n].x, e[n].y);
                this._fullLength += s.length, this._segments.push(s), e.length = 0;
            }
        }, {
            key: "clear",
            value: function() {
                this._segments.length = 0, this._points.length = 0;
            }
        }, {
            key: "getPointAt",
            value: function(e, i) {
                i ? i.x = i.y = 0 : i = new Laya.Point(), e = t.ToolSet.clamp01(e);
                var s, n = this._segments.length;
                if (0 == n) return i;
                if (1 == e) return (s = this._segments[n - 1]).type == t.CurveType.Straight ? (i.x = t.ToolSet.lerp(this._points[s.ptStart].x, this._points[s.ptStart + 1].x, e), 
                i.y = t.ToolSet.lerp(this._points[s.ptStart].y, this._points[s.ptStart + 1].y, e), 
                i) : s.type == t.CurveType.Bezier || s.type == t.CurveType.CubicBezier ? this.onBezierCurve(s.ptStart, s.ptCount, e, i) : this.onCRSplineCurve(s.ptStart, s.ptCount, e, i);
                for (var a = e * this._fullLength, o = 0; o < n; o++) if ((a -= (s = this._segments[o]).length) < 0) {
                    e = 1 + a / s.length, s.type == t.CurveType.Straight ? (i.x = t.ToolSet.lerp(this._points[s.ptStart].x, this._points[s.ptStart + 1].x, e), 
                    i.y = t.ToolSet.lerp(this._points[s.ptStart].y, this._points[s.ptStart + 1].y, e)) : i = s.type == t.CurveType.Bezier || s.type == t.CurveType.CubicBezier ? this.onBezierCurve(s.ptStart, s.ptCount, e, i) : this.onCRSplineCurve(s.ptStart, s.ptCount, e, i);
                    break;
                }
                return i;
            }
        }, {
            key: "getAnchorsInSegment",
            value: function(t, e) {
                null == e && (e = new Array());
                for (var i = this._segments[t], s = 0; s < i.ptCount; s++) e.push(new Laya.Point(this._points[i.ptStart + s].x, this._points[i.ptStart + s].y));
                return e;
            }
        }, {
            key: "getPointsInSegment",
            value: function(e, i, s, n, a, o) {
                null == n && (n = new Array()), o && !isNaN(o) || (o = .1), a && a.push(i);
                var h = this._segments[e];
                if (h.type == t.CurveType.Straight) n.push(new Laya.Point(t.ToolSet.lerp(this._points[h.ptStart].x, this._points[h.ptStart + 1].x, i), t.ToolSet.lerp(this._points[h.ptStart].y, this._points[h.ptStart + 1].y, i))), 
                n.push(new Laya.Point(t.ToolSet.lerp(this._points[h.ptStart].x, this._points[h.ptStart + 1].x, s), t.ToolSet.lerp(this._points[h.ptStart].y, this._points[h.ptStart + 1].y, s))); else {
                    var r;
                    r = h.type == t.CurveType.Bezier || h.type == t.CurveType.CubicBezier ? this.onBezierCurve : this.onCRSplineCurve, 
                    n.push(r.call(this, h.ptStart, h.ptCount, i, new Laya.Point()));
                    for (var l = Math.min(h.length * o, 50), u = 0; u <= l; u++) {
                        var _ = u / l;
                        _ > i && _ < s && (n.push(r.call(this, h.ptStart, h.ptCount, _, new Laya.Point())), 
                        a && a.push(_));
                    }
                    n.push(r.call(this, h.ptStart, h.ptCount, s, new Laya.Point()));
                }
                return a && a.push(s), n;
            }
        }, {
            key: "getAllPoints",
            value: function(t, e, i) {
                null == t && (t = new Array()), i && !isNaN(i) || (i = .1);
                for (var s = this._segments.length, n = 0; n < s; n++) this.getPointsInSegment(n, 0, 1, t, e, i);
                return t;
            }
        }, {
            key: "onCRSplineCurve",
            value: function(e, i, s, n) {
                var a = Math.floor(s * (i - 4)) + e, o = this._points[a].x, h = this._points[a].y, r = this._points[a + 1].x, l = this._points[a + 1].y, u = this._points[a + 2].x, _ = this._points[a + 2].y, c = this._points[a + 3].x, d = this._points[a + 3].y, g = 1 == s ? 1 : t.ToolSet.repeat(s * (i - 4), 1), f = ((2 - g) * g - 1) * g * .5, p = .5 * ((3 * g - 5) * g * g + 2), y = ((-3 * g + 4) * g + 1) * g * .5, v = (g - 1) * g * g * .5;
                return n.x = o * f + r * p + u * y + c * v, n.y = h * f + l * p + _ * y + d * v, 
                n;
            }
        }, {
            key: "onBezierCurve",
            value: function(t, e, i, s) {
                var n = 1 - i, a = this._points[t].x, o = this._points[t].y, h = this._points[t + 1].x, r = this._points[t + 1].y, l = this._points[t + 2].x, u = this._points[t + 2].y;
                if (4 == e) {
                    var _ = this._points[t + 3].x, c = this._points[t + 3].y;
                    s.x = n * n * n * a + 3 * n * n * i * l + 3 * n * i * i * _ + i * i * i * h, s.y = n * n * n * o + 3 * n * n * i * u + 3 * n * i * i * c + i * i * i * r;
                } else s.x = n * n * a + 2 * n * i * l + i * i * h, s.y = n * n * o + 2 * n * i * u + i * i * r;
                return s;
            }
        }, {
            key: "length",
            get: function() {
                return this._fullLength;
            }
        }, {
            key: "segmentCount",
            get: function() {
                return this._segments.length;
            }
        } ]), e;
    }();
    var _t, ct = new Array();
    !function(t) {
        t[t.CRSpline = 0] = "CRSpline", t[t.Bezier = 1] = "Bezier", t[t.CubicBezier = 2] = "CubicBezier", 
        t[t.Straight = 3] = "Straight";
    }(_t = t.CurveType || (t.CurveType = {}));
    var dt = function() {
        function t() {
            (0, classCallCheck.default)(this, t), this.x = 0, this.y = 0, this.control1_x = 0, this.control1_y = 0, 
            this.control2_x = 0, this.control2_y = 0, this.curveType = 0;
        }
        return (0, l.default)(t, [ {
            key: "clone",
            value: function() {
                var e = new t();
                return e.x = this.x, e.y = this.y, e.control1_x = this.control1_x, e.control1_y = this.control1_y, 
                e.control2_x = this.control2_x, e.control2_y = this.control2_y, e.curveType = this.curveType, 
                e;
            }
        } ], [ {
            key: "newPoint",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = new t();
                return n.x = e, n.y = i, n.control1_x = 0, n.control1_y = 0, n.control2_x = 0, n.control2_y = 0, 
                n.curveType = s, n;
            }
        }, {
            key: "newBezierPoint",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, a = new t();
                return a.x = e, a.y = i, a.control1_x = s, a.control1_y = n, a.control2_x = 0, a.control2_y = 0, 
                a.curveType = _t.Bezier, a;
            }
        }, {
            key: "newCubicBezierPoint",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0, o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0, h = new t();
                return h.x = e, h.y = i, h.control1_x = s, h.control1_y = n, h.control2_x = a, h.control2_y = o, 
                h.curveType = _t.CubicBezier, h;
            }
        } ]), t;
    }();
    t.GPathPoint = dt;
    var gt = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, l.default)(e, null, [ {
            key: "to",
            value: function(e, i, s) {
                return t.TweenManager.createTween()._to(e, i, s);
            }
        }, {
            key: "to2",
            value: function(e, i, s, n, a) {
                return t.TweenManager.createTween()._to2(e, i, s, n, a);
            }
        }, {
            key: "to3",
            value: function(e, i, s, n, a, o, h) {
                return t.TweenManager.createTween()._to3(e, i, s, n, a, o, h);
            }
        }, {
            key: "to4",
            value: function(e, i, s, n, a, o, h, r, l) {
                return t.TweenManager.createTween()._to4(e, i, s, n, a, o, h, r, l);
            }
        }, {
            key: "toColor",
            value: function(e, i, s) {
                return t.TweenManager.createTween()._toColor(e, i, s);
            }
        }, {
            key: "delayedCall",
            value: function(e) {
                return t.TweenManager.createTween().setDelay(e);
            }
        }, {
            key: "shake",
            value: function(e, i, s, n) {
                return t.TweenManager.createTween()._shake(e, i, s, n);
            }
        }, {
            key: "isTweening",
            value: function(e, i) {
                return t.TweenManager.isTweening(e, i);
            }
        }, {
            key: "kill",
            value: function(e, i, s) {
                t.TweenManager.killTweens(e, i, s);
            }
        }, {
            key: "getTween",
            value: function(e, i) {
                return t.TweenManager.getTween(e, i);
            }
        } ]), e;
    }();
    gt.catchCallbackExceptions = !0, t.GTween = gt, t.GTweener = function() {
        function e() {
            (0, classCallCheck.default)(this, e), this._startValue = new t.TweenValue(), this._endValue = new t.TweenValue(), 
            this._value = new t.TweenValue(), this._deltaValue = new t.TweenValue(), this._reset();
        }
        return (0, l.default)(e, [ {
            key: "setDelay",
            value: function(t) {
                return this._delay = t, this;
            }
        }, {
            key: "setDuration",
            value: function(t) {
                return this._duration = t, this;
            }
        }, {
            key: "setBreakpoint",
            value: function(t) {
                return this._breakpoint = t, this;
            }
        }, {
            key: "setEase",
            value: function(t) {
                return this._easeType = t, this;
            }
        }, {
            key: "setEasePeriod",
            value: function(t) {
                return this._easePeriod = t, this;
            }
        }, {
            key: "setEaseOvershootOrAmplitude",
            value: function(t) {
                return this._easeOvershootOrAmplitude = t, this;
            }
        }, {
            key: "setRepeat",
            value: function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return this._repeat = t, this._yoyo = e, this;
            }
        }, {
            key: "setTimeScale",
            value: function(t) {
                return this._timeScale = t, this;
            }
        }, {
            key: "setSnapping",
            value: function(t) {
                return this._snapping = t, this;
            }
        }, {
            key: "setTarget",
            value: function(t, e) {
                return this._target = t, this._propType = e, this;
            }
        }, {
            key: "setPath",
            value: function(t) {
                return this._path = t, this;
            }
        }, {
            key: "setUserData",
            value: function(t) {
                return this._userData = t, this;
            }
        }, {
            key: "onUpdate",
            value: function(t, e) {
                return this._onUpdate = t, this._onUpdateCaller = e, this;
            }
        }, {
            key: "onStart",
            value: function(t, e) {
                return this._onStart = t, this._onStartCaller = e, this;
            }
        }, {
            key: "onComplete",
            value: function(t, e) {
                return this._onComplete = t, this._onCompleteCaller = e, this;
            }
        }, {
            key: "setPaused",
            value: function(t) {
                return this._paused = t, this;
            }
        }, {
            key: "seek",
            value: function(t) {
                if (!this._killed) {
                    if (this._elapsedTime = t, this._elapsedTime < this._delay) {
                        if (!this._started) return;
                        this._elapsedTime = this._delay;
                    }
                    this.update();
                }
            }
        }, {
            key: "kill",
            value: function(t) {
                this._killed || (t && (0 == this._ended && (this._breakpoint >= 0 ? this._elapsedTime = this._delay + this._breakpoint : this._repeat >= 0 ? this._elapsedTime = this._delay + this._duration * (this._repeat + 1) : this._elapsedTime = this._delay + 2 * this._duration, 
                this.update()), this.callCompleteCallback()), this._killed = !0);
            }
        }, {
            key: "_to",
            value: function(t, e, i) {
                return this._valueSize = 1, this._startValue.x = t, this._endValue.x = e, this._value.x = t, 
                this._duration = i, this;
            }
        }, {
            key: "_to2",
            value: function(t, e, i, s, n) {
                return this._valueSize = 2, this._startValue.x = t, this._endValue.x = i, this._startValue.y = e, 
                this._endValue.y = s, this._value.x = t, this._value.y = e, this._duration = n, 
                this;
            }
        }, {
            key: "_to3",
            value: function(t, e, i, s, n, a, o) {
                return this._valueSize = 3, this._startValue.x = t, this._endValue.x = s, this._startValue.y = e, 
                this._endValue.y = n, this._startValue.z = i, this._endValue.z = a, this._value.x = t, 
                this._value.y = e, this._value.z = i, this._duration = o, this;
            }
        }, {
            key: "_to4",
            value: function(t, e, i, s, n, a, o, h, r) {
                return this._valueSize = 4, this._startValue.x = t, this._endValue.x = n, this._startValue.y = e, 
                this._endValue.y = a, this._startValue.z = i, this._endValue.z = o, this._startValue.w = s, 
                this._endValue.w = h, this._value.x = t, this._value.y = e, this._value.z = i, this._value.w = s, 
                this._duration = r, this;
            }
        }, {
            key: "_toColor",
            value: function(t, e, i) {
                return this._valueSize = 5, this._startValue.color = t, this._endValue.color = e, 
                this._value.color = t, this._duration = i, this;
            }
        }, {
            key: "_shake",
            value: function(t, e, i, s) {
                return this._valueSize = 6, this._startValue.x = t, this._startValue.y = e, this._startValue.w = i, 
                this._duration = s, this;
            }
        }, {
            key: "_init",
            value: function() {
                this._delay = 0, this._duration = 0, this._breakpoint = -1, this._easeType = t.EaseType.QuadOut, 
                this._timeScale = 1, this._easePeriod = 0, this._easeOvershootOrAmplitude = 1.70158, 
                this._snapping = !1, this._repeat = 0, this._yoyo = !1, this._valueSize = 0, this._started = !1, 
                this._paused = !1, this._killed = !1, this._elapsedTime = 0, this._normalizedTime = 0, 
                this._ended = 0;
            }
        }, {
            key: "_reset",
            value: function() {
                this._target = null, this._propType = null, this._userData = null, this._path = null, 
                this._onStart = this._onUpdate = this._onComplete = null, this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
            }
        }, {
            key: "_update",
            value: function(t) {
                if (1 != this._timeScale && (t *= this._timeScale), 0 != t) {
                    if (0 != this._ended) return this.callCompleteCallback(), void (this._killed = !0);
                    this._elapsedTime += t, this.update(), 0 != this._ended && (this._killed || (this.callCompleteCallback(), 
                    this._killed = !0));
                }
            }
        }, {
            key: "update",
            value: function() {
                if (this._ended = 0, 0 != this._valueSize) {
                    if (!this._started) {
                        if (this._elapsedTime < this._delay) return;
                        if (this._started = !0, this.callStartCallback(), this._killed) return;
                    }
                    var e = !1, i = this._elapsedTime - this._delay;
                    if (this._breakpoint >= 0 && i >= this._breakpoint && (i = this._breakpoint, this._ended = 2), 
                    0 != this._repeat) {
                        var s = Math.floor(i / this._duration);
                        i -= this._duration * s, this._yoyo && (e = s % 2 == 1), this._repeat > 0 && this._repeat - s < 0 && (this._yoyo && (e = this._repeat % 2 == 1), 
                        i = this._duration, this._ended = 1);
                    } else i >= this._duration && (i = this._duration, this._ended = 1);
                    if (this._normalizedTime = t.evaluateEase(this._easeType, e ? this._duration - i : i, this._duration, this._easeOvershootOrAmplitude, this._easePeriod), 
                    this._value.setZero(), this._deltaValue.setZero(), 6 == this._valueSize) if (0 == this._ended) {
                        var n = this._startValue.w * (1 - this._normalizedTime), a = n * (Math.random() > .5 ? 1 : -1), o = n * (Math.random() > .5 ? 1 : -1);
                        this._deltaValue.x = a, this._deltaValue.y = o, this._value.x = this._startValue.x + a, 
                        this._value.y = this._startValue.y + o;
                    } else this._value.x = this._startValue.x, this._value.y = this._startValue.y; else if (this._path) {
                        var h = M;
                        this._path.getPointAt(this._normalizedTime, h), this._snapping && (h.x = Math.round(h.x), 
                        h.y = Math.round(h.y)), this._deltaValue.x = h.x - this._value.x, this._deltaValue.y = h.y - this._value.y, 
                        this._value.x = h.x, this._value.y = h.y;
                    } else for (var r = 0; r < this._valueSize; r++) {
                        var l = this._startValue.getField(r), u = l + (this._endValue.getField(r) - l) * this._normalizedTime;
                        this._snapping && (u = Math.round(u)), this._deltaValue.setField(r, u - this._value.getField(r)), 
                        this._value.setField(r, u);
                    }
                    if (this._target && this._propType) if (this._propType instanceof Function) switch (this._valueSize) {
                      case 1:
                        this._propType.call(this._target, this._value.x);
                        break;

                      case 2:
                        this._propType.call(this._target, this._value.x, this._value.y);
                        break;

                      case 3:
                        this._propType.call(this._target, this._value.x, this._value.y, this._value.z);
                        break;

                      case 4:
                        this._propType.call(this._target, this._value.x, this._value.y, this._value.z, this._value.w);
                        break;

                      case 5:
                        this._propType.call(this._target, this._value.color);
                        break;

                      case 6:
                        this._propType.call(this._target, this._value.x, this._value.y);
                    } else 5 == this._valueSize ? this._target[this._propType] = this._value.color : this._target[this._propType] = this._value.x;
                    this.callUpdateCallback();
                } else this._elapsedTime >= this._delay + this._duration && (this._ended = 1);
            }
        }, {
            key: "callStartCallback",
            value: function() {
                if (null != this._onStart) try {
                    this._onStart.call(this._onStartCaller, this);
                } catch (t) {
                    console.log("FairyGUI: error in start callback > " + t);
                }
            }
        }, {
            key: "callUpdateCallback",
            value: function() {
                if (null != this._onUpdate) try {
                    this._onUpdate.call(this._onUpdateCaller, this);
                } catch (t) {
                    console.log("FairyGUI: error in update callback > " + t);
                }
            }
        }, {
            key: "callCompleteCallback",
            value: function() {
                if (null != this._onComplete) try {
                    this._onComplete.call(this._onCompleteCaller, this);
                } catch (t) {
                    console.log("FairyGUI: error in complete callback > " + t);
                }
            }
        }, {
            key: "delay",
            get: function() {
                return this._delay;
            }
        }, {
            key: "duration",
            get: function() {
                return this._duration;
            }
        }, {
            key: "repeat",
            get: function() {
                return this._repeat;
            }
        }, {
            key: "target",
            get: function() {
                return this._target;
            }
        }, {
            key: "userData",
            get: function() {
                return this._userData;
            }
        }, {
            key: "startValue",
            get: function() {
                return this._startValue;
            }
        }, {
            key: "endValue",
            get: function() {
                return this._endValue;
            }
        }, {
            key: "value",
            get: function() {
                return this._value;
            }
        }, {
            key: "deltaValue",
            get: function() {
                return this._deltaValue;
            }
        }, {
            key: "normalizedTime",
            get: function() {
                return this._normalizedTime;
            }
        }, {
            key: "completed",
            get: function() {
                return 0 != this._ended;
            }
        }, {
            key: "allCompleted",
            get: function() {
                return 1 == this._ended;
            }
        } ]), e;
    }(), M = new Laya.Point();
    var ft = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, l.default)(e, null, [ {
            key: "createTween",
            value: function() {
                var i;
                return mt || (Laya.timer.frameLoop(1, null, e.update), mt = !0), (i = yt.length > 0 ? yt.pop() : new t.GTweener())._init(), 
                pt[vt++] = i, i;
            }
        }, {
            key: "isTweening",
            value: function(t, e) {
                if (null == t) return !1;
                for (var i = !e, s = 0; s < vt; s++) {
                    var n = pt[s];
                    if (n && n.target == t && !n._killed && (i || n._propType == e)) return !0;
                }
                return !1;
            }
        }, {
            key: "killTweens",
            value: function(t, e, i) {
                if (null == t) return !1;
                for (var s = !1, n = vt, a = !i, o = 0; o < n; o++) {
                    var h = pt[o];
                    !h || h.target != t || h._killed || !a && h._propType != i || (h.kill(e), s = !0);
                }
                return s;
            }
        }, {
            key: "getTween",
            value: function(t, e) {
                if (null == t) return null;
                for (var i = vt, s = !e, n = 0; n < i; n++) {
                    var a = pt[n];
                    if (a && a.target == t && !a._killed && (s || a._propType == e)) return a;
                }
                return null;
            }
        }, {
            key: "update",
            value: function() {
                for (var e = Laya.timer.delta / 1e3, i = vt, s = -1, n = 0; n < i; n++) {
                    var a = pt[n];
                    null == a ? -1 == s && (s = n) : a._killed ? (a._reset(), yt.push(a), pt[n] = null, 
                    -1 == s && (s = n)) : (a._target instanceof t.GObject && a._target.isDisposed ? a._killed = !0 : a._paused || a._update(e), 
                    -1 != s && (pt[s] = a, pt[n] = null, s++));
                }
                if (s >= 0) {
                    if (vt != i) {
                        var o = i;
                        for (i = vt - i, n = 0; n < i; n++) pt[s++] = pt[o++];
                    }
                    vt = s;
                }
            }
        } ]), e;
    }();
    t.TweenManager = ft;
    var pt = [], yt = [], vt = 0, mt = !1;
    t.TweenValue = function() {
        function t() {
            (0, classCallCheck.default)(this, t), this.x = this.y = this.z = this.w = 0;
        }
        return (0, l.default)(t, [ {
            key: "getField",
            value: function(t) {
                switch (t) {
                  case 0:
                    return this.x;

                  case 1:
                    return this.y;

                  case 2:
                    return this.z;

                  case 3:
                    return this.w;

                  default:
                    throw new Error("Index out of bounds: " + t);
                }
            }
        }, {
            key: "setField",
            value: function(t, e) {
                switch (t) {
                  case 0:
                    this.x = e;
                    break;

                  case 1:
                    this.y = e;
                    break;

                  case 2:
                    this.z = e;
                    break;

                  case 3:
                    this.w = e;
                    break;

                  default:
                    throw new Error("Index out of bounds: " + t);
                }
            }
        }, {
            key: "setZero",
            value: function() {
                this.x = this.y = this.z = this.w = 0;
            }
        }, {
            key: "color",
            get: function() {
                return (this.w << 24) + (this.x << 16) + (this.y << 8) + this.z;
            },
            set: function(t) {
                this.x = (16711680 & t) >> 16, this.y = (65280 & t) >> 8, this.z = 255 & t, this.w = (4278190080 & t) >> 24;
            }
        } ]), t;
    }();
    var kt = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t, s, n) {
            var o;
            return (0, classCallCheck.default)(this, i), s = s || 0, null != n && -1 != n || (n = t.byteLength - s), 
            0 == s && n == t.byteLength ? o = e.call(this, t) : ((o = e.call(this))._u8d_ = new Uint8Array(t, s, n), 
            o._d_ = new DataView(o._u8d_.buffer, s, n), o._length = n), o.endian = Laya.Byte.BIG_ENDIAN, 
            (0, possibleConstructorReturn.default)(o);
        }
        return (0, l.default)(i, [ {
            key: "skip",
            value: function(t) {
                this.pos += t;
            }
        }, {
            key: "readBool",
            value: function() {
                return 1 == this.getUint8();
            }
        }, {
            key: "readS",
            value: function() {
                var t = this.getUint16();
                return 65534 == t ? null : 65533 == t ? "" : this.stringTable[t];
            }
        }, {
            key: "readSArray",
            value: function(t) {
                for (var e = new Array(t), i = 0; i < t; i++) e[i] = this.readS();
                return e;
            }
        }, {
            key: "writeS",
            value: function(t) {
                var e = this.getUint16();
                65534 != e && 65533 != e && (this.stringTable[e] = t);
            }
        }, {
            key: "readColor",
            value: function(t) {
                var e = this.getUint8(), i = this.getUint8(), s = this.getUint8(), n = this.getUint8();
                return (t ? n << 24 : 0) + (e << 16) + (i << 8) + s;
            }
        }, {
            key: "readColorS",
            value: function(t) {
                var e = this.getUint8(), i = this.getUint8(), s = this.getUint8(), n = this.getUint8();
                if (t && 255 != n) return "rgba(" + e + "," + i + "," + s + "," + n / 255 + ")";
                var a = e.toString(16), o = i.toString(16), h = s.toString(16);
                return 1 == a.length && (a = "0" + a), 1 == o.length && (o = "0" + o), 1 == h.length && (h = "0" + h), 
                "#" + a + o + h;
            }
        }, {
            key: "readChar",
            value: function() {
                var t = this.getUint16();
                return String.fromCharCode(t);
            }
        }, {
            key: "readBuffer",
            value: function() {
                var t = this.getUint32(), e = new i(this.buffer, this._pos_, t);
                return this.pos += t, e.stringTable = this.stringTable, e.version = this.version, 
                e;
            }
        }, {
            key: "seek",
            value: function(t, e) {
                var i, s = this._pos_;
                return this.pos = t, e < this.getUint8() ? (1 == this.getUint8() ? (this.pos += 2 * e, 
                i = this.getUint16()) : (this.pos += 4 * e, i = this.getUint32()), i > 0 ? (this.pos = t + i, 
                !0) : (this.pos = s, !1)) : (this.pos = s, !1);
            }
        } ]), i;
    }(Laya.Byte);
    t.ByteBuffer = kt;
    var wt = Laya.HitArea._isHitGraphic;
    t.ChildHitArea = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t, s) {
            var n;
            return (0, classCallCheck.default)(this, i), (n = e.call(this))._child = t, n._reversed = s, 
            n._reversed ? n.unHit = t.hitArea.hit : n.hit = t.hitArea.hit, n;
        }
        return (0, l.default)(i, [ {
            key: "contains",
            value: function(t, e) {
                var i;
                return (i = Laya.Point.TEMP).setTo(0, 0), i = this._child.toParentPoint(i), this._reversed ? !wt(t - i.x, e - i.y, this.unHit) : wt(t - i.x, e - i.y, this.hit);
            }
        } ]), i;
    }(Laya.HitArea);
    var Ct = function() {
        function t(e, i, s, n) {
            (0, classCallCheck.default)(this, t), this.matrix = new Array(St), this.reset(), void 0 === e && void 0 === i && void 0 === s && void 0 === n || this.adjustColor(e, i, s, n);
        }
        return (0, l.default)(t, [ {
            key: "reset",
            value: function() {
                for (var t = 0; t < St; t++) this.matrix[t] = bt[t];
            }
        }, {
            key: "invert",
            value: function() {
                this.multiplyMatrix([ -1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0 ]);
            }
        }, {
            key: "adjustColor",
            value: function(t, e, i, s) {
                this.adjustHue(s || 0), this.adjustContrast(e || 0), this.adjustBrightness(t || 0), 
                this.adjustSaturation(i || 0);
            }
        }, {
            key: "adjustBrightness",
            value: function(t) {
                t = 255 * this.cleanValue(t, 1), this.multiplyMatrix([ 1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0 ]);
            }
        }, {
            key: "adjustContrast",
            value: function(t) {
                var e = (t = this.cleanValue(t, 1)) + 1, i = 128 * (1 - e);
                this.multiplyMatrix([ e, 0, 0, 0, i, 0, e, 0, 0, i, 0, 0, e, 0, i, 0, 0, 0, 1, 0 ]);
            }
        }, {
            key: "adjustSaturation",
            value: function(t) {
                t = this.cleanValue(t, 1);
                var e = 1 - (t += 1), i = e * xt, s = e * It, n = e * Tt;
                this.multiplyMatrix([ i + t, s, n, 0, 0, i, s + t, n, 0, 0, i, s, n + t, 0, 0, 0, 0, 0, 1, 0 ]);
            }
        }, {
            key: "adjustHue",
            value: function(t) {
                t = this.cleanValue(t, 1), t *= Math.PI;
                var e = Math.cos(t), i = Math.sin(t);
                this.multiplyMatrix([ xt + e * (1 - xt) + i * -xt, It + e * -It + i * -It, Tt + e * -Tt + i * (1 - Tt), 0, 0, xt + e * -xt + .143 * i, It + e * (1 - It) + .14 * i, Tt + e * -Tt + -.283 * i, 0, 0, xt + e * -xt + i * -(1 - xt), It + e * -It + i * It, Tt + e * (1 - Tt) + i * Tt, 0, 0, 0, 0, 0, 1, 0 ]);
            }
        }, {
            key: "concat",
            value: function(t) {
                t.length == St && this.multiplyMatrix(t);
            }
        }, {
            key: "clone",
            value: function() {
                var e = new t();
                return e.copyMatrix(this.matrix), e;
            }
        }, {
            key: "copyMatrix",
            value: function(t) {
                for (var e = St, i = 0; i < e; i++) this.matrix[i] = t[i];
            }
        }, {
            key: "multiplyMatrix",
            value: function(t) {
                for (var e = [], i = 0, s = 0; s < 4; ++s) {
                    for (var n = 0; n < 5; ++n) e[i + n] = t[i] * this.matrix[n] + t[i + 1] * this.matrix[n + 5] + t[i + 2] * this.matrix[n + 10] + t[i + 3] * this.matrix[n + 15] + (4 == n ? t[i + 4] : 0);
                    i += 5;
                }
                this.copyMatrix(e);
            }
        }, {
            key: "cleanValue",
            value: function(t, e) {
                return Math.min(e, Math.max(-e, t));
            }
        } ]), t;
    }();
    t.ColorMatrix = Ct;
    var bt = [ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0 ], St = bt.length, xt = .299, It = .587, Tt = .114;
    t.PixelHitTest = function(t) {
        (0, h.default)(i, t);
        var e = u(i);
        function i(t, s, n) {
            var a;
            return (0, classCallCheck.default)(this, i), (a = e.call(this))._data = t, a.offsetX = s, a.offsetY = n, 
            a.scaleX = 1, a.scaleY = 1, a;
        }
        return (0, l.default)(i, [ {
            key: "contains",
            value: function(t, e) {
                if (t = Math.floor((t / this.scaleX - this.offsetX) * this._data.scale), e = Math.floor((e / this.scaleY - this.offsetY) * this._data.scale), 
                t < 0 || e < 0 || t >= this._data.pixelWidth) return !1;
                var i = e * this._data.pixelWidth + t, s = Math.floor(i / 8), n = i % 8;
                return s >= 0 && s < this._data.pixels.length && 1 == (this._data.pixels[s] >> n & 1);
            }
        } ]), i;
    }(Laya.HitArea), t.PixelHitTestData = function() {
        function t() {
            (0, classCallCheck.default)(this, t);
        }
        return (0, l.default)(t, [ {
            key: "load",
            value: function(t) {
                t.getInt32(), this.pixelWidth = t.getInt32(), this.scale = 1 / t.readByte();
                var e = t.getInt32();
                this.pixels = [];
                for (var i = 0; i < e; i++) {
                    var s = t.readByte();
                    s < 0 && (s += 256), this.pixels[i] = s;
                }
            }
        } ]), t;
    }();
    var Pt = function() {
        function t() {
            (0, classCallCheck.default)(this, t), this._readPos = 0, this.defaultImgWidth = 0, this.defaultImgHeight = 0, 
            this._handlers = {}, this._handlers.url = this.onTag_URL, this._handlers.img = this.onTag_IMG, 
            this._handlers.b = this.onTag_B, this._handlers.i = this.onTag_I, this._handlers.u = this.onTag_U, 
            this._handlers.sup = this.onTag_Simple, this._handlers.sub = this.onTag_Simple, 
            this._handlers.color = this.onTag_COLOR, this._handlers.font = this.onTag_FONT, 
            this._handlers.size = this.onTag_SIZE;
        }
        return (0, l.default)(t, [ {
            key: "onTag_URL",
            value: function(t, e, i) {
                return e ? "</a>" : null != i ? '<a href="' + i + '" target="_blank">' : '<a href="' + this.getTagText() + '" target="_blank">';
            }
        }, {
            key: "onTag_IMG",
            value: function(t, e, i) {
                if (e) return null;
                var s = this.getTagText(!0);
                return s ? this.defaultImgWidth ? '<img src="' + s + '" width="' + this.defaultImgWidth + '" height="' + this.defaultImgHeight + '"/>' : '<img src="' + s + '"/>' : null;
            }
        }, {
            key: "onTag_B",
            value: function(t, e, i) {
                return e ? "</span>" : "<span style='font-weight:bold'>";
            }
        }, {
            key: "onTag_I",
            value: function(t, e, i) {
                return e ? "</span>" : "<span style='font-style:italic'>";
            }
        }, {
            key: "onTag_U",
            value: function(t, e, i) {
                return e ? "</span>" : "<span style='text-decoration:underline'>";
            }
        }, {
            key: "onTag_Simple",
            value: function(t, e, i) {
                return e ? "</" + t + ">" : "<" + t + ">";
            }
        }, {
            key: "onTag_COLOR",
            value: function(t, e, i) {
                return e ? "</span>" : (this.lastColor = i, '<span style="color:' + i + '">');
            }
        }, {
            key: "onTag_FONT",
            value: function(t, e, i) {
                return e ? "</span>" : '<span style="font-family:' + i + '">';
            }
        }, {
            key: "onTag_SIZE",
            value: function(t, e, i) {
                return e ? "</span>" : (this.lastSize = i, '<span style="font-size:' + i + '">');
            }
        }, {
            key: "getTagText",
            value: function(t) {
                for (var e, i = this._readPos, s = ""; -1 != (e = this._text.indexOf("[", i)); ) {
                    if (92 != this._text.charCodeAt(e - 1)) {
                        s += this._text.substring(i, e);
                        break;
                    }
                    s += this._text.substring(i, e - 1), s += "[", i = e + 1;
                }
                return -1 == e ? null : (t && (this._readPos = e), s);
            }
        }, {
            key: "parse",
            value: function(t, e) {
                this._text = t, this.lastColor = null, this.lastSize = null;
                for (var i, s, n, a, o, h, r, l = 0, u = ""; -1 != (i = this._text.indexOf("[", l)); ) if (i > 0 && 92 == this._text.charCodeAt(i - 1)) u += this._text.substring(l, i - 1), 
                u += "[", l = i + 1; else {
                    if (u += this._text.substring(l, i), l = i, -1 == (i = this._text.indexOf("]", l))) break;
                    n = "/" == this._text.charAt(l + 1), a = this._text.substring(n ? l + 2 : l + 1, i), 
                    this._readPos = i + 1, o = null, h = null, -1 != (s = a.indexOf("=")) && (o = a.substring(s + 1), 
                    a = a.substring(0, s)), a = a.toLowerCase(), null != (r = this._handlers[a]) ? e || null != (h = r.call(this, a, n, o)) && (u += h) : u += this._text.substring(l, this._readPos), 
                    l = this._readPos;
                }
                return l < this._text.length && (u += this._text.substr(l)), this._text = null, 
                u;
            }
        } ]), t;
    }();
    Pt.inst = new Pt(), t.UBBParser = Pt, t.ToolSet = function() {
        function i() {
            (0, classCallCheck.default)(this, i);
        }
        return (0, l.default)(i, null, [ {
            key: "startsWith",
            value: function(t, e, i) {
                return !(!t || t.length < e.length || (t = t.substring(0, e.length), i ? t.toLowerCase() != e.toLowerCase() : t != e));
            }
        }, {
            key: "endsWith",
            value: function(t, e, i) {
                return !(!t || t.length < e.length || (t = t.substring(t.length - e.length), i ? t.toLowerCase() != e.toLowerCase() : t != e));
            }
        }, {
            key: "trimRight",
            value: function(t) {
                for (var e = "", i = t.length - 1; i >= 0 && (" " == (e = t.charAt(i)) || "\n" == e || "\r" == e); i--) ;
                return t.substring(0, i + 1);
            }
        }, {
            key: "convertToHtmlColor",
            value: function(t, e) {
                var i;
                i = e ? (t >> 24 & 255).toString(16) : "";
                var s = (t >> 16 & 255).toString(16), n = (t >> 8 & 255).toString(16), a = (255 & t).toString(16);
                return 1 == i.length && (i = "0" + i), 1 == s.length && (s = "0" + s), 1 == n.length && (n = "0" + n), 
                1 == a.length && (a = "0" + a), "#" + i + s + n + a;
            }
        }, {
            key: "convertFromHtmlColor",
            value: function(t, e) {
                return t.length < 1 ? 0 : ("#" == t.charAt(0) && (t = t.substr(1)), 8 == t.length ? (parseInt(t.substr(0, 2), 16) << 24) + parseInt(t.substr(2), 16) : e ? 4278190080 + parseInt(t, 16) : parseInt(t, 16));
            }
        }, {
            key: "displayObjectToGObject",
            value: function(t) {
                for (;t && !(t instanceof Laya.Stage); ) {
                    if (t.$owner) return t.$owner;
                    t = t.parent;
                }
                return null;
            }
        }, {
            key: "encodeHTML",
            value: function(t) {
                return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;") : "";
            }
        }, {
            key: "clamp",
            value: function(t, e, i) {
                return t < e ? t = e : t > i && (t = i), t;
            }
        }, {
            key: "clamp01",
            value: function(t) {
                return isNaN(t) ? t = 0 : t > 1 ? t = 1 : t < 0 && (t = 0), t;
            }
        }, {
            key: "lerp",
            value: function(t, e, i) {
                return t + i * (e - t);
            }
        }, {
            key: "repeat",
            value: function(t, e) {
                return t - Math.floor(t / e) * e;
            }
        }, {
            key: "distance",
            value: function(t, e, i, s) {
                return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - s, 2));
            }
        }, {
            key: "setColorFilter",
            value: function(i, s) {
                var n, a, o, h, r, l, u, _ = i.$_colorFilter_, c = i.filters, d = (0, e.default)(s);
                if ("boolean" == d) n = _ ? _.$_color_ : null, a = s; else {
                    if ("string" == d) {
                        var g = Laya.ColorUtils.create(s).arrColor;
                        s = 1 == g[0] && 1 == g[1] && 1 == g[2] ? null : [ g[0], 0, 0, 0, 0, 0, g[1], 0, 0, 0, 0, 0, g[2], 0, 0, 0, 0, 0, 1, 0 ];
                    }
                    n = s, a = !!_ && _.$_grayed_;
                }
                if (n || 0 == n || a) _ || (_ = new Laya.ColorFilter(), i.$_colorFilter_ = _), c ? -1 == c.indexOf(_) && c.push(_) : c = [ _ ], 
                i.filters = c, _.$_color_ = n, _.$_grayed_ = a, _.reset(), a ? _.gray() : 20 == n.length ? _.setByMatrix(n) : _.setByMatrix((o = n[0], 
                h = n[1], r = n[2], l = n[3], u = u || new Array(t.ColorMatrix.length), Lt.reset(), 
                Lt.adjustColor(o, h, r, l), Lt.matrix.forEach(function(t, e) {
                    return u[e] = t;
                }), u)); else if (c && _) {
                    var f = c.indexOf(_);
                    -1 != f && (c.splice(f, 1), c.length > 0 ? i.filters = c : i.filters = null);
                }
            }
        } ]), i;
    }();
    var Lt = new t.ColorMatrix();
}(window.fairygui = window.fgui || {});