import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import { category } from "../../api/tmdbApi";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { IconButton } from "@mui/material";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../redux/actions/Auth";

const Header = () => {
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getProfile());
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">MovieList</Link>
        </div>
        <div className="header_search">
          <MovieSearch />
        </div>

        {isLoggedIn ? (
          <ul className="list">
            <li
              className="listItem"
              style={{ fontSize: "22px", fontWeight: "bold" }}
            >
              {user?.name}
            </li>

            <OutlineButton
              onClick={() => dispatch(logout(navigate))}
              className="outlineBtnsSmall"
            >
              Logout
            </OutlineButton>
          </ul>
        ) : (
          <ul className="header__nav">
            <OutlineButton onClick={handleLogin} className="outlineBtnsSmall">
              Login
            </OutlineButton>
            <Button onClick={handleSignUp} className="small">
              Sign Up
            </Button>
          </ul>
        )}
      </div>
    </div>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category.movie}/search/${keyword}`);
    }
  }, [keyword, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton>
        <SearchRoundedIcon className="icon" />
      </IconButton>
    </div>
  );
};

export default Header;
