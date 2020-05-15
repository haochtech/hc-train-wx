var app = getApp(), common = require("../common/common.js"), WxParse = require("../../../wxParse/wxParse.js");

function wxpay(a, e) {
    a.appId;
    var t = a.timeStamp.toString(), s = a.package, i = a.nonceStr, n = a.paySign.toUpperCase();
    wx.requestPayment({
        timeStamp: t,
        nonceStr: i,
        package: s,
        signType: "MD5",
        paySign: n,
        success: function(a) {
            wx.showToast({
                title: "支付成功",
                icon: "success",
                duration: 2e3
            }), app.util.request({
                url: "entry/wxapp/service",
                data: {
                    op: "video_detail",
                    id: e.data.list.id
                },
                success: function(a) {
                    var t = a.data;
                    "" != t.data && e.setData({
                        list: t.data,
                        shadow: true,
                        menu: !1
                    });
                }
            });
        },
        fail: function(a) {}
    });
}

Page({
    data: {
        curr: 1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        t != e.data.curr && (e.setData({
            curr: t,
            page: 1,
            pagesize: 20,
            isbottom: !1,
            tui: []
        }), 2 == t ? app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video",
                id: e.data.list.id,
                service: e.data.list.pid,
                tui: 1,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 3 == t && app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss",
                page: e.data.page,
                pagesize: e.data.pagesize,
                id: e.data.list.id,
                type: 2
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }));
    },
    input: function(a) {
        this.setData({
            content: a.detail.value
        });
    },
    discuss_on: function() {
        var e = this, a = e.data.content;
      var uInfo = app.userinfo;
      console.log(app.userinfo);
      if (!uInfo) {
        e.setData({
          shadow: !1,
          get_userinfo: !1,
        });
        return false;
      }
        "" != a && null != a ? app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss_on",
                id: e.data.list.id,
                content: a,
                type: 2
            },
            success: function(a) {
                "" != a.data.data && (wx.showToast({
                    title: "评论成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    page: 1,
                    isbottom: !1,
                    content: ""
                }), app.util.request({
                    url: "entry/wxapp/order",
                    data: {
                        op: "discuss",
                        page: e.data.page,
                        pagesize: e.data.pagesize,
                        id: e.data.list.id,
                        type: 2
                    },
                    success: function(a) {
                        var t = a.data;
                        "" != t.data ? e.setData({
                            tui: t.data,
                            page: e.data.page + 1
                        }) : e.setData({
                            isbottom: !0
                        });
                    }
                }));
            }
        }) : wx.showModal({
            title: "错误",
            content: "评论内容不能为空",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        });
    },
    menu_on: function() {
        this.setData({
            menu: !0,
            shadow: false
        });
    },
    menu_close: function() {
        this.setData({
            menu: !1,
            shadow: true
        });
    },
    pay: function() {
        var e = this;
      var uInfo = app.userinfo;
      if(!uInfo) {
        e.setData({
          shadow: !1,
          get_userinfo: !1,
        });
        return false;
      }
        app.util.request({
            url: "entry/wxapp/buyvideo",
            data: {
                id: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (e.setData({
                    shadow: true,
                    menu: !1
                }), "" != t.data.errno && null != t.data.errno ? wx.showModal({
                    title: "错误",
                    content: t.data.message,
                    showCancel: !1
                }) : wxpay(t.data, e));
            }
        });
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
        var s = this;
        common.config(s), common.theme(s), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video_detail",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data && (s.setData({
                    list: t.data
                }), 2 == t.data.content_type)) {
                    var e = t.data.content2;
                    WxParse.wxParse("content2", "html", e, s, 5);
                }
            }
        }), s.setData({
            userinfo: app.userinfo
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video_detail",
                id: s.data.list.id
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                if ("" != t.data && (s.setData({
                    list: t.data
                }), 2 == t.data.content_type)) {
                    var e = t.data.content2;
                    WxParse.wxParse("content2", "html", e, s, 5);
                }
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.isbottom ? 3 == index && app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss",
                page: e.data.page,
                pagesize: e.data.pagesize,
                id: e.data.list.id,
                type: 2
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 2 == e.data.curr && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video",
                id: e.data.list.id,
                service: e.data.list.pid,
                tui: 1,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: e.data.tui.concat(t.data),
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onShareAppMessage: function() {
        var a = "/xc_train/pages/video/detail?&id=" + this.data.list.id;
        return a = escape(a), {
            title: this.data.config.title + "-" + this.data.list.name,
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