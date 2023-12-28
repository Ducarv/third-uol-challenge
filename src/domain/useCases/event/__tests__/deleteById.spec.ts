import { DeleteEventsError } from "../../../../providers/errors"
import { EventRepository } from "../../../../respository/event"
import { DeleteEventById } from "../deleteById"

describe("DeleteEventById.ts", () => {
    const mockRepository: Partial<EventRepository> = {
        deleteEventById: jest.fn(),
    }

    const deleteEventById = new DeleteEventById(
        mockRepository as EventRepository
    )

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should delete event by id successfully", async () => {
        const expectedId = "1";
        const mockEvent = { id: "1", description: "Event 1", dayOfWeek: "Monday" };

        (mockRepository.deleteEventById as jest.Mock).mockResolvedValueOnce(
            mockEvent as any
        )

        const result = await deleteEventById.execute(expectedId);

        expect(result).toEqual(mockEvent);
        expect(mockRepository.deleteEventById).toHaveBeenCalledWith(
            expectedId
        )
    });

    it("should handle error while deleting event by id", async () => {
        const expectedId = "1";
        const deleteError = new DeleteEventsError("Error deleting event");
        (mockRepository.deleteEventById as jest.Mock).mockRejectedValueOnce(
            deleteError
        )

        await expect(
            deleteEventById.execute(expectedId)
        ).rejects.toThrow(DeleteEventsError);

        expect(mockRepository.deleteEventById).toHaveBeenCalledWith(
            expectedId
        )
    })
})