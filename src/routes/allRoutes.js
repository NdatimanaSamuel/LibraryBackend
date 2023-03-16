const express =require('express');
const {CreateRoute} =require('./CreateRoute')
const router= express.Router();

//all routes

router.use("/create", CreateRoute);



module.exports.router = router