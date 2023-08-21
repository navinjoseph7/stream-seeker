const express = require("express");
const router = express.Router();

const TitleController = require("../controllers/titleController");

router.get("/:id", TitleController.Find);
router.get("/bytitle/:title", TitleController.FindByTitle);
router.get("/bytitle/:titleid", TitleController.FindLinks)

module.exports = router;