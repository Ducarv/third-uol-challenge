import { Request, Response } from "express";
import { DeleteEventsByDayOfWeekUseCase } from "../../../domain/useCases/event/deleteByDayOfWeek";
import { DeleteEventsError, InternalServerError } from "../../../providers/errors";

export class DeleteEventsByDayOfWeekController {
  constructor(
    private deleteEventsByDayOfWeekUseCase: DeleteEventsByDayOfWeekUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { dayOfWeek } = request.query;
    try {
      const deletedEvents = await this.deleteEventsByDayOfWeekUseCase.execute(
        dayOfWeek as string
      );

      response.status(200).json({
        deletedEvents: deletedEvents
      })
    } catch (error: unknown) {
        if(error instanceof DeleteEventsError) {
            response.status(404).json({ message: "Not found"});
        }

        if(error instanceof InternalServerError) {
            response.status(500).json({ message: "Something went wrong" });
        }
    }
  }
}
