import { Router } from "express"
import { loginController, logoutCountroller, signupController, verifEmailController } from "./auth.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController)
authRouter.delete('/logout', auth, logoutCountroller)
authRouter.post('/verify-email',auth, verifEmailController )


export default authRouter;