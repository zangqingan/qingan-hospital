const crypto = require('crypto')

const SECRET_KEY = 'WJioL_327708#'
// MD5加密,content就是要加密的内容
function md5(content){
    let md5 = crypto.createHash('md5')
    // digest('hex')返回16进制的格式
    return md5.update(content).digest('hex')
}

// 加密密码函数
function genPassword(password){
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
module.exports = {
    genPassword
}