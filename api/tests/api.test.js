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

function getNoteWithEmptyReminders() {
    return {
        "note": {
            "title": noteTitle,
            "description": noteDescription
        },
        "reminders": []
    };
}

function getNewReminder() {
    return {
        "noteId": noteId,
        "time": reminder
    };
}

function getNoteWithReminder() {
    return {
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
}

function getNewNote() {
    return {
        "title": noteTitle,
        "description": noteDescription
    };
}

describe('POST /api/note-with-reminder - without reminders', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const reqBody = getNoteWithEmptyReminders();

        const result = await request.post('/api/note-with-reminders')
            .send(reqBody);

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request the server creates a new note without reminders.', async () => {
        const reqBody = getNoteWithEmptyReminders();

        const result = await request.post('/api/note-with-reminders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        expect(result.status).toBe(200);
        noteId = result.body;
    });
});

describe('POST /api/reminder', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const reqBody = getNewReminder();

        const result = await request.post('/api/reminder')
            .send(reqBody);

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server creates a new reminder.', async () => {
        const reqBody = getNewReminder();

        const result = await request.post('/api/reminder')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        expect(result.status).toBe(200);
    });
});

describe('POST /api/note-with-reminder - with a reminder', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const reqBody = getNoteWithReminder();

        const result = await request.post('/api/note-with-reminders')
            .send(reqBody);

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request the server creates a new note with a reminder.', async () => {
        const reqBody = getNoteWithReminder();

        const result = await request.post('/api/note-with-reminders')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        expect(result.status).toBe(200);
        noteId2 = result.body;
    });

});

describe('GET /api/notes-by-user', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.get('/api/notes-by-user');

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns the notes of the user.', async () => {
        const result = await request.get('/api/notes-by-user')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(2);
        expect(result.body.some(note => note.id === noteId)).toBe(true);
        expect(result.body.some(note => note.title === noteTitle)).toBe(true);
        expect(result.body.some(note => note.description === noteDescription)).toBe(true);
        expect(result.body.some(note => note.id === noteId2)).toBe(true);
        expect(result.body.some(note => note.title === noteTitle2)).toBe(true);
        expect(result.body.some(note => note.description === noteDescription2)).toBe(true);
    });
});

describe('GET /api/note/:noteId/reminders', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.get(`/api/note/${noteId}/reminders`);

        expect(result.status).toBe(401);
    });

    it('Now checking if the first reminder was created correctly.', async () => {
        const result = await request.get(`/api/note/${noteId}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        reminderId = result.body[0].id;
        expect(result.body.length).toBe(1);
        expect(result.body[0].noteId === noteId).toBe(true);
        expect(result.body[0].time === reminder).toBe(true);
    });

    it('Now checking if the second reminder was created correctly.', async () => {
        const result = await request.get(`/api/note/${noteId2}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body.length).toBe(1);
        expect(result.body[0].noteId === noteId2).toBe(true);
        expect(result.body[0].time === reminder2).toBe(true);
    });
});

describe('PUT /api/note/:id', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        noteTitle = "created modified note";
        noteDescription = "created and modified";
        const reqBody = getNewNote();

        const result = await request.put(`/api/note/${noteId}`)
            .send(reqBody);

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server will modify the note.', async () => {
        noteTitle = "created modified note";
        noteDescription = "created and modified";
        const reqBody = getNewNote();

        const result = await request.put(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(reqBody);

        expect(result.status).toBe(200);
    });
});

describe('GET /api/note/:id', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.get('/api/note/:id');

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, but a wrong note id, the server returns code 200 and an empty string in request body.', async () => {
        const result = await request.get(`/api/note/${noteId3}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body === "").toBe(true);
    });

    it('Now checking if the first note was modified correctly.', async () => {
        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body.title === noteTitle).toBe(true);
        expect(result.body.description === noteDescription).toBe(true);
    });

});

describe('DELETE /api/reminder/:id', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.delete(`/api/reminder/${reminderId}`);

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the reminder is deleted.', async () => {
        const result = await request.delete(`/api/reminder/${reminderId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
    });

    it('Now checking if the reminder was deleted correctly.', async () => {
        const result = await request.get(`/api/note/${noteId}/reminders`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body.length === 0).toBe(true);
    });

});

describe('DELETE /api/note/:id', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.delete(`/api/note/${noteId}`);

        expect(result.status).toBe(401);
    });
    
    it(`When note with a given id exists then it's removed from db and 200 status is sent as the response`, async () => {
        const result = await request.delete(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
    });

    it(`Checking if the note was deleted correctly.`, async () => {
        const result = await request.get(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(result.body === "").toBe(true);
    });

    it(`Now deleting the second note together with the reminder`, async () => {
        const result = await request.delete(`/api/note/${noteId2}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
    });
    
});

describe('GET /api/notes', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.get('/api/notes');

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns all notes. If there are not any, an empty array is returned.', async () => {
        const result = await request.get('/api/notes')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(Array.isArray(result.body) && result.body.length).toBe(0);
    });
});

describe('GET /api/reminders', () => {
    it('When there is an unauthorized request the server returns 401.', async () => {
        const result = await request.get('/api/reminders');

        expect(result.status).toBe(401);
    });

    it('When there is an authorized request, the server returns all reminders. If there are not any, an empty array is returned.', async () => {
        const result = await request.get('/api/reminders')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(result.status).toBe(200);
        expect(Array.isArray(result.body) && result.body.length).toBe(0);
    });
});
