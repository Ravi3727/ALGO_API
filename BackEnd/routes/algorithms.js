const express = require("express");
const { binarySearchAPI } = require("../controllers/binarySearch");
const { quickSortAPI } = require("../controllers/quickSort");
const { bfsAPI } = require("../controllers/bfs");

const router = express.Router();

router.post("/binary-search", binarySearchAPI);
router.post("/quick-sort", quickSortAPI);
router.post("/bfs", bfsAPI);

module.exports = router;
