var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        page: 1,
        pagesize: 20,
        isbottom: !1,
        curr: -1,
      shadow: !0,
      get_userinfo: !0
    },
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.curr) {
            e.setData({
                curr: t,
                page: 1,
                isbottom: !1
            });
            var s = {
                op: "teacher",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (s.cid = e.data.pclass[e.data.curr].id), app.util.request({
                url: "entry/wxapp/service",
                data: s,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: t.data,
                        page: e.data.page + 1
                    }) : e.setData({
                        isbottom: !0,
                        list: []
                    });
                }
            });
        }
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "service_class",
                type: 2
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && e.setData({
                    pclass: t.data
                });
            }
        });
        var t = {
            op: "teacher",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        -1 != e.data.curr && (t.cid = e.data.pclass[e.data.curr].id), app.util.request({
            url: "entry/wxapp/service",
            data: t,
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
            isbottom: !1
        });
        var a = {
            op: "teacher",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), app.util.request({
            url: "entry/wxapp/service",
            data: a,
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data ? e.setData({
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
        if (!e.data.isbottom) {
            var a = {
                op: "teacher",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), app.util.request({
                url: "entry/wxapp/service",
                data: a,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: e.data.list.concat(t.data),
                        page: e.data.page + 1
                    }) : e.setData({
                        isbottom: !0
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {
        var a = "/xc_train/pages/teacher/teacher";
        return a = escape(a), {
            title: this.data.config.title + "-名师简介",
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