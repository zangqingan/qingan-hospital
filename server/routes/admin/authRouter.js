const express = require('express');
const router = express.Router();

// controller
const {getAuthList,fetchAuthList} = require('../../controllers/admin/users')

/* GET home page. */
router.get('/authlist',getAuthList);
// 获取数据接口
router.get('/authlist/api/authlist',fetchAuthList);






module.exports = router;
