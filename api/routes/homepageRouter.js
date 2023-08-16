const express = require("express");
const router = express.Router();

const TitleController = require("../controllers/titleController");

router.get("/:id", TitleController.Find);
router.get("/bytitle/:title", TitleController.FindByTitle);


module.exports = router;