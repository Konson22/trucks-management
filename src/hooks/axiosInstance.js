import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL:process.env.REACT_APP_BACK_END_URL,
  // baseURL:'https://trucks-management-backend.onrender.com',
  baseURL:'https://wlc-api.onrender.com',
  // withCredentials: true, 
  // credentials: 'include'
})

export default axiosInstance
