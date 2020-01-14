// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      isShow: options.show
    })
    if (options.show == 1) {
      wx.setNavigationBarTitle({
        title: '预订展位'
      })
    } else if (options.show == 2) {
      wx.setNavigationBarTitle({
        title: '完成'
      })
    }
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
  // 选择位置
  goPlace: function () {
    wx.navigateTo({
      url: '../exhibitionDetails/exhibitionDetails'
    })
  },
  // 管理我的展位
  goExhList: function () {
    wx.switchTab({
      url: '../exhibition/exhibition'
    })
  }
})