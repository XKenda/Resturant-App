import { Router } from "express"
import { loginController, logoutCountroller, signupController } from "./auth.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController)
authRouter.delete('/logout', auth, logoutCountroller)


export default authRouter;