import { IEvent } from "../../domain/entities/Event";
import { prisma } from "../../infra/database";
import { EventRepository } from "../event";

export class EventPrismaRepository implements EventRepository {
    constructor() {};

    async create(data: IEvent) {
        const newEvent = await prisma.event.create({
            data: data
        })

        return newEvent as IEvent;
    }

    async getEventByQuery(dayOfWeek?: string, desc?: string) {
        const events = await prisma.event.findMany({
            where: {
               OR: [
                { dayOfWeek },
                { description: { contains: desc } }
               ]
            }
        })

        return events as IEvent[]
    }

    async deleteEventsByDayOfWeek(dayOfWeek: string) {
        const deletedEvents = await prisma.event.deleteMany({
            where: {
                dayOfWeek
            }
        })

        return `${dayOfWeek} events deleted`
    }

    async getEventById(id: string) {
        const target = await prisma.event.findUnique({
            where: {
                id
            }
        })

        return target as IEvent;
    }

    async deleteEventById(id: string) {
        const deletedEvent = await prisma.event.delete({
            where: {
                id
            }
        })

        return `Event with id: ${id} deleted.`
    }
}