const express = require("express");
const router = express.Router();

const TitleController = require("../controllers/titleController");

router.get("/homepage/titleId", TitleController.Find);

module.exports = router;