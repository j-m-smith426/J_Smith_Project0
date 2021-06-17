import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import SystemDao from '@daos/Videogame/SystemsDao';
import { paramMissingError } from '@shared/constants';

const SDao = new SystemDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function getSystems(req: Request, res: Response){
    const {NAME} = req.params;
    if(!NAME){
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    let systems = await SDao.getAll(NAME);
    return res.status(OK).send(systems).end()
}