const express = require('express');
const router = express.Router();
// 文件上传
const multer = require('multer')
// 还可以限制上传文件的大小 ,在配置选项中添加limits选项
const upload = multer({dest:'./public/upload'})
// controller
const {userDetail,updateUserDetail,
  uploadAvatar,fetchUserList1,
  delOneUserList1,delALLUserList1,
  fetchUserList2,addUser,addUserview,
  apiUserList2,editUserList2} = require('../../controllers/admin/users')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('用户管理')
});
// 用户详情页
router.get('/selfinfo',userDetail);
// 修改用户信息
router.post('/selfinfo',updateUserDetail);
// 增加用户
router.get('/userlist1/adduser',addUserview);
router.post('/userlist1/adduser',addUser);
// 用户头像上传
router.post('/avatarupload',upload.single('avatar'),uploadAvatar);

// 用户管理下的子项目
// 展示用户列表
// 后端渲染
router.get('/userList1',fetchUserList1)
// 删除一个用户
router.post('/userlist1/delOne',delOneUserList1)
// 删除所有用户
router.post('/userlist1/delALL',delALLUserList1)


// 前端渲染
router.get('/userList2',fetchUserList2)
// 数据接口
router.get('/userlist2/api/userlist',apiUserList2)
// 编辑用户信息
router.get('/userlist2/edituser',editUserList2)




module.exports = router;
