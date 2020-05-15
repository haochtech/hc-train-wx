var app = getApp(), common = require("../common/common.js");

function sign(a) {
    var t = a.data.store_id, e = a.data.name, s = a.data.mobile, o = a.data.total, i = !0;
    "" != t && null != t || (i = !1), "" != e && null != e || (i = !1), "" != s && null != s || (i = !1);
    /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/.test(s) || (i = !1), 
    "" != o && null != o || (i = !1), a.setData({
        submit: i
    });
}

Page({
    data: {
        choose: -1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
        submit: !1,
        store_page: 1,
        store_pagesize: 20,
        store_isbottom: !1,
        is_load: !1,
      shadow: !0,
      get_userinfo: !0
    },
    menu_on: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            shadows: !0,
            menu: !0,
            choose: t
        });
    },
    menu_close: function() {
        this.setData({
            menu: !1,
            shadows: !1,
            name: "",
            total: "",
            mobile: ""
        });
    },
    choose: function(a) {
        var t = a.currentTarget.dataset.index;
        t != this.data.choose && this.setData({
            choose: t
        });
    },
    input: function(a) {
        var t = this;
        switch (a.currentTarget.dataset.name) {
          case "name":
            t.setData({
                name: a.detail.value
            });
            break;

          case "mobile":
            t.setData({
                mobile: a.detail.value
            });
            break;

          case "total":
            t.setData({
                total: a.detail.value
            });
        }
        sign(t);
    },
    store_on: function() {
        this.setData({
            store_pages: !0
        });
    },
    store_choose: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        t.setData({
            store_id: t.data.store_list[e].id,
            store_name: t.data.store_list[e].name,
            store_pages: !1
        }), sign(t);
    },
    store_close: function() {
        this.setData({
            store_pages: !1
        });
    },
    submit: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        if (-1 == t.data.choose) wx.showModal({
            title: "错误",
            content: "请先选择一门课程！",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        }); else if (1 == e) wx.navigateTo({
            url: "../sign/sign?&pid=" + t.data.list[t.data.choose].id
        }); else if (2 == e && t.data.submit) {
            var s = {
                pid: t.data.list[t.data.choose].id,
                name: t.data.name,
                mobile: t.data.mobile,
                total: t.data.total,
                form_id: a.detail.formId,
                order_type: e,
                store: t.data.store_id
            };
            app.util.request({
                url: "entry/wxapp/setorder",
                data: s,
                success: function(a) {
                    "" != a.data.data && (t.setData({
                        menu: !1,
                        shadows: !1,
                        name: "",
                        total: "",
                        mobile: ""
                    }), wx.showToast({
                        title: "预约成功",
                        icon: "success",
                        duration: 2e3
                    }));
                }
            });
        }
    },
    store_scroll: function() {
        var e = this;
        if (!e.data.store_isbottom && !e.data.is_load) {
            e.setData({
                is_load: !0
            });
            var a = {
                op: "school",
                page: e.data.store_page,
                pagesize: e.data.store_pagesize
            };
            null != e.data.latitude && "" != e.data.latitude && (a.latitude = e.data.latitude), 
            null != e.data.longitude && "" != e.data.longitude && (a.longitude = e.data.longitude), 
            app.util.request({
                url: "entry/wxapp/index",
                data: a,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: e.data.store_list.concat(t.data),
                        page: e.data.store_page + 1
                    }) : e.setData({
                        store_isbottom: !0
                    }), e.setData({
                        is_load: !1
                    });
                }
            });
        }
    },
    onLoad: function(a) {
        var s = this;
        common.config(s), common.theme(s), "" != a.curr && null != a.curr && s.setData({
            curr: a.curr
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "list",
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
        }), wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.latitude, e = a.longitude;
                a.speed, a.accuracy;
                s.setData({
                    latitude: t,
                    longitude: e
                });
            },
            complete: function() {
                var a = {
                    op: "school",
                    page: s.data.store_page,
                    pagesize: s.data.store_pagesize
                };
                null != s.data.latitude && "" != s.data.latitude && (a.latitude = s.data.latitude), 
                null != s.data.longitude && "" != s.data.longitude && (a.longitude = s.data.longitude), 
                app.util.request({
                    url: "entry/wxapp/index",
                    data: a,
                    success: function(a) {
                        var t = a.data;
                        "" != t.data ? s.setData({
                            store_list: t.data,
                            page: s.data.store_page + 1
                        }) : s.setData({
                            store_isbottom: !0
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
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "list",
                curr: e.data.curr,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? (wx.stopPullDownRefresh(), e.setData({
                    list: t.data,
                    page: e.data.page + 1
                })) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this;
        e.data.isbottom || app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "list",
                curr: e.data.curr,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
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
});