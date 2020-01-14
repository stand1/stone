// pages/commonInfo/commonInfo.js
const $axjx = require('../../utils/getData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    types: null,
    right: [{
      text: '编辑',
      style: 'background-color: #1AAD19; color: white;padding:0 20rpx;',
    },
    {
      text: '删除',
      style: 'background-color: #F4333C; color: white;padding:0 20rpx;',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      types: options.type
    })
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
  // 获取页面数据列表
  getData: function() {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getUserAddress', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          dataList: res.data
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
  // 新增地址
  addAddress: function() {
    wx.navigateTo({
      url: '../addAddress/addAddress?id=-1'
    })
  },
  // 设置地址默认
  setDefault: function (e) {
    let id = e.currentTarget.dataset.num
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.id = id
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/setAddDefault', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.getData()
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
  // 选择地址
  selectAddress: function(e) {
    let id = e.currentTarget.dataset.num
    let that = this
    if (that.data.types == 2) return false
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.cache_code = wx.getStorageSync('cache_code')
    pamer.id = id
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/setAddCache', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        wx.navigateBack({
          url: '../submitOrders/submitOrders'
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
  // 编辑地址
  editorAddress: function(e) {
    wx.navigateTo({
      url: '../addAddress/addAddress?id=' + e.currentTarget.dataset.num
    })
  },
  // 编辑删除 // 0 => 编辑   1 => 删除
  onClick:function(e) {
    // console.log(e.detail.index) // 0 => 编辑   1 => 删除
    if (e.detail.index == 0) {
      wx.navigateTo({
        url: '../addAddress/addAddress?id=' + e.currentTarget.dataset.id
      })
    } else if (e.detail.index == 1) {
      let id = e.currentTarget.dataset.id
      let that = this
      let pamer = {}
      pamer.id = id
      wx.showLoading({
        title: '加载中...',
      })
      $axjx.getData('/infoDelete', pamer, 'POST').then((res) => {
        if (res.code == 10000) {
          that.getData()
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
  }
})