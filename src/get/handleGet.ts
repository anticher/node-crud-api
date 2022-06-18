import * as http from 'http'
import { getAllUsers } from './getAllUsers'
import { getUserWithStatus } from './getUserWithStatus'

export const handleGet = (request: http.IncomingMessage, response: http.ServerResponse) => {
    switch (true) {
        case request.url === '/api/users':
            response.writeHead(200)
            console.log(getAllUsers())
            console.log(JSON.stringify(getAllUsers()))
            response.end(JSON.stringify(getAllUsers()))
            break
        case request.url?.startsWith('/api/users/'): {
            const userWithStatus = getUserWithStatus(request.url)
            response.writeHead(userWithStatus.status)
            response.end(JSON.stringify(userWithStatus.result))
            break
        }
        default:
            response.writeHead(404)
            response.end(JSON.stringify({ error: 'user does not exist' }))
            break
    }
}
