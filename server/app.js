const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin/admin');
const usersRouter = require('./routes/users');
// 注册登陆 认证模块authentication
const authRouter = require('./routes/auth/auth');
// 登陆校验
const { checkLogin } = require('./utils/tool')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 配置session
app.use(session({
  secret: "xzsagjasoigjasoi",
  resave:true,//强制保存session
  cookie:{
    maxAge:7*24*60*60*1000,//设置session的有效期为1周
  },
  saveUninitialized:true//是否保存初始化的session
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 进入后台必须先登陆，
app.use('/admin',checkLogin,adminRouter);
// 登陆注册认证 authentication
app.use('/auth',authRouter);
app.use('/users', usersRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
