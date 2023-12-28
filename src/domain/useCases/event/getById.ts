import { GetEventsError, NotFound } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";

export class GetEventByIdUseCase {
    constructor(private repository: EventRepository) {}

    async execute(id: string) {
        try {
            if(!id) {
                throw new NotFound("Id not found or not provided")
            }

            const event = await this.repository.getEventById(id);
            return event;
        } catch(error: unknown) {
            if(error instanceof GetEventsError) {
                throw new GetEventsError("Error to get events");
            }
        }
    }
}