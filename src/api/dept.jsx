import api from "./axios"

export const CreatDept = (data)=>{
    return api.post("/Dept/createDept" , data)
}

export const getDept = ()=>{
    return api.get("/Dept/getDept")
}

export const deleteDept = (id) =>{
    return api.delete(`/Dept/deleteDept/${id}`)
}
