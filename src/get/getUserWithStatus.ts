import { ResultWithStatus } from '../models/resultWithStatus.model'
import { users } from '../server/usersData'
import { validate as uuidValidate } from 'uuid'

export const getUserWithStatus = (requestUrl?: string): ResultWithStatus => {
    try {
        const reqId = requestUrl?.substring(11)
        if (!reqId || !uuidValidate(reqId)) {
            return { status: 400, result: 'userId is invalid' }
        }
        const result = users.find((user) => user.id === reqId)
        if (result) {
            return { status: 200, result }
        }
        return { status: 404, result: 'user does not exist' }
    }
    catch {
        return { status: 500, result: 'server error' }
    }
}
