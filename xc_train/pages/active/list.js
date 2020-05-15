var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../active/list",
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: true,
      get_userinfo: true
    },
    to_detail: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.list;
        "" != e[t].link && null != e[t].link ? wx.navigateTo({
            url: "../about/link?&url=" + escape(e[t].link)
        }) : wx.navigateTo({
            url: "active?&id=" + e[t].id
        });
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "active",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page + 1
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
            isbottom: !1,
            list: []
        }), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "active",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.isbottom || app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "active",
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: e.datalist.concat(t.data),
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    }
});