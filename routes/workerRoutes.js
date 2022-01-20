const { Router } = require("express");
const passport = require("passport");
const { getWorkers, getWorkersByJobType, createWorker } = require("../controllers/workerControllers");

const router = Router();

router.get('/all-workers', passport.authenticate("jwt", {session: false}), getWorkers);
router.get('/workers-by-job-type/:job', getWorkersByJobType);
router.post('/create-worker', createWorker);
router.post('/')


module.exports = router;