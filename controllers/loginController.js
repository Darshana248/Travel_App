const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model'); // Import User model
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginController = async (req, res) => {
    const { number, password } = req.body;
  
    try {
      // Check if the user exists by email or number
      let user = await User.findOne({ number});
  
      if (!user) {
        return res.status(400).json({ message: 'number, or password' });
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email, number, or password' });
      }
  
      // Create and sign JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
      });

      const {password: _ , ...rest} = user._doc;
      // Send response with JWT token
      res.json({...rest, token});
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

module.exports = loginController;