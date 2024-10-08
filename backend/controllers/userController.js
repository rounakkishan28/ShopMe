import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, generatedOtp, otp } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    if (!otp || !generatedOtp || generatedOtp != otp) return res.json({ message: 'Invalid OTP' })
    let user;
    try {
        user = await User.create({ name, email, password });
    } catch (error) {
        console.log(error)
    }

    const token = generateToken(user._id);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            success: true
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Authenticate user
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const token = generateToken(user._id);

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            success: true
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
};

// Update password
const updatePassword = async (req, res) => {
    const { email, password, generatedOtp, otp } = req.body;
    if (!otp || !generatedOtp || otp != generatedOtp) return res.json({ message: 'Invalid OTP' });
    const user = await User.findOne({ email });
    if (!user) {
        res.json({ message: "User doesn't exist." });
    }
    user.password = password;
    await user.save();
    res.json({ success: true, message: "Password Updated" });
}

// Add new address
const addNewAddress = async (req, res) => {
    const user = req.user;
    if(!user){
        res.json({ success: false, message: 'User not found' });
    }
    const newAddress = req.body;
    user.addresses.push(newAddress);
    await user.save();
    res.json({ success: true, message: "Address Added." });
}

// Get saved addresses
const getAddresses = async (req, res) => {
    const user = req.user;
    if(user){
        const addresses = user.addresses;
        res.json({ addresses, success: true, message: 'Addresses found'});
    }
    else {
        res.json({success: false, message: 'User not found' });
    }
}

// Get user profile
const getUserProfile = async (req, res) => {

    const user = req.user
    if (user) {
        res.json({ user, success: true, message: 'User found' });
    }
    else {
        res.status(401).json({ success: false, message: "User not found" });
    }

};

export { registerUser, authUser, updatePassword, addNewAddress, getAddresses, getUserProfile };
