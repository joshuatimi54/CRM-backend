const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: 'admin'
    },
    refreshToken: {
        type: String
    }
});


adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
});

adminSchema.methods.isPasswordMatched = async function(newPassword){
    return await bcrypt.compare(newPassword, this.password)
}


//Export the model
module.exports = mongoose.model('Admin', adminSchema);