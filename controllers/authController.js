// controllers/authController.js

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    // Authenticate user...
    // Assuming you have verified the user's credentials and retrieved their email
    const userEmail = req.body.email; // Example: Assuming email is in the request body

    // If authentication is successful, generate JWT token
    const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
