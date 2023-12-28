import { Request, Response, Router } from "express";
import { signInUserController, signUpUserController } from "../controllers/user";
import { authToken } from "../../providers/middlewares/auth";
import { createEventController, deleteEventsByDayOfWeekController, getEventByIdController, getEventByQueryController } from "../controllers/event";

const router = Router();

router.post("/users/sign-up", async (request: Request, response: Response) => {
    await signUpUserController.handle(request, response);
})

router.post("/users/sign-in", async (request: Request, response: Response) => {
    await signInUserController.handle(request, response);
})

router.post("/events", authToken, async (request: Request, response: Response) => {
    await createEventController.handle(request, response);
})

router.get("/events", authToken, async (request: Request, response: Response) => {
    await getEventByQueryController.handle(request, response);
})

router.delete("/events", authToken, async (request: Request, response: Response) => {
    await deleteEventsByDayOfWeekController.handle(request, response);
})

router.get("/events/:id", authToken, async (request: Request, response: Response) => {
    await getEventByIdController.handle(request, response);
})

export { router }