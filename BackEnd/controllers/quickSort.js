const asyncHandler = require("../Api/asyncHandler");
const Log = require("../models/log");
const ApiResponse = require("../Api/ApiResponse");
const ApiError = require("../Api/ApiError");
const {createLog} = require("./logs");
const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = arr.filter((x) => x < pivot);
    let right = arr.filter((x) => x > pivot);
    let middle = arr.filter((x) => x === pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
};

exports.quickSortAPI = asyncHandler(async (req, res, next) => {
    try {
        const { array } = req.body;

        if (!Array.isArray(array)) {
            throw new ApiError(400, "Invalid input! Expected an array.");
        }

        const sortedArray = quickSort(array);

        await createLog("Quick Sort", { array }, sortedArray);

        return res.status(200).json(new ApiResponse(200, { sortedArray }, "Quick sort executed successfully."));
    } catch (error) {
        throw new ApiError(401, error?.message || "Error executing quick sort.");
    }
});
