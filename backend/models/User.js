import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';

const { genSalt, hash, compare } = pkg;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    },
    wishListData: {
        type: Object,
        default: {}
    },
    addresses: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

export default model('User', userSchema);
