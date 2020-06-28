const express = require('express');
const router = express.Router();

// controller
const {getRolelist,fetchRolelist,addRole,fetchRole} = require('../../controllers/admin/users')

/* GET home page. */
router.get('/rolelist',getRolelist);
// 获取数据接口
router.get('/rolelist/api/rolelist',fetchRolelist);
// 添加角色
router.get('/rolelist/addrole',addRole);
router.post('/rolelist/addrole',fetchRole);





module.exports = router;
