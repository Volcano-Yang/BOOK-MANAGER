const app = getApp()
Page({
  data: {
    state: 0,
    _num: '0',
    statusBarHeight: '',
    titleBarHeight: '',
    corners: [],
    books: [],
    book_record:[]
  },
  /** 
   * 点击tab切换 
   */
  toggle(e) {
    if (this.data._num === e.currentTarget.dataset.index) {
      return false;
    } else {
      this.setData({
        _num: e.currentTarget.dataset.index
      })
    }
    if (this.data._num === '1') {
      this.getBooks()
    }
    if (this.data._num === '2') {
      this.getBook_record()
    }
  },
  getBooks: function() {
    const db = wx.cloud.database({});
    db.collection('book_detail').where({
      //筛选数据
      corner_id: app.globalData.cornerId
    }).get({
      success: res => {
        console.log('查询成功', res.data);
        this.setData({
          books: res.data
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
  getBook_record: function () {
    const db = wx.cloud.database({});
    db.collection('book_record').where({
      //筛选数据
      corner_id: app.globalData.cornerId
    }).get({
      success: res => {
        console.log('查询成功', res.data);
        this.setData({
          book_record: res.data
        })
        console.log('输出成功');
      },
      fail: err => {
        console.error('查询记录失败', err)
      }
    })
  },

  bindChange: function(e) {
    var that = this;
    that.setData({
      _num: e.detail.current
    });
    switch (e.detail.current) {
      case 0:
        that.data.state = 0
        break;
      case 1:
        that.data.state = 1
        break;
      case 2:
        that.data.state = 2
        break;
    }
  },
  onLoad: function (options) {
    let index = options.index? options.index:"0"
    this.setData({
      _num: `${parseInt(index)}`,
      state: index
    })
    this.getInfo()
    if (this.data._num === '1') {
      this.getBooks()
    }
  },
  getInfo: function() {
    const db = wx.cloud.database({})
    db.collection('corner_detail').where({
      manager_openid: app.globalData.openid
      //筛选数据
    }).get({
      success: res => {
        console.log('查询成功', res.data);
        this.setData({
          corners: res.data
        })
        app.globalData.cornerId = res.data[0].corner_id
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
  onReady: function () {
    const vm = this
    vm.setData({
      statusBarHeight: getApp().globalData.statusBarHeight,
      titleBarHeight: getApp().globalData.titleBarHeight
    })
  }
})