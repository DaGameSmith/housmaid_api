const { Router } = require("express");
const passport = require("passport");
const { signupWorker, signupCustomer, signupAdmin, loginWorker, loginCustomer, loginAdmin, sendOtp } = require("../controllers/authControllers");
const { setUserData } = require("../controllers/userControllers");

const router = Router();

router.post('/signup-worker', signupWorker);
router.post('/signup-customer', signupCustomer);
router.post('/signup-admin', signupAdmin);

router.post('/login-worker', loginWorker);
router.post('/login-customer', loginCustomer);
router.post('/login-admin', loginAdmin);

router.post('/send-otp', sendOtp);

router.post('/setup-user', passport.authenticate("jwt", {session: false}), setUserData);


module.exports = router;