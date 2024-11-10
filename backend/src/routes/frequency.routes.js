const {Router} = require("express");
const {verifyURL}=require("../middlewares/urlChecker.js")
const router=Router();

const {higherFrequencyCalculator} = require("../controllers/frequency.controller.js");

router.route("/calculateFrequency").post(verifyURL,higherFrequencyCalculator);

module.exports = router;
