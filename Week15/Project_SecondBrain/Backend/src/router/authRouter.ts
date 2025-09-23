import express from 'express'
import { register ,login} from '../controller/authController.js'
import {content,getContent,delContent}from "../controller/userController.js"
import { userMiddleware } from '../middleware/userAuth.js';
const authRouter=express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/content',userMiddleware,content);
authRouter.get('/content',userMiddleware,getContent);
authRouter.delete('/content',userMiddleware,delContent);

export default authRouter;