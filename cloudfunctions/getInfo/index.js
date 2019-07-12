/**
 * 根据id获取该用户详细信息
 */
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  let info = await db.collection('personal_users').where({
    // openid不要自己传，用sdk自带
    openid: event.userInfo.openId
  }).get()
  return {
    info
  }
}