var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../coupon/coupon",
        curr: 1,
      shadow: !0,
      get_userinfo: !0
    },
    tab: function(t) {
        var o = this, a = t.currentTarget.dataset.index;
        a != o.data.curr && (o.setData({
            curr: a,
            list: []
        }), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "coupon",
                curr: o.data.curr
            },
            showLoading: !1,
            success: function(t) {
                var a = t.data;
                "" != a.data && o.setData({
                    list: a.data
                });
            }
        }));
    },
    setcoupon: function(t) {
        var o = this, n = t.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "是否领取优惠券？",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/user",
                    data: {
                        op: "set_coupon",
                        id: o.data.list[n].id
                    },
                    showLoading: !1,
                    success: function(t) {
                        if ("" != t.data.data) {
                            wx.showToast({
                                title: "领取成功",
                                icon: "success",
                                duration: 2e3
                            });
                            var a = o.data.list;
                            delete a[n], o.setData({
                                list: a
                            });
                        }
                    }
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    to_shop: function(t) {
        wx.navigateTo({
            url: "../service/index"
        });
    },
    onLoad: function(t) {
        var o = this;
        common.config(o), common.theme(o), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "coupon",
                curr: o.data.curr
            },
            showLoading: !1,
            success: function(t) {
                var a = t.data;
                "" != a.data && o.setData({
                    list: a.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "coupon",
                curr: o.data.curr
            },
            showLoading: !1,
            success: function(t) {
                wx.stopPullDownRefresh();
                var a = t.data;
                "" != a.data && o.setData({
                    list: a.data
                });
            }
        });
    },
    onReachBottom: function() {}
});