import axios from "axios";

export const getRecentFestivals = async () => {
  try {
    const res = await axios.get("http://192.168.0.179:8080/festivals/recent");
    return res.data;
  } catch (error) {
    console.error("API 에러:", error);
    return [];
  }
};
