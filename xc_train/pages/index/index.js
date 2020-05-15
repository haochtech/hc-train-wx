var app = getApp(), common = require("../common/common.js");

function toEscape(a) {
    console.log(a);
    for (var t = 0; t < a.length; t++) "" != a[t].link && null != a[t].link && (-1 != a[t].link.indexOf("../") ? a[t].app = -1 : (a[t].link = a[t].link.split(","), 
    a[t].app = 1));
    return a;
}

Page({
    data: {
        pagePath: "../index/index",
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        ad_show: !0,
        shadow: true,
      get_userinfo: true,
    },
    link: function(a) {
        var t = a.currentTarget.dataset.link;
        "" != t && null != t && (-1 != t.indexOf("https") ? (t = escape(t), wx.navigateTo({
            url: "../about/link?&url=" + t
        })) : wx.navigateTo({
            url: t
        }));
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
    ad_close: function() {
        this.setData({
            shadow: !1,
            open_ad: !1
        });
    },
    error: function(a) {
        console.log(a);
        this.setData({
            ad_show: !1
        });
    },
    adLoad: function(a) {
        console.log(a);
        this.setData({
            ad_show: !0
        });
    },
    onLoad: function(a) {
        var n = this;
        common.config(n), common.theme(n), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "index"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && ("" != t.data.banner && null != t.data.banner && n.setData({
                    banner: t.data.banner
                }), "" != t.data.ad && null != t.data.ad && n.setData({
                    ad: t.data.ad
                }), "" != t.data.nav && null != t.data.nav && n.setData({
                    nav: toEscape(t.data.nav)
                }), "" != t.data.list && null != t.data.list && n.setData({
                    list: t.data.list
                }), "" != t.data.mall && null != t.data.mall && n.setData({
                    mall: t.data.mall
                }), "" != t.data.open_ad && null != t.data.open_ad && n.setData({
                    open_list: t.data.open_ad
                }));
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
            url: "entry/wxapp/index",
            data: {
                op: "index"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                "" != t.data && (wx.stopPullDownRefresh(), "" != t.data.banner && null != t.data.banner && n.setData({
                    banner: t.data.banner
                }), "" != t.data.ad && null != t.data.ad && n.setData({
                    ad: t.data.ad
                }), "" != t.data.nav && null != t.data.nav && n.setData({
                    nav: toEscape(t.data.nav)
                }), "" != t.data.list && null != t.data.list && n.setData({
                    list: t.data.list
                }));
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = "/xc_train/pages/index/index";
        return a = escape(a), {
            title: this.data.config.title + "-首页",
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