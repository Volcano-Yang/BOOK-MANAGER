let trimStr = (str) => {
  /**
   * 去掉开始和结尾的空格
   */
  if (str)
    return str.replace(/(^\s*)|(\s*$)/g, "")
  else
    return ''
}
let name = (name) => {
  // 中文名
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(trimStr(name))) {
    return true
  } else {
    return false
  }
}
let phone = (phone) => {
  if(/^1[34578]\d{9}$/.test(trimStr(phone))) {
    return true
  } else {
    return false
  }
}
let isbn = (num) => {
  // todo 校验条形码是否正确
  if (num.length === 13)
    return true
  return false
}
/**
 * 只能为数字或字母
 */
let numOrLetter = (str) => {
  let reg = /^[0-9a-zA-Z]*$/g
  if (!reg.test(phone)) {
    return true
  } else {
    return false
  }
}
module.exports = {
  trimStr,
  name,
  phone,
  isbn,
  numOrLetter
}