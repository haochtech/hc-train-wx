var app = getApp(), common = require("../common/common.js");

function time_up(r) {
    var s = setInterval(function() {
        var a = r.data.fail;
        if (0 < a) {
            a -= 1;
            var t = [ 0, 0, 0 ];
            t[0] = parseInt(a / 60 / 60), t[2] = parseInt(a % 60), t[1] = parseInt(a / 60 % 60), 
            r.setData({
                fail: a,
                times: t
            });
        } else {
            clearInterval(s);
            var e = r.data.list;
            e.status, r.setData({
                list: e
            });
        }
    }, 1e3);
}

function time_up2(s) {
    setInterval(function() {
        for (var a = s.data.list.group_order, t = 0; t < a.length; t++) if (-1 == a[t].status && 0 < parseInt(a[t].fail)) {
            a[t].fail = a[t].fail - 1;
            var e = [ 0, 0, 0 ];
            e[0] = parseInt(parseInt(a[t].fail) / 60 / 60), e[2] = parseInt(parseInt(a[t].fail) % 60), 
            e[1] = parseInt(parseInt(a[t].fail) / 60 % 60), a[t].times = e;
        } else a[t].status;
        var r = s.data.list;
        r.group_order = a, s.setData({
            list: r
        });
    }, 1e3);
}

Page({
    data: {
        times: [ 0, 0, 0 ],
        fail: 0,
        numbervalue: 1,
        format: -1,
      shadow: !0,
      get_userinfo: !0
    },
    showbuy: function(a) {
        var t = a.currentTarget.dataset.index;
        if (2 == t) {
            var e = a.currentTarget.dataset.id;
            this.setData({
                showbuy: !0,
                group_status: t,
                group_id: e
            });
        } else this.setData({
            showbuy: !0,
            group_status: t
        });
    },
    closebuy: function() {
        this.setData({
            showbuy: !1
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
    radiochange: function(a) {
        var t = a.detail.value;
        this.data.xc;
        this.setData({
            format: t
        });
    },
    submit: function() {
        var a = this;
        -1 == a.data.format ? wx.showModal({
            title: "错误",
            content: "请选择规格"
        }) : 1 == a.data.group_status ? wx.navigateTo({
            url: "../mall/porder?&id=" + a.data.list.service + "&format=" + a.data.format + "&member=" + a.data.numbervalue + "&group=1&group_id=" + a.data.list.id
        }) : -1 == a.data.group_status ? wx.navigateTo({
            url: "../mall/porder?&id=" + a.data.list.service + "&format=" + a.data.format + "&member=" + a.data.numbervalue + "&group=1"
        }) : 2 == a.data.group_status && wx.navigateTo({
            url: "../mall/porder?&id=" + a.data.list.service + "&format=" + a.data.format + "&member=" + a.data.numbervalue + "&group=1&group_id=" + a.data.group_id
        });
    },
    onLoad: function(a) {
        var s = this;
        common.config(s), common.theme(s), app.util.request({
            url: "entry/wxapp/order",
            method: "POST",
            data: {
                op: "group",
                id: a.group
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data) {
                    if (-1 == t.data.status && 0 < parseInt(t.data.fail)) (r = [ 0, 0, 0 ])[0] = parseInt(t.data.fail / 60 / 60), 
                    r[2] = parseInt(t.data.fail % 60), r[1] = parseInt(t.data.fail / 60 % 60), s.setData({
                        fail: t.data.fail,
                        times: r
                    });
                    if ("" != t.data.service_list && null != t.data.service_list && "" != t.data.service_list.format && null != t.data.service_list.format && s.setData({
                        format: 0
                    }), (1 == t.data.status || 2 == t.data.status) && "" != t.data.group_order && null != t.data.group_order) {
                        for (var e = 0; e < t.data.group_order.legnth; e++) {
                            var r;
                            if (0 < parseInt(t.data.group_order[e].fail)) (r = [ 0, 0, 0 ])[0] = parseInt(parseInt(t.data.group_order[e].fail) / 60 / 60), 
                            r[2] = parseInt(parseInt(t.data.group_order[e].fail) % 60), r[1] = parseInt(parseInt(t.data.group_order[e].fail) / 60 % 60), 
                            t.data.group_order[e].times = r; else t.data.group_order[e].status = 2;
                        }
                        time_up2(s);
                    }
                    s.setData({
                        list: t.data
                    }), time_up(s);
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
    onReachBottom: function() {}
});