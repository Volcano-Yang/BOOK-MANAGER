module.exports = {
  /**
   * 随机生成以时间为种子的cornerId
   * 前三位为当天在365/366天中的第几天
   * 中间四位为各两位的分秒
   * 最后一位为1-9的随机数
   */
  randomId: function(time) {
      let s1 = '2019-01-01';
      s1 = new Date(s1.replace(/-/g, "/"))
      let days = time.getTime() - s1.getTime()
      let daysInt = parseInt(days / (1000 * 60 * 60 * 24))
      let str_daysInt
      if (daysInt < 10)
        str_daysInt = `00${daysInt}`
      else if(daysInt < 100)
        str_daysInt =`0${daysInt}`
      else  
        str_daysInt = `${daysInt}`
      let min = time.getMinutes()
      let sec = time.getSeconds()
      let rand = Math.floor(Math.random() * 10 + 1)
      let str_result = `${str_daysInt}${min}${sec}${rand}`
    return  str_result
  }
}