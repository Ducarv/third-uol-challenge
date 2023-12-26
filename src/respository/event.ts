import { IEvent } from "../domain/entities/Event";

export interface EventRepository {
    create: (data: IEvent) => Promise<IEvent>;
    getEventByQuery: (dayOfWeek?: string, desc?: string) => Promise<IEvent[]>;
    deleteEventsByDayOfWeek: (day: string) => Promise<IEvent[] | string>;
    getEventById: (id: string) => Promise<IEvent>;
    deleteEventById: (id: string) => Promise<string | void>
}