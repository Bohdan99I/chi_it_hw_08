import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExhibits } from '../../api/exhibitActions';

export const loadExhibits = createAsyncThunk('exhibits/loadExhibits', async () => {
    const response = await fetchExhibits();
    return response.data;
});

const exhibitSlice = createSlice({
    name: 'exhibits',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadExhibits.fulfilled, (state, action) => action.payload);
    },
});

export default exhibitSlice.reducer;
