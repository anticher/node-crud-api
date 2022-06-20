import * as http from 'http'
import { ResultWithStatus } from '../models/resultWithStatus.model'
import { postUser } from './postUser'

export const handlePost = (request: http.IncomingMessage, response: http.ServerResponse) => {
    switch (true) {
        case request.url === '/api/users': {
            let resultWithStatus: ResultWithStatus
            let body = ''
            request.on('data', (chunk) => {
                body += chunk
            })
            request.on('end', () => {
                resultWithStatus = postUser(body)
                response.writeHead(resultWithStatus.status)
                response.end(JSON.stringify(resultWithStatus.result))
            })
            break
        }
        default:
            response.writeHead(404)
            response.end(JSON.stringify('wrong path'))
            break
    }
}
