var o = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/classCallCheck"));

window.zs = window.zs || {}, window.zs.log = window.zs.log || {}, function(e) {
    var l;
    !function(o) {
        o[o.DEBUG = 0] = "DEBUG", o[o.INFO = 1] = "INFO", o[o.WARN = 2] = "WARN", o[o.ERROR = 3] = "ERROR", 
        o[o.FATAL = 4] = "FATAL";
    }(l = l || (l = {}));
    var r = function e() {
        (0, o.default)(this, e);
    };
    function n(o, e, n, c) {
        var i = "";
        null == n && (n = l.INFO)
        // if (!(r.logLevel > n)) {
            var a = "#000";
            switch (n) {
              case l.DEBUG:
                i = "[DEBUG] ", a = r.color_Debug;
                break;

              case l.INFO:
                i = "[INFO] ", a = r.color_Info;
                break;

              case l.WARN:
                i = "[WARN] ", a = r.color_Warn;
                break;

              case l.ERROR:
                i = "[ERROR] ", a = r.color_Error;
                break;

              case l.FATAL:
                i = "[FATAL] ", a = r.color_Fatal;
            }
            if (e && e.length > 0 && (i += "<" + e + "> "), i += o, r.logTime) {
                // var t = new Date(), s = "    " + t.getFullYear() + "-" + t.getMonth() + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
                // r.logMilliseconds && (s = s + ":" + t.getMilliseconds()), i += s;
            }
            if (c ? console.log("%c " + i, "color:" + a, c) : console.log("%c " + i, "color:" + a), 
            n == l.FATAL && r.fatalThrow) throw new Error(i);
        // }
    }
    r.logLevel = l.INFO, r.logTime = !0, r.logMilliseconds = !1, r.fatalThrow = !1, 
    r.color_Debug = "#08f", r.color_Info = "#000", r.color_Warn = "#f80", r.color_Error = "#f00", 
    r.color_Fatal = "#900", e.Level = l, e.Configs = r, e.log = n, e.debug = function(o, e, r) {
        n(o, e, l.DEBUG, r);
    }, e.info = function(o, e, r) {
        n(o, e, l.INFO, r);
    }, e.warn = function(o, e, r) {
        n(o, e, l.WARN, r);
    }, e.error = function(o, e, r) {
        n(o, e, l.ERROR, r);
    }, e.fatal = function(o, e, r) {
        n(o, e, l.FATAL, r);
    };
}(window.zs.log = window.zs.log || {});