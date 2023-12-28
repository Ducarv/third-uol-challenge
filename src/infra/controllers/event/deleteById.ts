import { Request, Response } from "express";
import { DeleteEventByIdUseCase } from "../../../domain/useCases/event/deleteById";
import { DeleteEventsError, InternalServerError, NotFound } from "../../../providers/errors";

export class DeleteEventByIdController {
    constructor(private deleteEventByIdUseCase: DeleteEventByIdUseCase) {}

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if(!id) {
                response.status(404).json(new NotFound("Id not found or not provided"));
            }

            await this.deleteEventByIdUseCase.execute(id);

            response.status(204).json("event deleted");
        } catch(error: unknown) {
            if(error instanceof DeleteEventsError) {
                response.status(404).json({ message: "Not found"});
            }
    
            if(error instanceof InternalServerError) {
                response.status(500).json({ message: "Something went wrong" });
            }
        }
    }
}