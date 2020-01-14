// pages/orderDetails/orderDetails.js
import { $wuxCountDown } from '../../dist/index.js'
const $axjx = require('../../utils/getData.js');
// 订单状态 1已失效 2待支付 3预订成功 4展位已锁定 5 退款审核中 6退款审核通过 7预订已取消 8退款申请已取消 9延期成功  showTitle
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    timers: '',
    showTimers: true,
    datas: {},
    showTitle: null,
    showFooter: null,
    timersT: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
    this.getData(options.code,1)
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
  // 倒计时时间
  countDown : function (timer) {
    let that = this
    let t = timer
    this.timers = new $wuxCountDown({
      date: t,
      // dome渲染回调
      render(date) {
        if (t == undefined) return false
        const days = this.leadingZeros(date.days) + ' 天 '
        const hours = this.leadingZeros(date.hours, 2) + ' 时 '
        const min = this.leadingZeros(date.min, 2) + ' 分 '
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
        if (that.data.showTitle == 2) {
          that.setData({
            timers: min + sec,
          })
        } else{
          console.log(days + hours + min + sec)
          that.setData({
            timersT: days + hours + min + sec
          })
        }
      },
      //倒计时结束回调
      onEnd(){
        if (that.data.showTitle == 2) { 
          this.setData({
            showTimers: false,
            showTitle: 1
          })
        } else if (that.data.showTitle == 3) {
          this.setData({
            showTimers: false,
            showTitle: 1
          })
        }
      }
    })
  },
  // 获取页面数据
  getData:function(code,num) {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = code
    pamer.type = num
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderDetail', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        that.setData({
          datas: res.data,
          showTitle: res.data.orderinfo.order_condition
        })
        if (res.data.orderinfo.countdown == '') {
          that.setData({
            showTimers: false
          })
        }
        that.countTime(res.data.orderinfo.countdown)
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
  // 取消预订
  cancelReserve:function() {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/cancelOrder', pamer, 'POST').then((res) => { 
      wx.hideLoading()
      if (res.code == 10000) {
        let obj = that.data.datas
        obj.orderinfo.order_description = res.data.order_description
        that.setData({
          showTitle: res.data.order_condition,
          datas: obj
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
  // 重新预订
  rebook:function() {
    // wx.switchTab({
    //   url: '../index/index'
    // })
    wx.navigateTo({
      url: '../exhibitionDetails/exhibitionDetails?id=' + this.data.datas.exhibition_info.id
    })
  },
  // 取消退款申请
  cancelRequest: function() {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/cancelOrderRefund', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let obj = that.data.datas
        obj.orderinfo.order_description = res.data.order_description
        that.setData({
          showTitle: res.data.order_condition,
          datas: obj
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
  // 申请退款
  applyRefund: function() {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/orderRefund', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let obj = that.data.datas
        obj.orderinfo.is_refund = 2
        obj.orderinfo.order_description = res.data.order_description
        that.setData({
          datas: obj,
          showTitle: res.data.order_condition
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
  // 延长期限
  postpone: function () {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/reprofiling', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let obj = that.data.datas
        obj.orderinfo.is_delay = 2
        that.setData({
          datas: obj,
          showTitle: res.data.order_condition,
          showTimers: true
        })
        that.countDown(res.data.countdown)
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
  // 选择展位
  selectExh: function () {
    wx.navigateTo({
      url: '../selectExh/selectExh?code=' + this.data.code + '&type=1'
    })
  },
  // 查看展位
  checkExh: function (e) { 
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../checkLocation/checkLocation?code=' + code
    })
  },
  // 锁定展位
  paidExh: function () {
    let that = this
    let pamer = {}
    pamer.user_id = wx.getStorageSync('user_id') || []
    pamer.openid = wx.getStorageSync('openid') || []
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/payTheRetainage', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let obj = that.data.datas
        obj.orderinfo.is_refund = 2
        obj.orderinfo.is_payment = 2
        obj.orderinfo.order_description = res.data.order_description
        that.setData({
          datas: obj,
          showTitle: res.data.order_condition,
          showTimers: false
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
  // 弹框
  modalOpen:function(e){
    let that = this
    let title = e.currentTarget.dataset.title
    let center = e.currentTarget.dataset.center
    let type = e.currentTarget.dataset.type
    wx.showModal({
      title: title,
      content: center,
      confirmColor: '#00C200',
      cancelColor: '#D6D6D6',
      success(res) {
        // type 2 => 取消预订  3 => 申请退款  4 => 退款中申请取消
        if (res.confirm) {
          if (type == 2) {
            that.cancelReserve()
          } else if (type == 3) {
            that.applyRefund()
          } else if (type == 4) {
            that.cancelRequest()
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  continuePay: function () {
    let that = this
    let pamer = {}
    pamer.order_sn = that.data.code
    wx.showLoading({
      title: '加载中...',
    })
    $axjx.getData('/getOrderPay', pamer, 'POST').then((res) => {
      wx.hideLoading()
      if (res.code == 10000) {
        let strUrl = res.data.success_url
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.nonce_str,
          package: 'prepay_id=' + res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.sign,
          success(res) {
            console.log(res)
            if (res.errMsg == "requestPayment:ok") {
              wx.requestSubscribeMessage({
                tmplIds: ['KEWODpJpvgIG7QEzaDjwzVsofpZRW-0somstjrEXYjg'],
                success(res) {
                  wx.reLaunch({
                    url: '../paySuccess/paySuccess?code=' + that.data.code
                  })
                },
                fail(err) {
                  wx.reLaunch({
                    url: '../paySuccess/paySuccess?code=' + that.data.code
                  })
                }
              })
              wx.showToast({
                title: '支付成功'
              })
            }
          },
          fail(res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '取消支付',
                icon: 'none'
              })
            }
          }
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
  // 倒数时间
  countTime: function(str) {
    var that = this
    var datetimer = setInterval(function () {
      var haveTime = parseInt((new Date(str).getTime() - (+new Date())) / 1000);
      var day = parseInt(haveTime / 3600 / 24);
      var h = parseInt((haveTime / 3600) % 24);
      var m = parseInt((haveTime / 60) % 60);
      var s = parseInt(haveTime % 60);
      if (haveTime <= 0) {
        if (that.data.showTitle == 2) {
          that.setData({
            showTimers: false,
            showTitle: 1
          })
        } else if (that.data.showTitle == 3) {
          clearInterval(datetimer)
          that.getData(that.data.code, 2)
        }
        clearInterval(datetimer);
      } else {
        if (that.data.showTitle == 2) {
          that.setData({
            timers: m + "分" + s + "秒"
          })
        } else {
          that.setData({
            timers: day + "天" + h + "时" + m + "分" + s + "秒",
          })
        }
      }
    }, 1000);
  }
})