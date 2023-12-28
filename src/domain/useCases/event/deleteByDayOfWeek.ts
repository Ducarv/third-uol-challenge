import { DeleteEventsError } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";
import { IEvent } from "../../entities/Event";

export class DeleteEventsByDayOfWeekUseCase {
    constructor(private repository: EventRepository) {}

    async execute(dayOfWeek: string) {
        try {
            const deletedEvents = await this.repository.deleteEventsByDayOfWeek(dayOfWeek);
            return deletedEvents as IEvent[];
        } catch(error: unknown) {
            if(error instanceof DeleteEventsError) {
                throw new DeleteEventsError("Error to delete events");
            }
        }
    }
}