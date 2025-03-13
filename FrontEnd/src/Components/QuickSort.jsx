import React, { useState } from "react";
import { quickSortAPI } from "../api";

const QuickSort = () => {
  const [array, setArray] = useState("");
  const [result, setResult] = useState(null)
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRandomInput = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100));
    const randomTarget = randomArray[Math.floor(Math.random() * randomArray.length)];

    setArray(randomArray.join(", "));
    setTarget(randomTarget);
  };

  const handleSort = async () => {
    try {
      setLoading(true);
      const response = await quickSortAPI(array);
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      setResult({ error: error.response?.data?.message || "API Error" });
      setLoading(false);
    }
  };

  return (

    <>

      <div className="flex flex-col justify-evenly h-full gap-8 w-full items-center">
        <h3 className="text-xl leading-8">Quick Sort</h3>
        <input
          className="w-6/12 p-2 rounded-lg border-2 text-black"
          type="text"
          placeholder="Enter numbers (comma-separated)"
          value={array}
          onChange={(e) => setArray(e.target.value)}
        />
        <div className="flex gap-4">
          {loading ?
            <div>
              <p className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white items-center text-center justify-center flex cursor-not-allowed">Running QS...</p>
            </div>
            : <button onClick={handleSort} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">
              Run Quick Sort
            </button>}
          <button onClick={generateRandomInput} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">
            Generate Random Input
          </button>
        </div>
        {result &&
          <div className="flex flex-col items-center justify-center w-8/12 text-center">
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <div>

                <p className="leading-8 font-semibold">
                  Sorted Array:  <span className="text-green-500">{result.data.sortedArray.join(", ")}</span>
                </p>
                <p className="leading-8 font-semibold">{result.message}</p>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default QuickSort;
