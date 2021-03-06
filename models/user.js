const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1 : uuidv1 } = require('uuid');


const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    // TODO: come back here
    secure_password: {
        type: String,
        required : true,
    },
    salt: String,
    savedProducts: {
        type: Array,
        default: []
    },
    recentlySearchedProducts: {
        type: Array,
        default: []
    }
}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.secure_password = this.securePassword(password)

    })
    .get(function(){
        return this._password
    })


userSchema.methods = {
    
    autheticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.secure_password
    },

    securePassword: function(plainPassword){
        if (!plainPassword) return "";
        try{

            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch(err){
            return ""
        }
    }
}

module.exports =  mongoose.model("User", userSchema )