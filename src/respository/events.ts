import { IEvent } from "../domain/entities/Event";

export interface EventRepository {
    create: (data: IEvent) => Promise<IEvent>;
    getEventByQuery: (dayOfWeek?: string, desc?: string) => Promise<IEvent[]>;
    deleteEventByDayOfWeek: (day: string) => Promise<IEvent[]>;
    getEventById: (id: string) => Promise<IEvent>;
    deleteEventById: (id: string) => Promise<string | void>
}