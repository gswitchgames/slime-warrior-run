"undefined" != typeof wx && (window.platform = function() {
    function e() {}
    return e.loginCount = 0, e.launchOptions = null, e.systemInfo = null, e.delayBanner = null, 
    e.handlerTimeout = 3e3, e.insertHanlder = null, e.bannerCount = 0, e.hideCount = 0, 
    e.videoIds = null, e.videoIdx = 0, e.videoWait = null, e.videoLoaded = !1, e.init = function() {
        if (wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        }), e.systemInfo = wx.getSystemInfoSync(), "function" == typeof wx.getUpdateManager) {
            var n = wx.getUpdateManager();
            n.onCheckForUpdate(function(e) {
                zs.log.debug("微信系统更新检测" + (e.hasUpdate ? "成功" : "失败"), "Platform");
            }), n.onUpdateReady(function() {
                n.applyUpdate();
            });
        }
        console.log("微信平台初始化...");
    }, e.initAds = function() {
        e.initBanner(), e.initVideo(), e.setDefaultShare(), e.initInsert({
            id: zs.product.get("zs_full_screen_adunit")
        });
    }, e.login = function() {
        return new Promise(function(e, n) {
            wx.login({
                success: function(n) {
                    e(n);
                },
                fail: function(e) {
                    n(e);
                },
                complete: function(e) {}
            });
        });
    }, e.getLaunchOptions = function() {
        return e.launchOptions || (e.launchOptions = wx.getLaunchOptionsSync()), e.launchOptions;
    }, e.getScene = function() {
        return e.launchOptions || (e.launchOptions = wx.getLaunchOptionsSync()), e.launchOptions && e.launchOptions.scene ? e.launchOptions.scene.toString() : null;
    }, e.getLoginParams = function() {
        return new Promise(function(e, n) {
            wx.login({
                success: function(n) {
                    e({
                        code: n.code
                    });
                },
                fail: function(n) {
                    e({
                        uid: 1
                    });
                },
                complete: function(e) {}
            });
        });
    }, e.share = function(e) {
        wx.shareAppMessage({
            title: e && e.title ? e.title : zs.product.get("zs_share_title"),
            imageUrl: e && e.imgUrl ? e.imgUrl : zs.product.get("zs_share_img")
        });
    }, e.setDefaultShare = function(e) {
        var n = {
            title: e && e.title ? e.title : zs.product.get("zs_share_title"),
            imageUrl: e && e.imgUrl ? e.imgUrl : zs.product.get("zs_share_img")
        };
        wx.onShareAppMessage(function() {
            return n;
        });
    }, e.setCloudStorage = function(e) {
        return new Promise(function(n, t) {
            if (null == e.kvPair) return zs.log.warn("方法（ setCloudStorage ）缺少必要参数（ kvPair ）", "Platform"), 
            t();
            wx.setUserCloudStorage({
                KVDataList: e.kvPair,
                success: function(e) {
                    zs.log.debug("setCloudStorage success: " + JSON.stringify(e), "Platform"), n(e);
                },
                fail: function(e) {
                    zs.log.debug("setCloudStorage fail: " + JSON.stringify(e), "Platform"), t(e);
                },
                complete: function(e) {}
            });
        });
    }, e.getCloudStorage = function(e) {
        return new Promise(function(e, n) {
            return zs.log.warn("getCloudStorage接口只可在开放数据域下使用,直接调用无效"), n();
        });
    }, e.userInfoCreate = function(n) {
        return new Promise(function(t, o) {
            if (null == n.rect) return zs.log.warn("方法（ userInfoCreate ）缺少必要参数（ rect ）", "Platform"), 
            o();
            var r = e.systemInfo, i = n.rect;
            e.userInfoButton = wx.createUserInfoButton({
                type: "image",
                text: "",
                image: n.image,
                style: {
                    left: r.windowWidth * i.x,
                    top: r.windowHeight * i.y,
                    width: r.windowWidth * i.width,
                    height: r.windowHeight * i.height,
                    opacity: 1
                }
            }), e.userInfoButton.onTap(function(e) {
                t(e);
            });
        });
    }, e.userInfoHide = function() {
        e.userInfoButton && e.userInfoButton.hide();
    }, e.userInfoShow = function() {
        e.userInfoButton && e.userInfoButton.show();
    }, e.userInfoDestroy = function() {
        e.userInfoButton && e.userInfoButton.destroy(), e.userInfoButton = null;
    }, e.loadSubpackage = function(e) {
        return new Promise(function(n, t) {
            n(e);
            // if (null == e.pkgName) return zs.log.warn("方法（ loadSubpackage ）缺少必要参数（ pkgName ）", "Platform"), 
            // t();
            // var o = wx.loadSubpackage({
            //     name: e.pkgName,
            //     success: function(e) {
            //         n(e);
            //     },
            //     fail: function(e) {
            //         t(e);
            //     }
            // });
            // o ? e.progressHandler && o.onProgressUpdate(function(e) {
            //     progressHandler.runWith(e.progress);
            // }) : t();
        });
    }, e.onVideoErrorHandler = function(n) {
        console.log("视频展示错误", n), e.videoErrorHandler && e.videoErrorHandler(n);
    }, e.onVideoCloseHandler = function(n) {
        n && n.isEnded || null == n ? e.videoCloseHandler && e.videoCloseHandler(!0) : e.videoCloseHandler && e.videoCloseHandler(!1);
    }, e.initVideo = function() {
        if (null == e.videoIds) {
            e.videoIds = [];
            for (var n = [ zs.product.get("zs_video_adunit"), zs.product.get("zs_video_adunit1"), zs.product.get("zs_video_adunit2") ]; n.length > 0; ) {
                var t = n.shift();
                null != t && "" != t && e.videoIds.push(t);
            }
        }
        if (!(null == e.videoIds || e.videoIds.length <= 0)) {
            var o = new Date().getTime();
            if (null != e.videoWait && o - e.videoWait < 3e4) return console.log("暂停拉取视频中！"), 
            void (e.videoLoaded = !1);
            e.videoWait = null;
            var r = e.videoIds[e.videoIdx % e.videoIds.length];
            if (null == r || r.length <= 0) return zs.log.warn("方法（ initVideo ）缺少必要参数（ id ）", "Platform"), 
            void (e.videoAd = null);
            e.videoId = r, e.videoAd = wx.createRewardedVideoAd({
                adUnitId: r
            }), e.videoAd && (e.videoAd.offError(e.onVideoErrorHandler), e.videoAd.offClose(e.onVideoCloseHandler), 
            e.videoAd.onError(e.onVideoErrorHandler), e.videoAd.onClose(e.onVideoCloseHandler));
            var i = !1;
            e.videoAd.load().then(function() {
                i || (console.log("加载视频成功"), e.videoLoaded = !0);
            }).catch(function() {
                i = !0, console.log("加载视频失败"), e.videoAd = null, zs.log.warn("拉取不到视频数据，暂停拉取"), e.videoWait = o;
            });
        }
    }, e.resetVideo = function() {
        e.videoErrorHandler = null, e.videoCloseHandler = null, e.videoAd && (e.videoAd.destroy(), 
        e.videoAd = null), e.videoLoaded = !1, e.videoIdx++, e.videoWait = new Date().getTime();
    }, e.playVideo = function(n, t) {
        return console.log("播放激励视频"), null == e.videoAd && e.initVideo(), new Promise(function(n, t) {
            if (null == e.videoAd) return t(null);
            if (!e.videoLoaded) return console.error("视频广告未准备好！"), t(null);
            e.videoCloseHandler = function(e) {
                n(e);
            }, e.videoErrorHandler = function(e) {
                t(e);
            };
            var o = !1;
            e.videoAd.show().catch(function(n) {
                o = !0, e.videoAd = null, e.resetVideo(), t();
            }).then(function() {
                o || console.log("视频广告展示成功！");
            });
        });
    }, e.isVideoEnable = function() {
        return null != e.videoAd;
    }, e.initInsert = function(n) {
        if (null == n.id || n.id.length <= 0) return zs.log.warn("方法（ initInsert ）缺少必要参数（ id ）", "Platform"), 
        void (e.insertId = null);
        e.insertId = n.id, e.insertAd = wx.createInterstitialAd({
            adUnitId: n.id
        }), e.insertAd && (e.insertAd.onLoad(function() {
            console.log("插屏广告加载成功!");
        }), e.insertAd.onError(function(n) {
            null != e.insertAd && (e.insertAd.destroy(), e.insertAd = null), e.insertErrorHandler && e.insertErrorHandler(n);
        }), e.insertAd.onClose(function() {
            e.insertCloseHandler && e.insertCloseHandler();
        }));
    }, e.loadInsert = function(n) {
        null != n.closeHandler ? null != n.errorHandler ? (e.insertErrorHandler = n.errorHandler, 
        null != e.insertAd || (e.initInsert({
            id: e.insertId
        }), null != e.insertAd) ? (e.insertCloseHandler = n.closeHandler, e.insertAd.show().catch(function(n) {
            console.log("插屏广告播放失败！", n), e.insertErrorHandler && e.insertErrorHandler("插屏广告展示失败!");
        }).then(function(n) {
            console.log("插屏广告展示成功！", n), e.insertHanlder && (clearTimeout(e.insertHanlder), 
            e.insertHanlder = null);
        }), e.insertHanlder = setTimeout(function() {
            console.error("插屏广告展示超时!"), null != e.insertAd && (e.insertAd.destroy(), e.insertAd = null), 
            e.insertHanlder = null, e.insertErrorHandler && e.insertErrorHandler("插屏广告展示超时!");
        }, e.handlerTimeout)) : e.insertErrorHandler && e.insertErrorHandler("插屏广告创建失败!")) : zs.log.warn("方法（ loadInsert ）缺少必要参数（ errorHandler ）", "Platform") : zs.log.warn("方法（ loadInsert ）缺少必要参数（ closeHandler ）", "Platform");
    }, e.request = function(e) {
        if (null != e) if (null == e.url || e.url.length <= 0) zs.log.warn("方法（ request ）缺少必要参数（ url ）", "Platform"); else if (null != e.data) {
            if (null != e.method) {
                var n = {
                    "content-type": "application/json"
                };
                return e.header && (n = e.header), new Promise(function(t, o) {
                    wx.request({
                        url: e.url,
                        data: e.data,
                        timeout: e.timeout || 2e3,
                        header: n,
                        method: e.method,
                        success: function(e) {
                            t(e);
                        },
                        fail: function(e) {
                            o(e);
                        },
                        complete: function() {}
                    });
                });
            }
            zs.log.warn("方法（ request ）缺少必要参数（ method ）", "Platform");
        } else zs.log.warn("方法（ request ）缺少必要参数（ data ）", "Platform"); else zs.log.warn("原生网络请求没有参数传输错误");
    }, e.hasBanner = function() {
        // return zs.wx.banner.WxBannerMgr.Instance.wxbannerArray.length > 0;
    }, e.initBanner = function() {
        // zs.wx.banner.WxBannerMgr.Instance.setAdUnitId(zs.product.get("zs_banner_adunit"), zs.product.get("zs_banner_adunit2"), zs.product.get("zs_banner_adunit3"));
    }, e.showBanner = function(e) {
        // e ? zs.wx.banner.WxBannerMgr.Instance.showBanner(e.pos, e.size, e.empty) : zs.wx.banner.WxBannerMgr.Instance.showBanner(null, null, null);
    }, e.updateBanner = function(e) {
        // e ? zs.wx.banner.WxBannerMgr.Instance.checkBanner(e.isWait, e.pos, e.size, e.checkInit, e.empty) : zs.wx.banner.WxBannerMgr.Instance.checkBanner(null, null, null, null, null);
    }, e.checkBanner = function(n) {
        // if (zs.wx.banner.WxBannerMgr.Instance.hideAll(), n && n.data && n.data.banner) {
        //     var t = n.data.banner, o = !0;
        //     if (t.switch) if (Array.isArray(t.switch)) {
        //         for (var r = 0, i = t.switch.length; r < i; r++) if (!zs.product.get(t.switch[r])) {
        //             o = !1;
        //             break;
        //         }
        //     } else zs.product.get(t.switch) || (o = !1);
        //     if (o && (t.delay || t.auto || t.checkInit)) {
        //         var a = t.delay || 0 == t.auto;
        //         zs.wx.banner.WxBannerMgr.Instance.checkBanner(a, t.pos, t.size, t.checkInit, t.empty), 
        //         t.delay && (zs.product.get("zs_banner_banner_time") ? e.delayBanner = setTimeout(function() {
        //             zs.wx.banner.WxBannerMgr.Instance.showBanner(t.pos, t.size, t.empty);
        //         }, zs.product.get("zs_banner_banner_time")) : zs.wx.banner.WxBannerMgr.Instance.showBanner(t.pos, t.size, t.empty));
        //     }
        // }
    }, e.hideBanner = function() {
        // zs.wx.banner.WxBannerMgr.Instance.hideAll(), e.delayBanner && clearTimeout(e.delayBanner), 
        e.delayBanner = null;
    }, e.clearDelayBanner = function() {
        // e.delayBanner && clearTimeout(e.delayBanner), e.delayBanner = null;
    }, e.navigateToOther = function(e) {
        return new Promise(function(n, t) {
            null == e.appInfo && (zs.log.warn("方法（ navigateToOther ）缺少必要参数（ appInfo ）", "Platform"), 
            t());
            var o = e.appInfo, r = null;
            o.link_path ? r = o.link_path : o.imgs && o.imgs[o.img_index] && (r = o.imgs[o.img_index].link), 
            null != r && "" != r || (r = "pages/index/index"), wx.navigateToMiniProgram({
                appId: o.appid,
                path: r,
                extraData: o.extraData || {},
                success: function(e) {
                    n(e);
                },
                fail: function(e) {
                    t(e);
                },
                complete: function(e) {}
            });
        });
    }, e.recorderStart = function() {
        if ("function" == typeof wx.getGameRecorder) {
            var n = wx.getGameRecorder(), t = n.isFrameSupported();
            zs.log.debug("是否支持录制游戏画面", t), t && (e.initRecorder || (e.initRecorder = !0, n.on("start", function() {
                e.recoding = !0, e.recorderTime = Date.now();
            }), n.on("stop", function(n) {
                e.recoding = !1, e.recorderTime = Date.now() - e.recorderTime;
            })), n.start());
        }
    }, e.recorderStop = function() {
        wx && e.recoding || reject(), "function" == typeof wx.getGameRecorder && wx.getGameRecorder().stop();
    }, e.recorderPause = function() {
        wx && e.recoding || reject(), "function" == typeof wx.getGameRecorder && wx.getGameRecorder().pause();
    }, e.recorderResume = function() {
        wx && e.recoding || reject(), "function" == typeof wx.getGameRecorder && wx.getGameRecorder().resume();
    }, e.recorderCreate = function(n) {
        if (null != n.data) if (wx && "function" == typeof wx.createGameRecorderShareButton) {
            e.stopRecorder();
            var t = wx.getSystemInfoSync(), o = n.data;
            e.shareRecorderButton = wx.createGameRecorderShareButton({
                style: {
                    left: .5 * t.windowWidth - 65,
                    top: t.windowHeight * (o.percentY || .7) - 20,
                    height: 40
                },
                text: o.btnText || "分享录屏",
                share: {
                    query: o.query || "",
                    bgm: o.bgm || "",
                    timeRange: [ [ 0, 15e3 ] ],
                    button: {
                        template: o.buttonType || "challenge"
                    },
                    title: {
                        template: o.titleType || "default.level",
                        data: o.score
                    }
                }
            }), e.shareRecorderButton.show(), e.shareRecorderButton.onTap(function(e) {
                o.successHandler && o.successHandler.runWith(e);
            });
        } else zs.load.warn("该设备不支持分享录屏功能"); else zs.log.warn("方法（ recorderCreate ）缺少必要参数（ data ）", "Platform");
    }, e.recorderHide = function() {
        e.shareRecorderButton && e.shareRecorderButton.hide();
    }, e.canShareRecorder = function() {
        return e.recorderTime > 0;
    }, e.statusBarHeight = function() {
        return e.systemInfo ? e.systemInfo.statusBarHeight : 0;
    }, e.screenWidth = function() {
        return e.systemInfo ? e.systemInfo.screenWidth : 1;
    }, e.screenHeight = function() {
        return e.systemInfo ? e.systemInfo.screenHeight : 1;
    }, e.vibrate = function(e) {
        e && e.isLong ? wx.vibrateLong({
            fail: function() {
                zs.log.debug("Vibrate Long failed");
            }
        }) : wx.vibrateShort({
            fail: function() {
                zs.log.debug("vibrate Short failed");
            }
        });
    }, e.isNetValid = function() {
        return !0;
    }, e.addEventShow = function(e) {
        wx.onShow(function(n) {
            e.showHandler && e.showHandler(n);
        });
    }, e.addEventHide = function(n) {
        wx.onHide(function(t) {
            var o = null, r = 0, i = "";
            if (9 == t.targetAction) if (zs.exporter.utils.behaviorExport) {
                var a = zs.exporter.utils.readyExport;
                a && zs.exporter.dataMgr.collectExport(a.target, a.icon, a.group, a.img), o = zs.exporter.utils.behaviorExport.event_id, 
                zs.exporter.utils.behaviorExport = null, zs.exporter.utils.readyExport = null, r = "1";
            } else e.bannerCount++, o = zs.utils.getEventCode("banner-" + e.bannerCount), r = "2"; else e.hideCount++, 
            o = zs.utils.getEventCode("hide-" + e.hideCount), r = "4";
            null != o && (i = t.targetPagePath, zs.network.behavior(o, r, i), n.hideHandler && n.hideHandler(t));
        });
    }, e.showCustomAd = function(n) {
        if (null != n.id) {
            if (e.customAdList[n.id] && e.customAdList[n.id].ad) e.customAdList[n.id].ad.isShow() ? console.log("🐢原生正在展示中") : e.customAdList[n.id].ad.show(); else if (wx && wx.createCustomAd && n.id) {
                var t = zs.product.get(n.id);
                if (t && "" != t) {
                    null == n.width && (n.width = 72), null == n.height && (n.height = 72);
                    var o = wx.getSystemInfoSync(), r = 0;
                    null != n.left ? r = n.left * o.windowWidth / Laya.stage.width : null != n.right ? r = (Laya.stage.width - n.right) * o.windowWidth / Laya.stage.width - n.width : null != n.centerX && (r = (Laya.stage.width / 2 + n.centerX) * o.windowWidth / Laya.stage.width - n.width / 2);
                    var i = 0;
                    null != n.top ? i = n.top * o.windowHeight / Laya.stage.height : null != n.bottom ? i = (Laya.stage.height - n.bottom) * o.windowHeight / Laya.stage.height - n.height : null != n.centerY && (i = (Laya.stage.height / 2 + n.centerY) * o.windowHeight / Laya.stage.height - n.height / 2);
                    var a = 30;
                    n && n.interval && (a = n.interval);
                    var s = wx.createCustomAd({
                        adUnitId: t,
                        adIntervals: a,
                        style: {
                            left: r,
                            top: i,
                            fixed: !0
                        }
                    });
                    s ? (e.customAdList[n.id] = {}, e.customAdList[n.id].ad = s, s.onLoad(function() {
                        e.customAdList[n.id].adLoaded = !0;
                    }), e.hideCustom = !1, s.show().then(function() {
                        console.log("🐢原生调用了展示"), e.hideCustom && e.hideCustomAd();
                    })) : console.log("🐢???哦豁,咋没得对象了");
                }
            }
        } else zs.log.warn("方法（ showCustomAd ）缺少必要参数（ id ）", "Platform");
    }, e.hideCustomAd = function() {
        for (var n in e.customAdList) e.customAdList[n] && e.customAdList[n].ad && e.customAdList[n].ad.hide();
        e.hideCustom = !0, console.log("🐢原生调用了隐藏");
    }, e;
}());