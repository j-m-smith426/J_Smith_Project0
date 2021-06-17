import {VGame} from '@entities/Videogame'
import {IUser} from '@entities/User'

declare module 'express' {
    export interface Request  {
        body: {
            game: VGame,
            //user: IUser
            Systems: String[]
        };
    }
}
