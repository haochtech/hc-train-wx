var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../contact/contact",
      shadow: !0,
      get_userinfo: !0
    },
    call: function() {
        var a = this.data.map;
        wx.makePhoneCall({
            phoneNumber: a.content.mobile
        });
    },
    map: function() {
        var a = this.data.map;
        wx.openLocation({
            latitude: parseFloat(a.content.latitude),
            longitude: parseFloat(a.content.longitude),
            name: a.content.address,
            address: a.content.address,
            scale: 28
        });
    },
    onLoad: function(a) {
        var n = this;
        common.config(n), common.theme(n), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "map"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && n.setData({
                    map: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "map"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && (wx.stopPullDownRefresh(), n.setData({
                    map: t.data
                }));
            }
        });
    },
    onReachBottom: function() {}
});