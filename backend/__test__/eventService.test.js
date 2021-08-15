import { eventService } from '../src/services/eventService';

eventService.createEvent = jest.fn();
eventService.queryEventById = jest.fn();
eventService.updateEvent = jest.fn();

describe("EventService test", () => {
    it("has a module", () => {
        expect(eventService).toBeDefined();
    });

    describe('given an email and a password', () => {
        test("Creat article", async () => {
            eventService.createEvent.mockReset();
            eventService.createEvent.mockReturnValue({ status: 204, message: 'Event created' });
            const newEvent = {
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                facilitators: ["roycsi@roycsimojcsi.com"],
                participants: ["jackie@legszebbloavilagon.com"],
                appointments: []
            }
            const event = await eventService.createEvent(newEvent);
            expect(event).toEqual({ status: 204, message: 'Event created' });
        });
    })

    describe('given an id', () => {
        test("should return one event", async() => {
          eventService.queryEventById.mockReset();
          eventService.queryEventById.mockReturnValue({
            status: 200,
            event: {
              title: 'Test',
              startTime: new Date("07/10/2021"),
              endTime: new Date("07/10/2021"),
              appointmentDurationTime: 45, 
              facilitators: ['test@test.com', 'test2@test.com'],
              participants: ['test@participant.com', 'test2@participant.com']
            }
          });
    
          const id = 1;
          const event =  await eventService.queryEventById(id);
          expect(event).toEqual({
            status: 200,
            event: {
              title: 'Test',
              startTime: new Date("07/10/2021"),
              endTime: new Date("07/10/2021"),
              appointmentDurationTime: 45, 
              facilitators: ['test@test.com', 'test2@test.com'],
              participants: ['test@participant.com', 'test2@participant.com']
            }
          });
        });
      })

      describe('given an id and an event object', () => {
        test('should update the event with the new values', async () => {
          eventService.updateEvent.mockReset();
          eventService.updateEvent.mockReturnValue({
            status: 200,
            updatedEvent: {
              title: 'Test2',
              startTime: new Date("07/10/2021"),
              endTime: new Date("07/10/2021"),
              appointmentDurationTime: 60, 
              facilitators: ['test@test.com', 'test2@test.com'],
              participants: ['test@participant.com', 'test2@participant.com']
            }
          });
          const event = {
            title: 'Test2',
            startTime: new Date("07/10/2021"),
            endTime: new Date("07/10/2021"),
            appointmentDurationTime: 60, 
            facilitators: ['test@test.com', 'test2@test.com'],
            participants: ['test@participant.com', 'test2@participant.com']
          };
          const updatedEvent = await eventService.updateEvent(1, event);
          expect(updatedEvent).toEqual({
            status: 200,
            updatedEvent: {
              title: 'Test2',
              startTime: new Date("07/10/2021"),
              endTime: new Date("07/10/2021"),
              appointmentDurationTime: 60, 
              facilitators: ['test@test.com', 'test2@test.com'],
              participants: ['test@participant.com', 'test2@participant.com']
            }
          });
        })
      })
})