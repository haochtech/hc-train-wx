var app = getApp(), WxParse = require("../../../wxParse/wxParse.js"), common = require("../common/common.js");

function sign(a) {
    var t = a.data.name, e = a.data.mobile, s = a.data.total, i = !0;
    "" != t && null != t || (i = !1), "" != e && null != e || (i = !1);
    /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/.test(e) || (i = !1), 
    "" != s && null != s || (i = !1), a.setData({
        submit: i
    });
}

Page({
    data: {
        curr: 1,
        page: 1,
        pagesize: 20,
        isbottom: !1,
        submit: !1,
        store_page: 1,
        store_pagesize: 20,
        store_isbottom: !1,
        is_load: !1,
        code: "",
      shadow: !0,
      get_userinfo: !0,
      shadows: !0,
    },
    tab: function(a) {
        var e = this, t = a.currentTarget.dataset.index;
        t != e.data.curr && (e.setData({
            curr: t,
            page: 1,
            pagesize: 20,
            isbottom: !1,
            tui: []
        }), 2 == t ? app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "service",
                tui: 1,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 3 == t ? app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss",
                page: e.data.page,
                pagesize: e.data.pagesize,
                id: e.data.list.id,
                type: 1
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 4 == t && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video",
                page: e.data.page,
                pagesize: e.data.pagesize,
                service: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: t.data,
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }));
    },
    mclose: function () {
      this.setData({
        menu: !1,
        shadows: !0,
        name: "",
        total: "",
        mobile: ""
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
            break;

          case "content":
            t.setData({
                content: a.detail.value
            });
        }
        sign(t);
    },
    submit: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data.list;
        console.log(e);
        parseFloat(e.price)>0 ? wx.navigateTo({
            url: "../sign/sign?&pid=" + e.team[t].id
        }) : this.setData({
            shadows: !1,
            menu: !0,
            choose: t
        });
    },
    menu_submit: function(a) {
        var t = this;
        if (t.data.submit) {
            var e = {
                pid: t.data.list.team[t.data.choose].id,
                name: t.data.name,
                mobile: t.data.mobile,
                total: t.data.total,
                form_id: a.detail.formId,
                order_type: 2,
                store: t.data.store_id
            };
            app.util.request({
                url: "entry/wxapp/setorder",
                data: e,
                success: function(a) {
                    "" != a.data.data && (t.setData({
                        menu: !1,
                        shadows: !0,
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
    zan: function() {
        var e = this;
        1 != e.data.list.is_zan && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "detail_zan",
                id: e.data.list.id
            },
            success: function(a) {
                if ("" != a.data.data) {
                    wx.showToast({
                        title: "点赞成功",
                        icon: "success",
                        duration: 2e3
                    });
                    var t = e.data.list;
                    t.is_zan = 1, t.zan = parseInt(t.zan) + 1, e.setData({
                        list: t
                    });
                }
            }
        });
    },
    discuss_on: function() {
        var e = this, a = e.data.content;
        "" != a && null != a ? app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss_on",
                id: e.data.list.id,
                content: a,
                type: 1,
              shadow: !0,
              get_userinfo: !0
            },
            success: function(a) {
                "" != a.data.data && (wx.showToast({
                    title: "评论成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    page: 1,
                    isbottom: !1,
                    content: ""
                }), app.util.request({
                    url: "entry/wxapp/order",
                    data: {
                        op: "discuss",
                        page: e.data.page,
                        pagesize: e.data.pagesize,
                        id: e.data.list.id
                    },
                    success: function(a) {
                        var t = a.data;
                        "" != t.data ? e.setData({
                            tui: t.data,
                            page: e.data.page + 1
                        }) : e.setData({
                            isbottom: !0
                        });
                    }
                }));
            }
        }) : wx.showModal({
            title: "错误",
            content: "评论内容不能为空",
            success: function(a) {
                a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
            }
        });
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
    code_on: function() {
        this.setData({
            showShare: !0
        });
    },
    closeShare: function() {
        this.setData({
            showShare: !1
        });
    },
    showhb: function() {
        var e = this;
        "" != e.data.code ? e.setData({
            showShare: !1,
            showhb: !0
        }) : app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "getCode",
                id: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && e.setData({
                    showShare: !1,
                    showhb: !0,
                    code: t.data.code
                });
            }
        });
    },
    closehb: function() {
        this.setData({
            showhb: !1
        });
    },
    dlimg: function() {
        wx.showLoading({
            title: "保存中"
        }), wx.downloadFile({
            url: this.data.code,
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.hideLoading(), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(a) {
                        wx.hideLoading(), wx.showToast({
                            title: "保存失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    onLoad: function(a) {
        var s = this;
        common.config(s), common.theme(s), app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "detail",
                id: a.id
            },
            success: function(a) {
                var t = a.data;
                if ("" != t.data && (s.setData({
                    list: t.data
                }), 2 == t.data.content_type)) {
                    var e = t.data.content2;
                    WxParse.wxParse("content2", "html", e, s, 5);
                }
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
                    page: s.data.page,
                    pagesize: s.data.pagesize
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
                            page: s.data.page + 1
                        }) : s.setData({
                            isbottom: !0
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
        app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "detail",
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
    onReachBottom: function() {
        var e = this;
        e.data.isbottom ? 3 == index ? app.util.request({
            url: "entry/wxapp/order",
            data: {
                op: "discuss",
                page: e.data.page,
                pagesize: e.data.pagesize,
                id: e.data.list.id,
                type: 1
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: e.data.tui.concat(t.data),
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 4 == index && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "video",
                page: e.data.page,
                pagesize: e.data.pagesize,
                service: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: e.data.tui.concat(t.data),
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        }) : 2 == e.data.curr && app.util.request({
            url: "entry/wxapp/service",
            data: {
                op: "service",
                tui: 1,
                page: e.data.page,
                pagesize: e.data.pagesize
            },
            success: function(a) {
                var t = a.data;
                "" != t.data ? e.setData({
                    tui: e.data.tui.concat(t.data),
                    page: e.data.page + 1
                }) : e.setData({
                    isbottom: !0
                });
            }
        });
    },
    onShareAppMessage: function() {
        var a = "/xc_train/pages/service/detail?&id=" + this.data.list.id;
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