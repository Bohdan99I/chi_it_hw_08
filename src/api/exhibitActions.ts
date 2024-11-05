import axiosInstance from './axiosInstance';

export const fetchExhibits = async () => {
    const response = await axiosInstance.get('/exhibits');
    return response.data;
};

export const fetchMyExhibits = async () => {
    const response = await axiosInstance.get('/exhibits/mine');
    return response.data;
};

export const fetchExhibitById = async (id: string) => {
    const response = await axiosInstance.get(`/exhibits/${id}`);
    return response.data;
};

export const createExhibit = async (exhibit: any) => {
    const response = await axiosInstance.post('/exhibits', exhibit);
    return response.data;
};

export const deleteExhibit = async (id: string) => {
    const response = await axiosInstance.delete(`/exhibits/${id}`);
    return response.data;
};
