const mysql = require('mysql')

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  port:3306,
  database:'qinganhospital'
})
con.connect(err => {
  if(err){
      console.error(err)
  }else{
      console.log('数据库连接成功!')
  }
})

function exec(sql){
  return new Promise((resolve,reject) => {
    con.query(sql,(err,data) => {
      if(err){
        reject(err)
        return
      }
      resolve(data)
    })
  })
}
module.exports = {
  exec,
  escape:mysql.escape
}

