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

let noteTitle = "created note";
let noteDescription = "created";
let noteTitle2 = "created note with a reminder";
let noteDescription2 = "created with reminder";
let noteId;
let noteId2;
let noteId3 = "INVALID";
let reminder = "0 */30 * ? * *";
let reminder2 = "0 */15 * ? * *";
let reminderId;
let reminderId2;

describe('POST /api/note-with-reminder - without reminders', () => {
    
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
    
});

describe('POST /api/reminder', () => {
    
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Arrange:
        const reqBody = {
            "noteId": noteId,
            "time": reminder
        };

        // Act: 
        const result = await request.post('/api/reminder')
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server creates a new reminder.', async () => {
        // Arrange:
        const reqBody = {
            "noteId": noteId,
            "time": reminder
        };

        // Act: 
        const result = await request.post('/api/reminder')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(200);
    });
    
});

describe('POST /api/note-with-reminder - with a reminder', () => {

    it('When there is an unauthorized request the server returns 401.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle2,
                "description": noteDescription2
            },
            "reminders": [
                {
                    "time": reminder2
                }
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(401);

    });

    it('When there is an authorized request the server creates a new note with a reminder.', async () => {
        // Arrange:
        const reqBody = {
            "note": {
                "title": noteTitle2,
                "description": noteDescription2
            },
            "reminders": [
                {
                    "time": reminder2
                }
            ]
        };

        // Act: 
        const result = await request.post('/api/note-with-reminders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(200);
        noteId2 = result.body;
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
        const result = await request.get('/api/notes-by-user')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.length).toBe(2);
        expect(result.body.some(note => note.id === noteId && note.title === noteTitle && note.description === noteDescription)).toBe(true);
        expect(result.body.some(note => note.id === noteId2 && note.title === noteTitle2 && note.description === noteDescription2)).toBe(true);

    });
});

describe('GET /api/note/:noteId/reminders', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get(`/api/note/${noteId}/reminders`)
        // Result
        expect(result.status).toBe(401);
    });

    it('Now checking if the first reminder was created correctly.', async () => {
        // Act:
        const result = await request.get(`/api/note/${noteId}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        reminderId = result.body[0].id;
        expect(result.body.length).toBe(1);
        expect(result.body[0].noteId === noteId).toBe(true);
        expect(result.body[0].time === reminder).toBe(true);
    });

    it('Now checking if the second reminder was created correctly.', async () => {
        // Act:
        const result = await request.get(`/api/note/${noteId2}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        reminderId2 = result.body[0].id;
        expect(result.body.length).toBe(1);
        expect(result.body[0].noteId === noteId2).toBe(true);
        expect(result.body[0].time === reminder2).toBe(true);
    });
    
});


describe('PUT /api/note/:id', () => {
    
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Arrange:
        noteTitle = "created modified note";
        noteDescription = "created and modified";

        const reqBody = {
            "title": noteTitle,
            "description": noteDescription
        };

        // Act: 
        const result = await request.put(`/api/note/${noteId}`)
            .send(reqBody);

        // Assert:
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server will modify the note.', async () => {
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
        const result = await request.get(`/api/note/${noteId3}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body === "").toBe(true);
    });

    it('Now checking if the first note was modified correctly.', async () => {
        // Act:

        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.title === noteTitle).toBe(true);
        expect(result.body.description === noteDescription).toBe(true);
    });

});

describe('DELETE /api/reminder/:id', () => {

    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act: 
        const result = await request.delete(`/api/reminder/${reminderId}`);

        // Assert:
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the reminder is deleted.', async () => {
        // Act: 
        const result = await request.delete(`/api/reminder/${reminderId}`)
            .set('Authorization', `Bearer ${accessToken}`);

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

});

describe('DELETE /api/note/:id', () => {

    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.delete(`/api/note/${noteId}`);
        // Assert:
        expect(result.status).toBe(401);
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

    it(`Now deleting the second note together with the reminder`, async () => {

        // Act:
        const result = await request.delete(`/api/note/${noteId2}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Assert:
        expect(result.status).toBe(200);
    });
    
});

describe('GET /api/notes', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get('/api/notes');
        // Result
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns all notes. If there aren\'t any, an empty array is returned.', async () => {
        // Act:
        const noteDescription = "test";
        const result = await request.get('/api/notes')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        console.log(result.body);
        expect(Array.isArray(result.body) && result.body.length).toBe(0);
    });
});

describe('GET /api/reminders', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        // Act:
        const result = await request.get('/api/reminders');
        // Result
        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns all notes. If there aren\'t any, an empty array is returned.', async () => {
        // Act:
        const noteDescription = "test";
        const result = await request.get('/api/reminders')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        console.log(result.body);
        expect(Array.isArray(result.body) && result.body.length).toBe(0);
    });
});
