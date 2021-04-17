const express = require("express")
const router = express.Router()

const {getUserById,
       getUser, 
       addToSavedProducts,
       deleteFromSavedProducts,
       deleteFromProductHistory,
       addToProductHistory} = require("../controllers/user")

const {isSignedIn, isAuthenticated} = require("../controllers/auth")

router.param("userId", getUserById )
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/updateSaved/add/:userId", isSignedIn, isAuthenticated, addToSavedProducts)
router.put("/user/updateSaved/delete/:userId", isSignedIn, isAuthenticated, deleteFromSavedProducts)
router.put("/user/updateHistory/add/:userId", isSignedIn, isAuthenticated, addToProductHistory)
router.put("/user/updateHistory/delete/:userId", isSignedIn, isAuthenticated, deleteFromProductHistory)


module.exports = router
