import { Router } from 'express';

import { addOneGame } from './Videogames';

// User-route
// const userRouter = Router();
// userRouter.get('/all', getAllUsers);
// userRouter.post('/add', addOneUser);
// userRouter.put('/update', updateOneUser);
// userRouter.delete('/delete/:id', deleteOneUser);

//VideoGame Route
const VGRouter = Router();
VGRouter.post('/single', addOneGame)


// Export the base-router
const baseRouter = Router();

baseRouter.use('/VideoGames', VGRouter);
export default baseRouter;
