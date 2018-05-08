//app.js
App({

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
   getData : function(url, data, type){
      var promise = new Promise((resolve, reject) => {
         //init
         var that = this;
         var Data = data;
         /*
         //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
         postData.signature = that.makeSign(postData);
         */
         //网络请求
         wx.request({
            url: url,
            data: Data,
            method: type,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {//服务器返回数据
               if (res.data.status == 1) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
                  resolve( res.data.data );
               } else {//返回错误提示信息
                  reject( res.data.info );
               }
            },
            error: function (e) {
               reject('网络出错');
            }
         })
      });
      return promise;
   },

   //other codes...

)}

/*
其他页面调用app.post()函数 
pages/index.js
*/

//pages/index.js
const app = getApp();
//获取首页传参的广告aid
page({
  //other code...

  //页面第一次加载
  onLoad: function () {
     var data = {id: 18};//要传的数组对象
     wx.showLoading({
         title: '加载中...',
      })
     //调用 app.js里的 post()方法
     app.getData('http://接口网址', data, "POST").then( (res)=>{
        console.log(res);//正确返回结果
        wx.hideLoading();
     } ).catch( (errMsg)=>{
        console.log(errMsg);//错误提示信息
        wx.hideLoading();
     } );
  },
  //other code...
})