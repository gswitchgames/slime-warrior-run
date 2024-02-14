var e, a, m = require("../../@babel/runtime/helpers/interopRequireDefault"), t = m(require("../../@babel/runtime/helpers/classCallCheck")), _ = m(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, e = window.zs = window.zs || {}, (a = function() {
    function e() {
        (0, t.default)(this, e);
    }
    return (0, _.default)(e, null, [ {
        key: "init",
        value: function() {
            this.markGameNum(), this.markAwardNum(), this.markReadyNum();
        }
    }, {
        key: "markGameNum",
        value: function(a) {
            var m = zs.utils.getItem(e.key_game_num_time_stamp);
            null != m && "" != m && 0 != zs.utils.isToday(Number(m)) || (zs.utils.setItem(e.key_game_num_time_stamp, Date.now().toString()), 
            zs.utils.setItem(e.key_game_num, "1")), e.day_game_num = zs.utils.getItem(e.key_game_num) || 1, 
            e.day_game_num = a ? Number(e.day_game_num) + 1 : Number(e.day_game_num), zs.utils.setItem(e.key_game_num, e.day_game_num.toString());
        }
    }, {
        key: "markAwardNum",
        value: function(a) {
            var m = zs.utils.getItem(e.key_award_num_time_stamp);
            null != m && "" != m && 0 != zs.utils.isToday(Number(m)) || (zs.utils.setItem(e.key_award_num_time_stamp, Date.now().toString()), 
            zs.utils.setItem(e.key_award_num, "1")), e.open_award_num = zs.utils.getItem(e.key_award_num) || 1, 
            e.open_award_num = a ? Number(e.open_award_num) + 1 : Number(e.open_award_num), 
            zs.utils.setItem(e.key_award_num, e.open_award_num.toString());
        }
    }, {
        key: "markReadyNum",
        value: function(a) {
            var m = zs.utils.getItem(e.key_ready_num_time_stamp);
            null != m && "" != m && 0 != zs.utils.isToday(Number(m)) || (zs.utils.setItem(e.key_ready_num_time_stamp, Date.now().toString()), 
            zs.utils.setItem(e.key_ready_num, "1")), e.open_ready_num = zs.utils.getItem(e.key_ready_num) || 1, 
            e.open_ready_num = a ? Number(e.open_ready_num) + 1 : Number(e.open_ready_num), 
            zs.utils.setItem(e.key_ready_num, e.open_ready_num.toString());
        }
    }, {
        key: "checkEggOpen",
        value: function(a) {
            if (!e.switch) return !1;
            var m = zs.product.get("zs_click_award_since");
            if (m && m > 0 && (!e.day_game_num || Number(e.day_game_num) < m)) return !1;
            var t = a ? zs.product.get("zs_ready_click_num") : zs.product.get("zs_click_award_num");
            if (!t || "" == t.trim()) return !1;
            if (t = JSON.parse(t), Array.isArray(t)) {
                if (t.length <= 0) return !1;
                if (0 == t.length && t[0] < 0) return !0;
                if (t.indexOf(e.day_game_num) >= 0) return !0;
            } else {
                if (t = parseInt(t), isNaN(t)) return !1;
                if (t < 0) return !0;
                if (t > (a ? e.open_ready_num : e.open_award_num)) return !0;
            }
            return !1;
        }
    } ]), e;
}()).switch = !0, a.key_game_num = "day_game_num", a.key_award_num = "open_award_num", 
a.key_ready_num = "open_ready_num", a.key_award_num_time_stamp = "open_award_num_time_stamp", 
a.key_ready_num_time_stamp = "open_ready_num_time_stamp", a.key_game_num_time_stamp = "game_num_time_stamp", 
a.open_award_num = 0, a.open_ready_num = 0, a.day_game_num = 0, e.EggKnock = a;