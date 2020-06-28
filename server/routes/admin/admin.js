const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRouter')
const newsRouter = require('./newsRouter')
const doctorsRouter = require('./doctorsRouter')
const patientsRouter = require('./patientsRouter')
const authRouter= require('./authRouter')
const roleRouter= require('./roleRouter')

// 后台用户管理模块
router.use('/users',usersRouter)

// 后台新闻管理模块
router.use('/news',newsRouter)

// 后台医生管理模块
router.use('/doctors',doctorsRouter)

// 后台患者管理模块
router.use('/patients',patientsRouter)

// 后台权限模块
router.use('/auths',authRouter)

// 后台角色模块
router.use('/roles',roleRouter)


/* 登陆之后进入的页面 */
router.get('/', async (req, res, next) => {
  res.render('admin/index.ejs',{
    username:req.session.username
  })
});









module.exports = router;
