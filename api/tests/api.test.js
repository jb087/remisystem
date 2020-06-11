import supertest from 'supertest';
import * as TestUtils from './test-utils'
import app from '../app';
import {beforeAll, describe, expect, it} from "@jest/globals";

const request = supertest(app);

let accessToken;
beforeAll(async done => {
    
    accessToken = await TestUtils.getAccessToken();

    done();
});

describe('GET /api/notes', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get('/api/notes');
        // Result
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns all notes.', async () => {
        // Act:
        const noteDescription = "test";
        const result = await request.get('/api/notes')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.length).toBeGreaterThanOrEqual(1);
        expect(result.body.some(note => note.description === noteDescription)).toBe(true);
        console.log(result.body)
    });
});

describe('GET /api/note/:id', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get('/api/note/:id');
        // Result
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, but a wrong note id, the server returns code 200 and an empty string in request body.', async () => {
        // Act:
        const noteId = "INVALID";
        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body === "").toBe(true);
    });

    it('When there is an authorized request, the server returns the note with the given id.', async () => {
        // Act:
        const noteId = "541ac530-8d1d-11ea-8451-2d64d0a1f6ef";
        const noteDescription = "test";
        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.description === noteDescription).toBe(true);
    });
});


describe('GET /api/notes-by-user', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get('/api/notes-by-user');
        // Result
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns the notes of the user.', async () => {
        // Act:
        const userId = "IdwLchWQe5Oqf9IFyJ3kSHZ5exl2";
        const result = await request.get('/api/notes-by-user')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.every(note => note.userId === userId)).toBe(true);
    });
});

describe('POST, PUT and DELETE path for notes', () => {
    let noteTitle = "created note";
    let noteDescription = "created";
    let noteId;

    it('When there is an unauthorized request the server returns 401.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle,
                "description": noteDescription
            },
            "reminders": [
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(401);
        noteId = result.body;
    });

    it('When there is an authorized request the server creates a new note without reminders.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle,
                "description": noteDescription
            },
            "reminders": [
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(200);
        noteId = result.body;
    });

    it('Now checking if the note was created correctly.', async () => {
        // Act:

        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.title === noteTitle).toBe(true);
        expect(result.body.description === noteDescription).toBe(true);
    });

    it('Next, modifying the note.', async () => {
        // Arrange:
        noteTitle = "created modified note";
        noteDescription = "created and modified";
        
        const reqBody = {
                "title": noteTitle,
                "description": noteDescription
            };

        // Act: 
        const result = await request.put(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(200);
    });

    it('Now checking if the note was modified correctly.', async () => {
        // Act:

        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.title === noteTitle).toBe(true);
        expect(result.body.description === noteDescription).toBe(true);
    });

    it(`When note with a given id exists then it's removed from db and 200 status is sent as the response`, async () => {
        
        // Act:
        const result = await request.delete(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Assert:
        expect(result.status).toBe(200);
    });

    it(`Checking if the note was deleted correctly.`, async () => {

        // Act:
        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Assert:
        expect(result.status).toBe(200);
        expect(result.body === "").toBe(true);
    });
});


describe('POST and DELETE path for notes with reminders', () => {
    let noteTitle = "created note";
    let noteDescription = "created";
    let reminder = "0 */30 * ? * *";
    let noteId;
    let reminderId;

    it('When there is an unauthorized request the server returns 401.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle,
                "description": noteDescription
            },
            "reminders": [
                {
                    "time": reminder
                }
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(401);
        //noteId = result.body;
    });

    it('When there is an authorized request the server creates a new note with a reminder.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle,
                "description": noteDescription
            },
            "reminders": [
                {
                    "time": reminder
                }
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(200);
        noteId = result.body;
    });

    it('Now checking if the note was created correctly.', async () => {
        // Act:

        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.title === noteTitle).toBe(true);
        expect(result.body.description === noteDescription).toBe(true);
    });

    it('Now checking if the reminder was created correctly.', async () => {
        // Act:
        const result = await request.get(`/api/note/${noteId}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        console.log(result.body);
        reminderId = result.body[0].id;
        console.log(reminderId);
        expect(result.body[0].noteId === noteId).toBe(true);
        expect(result.body[0].time === reminder).toBe(true);
    });

    it('Next, deleting the reminder.', async () => {
        // Act: 
        const result = await request.delete(`/api/reminder/${reminderId}`)
            .set('Authorization', `Bearer ${accessToken}`)

        // Assert:
        expect(result.status).toBe(200);
    });

    it('Now checking if the reminder was deleted correctly.', async () => {
        // Act:

        const result = await request.get(`/api/note/${noteId}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.length === 0).toBe(true);
    });

    it(`When note with a given id exists then it's removed from db and 200 status is sent as the response`, async () => {

        // Act:
        const result = await request.delete(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Assert:
        expect(result.status).toBe(200);
    });
});
