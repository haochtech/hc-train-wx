var _scratch = require("../../../components/scratch/scratch.js"), _scratch2 = _interopRequireDefault(_scratch);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp(), common = require("../common/common.js"), cwidth = 320, caWidth = 0, caHeight = 0;

function gua(a, t) {
    a.scratch = new _scratch2.default(a, {
        canvasWidth: caWidth,
        canvasHeight: caHeight,
        imageResource: a.data.list.gua_img,
        maskColor: a.data.caColor,
        r: 8,
        awardTxtStyle: a.data.awTxtStyle,
        awardTxt: a.data.awTxt,
        awardTxtColor: a.data.awTxtColor,
        awardTxtFontSize: a.data.awTxtFontSize,
        awardImage: t,
        callback: function() {
            app.util.request({
                url: "entry/wxapp/user",
                data: {
                    op: "active_status",
                    id: a.data.list.id
                },
                success: function(a) {
                    var t = a.data;
                    "" != t.data && wx.showModal({
                        title: "恭喜",
                        content: "您中奖了,奖品是" + t.data.name,
                        showCancel: !1
                    });
                }
            });
        }
    }), a.scratch.start();
}

Page({
    data: {
        awImage: "https://xwy.1q2d.com/images/40/2018/03/af06M2F2iGs7lgMf6cflyF7msFDqny.jpg",
        awTxtStyle: "img",
        shadow: true,
        get_userinfo: true
    },
    menu_close: function() {
        var e = this;
        e.setData({
            menu: !1,
            shadow: !0
        }), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "active_detail",
                id: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && e.setData({
                    list: t.data,
                    userinfo: app.userinfo
                });
            }
        });
    },
    onLoad: function(e) {
      var s = this, uInfo = wx.getStorageSync('userInfo');
        if(!uInfo) {
          s.setData({
            shadow: !1,
            get_userinfo: !1
          });
        }
        common.config(s), common.theme(s), app.util.request({
            url: "entry/wxapp/user",
            data: {
                op: "active_detail",
                id: e.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (s.setData({
                    list: t.data,
                    userinfo: app.userinfo
                }), "" != t.data.prize_bimg && null != t.data.prize_bimg && gua(s, t.data.prize_bimg));
            }
        }), wx.showShareMenu({
            withShareTicket: !0
        }), "undefined" != app.shareTicket && "" != e.openid && null != e.openid && null != e.share && "" != e.share && null != app.shareTicket && "" != app.shareTicket && wx.getShareInfo({
            shareTicket: app.shareTicket,
            success: function(a) {
                var t = a;
                t.id = e.id, t.share = e.share, t.openid = e.openid, app.util.request({
                    url: "entry/wxapp/prize",
                    data: t,
                    success: function(a) {
                        "" != a.data.data && wx.showToast({
                            title: "助力成功",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                });
            }
        }), wx.getSystemInfo({
            success: function(a) {
                cwidth = a.windowWidth, caWidth = parseInt(700 / 750 * cwidth), caHeight = parseInt(275 / 750 * cwidth);
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
            url: "entry/wxapp/user",
            data: {
                op: "active_detail",
                id: e.data.list.id
            },
            success: function(a) {
                var t = a.data;
                "" != t.data && (wx.stopPullDownRefresh(), e.setData({
                    list: t.data,
                    userinfo: app.userinfo
                }));
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var s = this, e = "";
        "button" === a.from && (console.log(a.target), e = a.target.dataset.index);
        var t = "/xc_train/pages/active/active?&id=" + s.data.list.id;
        return 2 == parseInt(s.data.list.share_type) && (t = t + "&share=" + e + "&openid=" + s.data.userinfo.openid), 
        t = escape(t), {
            title: s.data.list.name,
            path: "/xc_train/pages/base/base?&share=" + t,
        };
        setTimeout(function(){
          2 == parseInt(s.data.list.share_type) ? console.log(t) : 1 == parseInt(s.data.list.share_type) && "" != a.shareTickets && null != a.shareTickets && "" != e && null != e && wx.getShareInfo({
            shareTicket: a.shareTickets[0],
            success: function (a) {
              var t = a;
              t.id = s.data.list.id, t.share = e, app.util.request({
                url: "entry/wxapp/prize",
                data: t,
                success: function (a) {
                  var t = a.data;
                  if ("" != t.data) if (1 == t.data.status) wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                  }), (e = s.data.list).you_xiao = parseInt(e.you_xiao) + 1, e.opengid = t.data.opengid,
                    s.setData({
                      list: e
                    }), "" != t.data.bimg && null != t.data.bimg && gua(s, t.data.bimg); else if (2 == t.data.status) {
                      var e;
                      (e = s.data.list).opengid = t.data.opengid, e.you_xiao = parseInt(e.you_xiao) + 1,
                        s.setData({
                          list: e,
                          menu: !0,
                          shadow: !0
                        });
                    }
                }
              });
            }
          });
        },1500);
    }
});