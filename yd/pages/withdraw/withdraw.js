// pages/withdraw/withdraw.js
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0
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

  },
  // 获取数据
  getData: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    $axjx.getData('/getUserWithdrawalAmount', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          amount: res.data.share_o_amount
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
  // 收支记录
  scheduleInterest: function () {
    wx.navigateTo({
      url: '../scheduleInterest/scheduleInterest'
    })
  },
  // 疑难解答
  troubleShooting: function () {
    wx.navigateTo({
      url: '../troubleShoot/troubleShoot'
    })
  },
  // 提现
  looseChange: function (e) {
    wx.navigateTo({
      url: '../looseChange/looseChange?type=' + e.currentTarget.dataset.type
    })
  }
})