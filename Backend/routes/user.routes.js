import express from 'express';
import { deleteUser, getAllUsers, getUser, getUserById, login, logout, register, updateUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', register);
userRouter.post('/login', login);

// Protected routes
userRouter.use(verifyJWT); // Apply JWT middleware to all routes below
userRouter.post('/logout', logout);
userRouter.get('/getuser', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

// Admin only routes
userRouter.get('/', isAdmin, getAllUsers);
userRouter.get('/:id', isAdmin, getUserById);

export default userRouter;