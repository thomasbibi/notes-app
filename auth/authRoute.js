import express from 'express';
import { reqValidator } from "../middlewares/request/reqValidator.js";
import { logInController, signUpController } from "./authController.js";
import { loginValidation, userValidation } from './authValidator.js';


const router = express.Router();

router.post('/user/sign-up', reqValidator(userValidation), signUpController);
router.post('/user/login', reqValidator(loginValidation), logInController);

export default router;
