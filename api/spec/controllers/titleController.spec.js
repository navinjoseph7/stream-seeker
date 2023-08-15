const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");

let movie;

describe('/homepage', () => {
    test('GET a result for a matching title', async () => {
        movie = new Movie({title: "Taken", release_year: 2010})
        movie.save();

        let response = await request(app)
            .get('/homepage/movietitle')
        expect(response.status).toEqual(200)
        expect(response.body.title).toEqual('Taken')
    })
})