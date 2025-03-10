module.exports = {
  apps: [{
    name: 'mall-server',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DB_HOST: 'localhost',
      DB_USER: 'mall',
      DB_PASSWORD: 'mall',
      DB_NAME: 'mall',
      DB_PORT: 3306
    },
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
} 