// pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null,
    types: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code = options.code
    let types = options.type
    this.setData({
      code: code,
      types: types
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
  // 挑选展位
  goUrl: function() {
    wx.navigateTo({
      url: '../selectExh/selectExh?code=' + this.data.code + '&type=' + this.data.types
    })
  },
  // 管理我的展位
  managementExh: function() {
    wx.switchTab({
      url: '../exhibition/exhibition'
    })
  }
})