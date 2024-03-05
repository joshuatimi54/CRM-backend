const Admin = require('../models/amdinAuth');
const asyncHandler = require('express-async-handler');

const createAdmin = asyncHandler(async(req, res) => {

    const email = req.body.email;
    const findadmin = await Admin.findOne({ email: email });
    if(!findadmin){
        
        const newadmin = await Admin.create(req.body);
        res.json(newadmin)

    }else{
        throw new Error('Admin Allready Craeted.....!!')
    }

});

const adminLogin = asyncHandler(async(req, res) => {

    const { email, password } = req.body;
    const findadmin = await Admin.findOne({ email });
    if(findadmin && (await findadmin.isPasswordMatched(password))){
        res.json({
            _id: findadmin?._id,
            name: findadmin?.name,
            email: findadmin?.email,
            mobile: findadmin?.mobile,
            password: findadmin?.password,
            role: findadmin?.role
        })
    }else{
        throw new Error('Wrong Admin Details...!!')
    }

})

module.exports = {
    createAdmin,
    adminLogin
}