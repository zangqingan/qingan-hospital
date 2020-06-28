const express = require('express');
const router = express.Router();

// 引入控制器
const {login,register,signOut} = require('../../controllers/auth')


/* 登陆注册模块页面获取 */
router.get('/login', function(req, res, next) {
  res.render('auth/login.ejs')
});
router.get('/register', function(req, res, next) {
  res.render('auth/register.ejs')
});

/* 登陆注册模块业务处理 */
router.post('/login',login);
router.post('/register',register);
// 退出登陆
router.get('/exit',signOut);






module.exports = router;
