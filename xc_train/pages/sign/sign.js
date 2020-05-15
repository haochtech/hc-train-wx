var app = getApp(), common = require("../common/common.js");

function sign(a) {
    var t = a.data.name, e = a.data.mobile, o = a.data.store_id;
    "" != o && null != o || (n = !1);
    var n = !0;
    "" != t && null != t || (n = !1), "" != e && null != e || (n = !1);
    /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/.test(e) || (n = !1), 
    a.setData({
        submit: n
    });
}

function wxpay(a, t) {
    a.appId;
    var e = a.timeStamp.toString(), o = a.package, n = a.nonceStr, s = a.paySign.toUpperCase();
    wx.requestPayment({
        timeStamp: e,
        nonceStr: n,
        package: o,
        signType: "MD5",
        paySign: s,
        success: function(a) {
            wx.showToast({
                title: "支付成功",
                icon: "success",
                duration: 2e3
            }), setTimeout(function() {
                wx.reLaunch({
                    url: "../index/index"
                });
            }, 2e3);
        },
        fail: function(a) {}
    });
}

Page({
    data: {
        submit: !1,
        coupon_curr: -1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
        team_page: 1,
        team_pagesize: 20,
        team_isbottom: !1,
        is_load: !1,
        cut: "",
      shadow: !0,
      get_userinfo: !0
    },
    team_on: function() {
        this.setData({
            team_pages: !0
        });
    },
    team_close: function() {
        this.setData({
            team_pages: !1
        });
    },
    team_choose: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        e.setData({
            pid: e.data.team_list[t].id,
            team_pages: !1,
            coupon_curr: -1,
            coupon_price: ""
        }), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "sign",
                pid: e.data.pid
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (e.setData({
                    list: t.data,
                    amount: "¥" + t.data.amount,
                    cut: ""
                }), "" != t.data.list && null != t.data.list ? e.setData({
                    coupon: t.data.list
                }) : e.setData({
                    coupon: []
                }));
            }
        });
    },
    input: function(a) {
        var t = this;
        switch (a.currentTarget.dataset.name) {
          case "name":
            t.setData({
                name: a.detail.value
            });
            break;

          case "mobile":
            t.setData({
                mobile: a.detail.value
            });
            break;

          case "mobile2":
            t.setData({
                mobile2: a.detail.value
            });
            break;

          case "content":
            t.setData({
                content: a.detail.value
            });
            break;

          case "tui":
            t.setData({
                tui: a.detail.value
            });
        }
        sign(t);
    },
    choose: function(a) {
        this.setData({
            shadows: !0,
            menu: !0
        });
    },
    menu_close: function() {
        this.setData({
            shadows: !1,
            menu: !1
        });
    },
    coupon_choose: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        if (e != t.data.coupon_curr) {
            var o = t.data.coupon[e].name, n = t.data.list.amount;
            n = (parseFloat(n) - parseFloat(o)).toFixed(2), t.setData({
                coupon_curr: e,
                coupon_price: "¥" + o,
                amount: "¥" + n
            });
        } else {
            n = t.data.list.amount;
            var s = t.data.card;
            "" != s && null != s && 1 == s.content.discount_status && (o_amount = (parseFloat(o_amount) * parseFloat(s.content.discount) / 10).toFixed(2)), 
            t.setData({
                coupon_curr: -1,
                coupon_price: "",
                amount: "¥" + t.data.list.amount
            });
        }
    },
    submit: function(a) {
        var e = this;
        if (e.data.submit) {
            var t = {
                name: e.data.name,
                mobile: e.data.mobile,
                form_id: a.detail.formId,
                order_type: 1,
                total: 1,
                store: e.data.store_id
            };
            "" != e.data.pid && null != e.data.pid && (t.pid = e.data.pid), "" != e.data.cut && null != e.data.cut && (t.cut = e.data.cut), 
            "" != e.data.mobile2 && null != e.data.mobile2 && (t.mobile2 = e.data.mobile2), 
            -1 != e.data.coupon_curr && (t.coupon_id = e.data.coupon[e.data.coupon_curr].cid), 
            "" != e.data.content && null != e.data.content && (t.content = e.data.content), 
            "" != e.data.tui && null != e.data.tui && (t.tui = e.data.tui), app.util.request({
                url: "entry/wxapp/setorder",
                data: t,
                success: function(a) {
                    var t = a.data;
                    "" != t.data && (1 == t.data.status ? (wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        duration: 2e3
                    }), setTimeout(function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }, 2e3)) : "" != t.data.errno && null != t.data.errno ? wx.showModal({
                        title: "错误",
                        content: t.data.message,
                        showCancel: !1
                    }) : wxpay(t.data, e));
                }
            });
        }
    },
    store_on: function() {
        this.setData({
            store_page: !0
        });
    },
    store_choose: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        t.setData({
            store_id: t.data.store_list[e].id,
            store_name: t.data.store_list[e].name,
            store_page: !1
        });
    },
    store_close: function() {
        this.setData({
            store_page: !1
        });
    },
    team_scroll: function() {
        var e = this;
        e.data.team_isbottom || e.data.is_load || (e.setData({
            is_load: !0
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "sign",
                page: e.data.team_page,
                pagesize: e.data.team_pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    team_list: e.data.team_list.concat(t.data),
                    team_page: e.data.team_page + 1
                }) : e.setData({
                    team_isbottom: !0
                }), e.setData({
                    is_load: !1
                });
            }
        }));
    },
    store_scroll: function() {
        var e = this;
        if (!e.data.isbottom && !e.data.is_load) {
            e.setData({
                is_load: !0
            });
            var a = {
                op: "school",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            null != e.data.latitude && "" != e.data.latitude && (a.latitude = e.data.latitude), 
            null != e.data.longitude && "" != e.data.longitude && (a.longitude = e.data.longitude), 
            app.util.request({
                url: "entry/wxapp/index",
                data: a,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: e.data.store_list.concat(t.data),
                        page: e.data.page + 1
                    }) : e.setData({
                        isbottom: !0
                    }), e.setData({
                        is_load: !1
                    });
                }
            });
        }
    },
    onLoad: function(e) {
        var o = this;
        common.config(o), common.theme(o);
        var a = {
            op: "sign"
        };
        "" != e.pid && null != e.pid && (a.pid = e.pid, o.setData({
            pid: e.pid
        })), "" != e.cut && null != e.cut && (a.cut = e.cut, o.setData({
            cut: e.cut
        })), app.util.request({
            url: "entry/wxapp/user",
            data: a,
            success: function(a) {
                var t = a.data;
                "" != t.data && (o.setData({
                    list: t.data,
                    amount: "¥" + t.data.amount
                }), "" != e.cut && null != e.cut || o.setData({
                    pid: t.data.id
                }), "" != t.data.list && null != t.data.list && o.setData({
                    coupon: t.data.list
                }));
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.latitude, e = a.longitude;
                a.speed, a.accuracy;
                o.setData({
                    latitude: t,
                    longitude: e
                });
            },
            complete: function() {
                var a = {
                    op: "school",
                    page: o.data.page,
                    pagesize: o.data.pagesize
                };
                null != o.data.latitude && "" != o.data.latitude && (a.latitude = o.data.latitude), 
                null != o.data.longitude && "" != o.data.longitude && (a.longitude = o.data.longitude), 
                app.util.request({
                    url: "entry/wxapp/index",
                    data: a,
                    success: function(a) {
                        var t = a.data;
                        "" != t.data ? o.setData({
                            store_list: t.data,
                            page: o.data.page + 1
                        }) : o.setData({
                            isbottom: !0
                        });
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/service",
            showLoading: !1,
            data: {
                op: "sign",
                page: o.data.team_page,
                pagesize: o.data.team_pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? o.setData({
                    team_list: t.data,
                    team_page: o.data.team_page + 1
                }) : o.setData({
                    team_isbottom: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});