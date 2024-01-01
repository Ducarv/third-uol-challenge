import { Request, Response } from 'express';
import { DeleteEventsByDayOfWeekUseCase } from '../../../domain/useCases/event/deleteByDayOfWeek';
import {
  AuthorizationError,
  DeleteEventsError,
  InternalServerError,
} from '../../../providers/errors';
import { WeekDays } from '../../../providers/types/WeekDays';

export class DeleteEventsByDayOfWeekController {
  constructor(
    private deleteEventsByDayOfWeekUseCase: DeleteEventsByDayOfWeekUseCase,
  ) {}

  async handle(request: Request, response: Response) {
    const { dayOfWeek } = request.query;
    const userId = request.body.user?.id;

    try {
      if (!WeekDays.includes(dayOfWeek as any)) {
        return response
          .status(400)
          .json({ message: 'Invalid data supplied', WeekDays });
      }

      const deletedEvents = await this.deleteEventsByDayOfWeekUseCase.execute(
        dayOfWeek as string,
        userId as string,
      );

      response.status(200).json({
        deletedEvents: deletedEvents,
      });
    } catch (error: unknown) {
      if (error instanceof DeleteEventsError) {
        response.status(404).json({ message: 'Events not found' });
      }

      if (error instanceof InternalServerError) {
        response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}
