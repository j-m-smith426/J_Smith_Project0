import { Router } from 'express';
import { getSystems } from './Systems';

import { addOneGame, deleteOne, getAGame, updateOne } from './Videogames';

// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

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
VGSysRouter.post('/:NAME/add');
VGSysRouter.get('/:NAME/all', getSystems);
VGSysRouter.put('/:NAME/update');
VGSysRouter.delete('/:NAME/delete');


// Export the base-router
const baseRouter = Router();

baseRouter.use('/VideoGames', VGRouter);
baseRouter.use('/Game', VGSysRouter);
export default baseRouter;
