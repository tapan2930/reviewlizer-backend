var express =  require('express')
var router = express.Router()
const {signout, signup,signin, isSignedIn} = require("../controllers/auth")
const {signupValidation,signinValidation} = require("../validators/signupValidator")



router.post("/signup",signupValidation, signup)
router.post("/signin",signinValidation, signin)
router.get("/signout",signout)
router.get("/testroute", isSignedIn, (req,res) =>{
   return  res.send("A proyected route")
} )


module.exports   = router;