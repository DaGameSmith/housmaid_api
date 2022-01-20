const sequelize = require("../database");
const Worker = require("../models/Worker");

module.exports.getWorkers = async(req, res) => {
    const workers = await Worker.findAll();
    if(workers === null){
        console.log("no workers found");
        res.json({message: "no workers found"});
    } else {
        res.status(200).json({workers});
    }
}

module.exports.getWorkersByJobType = async(req, res) => {
    const { job } = req.params;
    const workers = await Worker.findAll({ where: { jobType: job } });
    if(workers === null){
        console.log("no workers found");
        res.json({message: "no workers found"});
    } else {
        res.status(200).json({workers});
    }
}



module.exports.createWorker = async(req, res) => {
    const {cv, status, verified, isPetFriendly, jobTypes, Avaliability, workingHours, workExperience} = req.body;
    const worker = await Worker.create({
        cv, 
        status, 
        verified, 
        isPetFriendly, 
        jobTypes, 
        Avaliability, 
        workingHours, 
        workExperience
    });
    if(worker === null){
        console.log("create worker failed");
        res.json({message: "unable to create worker"});
    } else {
        res.status(200).json({worker});
    }
}
