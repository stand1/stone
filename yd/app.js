//app.js
const $axjx = require('./utils/getData.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('user_id', 1)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.showLoading({
          title: '加载中...',
        })
        let codes = res.code
        let pamer = {}
        pamer.code = codes
        $axjx.getData('/getUnionID', pamer, 'POST').then((res) => {
          wx.hideLoading()
          if (res.code == 10000) {
            wx.setStorageSync('openid', JSON.parse((res.data)).openid)
            wx.setStorageSync('session_key', JSON.parse((res.data)).session_key)
            wx.setStorageSync('user_id', JSON.parse((res.data)).unionid)
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    phone: null
  }
})