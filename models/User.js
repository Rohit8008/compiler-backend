import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String , default:''},
    verifyOtpExpireAt: { type: Number, default:0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String , default:'' },
    resetOtpExpiresAt: { type: Number, default:0 },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model.user || mongoose.model('User', userSchema);

export default User;