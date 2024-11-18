import axiosInstance from './axiosInstance';
import { 
  Exhibit, 
  ExhibitsResponse, 
  CreateExhibitDto, 
  UpdateExhibitDto 
} from '../types/api';

export const fetchExhibits = async (page: number = 1): Promise<ExhibitsResponse> => {
  try {
    const response = await axiosInstance.get<ExhibitsResponse>('/api/exhibits', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Помилка отримання експонатів:', error);
    return {
      data: [],
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    };
  }
};

export const fetchMyExhibits = async (page: number = 1): Promise<ExhibitsResponse> => {
  try {
    const response = await axiosInstance.get<ExhibitsResponse>('/api/exhibits/my', {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error('Помилка отримання власних експонатів:', error);
    return {
      data: [],
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    };
  }
};


export const fetchExhibitById = async (id: number): Promise<Exhibit> => {
  try {
    const response = await axiosInstance.get<Exhibit>(`/api/exhibits/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Помилка отримання експоната:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Експонат не знайдено');
  }
};

export const createExhibit = async (data: CreateExhibitDto): Promise<Exhibit> => {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);

    const response = await axiosInstance.post<Exhibit>('/api/exhibits', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Помилка створення експоната:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося створити експонат');
  }
};

export const updateExhibit = async (id: number, data: UpdateExhibitDto): Promise<Exhibit> => {
  try {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    const response = await axiosInstance.put<Exhibit>(`/api/exhibits/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Помилка оновлення експоната:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося оновити експонат');
  }
};

export const deleteExhibit = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/exhibits/${id}`);
  } catch (error: any) {
    console.error('Помилка видалення експоната:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося видалити експонат');
  }
};
