const asyncHandler = require("../Api/asyncHandler");
const Log = require("../models/log");
const ApiResponse = require("../Api/ApiResponse");
const ApiError = require("../Api/ApiError");

exports.getLogs = asyncHandler(async (req, res, next) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(50);

        if (!logs || logs.length === 0) {
            throw new ApiError(404, "No logs found!");
        }

        return res.status(200).json(new ApiResponse(200, logs, "Logs fetched successfully."));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error fetching logs.");
    }
});



exports.createLog = asyncHandler( async (algorithm, input, output) => {
    try {
        await Log.create({ algorithm, input, output });
    } catch (error) {
        throw new ApiError(401, error?.message || "Error executing quick sort.");
    }
});



exports.getLogsByAlgorithm = asyncHandler(async (req, res, next) => {
    try {
        const { algorithm } = req.query;

        if (!algorithm) {
            throw new ApiError(400, "Missing 'algorithm' query parameter!");
        }

        const logs = await Log.find({ algorithm }).sort({ timestamp: -1 });

        if (!logs || logs.length === 0) {
            throw new ApiError(404, `No logs found for algorithm: ${algorithm}`);
        }

        return res.status(200).json(new ApiResponse(200, logs, `Logs for ${algorithm} fetched successfully.`));
    } catch (error) {
        throw new ApiError(500, error?.message || "Error fetching logs.");
    }
});


