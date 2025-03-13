const express = require("express");
const { getLogs,getLogsByAlgorithm } = require("../controllers/logs");

const router = express.Router();

router.get("/logs", getLogs);
router.get("/logs/filter", getLogsByAlgorithm);

module.exports = router;
