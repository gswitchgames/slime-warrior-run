var t = require("../../@babel/runtime/helpers/interopRequireDefault"), 
classCallCheck = t(require("../../@babel/runtime/helpers/classCallCheck")), 
n = t(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, (window.zs = window.zs || {}).fsm = function() {
    function t() {
        (0, classCallCheck.default)(this, t);
    }
    return (0, n.default)(t, [ {
        key: "init",
        value: function(t, i) {
            this.current = t || this.defaultState, this.target = null, this.current && (this.onChanged && this.onChanged.runWith(this.current), 
            (i || this.defaultAuto) && this.runNext());
        }
    }, {
        key: "getState",
        value: function(t, i) {
            return null == this.list[t] ? null : this.list[t][i];
        }
    }, {
        key: "registe",
        value: function(t, i, n, e, r, s, l, u) {
            if (null == this.list[t] && (this.list[t] = {}), e) for (var h in this.list[t]) this.list[t][h].auto = null;
            return null == r && (r = this), s || (s = function(t) {
                t.run();
            }), this.list[t][i] = {
                priority: n || 0,
                thisObj: r,
                transition: s,
                condition: l,
                auto: e,
                canBreak: u
            }, this;
        }
    }, {
        key: "setDefault",
        value: function(t, i) {
            return this.defaultState = t, this.defaultAuto = i, this;
        }
    }, {
        key: "unregiste",
        value: function(t, i) {
            return null != this.list[t] && null != this.list[t][i] && delete this.list[t][i], 
            this;
        }
    }, {
        key: "runTransition",
        value: function(t) {
            if (null == this.current || this.current.length <= 0) return !1;
            var i = this.list[this.current];
            if (null == i) return !1;
            if (null != this.target && null != i) {
                var n = i[this.target];
                if (null != n && !n.canBreak) return !1;
            }
            var e = i[t];
            return !(null == e || null == e.thisObj || e.condition && !e.condition.call(e.thisObj) || (this.target = t, 
            zs.log.debug("runTransition: " + this.current + " - " + this.target), this.onBeforeChange && this.onBeforeChange.runWith([ this.target, this.current ]), 
            e.transition.call(e.thisObj, zs.Handler.create(this, this.onTransitionComplete)), 
            0));
        }
    }, {
        key: "runNext",
        value: function() {
            if (null == this.current || this.current.length <= 0) return null;
            var t = this.list[this.current];
            if (null == t) return null;
            if (null != this.target && null != t) {
                var i = t[this.target];
                if (null != i && !i.canBreak) return null;
            }
            var n = [], e = [];
            for (var r in t) {
                for (var s = t[r], l = !1, u = 0, h = e.length; u < h; u++) if (s.priority > e[u].priority) {
                    n.splice(u, 0, r), e.splice(u, 0, s), l = !0;
                    break;
                }
                l || (n.push(r), e.push(s));
            }
            for (var a = 0, o = n.length; a < o; a++) {
                var c = e[a];
                if (null != c.thisObj && (!c.condition || c.condition.call(c.thisObj))) return this.target = n[a], 
                zs.log.debug("runNext: " + this.current + " - " + this.target), 
                this.onBeforeChange && this.onBeforeChange.runWith([ this.target, this.current ]), 
                // console.error(this.target, this.current),
                c.transition.call(c.thisObj, zs.Handler.create(this, this.onTransitionComplete));
                n[a];
            }
            return null;
        }
    }, {
        key: "onTransitionComplete",
        value: function() {
            this.current = this.target, this.target = null;
            var t = this.list[this.current];
            if (null != t) for (var i in t) if (t[i].auto) {
                console.log(i);
                this.runTransition(i);
                break;
            }
            console.log(this.current);
            this.onChanged && this.onChanged.runWith(this.current);
        }
    }, {
        key: "list",
        get: function() {
            return null == this._list && (this._list = {}), this._list;
        }
    } ]), t;
}();