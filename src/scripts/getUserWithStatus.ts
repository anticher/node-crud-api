import { ResultWithStatus } from '../models/resultWithStatus.model'
import { users } from './testUsers'

export const getUserWithStatus = (requestUrl?: string): ResultWithStatus => {
    const reqId = requestUrl?.substring(11)
    if (!requestUrl || !reqId) {
        return {status: 400, result: 'userId is invalid'}
    }
    const result = users.find((user) => user.id === reqId)
    if (result) {
        return {status: 200, result}
    }
    return {status: 404, result: 'user does not exist'}
}
