const asyncHandler = require("../Api/asyncHandler");
const Log = require("../models/log");
const ApiResponse = require("../Api/ApiResponse");
const ApiError = require("../Api/ApiError");
const {createLog} = require("./logs");


const binarySearch = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        arr[mid] < target ? (left = mid + 1) : (right = mid - 1);
    }
    return -1;
};

exports.binarySearchAPI = asyncHandler(async (req, res, next) => {
    try {
        const { array, target } = req.body;

        if (!Array.isArray(array) || typeof target !== "number") {
            throw new ApiError(400, "Invalid input! Expected an array and a number.");
        }

        const sortedArray = [...array].sort((a, b) => a - b);
        const result = binarySearch(sortedArray, target);


        await createLog("Binary Search", { array, target }, result);

        return res.status(200).json(new ApiResponse(200, { result }, "Binary search executed successfully (Followed 0- based array indexing)."));
    } catch (error) {
        throw new ApiError(401, error?.message || "Error executing binary search.");
    }
});
