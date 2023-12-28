import { CreateEventUseCase } from "../../../domain/useCases/event/create";
import { GetEventByQueryUseCase } from "../../../domain/useCases/event/getByQuery";
import { EventPrismaRepository } from "../../../respository/implementation/event";
import { CreateEventController } from "./create";
import { GetEventByQueryController } from "./getByQuery";

const prismaRepository = new EventPrismaRepository();
const createEventUseCase = new CreateEventUseCase(prismaRepository);
const createEventController = new CreateEventController(createEventUseCase);

const getEventByQueryUseCase = new GetEventByQueryUseCase(prismaRepository);
const getEventByQueryController = new GetEventByQueryController(getEventByQueryUseCase)

export { createEventController, getEventByQueryController };