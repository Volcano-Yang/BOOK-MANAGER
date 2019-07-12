/**
 * 根据id和类型修改用户资料
 * @params:
 * type {string}
 * value {string}
 */
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
exports.main = async (event, context) => {
  const data = event.data
  const corner_id = event.corner_id
  const book_id = event.book_id
  console.log(data)
  console.log(corner_id)
  console.log(book_id)
  const db = cloud.database()
  let code = 0
  let msg = '借书成功'
  await db.collection('book_record').add({
    data,
    success: function (res) {
      console.log(res)
    },
    fail: (err) => {
        code = 1,
        msg =  '借书失败'
      
    }
  })
  const _ = db.command
  await db.collection('book_detail').where({
    corner_id: corner_id,
    book_isbn: book_id,
  }).update({
    data: {
      borrowed_num: _.inc(1)
    },
    success: function (res) {
      console.log(res)
    },
    fail: (err)=> {
        code = 1,
        msg =  '借书失败'
      
    }
  })
  return {
    code,
    msg
  }
}