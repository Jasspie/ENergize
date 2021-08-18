import axios from "axios";

// Unsplash API for the image search component
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY,
  },
});
