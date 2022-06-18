import * as http from 'http'
import { deleteUserWithStatus } from './deleteUserWithStatus'

export const handleDelete = (request: http.IncomingMessage, response: http.ServerResponse) => {
    try {
        switch (true) {
            case request.url?.startsWith('/api/users/'): {
                const deleteWithStatus = deleteUserWithStatus(request.url)
                response.writeHead(deleteWithStatus.status)
                response.end(JSON.stringify(deleteWithStatus.result))
                break
            }
            default:
                response.writeHead(404)
                response.end('user does not exist')
                break
        }
    }
    catch {
        return { status: 500, result: 'server error' }
    }
}
