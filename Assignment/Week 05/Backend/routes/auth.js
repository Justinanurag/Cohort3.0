import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../modals/User';


const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ userName, email, password });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json ({ token, user: { id: user._id, userName, email } });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, userName: user.userName, email } });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
