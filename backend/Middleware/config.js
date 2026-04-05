const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const Verifyauth=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(500).json({
                message:"Access denied"
            })
        }
        const verifyUser=jwt.verify(token,process.env.SECRET);
        req.user=verifyUser;
        next();
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}
module.exports=Verifyauth;