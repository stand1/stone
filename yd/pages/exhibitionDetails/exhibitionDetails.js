// pages/exhibitionDetails/exhibitionDetails.js
var WxParse = require('../../utils/wxParse/wxParse.js');
const $axjx = require('../../utils/getData.js');
const $countTime = require('../../utils/countTime.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: {},
    showFooter: 1,
    showBox: false,
    boothList: [],
    indexNum: null,
    boothAreaList: [],
    areaIndex: null,
    exhName: '',
    areaNum: '',
    exhId: 0,
    numberList: [ ],   // 开口数量dataList
    number: null,
    numberStr: '',
    showUserInfo: true,     // 检查用户是否登陆
    areaId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      exhId: options.id
    })
    that.getDetails(options.id)
    that.getExhData(options.id)
    that.getExhArea(options.id,0) // 展区面积 默认0
    that.getExhnumberData(options.id, 0) // 展区开口数量 默认0
    if (app.globalData.userInfo == null) {
      that.setData({
        showUserInfo: false
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
    this.getDetails(this.data.exhId)
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
  onShareAppMessage: function (res) {
    let that = this
    return {
      title: that.data.datas.exhibition_name,
      path: '/pages/exhibitionDetails/exhibitionDetails?id=' + that.data.datas.id + '&openid=' + wx.getStorageSync('openid') || [],
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 3000
        })
      }
    }
  },
  // 获取展会详情页面数据
  getDetails: function(id) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.exhibition_id = id
    $axjx.getData('/getExhibitionDetail', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        WxParse.wxParse('article', 'html', res.data.content, that, 5);
        that.setData({
          datas: res.data
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
  // 唤起弹层showBox
  changeShowBox: function() {
    // this.setData({
    //   showBox: true
    // })
    this.changeStatus()
  },
  // 获取展区信息
  getExhData:function(id) {
    let that = this
    let pamer = {}
    pamer.exhibition_id = id
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getAreaList', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          boothList: res.data
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
  // 获取展区面积信息
  getExhArea: function (id,num) {
    let that = this
    let pamer = {}
    pamer.exhibition_id = id
    pamer.area_id = num
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getAcreageList', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          boothAreaList: res.data,
          areaId: num
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
  // 获取展区开口数量
  getExhnumberData: function (id, num) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let pamer = {}
    pamer.exhibition_id = id
    pamer.acreage_id = num
    pamer.area_id = that.data.areaId
    $axjx.getData('/getOpenNumList', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          numberList: res.data
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
  // 预订须知
  description: function () {
    wx.navigateTo({
      url: '../description/description'
    })
  },
  // 关闭弹层
  onClose: function () {
    this.setData({
      showBox: false,
      indexNum: null,
      areaIndex: null,
      number: null,
      exhName: '',
      areaNum: '',
      numberStr: ''
    })
  },
  // 获取展区id
  getIndex: function (e) {
    let that = this
    if (e.currentTarget.dataset.ischeck == 1) {
      that.setData({
        indexNum: e.currentTarget.dataset.id,
        exhName: e.currentTarget.dataset.str,
        areaIndex: '',
        areaNum: '',
        number: '',
        numberStr: ''
      })
      that.getExhArea(that.data.exhId, e.currentTarget.dataset.id)
    } else {
      return false
    }
  },
  // 获取展区面积大小
  getExhIndex: function (e) {
    let that = this
    if (e.currentTarget.dataset.ischeck == 1) {
      that.setData({
        areaIndex: e.currentTarget.dataset.id,
        areaNum: e.currentTarget.dataset.str,
        number: '',
        numberStr: ''
      })
      that.getExhnumberData(that.data.exhId, e.currentTarget.dataset.id)
    } else {
      return false
    }
  },
  // 获取展位开口数量
  getExhNumber: function (e) {
    let that = this
    if (e.currentTarget.dataset.ischeck == 1) {
      that.setData({
        number: e.currentTarget.dataset.id,
        numberStr: e.currentTarget.dataset.str
      })
    } else {
      return false
    }
  },
  // 提交提单信息
  subOrders: function() {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    if (that.data.exhName != '' && that.data.areaNum != '' && that.data.number != '') {
      let pamer = {}
      pamer.user_id = wx.getStorageSync('user_id') || []
      pamer.openid = wx.getStorageSync('openid') || []
      pamer.area_id = that.data.indexNum
      pamer.acreage_id = that.data.areaIndex
      pamer.exhibition_id = that.data.exhId
      pamer.open_num = that.data.number
      $axjx.getData('/orderConfirmCache', pamer, 'POST').then((res) => {
        wx.hideLoading()
        if (res.code == 10000) {
          wx.setStorageSync('cache_code', res.data.cache_code)
          wx.navigateTo({
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
    } else if (that.data.exhName != '' && that.data.areaNum == '') {
      wx.showToast({
        title: "请选择展位面积！！！",
        icon: "none"
      })
    } else if (that.data.exhName == '' && that.data.areaNum != '') {
      wx.showToast({
        title: "请选择展区！！！",
        icon: "none"
      })
    } else if (that.data.number == '') {
      wx.showToast({
        title: "请选择开口！！！",
        icon: "none"
      })
    } else {
      wx.showToast({
        title: "请选择展区和展位面积！！！",
        icon: "none"
      })
     }
  },
  // 去支付
  payment:function(e) {
    wx.navigateTo({
      url: '../orderDetails/orderDetails?code=' + e.currentTarget.dataset.code
    })
  },
  // 查看展位
  checkExh:function(e) {
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../checkLocation/checkLocation?code=' + code
    })
  },
  // 挑选展位
  selectExh: function (e) {
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../selectExh/selectExh?code=' + code + '&id=' + this.data.exhId + '&type=1'
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
              app.globalData.userInfo = res.userInfo
              that.storageUserIno(res.userInfo.nickName, res.userInfo.avatarUrl)
            },
            fail: res => {
              wx.hideLoading()
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.hideLoading()
          wx.showToast({
            title: '请授权登陆',
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
  // 用户资料详情存储
  storageUserIno: function (openId, nickName, avatarUrl) {
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
      if (res.code == 10000) {
        that.setData({
          showUserInfo: true,
          showBox: true
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
  // 查看展位分布图
  checkExhibition: function (e) {
    if (this.data.datas.status == 2) {
      wx.showToast({
        title: '暂未开放',
        icon: 'none',
        duration: 3000
      })
      return false
    }
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../selectExh/selectExh?code=' + '&id=' + this.data.exhId + '&type=2'
    })
  },
  // 查看当前展会状态
  changeStatus: function () {
    let that = this
    let pamer = {}
    pamer.exhibition_id = that.data.exhId
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getExhibitionStatus', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        if (res.data.status != 3) {
          that.setData({
            showBox: true
          })
        } else {
          wx.showToast({
            title: '预订已结束',
            icon: 'none',
            duration: 3000
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
  }
})