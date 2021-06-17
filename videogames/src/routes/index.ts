import { Router } from 'express';

import { addOneGame, getAGame } from './Videogames';

// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

//VideoGame Route
const VGRouter = Router();
VGRouter.post('/add', addOneGame);
VGRouter.get('/one', getAGame)


// Export the base-router
const baseRouter = Router();

baseRouter.use('/VideoGames', VGRouter);
export default baseRouter;
