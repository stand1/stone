// pages/looseChange/looseChange.js
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: 1,
    looseNumber: 0,
    depositBank: '',
    bankCard: '',
    bankNumber: 0,
    bankName: '',
    amount: 0,
    isClick: true,
    isLoose: false,
    isBank: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: '零钱提现'
      })
    } else if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: '银行卡提现'
      })
    }
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
  // 获取可提余额
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
  // 获取零钱金额
  getNumber: function (e) {
    if (parseInt(e.detail.value) <= this.data.amount && e.detail.value !=0){
      this.setData({
        looseNumber: e.detail.value,
        isLoose: true
      })
    } else {
      wx.showToast({
        title: '请正确输入可提金额',
        icon: 'none',
        duration: 3000
      })
      this.setData({
        isLoose: false
      })
    }
  },
  // 开户行姓名
  getBankName: function (e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  // 获取开户银行
  getDepositBank: function (e) {
    this.setData({
      depositBank: e.detail.value
    })
  },
  // 获取银行卡信息
  getBankCard: function (e) {
    this.setData({
      bankCard: e.detail.value
    })
  },
  // 获取提现金额
  getBankNumber: function (e) {
    if ((parseInt(e.detail.value) <= this.data.amount) && e.detail.value != 0) {
      this.setData({
        bankNumber: e.detail.value,
        isBank: true
      })
    } else {
      wx.showToast({
        title: '请正确输入可提金额',
        icon: 'none',
        duration: 3000
      })
      this.setData({
        isBank: false
      })
    }
  },
  // 零钱提现
  looseSub: function () { 
    if (!this.data.isClick) return false
    this.setData({
      isClick: false
    })
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.money = that.data.looseNumber
    if (!that.data.isLoose) {
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '请输入可提金额',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    $axjx.getData('/cashWithdrawal', pamer, 'POST').then((res) => {
      wx.hideLoading()
      that.setData({
        isClick: true
      })
      if (res.code == 10000) {
        wx.reLaunch({
          url: '../depositing/depositing?type=1'
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
  // 银行卡提现
  cardSub: function () {
    if (!this.data.isClick) return false
    this.setData({
      isClick: false
    })
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.money = that.data.bankNumber
    pamer.acct_name = that.data.bankName
    pamer.acct_no = that.data.bankCard
    pamer.acct_bank = that.data.depositBank
    if (that.data.bankName == '') {
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '请输入银行卡姓名',
        icon: 'none',
        duration: 3000
      })
      return false
    } else if (that.data.depositBank == '') {
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '请输入开户银行',
        icon: 'none',
        duration: 3000
      })
      return false
    } else if (that.data.bankCard == '') {
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none',
        duration: 3000
      })
      return false
    }else if (!that.data.isBank) {
      that.setData({
        isClick: true
      })
      wx.showToast({
        title: '请输入可提金额',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    $axjx.getData('/bankCardWithdrawal', pamer, 'POST').then((res) => {
      wx.hideLoading()
      that.setData({
        isClick: true
      })
      if (res.code == 10000) {
        wx.reLaunch({
          url: '../depositing/depositing?type=1'
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