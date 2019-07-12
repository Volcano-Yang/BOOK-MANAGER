const { randomId } = require('../../utils/random.js')
const app = getApp()
Page({
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    corner_name: "",
    manager_name: "",
    corner_location: "",
    max_num: 0,
    max_day:0
  },
  onLoad: function (options) {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },
  input_corner_name(e) {
    this.setData({
      corner_name: e.detail.value
    })
  },
  input_manager_name(e) {
    this.setData({
      manager_name: e.detail.value
    })
  },
  input_corner_location(e) {
    this.setData({
      corner_location: e.detail.value
    })
  },

  input_max_num(e) {
    this.setData({
      max_num: e.detail.value
    })
  },
  input_max_day(e) {
    this.setData({
      max_day: e.detail.value
    })
    console.log(this.data.max_day)
  },

  sumbit_fromdata: function (e) {
    const id = randomId(new Date())
    const db = wx.cloud.database()
    db.collection('corner_detail').add({
      data: {
       title:this.data.corner_name,
       corner_id: id,
       manager_openid:app.globalData.openid,
       manager_name:this.data.manager_name,
       manager_openid:app.globalData.openid,
       location:this.data.corner_location,
       max_num:this.data.max_num,
       max_day:this.data.max_day
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 ')
        wx.showModal({
          title: '注册成功',
          content: '点击确认返回',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.reLaunch({
                url: '../index_m/index_m',
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：')
      }
    })
  },
})

