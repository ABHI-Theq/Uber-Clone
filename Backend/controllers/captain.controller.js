import Captain from '../models/Captains.js';
import { validationResult } from 'express-validator';

// Register a captain
export const registerCap = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, color, type, capacity, plate } = req.body;

  try {
    // Check if the email is already registered
    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await Captain.hashPassword(password);

    // Create a new captain record
    const newCaptain = await Captain.create({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
      cleanPwd:password,
      vehicle: { color, type, capacity, plate },
    });

    // Generate authentication token
    const token = newCaptain.generateAuth();

    // Set token in cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(201).json({ captain: newCaptain, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login a captain
export const Logincap = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the captain by email
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatched = await captain.comparePassword(password, captain.password);
    if (!isMatched) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate authentication token
    const token = captain.generateAuth();

    // Set token in cookies
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({ captain, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


//showDetails

export const ShowDetails=async (req,res)=>{
  try{
      const captain=req.captain;
      res.status(201).json({captain})
  }
  catch(e){
      return res.status(401).json({error:'Unauthorized'})
  }
}

// Logout a captain
export const logout = async (req, res) => {
  res.clearCookie('jwt');
      req.headers.authorization=''
  return res.status(200).json({ message: 'Logged out successfully' });
};
