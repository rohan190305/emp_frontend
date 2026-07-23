const sercret_token = "unique_key"

export const getToken = ()=>{
    return localStorage.getItem(sercret_token)
}

export const createToken = (token)=>{
    localStorage.setItem(sercret_token,token)
}

export const clearToken = ()=>{
    localStorage.removeItem(sercret_token)
}
