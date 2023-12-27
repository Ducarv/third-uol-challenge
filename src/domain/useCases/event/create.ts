import { CreateEventError } from "../../../providers/errors";
import { EventRepository } from "../../../respository/event";
import { IEvent } from "../../entities/Event";

export class CreateEventUseCase {
    constructor(private repository: EventRepository) {}

    async execute(data: IEvent) {
        try {
            const newEvent = await this.repository.create(data);
            return newEvent;
        } catch(error: unknown) {
            if(error instanceof CreateEventError) {
                throw new CreateEventError("Error to create an event.")
            }
        }
    }
}