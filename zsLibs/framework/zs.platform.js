!function(){
var e, r, n, o, t, a, 
i = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/classCallCheck"));

window.zs = window.zs || {}, 
window.zs.platform = window.zs.platform || {}, e = window.zs.platform = window.zs.platform || {}, 
r = window.platform, 
n = [ "share", "userInfoHide", "userInfoShow", "userInfoDestroy", "initVideo", "isVideoEnable", "initInsert", "loadInsert", "hasBanner", "nextBanner", "createBanner", "initBanner", "checkBanner", "clearDelayBanner", "showBanner", "updateBanner", "hideBanner", "recorderStart", "recorderStop", "recorderPause", "recorderResume", "recorderCreate", "recorderHide", "canShareRecorder", "statusBarHeight", "screenWidth", "screenHeight", "vibrate", "isNetValid", "addEventShow", "addEventHide", "recorderClip", "recorderShare", "showFavoriteGuide", "setDefaultShare", "updateReviveTypeInfo", "setNativeLastShowTime", "initNativeAd", "sendReqAdShowReport", "sendReqAdClickReport", "reportNativeAdClick", "initGamePortalAd", "showToast", "getLaunchOptions", "getScene", "showInsertAd", "initBannerId", "showOnePixelBanner", "showShareMenu", "openShare", "getReadSetting", "playSound", "initAppBox", "showAppBox", "checkBlockAd", "showBlockAd", "hideBlockAd", "destroyInsertAd", "pauseSound", "getAdPos", "showCustomAd", "hideCustomAd", "hideGamePortalAd" ], 
o = [ "login", "getLoginParams", "playVideo", "setCloudStorage", "getCloudStorage", "userInfoCreate", "navigateToOther", "loadSubpackage", "getUserInfo", "openAwemeUserProfile", "checkFollowAwemeState", "loadNativeAd", "isBeforeGameAccount", "getAdReporteStatus", "showGamePortalAd", "hasDesktopIcon", "createDesktopIcon", "getNetworkType", "shareRecorderVideo", "showMoreGamesModalSimple", "showInterstitialAd" ], 
t = function e() {
    (0, i.default)(this, e);
}, a = function e() {
    (0, i.default)(this, e);
}, e.init = function() {
    
    // for (var e in r && r.init()
    // , r) {
    //     var i = r[e];
    //     null != i && "function" == typeof i && (o.indexOf(e) >= 0 ? t[e] = r[e] : a[e] = r[e]);
    // }
    for (var s = function(e, r) {
        var o = n[e];
        if (null == a[o]) switch (o) {
          case "updateBanner":
          case "showBanner":
            // a[o] = function(e) {
            //     return zs.core.workflow.showPreviewBanner(e), null;
            // };
            break;

          case "checkBanner":
            // a[o] = function(e) {
            //     if (zs.core.workflow.hidePreviewBanner(), !e || !e.data || !e.data.banner) return null;
            //     var r = e.data.banner, n = !0;
            //     if (r.switch) if (Array.isArray(r.switch)) {
            //         for (var o = 0, t = r.switch.length; o < t; o++) if (!zs.product.get(r.switch[o])) {
            //             n = !1;
            //             break;
            //         }
            //     } else zs.product.get(r.switch) || (n = !1);
            //     if (!n || !r.delay && !r.auto && !r.checkInit) return null;
            //     var a = r.delay || 0 == r.auto;
            //     return zs.core.workflow.showPreviewBanner({
            //         pos: r.pos,
            //         size: r.size,
            //         isWait: a,
            //         checkInit: r.checkInit
            //     }), r.delay && (zs.product.get("zs_banner_banner_time") ? zs.platform.delayBanner = setTimeout(function() {
            //         zs.core.workflow.showPreviewBanner({
            //             pos: r.pos,
            //             size: r.size
            //         });
            //     }, zs.product.get("zs_banner_banner_time")) : zs.core.workflow.showPreviewBanner({
            //         pos: r.pos,
            //         size: r.size
            //     })), null;
            // };
            // break;

          case "hideBanner":
            a[o] = function() {
                // return zs.core.workflow.hidePreviewBanner(), null;
            };
            break;

          default:
            a[o] = function() {
                return  console.log("Sync方法 " + o + " 在当前平台不存在", "Platform"), null;
            };
        }
    }, d = 0, c = n.length; d < c; d++) s(d);
    for (var l = function(e, r) {
        var n = o[e];
        if (null == t[n]) switch (n) {
          case "playVideo":
            t[n] = function() {
                return new Promise(function(e, r) {
              
                   console.log("Async方法 " + n + " 在当前平台不存在", "Platform"), e(!0);
                });
            };
            break;

          default:
            t[n] = function() {
                return new Promise(function(e, r) {
                    console.log("Async方法 " + n + " 在当前平台不存在", "Platform"), r();
                });
            };
        }
    }, u = 0, w = o.length; u < w; u++) l(u);
}, e.initAds = function(e) {
    // r && r.initAds(e);
}, e.proxy = r, e.async = t, e.sync = a;
}();