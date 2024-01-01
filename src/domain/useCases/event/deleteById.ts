import {
  AuthorizationError,
  DeleteEventsError,
  NotFound,
} from '../../../providers/errors';
import { EventRepository } from '../../../respository/event';

export class DeleteEventByIdUseCase {
  constructor(private repository: EventRepository) {}

  async execute(id: string, userId?: string) {
    try {
      if (!id) {
        throw new NotFound('Id not found or not provided');
      }

      return await this.repository.deleteEventById(id, userId);
    } catch (error: unknown) {
      if (error instanceof DeleteEventsError) {
        throw new DeleteEventsError('Error to delete event by id');
      }
      if (error instanceof AuthorizationError) {
        throw new AuthorizationError('User is not authorized to delete events');
      }
      if (error instanceof NotFound) {
        throw new NotFound('Id not found or not provided');
      }
    }
  }
}
