import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import VideogameDao from '@daos/Videogame/VideogameDao';
import { paramMissingError } from '@shared/constants';


const VGameDao = new VideogameDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


export async function addOneGame(req: Request, res: Response) {
    const { game } = req.body;
    console.log(req.body.game);
    if (!game) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    
    await VGameDao.add(game);
    return res.status(CREATED).end();
}