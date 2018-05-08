//get
function getJSON (url) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(this.responseText, this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send()
    })

}
//post
function postJSON(url, data) {
    return new Promise( (resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send(JSON.stringify(data))
    })
}

//调用
getJSON('/api/v1/xxx')    // => 这里面是就try
.catch( error => {
  // dosomething          // => 这里就是catch到了error，如果处理error以及返还合适的值
})
.then( value => {
  // dosomething          // 这里就是final
})


//$.ajax
//创建一个Promise实例，获取数据。并把数据传递给处理函数resolve和reject。需要注意的是Promise在声明的时候就执行了。
var getUserInfo=new Promise(function(resolve,reject){
    $.ajax({
        type:"get",
        url:"index.aspx",
        success:function(data){
            if(data.Status=="1"){
                resolve(data.ResultJson)//在异步操作成功时调用
            }else{
                reject(data.ErrMsg);//在异步操作失败时调用
            }
        }
    });
})
//另一个ajax Promise对象，
var getDataList=new Promise(function(resolve,reject){
    $.ajax({
        type:"get",
        url:"index.aspx",
        success:function(data){
            if(data.Status=="1"){
                resolve(data.ResultJson)//在异步操作成功时调用
            }else{
                reject(data.ErrMsg);//在异步操作失败时调用
            }
        }
    });
})
//Promise的方法then,catch方法
getUserInfo.then(function(ResultJson){
    //通过拿到的数据渲染页面
}).catch(function(ErrMsg){
    //获取数据失败时的处理逻辑
})
//Promise的all方法，等数组中的所有promise对象都完成执行
Promise.all([getUserInfo,getDataList]).then(function([ResultJson1,ResultJson2]){
    //这里写等这两个ajax都成功返回数据才执行的业务逻辑
})
复制代码