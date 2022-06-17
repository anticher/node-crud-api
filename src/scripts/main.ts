import * as http from 'http'

const host = 'localhost'
const port = 8000

type User = {
    id: string,
    username: string,
    age: number,
    hobbies: string[]
}

const users: User[] = [
    {
        id: '1', username: 'Bob', age: 30, hobbies: ['swimming', 'coins'],
    },
    {
        id: '3', username: 'John', age: 32, hobbies: ['fishing'],
    },
]

const requestListener: http.RequestListener = (req, res) => {
    if (req.url?.startsWith('/api/')) {
        if (req.method !== 'GET') {
            res.writeHead(404)
            res.end(JSON.stringify({ error: 'only GET methods allowed' }))
        }
        res.writeHead(200)
        res.end(JSON.stringify(users))
        // res.end(req.url)
    } else {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'wrong path' }))
    }
}

const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
