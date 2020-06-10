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
        const result = await request.get('/api/notes')
            .set('Authorization', `Bearer ${accessToken}`);

        // Result
        expect(result.status).toBe(200);
        expect(result.body.length).toBeGreaterThanOrEqual(1);
        expect(result.body.some(note => note.description === noteDescription)).toBe(true);
    });
});