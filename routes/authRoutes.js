const { Router } = require("express");
const passport = require("passport");
const { signupWorker, signupCustomer, signupAdmin, loginWorker, loginCustomer, loginAdmin, verifyOtp, sendOtp } = require("../controllers/authControllers");

const router = Router();

router.post('/signup-worker', signupWorker);
router.post('/signup-customer', signupCustomer);
router.post('/signup-admin', signupAdmin);

router.post('/login-worker', loginWorker);
router.post('/login-customer', loginCustomer);
router.post('/login-admin', loginAdmin);

router.post('/send-otp', passport.authenticate("jwt", {session: false}), sendOtp);
router.post('/verify-otp', passport.authenticate("jwt", {session: false}), verifyOtp);


module.exports = router;