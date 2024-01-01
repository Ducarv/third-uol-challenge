import {
  AuthorizationError,
  DeleteEventsError,
} from '../../../../providers/errors';
import { EventRepository } from '../../../../respository/event';
import { DeleteEventsByDayOfWeekUseCase } from '../deleteByDayOfWeek';

describe('DeleteEventsByDayOfWeek', () => {
  const mockRepository: Partial<EventRepository> = {
    deleteEventsByDayOfWeek: jest.fn(),
  };

  const deleteEventsByDayOfWeek = new DeleteEventsByDayOfWeekUseCase(
    mockRepository as EventRepository,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete events by day of week successfully', async () => {
    const expectedDayOfWeek = 'Monday';
    const mockDeletedEvents = [
      { id: '1', description: 'Event 1', dayOfWeek: 'Monday' },
      { id: '2', description: 'Event 2', dayOfWeek: 'Monday' },
    ];
    (mockRepository.deleteEventsByDayOfWeek as jest.Mock).mockResolvedValueOnce(
      mockDeletedEvents as any,
    );

    const result = await deleteEventsByDayOfWeek.execute(
      expectedDayOfWeek,
      'userId',
    );

    expect(result).toEqual(mockDeletedEvents);
    expect(mockRepository.deleteEventsByDayOfWeek).toHaveBeenCalledWith(
      expectedDayOfWeek,
      'userId',
    );
  });

  it('should handle error while deleting events by day of week', async () => {
    const expectedDayOfWeek = 'Sunday';
    const deleteError = new DeleteEventsError('Error deleting events');
    (mockRepository.deleteEventsByDayOfWeek as jest.Mock).mockRejectedValueOnce(
      deleteError,
    );

    await expect(
      deleteEventsByDayOfWeek.execute(expectedDayOfWeek, 'userId'),
    ).rejects.toThrow(DeleteEventsError);

    expect(mockRepository.deleteEventsByDayOfWeek).toHaveBeenCalledWith(
      expectedDayOfWeek,
      'userId',
    );
  });

  it('should throw AuthorizationError if user is not authorized', async () => {
    const expectedDayOfWeek = 'Monday';
    const authorizationError = new AuthorizationError(
      'User is not authorized to delete events',
    );
    (mockRepository.deleteEventsByDayOfWeek as jest.Mock).mockRejectedValueOnce(
      authorizationError,
    );

    await expect(
      deleteEventsByDayOfWeek.execute(expectedDayOfWeek, 'userId'),
    ).rejects.toThrow(AuthorizationError);

    expect(mockRepository.deleteEventsByDayOfWeek).toHaveBeenCalledWith(
      expectedDayOfWeek,
      'userId',
    );
  });
});
