import { Router } from "express"

const authRouter = Router();

authRouter.post("sign-up", signupController )


export default authRouter;