import React, { useEffect } from "react";
import { useParams } from "react-router";

import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";

import MovieList from "../../components/movie-list/MovieList";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { getPostDeatils } from "../../redux/actions/Post";

const Detail = () => {
  const { category, id } = useParams();

  const dispatch = useDispatch();

  const { postDetails } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostDeatils(category, id));
  }, [dispatch, category, id]);

  return (
    <>
      {postDetails && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                postDetails.backdrop_path || postDetails.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    postDetails.poster_path || postDetails.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{postDetails.title || postDetails.name}</h1>
              <div className="genres">
                {postDetails.genres &&
                  postDetails.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{postDetails.overview}</p>
              <div className="overview">
                <StarOutlineRoundedIcon className="icon" />{" "}
                {postDetails.vote_average.toFixed(2)}
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={postDetails.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={postDetails.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList
                category={category}
                type="similar"
                id={postDetails.id}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
