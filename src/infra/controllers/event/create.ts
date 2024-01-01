import { Request, Response } from 'express';
import { CreateEventUseCase } from '../../../domain/useCases/event/create';
import {
  InternalServerError,
  NotAuthenticated,
} from '../../../providers/errors';
import { IEvent } from '../../../domain/entities/Event';
import { ValidatorEventInput } from '../../../providers/validators/eventInput';
import { WeekDays } from '../../../providers/types/WeekDays';

export class CreateEventController {
  constructor(private createEventUseCase: CreateEventUseCase) {}

  async handle(request: Request, response: Response) {
    const { description, dayOfWeek } = request.body;
    const userId = request.body.user?.id;

    try {
      if (!userId) {
        return response.status(401).json({ message: 'Unauthorized' });
      }

      if (!WeekDays.includes(dayOfWeek)) {
        return response
          .status(400)
          .json({ message: 'Invalid dayOfWeek', WeekDays });
      }

      const eventBody: IEvent = {
        description,
        dayOfWeek,
        userId,
      };

      const validatedEventResult = ValidatorEventInput.safeParse(eventBody);

      if (validatedEventResult.success) {
        const eventData = validatedEventResult.data;
        const newEvent = await this.createEventUseCase.execute(eventData);
        response.status(201).json(newEvent);
      } else {
        return response.status(400).json({
          message: 'Invalid input',
          errors: validatedEventResult.error.issues,
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotAuthenticated) {
        return response.status(401).json({ message: 'Unauthorized' });
      }
      if (error instanceof InternalServerError) {
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}
