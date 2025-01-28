import express from 'express';
import { reqValidator } from "../middlewares/request/reqValidator.js";
import { logInController, signUpController } from "./authController.js";
import { loginValidation, userValidation } from './authValidator.js';
import * as authServices from './authServices.js';


const router = express.Router();

router.post('/user/sign-up', reqValidator(userValidation), signUpController(authServices));
router.post('/user/login', reqValidator(loginValidation), logInController(authServices));

export default router;
