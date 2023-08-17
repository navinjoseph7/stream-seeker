const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Movie = require('../../models/movie')
const TitleController = require('../../controllers/titleController');
let movie;

// describe('/homepage/bytitle/title', () => {
//     test('GET a result for a matching title', async () => {
//         movie = new Movie({ title: "Taken", 
//                             release_year: 2010,
//                             synopsis: "Man rescues daughter from bad people",
//                             rating: 4,
//                             links: 'link'
//                         })
//         savedMovie = await movie.save();
//         const title = savedMovie.title        

//         let response = await request(app)
//             .get(`/homepage/bytitle/${title}`)
//         expect(response.status).toEqual(200)
//         expect(response.body.title).toEqual('Taken')
//     })
//     test('GET request returns an error, if title not found', async () => {
//         const title = "not a real movie" 
//         let response = await request(app)
//             .get(`/homepage/bytitle/${title}`)
//         expect(response.status).toEqual(404)    
//     })
//     test('GET a result for a matching title', async () => {
//         movie = new Movie({ title: "Superman", 
//                             release_year: 2019,
//                             synopsis: "Man with super powers",
//                             rating: 9,
//                             links: 'link'
//                         })
//         savedMovie = await movie.save();
//         const title = savedMovie.title        

//         let response = await request(app)
//             .get(`/homepage/bytitle/${title}`)
//         expect(response.status).toEqual(200)
//         expect(response.body.title).toEqual('Superman')
//     })
// })



describe('TitleController', () => {
  describe('Find', () => {
    it('should return a title when given a valid id', async () => {
      const req = {
        params: {
          id: 'valid_movie_id_here', // Replace with a valid movie id
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TitleController.Find(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(/* Expected title object here */);
    });

    it('should return a 404 error when given an invalid id', async () => {
      const req = {
        params: {
          id: 404 // Replace with an invalid movie id
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TitleController.Find(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Title not found' });
    });
  });

  describe('FindByTitle', () => {
    it('should return movie information when given a valid title', async () => {
      const req = {
        params: {
          title: 'Sherlock' // Replace with a valid movie title
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await TitleController.FindByTitle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith("sherlock");
    });

    // Add more test cases for different scenarios (e.g., invalid title, API errors, etc.)
  });
});
