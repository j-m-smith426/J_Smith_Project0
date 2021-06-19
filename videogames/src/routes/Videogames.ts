import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import VideogameDao from '@daos/Videogame/VideogameDao';
import { paramMissingError } from '@shared/constants';
import { VGame } from '@entities/Videogame';


const VGameDao = new VideogameDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**add game to database
 * @param req
 * @param res
 * 
 * return status
 * 
 */
export async function addOneGame(req: Request, res: Response) {
    const { game } = req.body;
    console.log(req.body.game);
    //Check if data was retrieved properly
    if (!game) {
        
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    //Add Game
    game.ID = await VGameDao.setID();
    await VGameDao.add(game);
    return res.status(CREATED).end();
}
/** Retrieve info on one game
 * 
 * @param req
 * @param res
 *
 * return VGame as jason or Null
 */
export async function getAGame(req: Request, res: Response) {
    const {gameNAME} = req.body.game;
    //Check if NAME is present
    if(!(gameNAME)){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    // Retrieve game information
   let game:VGame|null = await VGameDao.getOne(gameNAME);
    return res.status(OK).json(game).end();

}
/** update a games data
 * 
 * @param req
 * @param res
 * 
 * return status
 * 
 */
export async function updateOne(req: Request, res: Response) {
    const {game} = req.body;
    //Check if game has infomation
    if(!game){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await VGameDao.update(game);
    return res.status(StatusCodes.ACCEPTED).end();
}
/** delete a game
 * 
 * @param req
 * @param res
 * 
 * return status
 * 
 */
export async function deleteOne(req: Request, res: Response){
    const {gameNAME} = req.body.game;
    if(!(gameNAME)){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await VGameDao.delete(gameNAME);
    res.status(StatusCodes.ACCEPTED).end();
}