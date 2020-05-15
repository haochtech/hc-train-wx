var app = getApp(), common = require("../common/common.js");

Page({
    data: {
        curr: 1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
        menu_index: "",
        menu_list: "",
        p_curr: -1,
      shadow: !0,
      get_userinfo: !0
    },
    get_user: function () {
      this.setData({
        shadow: false,
        get_userinfo: false
      });
    },
    updateUserInfo: function () {
      var o = getApp();
      "" != e.detail.userInfo && null != e.detail.userInfo && (o.util.getUserInfo(function (e) {
        var t = {};
        "" != e.wxInfo && null != e.wxInfo ? (t = e.wxInfo).op = "userinfo" : t.op = "userinfo",
          o.util.request({
            url: "entry/wxapp/index",
            showLoading: !1,
            data: t,
            success: function (e) {
              var t = e.data;
              "" != t.data && (o.userinfo = t.data, page.setData({
                userinfo: t.data
              }));
            }
          });
      }, e.detail), console.log(e));
    },
    user_close: function() {
      this.setData({
        shadow: !0,
        get_userinfo: !0,
      });
    },
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.curr) {
            e.setData({
                curr: t,
                page: 1,
                isbottom: !1,
                list: []
            });
            var s = {
                op: "index",
                page: e.data.page,
                pagesize: e.data.pagesize,
                curr: e.data.curr
            };
            -1 != e.data.p_curr && (s.cid = e.data.pclass[e.data.p_curr].id), "" != e.data.shop && null != e.data.shop && (s.store = e.data.shop), 
            app.util.request({
                url: "entry/wxapp/manage",
                data: s,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: t.data,
                        page: e.data.page + 1
                    }) : e.setData({
                        isbottom: !0
                    });
                }
            });
        }
    },
    p_tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        if (t != e.data.p_curr) {
            e.setData({
                p_curr: t,
                list: [],
                page: 1,
                isbottom: !1
            });
            var s = {
                op: "index",
                page: e.data.page,
                pagesize: e.data.pagesize,
                curr: e.data.curr
            };
            -1 != e.data.p_curr && (s.cid = e.data.pclass[e.data.p_curr].id), app.util.request({
                url: "entry/wxapp/manage",
                data: s,
                success: function(a) {
                    var t = a.data;
                    "" != t.data ? e.setData({
                        list: t.data,
                        page: e.data.page + 1
                    }) : e.setData({
                        isbottom: !0
                    });
                }
            });
        }
    },
    choose: function(a) {
        var t = this, e = a.currentTarget.dataset.index, s = t.data.list, r = t.data.name_curr;
        2 == s[r].order[e].status ? s[r].order[e].status = 1 : s[r].order[e].status = 2, 
        t.setData({
            list: s
        });
    },
    call: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        "" != t.data.list[e].mobile && null != t.data.list[e].mobile ? wx.makePhoneCall({
            phoneNumber: t.data.list[e].mobile
        }) : wx.makePhoneCall({
            phoneNumber: t.data.list[e].userinfo.mobile
        });
    },
    menu_on: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        t.setData({
            menu: !0,
            shadow: !1,
            menu_index: e + 1,
            menu_list: t.data.list[e],
            menu_curr: t.data.curr
        });
    },
    menu_close: function() {
        this.setData({
            menu: !1,
            shadow: !0,
            menu2: !1,
            menu_index: "",
            menu_list: "",
            name_curr: ""
        });
    },
    menu_name: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            menu2: !0,
            shadow: !1,
            name_curr: t
        });
    },
    submit: function() {
        var e = this, s = e.data.menu_list;
        -1 == s.use && wx.showModal({
            title: "提示",
            content: "确定核销吗？",
            success: function(a) {
                a.confirm ? app.util.request({
                    url: "entry/wxapp/manage",
                    data: {
                        op: "order_status",
                        id: s.id,
                        curr: e.data.menu_curr
                    },
                    success: function(a) {
                        if ("" != a.data.data) {
                            if ("" != e.data.menu_index && null != e.data.menu_index) {
                                var t = e.data.list;
                                1 == e.data.menu_curr || 2 == e.data.menu_curr ? (s.is_use = parseInt(s.is_use) + 1, 
                                t[e.data.menu_index - 1].is_use = s.is_use, parseInt(s.is_use) == parseInt(s.can_use) && (s.use = 1, 
                                t[e.data.menu_index - 1].use = 1)) : (s.use = 1, t[e.data.menu_index - 1].use = 1), 
                                e.setData({
                                    list: t
                                });
                            }
                            e.setData({
                                menu_list: s
                            }), wx.showToast({
                                title: "核销成功",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    }
                }) : a.cancel && console.log("用户点击取消");
            }
        });
    },
    input: function(a) {
        this.setData({
            search: a.detail.value
        });
    },
    search: function() {
        var e = this, a = e.data.search;
        if (null != a && "" != a) {
            var t = {
                op: "search2",
                content: a
            };
            "" != e.data.shop && null != e.data.shop && (t.store = e.data.shop), app.util.request({
                url: "entry/wxapp/manage",
                data: t,
                success: function(a) {
                    var t = a.data;
                    "" != t.data && e.setData({
                        menu_list: t.data.list,
                        menu_curr: t.data.curr,
                        shadow: !1,
                        menu: !0
                    });
                }
            });
        } else wx.showModal({
            title: "错误",
            content: "请输入订单号或姓名",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        });
    },
    scan: function() {
        var e = this;
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(a) {
                var t = {
                    op: "search",
                    content: a.result
                };
                "" != e.data.shop && null != e.data.shop && (t.store = e.data.shop), app.util.request({
                    url: "entry/wxapp/manage",
                    data: t,
                    success: function(a) {
                        var t = a.data;
                        "" != t.data && e.setData({
                            menu_list: t.data.list,
                            menu_curr: t.data.curr,
                            shadow: !1,
                            menu: !0
                        });
                    }
                });
            }
        });
    },
    sign: function() {
        var e = this, s = e.data.list, r = e.data.name_curr, a = [];
        if ("" != s[r].order && null != s[r].order) for (var t = 0; t < s[r].order.length; t++) 2 == s[r].order[t].status && a.push(s[r].order[t].id);
        0 < a.length ? app.util.request({
            url: "entry/wxapp/manage",
            data: {
                op: "sign",
                id: JSON.stringify(a)
            },
            success: function(a) {
                if ("" != a.data.data) {
                    for (var t = 0; t < s[r].order.length; t++) 2 == s[r].order[t].status && (s[r].order[t].is_use = parseInt(s[r].order[t].is_use) + 1, 
                    s[r].order[t].status = 1);
                    e.setData({
                        list: s
                    }), wx.showToast({
                        title: "核销成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            }
        }) : wx.showModal({
            title: "错误",
            content: "请选择学员"
        });
    },
    submit2: function() {
        var e = this, s = e.data.menu_list;
        app.util.request({
            url: "entry/wxapp/manage",
            data: {
                op: "order_status2",
                id: s.id
            },
            success: function(a) {
                if ("" != a.data.data) {
                    if ("" != e.data.menu_index && null != e.data.menu_index) {
                        var t = e.data.list;
                        t[e.data.menu_index - 1].order_status = 1, e.setData({
                            list: t
                        });
                    }
                    s.order_status = 1, e.setData({
                        menu_list: s
                    }), wx.showToast({
                        title: "核销成功",
                        icon: "success",
                        duration: 2e3
                    });
                }
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        common.config(e), common.theme(e), "" != a.shop && null != a.shop && (e.setData({
            shop: a.shop
        }), app.util.request({
            url: "entry/wxapp/index",
            data: {
                op: "school_detail",
                id: a.shop
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (wx.setNavigationBarTitle({
                    title: t.data.name
                }), e.setData({
                    shop_list: t.data
                }));
            }
        })), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "userinfo"
            },
            showLoading: !1,
            success: function(a) {
                var t = a.data;
                console.log(t)
                "" != t.data && e.setData({
                  userinfo: t.data
                });
            }
        });
        var t = {
            op: "index",
            page: e.data.page,
            pagesize: e.data.pagesize,
            curr: e.data.curr
        };
        "" != a.shop && null != a.shop && (t.store = a.shop), app.util.request({
            url: "entry/wxapp/manage",
            data: t,
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    list: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "service_class",
                type: 1
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && e.setData({
                    pclass: t.data
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
            op: "index",
            page: e.data.page,
            pagesize: e.data.pagesize,
            curr: e.data.curr
        };
        -1 != e.data.p_curr && (a.cid = e.data.pclass[e.data.p_curr].id), "" != e.data.shop && null != e.data.shop && (a.store = e.data.shop), 
        app.util.request({
            url: "entry/wxapp/manage",
            data: a,
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
        if (!e.data.isbottom) {
            var a = {
                op: "index",
                page: e.data.page,
                pagesize: e.data.pagesize,
                curr: e.data.curr
            };
            -1 != e.data.p_curr && (a.cid = e.data.pclass[e.data.p_curr].id), "" != e.data.shop && null != e.data.shop && (a.store = e.data.shop), 
            app.util.request({
                url: "entry/wxapp/manage",
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