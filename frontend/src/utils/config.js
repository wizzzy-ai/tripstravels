const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3050/api";

export default BASE_URL;
