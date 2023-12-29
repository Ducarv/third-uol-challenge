import { GetEventsError } from '../../../../providers/errors';
import { EventRepository } from '../../../../respository/event';
import { GetEventByIdUseCase } from '../getById';

describe('GetEventById.ts', () => {
  const mockRepository: Partial<EventRepository> = {
    getEventById: jest.fn(),
  };

  const getEventById = new GetEventByIdUseCase(
    mockRepository as EventRepository,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get events by id successfully', async () => {
    const expectedId = '1';
    const mockEvent = { id: '1', description: 'Event 1', dayOfWeek: 'Monday' };

    (mockRepository.getEventById as jest.Mock).mockResolvedValueOnce(
      mockEvent as any,
    );

    const result = await getEventById.execute(expectedId);

    expect(result).toEqual(mockEvent);
    expect(mockRepository.getEventById).toHaveBeenCalledWith(expectedId);
  });

  it('should handle error while getting events by id', async () => {
    const expectedId = '1';
    const getError = new GetEventsError('Error to get events');
    (mockRepository.getEventById as jest.Mock).mockRejectedValueOnce(getError);

    await expect(getEventById.execute(expectedId)).rejects.toThrow(
      GetEventsError,
    );

    expect(mockRepository.getEventById).toHaveBeenCalledWith(expectedId);
  });
});
