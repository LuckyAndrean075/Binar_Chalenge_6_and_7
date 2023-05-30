import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postDetails: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostDetails: (state, action) => {
      state.postDetails = action.payload;
    },
  },
});

// agar setPosts dan SetPostsDetails bisa diakses pada file lain
export const { setPosts, setPostDetails } = postSlice.actions;

// default export file
export default postSlice.reducer;
