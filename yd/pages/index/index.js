//index.js
//获取应用实例
const app = getApp()
const $axjx = require('../../utils/getData.js')

Page({
  data: {
    imgUrl: '',
    dataList: []
  },
  onLoad: function (options) {
    console.log(options)
    this.getindexBanner()
    this.getIndexData()
  },
  onShow: function () {
    this.getIndexData()
  },
  checkDetails: function(e) {
    wx.navigateTo({
      url: '../exhibitionDetails/exhibitionDetails?id=' + e.currentTarget.dataset.id
    })
  },
  sub: function () {
    wx.navigateTo({
      url: '../success/success?show=1'
    })
  },
  // 获取用户信息
  getUserInfo:function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 获取index图片
  getindexBanner:function(){
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getBannerApi', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          imgUrl: res.data.img
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
  // 获取index数据
  getIndexData:function() {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getExhibitionList', pamer, 'POST').then((res) => {
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
  }
})
