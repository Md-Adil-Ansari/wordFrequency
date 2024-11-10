import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:3000'
})

export const getURLData=(data)=>{
    return api.post("/api/v1/calculateFrequency",data);
}