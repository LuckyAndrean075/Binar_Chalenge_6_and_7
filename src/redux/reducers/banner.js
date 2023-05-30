import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
  },
});

// agar setPosts dan SetPostsDetails bisa diakses pada file lain
export const { setBanner } = bannerSlice.actions;

// default export file
export default bannerSlice.reducer;
