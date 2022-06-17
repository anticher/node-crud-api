import * as http from 'http'
import { handleGet } from './handleGet'
import { handlePost } from './handlePost'

const host = 'localhost'
const port = 8000

const requestListener:
    http.RequestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (req.url?.startsWith('/api/')) {
            switch (true) {
                case req.method === 'GET':
                    handleGet(req, res)
                    break
                case req.method === 'POST':
                    handlePost(req, res)
                    break
                default:
                    res.writeHead(404)
                    res.end(JSON.stringify({ error: 'wrong path' }))
                    break
            }
        } else {
            res.writeHead(404)
            res.end(JSON.stringify({ error: 'wrong path' }))
        }
    }

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
