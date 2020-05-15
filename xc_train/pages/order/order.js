var app = getApp(), common = require("../common/common.js"), QR = require("../../../utils/qrcode.js");

Page({
    data: {
        navHref: "",
        tab: [ "全部", "待核销", "已核销", "售后/退款" ],
        tabCurr: 0,
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    tabChange: function(a) {
        var e = this, t = a.currentTarget.id;
        if (t != e.data.tabCurr) {
            e.setData({
                tabCurr: t,
                page: 1,
                isbottom: !1
            });
            var n = {
                op: "mall_order",
                page: e.data.page,
                pagesize: e.data.pagesize,
                curr: e.data.tabCurr
            };
            app.util.request({
                url: "entry/wxapp/order",
                data: n,
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
    shFunc: function(a) {
        var t = this, e = a.currentTarget.dataset.index, n = t.data.list, o = t.setCanvasSize();
        t.createQrCode(n[e].out_trade_no, "mycanvas", o.w, o.h), t.setData({
            canshow: !0,
            menu: !0
        });
    },
    canshow: function() {
        this.setData({
            canshow: !1,
            menu: !1,
            menu2: !1
        });
    },
    tui: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            tui_index: t,
            menu2: !0,
            canshow: !0
        });
    },
    menu_close: function() {
        this.setData({
            menu2: !1,
            canshow: !1
        });
    },
    input: function(a) {
        this.setData({
            content: a.detail.value
        });
    },
    menu_btn: function() {
        var e = this;
        "" != e.data.content && null != e.data.content ? app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "mall_tui",
                id: e.data.list[e.data.tui_index].id,
                content: e.data.content
            },
            success: function(a) {
                if ("" != a.data.data) {
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3
                    });
                    var t = e.data.list;
                    t[e.data.tui_index].status = 2, e.setData({
                        list: t,
                        content: "",
                        menu2: !1,
                        canshow: !1
                    });
                }
            }
        }) : wx.showModal({
            title: "提示",
            content: "请输入退款原因",
            showCancel: !1
        });
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e);
        var t = {
            op: "mall_order",
            page: e.data.page,
            pagesize: e.data.pagesize,
            curr: e.data.tabCurr
        };
        app.util.request({
            url: "entry/wxapp/order",
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
            op: "mall_order",
            page: e.data.page,
            pagesize: e.data.pagesize,
            curr: e.data.tabCurr
        };
        app.util.request({
            url: "entry/wxapp/order",
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
                op: "mall_order",
                page: e.data.page,
                pagesize: e.data.pagesize,
                curr: e.data.tabCurr
            };
            app.util.request({
                url: "entry/wxapp/order",
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
    },
    onShareAppMessage: function(a) {
        var t = app.config.webname, e = "/xc_train/pages/base/base", n = "";
        if ("button" === a.from) {
            var o = a.target.dataset.index, s = this.data.list;
            t = s[o].title;
            var i = "/xc_train/pages/shared/shared?&group=" + s[o].group_id;
            e = e + "?&share=" + (i = escape(i)), n = s[o].simg;
        }
        return console.log(e), {
            title: t,
            path: e,
            imageUrl: n,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        };
    },
    setCanvasSize: function() {
        var a = {};
        try {
            var t = wx.getSystemInfoSync(), e = .4 * t.windowWidth, n = e;
            a.w = e, a.h = n;
        } catch (a) {
            console.log("获取设备信息失败" + a);
        }
        return a;
    },
    createQrCode: function(a, t, e, n) {
        QR.qrApi.draw(a, t, e, n);
        var o = this, s = setTimeout(function() {
            o.canvasToTempImage(), clearTimeout(s);
        }, 3e3);
    },
    canvasToTempImage: function() {
        var e = this;
        wx.canvasToTempFilePath({
            canvasId: "mycanvas",
            success: function(a) {
                var t = a.tempFilePath;
                console.log(t), e.setData({
                    imagePath: t
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    }
});