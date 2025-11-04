import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppSettingRedux {
    scanMode:'camera'|'scanner',
    isCameraActive:boolean
}

const initialState: AppSettingRedux = {
    isCameraActive:true,
    scanMode:'camera'
};

const appSettingReduxSlice = createSlice({
  name: 'AppSettingRedux',
  initialState,
  reducers: {
    setNewAppSettingRedux: (state, action: PayloadAction<AppSettingRedux>) => {
      state.isCameraActive = action.payload.isCameraActive;
      state.scanMode=action.payload.scanMode
    }
  },
});

export const {setNewAppSettingRedux} = appSettingReduxSlice.actions;
export default appSettingReduxSlice.reducer;
