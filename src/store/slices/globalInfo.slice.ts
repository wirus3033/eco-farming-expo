import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';



export interface GlobalInfo {
  isVisible: boolean;
  message: string;
}

const initialState: GlobalInfo = {
 isVisible: false,
 message: '',
};

const globalInfo = createSlice({
  name: 'globalInfo',
  initialState,
  reducers: {
    initializeGlobalInfo: (state) => {
      state = {...initialState};
    },
    setNewBinGlobalInfo: (state, action: PayloadAction<GlobalInfo>) => {
      state.isVisible = action.payload.isVisible;
      state.message = action.payload.message;
    },
  },
});

export const {setNewBinGlobalInfo} = globalInfo.actions;

export default globalInfo.reducer;
