import React, { useState } from "react";
import { binarySearchAPI } from "../api";

const BinarySearch = () => {
    const [array, setArray] = useState("");
    const [target, setTarget] = useState("");
    const [result, setResult] = useState(null);

    const generateRandomInput = () => {
        const length = Math.floor(Math.random() * 10) + 5; 
        const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100)); 
        randomArray.sort((a, b) => a - b);
        const randomTarget = randomArray[Math.floor(Math.random() * randomArray.length)];

        setArray(randomArray.join(", "));
        setTarget(randomTarget);
    };

    const handleSearch = async () => {
        try {
            const response = await binarySearchAPI(array, target);
            setResult(response.data);
        } catch (error) {
            setResult({ error: error.response?.data?.message || "API Error" });
        }
    };

    return (
        <div className="flex flex-col justify-between h-full gap-8 p-2 w-full items-center">
            <h3 className="text-xl leading-8">Binary Search</h3>
            <input
                className="w-7/12 p-2 rounded-lg border-2 text-black"
                type="text"
                placeholder="Enter numbers (comma-separated)"
                value={array}
                onChange={(e) => setArray(e.target.value)}
            />
            <input
                className="w-6/12 p-2 rounded-lg border-2 text-black"
                type="number"
                placeholder="Enter target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <div className="flex gap-4">
                <button onClick={handleSearch} className="p-2 w-48 h-16 rounded-lg border-2 bg-gray-800 text-white">
                    Run Binary Search
                </button>
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
                            {result.data.result !== -1 ? <p className="leading-8 font-semibold">Target found at index <span className="text-green-500 font-bold">{result.data.result}</span></p>
                            : 
                            <div>
                                <p className="leading-8 font-semibold">Target not found</p>
                            </div>
                            }
                            <p className="leading-8 font-semibold">{result.message}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default BinarySearch;
