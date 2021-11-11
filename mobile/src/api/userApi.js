import axiosClient from "./axiosClient";

const userApi = {
  
    login(data)
    {
        const url = '/users/login';
        return axiosClient.post(url, data);
    },
    async getAll(params)
    {
        const url = '/users/danhsach';
        return axiosClient.get(url, {params});
    },
    get(id)
    {
        const url = `/users/single/${id}`;
        return axiosClient.get(url);
    }
   
    
};
export default userApi;