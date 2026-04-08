const express=require('express');
const router=express.Router();
const{CreateUser,LoginUser,Logout}=require('../Controller/User');
const{CreateNote,DecryptNote,Delete_Note}=require('../Controller/Note');
const verifyauth=require('../Middleware/config')
router.post('/create',CreateUser);
router.post('/login',LoginUser);
router.post('/logout',Logout);
router.post('/notes',verifyauth,CreateNote);
router.get('/fetchnote',verifyauth,DecryptNote);
router.post('/deletenote',Delete_Note)
module.exports=router;