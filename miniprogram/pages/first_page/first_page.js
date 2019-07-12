var userinfoid = ''
module.exports = {
  userinfoport: userinfoid
}
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  // 获取普通用户昵称储存
  bindGetUserInfo1: function (e) {
    userinfoid = e.detail.userInfo.nickName;
      wx.showLoading({
        title: '登陆中...',
      }),
      wx.switchTab({
        url: '../index_r/index_r'
      })
  },

  // 获取管理用户昵称储存
  bindGetUserInfo2: function (e) {
    userinfoid = e.detail.userInfo.nickName;
      wx.showLoading({
        title: '登陆中...',
      }),
      wx.navigateTo({
        url: '../index_m/index_m',
      })
  }
})