


// 引入数据库操作模块
const {exec} = require('../../db/mysql')


class News{
  // 获取新闻列表
  async getNews(req, res, next) {
    res.render('admin/news/newslist.ejs')
  }
  // 添加新闻
  async fetchNews(req,res,next){
   
    res.render('admin/news/addnews.ejs')

  }
  // 添加新闻
  async addNews(req,res,next){
   console.log('req.body is',req.body)
   const {title,author,content} = req.body
   const pubtime = new Date().getTime()
   const sql = `insert into article (title,author,content,pubtime) values ('${title}','${author}','${content}','${pubtime}')`
   await exec(sql)
   res.send('新建新闻成功')
  
  }
  // 获取新闻详情
  async fetchnewspage(req,res,next){
    const sql = `select * from article limit 0,1`
    const result =  await exec(sql)
    const options ={
      article:result[0]
    }
    res.render('admin/news/newspage.ejs',options)
  }
}


// 导出
module.exports = new News()