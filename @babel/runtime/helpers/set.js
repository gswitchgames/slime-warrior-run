!function (){
    var getPrototypeOf = require("./getPrototypeOf"), superPropBase = require("./superPropBase"), defineProperty = require("./defineProperty");

function set(e, r, t, o) {
    console.log("-------------------set1--------------------------");
    return (set = "undefined" != typeof Reflect && Reflect.set ? Reflect.set : function(e, r, t, o) {
        var i, f = superPropBase(e, r);
        if (f) {
            if ((i = Object.getOwnPropertyDescriptor(f, r)).set) return i.set.call(o, t), !0;
            if (!i.writable) return !1;
        }
        if (i = Object.getOwnPropertyDescriptor(o, r)) {
            if (!i.writable) return !1;
            i.value = t, Object.defineProperty(o, r, i);
        } else defineProperty(o, r, t);
        return !0;
    })(e, r, t, o);
}

function _set(e, r, t, o, i) {
    if (!set(e, r, t, o || e) && i) throw new Error("failed to set property");
    return t;
}

//console.log("-------------------set2--------------------------");
module._set = _set;
//console.log("-------------------set3--------------------------");
}()
