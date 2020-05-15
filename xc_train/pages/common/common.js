var app = getApp();

function config(e) {
    var t = [ {
        pagePath: "../index/index",
        text: "主页",
        iconPath: "../../resource/bottom01.png",
        selectedIconPath: "../../resource/bottom001.png",
        status: 1
    }, {
        pagePath: "../active/list",
        text: "优惠活动",
        iconPath: "../../resource/bottom02.png",
        selectedIconPath: "../../resource/bottom002.png",
        status: 1
    }, {
        pagePath: "../video/video",
        text: "视频",
        iconPath: "../../resource/bottom04.png",
        selectedIconPath: "../../resource/bottom004.png",
        status: 1
    }, {
        pagePath: "../user/user",
        text: "我的",
        iconPath: "../../resource/bottom03.png",
        selectedIconPath: "../../resource/bottom003.png",
        status: 1
    }, {
        pagePath: "",
        text: "",
        iconPath: "",
        selectedIconPath: "",
        status: -1
    } ], o = "";
    if ("" != app.config && null != app.config && (wx.setNavigationBarTitle({
        title: app.config.content.title
    }), "" != (o = app.config.content).footer && null != o.footer)) for (var n = 0; n < o.footer.length; n++) "" != o.footer[n].text && null != o.footer[n].text && (t[n].text = o.footer[n].text), 
    "" != o.footer[n].icon && null != o.footer[n].icon && (t[n].iconPath = o.footer[n].icon), 
    "" != o.footer[n].select && null != o.footer[n].select && (t[n].selectedIconPath = o.footer[n].select), 
    "" != o.footer[n].link && null != o.footer[n].link && (t[n].pagePath = o.footer[n].link), 
    "" != o.footer[n].status && null != o.footer[n].status && (t[n].status = o.footer[n].status);
    for (n = 0; n < t.length; n++) e.data.pagePath == t[n].pagePath && e.setData({
        footerCurr: n + 1
    });
    e.updateUserInfo = updateUserInfo, is_user(e), e.user_close = user_close, e.setData({
        footer: t,
        config: o,
        system_mobile: app.mobile
    });
}

function theme(e) {
    var t = {
        name: "theme1",
        color: "#5fcceb",
        icon: [ "../../resource/icon01.png", "../../resource/class01.png", "../../resource/class02.png", "../../resource/class03.png", "../../resource/contact01.png", "../../resource/contact02.png", "../../resource/contact03.png", "../../resource/contact04.png", "../../resource/manage01.png" ]
    };
    if ("" != app.theme && null != app.theme) {
        var o = app.theme.content;
        if (2 == o.theme && (t.name = "theme" + o.theme, t.color = o.color, "" != o.icon && null != o.icon)) {
            for (var n = 0; n < o.icon.length; n++) "" != o.icon[n] && null != o.icon[n] && (t.icon[n] = o.icon[n]);
            wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: t.color,
                animation: {
                    duration: 400,
                    timingFunc: "easeIn"
                }
            });
        }
    }
    e.setData({
        theme: t
    });
}

function login(e, t) {
  var pages = getCurrentPages();
  var page = pages[(pages.length - 1)];
    app.util.getUserInfo(function(e) {
        var t = {};
        "" != e.wxInfo && null != e.wxInfo ? (t = e.wxInfo).op = "userinfo" : t.op = "userinfo", 
        app.util.request({
            url: "entry/wxapp/index",
            showLoading: !1,
            data: t,
            success: function(e) {
                var t = e.data;
              "" != t.data && (app.userinfo = t.data, page.setData({
                userinfo: t.data
              }));
            }
        });
    });
}

function updateUserInfo(e) {
  var pages = getCurrentPages();
  var page = pages[(pages.length - 1)];
    var o = getApp();
    "" != e.detail.userInfo && null != e.detail.userInfo && (o.util.getUserInfo(function(e) {
        var t = {};
        "" != e.wxInfo && null != e.wxInfo ? (t = e.wxInfo).op = "userinfo" : t.op = "userinfo", 
        o.util.request({
            url: "entry/wxapp/index",
            showLoading: !1,
            data: t,
            success: function(e) {
                var t = e.data;
                console.log(t);
              "" != t.data && (o.userinfo = t.data, page.setData({
                userinfo: t.data
              }));
            }
        });
    }, e.detail), console.log(e));
}

function audio_end(e){

}

function is_user(e) {
    var t = wx.getStorageSync("userInfo") || {};
    "" != t.wxInfo && null != t.wxInfo || e.setData({
        shadow: !0,
        get_userinfo: !0,
        menu: !1
    });
}

function user_close() {
    this.setData({
        shadow: true,
        get_userinfo: true,
        open_ad: !1,
        manage: !1
    });
}

module.exports = {
    config: config,
    theme: theme,
    login: login,
    updateUserInfo: updateUserInfo,
    is_user: is_user,
    user_close: user_close
};