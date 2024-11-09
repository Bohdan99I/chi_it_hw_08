import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments, createComment } from '../../api/commentActions';

interface Comment {
    id: string;
    postId: string;
    content: string;
}

export const loadComments = createAsyncThunk('comments/loadComments', async (postId: string) => {
    const response = await fetchComments(postId);
    return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (commentData: { postId: string; content: string }, { rejectWithValue }) => {
    try {
        const response = await createComment(commentData.postId, commentData.content); 
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: [] as Comment[], 
    reducers: {},
    extraReducers: (builder) => {  
        builder.addCase(loadComments.fulfilled, (state, action) => action.payload);
  
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.push(action.payload as Comment); 
        });
    },
});

export default commentSlice.reducer;
