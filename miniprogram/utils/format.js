module.exports = {
  /**
   * 将Date类型转化为YYYY-MM-DD HH:MM:SS 格式
   * @options param{String}
   */
  formatTime: function (time) {
    let date = new Date(time)
    let year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    let newTime = year + '-' +
      month + '-' +
      day + ' ' +
      hour + ':' +
      min + ':' +
      sec;
    return newTime;
  },
  /**
   * 将Date类型转化为YYYY-MM-DD 格式
   * @options param{String}
   */
  formatDate: function (time) {
    let date = new Date(time)
    let year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    let newTime = year + '-' +
      month + '-' +
      day
    return newTime;
  },
  addedDate: function (num) {
    let date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    let date2 = new Date(date1)
    date2.setDate(date1.getDate() + num);
    let time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()
    return time2
  }
}