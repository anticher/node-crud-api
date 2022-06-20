import { User } from "./user.model"

export interface ResultWithStatus  {
    status: number,
    result: User | string
}