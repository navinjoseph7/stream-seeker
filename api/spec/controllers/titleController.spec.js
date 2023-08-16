const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Movie = require('../../models/movie')

let movie;

describe('/homepage/bytitle/title', () => {
    test('GET a result for a matching title', async () => {
        movie = new Movie({ title: "Taken", 
                            release_year: 2010,
                            synopsis: "Man rescues daughter from bad people",
                            rating: 4,
                            links: 'link'
                        })
        savedMovie = await movie.save();
        const title = savedMovie.title        

        let response = await request(app)
            .get(`/homepage/bytitle/${title}`)
        expect(response.status).toEqual(200)
        expect(response.body.title).toEqual('Taken')
    })
    test('GET request returns an error, if title not found', async () => {
        const title = "not a real movie" 
        let response = await request(app)
            .get(`/homepage/bytitle/${title}`)
        expect(response.status).toEqual(404)    
    })
    test('GET a result for a matching title', async () => {
        movie = new Movie({ title: "Superman", 
                            release_year: 2019,
                            synopsis: "Man with super powers",
                            rating: 9,
                            links: 'link'
                        })
        savedMovie = await movie.save();
        const title = savedMovie.title        

        let response = await request(app)
            .get(`/homepage/bytitle/${title}`)
        expect(response.status).toEqual(200)
        expect(response.body.title).toEqual('Superman')
    })
})