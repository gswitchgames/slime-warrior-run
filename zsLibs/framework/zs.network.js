var e = require("../../@babel/runtime/helpers/interopRequireDefault"), 

regenerator = e(require("../../@babel/runtime/regenerator")), 
r = e(require("../../@babel/runtime/helpers/asyncToGenerator")), 
classCallCheck = e(require("../../@babel/runtime/helpers/classCallCheck")), a = e(require("../../@babel/runtime/helpers/createClass"));

window.zs = window.zs || {}, function(e) {
    var o;
    !function(e) {
        e[e.Local = 0] = "Local", e[e.Async = 1] = "Async", e[e.Sync = 2] = "Sync";
    }(o = o || (o = {}));
    var i = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        return (0, a.default)(e, null, [ {
            key: "rotateLeft",
            value: function(e, t) {
                return e << t | e >>> 32 - t;
            }
        }, {
            key: "addUnsigned",
            value: function(e, t) {
                var r, n, a, o, i;
                return a = 2147483648 & e, o = 2147483648 & t, i = (1073741823 & e) + (1073741823 & t), 
                (r = 1073741824 & e) & (n = 1073741824 & t) ? 2147483648 ^ i ^ a ^ o : r | n ? 1073741824 & i ? 3221225472 ^ i ^ a ^ o : 1073741824 ^ i ^ a ^ o : i ^ a ^ o;
            }
        }, {
            key: "F",
            value: function(e, t, r) {
                return e & t | ~e & r;
            }
        }, {
            key: "G",
            value: function(e, t, r) {
                return e & r | t & ~r;
            }
        }, {
            key: "H",
            value: function(e, t, r) {
                return e ^ t ^ r;
            }
        }, {
            key: "I",
            value: function(e, t, r) {
                return t ^ (e | ~r);
            }
        }, {
            key: "FF",
            value: function(e, t, r, n, a, o, i) {
                return e = this.addUnsigned(e, this.addUnsigned(this.addUnsigned(this.F(t, r, n), a), i)), 
                this.addUnsigned(this.rotateLeft(e, o), t);
            }
        }, {
            key: "GG",
            value: function(e, t, r, n, a, o, i) {
                return e = this.addUnsigned(e, this.addUnsigned(this.addUnsigned(this.G(t, r, n), a), i)), 
                this.addUnsigned(this.rotateLeft(e, o), t);
            }
        }, {
            key: "HH",
            value: function(e, t, r, n, a, o, i) {
                return e = this.addUnsigned(e, this.addUnsigned(this.addUnsigned(this.H(t, r, n), a), i)), 
                this.addUnsigned(this.rotateLeft(e, o), t);
            }
        }, {
            key: "II",
            value: function(e, t, r, n, a, o, i) {
                return e = this.addUnsigned(e, this.addUnsigned(this.addUnsigned(this.I(t, r, n), a), i)), 
                this.addUnsigned(this.rotateLeft(e, o), t);
            }
        }, {
            key: "convertToWordArray",
            value: function(e) {
                for (var t, r = e.length, n = r + 8, a = 16 * ((n - n % 64) / 64 + 1), o = Array(a - 1), i = 0, s = 0; s < r; ) i = s % 4 * 8, 
                o[t = (s - s % 4) / 4] = o[t] | e.charCodeAt(s) << i, s++;
                return i = s % 4 * 8, o[t = (s - s % 4) / 4] = o[t] | 128 << i, o[a - 2] = r << 3, 
                o[a - 1] = r >>> 29, o;
            }
        }, {
            key: "wordToHex",
            value: function(e) {
                var t, r = "", n = "";
                for (t = 0; t <= 3; t++) r += (n = "0" + (e >>> 8 * t & 255).toString(16)).substr(n.length - 2, 2);
                return r;
            }
        }, {
            key: "uTF8Encode",
            value: function(e) {
                e = e.replace(/\x0d\x0a/g, "\n");
                for (var t = "", r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r);
                    n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192), 
                    t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224), 
                    t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
                }
                return t;
            }
        }, {
            key: "md5",
            value: function(e) {
                var t, r, n, a, o, i, s, u, c, d = Array();
                for (e = this.uTF8Encode(e), d = this.convertToWordArray(e), i = 1732584193, s = 4023233417, 
                u = 2562383102, c = 271733878, t = 0; t < d.length; t += 16) r = i, n = s, a = u, 
                o = c, i = this.FF(i, s, u, c, d[t + 0], 7, 3614090360), c = this.FF(c, i, s, u, d[t + 1], 12, 3905402710), 
                u = this.FF(u, c, i, s, d[t + 2], 17, 606105819), s = this.FF(s, u, c, i, d[t + 3], 22, 3250441966), 
                i = this.FF(i, s, u, c, d[t + 4], 7, 4118548399), c = this.FF(c, i, s, u, d[t + 5], 12, 1200080426), 
                u = this.FF(u, c, i, s, d[t + 6], 17, 2821735955), s = this.FF(s, u, c, i, d[t + 7], 22, 4249261313), 
                i = this.FF(i, s, u, c, d[t + 8], 7, 1770035416), c = this.FF(c, i, s, u, d[t + 9], 12, 2336552879), 
                u = this.FF(u, c, i, s, d[t + 10], 17, 4294925233), s = this.FF(s, u, c, i, d[t + 11], 22, 2304563134), 
                i = this.FF(i, s, u, c, d[t + 12], 7, 1804603682), c = this.FF(c, i, s, u, d[t + 13], 12, 4254626195), 
                u = this.FF(u, c, i, s, d[t + 14], 17, 2792965006), s = this.FF(s, u, c, i, d[t + 15], 22, 1236535329), 
                i = this.GG(i, s, u, c, d[t + 1], 5, 4129170786), c = this.GG(c, i, s, u, d[t + 6], 9, 3225465664), 
                u = this.GG(u, c, i, s, d[t + 11], 14, 643717713), s = this.GG(s, u, c, i, d[t + 0], 20, 3921069994), 
                i = this.GG(i, s, u, c, d[t + 5], 5, 3593408605), c = this.GG(c, i, s, u, d[t + 10], 9, 38016083), 
                u = this.GG(u, c, i, s, d[t + 15], 14, 3634488961), s = this.GG(s, u, c, i, d[t + 4], 20, 3889429448), 
                i = this.GG(i, s, u, c, d[t + 9], 5, 568446438), c = this.GG(c, i, s, u, d[t + 14], 9, 3275163606), 
                u = this.GG(u, c, i, s, d[t + 3], 14, 4107603335), s = this.GG(s, u, c, i, d[t + 8], 20, 1163531501), 
                i = this.GG(i, s, u, c, d[t + 13], 5, 2850285829), c = this.GG(c, i, s, u, d[t + 2], 9, 4243563512), 
                u = this.GG(u, c, i, s, d[t + 7], 14, 1735328473), s = this.GG(s, u, c, i, d[t + 12], 20, 2368359562), 
                i = this.HH(i, s, u, c, d[t + 5], 4, 4294588738), c = this.HH(c, i, s, u, d[t + 8], 11, 2272392833), 
                u = this.HH(u, c, i, s, d[t + 11], 16, 1839030562), s = this.HH(s, u, c, i, d[t + 14], 23, 4259657740), 
                i = this.HH(i, s, u, c, d[t + 1], 4, 2763975236), c = this.HH(c, i, s, u, d[t + 4], 11, 1272893353), 
                u = this.HH(u, c, i, s, d[t + 7], 16, 4139469664), s = this.HH(s, u, c, i, d[t + 10], 23, 3200236656), 
                i = this.HH(i, s, u, c, d[t + 13], 4, 681279174), c = this.HH(c, i, s, u, d[t + 0], 11, 3936430074), 
                u = this.HH(u, c, i, s, d[t + 3], 16, 3572445317), s = this.HH(s, u, c, i, d[t + 6], 23, 76029189), 
                i = this.HH(i, s, u, c, d[t + 9], 4, 3654602809), c = this.HH(c, i, s, u, d[t + 12], 11, 3873151461), 
                u = this.HH(u, c, i, s, d[t + 15], 16, 530742520), s = this.HH(s, u, c, i, d[t + 2], 23, 3299628645), 
                i = this.II(i, s, u, c, d[t + 0], 6, 4096336452), c = this.II(c, i, s, u, d[t + 7], 10, 1126891415), 
                u = this.II(u, c, i, s, d[t + 14], 15, 2878612391), s = this.II(s, u, c, i, d[t + 5], 21, 4237533241), 
                i = this.II(i, s, u, c, d[t + 12], 6, 1700485571), c = this.II(c, i, s, u, d[t + 3], 10, 2399980690), 
                u = this.II(u, c, i, s, d[t + 10], 15, 4293915773), s = this.II(s, u, c, i, d[t + 1], 21, 2240044497), 
                i = this.II(i, s, u, c, d[t + 8], 6, 1873313359), c = this.II(c, i, s, u, d[t + 15], 10, 4264355552), 
                u = this.II(u, c, i, s, d[t + 6], 15, 2734768916), s = this.II(s, u, c, i, d[t + 13], 21, 1309151649), 
                i = this.II(i, s, u, c, d[t + 4], 6, 4149444226), c = this.II(c, i, s, u, d[t + 11], 10, 3174756917), 
                u = this.II(u, c, i, s, d[t + 2], 15, 718787259), s = this.II(s, u, c, i, d[t + 9], 21, 3951481745), 
                i = this.addUnsigned(i, r), s = this.addUnsigned(s, n), u = this.addUnsigned(u, a), 
                c = this.addUnsigned(c, o);
                return (this.wordToHex(i) + this.wordToHex(s) + this.wordToHex(u) + this.wordToHex(c)).toLowerCase();
            }
        }, {
            key: "buildSign",
            value: function(e, t) {
                t = t || !0;
                for (var r = Object.keys(e).sort(), n = "", a = 0; a < r.length; a++) n += r[a] + ":" + e[r[a]];
                t && (n += zs.configs.gameCfg.secret);
                var o = this.md5(n);
                return o.toLowerCase();
            }
        } ]), e;
    }(), s = function() {
        function e() {
            (0, classCallCheck.default)(this, e);
        }
        var s, u, c, d, l, f, g, p, h;
        return (0, a.default)(e, null, [ {
            key: "encrypt",
            value: function(t) {
                var r = CryptoJS.enc.Utf8.parse(e.authorizationSecret), n = CryptoJS.enc.Utf8.parse(t);
                return CryptoJS.AES.encrypt(n, r, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }).toString();
            }
        }, {
            key: "decrypt",
            value: function(t) {
                var r = CryptoJS.enc.Utf8.parse(e.authorizationSecret), n = CryptoJS.AES.decrypt(t, r, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return CryptoJS.enc.Utf8.stringify(n).toString();
            }
        }, {
            key: "init",
            value: (h = (0, r.default)(regenerator.default.mark(function r() {
                var n, a, o, i, s;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (n = zs.configs.gameCfg, e.defaultData = n.network, n.skipRemote) {
                            t.next = 6;
                            break;
                        }
                        return t.next = 4, zs.resource.nativeLoad(n.remoteWebSettingURL || e.remoteWebSettingURL, null, !0).catch(function(e) {
                            return e;
                        });

                      case 4:
                        (a = t.sent) && (a.webDomains && (e.listDomain = a.webDomains), a.webApis && (a.webApis.ping && (e.mapWebApi.ping = a.webApis.ping), 
                        a.webApis.login && (e.mapWebApi.login = a.webApis.login), a.webApis.config && (e.mapWebApi.config = a.webApis.config), 
                        a.webApis.update && (e.mapWebApi.update = a.webApis.update), a.webApis.download && (e.mapWebApi.download = a.webApis.download)), 
                        a.exportDomainOld && (zs.exporter.dataMgr.URL = a.exportDomainOld), a.exportDomainNew && (zs.exporter.dataMgr.NEWURL = a.exportDomainNew)), 
                        zs.log.debug("remote webSetting", "Network", a);

                      case 6:
                        return t.next = 8, e.ping().catch(function(e) {
                            return e;
                        });

                      case 8:
                        if (t.t0 = "v2" == e.version, !t.t0) {
                            t.next = 12;
                            break;
                        }
                        return t.next = 12, e.authorization().catch(function(e) {
                            return e;
                        });

                      case 12:
                        if (o = {
                            user_id: 1,
                            user_type: 1,
                            update_time: Date.now(),
                            is_new: 0,
                            is_shielded: 0
                        }, !(e.domainIdx >= 0)) {
                            t.next = 28;
                            break;
                        }
                        if (!zs.platform.proxy) {
                            t.next = 25;
                            break;
                        }
                        return t.next = 17, zs.platform.async.getLoginParams().catch(function(e) {
                            return e;
                        });

                      case 17:
                        if (i = t.sent, t.t1 = i, !t.t1) {
                            t.next = 23;
                            break;
                        }
                        return zs.td.justTrack("后台登录", "后台登录"), t.next = 23, e.login(i).then(function(t) {
                            t.user_id ? (o = t, e.ready = !0, zs.log.debug("登陆成功：", "Network", t)) : zs.td.justTrack("后台登录失败", "后台登录失败");
                        }).catch(function(e) {
                            zs.td.justTrack("后台登录失败", "后台登录失败");
                        });

                      case 23:
                        t.next = 28;
                        break;

                      case 25:
                        return t.next = 27, e.login({
                            uid: "1"
                        }).then(function(t) {
                            t.user_id && (o = t, e.ready = !0, zs.log.debug("登陆成功：", "Network", t));
                        }).catch(function(e) {
                            return e;
                        });

                      case 27:
                        e.ready = !0;

                      case 28:
                        for (e.loginCode = "", s = 0; s < 3; s++) e.loginCode += zs.utils.randByte();
                        return t.abrupt("return", o);

                      case 31:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function() {
                return h.apply(this, arguments);
            })
        }, {
            key: "getUrl",
            value: function(t) {
                return e.domainIdx < 0 || e.domainIdx >= e.listDomain.length ? null : null == e.mapWebApi[t] ? (zs.log.error("非法网络接口： " + t, "Network"), 
                null) : e.listDomain[e.domainIdx] + "/" + e.version + "/" + e.mapWebApi[t];
            }
        }, {
            key: "obj2arg",
            value: function(e) {
                var t = [];
                for (var r in e) t.push(r + "=" + e[r]);
                return t.join("&");
            }
        }, {
            key: "post",
            value: 
            // (p = (0, r.default)(regenerator.default.mark(function r(n, a, o, i, s) {
            //     var u, c, d, l = this;
            //     return regenerator.default.wrap(function(t) {
            //         for (;;) switch (t.prev = t.next) {
            //           case 0:
            //             if (null == s && (s = 3), !zs.platform.proxy || !zs.platform.async.request) {
            //                 t.next = 4;
            //                 break;
            //             }
            //             return u = {
            //                 "content-type": "application/json"
            //             }, "v2" != e.version || "" == e.authorizationToken || (u = {
            //                 "content-type": "application/json",
            //                 authorization: e.authorizationToken
            //             }, i) || (c = JSON.stringify(a), d = e.encrypt(c), a._data = d), t.abrupt("return", new Promise(function(e, t) {
            //                 zs.log.debug("通讯请求：" + n, "Network", a), zs.td.justTrack("通讯请求", "通讯请求"), zs.platform.async.request({
            //                     url: n,
            //                     data: JSON.stringify(a),
            //                     timeout: o,
            //                     header: u,
            //                     method: "POST"
            //                 }).then(function(t) {
            //                     return zs.log.debug("请求成功：" + n, "Network", t), e(t.data.data);
            //                 }).catch(function(r) {
            //                     return s > 0 ? (zs.log.error("请求重试：" + n, "Network", r), l.post(n, a, o, i, --s).then(e).catch(t)) : (zs.td.justTrack("通讯请求失败", "通讯请求失败"), 
            //                     zs.log.error("请求失败：" + n, "Network", r), t(r));
            //                 });
            //             }));

            //           case 4:
            //             return t.abrupt("return", new Promise(function(t, r) {
            //                 var u = new XMLHttpRequest(), c = !1, d = !1;
            //                 if (u.timeout = o || 1e4, zs.utils.sleep(u.timeout).then(function() {
            //                     if (!d) return c = !0, s > 0 ? (zs.log.error("重复请求：" + n), l.post(n, a, o, i, --s).then(t).catch(r)) : (zs.log.error("请求超时：" + n), 
            //                     r());
            //                 }).catch(function(e) {
            //                     return e;
            //                 }), u.onreadystatechange = function() {
            //                     if (4 == u.readyState && !c) {
            //                         d = !0;
            //                         var f = u.responseText;
            //                         // console.log(f+"==============================");
            //                         if (u.status >= 200 && u.status < 400) {
            //                             var g = {};
            //                             try {
            //                                 g = JSON.parse(f), "v2" == e.version && g.code;
            //                             } catch (e) {
            //                                 return zs.log.error("请求解析失败： ", e), r(e);
            //                             }
            //                             return zs.log.debug("请求成功：" + n, "Network", f), t(g.data);
            //                         }
            //                         return s > 0 ? (zs.log.error("重复请求：" + n, f), l.post(n, a, o, i, --s).then(t).catch(r)) : (zs.log.error("请求失败：" + n, f), 
            //                         r(f));
            //                     }
            //                 }, u.ontimeout = function(e) {
            //                     if (!d && !c) return d = !0, c = !0, s > 0 ? (zs.log.error("重复请求：" + n, e), l.post(n, a, o, i, --s).then(t).catch(r)) : (zs.log.error("请求超时： " + n, e), 
            //                     r(e));
            //                 }, u.open("POST", n, !0), u.setRequestHeader("Content-Type", "application/json"), 
            //                 "v2" == e.version && "" != e.authorizationToken && (u.setRequestHeader("authorization", e.authorizationToken), 
            //                 !i)) {
            //                     var f = JSON.stringify(a), g = e.encrypt(f);
            //                     a._data = g;
            //                 }
            //                 // u.send(JSON.stringify(a)), zs.log.debug("通讯请求：" + n, "Network", a);
            //             }));

            //           case 5:
            //           case "end":
            //             return t.stop();
            //         }
            //     }, r);
            // })), function(e, t, r, n, a) {
            //     return p.apply(this, arguments);
            // })
            function(){}
        }, {
            key: "get",
            value: 
            // function(e, t, r, n) {
            //     var a = this;
            //     return null == n && (n = 3), zs.platform.proxy && zs.platform.async.request ? new Promise(function(o, i) {
            //         zs.log.debug("通讯请求：" + e, "Network", t), zs.td.justTrack("通讯请求", "通讯请求"), zs.platform.async.request({
            //             url: e,
            //             data: JSON.stringify(t),
            //             timeout: r,
            //             method: "GET"
            //         }).then(function(t) {
            //             return zs.log.debug("请求成功：" + e, "Network", t), o(null);//
            //         }).catch(function(s) {
            //             // return n > 0 ? (zs.log.error("请求重试：" + e, "Network", s),
            //             //  a.get(e, t, r, --n).then(o).catch(i)) : (zs.td.justTrack("通讯请求失败", "通讯请求失败"), 
            //             // zs.log.error("请求失败：" + e, "Network", s), i(s));
            //             o(null);
            //         });
            //     }) : new Promise(function(o, i) {
            //         var s = new XMLHttpRequest(), u = !1, c = !1;
            //         s.timeout = r || 1e4, zs.utils.sleep(s.timeout).then(function() {
            //             if (!c) return u = !0, n > 0 ? (zs.log.error("重复请求：" + e), a.get(e, t, r, --n).then(o).catch(i)) : (zs.log.error("请求超时：" + e), 
            //             i());
            //         }).catch(function(e) {
            //             return e;
            //         }), s.onreadystatechange = function() {
            //             if (4 == s.readyState && !u) {
            //                 c = !0;
            //                 var d = s.responseText;
            //                 if (s.status >= 200 && s.status < 400) {
            //                     var l = {};
            //                     try {
            //                         l = JSON.parse(d);
            //                     } catch (e) {
            //                         return zs.log.error("请求解析失败： ", e), i(e);
            //                     }
            //                     return zs.log.debug("请求成功：" + e, "Network", d), o(l.data);
            //                 }
            //                 return n > 0 ? (zs.log.error("重复请求：" + e, d), a.get(e, t, r, --n).then(o).catch(i)) : (zs.log.error("请求失败：" + e, d), 
            //                 i(d));
            //             }
            //         }, s.ontimeout = function(s) {
            //             if (!c && !u) return c = !0, u = !0, n > 0 ? (zs.log.error("重复请求：" + e, s), a.get(e, t, r, --n).then(o).catch(i)) : (zs.log.error("请求超时： " + e, s), 
            //             i(s));
            //         }, s.open("GET", e, !0), s.setRequestHeader("Content-Type", "application/json");
            //         var d = JSON.stringify(t);
            //         // s.send(d), zs.log.debug("通讯请求：" + e, "Network", d);
            //     });
            // }
            function(){}
        }, {
            key: "nativeRequest",
            value: function(t, r, n, a, o, s) {
                var u = this, c = Math.round(new Date().getTime() / 1e3).toString();
                if (r = Object.assign(r, {
                    timestamp: c
                }), a) {
                    var d = i.buildSign(r, !o);
                    r = Object.assign(r, {
                        sign: d
                    });
                }
                return new Promise(function(n, a) {
                    if ("v2" == e.version && "" != e.authorizationToken && !s) {
                        var o = JSON.stringify(r), i = e.encrypt(o);
                        r._data = i;
                    }
                    u.post(t, r, 3e3, !0).then(function(e) {
                        n(e);
                    }).catch(function(e) {
                        a(e);
                    });
                });
            }
        }, {
            key: "request",
            value: function(t, r, n) {
                return new Promise(function(a, i) {
                    var s = null, u = e.getUrl(t), c = null;
                    if (zs.configs.gameCfg.local && (n = o.Local), u && (null == n || n == o.Sync)) return e.post(u, r).then(function(n) {
                        var o = null;
                        switch (t) {
                          case "config":
                            r && "module" === r.type ? r.module ? (o = r.module ? r.module : "base_module", 
                            r.table && (o += ">>" + r.table)) : r.table && (o = r.table) : r && "switch" === r.type && (o = "switch");
                            break;

                          case "download":
                            o = r.key;
                            break;

                          case "auth":
                            e.authorizationToken = n.token, e.authorizationSecret = n.secret;
                        }
                        null == n || "" == n || "Array" == typeof n && 0 == n.length ? n = e.getLocalData(t, o) : e.setLocalData(t, n, o), 
                        a(n);
                    }).catch(function(e) {
                        i(e);
                    });
                    if (null == u || n === o.Local || n === o.Async) {
                        switch (t) {
                          case "login":
                            s = e.getLocalData(t);
                            break;

                          case "config":
                            var d = null;
                            r && "module" === r.type ? r.module ? (d = r.module ? r.module : "base_module", 
                            r.table && (d += ">>" + r.table)) : r.table && (d = r.table) : r && r.type, d = "switch", 
                            s = e.getLocalData(t, d);
                            break;

                          case "download":
                            r && r.key && (s = e.getLocalData(t, r.key));
                            break;

                          case "update":
                            r && r.key && r.data && e.setLocalData("download", r.data, r.key), s = !0;
                        }
                        if (null == s && zs.log.fatal("本地网络缓存及默认值不存在: " + t, "Network"), c = s, null == u || n === o.Local) return zs.log.debug(t + " 通讯返回本地数据", "Network"), 
                        a(c);
                    }
                    return e.post(u, r).then(function(n) {
                        var a = null;
                        switch (t) {
                          case "config":
                            r && "module" === r.type && (a = r.module ? r.module : "base_module", r.table && (a += "_" + r.table));
                            break;

                          case "download":
                            a = r.key;
                        }
                        null != n && "" != n && e.setLocalData(t, n, a);
                    }).catch(function(e) {
                        return e;
                    }), a(c);
                });
            }
        }, {
            key: "getLocalData",
            value: function(t, r) {
                var n = t;
                r && (n += ">>" + r);
                var a = zs.utils.getItem("network_" + n);
                return a ? JSON.parse(a) : e.defaultData[n];
            }
        }, {
            key: "setLocalData",
            value: function(e, t, r) {
                if (null != t && null != t) {
                    var n = e;
                    r && (n += ">>" + r);
                    var a = JSON.stringify(t);
                    a && zs.utils.setItem("network_" + n, a);
                }
            }
        }, {
            key: "ping",
            value: (g = (0, r.default)(regenerator.default.mark(function r() {
                var n, a;
                return regenerator.default.wrap(function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        e.domainIdx = -1, n = regenerator.default.mark(function r(n) {
                            var a, o;
                            return regenerator.default.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                  case 0://---------------------------
                                    return a = {"code":1,"msg":"请求成功","data":{"city":"北京市","country":"中国","timestamp":1637112437},"count":0,"listRows":0,"lastPage":0,"totalRow":[],"condition":0}, //e.listDomain[n] + "/" + e.version + "/" + e.mapWebApi.ping
                                    o = {}, t.next = 3, 
                                    e.get(a, o, 1e3).then(function(t) {
                                        e.domainIdx = n, zs.product.city = t.city, zs.product.country = t.country, zs.product.timestamp = 1e3 * t.timestamp;
                                    }).catch(function(e) {
                                        // zs.log.warn("域名 " + a + " 无法正常通讯", "Network");
                                    });

                                  case 3:
                                    if (!(e.domainIdx >= 0)) {
                                        t.next = 5;
                                        break;
                                    }
                                    return t.abrupt("return", "break");

                                  case 5:
                                    return t.next = 7, zs.utils.sleep(1e3);

                                  case 7:
                                  case "end":
                                    return t.stop();
                                }
                            }, r);
                        }), a = 0;

                      case 3:
                        if (!(a < e.listDomain.length)) {
                            r.next = 11;
                            break;
                        }
                        return r.delegateYield(n(a), "t0", 5);

                      case 5:
                        if ("break" !== r.t0) {
                            r.next = 8;
                            break;
                        }
                        return r.abrupt("break", 11);

                      case 8:
                        a++, r.next = 3;
                        break;

                      case 11:
                      case "end":
                        return r.stop();
                    }
                }, r);
            })), function() {
                return g.apply(this, arguments);
            })
        }, {
            key: "authorization",
            value: (f = (0, r.default)(regenerator.default.mark(function r() {
                var n;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return n = {}, t.abrupt("return", (n.gid = window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId, 
                        e.request("auth", n)));

                      case 2:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function() {
                return f.apply(this, arguments);
            })
        }, {
            key: "login",
            value: (l = (0, r.default)(regenerator.default.mark(function r(n, a) {
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.abrupt("return", (null == n && (n = {}), n.gid = window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId, 
                        zs.log.debug("登录参数：", "Network", n), e.request("login", n, a)));

                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function(e, t) {
                return l.apply(this, arguments);
            })
        }, {
            key: "config",
            value: (d = (0, r.default)(regenerator.default.mark(function r(n, a, o, i) {
                var s;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.t0 = e.ready, t.t0) {
                            t.next = 4;
                            break;
                        }
                        return t.next = 4, e.init();

                      case 4:
                        return s = {
                            gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                            type: n ? "switch" : "module",
                            v: zs.configs.gameCfg.version
                        }, t.abrupt("return", (n || (s.module = a || "base_module", o && (s.table = o)), 
                        e.request("config", s, i)));

                      case 6:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function(e, t, r, n) {
                return d.apply(this, arguments);
            })
        }, {
            key: "jsonConfig",
            value: (c = (0, r.default)(regenerator.default.mark(function r(n, a) {
                var o;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.t0 = e.ready, t.t0) {
                            t.next = 4;
                            break;
                        }
                        return t.next = 4, e.init();

                      case 4:
                        return o = {
                            gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                            type: "json",
                            v: zs.configs.gameCfg.version,
                            module: "base_module"
                        }, t.abrupt("return", (n && (o.table = n), e.request("config", o, a)));

                      case 6:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function(e, t) {
                return c.apply(this, arguments);
            })
        }, {
            key: "update",
            value: (u = (0, r.default)(regenerator.default.mark(function r(n, a, o) {
                var i;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.t0 = e.ready, t.t0) {
                            t.next = 4;
                            break;
                        }
                        return t.next = 4, e.init();

                      case 4:
                        return i = {
                            gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                            uid: zs.core.userId,
                            key: n,
                            data: a
                        }, t.abrupt("return", e.request("update", i, o));

                      case 6:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function(e, t, r) {
                return u.apply(this, arguments);
            })
        }, {
            key: "download",
            value: (s = (0, r.default)(regenerator.default.mark(function r(n, a) {
                var o;
                return regenerator.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.t0 = e.ready, t.t0) {
                            t.next = 4;
                            break;
                        }
                        return t.next = 4, e.init();

                      case 4:
                        return o = {
                            gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                            uid: zs.core.userId,
                            key: n
                        }, t.abrupt("return", e.request("download", o, a));

                      case 6:
                      case "end":
                        return t.stop();
                    }
                }, r);
            })), function(e, t) {
                return s.apply(this, arguments);
            })
        }, {
            key: "log",
            value: function(e, t) {
                window.zs.platform.config.platformMark, zs.configs.gameCfg.appId, zs.core.userId;
            }
        }, {
            key: "edit",
            value: function(t, r, n) {
                var a = {
                    gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                    uid: zs.core.userId,
                    key: t,
                    val: r
                };
                return e.request("edit", a, n);
            }
        }, {
            key: "behavior",
            value: function(t, r, n, a) {
                var o = {
                    event_id: t,
                    type: r,
                    record: n
                };
                return e.request("behavior", o, a);
            }
        }, {
            key: "report",
            value: function(t, r, n, a, o) {
                var i = {
                    gid: window.zs.platform.config.platformMark + zs.configs.gameCfg.gameId,
                    app_id: window.zs.platform.config.platformMark + zs.configs.gameCfg.appId,
                    platform_id: e.platformId[zs.platform.config.platformMark],
                    uid: zs.core.userId,
                    open_id: zs.exporter.dataMgr.getUUID(),
                    group: t,
                    event: r,
                    name: n,
                    version: zs.configs.gameCfg.version,
                    params: a,
                    timestamp: Math.round(new Date().getTime() / 1e3).toString()
                };
                return e.request("report", i, o);
            }
        } ]), e;
    }();
    s.ready = !1, s.version = "v2", s.domainIdx = -1, s.city = null, s.timestamp = null, 
    s.defaultData = {}, 
    s.remoteWebSettingURL = {
        "webDomains": [
            "",//https://gamesapi.zxmn2018.com
            "",//https://gamesapi.qwpo2018.com
            ""//https://gamesapi.zaml2018.com
        ],
        "webApis": {
            "ping": "game/clientInfo",
            "login": "game/login",
            "config": "game/config",
            "update": "game/update",
            "download": "game/download"//https://gamesapi.zxmn2018.com/v2/game/clientInfo
        },
        "exportDomainOld": "",//https://zsad.zxmn2018.com
        "exportDomainNew": ""//https://gamesapi.zxmn2018.com
    }, //https://changshazhise01-1254961065.cos.ap-guangzhou.myqcloud.com/zhise/new_framework/web.json
    s.authorizationToken = "", s.authorizationSecret = "",
    s.listDomain = [ "" ], //https://gamesapi.zxmn2018.com", "https://gamesapi.qwpo2018.com", "https://gamesapi.zaml2018.com
    s.mapWebApi = {
        auth: "game/auth",
        ping: "game/clientInfo",
        login: "game/login",
        config: "game/config",
        update: "game/update",
        download: "game/download",
        report: "game/report",
        log: "game/log",
        behavior: "ad/behavior",
        edit: "game/edit"
    }, s.platformId = {
        wx_: 1,
        oppo_: 2,
        vivo_: 3,
        qq_: 4,
        tt_: 5,
        app_: 6,
        ks_: 7,
        hw_: 8
    }, e.NetworkMode = o, e.MD5 = i, e.network = s;
}(window.zs = window.zs || {});