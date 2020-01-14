const countTime = function (str) {
  var datetimer = setInterval(function () {

    var haveTime = parseInt((new Date(str).getTime() - (+new Date())) / 1000);

    var day = parseInt(haveTime / 3600 / 24);

    var h = parseInt((haveTime / 3600) % 24);

    var m = parseInt((haveTime / 60) % 60);

    var s = parseInt(haveTime % 60);

    if (haveTime <= 0) {

      console.log("活动已结束");

      clearInterval(datetimer);

    } else {
      console.log(haveTime)

      console.log("剩余：" + day + "天" + h + "时" + m + "分" + s + "秒");

    }

  }, 1000);
}

module.exports = {
  countTimes: countTime
}