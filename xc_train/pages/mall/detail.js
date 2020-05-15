var tt, dd, app = getApp(), common = require("../common/common.js"), WxParse = require("../../../wxParse/wxParse.js");

function timeup(r) {
    tt = setInterval(function() {
        var a = r.data.failtime;
        if (0 < (a -= 1)) {
            var t = r.data.times;
            t[0] = parseInt(a / 86400), t[1] = parseInt(a / 3600 % 24), t[2] = parseInt(a / 60 % 60), 
            t[3] = parseInt(a % 60), r.setData({
                failtime: a,
                times: t
            });
        } else {
            clearInterval(tt);
            var e = r.data.list;
            e.type = 1, r.setData({
                list: e
            });
        }
    }, 1e3);
}

function time_up(o) {
    dd = setInterval(function() {
        for (var a = o.data.list.group_order, t = 0; t < a.length; t++) if (-1 == a[t].status && 0 < parseInt(a[t].fail)) {
            a[t].fail = a[t].fail - 1;
            var e = [ 0, 0, 0 ];
            e[0] = parseInt(parseInt(a[t].fail) / 60 / 60), e[2] = parseInt(parseInt(a[t].fail) % 60), 
            e[1] = parseInt(parseInt(a[t].fail) / 60 % 60), a[t].times = e;
        } else a[t].status;
        var r = o.data.list;
        r.group_order = a, o.setData({
            list: r
        });
    }, 1e3);
}

Page({
    data: {
        format: -1,
        numbervalue: 1,
        times: [ 0, 0, 0, 0 ],
        failtime: 0,
      shadow: !0,
      get_userinfo: !0
    },
    radiochange: function(a) {
        var t = a.detail.value;
        this.setData({
            format: t
        });
    },
    numMinus: function() {
        var a = this.data.numbervalue;
        1 == a || (a--, this.setData({
            numbervalue: a
        }));
    },
    numPlus: function() {
        var a = this.data.numbervalue;
        a++, this.setData({
            numbervalue: a
        });
    },
    valChange: function(a) {
        var t = a.detail.value;
        1 <= t || (t = 1), this.setData({
            numbervalue: t
        });
    },
    submit: function(a) {
        var t = this;
        wx.navigateTo({
            url: "porder?&id=" + t.data.list.id + "&format=" + t.data.format + "&member=" + t.data.numbervalue
        });
    },
    group_submit: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        1 == e ? wx.navigateTo({
            url: "porder?&id=" + t.data.list.id + "&format=" + t.data.format + "&member=" + t.data.numbervalue
        }) : 2 == e && wx.navigateTo({
            url: "porder?&id=" + t.data.list.id + "&format=" + t.data.format + "&member=" + t.data.numbervalue + "&group=1"
        });
    },
    closect: function() {
        this.setData({
            showct: !1
        });
    },
    showct: function() {
        this.setData({
            showct: !0
        });
    },
    closectd: function() {
        this.setData({
            showctd: !1
        });
    },
    ctFunc: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            showct: !1,
            showctd: !0,
            group_index: t
        });
    },
    group_btn: function() {
        var a = this;
        if (-1 == a.data.format) wx.showModal({
            title: "错误",
            content: "请选择规格"
        }); else {
            var t = "porder?&id=" + a.data.list.id + "&format=" + a.data.format + "&member=" + a.data.numbervalue + "&group=1&group_id=" + a.data.list.group_order[a.data.group_index].id;
            wx.navigateTo({
                url: t
            });
        }
    },
    onLoad: function(a) {
        var o = this;
        common.config(o), common.theme(o), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "mall_detail",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    if (2 == t.data.type && "" != t.data.group_order && null != t.data.group_order) for (var e = 0; e < t.data.group_order.length; e++) if (0 < parseInt(t.data.group_order[e].fail)) {
                        var r = [ 0, 0, 0 ];
                        r[0] = parseInt(parseInt(t.data.group_order[e].fail) / 60 / 60), r[2] = parseInt(parseInt(t.data.group_order[e].fail) % 60), 
                        r[1] = parseInt(parseInt(t.data.group_order[e].fail) / 60 % 60), t.data.group_order[e].times = r, 
                        console.log(r);
                    } else t.data.group_order[e].status = 2;
                    if (o.setData({
                        list: t.data
                    }), "" != t.data.content && null != t.data.content) WxParse.wxParse("article", "html", t.data.content, o, 0);
                    "" != t.data.format && null != t.data.format && o.setData({
                        format: 0
                    }), 3 == t.data.type && 0 != t.data.failtime && (o.setData({
                        failtime: t.data.failtime
                    }), timeup(o)), 2 == t.data.type && "" != t.data.group_order && null != t.data.group_order && time_up(o);
                }
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
            url: "entry/wxapp/service",
            data: {
                op: "mall_detail",
                id: o.data.list.id
            },
            success: function(a) {
                wx.stopPullDownRefresh();
                var t = a.data;
                if ("" != t.data) {
                    if (2 == t.data.type && "" != t.data.group_order && null != t.data.group_order) for (var e = 0; e < t.data.group_order.length; e++) if (0 < parseInt(t.data.group_order[e].fail)) {
                        var r = [ 0, 0, 0 ];
                        r[0] = parseInt(parseInt(t.data.group_order[e].fail) / 60 / 60), r[2] = parseInt(parseInt(t.data.group_order[e].fail) % 60), 
                        r[1] = parseInt(parseInt(t.data.group_order[e].fail) / 60 % 60), t.data.group_order[e].times = r, 
                        console.log(r);
                    } else t.data.group_order[e].status = 2;
                    if (o.setData({
                        list: t.data
                    }), "" != t.data.content && null != t.data.content) WxParse.wxParse("article", "html", t.data.content, o, 0);
                    clearInterval(tt), 3 == t.data.type && 0 != t.data.failtime && (o.setData({
                        failtime: t.data.failtime
                    }), timeup(o)), clearInterval(dd), 2 == t.data.type && "" != t.data.group_order && null != t.data.group_order && time_up(o);
                }
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = "/xc_train/pages/mall/detail?&id=" + this.data.list.id;
        return a = escape(a), {
            title: this.data.config.title + "-" + this.data.list.name,
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