const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model'); // Import User model
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const signupController = async (req, res) => {
    const { username, number, email, password } = req.body;
  
    try {
      // Check if user with the email or number already exists
      let user = await User.findOne({ $or: [{ email }, { number }] });
      if (user) {
        return res.status(400).json({ message: 'User with this email or number already exists' });
      }
  
      // Create a new user instance
      const newUser = new User({
        username,
        number,
        email,
        password,
      });
  
      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await newUser.save();
  
      // Create and sign JWT token
      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Send response with JWT token
      res.status(201).json({ token });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

module.exports = signupController;