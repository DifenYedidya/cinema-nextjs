import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default client;
