import { users } from '../server/usersData'
import { validate as uuidValidate } from 'uuid'
import { ResultWithStatus } from '../models/resultWithStatus.model'

export const deleteUserWithStatus = (reqUrl?: string): ResultWithStatus => {
    const reqId = reqUrl?.substring(11)
    if (!reqId || !uuidValidate(reqId)) {
        return {status: 400, result: 'userId is invalid'}
    }
    const userIndex = users.findIndex((user) => user.id === reqId)
    if (userIndex > -1) {
        users.splice(userIndex, userIndex)
        return { status: 204, result: 'deleted'}
    }
    return { status: 404, result: 'record with id === ' + reqId + ' doesn not exist'}
}
