var e, i, n, t, s, 
r = require("../../@babel/runtime/helpers/interopRequireDefault"), 
a = r(require("../../@babel/runtime/helpers/classCallCheck")), h = r(require("../../@babel/runtime/helpers/createClass"));

"undefined" != typeof wx && (window.zs = window.zs || {}, window.zs.wx = window.zs.wx || {}, 
window.zs.wx.banner = window.zs.wx.banner || {}, e = window.zs.wx.banner = window.zs.wx.banner || {}, 
i = Laya, n = function() {
    function e(i, n, t, s, r, h, l) {
        (0, a.default)(this, e), this.adUnitId = i, this.isLoad = !1, this.isShow = !1, 
        this.isWait = n, this.pos = t, this.size = s, this.realSize = null, this.loadFunc = r, 
        this.mgr = l, this.showLong = 0, this.empty = h, this.initBanner();
        var o = this;
        this.loadTime = setTimeout(function() {
            console.log("加载超时"), o.mgr.clearBanner(o.bannerIndex), o.inErr = !0;
        }, 1e4), this.showTime = new Date().getTime(), this.birthTime = 0, this.inErr = !1;
    }
    return (0, h.default)(e, [ {
        key: "initBanner",
        value: function() {
            // if (window.wx && window.wx.createBannerAd) {
            //     console.log("进入banner初始化" + this.adUnitId);
            //     var e = this;
            //     if (null == this.bannerAd) {
            //         var i = s(this.pos, this.realSize ? this.realSize.w : 300, this.realSize ? this.realSize.h : 104, this.empty);
            //         this.bannerAd = wx.createBannerAd({
            //             adUnitId: e.adUnitId,
            //             style: {
            //                 left: i.left,
            //                 top: i.top,
            //                 width: 300
            //             }
            //         });
            //     }
            //     this.bannerAd ? (this.bannerAd.onLoad(function() {
            //         e.mgr.noBanner = !1, e.isLoad = !0, e.loadTime && clearTimeout(e.loadTime), e.loadFunc && e.loadThis && e.loadFunc.call(e.mgr), 
            //         e.birthTime = new Date().getTime(), e.isWait || e.show();
            //     }), this.bannerAd.onError(function(i) {
            //         console.error("Banner err: " + e.bannerIndex, i), e.loadTime && clearTimeout(e.loadTime), 
            //         t.Instance.inErr(), e.mgr.clearBanner(e.bannerIndex), e.inErr = !0;
            //     }), this.bannerAd.onResize(this.onResize.bind(this))) : console.error("Banner 创建失败???环境？");
            // } else console.log("环境异常,无法创建");
        }
    }, {
        key: "onResize",
        value: function(e) {
            this.realSize = {
                w: e.width,
                h: e.height
            };
        }
    }, {
        key: "show",
        value: function() {
            if (null != this.bannerAd && this.isLoad && !this.inErr) {
                this.isShow = !0, this.isWait = !1;
                var e = this;
                this.updateSize(), this.updatePosition(), this.mgr.hideAll(this.bannerIndex), this.bannerAd.show().then(function() {
                    console.warn("banner标号" + e.bannerIndex + "展示成功,当前已展示时间" + e.showLong), e.showTime = new Date().getTime(), 
                    e.mgr.lastFreshTime = e.showTime, e.isWait && e.hide();
                });
            }
        }
    }, {
        key: "updatePosition",
        value: function() {
            if (this.bannerAd && this.realSize) {
                var e = s(this.pos, this.realSize ? this.realSize.w : 300, this.realSize ? this.realSize.h : 104, this.empty);
                this.bannerAd.style.left = e.left, this.bannerAd.style.top = e.top;
            }
        }
    }, {
        key: "updateSize",
        value: function() {
            this.bannerAd && this.size && (null != this.size.width && (this.bannerAd.style.width = this.size.width), 
            null != this.size.height && (this.bannerAd.style.height = this.size.height));
        }
    }, {
        key: "hide",
        value: function() {
            this.isWait = !0, this.bannerAd && this.bannerAd.hide(), this.showTime && (this.showLong += new Date().getTime() - this.showTime), 
            this.showTime = null, this.isShow && zs.log.warn("banner标号" + this.bannerIndex + "调用隐藏,当前已展示时间" + this.showLong), 
            this.isShow = !1;
        }
    }, {
        key: "destroy",
        value: function() {
            this.bannerAd && this.bannerAd.destroy(), this.bannerAd = null, this.adUnitId = null, 
            this.isLoad = null, this.isShow = null, this.isWait = null, this.loadTimer && clearTimeout(this.loadTimer), 
            this.pos = null, this.loadFunc = null, this.showLong = null, this.birthTime = null, 
            this.loadTimer = null, this.showTime = null, this.inErr = null;
        }
    }, {
        key: "liveTime",
        get: function() {
            return this.birthTime ? new Date().getTime() - this.birthTime : 0;
        }
    }, {
        key: "showEd",
        get: function() {
            var e = Number(zs.product.get("zs_banner_show_number")) || 0;
            return e = Math.max(e, 5e3), this.showLong > e;
        }
    } ]), e;
}(), t = function() {
    function e() {
        (0, a.default)(this, e), this.wxbannerArray = [], this.bannerIds = [], this.isWait = !1, 
        this.pos = {}, this.lastFreshTime = null, this.length = 0, this.inErrTime = !1, 
        this.noBanner = !1, this.errTimer = null, this.createNum = 0, this.bannerIndex = 0, 
        this.checkInit = !1, this.idCdArr = [], this.lastCreate = null;
        var i = this;
        this.bannerCacheNum = 5;
        var n = zs.product.get("zs_banner_cache_num");
        n && (n = parseInt(n), isNaN(n) || (this.bannerCacheNum = n)), this.bannerCreateInterval = 3e4;
        var t = zs.product.get("zs_banner_create_interval");
        t && (t = parseInt(t), isNaN(t) || (this.bannerCreateInterval = t)), setInterval(function() {
            if (i.lastFreshTime) {
                var e = new Date().getTime(), n = zs.product.get("zs_banner_refresh_time");
                !i.isWait && n && e - i.lastFreshTime > n && (i.inErrTime ? i.showBanner(i.pos, i.size, i.empty, !0) : i.checkBanner(i.isWait, i.pos, i.size, i.checkInit, i.empty));
            }
        }, 500);
    }
    return (0, h.default)(e, null, [ {
        key: "Instance",
        get: function() {
            return null == this._inst && (this._inst = new e()), this._inst;
        }
    } ]), (0, h.default)(e, [ {
        key: "inErr",
        value: function() {
            this.errTimer && clearTimeout(this.errTimer), this.inErrTime = !0, this.showBanner(this.pos, this.size, this.empty, !0);
            var e = this;
            this.errTimer = setTimeout(function() {
                e.inErrTime = !1, e.noBanner = !0, e.checkBanner(e.isWait, e.pos, e.size, e.checkInit, e.empty);
            }, 3e4);
        }
    }, {
        key: "setAdUnitId",
        value: function() {
            for (var e = [], i = arguments.length, n = new Array(i), t = 0; t < i; t++) n[t] = arguments[t];
            for (;n.length > 0; ) {
                var s = n.shift();
                null != s && "" != s && e.push(s);
            }
            this.bannerIds = e, this.bannerIndex = zs.utils.randInt(0, this.bannerIds.length);
        }
    }, {
        key: "clearBanner",
        value: function(e) {
            // for (var i = 0; i < this.wxbannerArray.length - 1; i++) {
            //     var n = this.wxbannerArray[i];
            //     if (null != e) {
            //         if (n.bannerIndex == e) {
            //             n.destroy(), console.log("banner " + n.bannerIndex + " 已销毁"), this.wxbannerArray.splice(i, 1);
            //             break;
            //         }
            //     } else !n.isShow && (n.inErr || this.wxbannerArray.length > 5 && n.showEd && n.liveTime > 3e4) ? (console.log("banner " + n.bannerIndex + " 已销毁"), 
            //     n.destroy(), this.wxbannerArray.splice(i, 1), i--) : n.bannerAd || (console.log("banner " + n.bannerIndex + " 已销毁"), 
            //     this.wxbannerArray.splice(i, 1), i--);
            // }
        }
    }, {
        key: "checkBanner",
        value: function(e, i, n, t, s) {
        //     if (this.bannerIds) {
        //         if (this.bannerIds.length) {
        //             e && this.hideAll(), this.lastFreshTime = null, this.isWait = e, this.pos = i, this.size = n, 
        //             this.checkInit = t, this.empty = s;
        //             var r = 0;
        //             this.inErrTime || this.noBanner || this.clearBanner();
        //             for (var a = this.wxbannerArray.length - 1; a >= 0; a--) {
        //                 var h = this.wxbannerArray[a];
        //                 if (h.isLoad || h.inErr) {
        //                     if (h.isLoad && !h.showEd && !h.isShow) return console.log("存在加载完成但未展示的banner"), 
        //                     void (this.isWait || this.showBanner(this.pos, this.size, this.empty));
        //                 } else console.log("banner " + h.bannerIndex + " 未加载", h), r++;
        //             }
        //             return r > 0 || this.inErrTime ? (console.log("当前拉取中大于配置次或者出现banner报错,暂停拉取"), void (this.isWait || this.showBanner(this.pos, this.size, this.empty, !0))) : t ? (this.createNum = 1, 
        //             void this.createBanner()) : (console.error("checkInit为false，不创建banner"), void (this.isWait || this.showBanner(this.pos, this.size, this.empty)));
        //         }
        //         console.log("bannerID呢？？？");
        //     } else console.log("未设置bannerID");
        }
    }, {
        key: "createBanner",
        value: function() {
        //     if (this.inErrTime && console.log("处于报错状态取消创建"), !(!this.createNum || this.createNum <= 0 || this.inErrTime)) {
        //         var e = new Date().getTime();
        //         if (this.lastCreate && e - this.lastCreate < this.bannerCreateInterval) for (var i = this.wxbannerArray.length - 1; i >= 0; i--) {
        //             var t = this.wxbannerArray[i];
        //             if (t.isLoad && (this.wxbannerArray.length > 1 && (this.wxbannerArray.splice(i, 1), 
        //             this.wxbannerArray.splice(0, 0, t), i++), !t.isShow)) {
        //                 t.pos = this.pos, t.size = this.size, t.empty = this.empty, t.isWait = this.isWait, 
        //                 this.isWait || t.show();
        //                 break;
        //             }
        //         } else {
        //             var s = this.bannerIndex % this.bannerIds.length, r = new n(this.bannerIds[s], this.isWait, this.pos, this.size, this.createBanner, this.empty, this);
        //             r.bannerIndex = this.bannerIndex, console.log("创建新banner展示 " + this.bannerIndex), 
        //             this.bannerIndex++, this.wxbannerArray.push(r), this.createNum--, this.wxbannerArray.length > this.bannerCacheNum && (this.lastCreate = e);
        //         }
        //     }
        }
    }, {
        key: "showBanner",
        value: function(e, i, n, t) {
            // if (this.isWait = !1, this.empty != n) this.hideAll(), t = !0; else {
            //     var s = new Date().getTime();
            //     this.lastCreate && s - this.lastCreate < this.bannerCreateInterval && (t = !0);
            // }
            // for (var r = this.wxbannerArray.length - 1; r >= 0; r--) {
            //     var a = this.wxbannerArray[r];
            //     if (a.isLoad && (t || !a.showEd) && !a.isShow) return a.pos = e, a.size = i, a.empty = n, 
            //     a.show(), void (t && (this.wxbannerArray.splice(r, 1), this.wxbannerArray.splice(0, 0, a)));
            // }
            // console.log("不存在加载完并且没有正在展示的banner");
        }
    }, {
        key: "hideAll",
        value: function(e) {
            for (var i = 0; i < this.wxbannerArray.length; i++) {
                var n = this.wxbannerArray[i];
                n.bannerIndex != e && n.hide();
            }
            null == e && (this.isWait = !0);
        }
    } ]), e;
}(), s = function(e, n, t, s) {
    if (!n || !t) return {
        left: 0,
        top: 0
    };
    var r = -n + (zs.configs.gameCfg.debug ? 10 : 1), a = -t + (zs.configs.gameCfg.debug ? 10 : 1);
    if (!s) {
        var h = window.screen.availWidth / i.stage.width, l = window.screen.availHeight / i.stage.height;
        r = e ? null != e.left ? e.left * h : null != e.right ? (i.stage.width - e.right) * h - n : null != e.centerX ? (i.stage.width / 2 + e.centerX) * h - n / 2 : (window.screen.availWidth - n) / 2 : (window.screen.availWidth - n) / 2, 
        a = e ? null != e.top ? e.top * l : null != e.bottom ? (i.stage.height - e.bottom) * l - t : null != e.centerY ? (i.stage.height / 2 + e.centerY) * l - t / 2 : window.screen.availHeight - t : window.screen.availHeight - t;
    }
    return {
        left: r,
        top: a
    };
}, e.WxBanner = n, e.WxBannerMgr = t);