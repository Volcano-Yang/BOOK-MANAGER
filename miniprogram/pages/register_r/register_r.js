const app = getApp()
Page({
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    alreadySend: false,
    msgVerify: "验证",
    btnVerify: "btn-verify unsent",
    name: "",
    phone: "",
    department_class: "",
    personal_id: ""
  },
  onLoad: function (options) {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  },

  inputname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  inputdepartment_class(e) {
    this.setData({
      department_class: e.detail.value
    })
  },
  inputpersonal_id(e) {
    this.setData({
      personal_id: e.detail.value
    })
  },
  sentVerify(e) {
  //  验证服务尚未开通
   wx.showToast({
     title: '验证服务尚未开通',
     icon: 'none',
     duration: 1000,
   })
  },

  sumbit_fromdata: function (e) {
    const db = wx.cloud.database()
    db.collection('personal_users').add({
      data: {
        openid: app.globalData.openid,
        name: this.data.name,
        phone: this.data.phone,
        department_class: this.data.department_class,
        personal_id: this.data.personal_id
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        console.log('[数据库] [新增记录] 成功，记录 ',res.data)
        wx.showModal({
          title: '注册成功',
          content: '点击确认返回',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../add_r/add_r',
              })
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

