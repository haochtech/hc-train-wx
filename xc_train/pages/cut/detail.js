var tt, app = getApp(), common = require("../common/common.js"), WxParse = require("../../../wxParse/wxParse.js");

function time_down(i) {
    tt = setInterval(function() {
        var t = i.data.fail;
        if (0 < t) {
            t -= 1;
            var a = parseInt(t / 3600), e = parseInt(t % 3600 / 60), n = t % 60;
            i.setData({
                fail: t,
                hour: a,
                min: e,
                second: n
            });
        } else clearInterval(tt);
    }, 1e3);
}

Page({
    data: {
        curr: 1,
        fail: 0,
        hour: 0,
        min: 0,
        second: 0,
      shadow: !0,
      get_userinfo: !0
    },
    cut: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_price",
                id: e.data.list.id
            },
            success: function(t) {
                var a = t.data;
                "" != a.data && (e.setData({
                    menu1: !0,
                    cut_price: a.data.cut_price
                }), app.util.request({
                    url: "entry/wxapp/service",
                    data: {
                        op: "cut_detail",
                        id: e.data.list.id
                    },
                    success: function(t) {
                        var a = t.data;
                        "" != a.data && e.setData({
                            list: a.data
                        });
                    }
                }));
            }
        });
    },
    menu_close: function() {
        this.setData({
            menu1: !1,
            menu2: !1
        });
    },
    tab: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.curr != a && this.setData({
            curr: a
        });
    },
    onLoad: function(t) {
        var n = this;
        common.config(n), common.theme(n), clearInterval(tt), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_detail",
                id: t.id
            },
            success: function(t) {
                var a = t.data;
                if ("" != a.data && (-1 == a.data.end && 0 < a.data.fail && (n.setData({
                    fail: a.data.fail
                }), time_down(n)), n.setData({
                    list: a.data
                }), 2 == a.data.content_type)) {
                    var e = a.data.content2;
                    WxParse.wxParse("content2", "html", e, n, 5);
                }
            }
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_log",
                id: t.id
            },
            success: function(t) {
                var a = t.data;
                "" != a.data && n.setData({
                    order: a.data
                });
            }
        }), "" != t.cut_openid && null != t.cut_openid && (n.setData({
            cut_openid: t.cut_openid
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_price2",
                id: t.id,
                openid: n.data.cut_openid
            },
            success: function(t) {
                var a = t.data;
                "" != a.data && n.setData({
                    menu2: !0,
                    cut_price: a.data.cut_price,
                    cut_user: a.data.cut_user
                });
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var n = this;
        clearInterval(tt), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_detail",
                id: n.data.list.id
            },
            success: function(t) {
                var a = t.data;
                if (wx.stopPullDownRefresh(), "" != a.data && (-1 == a.data.end && 0 < a.data.fail && (n.setData({
                    fail: a.data.fail
                }), time_down(n)), n.setData({
                    list: a.data
                }), 2 == a.data.content_type)) {
                    var e = a.data.content2;
                    WxParse.wxParse("content2", "html", e, n, 5);
                }
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this, a = "/xc_train/pages/cut/detail?&id=" + t.data.list.id + "&cut_openid=" + t.data.list.userinfo.openid;
        a = escape(a);
        var e = t.data.config.title + "-" + t.data.list.name;
        return "" != t.data.config.cut_share && null != t.data.config.cut_share && (e = t.data.config.cut_share), 
        {
            title: e,
            path: "/xc_train/pages/base/base?&share=" + a,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        };
    }
});