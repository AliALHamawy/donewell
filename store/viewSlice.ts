import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
    activeView: 'tasks' | 'notes';
}

const initialState: ViewState = {
    activeView: 'tasks',
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setInitialView:(state, action: PayloadAction<"tasks" | "notes">) => {
            state.activeView = action.payload;
        },
        setView: (state, action: PayloadAction<'tasks' | 'notes'>) => {
            state.activeView = action.payload;
        }
    }
})

export const { setInitialView, setView } = viewSlice.actions;
export default viewSlice.reducer;