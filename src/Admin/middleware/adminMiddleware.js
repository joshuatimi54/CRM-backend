const Admin = require('../models/amdinAuth');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')


// this is our admin token

const adminMiddleware = asyncHandler(async(req, res, next) => {

    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1];
        try{

            if(token){
                const decoded = jwt.verify(token, process.env.MONGO_DB_SECRET);
                const user = await Admin.findById(decoded?.id);
                req.user = user;
                next();
            }

        }catch{
            throw new Error('There is not attched token in yoyr db..!')
        }

    }else{
        throw new Error('Something Went Wrong in your token...!')
    }


});


// when other try to logedin then show this error message you are not admin

const isAdmin = asyncHandler(async (req, res, next) => {
    const {email} = req.user;
    const useradmin = await Admin.findOne({ email });
    if(useradmin.role !== 'admin'){
        throw new Error('You Are Not Admin....!')
    }else{
        next()
    }
})

module.exports = {
    adminMiddleware,
    isAdmin
}