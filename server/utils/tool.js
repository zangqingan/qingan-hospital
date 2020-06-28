// 引入数据库操作模块
const {exec} = require('../db/mysql')

// 登陆检验
const  checkLogin = (req,res,next) => {
  // 如果没用用户名
  if(!req.session.username){
      res.render('info/info.ejs',{
      title:"尚未登陆",
      content:"尚未登陆,请先登陆即将进入登陆页",
      href:"/auth/login",
      hrefTxt:"登陆页"
    })
  }else{
    next()
  }
}
// 获取用户角色
const getRole = async (req,res,next) => {
  const sql = `select * from roles;`
  const result = await exec(sql)
  return Array.from(result)
}
module.exports = {
  checkLogin,
  getRole
}
