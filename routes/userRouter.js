const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
  checkIfUserAlreadyExists,
} = require("../controllers/userController");
const router = express.Router();

router.post("/", registerUser); // create a user
router.post("/login", loginUser); // login a user
router.get("/all", allUsers); // all users
router.post("/check", checkIfUserAlreadyExists); // check user exists

module.exports = router;
