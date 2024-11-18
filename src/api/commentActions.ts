import axiosInstance from './axiosInstance';
import { 
  Comment, 
  CommentsResponse, 
  CreateCommentDto, 
  UpdateCommentDto 
} from '../types/api';

/**
 * Отримання коментарів для експоната
 * @param exhibitId - ID експоната
 * @param page - Номер сторінки (за замовчуванням 1)
 * @returns Promise з даними коментарів та інформацією про пагінацію
 */
export const fetchComments = async (
  exhibitId: number, 
  page: number = 1
): Promise<CommentsResponse> => {
  try {
    const response = await axiosInstance.get<CommentsResponse>(
      `/api/exhibits/${exhibitId}/comments`,
      { params: { page } }
    );
    return response.data;
  } catch (error) {
    console.error('Помилка отримання коментарів:', error);
    return {
      data: [],
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    } as CommentsResponse;
  }
};

/**
 * Створення нового коментаря
 * @param exhibitId - ID експоната
 * @param data - Текст коментаря
 * @returns Promise з даними створеного коментаря
 * @throws Error якщо створення не вдалося
 */
export const createComment = async (
  exhibitId: number, 
  data: CreateCommentDto
): Promise<Comment> => {
  try {
    const response = await axiosInstance.post<Comment>(
      `/api/exhibits/${exhibitId}/comments`,
      { content: data.content }
    );
    return response.data;
  } catch (error: any) {
    console.error('Помилка створення коментаря:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося створити коментар');
  }
};

/**
 * Оновлення коментаря
 * @param exhibitId - ID експоната
 * @param commentId - ID коментаря
 * @param data - Новий текст коментаря
 * @returns Promise з оновленими даними коментаря
 * @throws Error якщо оновлення не вдалося
 */
export const updateComment = async (
  exhibitId: number,
  commentId: number,
  data: UpdateCommentDto
): Promise<Comment> => {
  try {
    const response = await axiosInstance.put<Comment>(
      `/api/exhibits/${exhibitId}/comments/${commentId}`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error('Помилка оновлення коментаря:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося оновити коментар');
  }
};

/**
 * Видалення коментаря
 * @param exhibitId - ID експоната
 * @param commentId - ID коментаря
 * @throws Error якщо видалення не вдалося
 */
export const deleteComment = async (
  exhibitId: number,
  commentId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(
      `/api/exhibits/${exhibitId}/comments/${commentId}`
    );
  } catch (error: any) {
    console.error('Помилка видалення коментаря:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Не вдалося видалити коментар');
  }
};
