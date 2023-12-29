import { CreateEventError } from '../../../../providers/errors';
import { EventRepository } from '../../../../respository/event';
import { IEvent } from '../../../entities/Event';
import { CreateEventUseCase } from '../create';

describe('Create.ts', () => {
  const mockEvent: IEvent = {
    description: 'meeting',
    dayOfWeek: 'friday',
    userId: '1',
  };

  const mockRepository: Pick<EventRepository, 'create'> = {
    create: async (data: IEvent) => ({ id: '01', ...data }),
  };

  const create = new CreateEventUseCase(mockRepository as EventRepository);

  it('should create a event correctly', async () => {
    const sut = await create.execute(mockEvent);
    if (sut) {
      expect(sut.id).toBeDefined();
      expect(sut.dayOfWeek).toEqual('friday');
      expect(sut.description).toEqual('meeting');
      expect(sut.userId).toEqual('1');
    }
  });

  it('should handle errors correctly', async () => {
    const error = new CreateEventError('Error to create an event.');
    jest.spyOn(create, 'execute').mockRejectedValueOnce(error);

    try {
      //@ts-ignore
      await create.execute();
      fail('Throw error');
    } catch (caughtError: unknown) {
      if (caughtError instanceof CreateEventError) {
        expect(caughtError.message).toEqual(error.message);
      }
    }
  });
});
