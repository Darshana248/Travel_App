const express = require('express');

const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");

const router = express.Router();

// Registration Route
router.route('/register')
.post(signupController);

module.exports = router;

router.route('/login')
.post(loginController);

module.exports = router;