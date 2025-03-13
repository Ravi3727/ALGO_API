import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1"; // Replace with your deployed backend URL

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  // Fetch logs from API
  const fetchLogs = async () => {
    setLoading(true);
    try {
      let response;
      if (algorithm) {
        response = await axios.get(`${API_BASE_URL}/logs/filter`, {
          params: { algorithm },
        });
      } else {
        response = await axios.get(`${API_BASE_URL}/logs`);
      }
      setLogs(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch logs");
      setLogs([]);
    }
    setLoading(false);
  };

  // Fetch logs when component loads or algorithm filter changes
  useEffect(() => {
    fetchLogs();
  }, [algorithm]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold leading-8">Logs</h2>

      {/* Algorithm filter dropdown */}
      
      
        <select className="text-black rounded-lg p-1 leading-10" onChange={(e) => setAlgorithm(e.target.value)} value={algorithm}>
        <option value="">All Logs</option>
          <option value="Binary Search">Binary Search</option>
          <option value="Quick Sort">Quick Sort</option>
          <option value="BFS">BFS</option>
          
        </select>

      <button onClick={fetchLogs} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">Refresh</button>

      {/* Display Logs */}
      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <div className="w-10/12 "> 
          {logs.map((log) => (
            <div key={log._id} className="border-2 p-2 my-2 rounded-lg leading-7">
              <strong>Algorithm:</strong> {log.algorithm} <br />
              <strong>Input:</strong> {JSON.stringify(log.input)} <br />
              <strong>Output:</strong> {JSON.stringify(log.output)} <br />
              <strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()} <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Logs;
