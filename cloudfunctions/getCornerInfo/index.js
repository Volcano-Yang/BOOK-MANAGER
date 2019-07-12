const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
exports.main = async (event, context) => {
  const db = cloud.database()
  let manager = await db.collection('manage_users').where({
    openid: event.userInfo.openId
  }).get()
  let corners = [] 
   // map方法不支持异步操作，所以用笨方法
   for(let i =0; i < manager.data[0].managingid.length; i++) {
      corners[i] = await db.collection('corner_detail').where({
        corner_id: manager.data[0].managingid[i]
      }).get()
   }
  // manager.data[0].managingid.map((item) => {
  //   // 遍历里面需要一个异步函数
  //       console.log(item)
  //       console.log(typeof item)
  //       let temp =  await db.collection('corner_detail').where({
  //         corner_id: item
  //       }).get()
  //       console.log("来了老弟")
  //       console.log(temp)
  //       corners.push(temp[0].data)
  //   })
  return {
    corners
  }
}