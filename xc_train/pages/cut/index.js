var tt, app = getApp(), common = require("../common/common.js");

function time_up(e) {
    tt = setInterval(function() {
        for (var a = e.data.list, t = 0; t < a.length; t++) 0 < a[t].fail && (a[t].fail = a[t].fail - 1, 
        a[t].hour = parseInt(a[t].fail / 3600), a[t].min = parseInt(a[t].fail % 3600 / 60), 
        a[t].second = a[t].fail % 60);
        e.setData({
            list: a
        });
    }, 1e3);
}

Page({
    data: {
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), clearInterval(tt), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_user",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? (e.setData({
                    list: t.data,
                    page: e.data.page
                }), time_up(e)) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        clearInterval(tt), e.setData({
            page: 1,
            isbottom: !1
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_user",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data ? (e.setData({
                    list: t.data,
                    page: e.data.page
                }), time_up(e)) : e.setData({
                    isbottom: !0,
                    list: []
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.isbottom || app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut_user",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: e.data.list.concat(t.data),
                    page: e.data.page
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    }
});