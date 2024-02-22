import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup=async(req, res) => {
    try {
        const {fullName,userName,password,confirmPassword,gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            })
        }

        const user= await User.findOne({userName});
        if(user) {
            return res.status(400).json({
                error: "User already exists"
            })
        }

        //HASH PASSWORDWORD HERE
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const boyProfilePicture =`https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePicture =`https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic:gender==='male' ?boyProfilePicture :girlProfilePicture,
        })

        if(newUser){
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
        }
        else{
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
    } catch (error) {
        
    }
}

export const login=async(req, res) => {
    try {
        const {userName,password} = req.body;
        const user= await User.findOne({userName});
        const isPassworsCorrect = await bcryptjs.compare(password,user?.password ||"")
        if(!user) { return res.status(400).json({ error: "User does not exist" }) }

        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout=async(req, res) => {
    try {
        res.cookie("token","",{maxAge:0});
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}