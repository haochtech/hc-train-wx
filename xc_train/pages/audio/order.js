var a = getApp(), t = require("../common/common.js");

Page({
    data: {
        curr: 0,
        pclass: [ "我的收藏", "已购音频", "收听历史" ],
        page: 1,
        pagesize: 20,
        isbottom: !1,
      shadow: !0,
      get_userinfo: !0
    },
    tab: function(t) {
        var e = this, s = t.currentTarget.dataset.index;
        s != e.data.curr && (e.setData({
            curr: s,
            page: 1,
            isbottom: !1,
            list: []
        }), a.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "audio_order",
                curr: e.data.curr,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }));
    },
    mark: function(t) {
        var e = this, s = t.currentTarget.dataset.index, r = e.data.list;
        a.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "mark",
                id: r[s].pid
            },
            success: function(a) {
                "" != a.data.data && (r.splice(s, 1), wx.showToast({
                    title: "操作成功"
                }), e.setData({
                    list: r
                }));
            }
        });
    },
    history: function(t) {
        var e = this, s = t.currentTarget.dataset.index, r = e.data.list;
        a.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "history",
                id: r[s].id,
                type: 1
            },
            success: function(a) {
                "" != a.data.data && (r.splice(s, 1), wx.showToast({
                    title: "删除成功"
                }), e.setData({
                    list: r
                }));
            }
        });
    },
    onLoad: function(e) {
        var s = this;
        t.config(s), t.theme(s), a.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "audio_order",
                curr: s.data.curr,
                page: s.data.page,
                pagesize: s.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? s.setData({
                    list: t.data,
                    page: s.data.page + 1
                }) : s.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        t.audio_end(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        t.setData({
            page: 1,
            isbottom: !1
        }), a.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "audio_order",
                curr: t.data.curr,
                page: t.data.page,
                pagesize: t.data.pagesize
            },
            success: function(a) {
                var e = a.data;
                wx.stopPullDownRefresh(), "" != e.data ? t.setData({
                    list: e.data,
                    page: t.data.page + 1
                }) : t.setData({
                    isbottom: !0,
                    list: []
                });
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        t.data.isbottom || a.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "audio_order",
                curr: t.data.curr,
                page: t.data.page,
                pagesize: t.data.pagesize
            },
            success: function(a) {
                var e = a.data;
                "" != e.data ? t.setData({
                    list: t.data.list.concat(e.data),
                    page: t.data.page + 1
                }) : t.setData({
                    isbottom: !0
                });
            }
        });
    }
});