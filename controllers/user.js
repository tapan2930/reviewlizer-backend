const User = require("../models/user");


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


exports.addToSavedProducts = (req, res) =>{
    console.log("helllllllloooooo",req.body)
    let product = req.body
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            { $push: { savedProducts: [product] } }, 
            {new: true, useFindAndModify: false},
            (err,user)=>{
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


exports.deleteFromSavedProducts = (req, res) =>{
    
    let productId = req.body.productId
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            { $pull: { savedProducts: {'id': productId} } }, 
            {new: true, useFindAndModify: false},
            (err,user)=>{
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


exports.addToProductHistory = (req, res) =>{
    console.log("helllllllloooooo",req.body)
    let product = req.body
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            { $push: { recentlySearchedProducts: [product] } }, 
            {new: true, useFindAndModify: false},
            (err,user)=>{
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


exports.deleteFromProductHistory = (req, res) =>{
    
    let productId = req.body.productId
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            { $pull: { recentlySearchedProducts: {'id': productId} } }, 
            {new: true, useFindAndModify: false},
            (err,user)=>{
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