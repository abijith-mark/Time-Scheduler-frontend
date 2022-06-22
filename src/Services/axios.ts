import axios, { AxiosInstance } from "axios";

const instance : AxiosInstance = axios.create({baseURL:'http://localhost:3000/v1'})

export default instance;