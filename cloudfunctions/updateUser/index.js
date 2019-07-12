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
  const type = event.type
  const db = cloud.database()
  let code = 0
  let msg = '修改成功'
  // 由于每次只修改一项，所以只需if判断
  if(type === 'phone') {
    await db.collection('personal_users').where({
      // openid不要自己传，用sdk自带的
      openid: event.userInfo.openId,
    }).update({
      // data 传入需要局部更新的数据
      data: {
        phone: parseInt(event.value)
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        code = 1,
        msg =  '修改失败'
      }
    })
  }
  else if (type === 'department') {
    await db.collection('personal_users').where({
      // openid不要自己传，用sdk自带的
      openid: event.userInfo.openId,
    }).update({
      // data 传入需要局部更新的数据
      data: {
        department_class: event.value
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        code = 1,
          msg = '修改失败'
      }
    })
  }
  if (type === 'id') 
    await db.collection('personal_users').where({
      // openid不要自己传，用sdk自带的
      openid: event.userInfo.openId,
    }).update({
      // data 传入需要局部更新的数据
      data: {
        personal_id: event.value
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        code = 1,
          msg = '修改失败'
      }
    })
  if (type === 'name') {
    await db.collection('personal_users').where({
      // openid不要自己传，用sdk自带的
      openid: event.userInfo.openId,
    }).update({
      // data 传入需要局部更新的数据
      data: {
        name: event.name
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        code = 1,
          msg = '修改失败'
      }
    })
  }
  return {
    code,
    msg
  }
}