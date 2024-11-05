import axiosInstance from './axiosInstance';

export const fetchComments = async (postId: string) => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
};

export const createComment = async (postId: string, comment: any) => {
    const response = await axiosInstance.post(`/posts/${postId}/comments`, comment);
    return response.data;
};

export const deleteComment = async (postId: string, commentId: string) => {
    const response = await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
};
