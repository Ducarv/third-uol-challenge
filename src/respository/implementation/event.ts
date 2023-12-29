import { IEvent } from '../../domain/entities/Event';
import { prisma } from '../../infra/database';
import { DeleteEventsError } from '../../providers/errors';
import { EventRepository } from '../event';

export class EventPrismaRepository implements EventRepository {
  constructor() {}

  async create(data: IEvent) {
    const newEvent = await prisma.event.create({
      data: data,
    });

    return newEvent as IEvent;
  }

  async getEventByQuery(dayOfWeek?: string, desc?: string) {
    let events;

    if (!dayOfWeek && !desc) {
      events = await prisma.event.findMany();
    } else {
      events = await prisma.event.findMany({
        where: {
          OR: [{ dayOfWeek }, { description: { contains: desc } }],
        },
      });
    }

    return events as IEvent[];
  }

  async deleteEventsByDayOfWeek(dayOfWeek: string, userId?: string) {
    const eventsToDelete = await prisma.event.findMany({
      where: {
        dayOfWeek,
        userId,
      },
    });

    if (!eventsToDelete) {
      throw new DeleteEventsError('Events not found');
    }

    await prisma.event.deleteMany({
      where: {
        dayOfWeek,
        userId,
      },
    });

    return eventsToDelete as IEvent[];
  }

  async getEventById(id: string) {
    const target = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    return target as IEvent;
  }

  async deleteEventById(id: string, userId?: string) {
    const eventToDelete = await prisma.event.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!eventToDelete) {
      throw new DeleteEventsError('Event not found');
    }

    await prisma.event.delete({
      where: {
        id,
        userId,
      },
    });

    return `Event with id: ${id} deleted.`;
  }
}
