var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../news/news",
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var s = this;
        common.config(s), common.theme(s), "" != a.title && null != a.title && s.setData({
            title: a.title
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "news",
                page: s.data.page,
                pagesize: s.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    for (var e = 0; e < t.data.length; e++) t.data[e].nav = "../about/link?&url=" + escape(t.data[e].link);
                    s.setData({
                        list: t.data,
                        page: s.data.page + 1
                    });
                } else s.setData({
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
        var s = this;
        s.setData({
            page: 1,
            isbottom: !1
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "news",
                page: s.data.page,
                pagesize: s.data.pagesize
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                if ("" != t.data) {
                    for (var e = 0; e < t.data.length; e++) t.data[e].nav = "../about/link?&url=" + escape(t.data[e].link);
                    s.setData({
                        list: t.data,
                        page: s.data.page + 1
                    });
                } else s.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var s = this;
        s.data.isbottom || app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "news",
                page: s.data.page,
                pagesize: s.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    for (var e = 0; e < t.data.length; e++) t.data[e].nav = "../about/link?&url=" + escape(t.data[e].link);
                    s.setData({
                        list: s.data.list.concat(t.data),
                        page: s.data.page + 1
                    });
                } else s.setData({
                    isbottom: !0
                });
            }
        });
    }
});