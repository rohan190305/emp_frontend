import axios from "axios"
import { API_URI } from "../constants/api"
import { clearToken , getToken } from "../token/token"

 const api =axios.create({
    baseURL:API_URI,
    timeout:100000,
    // headers:{'Content-Type':'application/json'}
})

api.interceptors.request.use(
    (config)=>{
        const token = getToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        if(error.response.status === 401){
            clearToken()
        }
        return Promise.reject(error)
    }
)

export default api