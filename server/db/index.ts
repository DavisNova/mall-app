import mysql from 'mysql2/promise'
import config from './config'

// 创建数据库连接池
const pool = mysql.createPool(config)

// 测试数据库连接
pool.getConnection()
  .then(connection => {
    console.log('数据库连接成功')
    connection.release()
  })
  .catch(err => {
    console.error('数据库连接失败:', err)
  })

export default pool 