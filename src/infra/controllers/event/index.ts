import { CreateEventUseCase } from "../../../domain/useCases/event/create";
import { DeleteEventsByDayOfWeekUseCase } from "../../../domain/useCases/event/deleteByDayOfWeek";
import { GetEventByQueryUseCase } from "../../../domain/useCases/event/getByQuery";
import { EventPrismaRepository } from "../../../respository/implementation/event";
import { CreateEventController } from "./create";
import { DeleteEventsByDayOfWeekController } from "./deleteByDayOfWeek";
import { GetEventByQueryController } from "./getByQuery";

const prismaRepository = new EventPrismaRepository();
const createEventUseCase = new CreateEventUseCase(prismaRepository);
const createEventController = new CreateEventController(createEventUseCase);

const getEventByQueryUseCase = new GetEventByQueryUseCase(prismaRepository);
const getEventByQueryController = new GetEventByQueryController(
  getEventByQueryUseCase
);

const deleteEventsByDayOfWeekUseCase = new DeleteEventsByDayOfWeekUseCase(
  prismaRepository
);
const deleteEventsByDayOfWeekController = new DeleteEventsByDayOfWeekController(
  deleteEventsByDayOfWeekUseCase
);

export {
  createEventController,
  getEventByQueryController,
  deleteEventsByDayOfWeekController,
};
