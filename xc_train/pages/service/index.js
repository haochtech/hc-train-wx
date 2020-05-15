var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../service/index",
        curr: -1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.curr) {
            e.setData({
                curr: t,
                page: 1,
                isbottom: !1,
                list: []
            });
            var s = {
                op: "service",
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
                        isbottom: !0
                    });
                }
            });
        }
    },
    onLoad: function(i) {
        var c = this;
        common.config(c), common.theme(c), "" != i.curr && null != i.curr && c.setData({
            cid: i.cid
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "service_class",
                type: 1
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    if (c.setData({
                        pclass: t.data
                    }), "" != i.cid && null != i.cid) for (var e = 0; e < t.data.length; e++) t.data[e].id == i.cid && c.setData({
                        curr: e
                    });
                    var s = {
                        op: "service",
                        page: c.data.page,
                        pagesize: c.data.pagesize
                    };
                    -1 != c.data.curr && (s.cid = c.data.pclass[c.data.curr].id), app.util.request({
                        url: "entry/wxapp/service",
                        data: s,
                        success: function(a) {
                            var t = a.data;
                            "" != t.data ? c.setData({
                                list: t.data,
                                page: c.data.page + 1
                            }) : c.setData({
                                isbottom: !0
                            });
                        }
                    });
                }
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
            op: "service",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), app.util.request({
            url: "entry/wxapp/service",
            data: a,
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
        if (!e.data.isbottom) {
            var a = {
                op: "service",
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
        var a = this, t = "/xc_train/pages/service/index?&cid=" + a.data.pclass[a.data.curr].id;
        return t = escape(t), {
            title: a.data.config.title + "-" + a.data.pclass[a.data.curr].name,
            path: "/xc_train/pages/base/base?&share=" + t,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        };
    }
});