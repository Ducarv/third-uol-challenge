import { Request, Response } from 'express';
import { GetEventByIdUseCase } from '../../../domain/useCases/event/getById';
import { InternalServerError, NotFound } from '../../../providers/errors';

export class GetEventByIdController {
  constructor(private getEventByIdUseCase: GetEventByIdUseCase) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      if (!id) {
        response.status(404).json(new NotFound('Id not found'));
      }

      const event = await this.getEventByIdUseCase.execute(id);

      if (!event) {
        return response.status(404).json({ message: 'Event not found' });
      }

      response.status(200).json(event);
    } catch (error: unknown) {
      if (error instanceof NotFound) {
        response.status(404).json({ message: 'Event not found' });
      }

      if (error instanceof InternalServerError) {
        response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}
