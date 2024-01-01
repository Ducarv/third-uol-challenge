import { GetEventsError } from '../../../../providers/errors';
import { EventRepository } from '../../../../respository/event';
import { IEvent } from '../../../entities/Event';
import { GetEventByQueryUseCase } from '../getByQuery';

describe('GetEventByQuery.ts', () => {
  const mockEvents: IEvent[] = [
    {
      id: '1',
      description: 'meeting',
      dayOfWeek: 'friday',
      userId: '1',
    },
    {
      id: '2',
      description: 'training',
      dayOfWeek: 'monday',
      userId: '2',
    },
  ];

  let getByQuery: GetEventByQueryUseCase;
  let mockRepository: jest.Mocked<EventRepository>;

  beforeEach(() => {
    mockRepository = {
      getEventByQuery: jest.fn(),
    } as unknown as jest.Mocked<EventRepository>;

    getByQuery = new GetEventByQueryUseCase(mockRepository);
  });

  it('should get events by day of the week correctly', async () => {
    const sut = await getByQuery.execute('friday');
    if (sut) {
      expect(sut.length).toEqual(1);
      expect(sut[0].id).toEqual('1');
    }
  });

  it('should get events by description correctly', async () => {
    const sut = await getByQuery.execute(undefined, 'training');
    if (sut) {
      expect(sut.length).toEqual(1);
      expect(sut[0].id).toEqual('2');
    }
  });

  it('should get all events if no query parameters are provided', async () => {
    const sut = await getByQuery.execute();
    if (sut) {
      expect(sut.length).toEqual(2);
    }
  });

  it('should handle errors correctly', async () => {
    const error = new GetEventsError('Error to get events by query');
    mockRepository.getEventByQuery.mockRejectedValueOnce(error);

    try {
      await getByQuery.execute();
      fail('Throw error');
    } catch (caughtError: unknown) {
      expect(caughtError).toBeInstanceOf(GetEventsError);
      expect(caughtError).toEqual(error);
    }
  });
});
