import { AuthorizationError, DeleteEventsError } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";
import { IEvent } from "../../entities/Event";

export class DeleteEventsByDayOfWeekUseCase {
    constructor(private repository: EventRepository) {}

    async execute(dayOfWeek: string, userId?: string) {
        try {
            const deletedEvents = await this.repository.deleteEventsByDayOfWeek(dayOfWeek, userId);
            return deletedEvents as IEvent[];
        } catch(error: unknown) {
            if(error instanceof DeleteEventsError) {
                throw new DeleteEventsError("Error to delete events");
            }
            if (error instanceof AuthorizationError) {
                throw new AuthorizationError("User is not authorized to delete events");
            }
        }
    }
}