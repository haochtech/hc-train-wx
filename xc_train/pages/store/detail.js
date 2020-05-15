var app = getApp(), common = require("../common/common.js");

Page({
  data: {
      shadow: !0,
      get_userinfo: !0
    },
    call: function(a) {
        wx.makePhoneCall({
            phoneNumber: this.data.list.mobile
        });
    },
    map: function(a) {
        var t = this;
        wx.openLocation({
            latitude: parseFloat(t.data.list.latitude),
            longitude: parseFloat(t.data.list.longitude),
            name: t.data.list.address,
            address: t.data.list.address,
            scale: 28
        });
    },
    qie: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function(a) {
        var o = this;
        common.config(o), common.theme(o), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "school_detail",
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
            url: "entry/wxapp/index",
            data: {
                op: "school_detail",
                id: o.data.list.id
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                "" != t.data && o.setData({
                    list: t.data
                });
            }
        });
    },
    onReachBottom: function() {}
});