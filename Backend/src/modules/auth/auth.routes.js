import { Router } from "express"
import { signupController } from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signupController)


export default authRouter;