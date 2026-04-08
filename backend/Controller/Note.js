const note = require('../Models/Notes');
const Crypto = require('crypto-js');
const dotenv = require('dotenv');
dotenv.config();
const CreateNote = async (req,res) => {
    try {
        const userID = req.user.id;
        const { title, content, tag, color } = req.body;
        if (!title || !content || !tag || !color) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        }
        const title_note = Crypto.AES.encrypt(title, process.env.SECRET).toString();
        const title_content = Crypto.AES.encrypt(content, process.env.SECRET).toString();
        const Notecreate = new note({ userID: userID, title: title_note, content: title_content, tag, color });
        await Notecreate.save();
        res.status(200).json({
            Notecreate: Notecreate
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const DecryptNote=async(req,res)=>{
    try {
        const userID=req.user.id;
        const FindNotes=await note.find({userID});
         const decrypt_note=FindNotes.map((i)=>{
            return {
                ...i._doc,
                title:Crypto.AES.decrypt(i.title,process.env.SECRET).toString(Crypto.enc.Utf8),
                content:Crypto.AES.decrypt(i.content,process.env.SECRET).toString(Crypto.enc.Utf8)
            }
         })
         res.status(200).json(decrypt_note)
    } catch (error) {
        
    }
}
const Delete_Note=async(req,res)=>{
    try {
        const {_id}=req.body;
        const Users=await note.deleteOne({_id})
        res.status(200).json({
            message:"User is Deleted",
            Users:Users

        })
    } catch (error) {
        
    }

}
module.exports = { CreateNote,DecryptNote,Delete_Note }