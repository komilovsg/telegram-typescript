import express from 'express'
import userController from '../controller/UserController';

const userRouter = express.Router()

userRouter.get('/contacts', userController.getAllContacts());
userRouter.post('/create-user', userController.onCreateUser());
userRouter.post('/login', userController.onLogin());

export = userRouter;
