import { Router } from 'express';
import { addSystems, deleteSystems, getSystems, updateSystems } from './Systems';

import { addOneGame, deleteOne, getAGame, updateOne } from './Videogames';

/**VideoGame Route
 * /add Add One Game
 * /getOne Get one Game
 * /update Update a game
 * /delete Delete a game
 */
const VGRouter = Router();
VGRouter.post('/add', addOneGame);
VGRouter.get('/getOne', getAGame);
VGRouter.put('/update', updateOne);
VGRouter.delete('/delete', deleteOne);
/** Systems Router
 * /all Get all systems of :NAME game
 * /add Add a system to :NAME game
 * /update Update all systems of :NAME game
 * /delete Delete specified system of :NAME game
 */
const VGSysRouter = Router();
VGSysRouter.post('/:NAME/add', addSystems);
VGSysRouter.get('/:NAME/all', getSystems);
VGSysRouter.put('/:NAME/update', updateSystems);
VGSysRouter.delete('/:NAME/delete', deleteSystems);


// Export the base-router
const baseRouter = Router();

baseRouter.use('/VideoGames', VGRouter);
baseRouter.use('/Game', VGSysRouter);
export default baseRouter;
