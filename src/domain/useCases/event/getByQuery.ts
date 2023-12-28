import { GetEventsError } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";

export class GetEventByQueryUseCase {
    constructor(private repository: EventRepository) {};

    async execute(dayOfWeek?: string, desc?: string) {
        try {
            const events = await this.repository.getEventByQuery(dayOfWeek, desc);
            return events
        } catch(error: unknown) {
            if(error instanceof GetEventsError) {
                throw new GetEventsError("Error to get events by query")
            }
        }
    }
}