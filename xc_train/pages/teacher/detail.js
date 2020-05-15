var app = getApp(), WxParse = require("../../../wxParse/wxParse.js"), common = require("../common/common.js");

Page({
    data: {
      shadow: !0,
      get_userinfo: !0
    },
    zan: function(a) {
        var s = this, n = a.currentTarget.dataset.index, t = !0;
        1 == n ? 1 == s.data.list.is_student && (t = !1) : 2 == n && 1 == s.data.list.is_zan && (t = !1), 
        t && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "zan",
                id: s.data.list.id,
                status: n
            },
            success: function(a) {
                if ("" != a.data.data) {
                    wx.showToast({
                        title: "操作成功",
                        icon: "success",
                        duration: 2e3
                    });
                    var t = s.data.list;
                    if (1 == n) {
                        var e = {
                            avatar: app.userinfo.avatar
                        };
                        t.member.unshift(e), t.is_student = 1;
                    } else 2 == n && (t.is_zan = 1);
                    s.setData({
                        list: t
                    });
                }
            }
        });
    },
    onLoad: function(a) {
        var s = this;
        common.config(s), common.theme(s), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "teacher_detail",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data && (s.setData({
                    list: t.data
                }), 2 == t.data.content_type)) {
                    var e = t.data.content2;
                    WxParse.wxParse("content", "html", e, s, 5);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "teacher_detail",
                id: e.data.list.id
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                "" != t.data && e.setData({
                    list: t.data
                });
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = this, t = "/xc_train/pages/teacher/detail?&id=" + a.data.list.id;
        return t = escape(t), {
            title: a.data.config.title + "-" + a.data.list.name,
            path: "/xc_train/pages/base/base?&share=" + t,
            success: function(a) {
                console.log(a);
            },
            fail: function(a) {
                console.log(a);
            }
        };
    }
});