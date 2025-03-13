import React, { useState } from "react";
import { bfsAPI } from "../api";

const BFS = () => {
  const [graph, setGraph] = useState("");
  const [startNode, setStartNode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to generate random input
  const generateRandomInput = () => {
    const numNodes = Math.floor(Math.random() * 5) + 3; // Random nodes (3 to 7)
    let randomGraph = {};

    for (let i = 0; i < numNodes; i++) {
      const numEdges = Math.floor(Math.random() * (numNodes - 1)); // Random edges per node
      const edges = new Set();
      while (edges.size < numEdges) {
        let neighbor = Math.floor(Math.random() * numNodes);
        if (neighbor !== i) edges.add(neighbor); // Avoid self-loops
      }
      randomGraph[i] = [...edges];
    }

    setGraph(JSON.stringify(randomGraph, null, 2)); // Format as JSON
    setStartNode(Math.floor(Math.random() * numNodes)); // Pick a random start node
  };

  const handleBFS = async () => {
    try {
      setLoading(true);
      const response = await bfsAPI(graph, startNode);
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      setResult({ error: error.response?.data?.message || "API Error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-evenly  h-full gap-8  w-full items-center">
      <h3 className="text-lg">Breadth-First Search</h3>
      <textarea
        className="w-6/12 p-2 rounded-lg border-2 text-black"
        placeholder='Enter graph as JSON (e.g., {"0":[1,2],"1":[3],"2":[]})'
        value={graph}
        onChange={(e) => setGraph(e.target.value)}
        rows="3"
      />
      <input
        className="w-6/12 p-2 rounded-lg border-2 text-black"
        type="number"
        placeholder="Start Node"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <div className="flex gap-4">
       {loading ? 
       <div>
          <p className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white items-center text-center justify-center flex cursor-not-allowed">Running BFS...</p>
       </div>
       : <button onClick={handleBFS} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">
          Run BFS
        </button>}
        <button onClick={generateRandomInput} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">
          Generate Random Input
        </button>
      </div>
      {result && (
        <div className="flex flex-col items-center justify-center w-8/12 text-center">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div>
              <p className="leading-8 font-semibold">Trversal: <span className="text-green-500 font-bold">{result.data.traversal.join(", ")}</span></p>
              <p className="leading-8 font-semibold">{result.message}</p>
              {/* {JSON.stringify(result)} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BFS;
