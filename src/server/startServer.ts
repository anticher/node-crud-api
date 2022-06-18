import * as http from 'http'
import { handleDelete } from '../delete/handleDelete'
import { handleGet } from '../get/handleGet'
import { handlePost } from '../post/handlePost'
import { handlePut } from '../put/handlePut'

export const startServer = () => {
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
                    case req.method === 'PUT':
                        handlePut(req, res)
                        break
                    case req.method === 'DELETE':
                        handleDelete(req, res)
                        break
                    default:
                        res.writeHead(404)
                        res.end(JSON.stringify({ error: 'server does not support method ' +  req.method}))
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
}
