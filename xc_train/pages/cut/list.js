var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../cut/list",
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page
                }) : e.setData({
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
        e.setData({
            page: 1,
            isbottom: !1
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.isbottom || app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "cut",
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