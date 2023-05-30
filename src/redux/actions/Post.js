import { setPostDetails, setPosts } from "../reducers/post";

import tmdbApi, { category } from "../../api/tmdbApi";

export const getPosts = (props) => async (dispatch) => {
  // try {
  //   const response = await axios.get(`${process.env.REACT_APP_POST_API}/posts`);
  //   dispatch(setPosts(response.data));
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     toast.error(error?.response.data.message);
  //     return;
  //   }
  //   toast.error(error?.message);
  // }
  let response = null;
  const params = {};

  if (props.type !== "similar") {
    switch (props.category) {
      case category.movie:
        response = await tmdbApi.getMoviesList(props.type, { params });
        break;
      default:
        response = await tmdbApi.getTvList(props.type, { params });
    }
  } else {
    response = await tmdbApi.similar(props.category, props.id);
  }
  dispatch(setPosts(response.results));
};

export const getPostDeatils = (category, id) => async (dispatch) => {
  // try {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_POST_API}/posts/${id}`
  //   );
  //   dispatch(setPostDetails(response.data));
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     toast.error(error?.response.data.message);
  //     return;
  //   }
  //   toast.error(error?.message);
  // }
  const response = await tmdbApi.detail(category, id, { params: {} });
  dispatch(setPostDetails(response));
  window.scrollTo(0, 0);
};
