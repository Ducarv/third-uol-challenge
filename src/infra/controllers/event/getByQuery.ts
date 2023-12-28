import { Request, Response } from "express";
import { GetEventByQueryUseCase } from "../../../domain/useCases/event/getByQuery";
import { GetEventsError } from "../../../providers/errors";

export class GetEventByQueryController {
  constructor(private getEventByQueryUseCase: GetEventByQueryUseCase) {}

  async handle(request: Request, response: Response) {
    const { dayOfWeek, desc } = request.query;

    try {
      const events = await this.getEventByQueryUseCase.execute(
        dayOfWeek as string,
        desc as string
      );

      response.status(200).json(events);
    } catch (error: unknown) {
        if(error instanceof GetEventsError) {
            response.status(404).json({ message: "Not found" });
        }
    }
  }
}
