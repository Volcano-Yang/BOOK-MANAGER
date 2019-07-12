// 检测获取输入的isbn码是否正确
const {
  isbn
} = require('../../utils/reg.js')
const app = getApp()
/**
* 这个页面的逻辑是管理员点击某个图书角的添加书籍后，
* 通过扫码/输入获得isbn码，展示这本书的详细数据和自定义添加的数量，
* 确认无误后点击上传，最后跳转回首页。
*/
Page({
  data: {
    disabled: false,
    statusBarHeight: '',
    titleBarHeight: '',
    ISBN: '',
    cornerId: '',
    modal_disable: true,
    title: '这本书没有出版号',
    author: "匿名",
    publish_date: "1970-1-1",
    publisher: "无出版社",
    picture: "https://6465-development-813720-1259208181.tcb.qcloud.la/none.png?sign=d495634bb01850ecd126a5ff0052cb8a&t=1559531780",
    total: 1,
    borrowed_num: 1
  },

  onLoad: function (options) {
    if (!app.globalData.cornerId) {
      wx.showModal({
        title: '提示消息',
        showCancel: false,
        content: `你还没有管理的图书角`,
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../index_m/index_m',
            })
          }
        }
      })
    }
    // 添加的图书角的id
    this.setData({
      cornerId: app.globalData.cornerId
    })
  },
  inputISBN(e) {
    this.setData({
      ISBN: e.detail.value
    })
  },
  getScancode() {
    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        if (res.result)
          this.getBookDetail(res.result)
        else
          wx.showToast({
            title: '无此书信息',
            icon: 'none',
            duration: 2000
          })
      },
      fail: err => {
        // wx.showToast({
        //   title: '服务器出错'
        // })
      }
    })
  },

  modalBindcancel(e) {
    this.setData({
      modal_disable: true,
    })
  },

  modalBindaconfirm(e) {
    this.setData({
      modal_disable: true,
      disabled: false
    })
    if (isbn(this.data.ISBN)) {
      this.getBookDetail(this.data.ISBN)
    } else {
      wx.showToast({
        title: '条形码无效',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },

  showModal() {
    this.setData({
      modal_disable: false
    })
  },

  getBookDetail(isbn) {
    let that = this
    const config = require("../../utils/config")
    wx.cloud.callFunction({
      name: 'bookinfo',
      data: {
        key: config.book_app_key,
        isbn,
      },
      success: res => {
        console.log(res)
        const {
          title,
          picture,
          author,
          publisher,
          publish_date,
          isbn
        } = res.result.result
        this.setData({
          title,
          picture,
          author,
          publisher,
          publish_date,
          total: 1,
          borrowed_num: 1,
          ISBN: isbn,
          disabled: true
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  onAdd() {
    const that = this
    // 确认信息后添加书籍 
    if (this.data.total < 1) {
      wx.showToast({
        title: '请输入数量',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const db = wx.cloud.database()
    const books = db.collection('book_detail')
    books.add({
      data: {
        book_isbn: that.data.ISBN,
        title: that.data.title,
        picture: that.data.picture,
        corner_id: that.data.cornerId,
        author: that.data.author,
        publisher: that.data.publisher,
        publish_date: that.data.publish_date,
        total: that.data.total,
        borrowed_num: 0
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '添加成功',
        icon: "success",
      })
      wx.reLaunch({
        url: '../index_m/index_m?index=1',
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '添加失败',
        image: '../../images/error.png',
      })
    })
  },
  Plus: function (e) {
    //修改数量的+按钮
    let total = this.data.total + 1
    this.setData({
      total: total,
      borrowed_num: total
    })
  },
  Dec: function (e) {
    //修改数量的-按钮
    let total = this.data.total - 1
    if (total > 0)
      this.setData({
        total: total,
        borrowed_num: total
      })
  },
  bindManual: function (e) {
    const data = e.detail.value
    if (data > 0)
      this.setData({
        total: data,
        borrowed_num: data
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