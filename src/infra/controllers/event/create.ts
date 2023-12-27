import { Request, Response } from "express";
import { CreateEventUseCase } from "../../../domain/useCases/event/create";
import { InternalServerError, NotAuthenticated } from "../../../providers/errors";

export class CreateEventController {
    constructor(private createEventUseCase: CreateEventUseCase) {}

    async handle(request: Request, response: Response) {
        const { description, dayOfWeek } = request.body;
        const userId = request.body.user?.id;
        
        try {
            if(!userId) {
                response.status(401).json({ message: "Not Authenticated"});
            }

            const newEvent = await this.createEventUseCase.execute({
                description,
                dayOfWeek,
                userId
            })

            response.status(201).json(newEvent);
        } catch(error: unknown) {
            if(error instanceof NotAuthenticated) {
                response.status(401).json({ message: "Not Authenticated" })
            }
            if(error instanceof InternalServerError) {
                response.status(500).json({ message: "Something went wrong"})
            }
        }
    }
}