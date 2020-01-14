// pages/addAddress/addAddress.js
const $axjx = require('../../utils/getData.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    showInp: true,
    comName: '',
    userName: '',
    phone: '',
    isDefault: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != '-1') {
      wx.setNavigationBarTitle({
        title: '修改地址'
      })
      this.setData({
        showInp:false,
        id: options.id
      })
    }
    this.getData(options.id)
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
  getData: function(id) {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.id = id
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getUserAddressInfo', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        if (res.data.mobile_number != '') {
          that.setData({
            showInp: false
          })
        }
        that.setData({
          comName: res.data.company_name,
          userName: res.data.full_name,
          phone: res.data.mobile_number,
          isDefault: res.data.is_default
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
  // 获取用户公司名称
  getConName: function (e) {
    this.setData({
      comName: e.detail.value
    })
  },
  // 获取用户姓名
  getUserName: function (e) { 
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取用户手机号码
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
   },
  // 自动获取用户手机号码
  getPhoneNumber: function(e) {
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
                showInp: false
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
  // 设置默认
  changeAgree: function () {
    let that = this
    if (that.data.isDefault == 1) {
      that.setData({
        isDefault: 2
      })
    } else if (that.data.isDefault == 2) {
      that.setData({
        isDefault: 1
      })
    }
  },
  // 保存信息
  save:function () {
    let that = this
    if (that.data.comName == '') {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none',
        duration: 3000
      })
      return false
    } else if (that.data.userName == ''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 3000
      })
      return false
    } else if (that.data.phone == ''){
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.company_name = that.data.comName
    pamer.full_name = that.data.userName
    pamer.mobile_number = that.data.phone
    pamer.cache_code = wx.getStorageSync('cache_code') || []
    pamer.id = that.data.id
    pamer.is_default = that.data.isDefault
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/editUserAddress', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        wx.navigateBack({
          url: '../commonInfo/commonInfo'
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