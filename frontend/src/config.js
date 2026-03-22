const API_CONFIG = {
  development: 'http://localhost:5000',
  production: process.env.REACT_APP_API_URL || 'https://ar-note-backend.vercel.app'
};

const environment = process.env.NODE_ENV || 'development';
export const API_BASE_URL = API_CONFIG[environment];