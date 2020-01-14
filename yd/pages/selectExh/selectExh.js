// pages/selectExh/selectExh.js
const $axjx = require('../../utils/getData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null,
    exhId: null,
    dataList: [],
    indexs: null,
    exhVal: '',
    lengs: null,
    valList: [],
    indexList: [],
    clickShow: true,
    idList: [],
    types: null,
    widths: '398rpx',
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getSystemInfoSync().windowWidth <= 360) {
      this.setData({
        widths: '382rpx'
      })
    } else if (360 < wx.getSystemInfoSync().windowWidth && wx.getSystemInfoSync().windowWidth < 414){
      this.setData({
        widths: '398rpx' 
      })
    } else {
      this.setData({
        widths: '370rpx'
      })
    }
    this.setData({
      code: options.code,
      exhId: options.id || '',
      types: options.type
    })
    this.getDataList(options.code, options.id)
    if (this.data.types == 2) return false
    this.getExhArea(options.code)
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
  // 获取列表数据
  getDataList: function (num, id) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = num
    pamer.exhibition_id = id
    $axjx.getData('/chooseTheBooth', pamer, 'POST').then((res) => {
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
  // 获取用户展位面积
  getExhArea: function (num) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = num
    $axjx.getData('/getBoothNum', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          lengs: res.data.number,
          msg: res.data.area_name
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
  onChange: function () {
    console.log('onChange')
  },
  onScale: function () {
    console.log('onScale')
  },
  touchend: function () {
    console.log('touchend')
  },
  // 选择展位
  selectExh: function(e) {
    if (this.data.types == 2) return false
    if (!this.data.clickShow) return false
    this.setData({
      clickShow: false
    })
    let val = e.currentTarget.dataset.val
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let idLists = this.data.idList
    let dataLists = this.data.dataList
    let lengths = this.data.lengs
    let valLists = this.data.valList
    let indexLists = this.data.indexList
    let isClick = true
    indexLists.forEach((item,key) => {
      if (item == index) {
        dataLists[index].status = 1
        indexLists.splice(key,1)
        valLists.splice(key, 1)
        idLists.splice(key, 1)
        isClick = false
      }
    })
    if (!isClick) {
      this.setData({
        dataList: dataLists,
        indexs: index,
        exhVal: valLists.join(','),
        valList: valLists,
        indexList: indexLists,
        idList: idLists,
        clickShow: true
      })
      return false
    }
    if (valLists.length == lengths) {
      dataLists[indexLists[0]].status = 1
      valLists.splice(0,1)
      indexLists.splice(0,1)
      idLists.splice(0, 1)
      valLists.push(val)
      indexLists.push(index)
      idLists.push(id)
    } else {
      valLists.push(val)
      indexLists.push(index)
      idLists.push(id)
    }
    dataLists[index].status = 2
    this.setData({
      dataList: dataLists,
      indexs: index,
      exhVal: valLists.join(','),
      valList: valLists,
      indexList: indexLists,
      idList: idLists,
      clickShow: true
    })
  },
  // 提交选择展位信息
  sub: function () {
    let that = this
    if (that.data.idList.length != that.data.lengs) {
      wx.showToast({
        title: '请继续选择展位',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    wx.showLoading({
      title: '加载中...',
    })
    if (!that.data.clickShow) return false
    that.setData({
      clickShow: false
    })
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    pamer.area_value_id = that.data.idList.join(',')
    $axjx.getData('/addChooseTheBooth', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          clickShow: true
        })
        wx.reLaunch({
          url: '../checkLocation/checkLocation?code=' + that.data.code
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
})