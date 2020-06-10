import supertest from 'supertest';
import * as TestUtils from './test-utils'
import app from '../app';

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
        const noteDescription = "test";
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

describe('POST, PUT and DELETE note', () => {
    const noteTitle = "created note";
    const noteDescription = "created";
    let noteId;
    it('When there is an authorized request the server creates a new note.', async () => {
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
    it(`When note with given id exists then it's removed from db and 200 status is sent as response`, async () => {
        
        // Act:
        const result = await request.delete(`/api/note/${noteId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        // Assert:
        expect(result.status).toBe(200);
    });
    
});