import { Request, Response, Router } from "express";
import { signUpUserController } from "../controllers/user";

const router = Router();

router.post("/users/sign-up", async (request: Request, response: Response) => {
    await signUpUserController.handle(request, response);
})

export { router }