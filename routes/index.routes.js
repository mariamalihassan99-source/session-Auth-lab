const router = require("express").Router()
const isSignedIn = require("../middleware/is-signed-in") // middleware to check if user is signed in

router.get('/', isSignedIn, (req,res)=>{ // only allow access if user is signed in
    res.render('homepage.ejs')
})
module.exports = router;

