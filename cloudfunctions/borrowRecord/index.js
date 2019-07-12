// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const record = db.collection('book_record')
  let perpage = (parseInt(event.perPage) - 1) * 10
  let result
  await record.limit(10).skip(perpage).where({
    openid: wxContext.OPENID,
  }).get().then(res => {
    result = res.data
  }).catch (err => {
    result = {}
  })
  return result
}