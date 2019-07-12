const app = getApp()

Page({
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    openid:'',
    book_record:[],
  },
  onLoad: function(options) {
    const db = wx.cloud.database({});
    db.collection('book_record').where({
      //筛选数据
      openid: app.globalData.openid,
      state:"未还"
    }).get({
      success: res => {
        console.log('查询成功', res.data);
        this.setData({
          book_record: res.data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败',
        })
        console.error('查询记录失败', err)
      }
    })

  },

  onPullDownRefresh: function () {
    const db = wx.cloud.database({});
    db.collection('book_record').where({
      //筛选数据
      openid: app.globalData.openid,
      state: "未还"
    }).get({
      success: res => {
        console.log('查询成功', res.data);
        this.setData({
          book_record: res.data
        });
        console.log('输出成功');
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败',
        })
        console.error('查询记录失败', err)
      }
    })
  },

  onReady: function() {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  }
})