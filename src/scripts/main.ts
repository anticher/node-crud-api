import * as http from 'http'

const host = 'localhost'
const port = 8000

const requestListener: http.RequestListener = (req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'only GET methods allowed' }))
    }
    res.end('test')
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
