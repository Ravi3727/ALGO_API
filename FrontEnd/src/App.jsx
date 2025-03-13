import React, { useState } from "react";
import BinarySearch from "./Components/BinarySearch";
import QuickSort from "./Components/QuickSort";
import BFS from "./Components/Bfs";
import Logs from "./Components/Logs";

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("binary-search");


  return (
    <div className="font-termina w-full min-h-screen flex flex-col items-center justify-center " style={{
      "background-color": "#2d3436",
      "background-image": "linear-gradient(315deg, #2d3436 0%, #000000 74%)"
    }}>


      <div className=" h-24 mt-8">
        <h2 className="text-3xl font-bold text-purple-700 leading-32 font-termina">Algorithm API Tester</h2>
      </div>

      <div className="w-6/12 min-h-10/12 h-full space-y-10 p-4 border-2 mb-4 border-white text-white rounded-lg shadow-xl">
        <select className="text-black rounded-lg p-1 leading-10" onChange={(e) => setSelectedAlgorithm(e.target.value)} value={selectedAlgorithm}>
          <option value="binary-search">Binary Search</option>
          <option value="quick-sort">Quick Sort</option>
          <option value="bfs">BFS</option>
          <option value="logs">View Logs</option>
        </select>

        <div className="mt-20">
          {selectedAlgorithm === "binary-search" && <BinarySearch />}
          {selectedAlgorithm === "quick-sort" && <QuickSort />}
          {selectedAlgorithm === "bfs" && <BFS />}
          {selectedAlgorithm === "logs" && <Logs />}
        </div>
      </div>
    </div>
  );
}

export default App;
