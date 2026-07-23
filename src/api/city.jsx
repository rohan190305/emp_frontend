import api from "./axios"

export const createCity = (data)=>{
    return api.post("/City/createCity" , data)
}

export const getCity = ()=>{
    return api.get("/City/getCity")
}

export const getCityById = (id)=>{
    return api.get(`/City/getCityById/${id}`)
}

export const getCityByState = (stateid)=>{
    return api.get(`/City/getCityByState/${stateid}`)
}