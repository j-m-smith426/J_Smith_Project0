import { Router } from 'express';
import { getSystems } from './Systems';

import { addOneGame, deleteOne, getAGame, updateOne } from './Videogames';

// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

//VideoGame Route
const VGRouter = Router();
VGRouter.post('/add', addOneGame);
VGRouter.get('/one', getAGame);
VGRouter.put('/update', updateOne);
VGRouter.delete('/delete', deleteOne);

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
