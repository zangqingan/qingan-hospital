const express = require('express');
const router = express.Router();
const {getNews,fetchNews,addNews,fetchnewspage} = require('../../controllers/admin/news')

/* GET home page. */
router.get('/',getNews);
// 添加新闻
router.get('/newslist/addnews',fetchNews);
router.post('/newslist/addnews1',addNews);
// 获取新闻详情
router.get('/newslist/newspage',fetchnewspage);
module.exports = router;
