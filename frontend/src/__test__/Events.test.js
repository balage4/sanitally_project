import React from 'react';
import { act, render } from '@testing-library/react';
import Events, { EventsAPI } from '../components/admin/events/Events';

const events = {
  status: 200,
          events: [
            {
              title: 'Test1',
              startTime: new Date("07/08/2021"),
              endTime: new Date("07/10/2021"),
              appointmentDurationTime: 90,
              facilitators: [
                'test1@test.com',
                'test2@test.com'
              ],
              participants: [
                'test1@participant.com',
                'test2@participant.com'
              ],
              appointments: []
            },
            {
              title: 'Test2',
              startTime: new Date("07/09/2021"),
              endTime: new Date("07/11/2021"),
              appointmentDurationTime: 60,
              facilitators: [
                'test3@test.com',
                'test4@test.com'
              ],
              participants: [
                'test3@participant.com',
                'test4@participant.com'
              ],
              appointments: []
            },
            {
              title: 'Test3',
              startTime: new Date("07/11/2021"),
              endTime: new Date("07/15/2021"),
              appointmentDurationTime: 30,
              facilitators: [
                'test5@test.com',
                'test6@test.com'
              ],
              participants: [
                'test5@participant.com',
                'test6@participant.com'
              ],
              appointments: []
            }
          ]
}

function getSpy() {
  return jest.spyOn(EventsAPI, "get").mockImplementationOnce(() =>
      new Promise((resolve) =>
        resolve(events)
      )
  );
}

afterAll(() => {
  jest.clearAllMocks();
});

it("renders component correctly", async () => {
  const spy = getSpy();
  await act( async () => {
    render(<Events />)
  })

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("http://localhost:5000/api/events");
});
