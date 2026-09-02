import { Router } from "express"
import { loginController, signupController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController)


export default authRouter;