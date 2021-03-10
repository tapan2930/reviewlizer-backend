const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec( (err, user) => {
        if(err || !user){
            return res.status(403).json({
                "message" : "Err: User not found"
            })
        }

        req.profile = user
        next();
    })
}

exports.getUser = (req,res) =>{
    // TODO: get back here for password
    req.profile.salt = undefined;
    req.profile.secure_password = undefined
    req.profile.updatedAt = undefined
    req.profile.createdAt = undefined
    return res.json(req.profile)
}

exports.userUpdate = (req,res) =>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) =>{
            if(err || !user){
                return res.status(403).json({
                    "message": "err: Not UPDATE not completed."
                })
            }
            user.salt = undefined;
            user.secure_password = undefined
            user.updatedAt = undefined
            user.createdAt = undefined
            return res.json(user)
        }

    )
}


exports.userPurchaseList = (req, res) =>{
        Order.find({user: req.profile._id})
        .populate("user", "_id name")
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error: "No order in this account"
                })
            }

            return res.json(order)
        })
}