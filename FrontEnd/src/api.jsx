import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const binarySearchAPI = async (array, target) => {
  return axios.post(`${API_BASE_URL}/binary-search`, {
    array: array.split(",").map(Number),
    target: Number(target),
  });
};

export const quickSortAPI = async (array) => {
  return axios.post(`${API_BASE_URL}/quick-sort`, {
    array: array.split(",").map(Number),
  });
};

export const bfsAPI = async (graph, start) => {
  return axios.post(`${API_BASE_URL}/bfs`, {
    graph: JSON.parse(graph),
    start: Number(start),
  });
};
