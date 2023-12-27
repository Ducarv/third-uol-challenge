import { Request, Response, Router } from "express";
import { signInUserController, signUpUserController } from "../controllers/user";

const router = Router();

router.post("/users/sign-up", async (request: Request, response: Response) => {
    await signUpUserController.handle(request, response);
})

router.post("/users/sign-in", async (request: Request, response: Response) => {
    await signInUserController.handle(request, response);
})

export { router }