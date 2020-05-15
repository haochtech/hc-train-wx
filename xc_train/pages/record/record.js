var app = getApp(), common = require("../common/common.js"), QR = require("../../../utils/qrcode.js");

Page({
    data: {
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    code: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        t.setData({
            maskHidden: !1
        }), wx.showToast({
            title: "生成中...",
            icon: "loading",
            duration: 2e3
        });
        var o = setTimeout(function() {
            wx.hideToast();
            var a = t.setCanvasSize();
            t.createQrCode(t.data.list[e].out_trade_no, "mycanvas", a.w, a.h), t.setData({
                maskHidden: !0,
                shadows: !0,
                menu: !0
            }), clearTimeout(o);
        }, 2e3);
    },
    menu_close: function() {
        this.setData({
            menu: !1,
            shadows: !1,
            use_time: !1
        });
    },
    use_on: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            shadows: !0,
            use_time: !0,
            index: t
        });
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), "" != a.order_type && "" != a.order_type && e.setData({
            order_type: a.order_type
        }), app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "order",
                page: e.data.page,
                pagesize: e.data.pagesize,
                order_type: e.data.order_type
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
            isbottom: !1
        }), app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "order",
                page: e.data.page,
                pagesize: e.data.pagesize,
                order_type: e.data.order_type
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
            url: "entry/wxapp/order",
            data: {
                op: "order",
                page: e.data.page,
                pagesize: e.data.pagesize,
                order_type: e.data.order_type
            },
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
    },
    setCanvasSize: function() {
        var a = {};
        try {
            var t = wx.getSystemInfoSync(), e = .426666 * t.windowWidth, o = e;
            a.w = e, a.h = o;
        } catch (a) {
            console.log("获取设备信息失败" + a);
        }
        return a;
    },
    createQrCode: function(a, t, e, o) {
        QR.qrApi.draw(a, t, e, o);
        var s = this, n = setTimeout(function() {
            s.canvasToTempImage(), clearTimeout(n);
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
    },
    previewImg: function(a) {
        var t = this.data.imagePath;
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    }
});