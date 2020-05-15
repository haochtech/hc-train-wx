Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function s(t, a) {
        for (var i = 0; i < a.length; i++) {
            var s = a[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(t, a, i) {
        return a && s(t.prototype, a), i && s(t, i), t;
    };
}();

function _classCallCheck(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var Scratch = function() {
    function i(t, a) {
        _classCallCheck(this, i), this.page = t, this.canvasWidth = a.canvasWidth, this.canvasHeight = a.canvasHeight, 
        this.imageResource = a.imageResource, this.maskColor = a.maskColor, this.r = a.r || 4, 
        this.endCallBack = a.callback, this.lastX = 0, this.lastY = 0, this.minX = "", this.minY = "", 
        this.maxX = "", this.maxY = "", this.isStart = !1, this.init(), this.page.touchStart = this.touchStart.bind(this), 
        this.page.touchMove = this.touchMove.bind(this), this.page.touchEnd = this.touchEnd.bind(this), 
        this.page.imgOnLoad = this.imgOnLoad.bind(this), console.log(this.page.data), this.page.setData({
            scratch: {
                awardTxtStyle: a.awardTxtStyle,
                awardTxt: a.awardTxt,
                awardTxtColor: a.awardTxtColor,
                awardTxtFontSize: a.awardTxtFontSize,
                awardTxtLineHeight: a.canvasHeight,
                awardImage: a.awardImage,
                width: a.canvasWidth,
                height: a.canvasHeight,
                imageResource: a.imageResource
            },
            isScroll: !0,
            awardShow: !1
        });
    }
    return _createClass(i, [ {
        key: "init",
        value: function() {
            var a = this.canvasWidth, i = this.canvasHeight, t = this.imageResource, s = this.maskColor, e = this;
            this.ctx = wx.createCanvasContext("scratch"), this.ctx.clearRect(0, 0, a, i), t && "" != t ? wx.downloadFile({
                url: t,
                success: function(t) {
                    e.ctx.drawImage(t.tempFilePath, 0, 0, a, i), e.ctx.draw(), setTimeout(function() {
                        e.page.setData({
                            awardShow: !0
                        });
                    }, 200);
                }
            }) : (e.ctx.setFillStyle(s), e.ctx.fillRect(0, 0, a, i), e.ctx.draw(), setTimeout(function() {
                e.page.setData({
                    awardShow: !0
                });
            }, 200));
        }
    }, {
        key: "drawRect",
        value: function(t, a) {
            var i = this.r, s = (this.canvasWidth, this.canvasHeight, this.lastX, this.lastY, 
            this.minX), e = this.minY, h = this.maxX, c = this.maxY, n = 0 < t - i ? t - i : 0, r = 0 < a - i ? a - i : 0;
            return "" != s ? (this.minX = n < s ? n : s, this.minY = r < e ? r : e, this.maxX = n < h ? h : n, 
            this.maxY = r < c ? c : r) : (this.minX = n, this.minY = r, this.maxX = n, this.maxY = r), 
            [ this.lastX = n, this.lastY = r, 2 * i ];
        }
    }, {
        key: "start",
        value: function() {
            this.isStart = !0, this.page.setData({
                isScroll: !1
            });
        }
    }, {
        key: "restart",
        value: function() {
            this.init(), this.lastX = 0, this.lastY = 0, this.minX = "", this.minY = "", this.maxX = "", 
            this.maxY = "", this.isStart = !0, this.page.setData({
                isScroll: !1
            });
        }
    }, {
        key: "touchStart",
        value: function(t) {
            if (this.isStart) {
                var a = this.drawRect(t.touches[0].x, t.touches[0].y);
                this.ctx.clearRect(a[0], a[1], a[2], a[2]), this.ctx.draw(!0);
            }
        }
    }, {
        key: "touchMove",
        value: function(t) {
            if (this.isStart) {
                var a = this.drawRect(t.touches[0].x, t.touches[0].y);
                this.ctx.clearRect(a[0], a[1], a[2], a[2]), this.ctx.draw(!0);
            }
        }
    }, {
        key: "touchEnd",
        value: function(t) {
            if (this.isStart) {
                var a = this.canvasWidth, i = this.canvasHeight, s = this.minX, e = this.minY, h = this.maxX, c = this.maxY;
                .7 * a < h - s && .7 * i < c - e && (this.ctx.draw(), this.endCallBack && this.endCallBack(), 
                this.isStart = !1, this.page.setData({
                    isScroll: !0
                }));
            }
        }
    }, {
        key: "reset",
        value: function() {
            this.init();
        }
    }, {
        key: "imgOnLoad",
        value: function() {}
    } ]), i;
}();

exports.default = Scratch;