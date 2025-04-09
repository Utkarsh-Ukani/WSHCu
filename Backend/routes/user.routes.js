import express from 'express';
import { deleteUser, getAllUsers, getUser, getUserById, login, logout, register, updateUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login',login);

// secured routes
userRouter.route('/logout').post(verifyJWT,logout);
userRouter.route('/getuser').get(verifyJWT,getUser);

userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUserById);
userRouter.put('/:id',verifyJWT,updateUser);
userRouter.delete('/:id',verifyJWT,deleteUser);

export default userRouter;