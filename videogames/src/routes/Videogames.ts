import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import VideogameDao from '@daos/Videogame/VideogameDao';
import { paramMissingError } from '@shared/constants';
import { VGame } from '@entities/Videogame';


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

export async function getAGame(req: Request, res: Response) {
    const {NAME} = req.body.game;
    if(!(NAME)){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

   let game:VGame|null = await VGameDao.getOne(NAME);
    return res.status(OK).json(JSON.stringify(game)).end();

}

export async function updateOne(req: Request, res: Response) {
    const {game} = req.body;
    if(!game){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await VGameDao.update(game);
    return res.status(StatusCodes.ACCEPTED).end();
}

export async function deleteOne(req: Request, res: Response){
    const {NAME} = req.body.game;
    if(!(NAME)){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await VGameDao.delete(NAME);
    res.status(StatusCodes.ACCEPTED).end();
}