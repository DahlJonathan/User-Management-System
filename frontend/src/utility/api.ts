import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: { "Content-Type": "application/json" }
});

export const FetchData = async <T>(url: string): Promise<T> => {
    try {
        const response = await apiClient.get<T>(url);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Haku epäonnistui";
        throw new Error(message);
    }
}