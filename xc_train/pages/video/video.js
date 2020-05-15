var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        curr: -1,
        pagePath: "../video/video",
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
                list: [],
                page: 1,
                isbottom: !1
            });
            var s = {
                op: "video",
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
    to_shop: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/manage",
            showLoading: !1,
            data: {
                op: "bind"
            },
            success: function(a) {
                "" != a.data.data ? wx.navigateTo({
                    url: "../manage/index"
                }) : t.setData({
                    shadow: false,
                    manage: !0
                });
            }
        });
    },
    password: function(a) {
        this.setData({
            password: a.detail.value
        });
    },
    shop_close: function() {
        this.setData({
            shadow: true,
            manage: !1
        });
    },
    shop_login: function(a) {
        var t = this, e = a.currentTarget.dataset.status;
        "" == t.data.password || null == t.data.password ? wx.showModal({
            title: "错误",
            content: "请输入密码",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }) : app.util.request({
            url: "entry/wxapp/manage",
            showLoading: !1,
            data: {
                op: "login",
                status: e,
                password: t.data.password
            },
            success: function(a) {
                "" != a.data.data ? wx.navigateTo({
                    url: "../manage/index"
                }) : t.setData({
                    password: ""
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video_class"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && e.setData({
                    pclass: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video",
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
        }), e.setData({
            userinfo: app.userinfo
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
            op: "video",
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
                op: "video",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            -1 != e.data.curr && (a.cid = e.data.pclass[e.data.curr].id), app.util.request({
                url: "entry/wxapp/service",
                data: a,
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
    }
});