import { User } from '../models/user.model'
import { users } from './testUsers'
import { v4 as uuidv4 } from 'uuid'

export const postUser = (payload: string) => {
    const userData = JSON.parse(payload)
    if (
        !userData.hasOwnProperty('username') ||
        !userData.hasOwnProperty('age') ||
        !userData.hasOwnProperty('hobbies')
    ) {
        return { status: 400, result: 'body does not contain required fields' }
    }
    const newUser: User = {id: uuidv4(), username: userData.username, age: userData.age, hobbies: userData.hobbies}
    users.push(newUser)
    return { status: 200, result: JSON.stringify(newUser)}
}
