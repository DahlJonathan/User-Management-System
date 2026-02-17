import axios, { type AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const FetchData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await apiClient.request<T>({
            url,
            method: config?.method || 'GET',
            ...config
        });
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Operaatio epäonnistui";
        throw new Error(message);
    }
}