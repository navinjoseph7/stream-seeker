const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:id", UsersController.FindWithId);
router.put("/:id", UsersController.Update);

// Add a movie to watch later
router.post("/:id/watch-later", UsersController.AddMovieToWatchLater);

// Remove a movie from watch later
router.delete("/:id/watch-later/:movieId", UsersController.RemoveMovieFromWatchLater);

// Get all watch later movies
router.get("/:id/watch-later", UsersController.GetWatchLaterMovies);

module.exports = router;