const express=require('express');
const {createAccountContorller} =require('../controllers/createAccountContorller')
const router = express.Router();

router.post('/',createAccountContorller);

module.exports.router = router