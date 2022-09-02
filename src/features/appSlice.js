import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelID: null,
  channelName: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelID = action.payload.channelID
      state.channelName = action.payload.channelName
    },
  },
});

export const { setChannelInfo } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.app.value)`
export const selectChannelID = (state) => state.app.channelID;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;