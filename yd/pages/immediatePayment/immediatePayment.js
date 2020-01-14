// pages/immediatePayment/immediatePayment.js
const $axjx = require('../../utils/getData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCode: null,
    datas: {},
    isDk: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let code = options.code
    that.getData(code)
    that.setData({
      orderCode: options.code
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return false
  },
  // 获取页面数据 
  getData: function (code) {
    let that = this
    let pamer = {}
    pamer.order_sn = code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/unpaidOrderDetail', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          datas: res.data,
          isDk: res.data.orderinfo.is_dk
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
     }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 调起支付
  pay: function() {
    if (this.data.isDk == 1) {
      this.wordPay()
    } else if (this.data.isDk == 2) {
      this.weixinPay()
    }
  },
  // 微信支付
  weixinPay: function(e) {
    let that = this
    let pamer = {}
    pamer.order_sn = that.data.orderCode
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderPay', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let strUrl = res.data.success_url
        let prepayId = res.data.prepay_id
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonce_str,
          package: 'prepay_id=' + res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.sign,
          success(res) {
            if (res.errMsg == "requestPayment:ok") {
              wx.requestSubscribeMessage({
                tmplIds: ['KEWODpJpvgIG7QEzaDjwzVsofpZRW-0somstjrEXYjg'],
                success(res) {
                  // 用户授权发送消息 回调
                  if (res.errMsg == "requestSubscribeMessage:ok") {
                    let pamers = {}
                    pamers.order_sn = that.data.orderCode
                    pamers.form_id = prepayId
                    $axjx.getData('/orderMsgSend', pamers, 'POST').then((resDa) => {
                      wx.reLaunch({
                        url: '../paySuccess/paySuccess?code=' + that.data.orderCode + '&type=' + that.data.datas.orderinfo.order_type
                      })
                    }).catch(() => {
                      wx.hideLoading()
                      wx.showToast({
                        title: '网络错误,请稍后再试...',
                        icon: 'none',
                        duration: 3000
                      })
                    })
                  }
                },
                fail(err) {
                  console.log(err)
                  wx.reLaunch({
                    url: '../paySuccess/paySuccess?code=' + that.data.orderCode + '&type=' + that.data.datas.orderinfo.order_type
                  })
                }
              })
              wx.showToast({
                title: '支付成功'
              })
            }
          },
          fail(res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 口令支付
  wordPay:function () {
    let that = this
    let pamer = {}
    pamer.order_sn = that.data.orderCode
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderCodePay', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        wx.reLaunch({
          url: '../paySuccess/paySuccess?code=' + that.data.orderCode + '&type=' + that.data.datas.orderinfo.order_type
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  }
})