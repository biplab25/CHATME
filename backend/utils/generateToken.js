import jwt  from "jsonwebtoken";

const generateTokenAndSetCookie =(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("token",token,{
        // expires:new Date(Date.now()+60*60*24*1000),
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict", //csrf protection
        secure:process.env.NODE_ENV !== 'development'
    })
    // res.status(200).json({
    //     message:"Token generated successfully"
    // })
}

export default generateTokenAndSetCookie;