import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res) =>{
    try {
        const loggedInuser=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInuser}}).select('-password');
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("getUsersForSidebar Error",error);
        res.status(500).send("Internal Server Error");
    }
}