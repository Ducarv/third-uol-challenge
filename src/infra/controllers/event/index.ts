import { CreateEventUseCase } from "../../../domain/useCases/event/create";
import { EventPrismaRepository } from "../../../respository/implementation/event";
import { CreateEventController } from "./create";

const prismaRepository = new EventPrismaRepository();
const createEventUseCase = new CreateEventUseCase(prismaRepository);
const createEventController = new CreateEventController(createEventUseCase);

export { createEventController };