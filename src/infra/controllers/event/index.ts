import { CreateEventUseCase } from "../../../domain/useCases/event/create";
import { DeleteEventsByDayOfWeekUseCase } from "../../../domain/useCases/event/deleteByDayOfWeek";
import { DeleteEventByIdUseCase } from "../../../domain/useCases/event/deleteById";
import { GetEventByIdUseCase } from "../../../domain/useCases/event/getById";
import { GetEventByQueryUseCase } from "../../../domain/useCases/event/getByQuery";
import { EventPrismaRepository } from "../../../respository/implementation/event";
import { CreateEventController } from "./create";
import { DeleteEventsByDayOfWeekController } from "./deleteByDayOfWeek";
import { DeleteEventByIdController } from "./deleteById";
import { GetEventByIdController } from "./getById";
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

const getEventByIdUseCase = new GetEventByIdUseCase(prismaRepository);
const getEventByIdController = new GetEventByIdController(getEventByIdUseCase);

const deleteEventByIdUseCase = new DeleteEventByIdUseCase(prismaRepository);
const deleteEventByIdController = new DeleteEventByIdController(
  deleteEventByIdUseCase
);

export {
  createEventController,
  getEventByQueryController,
  deleteEventsByDayOfWeekController,
  getEventByIdController,
  deleteEventByIdController,
};
