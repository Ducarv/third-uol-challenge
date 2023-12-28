import { DeleteEventsError } from "../../../../providers/errors";
import { EventRepository } from "../../../../respository/event";
import { DeleteEventsByDayOfWeek } from "../deleteByDayOfWeek";

describe("DeleteEventsByDayOfWeek", () => {
    const mockRepository: Partial<EventRepository> = {
      deleteEventsByDayOfWeek: jest.fn(),
    };
  
    const deleteEventsByDayOfWeek = new DeleteEventsByDayOfWeek(
      mockRepository as EventRepository
    );
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should delete events by day of week successfully", async () => {
      const expectedDayOfWeek = "Monday";
      const mockDeletedEvents = [
        { id: "1", description: "Event 1", dayOfWeek: "Monday" },
        { id: "2", description: "Event 2", dayOfWeek: "Monday" },
      ];
      (mockRepository.deleteEventsByDayOfWeek as jest.Mock).mockResolvedValueOnce(
        mockDeletedEvents as any
      );
  
      const result = await deleteEventsByDayOfWeek.execute(expectedDayOfWeek);
  
      expect(result).toEqual(mockDeletedEvents);
      expect(mockRepository.deleteEventsByDayOfWeek).toHaveBeenCalledWith(
        expectedDayOfWeek
      );
    });
  
    it("should handle error while deleting events by day of week", async () => {
      const expectedDayOfWeek = "Sunday";
      const deleteError = new DeleteEventsError("Error deleting events");
      (mockRepository.deleteEventsByDayOfWeek as jest.Mock).mockRejectedValueOnce(
        deleteError
      );
  
      await expect(
        deleteEventsByDayOfWeek.execute(expectedDayOfWeek)
      ).rejects.toThrow(DeleteEventsError);
  
      expect(mockRepository.deleteEventsByDayOfWeek).toHaveBeenCalledWith(
        expectedDayOfWeek
      );
    });
  });