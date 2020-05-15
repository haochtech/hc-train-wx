var common = require("../common/common.js"), app = getApp();

function get_data(e) {
    app.util.request({
        url: "entry/wxapp/user",
        method: "POST",
        data: {
            op: "address"
        },
        success: function(t) {
            var a = t.data;
            wx.stopPullDownRefresh(), "" != a.data && e.setData({
                list: a.data
            });
        }
    });
}

function sign(t) {
    var a = t.data.name, e = t.data.mobile, s = t.data.address, n = "", d = t.data.config, o = -1;
    if ("" != d.map_status && null != d.map_status && (o = d.map_status), 1 != o && ("" != s && null != s || (n = "请先定位")), 
    "" == e || null == e) n = "请输入手机号码";
    "" != a && null != a || (n = "请输入您的姓名"), "" == n ? t.setData({
        submit: !0
    }) : wx.showModal({
        title: "错误",
        content: n
    });
}

Page({
    data: {
        change_id: -1,
        shwoLayer: !1,
        newsex: 1,
        submit: !1,
        can_load: !0,
        shadow: !0,
        get_userinfo: !0
    },
    edit: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.list;
        this.setData({
            shwoLayer: !0,
            name: e[a].name,
            newsex: e[a].sex,
            mobile: e[a].mobile,
            address: e[a].address,
            content: e[a].content,
            latitude: e[a].latitude,
            longitude: e[a].longitude,
            change_id: e[a].id
        });
    },
    addressChange: function(t) {
        var e = this, s = t.detail.value, n = e.data.list;
        1 != n[s].status && app.util.request({
            url: "entry/wxapp/user",
            method: "POST",
            data: {
                op: "address_status",
                id: n[s].id
            },
            success: function(t) {
                if ("" != t.data.data) {
                    for (var a = 0; a < n.length; a++) n[a].status = -1;
                    n[s].status = 1, e.setData({
                        list: n
                    });
                }
            }
        });
    },
    deleteAddr: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.list;
        wx.showModal({
            title: "确认删除",
            content: "是否删除这条地址信息？",
            success: function(t) {
                t.confirm && (1 == s[e].status ? wx.showModal({
                    title: "错误",
                    content: "默认地址无法删除"
                }) : app.util.request({
                    url: "entry/wxapp/user",
                    method: "POST",
                    data: {
                        op: "address_del",
                        id: s[e].id
                    },
                    success: function(t) {
                        "" != t.data.data && (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        }), s.splice(e, 1), a.setData({
                            list: e
                        }));
                    }
                }));
            }
        });
    },
    mapping: function() {
        var a = this;
        wx.chooseLocation({
            success: function(t) {
                a.setData({
                    address: t.address,
                    latitude: t.latitude,
                    longitude: t.longitude
                });
            }
        });
    },
    sexSelect: function(t) {
        var a = t.currentTarget.id;
        this.setData({
            newsex: a
        });
    },
    showLayer: function() {
        this.setData({
            shwoLayer: !0
        });
    },
    closeLayer: function() {
        this.setData({
            shwoLayer: !1,
            name: "",
            newsex: 1,
            mobile: "",
            address: "",
            content: "",
            submit: !1,
            change_id: -1
        });
    },
    input: function(t) {
        var a = this, e = t.currentTarget.dataset.name, s = t.detail.value;
        switch (e) {
          case "name":
            a.setData({
                name: s
            });
            break;

          case "mobile":
            a.setData({
                mobile: s
            });
            break;

          case "content":
            a.setData({
                content: s
            });
        }
    },
    submit: function() {
        var e = this;
        if (sign(e), e.data.submit && e.data.can_load) {
            e.setData({
                can_load: !1,
                shwoLayer: !1
            });
            var t = {
                op: "address_edit",
                name: e.data.name,
                sex: e.data.newsex,
                mobile: e.data.mobile
            };
            "" != e.data.address && null != e.data.address && (t.address = e.data.address, t.latitude = e.data.latitude, 
            t.longitude = e.data.longitude), "" != e.data.content && null != e.data.content && (t.content = e.data.content), 
            -1 != e.data.change_id && (t.id = e.data.change_id), app.util.request({
                url: "entry/wxapp/user",
                method: "POST",
                data: t,
                success: function(t) {
                    var a = t.data;
                    e.setData({
                        can_load: !0,
                        name: "",
                        newsex: 1,
                        mobile: "",
                        address: "",
                        content: "",
                        submit: !1,
                        change_id: -1
                    }), "" != a.data && (wx.showToast({
                        title: "操作成功",
                        icon: "success",
                        duration: 2e3
                    }), get_data(e));
                }
            });
        }
    },
    onLoad: function(t) {
        var a = this;
        common.config(a), common.theme(a), get_data(a);
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