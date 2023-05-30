import axios from "axios";
import { setIsLoggedIn, setToken, setError, setUser } from "../reducers/auth";

export const login = (data, navigate) => async (dispatch) => {
  try {
    // const response = await axios.post(`http://localhost:8080/api/auth`, data, {
    //   "Content-Type": "application/json",
    // });
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
      data,
      {
        "Content-Type": "application/json",
      }
    );

    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(setError(null));

    // redirect to home, don't forget to useNavigate in the component
    navigate("/");
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.log(error.response.data.message);
      dispatch(setError(error?.response?.data?.message));
    }
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    if (data.password !== data.confirmPassword) {
      dispatch(setError("Confirm password must be same with password"));
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
      data,
      {
        "Content-Type": "application/json",
      }
    );

    // redirect to home, don't forget to useNavigate in the component
    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(setError(null));

    navigate("/");
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.log(error.response.data.message);
      dispatch(setError(error?.response?.data?.message));
    }
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setIsLoggedIn(false));
  dispatch(setUser(null));

  dispatch(setError(null));

  if (navigate) navigate("/login");
};

export const getProfile = (navigate) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response?.data;
    dispatch(setUser(data));
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.log(error.response.data.message);
      dispatch(setError(error?.response?.data?.message));
      if (error.response.status === 401) {
        dispatch(logout(navigate));
      }
      return;
    }
  }
};

export const loginGoogle = (data, navigate) => async (dispatch) => {
  try {
    // const response = await axios.post(`http://localhost:8080/api/auth`, data, {
    //   "Content-Type": "application/json",
    // });
    const response = await axios.post(
      `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
      data,
      {
        "Content-Type": "application/json",
      }
    );

    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(setError(null));

    // redirect to home, don't forget to useNavigate in the component
    navigate("/");
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.log(error.response.data.message);
      dispatch(setError(error?.response?.data?.message));
    }
  }
};
