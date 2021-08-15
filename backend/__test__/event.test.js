import request from 'supertest';

import app from '../src/app';

describe('GET /api/events/test', () => {

    describe('given event test endpoint', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/api/events/test').send();
            expect(response.statusCode).toBe(200);
        })
    })
})

describe('POST /api/events/new', () => {

    describe('given new event without title', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "",
                startTime: "1992-02-05 11:00",
                endTime: "1992-02-05 16:20",
                appointmentDurationTime: 20,
                facilitators: ["facilitator@roy.hu"],
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Title is required');
        })
    })


        describe('given new event without startTime', () => {
            test('should respond with a 400 status code', async () => {
                const response = await request(app).post('/api/events/new').send({
                    title: "Title",
                    endTime: "1992-02-05 16:20",
                    appointmentDurationTime: 20,
                    facilitators: ["facilitator@roy.hu"],
                    participants: [],
                    appointments: []
                });
                expect(response.statusCode).toBe(400);
                const errormessage = JSON.parse(response.error.text).event.error;
                expect(errormessage).toBe('Start date is required');
            })
        })

    describe('given new event with wrong startTime format', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "fittyfiritty",
                endTime: "1992-02-05 16:20",
                appointmentDurationTime: 20,
                facilitators: ["facilitator@roy.hu"],
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Start date must be a date');
        })
    })

    describe('given new event without endTime', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                appointmentDurationTime: 20,
                facilitators: ["facilitator@roy.hu"],
                participants: [],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('End time is required');
        })
    })

    describe('given new event with wrong endTime format', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "fittyfiritty",
                appointmentDurationTime: 20,
                facilitators: ["facilitator@roy.hu"],
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('End date must be a valid date');
        })
    })

    describe('given new event without appointmentDurationTime', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                facilitators: ["facilitator@roy.hu"],
                participants: [],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Appointment duration time is required');
        })
    })

    describe('given new event with wrong appointmentDurationTime format', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: "fittyfiritty",
                facilitators: ["facilitator@roy.hu"],
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Appointment duration time must be a number');
        })
    })

    describe('given new event without facilitators', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Facilitators is required');
        })
    })

    describe('given new event with string facilitator', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                facilitators: "facilitator@roy.hu",
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Facilitators must be an array');
        })
    })

    describe('given new event with wrong e-mail format for facilitator', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                facilitators: ["fittyfiritty"],
                participants: ["crutchie@participant.com", "participant@halley.co.uk"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Invalid facilitator e-mail format');
        })
    })

    describe('given new event with string participant', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                facilitators: ["crutchie@faci-maci.com", "facilitator@halley.co.uk"],
                participants: "participant@roy.hu",
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Participants must be an array');
        })
    })

    describe('given new event with wrong e-mail format for participant', () => {
        test('should respond with a 400 status code', async () => {
            const response = await request(app).post('/api/events/new').send({
                title: "Title",
                startTime: "1992-02-05 16:20",
                endTime: "1992-02-06 16:20",
                appointmentDurationTime: 20,
                facilitators: ["roycsi@roycsimojcsi.com"],
                participants: ["fittyfiritty"],
                appointments: []
            });
            expect(response.statusCode).toBe(400);
            const errormessage = JSON.parse(response.error.text).event.error;
            expect(errormessage).toBe('Invalid participant e-mail format');
        })
    })


})