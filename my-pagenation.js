const mongoose = require('mongoose')

module.exports = async function (db_name, query,data_name) {
  // 获取页面信息
  let pagesize = query.pagesize
  let pagenum = query.pagenum
  let queryInfo = query.queryInfo.trim()

  //获取总条数
  let count = await db_name.find().countDocuments()

  //获取数据
  let data_ = await db_name.find(queryInfo === '' ? {} : {
    'art_title': {
      $regex: queryInfo
    }
  }).limit(pagesize - 0).skip((pagenum - 1) * pagesize).exec()

  //获取总页数
  total = Math.ceil(count / pagesize)

  return {
    [data_name]: data_,
    total: total,
    currentPagenum:pagenum
  }
}