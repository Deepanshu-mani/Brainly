export const BACKEND_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : "https://brainly-backendd.onrender.com";