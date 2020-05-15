var app = getApp(), common = require("../common/common.js");

function time_up(n) {
    var o = setInterval(function() {
        var a = n.data.fail;
        if (0 < a) {
            a -= 1;
            var t = [ 0, 0, 0 ];
            t[0] = parseInt(a / 60 / 60), t[2] = parseInt(a % 60), t[1] = parseInt(a / 60 % 60), 
            n.setData({
                fail: a,
                times: t
            });
        } else {
            clearInterval(o);
            var e = n.data.list;
            e.status, n.setData({
                list: e
            });
        }
    }, 1e3);
}

Page({
    data: {
        times: [ 0, 0, 0 ],
        fail: 0,
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var n = this;
        common.config(n), common.theme(n), app.util.request({
            url: "entry/wxapp/order",
            method: "POST",
            data: {
                op: "group",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    if (-1 == t.data.status && 0 < parseInt(t.data.fail)) {
                        var e = [ 0, 0, 0 ];
                        e[0] = parseInt(t.data.fail / 60 / 60), e[2] = parseInt(t.data.fail % 60), e[1] = parseInt(t.data.fail / 60 % 60), 
                        n.setData({
                            fail: t.data.fail,
                            times: e
                        });
                    }
                    n.setData({
                        list: t.data
                    }), time_up(n);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = "/xc_train/pages/shared/shared?&group=" + this.data.list.id;
        return a = escape(a), console.log(a), {
            title: this.data.config.title + "-团购",
            path: "/xc_train/pages/base/base?&share=" + a,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        };
    }
});