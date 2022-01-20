const { Router } = require("express");
const { signupWorker, signupCustomer, signupAdmin, loginWorker, loginCustomer, loginAdmin } = require("../controllers/authControllers");

const router = Router();

router.post('/signup-worker', signupWorker);
router.post('/signup-customer', signupCustomer);
router.post('/signup-admin', signupAdmin);

router.post('/login-worker', loginWorker);
router.post('/login-customer', loginCustomer);
router.post('/login-admin', loginAdmin);




module.exports = router;