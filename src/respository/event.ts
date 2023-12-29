import { IEvent } from '../domain/entities/Event';

export interface EventRepository {
  create: (data: IEvent) => Promise<IEvent>;
  getEventByQuery: (dayOfWeek?: string, desc?: string) => Promise<IEvent[]>;
  deleteEventsByDayOfWeek: (day: string, userId?: string) => Promise<IEvent[]>;
  getEventById: (id: string) => Promise<IEvent>;
  deleteEventById: (id: string, userId?: string) => Promise<string | void>;
}
