const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

// Helper to send token as cookie
const sendToken = (user, res, message = '') => {
  const token = generateToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  res
    .status(200)
    .cookie('token', token, cookieOptions)
    .json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message,
    });
};

// POST /api/auth/register
exports.registerUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide username, email and password' });
  }

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });

    user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ message: 'User already exists with this username' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await user.save();

    sendToken(user, res, 'Registration successful');
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }

  try {
    // Include password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    sendToken(user, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/logout
exports.logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ message: 'Logged out successfully' });
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
