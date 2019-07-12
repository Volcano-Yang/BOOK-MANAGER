const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init()

exports.main = async (event, context) => {
  let result
  // 聚合数据，按次数计费，不能乱用
  const url = `http://feedback.api.juhe.cn/ISBN?key=${event.key}&sub=${event.isbn}`
  await axios({
    method: "GET",
    url: url
  }).then(res => {
    if (res.data.error_code === 0) {
      result = {
        isbn: res.data.result.isbn13,
        title: res.data.result.title,
        author: res.data.result.author,
        picture: res.data.result.images_large,
        publisher: res.data.result.publisher,
        publish_date: res.data.result.pubdate,
      }
    }
    else {
      result = {
        code: 1,
        result: res.reason
      }
    }
  }).catch(err => {
    result = {
      code: 1,
      result: res.err
    }
  })
  return {
    result
  }
}