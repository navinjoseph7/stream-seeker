const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const jwt = require('jsonwebtoken');

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  FindWithId: (req, res) => {
    try {
      const token = req.headers["authorization"].split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const signedInUserId = decodedToken.user_id;
      const urlId = req.params.id

      if (signedInUserId !== urlId) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
      
        User.findById(urlId, (err, user) => {
          if (err) {
            res.status(400).json({message: 'Bad request'})
          }
          if (!user) {
            res.status(404).json({message: 'User not found'}) 
          } else {
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(200).json({id: user.id, 
                email: user.email, 
                name: user.name,
                subscriptions: user.subscriptions,
                genres: user.genres,
                token: token})
            } 
        })
      }
    } catch (error) {
      return res.status(401).json({ "error": error });
    }
  },

  Update: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.subscriptions = req.body.subscriptions;
    user.genres = req.body.genres

    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Unauthorised" });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, user: user});
      console.log("HERE", user)
    });
  },
  
};

module.exports = UsersController;
