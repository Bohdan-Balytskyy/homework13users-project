
import { NewUser } from './newuser';

export interface User  extends NewUser {
    id: number
    created_at: string
    updated_at: string
}