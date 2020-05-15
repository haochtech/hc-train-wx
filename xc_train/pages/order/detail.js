var app = getApp(), common = require("../common/common.js");

Page({
    data: {
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var o = this;
        common.config(o), common.theme(o), app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "mall_order_detail",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && o.setData({
                    list: t.data
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
            url: "entry/wxapp/order",
            data: {
                op: "mall_order_detail",
                id: o.data.list.id
            },
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data && o.setData({
                    list: t.data
                });
            }
        });
    },
    onReachBottom: function() {}
});