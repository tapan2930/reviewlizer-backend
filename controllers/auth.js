const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User Signout !"
  })
};

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(422).json({
        errorMessage: ` ${errors.array()[0].param} : ${errors.array()[0].msg} `
      });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: ` ${errors.array()[0].param} : ${errors.array()[0].msg} `
        });
    }

    const {email,password} = req.body;

    User.findOne({email}, (err, user) =>{
        if(err || !user){
           return res.status(400).json({errorMessage: "No user found, Please check Email again."})
        }
        if(!user.autheticate(password)){
            return res.status(401).json({errorMessage: "Wrong Password, Please Check your Password again"})
        }

        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // put token in cookie
        res.cookie("token", token, {expire: new Date()+ 9999});
        
        // send response to frontend
        const {_id, name, email,role} = user;
        return res.json({token, user: {_id, name, email, role} });

    })
};

// Protected routes
exports.isSignedIn = expressJwt({
  secret:process.env.SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
  userProperty: "auth"
})

// Custom Routes
exports.isAuthenticated = (req,res, next) =>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker){
    return res.status(403).json({
      message: "ACCESS DENIED"
    })
  }
  next();
}
