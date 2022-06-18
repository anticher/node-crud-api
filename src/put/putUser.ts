import { users } from '../server/usersData'
import { validate as uuidValidate } from 'uuid'
import { ResultWithStatus } from '../models/resultWithStatus.model'

export const putUser = (payload: string, reqUrl?: string): ResultWithStatus => {
    const reqId = reqUrl?.substring(11)
    const user = users.find((user) => user.id === reqId)
    if (!reqId || !uuidValidate(reqId)) {
        return {status: 400, result: 'userId is invalid'}
    }
    const reqUserData = JSON.parse(payload)
    if (user) {
        user.username = reqUserData.username
        user.age = reqUserData.age
        user.hobbies = reqUserData.hobbies
        return { status: 200, result: JSON.stringify(user)}
    }
    return { status: 404, result: 'record with id === ' + reqId + 'doesn not exist'}
}
