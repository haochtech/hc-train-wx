var app = getApp(), common = require("../common/common.js");

function wxpay(a, t) {
    a.appId;
    var e = a.timeStamp.toString(), o = a.package, r = a.nonceStr, i = a.paySign.toUpperCase();
    a.out_trade_no;
    wx.requestPayment({
        timeStamp: e,
        nonceStr: r,
        package: o,
        signType: "MD5",
        paySign: i,
        success: function(t) {
            wx.showToast({
                title: "支付成功",
                icon: "success",
                duration: 2e3
            }), setTimeout(function() {
                "" != a.group_id && null != a.group_id ? wx.reLaunch({
                    url: "../order_detail/order_detail?&id=" + a.group_id
                }) : wx.redirectTo({
                    url: "../order/order"
                });
            }, 2e3);
        }
    });
}

Page({
    data: {
        amount: 0,
        o_amount: 0,
        ticketCurr: 0,
        showTicket: !1,
        pei_type: 1,
      shadow: !0,
      get_userinfo: !0
    },
    pei_change: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        e != a.data.pei_type && (a.setData({
            pei_type: e
        }), a.get_sum());
    },
    input: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    showTicket: function() {
        this.setData({
            showTicket: !0
        });
    },
    tchoice: function(t) {
        var a = t.currentTarget.id;
        this.setData({
            ticketCurr: a,
            showTicket: !1
        }), this.get_sum();
    },
    submit: function(t) {
        var e = this;
        if ("" != e.data.address && null != e.data.address) if ("" != e.data.store_id && null != e.data.store_id) {
            var a = {
                address: JSON.stringify(e.data.address),
                form_id: t.detail.formId,
                store: e.data.store_id
            };
            "" != e.data.content && null != e.data.content && (a.content = e.data.content), 
            0 < e.data.ticketCurr && (a.coupon = e.data.list.coupon[e.data.ticketCurr - 1].id), 
            "" != e.data.group && null != e.data.group && (a.group = e.data.group), "" != e.data.group_id && null != e.data.group_id && (a.group_id = e.data.group_id), 
            a.id = e.data.id, a.format = e.data.format, a.member = e.data.member, a.pei_type = e.data.pei_type, 
            app.util.request({
                url: "entry/wxapp/mallorder",
                data: a,
                success: function(t) {
                    var a = t.data;
                    "" != a.data && (1 == a.data.status ? "" != a.data.errno && null != a.data.errno ? wx.showModal({
                        title: "错误",
                        content: a.data.message,
                        showCancel: !1
                    }) : wxpay(a.data, e) : 2 == a.data.status && (wx.showToast({
                        title: "支付成功",
                        icon: "success",
                        duration: 2e3
                    }), setTimeout(function() {
                        "" != a.data.group_id && null != a.data.group_id ? wx.reLaunch({
                            url: "../order_detail/order_detail?&id=" + a.data.group_id
                        }) : wx.redirectTo({
                            url: "../order/order"
                        });
                    }, 2e3)));
                }
            });
        } else wx.showModal({
            title: "错误",
            content: "请选择提货校区"
        }); else wx.showModal({
            title: "错误",
            content: "请完善用户信息"
        });
    },
    store_on: function() {
        this.setData({
            store_page: !0
        });
    },
    store_close: function() {
        this.setData({
            store_page: !1
        });
    },
    store_choose: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.list.store;
        this.setData({
            store_page: !1,
            store_id: e[a].id,
            store_name: e[a].name
        });
    },
    onLoad: function(t) {
        var e = this;
        common.config(e), common.theme(e), e.setData({
            id: t.id,
            format: t.format,
            member: t.member
        });
        var a = {
            op: "mall_detail",
            id: t.id,
            format: t.format,
            member: t.member
        };
        "" != t.group && null != t.group && (a.group = t.group, e.setData({
            group: t.group
        })), "" != t.group_id && null != t.group_id && e.setData({
            group_id: t.group_id
        }), app.util.request({
            url: "entry/wxapp/service",
            data: a,
            success: function(t) {
                var a = t.data;
                "" != a.data && (e.setData({
                    list: a.data
                }), e.get_sum());
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "address"
            },
            success: function(t) {
                var a = t.data;
                "" != a.data && e.setData({
                    address: a.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    get_sum: function() {
        var t = this, a = 0, e = 0;
        -1 == t.data.format ? e = (parseInt(t.data.member) * parseFloat(t.data.list.price)).toFixed(2) : 1 == t.data.list.type || 2 == t.data.list.type ? e = "" != t.data.group && null != t.data.group && 2 == t.data.list.type ? (parseInt(t.data.member) * parseFloat(t.data.list.format[t.data.format].group_price)).toFixed(2) : (parseInt(t.data.member) * parseFloat(t.data.list.format[t.data.format].price)).toFixed(2) : 3 == t.data.list.type && (e = (parseInt(t.data.member) * parseFloat(t.data.list.format[t.data.format].limit_price)).toFixed(2)), 
        a = 0 < t.data.ticketCurr ? (parseFloat(e) - parseFloat(t.data.list.coupon[t.data.ticketCurr - 1].name)).toFixed(2) : e, 
        1 == t.data.pei_type && "" != t.data.list.fee && null != t.data.list.fee && (a = (parseFloat(a) + parseFloat(t.data.list.fee)).toFixed(2)), 
        t.setData({
            o_amount: a,
            amount: e
        });
    }
});