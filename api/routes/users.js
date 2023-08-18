const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:id", UsersController.FindWithId);
router.put("/:id", UsersController.Update);

module.exports = router;
