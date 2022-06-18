import * as http from 'http'
import { ResultWithStatus } from '../models/resultWithStatus.model'
import { putUser } from './putUser'

export const handlePut = (request: http.IncomingMessage, response: http.ServerResponse) => {
    switch (true) {
        case request.url?.startsWith('/api/users/'): {
            let body = ''
            request.on('data', (chunk) => {
                body += chunk
            })
            request.on('end', () => {
                let resultWithStatus: ResultWithStatus
                resultWithStatus = putUser(body, request.url)
                response.writeHead(resultWithStatus.status)
                response.end(resultWithStatus.result)
            })
            break
        }
        default:
            response.writeHead(404)
            response.end(JSON.stringify({ error: 'user doesn not exist' }))
            break
    }
}
