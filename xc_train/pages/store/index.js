var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    onLoad: function(a) {
        var d = this;
        common.config(d), common.theme(d), wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.latitude, e = a.longitude;
                a.speed, a.accuracy;
                d.setData({
                    latitude: t,
                    longitude: e
                });
            },
            complete: function() {
                var a = {
                    op: "school",
                    page: d.data.page,
                    pagesize: d.data.pagesize
                };
                null != d.data.latitude && "" != d.data.latitude && (a.latitude = d.data.latitude), 
                null != d.data.longitude && "" != d.data.longitude && (a.longitude = d.data.longitude), 
                app.util.request({
                    url: "entry/wxapp/index",
                    data: a,
                    success: function(a) {
                        var t = a.data;
                        "" != t.data ? d.setData({
                            list: t.data,
                            page: d.data.page + 1
                        }) : d.setData({
                            isbottom: !0
                        });
                    }
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
            op: "school",
            page: e.data.page,
            pagesize: e.data.pagesize
        };
        null != e.data.latitude && "" != e.data.latitude && (a.latitude = e.data.latitude), 
        null != e.data.longitude && "" != e.data.longitude && (a.longitude = e.data.longitude), 
        app.util.request({
            url: "entry/wxapp/index",
            data: a,
            success: function(a) {
                var t = a.data;
                wx.stopPullDownRefresh(), "" != t.data ? e.setData({
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
                op: "school",
                page: e.data.page,
                pagesize: e.data.pagesize
            };
            null != e.data.latitude && "" != e.data.latitude && (a.latitude = e.data.latitude), 
            null != e.data.longitude && "" != e.data.longitude && (a.longitude = e.data.longitude), 
            app.util.request({
                url: "entry/wxapp/index",
                data: a,
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
        }
    }
});