// 引入数据库操作模块
const {exec,escape} = require('../../db/mysql')
// 引入加密模块
const {genPassword} = require('../../utils/cryp')
// 获取所有的角色
const {getRole} = require('../../utils/tool')

class Users{
  //1. 用户详情
  async userDetail(req,res,next){
    // 获取用户名，查找数据库
    const {username} = req.session
    const sql = `select * from users where username=${username};`
    const result = await exec(sql)
    // 获取所有角色
    const roles = await getRole()
    const options = {
      users:result[0],
      roles
    }
    res.render('admin/users/selfinfo.ejs',options)

  }
  //2. 修改用户详情
  async updateUserDetail(req,res,next){
    // 获取表单修改后的内容，插入数据库更新
    // console.log(req.body)
    let {username,password,tel,email,role_id} = req.body
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql = `update users set password=${password},tel='${tel}',email='${email}',role_id='${role_id}' where username=${username} `
    await exec(sql)
    res.json({
      state:'ok',
      content:'个人信息更新成功'
    })

  }
  //3. 上传头像
  async uploadAvatar(req,res,next){
    // console.log(req.file)
    const {username} = req.session
    req.file.url = `http://localhost:3000/upload/${req.file.filename}`
    // 将地址上传到数据库中
    const sql = `update users set avatar='${req.file.url}' where username=${username};`
    await exec(sql)
    res.json(req.file)
  }
  // 4. 获取用户列表后端渲染
  async fetchUserList1(req,res,next){
    //查找数据库获取所有用户信息
    let {page} = req.query
    page = page?page:1
    let start = (parseInt(page)-1)*5
    const sql = `select * from users limit ${start},5`;
    const result = await exec(sql)
    // 计算总数
    const sql1 = `select count(*) as totalnum from users;`
    const totalnum = await exec(sql1)
    // console.log(totalnum)
    const options = {
      userlist:Array.from(result),
      totalnum
    }
    res.render('admin/users/userlist1.ejs',options)
  }
  // 5. 删除所有用户
  async delALLUserList1(req,res,next){
    const dellist = req.body['dellist[]']
    dellist.forEach(async (val,i) => {
      // 删除
      const sql = `delete from users where user_id=${val}`
      await exec(sql)
    });
    res.json({
      state:'ok',
      content:'删除成功'
    })
  }
  // 6. 删除一个用户
  async delOneUserList1(req,res,next){
    const dellist = req.body['dellist[]']
    const sql = `delete from users where user_id=${dellist}`
    await exec(sql)
    res.json({
      state:'ok',
      content:'删除成功'
    })
  }
  // 7. 获取用户列表前端渲染
  async fetchUserList2(req,res,next){
    res.render('admin/users/userlist2.ejs')
  }
  // 8.渲染增加用户页面
  async addUserview(req,res,next){
    // 获取所有角色
    const roles = await getRole()
    const options = {
      roles
    }
    res.render('admin/users/adduser.ejs',options)
  }
  // 9.真正的增加用户
  async addUser(req,res,next){
    // 获取表单修改后的内容，插入数据库更新
    // console.log(req.body)
    let {username,password,tel,email,role_id} = req.body
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql = `update users set password=${password},tel='${tel}',email='${email}',role_id='${role_id}' where username=${username} `
    await exec(sql)
    res.json({
      state:'ok',
      content:'个人信息更新成功'
    })
  }
  // 10.前端渲染数据接口
  async apiUserList2(req,res,next){
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)
    const start = (page-1)*limit
    const sql = `select users.user_id,users.username,users.tel,users.email,users.avatar,roles.rolename 
    from users LEFT JOIN roles 
    on users.role_id = roles.role_id
    limit ${start},${limit}; `
    const result =  await exec(sql)
    // 计算总数
    const sql1 = `select count(*) as usernum from users;`
    const num = await exec(sql1)
    const count = num[0].usernum
    
    const options = {
      "code":0,
      "msg":"数据请求成功",
      "count":count,
      "data":Array.from(result)
    }
    res.json(options)


  }
  // 11.编辑用户信息
  async editUserList2(req,res,next){
    // 获取用户名，查找数据库
    const {user_id} = req.query
    const sql = `select * from users where user_id='${user_id}';`
    const result = await exec(sql)
    console.log(result)
    // 获取所有角色
    const roles = await getRole()
    const options = {
      users:result[0],
      roles
    }
    res.render('admin/users/userinfo.ejs',options)
  }
  // 12.权限管理
  async getAuthList(req,res,next){
    res.render('admin/users/authlist.ejs')
  }
   // 13.权限管理
  async fetchAuthList(req,res,next){
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)
    const start = (page-1)*limit
    const sql = `select * from auth limit ${start},${limit} `
    const result =  await exec(sql)
    // console.log('result is',result)
    // 计算总数
    const sql1 = `select count(*) as usernum from auth;`
    const num = await exec(sql1)
    const count = num[0].usernum

    const options = {
      "code":0,
      "msg":"数据请求成功",
      "count":count,
      "data":result
    }
    // console.log('options is',options)
    res.json(options)
  }
  // 14.角色管理
  async getRolelist(req,res,next){
    res.render('admin/users/rolelist.ejs')
  }
  // 15.角色管理
  async fetchRolelist(req,res,next){
    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)
    const start = (page-1)*limit
    const sql = `select * from roles limit ${start},${limit} `
    const result =  await exec(sql)
    // 计算总数
    const sql1 = `select count(*) as usernum from roles;`
    const num = await exec(sql1)
    const count = num[0].usernum

    const options = {
      "code":0,
      "msg":"数据请求成功",
      "count":count,
      "data":result
    }
    res.json(options)
  }
  // 16.添加角色
  async addRole(req,res,next){
    res.render('admin/users/addrole.ejs')
  }
  // 16.添加角色
  async fetchRole(req,res,next){
    
  }



}

// 


// 导出
module.exports = new Users()