import { DeleteEventsError, NotFound } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";

export class DeleteEventById {
    constructor(private repository: EventRepository) {}

    async execute(id: string) {
        try {
            if(!id) {
                throw new NotFound("Id not found or not provided");
            }

            return await this.repository.deleteEventById(id);
        } catch(error: unknown) {
            if(error instanceof DeleteEventsError) {
                throw new DeleteEventsError("Error to delete event by id")
            }
        }
    }
}