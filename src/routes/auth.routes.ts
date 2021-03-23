

import { Router } from "express";
import {AuthController} from "../controllers/AuthController";
import { ValidateFields } from '../middlewares/ValidateFields.middleware';
import { validateJwt } from '../middlewares/ValidateJwt.middleware';
import { LoginSchema, RegisterSchema } from '../validators/ValidationSchemas';

const router = Router();
//Login route
router.post("/", [...LoginSchema, ValidateFields], AuthController.login);

//Change my password
router.post("/register", [...RegisterSchema, ValidateFields], AuthController.register);

router.post("/renew", validateJwt, AuthController.revalidateToken);

export default router;