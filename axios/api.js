import axios from 'axios';

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_PROD_STATE === 'true') {
    return process.env.NEXT_PUBLIC_PROD_API_URL; 
  } else if (process.env.NEXT_PUBLIC_PROD_STATE === 'false') {
    return process.env.NEXT_PUBLIC_PREVIEW_API_URL;
  } else {
    // Default (development or if variables aren't set)
    return 'http://localhost:5000';
  }
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;