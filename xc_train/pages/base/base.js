var app = getApp(), common = require("../common/common.js");

Page({
    data: {
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        common.login(this), wx.getSystemInfo({
            success: function(e) {
                -1 != e.system.indexOf("Android") ? app.mobile = 2 : -1 != e.system.indexOf("iOS") && (app.mobile = 1);
            }
        }), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "base"
            },
            showLoading: !1,
            success: function(e) {
                var n = e.data;
                if ("" != n.data && ("" != n.data.config && null != n.data.config && (app.config = n.data.config), 
                "" != n.data.theme && null != n.data.theme && (app.theme = n.data.theme)), "" != app.service && null != app.service) wx.redirectTo({
                    url: "../service/detail?&id=" + app.service
                }); else if ("" != a.share && null != a.share) {
                    var o = unescape(a.share);
                    wx.redirectTo({
                        url: o
                    });
                } else wx.redirectTo({
                    url: "../index/index"
                });
            }
        }), app.util.request({
            url: "entry/wxapp/grouprefund",
            method: "POST",
            showLoading: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});