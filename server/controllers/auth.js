// 引入数据库操作模块
const {exec,escape} = require('../db/mysql')
// 引入加密模块
const {genPassword} = require('../utils/cryp')


//定义类方法作为实际业务处理即控制器
class Auth{
  // 注册
  async register(req,res){
    // 1.先获取前端传过来的用户名和密码
    // 2.防止sql注入，密码加密存储
    // 3.查询数据库验证用户名是否已经存在，存在跳转登陆页，不存在进插入数据库新建用户
    let {username,password} = req.body
    username = escape(username)
    // 生成加密的密码
    password = genPassword(password)
    password = escape(password)
    // 定义sql语句
    const  sql = `select * from users where username=${username} and password=${password}`
    const result = await exec(sql)
    if(result != 0){
      // 用户名已存在，跳到登陆页面
      res.render('info/info.ejs',{
        title:'注册失败',
        content:'用户已存在',
        href:'/auth/login',
        hrefTxt:'登陆页'
      })
    }else{
      // 用户名不存在，跳到登陆页面
      // 将数据插入数据库
      const sql = `insert into users (username,password,role_id) values (${username},${password},1);`
      await exec(sql)
      res.render('info/info.ejs',{
        title:'注册成功',
        content:'用户注册成功，即将进入登录页',
        href:'/auth/login',
        hrefTxt:'登陆页'
      })
    }


  }
  // 登陆
  async login(req,res){
    // console.log(req.body)
    // 此时登陆的密码也要加密在查询数据库
    //根据提交的邮箱和密码判断是否是正确的账号密码
    let {username,password} = req.body
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    let sql = `select * from users where username=${username} and password=${password}`;
    let result = await exec(sql)
    if(result.length!=0){
        //登陆成功，设置session
        req.session.username = username;
        res.render('info/info.ejs',{
            title:"登陆成功",
            content:"即将进入后台首页",
            href:"/admin",
            hrefTxt:"后台首页"
        })
    }else{
        res.render('info/info.ejs',{
            title:"登陆失败",
            content:"账号或密码不正确",
            href:"/auth/login",
            hrefTxt:"登录页"
        })
    }
  }
  //退出登陆
  async signOut(req,res){
    // 通过销毁session的方式退出登陆
    req.session.destroy()
    res.render('info/info.ejs',{
      title:"退出登陆成功",
      content:"即将进入登陆页",
      href:"/auth/login",
      hrefTxt:"登录页"
    })
  }

} 

// 导出
module.exports = new Auth()

