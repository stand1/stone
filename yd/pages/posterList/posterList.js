// pages/posterList/posterList.js
Page({

  /**
  * 页面的初始数据
  */
  data: {

    　　swiperH: '',//swiper高度
    　　nowIdx: 0,//当前swiper索引
    　　imgList: [//图片列表
      　　　　'../../img/ceshi/img1.png',
      　　　　'../../img/ceshi/img2.png',
      　　　　'../../img/ceshi/img3.png',
             '../../img/ceshi/img4.png',
             '../../img/ceshi/img5.png'
    　　]
  },
  //swiper滑动事件
  swiperChange: function (e) {
    　　this.setData({
      　　　　nowIdx: e.detail.current
    　　})
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

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

  }
})