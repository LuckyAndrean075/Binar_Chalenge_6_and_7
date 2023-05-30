import axios from "axios";
import { toast } from "react-toastify";
import { setPostDetails } from "../reducers/post";
import tmdbApi, { movieType } from "../../api/tmdbApi";
import { setBanner } from "../reducers/banner";

export const getBanner = () => async (dispatch) => {
  const params = { page: 1 };
  try {
    const response = await tmdbApi.getMoviesList(movieType.popular, {
      params,
    });
    dispatch(setBanner(response.results.slice(0, 5)));
    console.log(response);
  } catch {
    console.log("error");
  }
};

export const getPostDeatils = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_POST_API}/posts/${id}`
    );
    dispatch(setPostDetails(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error?.response.data.message);
      return;
    }
    toast.error(error?.message);
  }
};
