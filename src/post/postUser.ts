import { User } from '../models/user.model'
import { users } from '../server/usersData'
import { v4 as uuidv4 } from 'uuid'
import { ResultWithStatus } from '../models/resultWithStatus.model'

export const postUser = (payload: string): ResultWithStatus => {
    try {
        const userData = JSON.parse(payload)
        if (
            !userData.hasOwnProperty('username') ||
            !userData.hasOwnProperty('age') ||
            !userData.hasOwnProperty('hobbies')
        ) {
            return { status: 400, result: 'body does not contain required fields' }
        }
        const newUser: User = { id: uuidv4(), username: userData.username, age: userData.age, hobbies: userData.hobbies }
        users.push(newUser)
        return { status: 200, result: newUser }
    }
    catch {
        return { status: 500, result: 'server error'}
    }
}
