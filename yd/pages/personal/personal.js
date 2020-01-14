// pages/personal/personal.js
const app = getApp()
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClick:true,
    isLogin: false,
    isPhone: true,
    userName: '',
    userImg: '',
    phone: '',
    isRouter: null         //1 => 有常用信息 0 => 没有常用信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (app.globalData.userInfo != null) {
      that.setData({
        userName: app.globalData.userInfo.nickName,
        userImg: app.globalData.userInfo.avatarUrl,
        isLogin: true
      })
    } else {
      that.setData({
        isLogin: false
      })
    }
    that.checkPhone()
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
    this.checkPhone()
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
  // login
  logins:function() {
    wx.showLoading({
      title: '登录中...'
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setUserInfoAndNext(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.openSetting({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else { // 没有弹出过授权弹窗
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setUserInfoAndNext(res)
            },
            fail: res => {
              console.log(res)
              wx.openSetting({
                success: res => {
                  console.log(res)
                },
                fail: res => {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },
  // 检查用户手机号是否绑定
  checkPhone: function () {
    let that = this
    if (!that.data.isClick) return false
    that.setData({
      isClick: false
    })
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/checkUserPhone', pamer, 'POST').then((res) => {
      wx.hideLoading()
      that.setData({
        isClick: true
      })
      if (res.code == 10000) {
        if (res.data.state == 1) {
          that.setData({
            isPhone: true,
            isRouter: res.data.user_address
          })
        } else{
          that.setData({
            isPhone: false,
            isRouter: res.data.user_address
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
       that.setData({
         isClick: true
       })
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 获取用户信息
  getInfo: function () {
    let that = this
    wx.showLoading({
      title: '登录中...'
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.hideLoading()
              that.setData({
                userName: res.userInfo.nickName,
                userImg: res.userInfo.avatarUrl,
                isLogin: true
              })
              that.storageUserIno(res.userInfo.nickName, res.userInfo.avatarUrl)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.hideLoading()
          wx.showToast({
            title: '请授权',
            icon: 'none',
            duration: 3000
          })
          wx.openSetting({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
        } else { // 没有弹出过授权弹窗
          wx.hideLoading()
          wx.showToast({
            title: '请授权',
            icon: 'none',
            duration: 3000
          })
          wx.getUserInfo({
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
              wx.openSetting({
                success: res => {
                  console.log(res)
                },
                fail: res => {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },
  // 获取用户手机号
  getPhone: function (e) { 
    let that = this;
    wx.checkSession({
      success: function () {
        let ency = e.detail.encryptedData
        let iv = e.detail.iv
        let sessionk = wx.getStorageSync('session_key') || []
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          wx.showToast({
            title: '请授权',
            icon: 'none',
            duration: 3000
          })
        } else {//同意授权
          let pamer = {}
          pamer.encrypteData = ency
          pamer.iv = iv
          pamer.session_key = sessionk
          wx.showLoading({
            title: '加载中...',
          })
          $axjx.getData('/getUserInfo', pamer, 'POST').then((res) => {
            wx.hideLoading()
            if (res.code == 10000) {
              that.setData({
                phone: res.data.phoneNumber,
                isPhone: true
              })
              app.globalData.phone = res.data.phoneNumber
              that.storagePhone(res.data.phoneNumber)
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
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程")
        wx.showToast({
          title: 'session_key 已经失效，需要重新执行登录流程,请重新登陆',
          icon: 'none',
          duration: 3000
        })
        //重新登录
      }
    })
  },
  // 常用联系人
  frequent: function () {
    // 1 => 有常用信息 0 => 没有常用信息
    if (this.data.isRouter == 1) {
      wx.navigateTo({
        url: '../commonInfo/commonInfo?type=2'
      })
    } else if (this.data.isRouter == 0) {
      wx.navigateTo({
        url: '../addAddress/addAddress?id=-1'
      })
    }
  },
  // 设置
  seting: function () {
    wx.navigateTo({
      url: '../seting/seting'
    })
  },
  // 邀请有礼
  invitation: function () {
    wx.navigateTo({
      url: '../invitation/invitation'
    })
  },
  // 专属客服
  service: function () {
    wx.navigateTo({
      url: '../service/service'
    })
  },
  // 亚东国际
  yd: function () { 
    wx.navigateTo({
      url: '../posterList/posterList'
    })
  },
  // 用户资料详情存储
  storageUserIno: function (nickName, avatarUrl) {
    let that = this
    let pamer = {}
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.nick_name = nickName
    pamer.wx_header = avatarUrl
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/selfWechat', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) { } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }).catch(() => {
      wx.hideLoading()
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  },
  // 用户手机号绑定
  storagePhone: function (phone) { 
    let that = this
    if (!that.data.isClick) return false
    that.setData({
      isClick: false
    })
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.phone = phone
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/bindingPhone', pamer, 'POST').then((res) => {
      wx.hideLoading()
      that.setData({
        isClick: true
      })
      if (res.code == 10000) {
        that.setData({
          isPhone: true,
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
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '网络错误,请稍后再试...',
        icon: 'none',
        duration: 3000
      })
    })
  },
})