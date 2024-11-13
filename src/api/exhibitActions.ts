import axiosInstance from './axiosInstance';

// import { UserI } from "./UserI";

export interface ExhibitI {
    id: number;
    imageUrl: string;
    description: string;
    user: any; //UserI;
    commentCount: number;
    createdAt: string;
}

export const fetchExhibits = async (page: number): Promise<ExhibitI[] | any> => {
    const response = axiosInstance.get<ExhibitI[]>('/api/exhibits', {
        params: {
            page: page
        }
    });
    return response;
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
