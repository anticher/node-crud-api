import { users } from '../server/usersData'
import { validate as uuidValidate } from 'uuid'
import { ResultWithStatus } from '../models/resultWithStatus.model'

export const putUser = (payload: string, reqUrl?: string): ResultWithStatus => {
    try {
        const reqId = reqUrl?.substring(11)
        const user = users.find((user) => user.id === reqId)
        if (!reqId || !uuidValidate(reqId)) {
            return { status: 400, result: 'userId is invalid' }
        }
        const reqUserData = JSON.parse(payload)
        if (user) {
            user.username = reqUserData.username || user.username
            user.age = reqUserData.age || user.age
            user.hobbies = reqUserData.hobbies || user.hobbies
            return { status: 200, result: user }
        }
        return { status: 404, result: 'record with id === ' + reqId + ' doesn not exist' }
    }
    catch {
        return { status: 500, result: 'server error' }
    }
}
