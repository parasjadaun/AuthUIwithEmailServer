const express=require('express');

const Router=express.Router();

const forgotPasswordController=require('../controllers/verify.controller.js');
const isUserExistController=require('../controllers/isUserExsits.controller.js');
const setNewPasswordController=require('../controllers/setNewPassword.controller.js');

Router.post('/sendVerificationCode',isUserExistController);
Router.post('/verifyOtp',forgotPasswordController);
Router.post('/setNewPassword',setNewPasswordController);

module.exports=Router;