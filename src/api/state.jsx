import api from "./axios"

export const CreateState = (data)=>{
    return api.post("/State/createState" , data)
}

export const getState= ()=>{
    return api.get("/State/getState")
}