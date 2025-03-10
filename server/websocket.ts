import { Server, WebSocket } from 'ws'
import { Server as HttpServer } from 'http'

interface Client {
  ws: WebSocket
  isAlive: boolean
  lastPing: number
}

export default function (httpServer: HttpServer) {
  const wss = new Server({ server: httpServer })
  const clients = new Map<string, Client>()

  // 心跳检测间隔(30秒)
  const HEARTBEAT_INTERVAL = 30000
  // 超时时间(90秒)
  const CLIENT_TIMEOUT = 90000

  wss.on('connection', (ws: WebSocket) => {
    const clientId = Date.now().toString()
    clients.set(clientId, {
      ws,
      isAlive: true,
      lastPing: Date.now()
    })

    // 发送欢迎消息
    ws.send(JSON.stringify({
      type: 'system',
      message: {
        id: Date.now().toString(),
        content: '连接成功',
        type: 'text',
        sender: 'system',
        timestamp: Date.now()
      }
    }))

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString())
        
        // 更新客户端状态
        const client = clients.get(clientId)
        if (client) {
          client.isAlive = true
          client.lastPing = Date.now()
        }

        // 处理心跳消息
        if (data.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }))
          return
        }

        // 广播消息给所有客户端
        clients.forEach((client) => {
          if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(JSON.stringify(data))
          }
        })
      } catch (error) {
        console.error('Failed to parse message:', error)
        ws.send(JSON.stringify({
          type: 'error',
          message: '消息格式错误'
        }))
      }
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      clients.delete(clientId)
    })

    ws.on('close', () => {
      clients.delete(clientId)
    })
  })

  // 定期检查客户端连接状态
  setInterval(() => {
    const now = Date.now()
    clients.forEach((client, id) => {
      // 检查最后一次心跳时间
      if (now - client.lastPing > CLIENT_TIMEOUT) {
        console.log(`Client ${id} timed out`)
        client.ws.close()
        clients.delete(id)
        return
      }

      // 发送心跳检测
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify({ type: 'ping' }))
      }
    })
  }, HEARTBEAT_INTERVAL)

  return wss
} 