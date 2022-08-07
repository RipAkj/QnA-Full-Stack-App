import express from 'express';
import { signin, signup } from '../controllers/user-controller.js';

const userroute = express.Router();

userroute.post('/signin', signin);
userroute.post("/signup", signup);

export default userroute;