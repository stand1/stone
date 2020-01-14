// pages/exhibition/exhibition.js
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cilckIs: true,
    types: 0,
    dataList: [],
    noData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList(0)
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
    this.getDataList(this.data.types)
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
  // 获取列表数据
  getDataList: function (num){
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.type = num
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderList', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          dataList: res.data,
          cilckIs: true,
          noData: false
        })
        if (res.data.length == 0) {
          that.setData({
            noData:true
          })
        }
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
  // 去选择展位
  goIndex: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  // nav切换状态
  changeNav: function (e) {
    let type = e.currentTarget.dataset.type
    let that = this
    if (!that.data.cilckIs) {
      return false
    }
    that.setData({
      types: type,
      cilckIs: false
    })
    that.getDataList(type)
  },
  // 查看订单详情
  checkDetails:function (e) {
    if (!this.data.cilckIs) {
      return false
    }
    wx.navigateTo({
      url: '../orderDetails/orderDetails?code=' + e.currentTarget.dataset.code
    })
  }
})