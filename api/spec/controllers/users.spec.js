const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const JWT = require("jsonwebtoken");
const TokenGenerator = require("../../lib/token_generator");
const secret = process.env.JWT_SECRET;

let token;

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", name:"test"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", name:"test"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      console.log(newUser)
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })

  describe("GET /users/:id", () => {
    test("returns user details when authorised", async () => {
      const user = new User({
        email: '1test@example.com',
        password: '1password',
        name: '1testuser',
        subscriptions: ['Netflix'],
        genres: ['Action'],
      });
      const savedUser = await user.save();
      const token = TokenGenerator.jsonwebtoken(savedUser._id);
    
      const response = await request(app)
        .get(`/users/${savedUser._id}`)
        .set("Authorization", `Bearer ${token}`)
    
      expect(response.statusCode).toBe(200);
      expect(response.body.email).toEqual('1test@example.com')
      expect(response.body.password).toBeUndefined();
      expect(response.body.name).toEqual('1testuser');
      expect(response.body.subscriptions).toEqual(['Netflix']);
      expect(response.body.genres).toEqual(['Action']);
    });
    test("returns 401 if not authorized", async () => {
      const user = new User({
        email: '2test@example.com',
        password: '2password2',
        name: '2testuser',
        subscriptions: ['Disney'],
        genres: ['Comedy'],
      });
      const savedUser = await user.save();
      const token = TokenGenerator.jsonwebtoken(savedUser._id);

      const response = await request(app)
        .get(`/users/4eb6e7e7e9b7f4194e000001`)
        .set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(401);
    
    });

  });

  describe("PUT, when logged in user updates info", () => {
    test("the response code is 201 and subscription/genre fields are updated", async () => {
        const user = new User({
        email: '1test@example.com',
        password: '1password',
        name: '1testuser',
        subscriptions: ['Netflix'],
        genres: ['Action'],
        });
        const savedUser = await user.save();
        const userId = savedUser.id;
        const token = TokenGenerator.jsonwebtoken(userId);
    
        const updatedData = {
        email: '1test@example.com',
        password: '1password',
        name: '1testuser',
        subscriptions: ['Prime'],
        genres: ['Horror'],
        };
    
        let response = await request(app)
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData);
    
        expect(response.status).toEqual(201);
    
        const updatedUser = await User.findById(userId);
    
        const updatedSubscriptions = updatedUser.subscriptions.toObject();
        const updatedGenres = updatedUser.genres.toObject();
    
        expect(updatedSubscriptions).toEqual(updatedData.subscriptions);
    
        expect(updatedGenres).toEqual(updatedData.genres);
    });
  })

  describe("POST /users/:id/watch-later", () => {
    test("adds a movie to watchLater array", async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password',
        name: 'testuser',
        watchLater: [],
      });
      const savedUser = await user.save();
      const userId = savedUser._id;
      const token = TokenGenerator.jsonwebtoken(userId);
  
      const movieToAdd = {
        title: "Taken",
        release_year: 2010,
        synopsis: "Man rescues daughter from bad people",
        rating: 4,
        links: "link",
      };
  
      const response = await request(app)
        .post(`/users/${userId}/watch-later`)
        .set("Authorization", `Bearer ${token}`)
        .send({ movie: movieToAdd });
  
      expect(response.status).toEqual(200);
  
      const updatedUser = await User.findById(userId);
      const addedMovie = updatedUser.watchLater[0];
  
      expect(addedMovie.title).toEqual(movieToAdd.title);
      // Add more assertions for other properties if needed
    });
  });
  
  describe("DELETE /users/:id/watch-later/:movieId", () => {
    test("removes a movie from watchLater array", async () => {
      const user = new User({
        email: 'test@example.com',
        password: 'password',
        name: 'testuser',
        watchLater: [
          {
            title: "Taken",
            release_year: 2010,
            synopsis: "Man rescues daughter from bad people",
            rating: 4,
            links: "link",
          },
        ],
      });
      const savedUser = await user.save();
      const userId = savedUser._id;
      const movieId = savedUser.watchLater[0]._id; // Replace with the actual movie ID
      const token = TokenGenerator.jsonwebtoken(userId);
  
      const response = await request(app)
        .delete(`/users/${userId}/watch-later/${movieId}`)
        .set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toEqual(200);
  
      const updatedUser = await User.findById(userId);
  
      expect(updatedUser.watchLater.length).toEqual(0);
    });
    
  });

})