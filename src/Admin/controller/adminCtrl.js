const generateToken = require('../config/adminToken');
const generateRefreshToken = require('../config/refToken');
const Admin = require('../models/amdinAuth');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

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
    if(findadmin.role !== 'admin') throw new Error('Not Authorized....!!')
    if(findadmin && (await findadmin.isPasswordMatched(password))){

        const refreshToken = generateRefreshToken(findadmin?._id);
        const admin = await Admin.findByIdAndUpdate(
            findadmin.id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })

        res.json({
            _id: findadmin?._id,
            name: findadmin?.name,
            email: findadmin?.email,
            mobile: findadmin?.mobile,
            password: findadmin?.password,
            role: findadmin?.role,
            token: generateToken(findadmin?._id)
        })

        
        

    }else{
        throw new Error('Wrong Admin Details...!!')
    }

});


const cookieHanlder = asyncHandler(async (req, res) => {

    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) throw new Error('There is not cookie in your token..!');
    const refreshToken = cookie.refreshToken;
    const admin = await Admin.findOne({ refreshToken });
    if (!admin) throw new Error('There is not token attached in your db..!');
    jwt.verify(refreshToken, process.env.MONGO_DB_SECRET, (err, decoded) => {
        if (err || admin.id !== decoded.id) {
            throw new Error('Something Went Wrong in your Db....!')
        }
        const accessToken = generateToken(admin?._id);
        res.json({ accessToken })
    })

});


const userLogout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    // if (!cookie?.refreshToken) throw new Error('There is not cookie in your token..!');
    const refreshToken = cookie.refreshToken;
    const admin = await Admin.findOne({ refreshToken });
    if (!admin) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(203)
    };
    await Admin.findOneAndUpdate({ refreshToken }, {
        refreshToken: ""
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });
    res.sendStatus(203)
});

module.exports = {
    createAdmin,
    adminLogin,
    cookieHanlder,
    userLogout
}