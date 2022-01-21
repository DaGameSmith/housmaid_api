const { Router } = require("express");
const passport = require("passport");
const { getWorker, getWorkers, getWorkersByJobType, createWorker } = require("../controllers/workerControllers");

const router = Router();

router.get('/worker', passport.authenticate("jwt", {session: false}), getWorker);
router.get('/all-workers', passport.authenticate("jwt", {session: false}), getWorkers);
router.get('/workers-by-job-type/:job', passport.authenticate("jwt", {session: false}), getWorkersByJobType);
router.post('/create-worker', passport.authenticate("jwt", {session: false}), createWorker);



module.exports = router;