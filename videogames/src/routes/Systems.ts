import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import SystemDao from '@daos/Videogame/SystemsDao';
import { paramMissingError } from '@shared/constants';

const SDao = new SystemDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/** Get All Systems
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function getSystems(req: Request, res: Response){
    const {NAME} = req.params;
    if(!NAME){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    let systems = await SDao.getAllSys(NAME);
    if(systems){
        return res.status(OK).send(systems).end();
    }else {
        return res.status(BAD_REQUEST).json({
            error: "Game Not Found"
        });
    }
}

/** Add new systems to game
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function addSystems(req:Request, res: Response){
    const {NAME} = req.params;
    const addedSys = req.body.GSystems;
    if(!NAME || !addedSys){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await SDao.addSys(addedSys,NAME);
    return res.status(OK).end();    
}

/** Update all systems with new systems
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function updateSystems(req:Request, res: Response){
    const {NAME} = req.params;
    const updatedSys = req.body.GSystems;
    if(!NAME || !updatedSys){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await SDao.updateSys(updatedSys,NAME);
    return res.status(OK).end();    
}

/** Delete a single system
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export async function deleteSystems(req:Request, res: Response){
    const {NAME} = req.params;
    const oldSystems = req.body.GSystems;
    if(!NAME || !oldSystems){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    try{
    await SDao.deleteSys(oldSystems,NAME);
    return res.status(OK).end();    
    }catch(err){
        res.send(err);
    }
}