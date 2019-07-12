// pages/me_r/me_r.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    disable: true,
    user: {
      phone: '暂未填写',
      name: '暂未填写',
      part: '暂未填写',
      id: '暂未填写'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // todo 调用云函数getinfo获取用户信息
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
    wx.showLoading({
      title: '正在加载',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 600)
    wx.cloud.callFunction({
      name: 'getInfo',
      data: {},
      success: res => {
        console.log(res)
        this.setData({
          user: {
            name: res.result.info.data[0].name,
            phone: res.result.info.data[0].phone,
            part: res.result.info.data[0].department_class,
            id: res.result.info.data[0].personal_id,
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  handleUpdate(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      disable: false
    })
  },
  modalBindcancel(e) {
    this.setData({
      disable: true
    })
  },
  modalBindaconfirm(e) {
    this.setData({
      disable: true
    })
    const that = this
    wx.cloud.callFunction({
      name: 'updateUser',
      data: {
        type: that.data.type,
        value: that.data.value
      },
      success: res => {
        console.log(res)
        if (res.result.code === 0) {
          wx.showToast({
            title: res.result.msg,
            icon: 'success',
            duration: 1500
          })
          wx.cloud.callFunction({
            name: 'getInfo',
            data: {},
            success: res => {
              console.log(res)
              this.setData({
                user: {
                  name: res.result.info.data[0].name,
                  phone: res.result.info.data[0].phone,
                  part: res.result.info.data[0].department_class,
                  id: res.result.info.data[0].personal_id
                }
              })
            },
            fail: err => {
              console.log(err)
            }
          })
        } else
          wx.showToast({
            title: res.result.msg,
            image: '../../images/error.png',
            duration: 1500
          })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '网络连接失败',
          image: '../../images/error.png',
          duration: 1500
        })
      }
    })
  },
  gotoregister: function () {
    wx.navigateTo({
      url: '../register_r/register_r',
    });
  },
  change(e) {
    this.setData({
      value: e.detail.value
    })
  },
})