var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = t(require("../../@babel/runtime/helpers/get")),
classCallCheck = t(require("../../@babel/runtime/helpers/classCallCheck")), i = t(require("../../@babel/runtime/helpers/createClass")), 
possibleConstructorReturn = t(require("../../@babel/runtime/helpers/possibleConstructorReturn")), 
getPrototypeOf = t(require("../../@babel/runtime/helpers/getPrototypeOf")), a = t(require("../../@babel/runtime/helpers/inherits"));

function l(t) {
    return function() {
        var e, n = (0, getPrototypeOf.default)(t);
        if (testo()) {
            var i = (0, getPrototypeOf.default)(this).constructor;
            e = Reflect.construct(n, arguments, i);
        } else e = n.apply(this, arguments);
        return (0, possibleConstructorReturn.default)(this, e);
    };
}


function testo() {
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

function o() {
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

window.zs = window.zs || {}, window.zs.ui = window.zs.ui || {}, function(t) {
    var s = function(t) {
        (0, a.default)(s, t);
        var e = l(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = e.apply(this, arguments)).picture = null, t.desc = null, 
            t.title = null, t.data = null, t;
        }
        return (0, i.default)(s, null, [ {
            key: "createInstance",
            value: function() {
                return null;
            }
        } ]), s;
    }(fairygui.GComponent);
    s.URL = null;
    var o = function(t) {
        (0, a.default)(s, t);
        var e = l(s);
        function s() {
            return (0, classCallCheck.default)(this, s), e.apply(this, arguments);
        }
        return (0, i.default)(s, [ {
            key: "onConstruct",
            value: function() {
                this.background = this.getChild("background"), this.list = this.getChild("list");
            }
        } ], [ {
            key: "bind",
            value: function(t) {
                zs.ui.bind(t, this.itemName, s), this.pack = t;
            }
        }, {
            key: "createInstance",
            value: function() {
                return fairygui.UIPackage.createObject(this.pack.name, this.itemName);
            }
        } ]), s;
    }(fairygui.GComponent);
    o.itemName = "list";
    var u = function(t) {
        (0, a.default)(s, t);
        var e = l(s);
        function s() {
            return (0, classCallCheck.default)(this, s), e.apply(this, arguments);
        }
        return (0, i.default)(s, [ {
            key: "onConstruct",
            value: function() {
                this.state = this.getController("state"), this.title = this.getChild("title"), this.content = this.getChild("content"), 
                this.btn_confirm = this.getChild("btn_confirm"), this.btn_cancel = this.getChild("btn_cancel");
            }
        } ], [ {
            key: "bind",
            value: function(t) {
                zs.ui.bind(t, this.itemName, s), this.pack = t;
            }
        }, {
            key: "createInstance",
            value: function() {
                return fairygui.UIPackage.createObject(this.pack.name, this.itemName);
            }
        } ]), s;
    }(fairygui.GComponent);
    u.itemName = "msgbox";
    var c = function(t) {
        (0, a.default)(s, t);
        var e = l(s);
        function s() {
            return (0, classCallCheck.default)(this, s), e.apply(this, arguments);
        }
        return (0, i.default)(s, null, [ {
            key: "createInstance",
            value: function() {
                var t = new fairygui.GComponent();
                t.width = fairygui.GRoot.inst.width, t.height = fairygui.GRoot.inst.height;
                var e = new fairygui.GGraph();
                e.drawRect(0, zs.proxy.color("#000000"), zs.proxy.color("#000000")), t.addChild(e), 
                e.x = .25 * -t.width, e.y = .25 * -t.height, e.width = 2 * t.width, e.height = 2 * t.height;
                var n = new fairygui.GTextField();
                return n.pivotX = .5, n.pivotY = .5, n.x = .5 * t.width, n.y = .5 * t.height, n.addRelation(t, fairygui.RelationType.Center_Center), 
                n.addRelation(t, fairygui.RelationType.Middle_Middle), n.fontSize = 100, n.text = "", 
                n.color = zs.proxy.color("#FFFFFF"), t.loadingValue = t.addChild(n), t;
            }
        } ]), s;
    }(fairygui.GComponent);
    c.itemName = "loading";
    var h = function(t) {
        (0, a.default)(o, t);
        var s = l(o);
        function o(t) {
            var e;
            return (0, classCallCheck.default)(this, o), (e = s.call(this, t)).clickPercent = .14, e.rollbackPercent = .01, 
            e.rollbackInterval = 20, e.bannerTime = 3e3, e.bannerRange = [ .3, .7 ], e.awardDelay = [ 1e3, 1e3 ], 
            e.closeDelay = [ 1e3, 1040 ], e.btnSrcOffset = 0, e.btnDstOffset = 370, e.btnOffsetDelay = 800, 
            e.btnOffsetTime = 500, e.btnIgnoreOffset = !1, e;
        }
        return (0, i.default)(o, [ {
            key: "btnKnock",
            get: function() {
                return null;
            }
        } ], [ {
            key: "checkEggOpen",
            value: function(t) {
                return !!zs.EggKnock && zs.EggKnock.checkEggOpen(t);
            }
        } ]), (0, i.default)(o, [ {
            key: "dispose",
            value: function() {
                zs.Timer.inst.clearAll(this), zs.Tween.clearAll(this.btnKnock), zs.core.removeAppShow(zs.Handler.create(this, this.onAppShow)), 
                zs.core.removeAppHide(zs.Handler.create(this, this.onAppHide)), this.btnKnock && this.btnKnock.offClick && zs.proxy.Event.FGUIOffClick(this.btnKnock, this, this.onClick), 
                this.onDispose();// (0, e.default)((0, getPrototypeOf.default)(o.prototype), "dispose", this).call(this);
            }
        }, {
            key: "onAppShow",
            value: function() {
                this.isOpenAd && (zs.product.get("zs_ready_click_two") || this.onFinish());
            }
        }, {
            key: "onAppHide",
            value: function() {
                this.isOpenAd && (this.isOpenAd = !0);
            }
        }, {
            key: "apply",
            value: function() {
                return this.progress = 0, this.rollbackNext = 0, this.isOpenAd = !1, this.isGetAward = !1, 
                this.bannerPoint = .01 * zs.utils.randInt(100 * this.bannerRange[0], 100 * this.bannerRange[1]), 
                zs.core.addAppShow(zs.Handler.create(this, this.onAppShow, null, !1)), zs.core.addAppHide(zs.Handler.create(this, this.onAppHide, null, !1)), 
                this.btnKnock && this.btnKnock.onClick && zs.proxy.Event.FGUIOnClick(this.btnKnock, this, this.onClick), 
                this.btnKnock && this.btnKnock.y && (this.btnKnock.y += this.btnSrcOffset), zs.Timer.inst.loop(1, this, this.tick), 
                this.updateProgress(this.progress), zs.EggKnock && zs.EggKnock.markReadyNum(!0), 
                this;
            }
        }, {
            key: "applyConfig",
            value: function(t) {
                return t && (null != t.clickpercent && (this.clickPercent = t.clickpercent), null != t.click_percent && (this.clickPercent = t.click_percent), 
                null != t.rollbackpercent && (this.rollbackPercent = t.rollbackpercent), null != t.rollback_percent && (this.rollbackPercent = t.rollback_percent), 
                null != t.rollbackinterval && (this.rollbackInterval = t.rollbackinterval), null != t.rollback_interval && (this.rollbackInterval = t.rollback_interval), 
                null != t.bannerrange && Array.isArray(t.bannerrange) && t.bannerrange.length >= 2 && (this.bannerRange = t.bannerrange), 
                null != t.banner_range && Array.isArray(t.banner_range) && t.banner_range.length >= 2 && (this.bannerRange = t.banner_range), 
                null != t.awarddelay && Array.isArray(t.awarddelay) && t.awarddelay.length >= 2 && (this.awardDelay = t.awarddelay), 
                null != t.award_delay && Array.isArray(t.award_delay) && t.award_delay.length >= 2 && (this.awardDelay = t.award_delay), 
                null != t.closedelay && Array.isArray(t.closedelay) && t.closedelay.length >= 2 && (this.closeDelay = t.closedelay), 
                null != t.close_delay && Array.isArray(t.close_delay) && t.close_delay.length >= 2 && (this.closeDelay = t.close_delay), 
                null != t.btnsrcoffset && (this.btnSrcOffset = t.btnsrcoffset), null != t.btn_src_offset && (this.btnSrcOffset = t.btn_src_offset), 
                null != t.btndstoffset && (this.btnDstOffset = t.btndstoffset), null != t.btn_dst_offset && (this.btnDstOffset = t.btn_dst_offset), 
                null != t.btnoffsetdelay && (this.btnOffsetDelay = t.btnoffsetdelay), null != t.btn_offset_delay && (this.btnOffsetDelay = t.btn_offset_delay), 
                null != t.btnoffsettime && (this.btnOffsetTime = t.btnoffsettime), null != t.btn_offset_time && (this.btnOffsetTime = t.btn_offset_time), 
                null != t.btnignoreoffset && (this.btnIgnoreOffset = t.btnignoreoffset), null != t.btn_ignore_offset && (this.btnIgnoreOffset = t.btn_ignore_offset), 
                t.awardevent && (this.awardEvent = t.awardevent), t.award_event && (this.awardEvent = t.award_event), 
                t.closeevent && (this.closeEvent = t.closeevent), t.close_event && (this.closeEvent = t.close_event)), 
                this.apply();
            }
        }, {
            key: "tick",
            value: function() {
                var t = zs.Timer.inst.delta;
                this.isOpenAd && this.bannerTime > 0 && this.bannerCount > 0 && (this.bannerCount -= t, 
                this.bannerCount <= 0 && (zs.platform.sync.hideBanner(), this.onFinish())), this.bannerTime <= 0 && this.btnOffsetCount && this.btnOffsetCount > 0 && (this.btnOffsetCount -= t, 
                this.btnOffsetCount <= 0 && (this.btnKnock && this.btnKnock.y && !this.btnIgnoreOffset && zs.Tween.to(this.btnKnock, {
                    y: this.btnKnock.y - this.btnDstOffset
                }, this.btnOffsetTime), this.btnOffsetCount = null)), this.isGetAward ? (null != this.awardCount && this.awardCount > 0 && (this.awardCount -= t, 
                this.awardCount <= 0 && (this.awardEvent && zs.core.workflow.runEventConfig(this.awardEvent), 
                this.awardHandler && this.awardHandler.run(), this.awardCount = null)), null != this.closeCount && this.closeCount > 0 && (this.closeCount -= t, 
                this.closeCount <= 0 && (this.awardCount && this.awardHandler && this.awardHandler.run(), 
                this.awardCount = null, this.closeEvent && zs.core.workflow.runEventConfig(this.closeEvent), 
                this.closeHandler && this.closeHandler.run(), this.closeCount = null))) : (this.rollbackNext <= 0 ? (this.progress -= this.rollbackPercent, 
                this.rollbackNext = this.rollbackInterval) : this.rollbackNext -= t, this.clicked && (this.onBannerCheck(), 
                this.progress += this.clickPercent, this.handleClick(this.progress)), this.clicked = !1, 
                this.progress = Math.min(1, Math.max(0, this.progress)), this.updateProgress(this.progress), 
                this.progress >= .999999 && this.onFinish());
            }
        }, {
            key: "onClick",
            value: function() {
                this.clicked = !0;
            }
        }, {
            key: "onHandleClick",
            value: function(t) {}
        }, {
            key: "handleClick",
            value: function(t) {
                // t >= this.bannerPoint && !this.isOpenAd && (this.isOpenAd = !0, this.bannerCount = this.bannerTime, 
                // zs.platform.sync.showBanner(), this.startButtonOffset());
            }
        }, {
            key: "startButtonOffset",
            value: function() {
                this.btnOffsetCount = this.btnOffsetDelay;
            }
        }, {
            key: "updateProgress",
            value: function(t) {}
        }, {
            key: "setEventHandler",
            value: function(t, e) {
                return this.awardHandler = t, this.closeHandler = e, this;
            }
        }, {
            key: "onFinish",
            value: function() {
                this.isGetAward || (this.onGetAward(), zs.Tween.clearAll(this.btnKnock), this.isGetAward = !0, 
                this.awardCount = zs.utils.randInt(this.awardDelay[0], this.awardDelay[1]), this.closeCount = zs.utils.randInt(this.closeDelay[0], this.closeDelay[1]));
            }
        }, {
            key: "onBannerCheck",
            value: function() {}
        }, {
            key: "onGetAward",
            value: function() {
                zs.EggKnock && zs.EggKnock.markAwardNum(!0);
            }
        }, {
            key: "onDispose",
            value: function() {}
        } ]), o;
    }(zs.fgui.base);
    h.inited = !1;
    var f = function(t) {
        (0, a.default)(s, t);
        var e = l(s);
        function s() {
            var t;
            return (0, classCallCheck.default)(this, s), (t = e.apply(this, arguments)).progressTime = .01, 
            t.progressCount = 0, t.current = 0, t.progress = 0, t;
        }
        return (0, i.default)(s, [ {
            key: "init",
            value: function() {
                this.updateProgress(0);
            }
        }, {
            key: "updateProgress",
            value: function(t) {
                this.view && (this.view.loadingValue.text = t + "%");
            }
        }, {
            key: "run",
            value: function(t) {
                if (this.progress = t, this.current < this.progress) {
                    this.progressCount += .001 * zs.Timer.inst.delta;
                    var e = Math.round(this.progressCount / this.progressTime);
                    this.progressCount -= e * this.progressTime, this.current + e >= this.progress ? this.current = this.progress : this.current = this.current + e, 
                    this.updateProgress(this.current);
                } else if (this.progress >= 100) return !0;
                return !1;
            }
        } ], [ {
            key: "preload",
            value: function() {
                return Promise(function(t, e) {
                    t();
                });
            }
        } ]), s;
    }(zs.fgui.base);
    f.typeDefine = c, t.bind = function(t, e, n) {
        //()()()()()()()()()
        if (null != t) {
            var i = t.getItemByName(e);
            if (null != i) {
                var s = "ui://" + t.id + i.id;
                zs.proxy.setFGUIExtension(s, n);
            } else zs.log.warn("指定资源包（" + t.name + "）中不存在" + e + "组件，无法绑定指定模板");
        } else zs.log.warn("资源包为空，无法绑定模板 " + e);
    }, t.readURL = function(t, e) {
        if (null == t) return null;
        var n = t.getItemByName(e);
        return null == n ? null : "ui://" + t.id + n.id;
    }, t.FGUI_item = s, t.FGUI_list = o, t.FGUI_msgbox = u, t.FGUI_Loading = c, t.EggKnock = h, 
    t.Loading = f, t.LayaLoading = function(t) {
        (0, a.default)(i, t);
        var e = l(i);
        function i() {
            return (0, classCallCheck.default)(this, i), e.apply(this, arguments);
        }
        return i;
    }(zs.proxy.NativeLoading), t.UIScene = function(t) {
        (0, a.default)(i, t);
        var e = l(i);
        function i() {
            return (0, classCallCheck.default)(this, i), e.apply(this, arguments);
        }
        return i;
    }(zs.proxy.UIScene);
}(window.zs.ui = window.zs.ui || {});