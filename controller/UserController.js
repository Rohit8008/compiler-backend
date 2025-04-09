import User from "../models/User.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // The user ID should be available from the auth middleware
    const userId = req.user.id;
    
    // Find the user by ID, excluding sensitive information
    const user = await User.findById(userId).select('-password -resetOtp -resetOtpExpiresAt -verifyOtp -verifyOtpExpireAt');
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.json({ success: false, message: "Failed to fetch user profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    
    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }
    
    // Find and update the user
    const user = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true, select: '-password -resetOtp -resetOtpExpiresAt -verifyOtp -verifyOtpExpireAt' }
    );
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.json({ success: false, message: "Failed to update user profile" });
  }
};
