//other code...

/** 
 * 自定义post函数，返回Promise
 * +-------------------
 * +-------------------
 * @param {String}      url 接口网址
 * @param {arrayObject} data 要传的数组对象 例如: {name: 'xxx', age: 22}
 * +-------------------
 * @return {Promise}    promise 返回promise供后续操作
 */
const getData = function(url, data, type) {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var Url = 'https://yd.mycze.com'
    var Data = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    wx.request({
      url: Url + url,
      data: Data,
      method: type,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res.data.info);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

   //other codes...
module.exports = {
  getData: getData
}   