import express from 'express'
import { register ,login} from '../controller/authController.js'
import {createContent,getContent,delContent,shareLink,getShareLink}from "../controller/userController.js"
import { userMiddleware } from '../middleware/userAuth.js';
const authRouter=express.Router();


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/content',userMiddleware,createContent);
authRouter.get('/content',userMiddleware,getContent);
authRouter.delete('/content',userMiddleware,delContent);
authRouter.post('/shareLink',userMiddleware,shareLink)
authRouter.get('/shareLink/:hash',getShareLink)//Should be Public  

export default authRouter;