const asyncHandler = require("../Api/asyncHandler");
const Log = require("../models/log");
const ApiResponse = require("../Api/ApiResponse");
const ApiError = require("../Api/ApiError");
const {createLog} = require("./logs");


const bfs = (graph, start) => {
    let queue = [start], visited = new Set(), result = [];
    visited.add(start);

    while (queue.length) {
        let node = queue.shift();
        result.push(node);
        for (let neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
            }
        }
    }
    return result;
};

exports.bfsAPI = asyncHandler(async (req, res, next) => {
    try {
        const { graph, start } = req.body;

        if (typeof graph !== "object" || typeof start !== "number") {
            throw new ApiError(400, "Invalid input! Expected an object (graph) and a number (start node).");
        }

        const traversal = bfs(graph, start);

        await createLog("BFS", { graph, start }, traversal);

        return res.status(200).json(new ApiResponse(200, { traversal }, "BFS traversal executed successfully."));
    } catch (error) {
        throw new ApiError(401, error?.message || "Error executing BFS traversal.");
    }
});
