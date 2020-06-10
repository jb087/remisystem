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