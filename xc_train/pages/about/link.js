var app = getApp(), WxParse = require("../../../wxParse/wxParse.js"), common = require("../common/common.js");

function GetRequest(t) {
    t = t;
    var n = new Object();
    if (-1 != t.indexOf("?")) for (var e = t.substr(1).split("&"), a = 0; a < e.length; a++) n[e[a].split("=")[0]] = unescape(e[a].split("=")[1]);
    return n;
}

Page({
  data: { shadow: !0, get_userinfo: !0},
    onLoad: function(a) {
        var o = this;
        common.config(o, app), common.theme(o, app);
        var t = GetRequest(unescape(a.url));
        "" != t.id && null != t.id && app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "article",
                id: t.id
            },
            success: function(t) {
                var n = t.data;
                if ("" != n.data && (o.setData({
                    list: n.data,
                    url: unescape(a.url)
                }), 2 == n.data.link_type)) {
                    var e = n.data.content;
                    WxParse.wxParse("content", "html", e, o, 5);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.list.title + "-" + t.data.config.title,
            path: "/xc_train/pages/about/link?&url=" + escape(t.data.url),
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        };
    }
});