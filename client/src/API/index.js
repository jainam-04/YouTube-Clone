import axios from "axios"
const API = axios.create({ baseURL: `http://localhost:5000` })
API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
      }
      return req
})

export const login = (authData) => API.post("/user/login", authData)
export const updateChannelData = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
export const fetchAllChannels = () => API.get("/user/get_all_channels")