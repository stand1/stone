// pages/submitOrders/submitOrders.js
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showVerifys: 1,
    agree: true,
    showCommand: false,
    showVerify: false,
    verifyStr: '',
    datas: {},
    price: null,
    exhId: null,
    checked: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    this.getData()
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
  // 获取页面信息
  getData: function() {
    let that = this
    let code = wx.getStorageSync('cache_code') || []
    let pamer = {}
    pamer.cache_code = code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderCacheDetail', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        res.data.is_visa = false        // 是否代办签证 1 否 2 是
        res.data.is_relet = false       // 是否增租 1否 2是
        that.setData({
          datas: res.data,
          price: res.data.price,
          exhId: res.data.exhibition_id
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
  // 修改地址信息 => 常用信息列表
  chengeInfo: function() {
    wx.navigateTo({
      url: '../commonInfo/commonInfo?type=1' // 1 => 从预订订单进入
    })
  },
  // 修改同意预订说明
  changeAgree: function() {
    let that = this
    that.setData({
      agree: !that.data.agree
    })
  },
  // 预订说明
  description: function() {
    wx.navigateTo({
      url: '../description/description'
    })
  },
  // 关闭口令弹层
  onCommand:function() {
    this.setData({
      showCommand: false
    })
  },
  // 打开口令弹层
  openCommand: function() {
    this.setData({
      showCommand: true
    })
  },
  // 关闭口令弹层
  onVerify: function() {
    this.setData({
      showVerify: false
    })
  },
  // 打开验证口令弹层
  openVerify: function() {
    this.setData({
      showVerify: true
    })
  },
  // 签证办理 1 => 否   2 => 是
  changeVisa: function (e) {
    let dataDetails = this.data.datas
    dataDetails.is_visa = e.detail.value
    this.setData({
      datas: dataDetails
    })
  },
  // 是否增租 1 => 否   2 => 是
  changeRelet: function (e) {
    let dataDetails = this.data.datas
    dataDetails.is_relet = e.detail.value
    this.setData({
      datas: dataDetails
    })
  },
  // 获取口令
  getInpVal: function (e) {
    this.setData({
      verifyStr: e.detail.value
    })
  },
  // 验证口令
  verify:function() {
    let that = this
    let str = that.data.verifyStr
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.coupon_number = str
    pamer.exhibition_id = that.data.exhId
    pamer.cache_code = wx.getStorageSync('cache_code') || ''
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/checkCouponStatus',pamer,'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          showVerify: false,
          showVerifys: 2,
          price: res.data.order_amount
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
  // 提交订单
  sub: function() {
    let that = this
    if (that.data.datas.is_userinfo == 2) {
      wx.showToast({
        title: '请填写地址',
        icon: 'none',
        duration: 3000
      })
      return false 
    }
    if (!that.data.agree) {
      wx.showToast({
        title: '请同意预订说明',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    let pamer = {}
    pamer.cache_code = that.data.datas.cache_code
    pamer.is_visa = that.data.datas.is_visa
    pamer.is_relet = that.data.datas.is_relet
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/createOrder', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        wx.navigateTo({
          url: '../immediatePayment/immediatePayment?code=' + res.data.order_sn
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
})