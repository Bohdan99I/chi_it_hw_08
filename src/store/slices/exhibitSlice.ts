import { createSlice } from '@reduxjs/toolkit';

interface ExhibitState {
    exhibits: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ExhibitState = {
    exhibits: [],
    loading: false,
    error: null,
};

const exhibitSlice = createSlice({
    name: 'exhibits',
    initialState,
    reducers: {},
});

export default exhibitSlice.reducer;
