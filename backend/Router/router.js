const express=require('express');
const router=express.Router();
const{CreateUser,LoginUser,Logout}=require('../Controller/User');
router.post('/create',CreateUser);
router.post('/login',LoginUser);
router.post('/logout',Logout)
module.exports=router;