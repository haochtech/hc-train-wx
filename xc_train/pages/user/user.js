var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        pagePath: "../user/user",
      shadow: true,
      get_userinfo: true
    },
  get_user: function() {
    this.setData({
      shadow: false,
      get_userinfo: false
    });
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
    to_shop: function() {
        app.util.request({
            url: "entry/wxapp/user",
            showLoading: !1,
            data: {
                op: "userinfo"
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (-1 == t.data.shop ? wx.showModal({
                    title: "错误",
                    content: "没有权限"
                }) : 1 == t.data.shop ? wx.navigateTo({
                    url: "../manage/index"
                }) : 2 == t.data.shop && wx.navigateTo({
                    url: "../manage/index?&shop=" + t.data.shop_id
                }));
            }
        });
    },
    onLoad: function(a) {
        var o = this;
        console.log(wx.getStorageSync('userInfo'));
        common.config(o), common.theme(o), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "map"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && o.setData({
                    map: t.data
                });
            }
        });
      var uInfo = wx.getStorageSync('userInfo');
      var userinfo = app.userinfo;
      if (uInfo.wxInfo) {
        if (userinfo) {
          userinfo.avatar = uInfo.wxInfo.avatarUrl;
          userinfo.nick = uInfo.wxInfo.nickName;
        } 
      }
      o.setData({
        userinfo: userinfo
      });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "map"
            },
            showLoading: !1,
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                "" != t.data && o.setData({
                    map: t.data
                });
            }
        });
    },
    onReachBottom: function() {}
});