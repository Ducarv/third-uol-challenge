import { Request, Response } from 'express';
import { GetEventByIdUseCase } from '../../../domain/useCases/event/getById';
import {
  GetEventsError,
  InternalServerError,
  NotFound,
} from '../../../providers/errors';

export class GetEventByIdController {
  constructor(private getEventByIdUseCase: GetEventByIdUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      if (!id) {
        response.status(404).json(new NotFound('Id not found'));
      }

      const event = await this.getEventByIdUseCase.execute(id);
      response.status(200).json(event);
    } catch (error: unknown) {
      if (error instanceof GetEventsError) {
        response.status(404).json({ message: 'Error to get event' });
      }

      if (error instanceof InternalServerError) {
        response.status(500).json({ message: 'Something went wrong' });
      }
    }
  }
}
