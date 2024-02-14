var i, s = require("../../@babel/runtime/helpers/interopRequireDefault"), e = s(require("../../@babel/runtime/helpers/classCallCheck")), t = s(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, window.zs.base = window.zs.base || {}, i = function() {
    function i(s, t, r) {
        var n = this;
        (0, e.default)(this, i), this.thisArg = t, s.prototype instanceof zs.proxy.NativeLoading ? (this.loading = s.make(), 
        this.loading.init(), r.call(t), zs.Timer.inst.frameLoop(1, this, this.onProgress)) : this.window = zs.fgui.window.create().attach(s).fit().update(s, function(i) {
            n.loading = i, r.call(t), zs.Timer.inst.frameLoop(1, n, n.onProgress);
        }).show();
    }
    return (0, t.default)(i, [ {
        key: "onProgress",
        value: function() {
            if ((!this.loading || this.loading.run(this.thisArg.progress || 0)) && this.thisArg.readyStart) {
                if (this.thisArg.start(), zs.Timer.inst.clear(this, this.onProgress), this.loading && this.loading instanceof zs.proxy.NativeLoading) {
                    var i = this.loading.owner;
                    i.removeSelf(), this.loading.destroy(), i.destroy();
                }
                this.window && this.window.dispose();
            }
        }
    }, {
        key: "progress",
        get: function() {
            return null == this.loading ? 0 : this.loading.current;
        }
    } ], [ {
        key: "init",
        value: function(s, e, t) {
            return new i(s, e, t);
        }
    } ]), i;
}(), (window.zs.base = window.zs.base || {}).entry = i;