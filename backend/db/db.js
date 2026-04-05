const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectDB=async()=>{
    try {
        const databases=await mongoose.connect(process.env.MONGO_DB);
        console.log(`MongoDB is connect`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports=connectDB;