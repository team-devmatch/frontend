import axios from "axios";

export const getRecentFestivals = async () => {
  try {
    const res = await axios.get("http://localhost:8080/festivals/recent");
    return res.data;
  } catch (error) {
    console.error("API 에러:", error);
    return [];
  }
};
