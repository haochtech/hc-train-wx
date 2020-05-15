var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../mall/mall",
        curr: -1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
        tagList1: [ "全部", "拼团", "限时抢购" ],
        tagCurr1: 0,
      shadow: !0,
      get_userinfo: !0
    },
    tagChange1: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.tagCurr1) {
            e.setData({
                tagCurr1: t,
                page: 1,
                isbottom: !1
            });
            var s = {
                op: "mall",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (s.cid = e.data.pclass[e.data.curr].id), 0 != e.data.tagCurr1 && (s.type = e.data.tagCurr1 + 1), 
            app.util.request({
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
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.curr) {
            e.setData({
                curr: t,
                page: 1,
                isbottom: !1
            });
            var s = {
                op: "mall",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (s.cid = e.data.pclass[e.data.curr].id), 0 != e.data.tagCurr1 && (s.type = e.data.tagCurr1 + 1), 
            app.util.request({
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
                type: 3
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
            op: "mall",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        -1 != e.data.curr && (t.cid = e.data.pclass[e.data.curr].id), 0 != e.data.tagCurr1 && (t.type = e.data.tagCurr1 + 1), 
        app.util.request({
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
            op: "mall",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), 0 != e.data.tagCurr1 && (a.type = e.data.tagCurr1 + 1), 
        app.util.request({
            url: "entry/wxapp/service",
            data: a,
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0,
                    list: []
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        if (!e.data.isbottom) {
            var a = {
                op: "mall",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), 0 != e.data.tagCurr1 && (a.type = e.data.tagCurr1 + 1), 
            app.util.request({
                url: "entry/wxapp/service",
                data: a,
                success: function(a) {
                    var t = a.data;
                    wx.stopPullDownRefresh(), "" != t.data ? e.setData({
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
        var a = "/xc_train/pages/mall/mall";
        return a = escape(a), {
            title: this.data.config.title,
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