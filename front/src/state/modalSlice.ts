import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean,
    modalContent: 'register' | 'auth'
  }

  const initialState: ModalState = {
    isOpen: false,
    modalContent: 'register'
  }

  export const modalSlice = createSlice({
    name: "modal",
    initialState,

    reducers: {
        openModal: (state, action: PayloadAction<{modalContent: 'register' | 'auth'}>) => {
            state.isOpen = true
            state.modalContent = action.payload.modalContent
        },

        closeModal: (state) => {
            state.isOpen = false
        }
    },
  
    extraReducers: (builder) => {
    },
  });

  export const { openModal, closeModal} = modalSlice.actions

  export default modalSlice.reducer;