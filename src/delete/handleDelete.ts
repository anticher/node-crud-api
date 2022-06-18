import * as http from 'http'
import { deleteUserWithStatus } from './deleteUserWithStatus'

export const handleDelete = (request: http.IncomingMessage, response: http.ServerResponse) => {
    switch (true) {
        case request.url?.startsWith('/api/users/'): {
            const deleteWithStatus = deleteUserWithStatus(request.url)
            response.writeHead(deleteWithStatus.status)
            response.end(deleteWithStatus.result)
            break
        }
        default:
            response.writeHead(404)
            response.end(JSON.stringify({ error: 'user doesn not exist' }))
            break
    }
}
