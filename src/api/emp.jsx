import api from "./axios"

export const CreateEmp = (formdata)=>{
    return api.post("/Emp/addEmp" , formdata) 
}

export const getAllEmp = ()=>{
    return api.get("/Emp/getemp")
}

export const getEmpById = (id)=>{
    return api.get(`/Emp/getById/${id}`)
}

export const editEmp = (id, formdata)=>{
    return api.patch(`/Emp/editEmp/${id}`, formdata)
}

export const deleteEmp = (id)=>{
    return api.delete(`/Emp/deleteById/${id}`)
}