import {
  AuthorizationError,
  DeleteEventsError,
  NotFound,
} from '../../../../providers/errors';
import { EventRepository } from '../../../../respository/event';
import { DeleteEventByIdUseCase } from '../deleteById';

describe('DeleteEventById.ts', () => {
  const mockRepository: Partial<EventRepository> = {
    deleteEventById: jest.fn(),
  };

  const deleteEventById = new DeleteEventByIdUseCase(
    mockRepository as EventRepository,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete event by id successfully', async () => {
    const expectedId = '1';
    const mockEvent = { id: '1', description: 'Event 1', dayOfWeek: 'Monday' };

    (mockRepository.deleteEventById as jest.Mock).mockResolvedValueOnce(
      mockEvent as any,
    );

    const result = await deleteEventById.execute(expectedId, 'userId');

    expect(result).toEqual(mockEvent);
    expect(mockRepository.deleteEventById).toHaveBeenCalledWith(
      expectedId,
      'userId',
    );
  });

  it('should handle error while deleting event by id', async () => {
    const expectedId = '1';
    const deleteError = new DeleteEventsError('Error deleting event');
    (mockRepository.deleteEventById as jest.Mock).mockRejectedValueOnce(
      deleteError,
    );

    await expect(deleteEventById.execute(expectedId, 'userId')).rejects.toThrow(
      DeleteEventsError,
    );

    expect(mockRepository.deleteEventById).toHaveBeenCalledWith(
      expectedId,
      'userId',
    );
  });

  it('should throw NotFound error if id is not provided', async () => {
    const expectedId = '';

    await expect(deleteEventById.execute(expectedId, 'userId')).rejects.toThrow(
      NotFound,
    );

    expect(mockRepository.deleteEventById).not.toHaveBeenCalled();
  });

  it('should throw AuthorizationError if user is not authorized', async () => {
    const expectedId = '1';
    const authorizationError = new AuthorizationError('User is not authorized');

    (mockRepository.deleteEventById as jest.Mock).mockRejectedValueOnce(
      authorizationError,
    );

    await expect(deleteEventById.execute(expectedId, 'userId')).rejects.toThrow(
      AuthorizationError,
    );

    expect(mockRepository.deleteEventById).toHaveBeenCalledWith(
      expectedId,
      'userId',
    );
  });
});
