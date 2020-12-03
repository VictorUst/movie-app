import React from "react";
import "./Movie.css";
import { Rate as Stars } from "antd";
import { format } from 'date-fns';
import PropTypes from "prop-types";
import Genre from "../Genre/Genre";
import Rate from "../Rate/Rate";
import movieSearch from "../../service/MovieSearch";

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const Movie = ({ data, session }) => {
  const elements = data.map((item) => {
    const onHandlerStars = async (stars) => {
      await movieSearch.postRate(item.id, stars, session);
    };

    return (
      <li key={item.id} className="movie-card">
        <div className="movie-card__poster-container">
          <img
              alt={item.title}
              src={IMG_API + item.poster}
              className="movie-card__img"
            />
        </div>

        <div className="movie-card__info-container">
          <header className="movie-card__header">
            <h1> {item.title}</h1>
            <Rate rate={item.rate} />
          </header>
          <div className="movie-card__date">{item.date === '' || item.date === undefined ? 'Date unknown' : format(new Date(item.date), 'PP')}</div>
          <div className="movie-card__genre-list">
            <Genre id={item.genre} />
          </div>
          <div className="movie-card__description">{item.desk}</div>

          <div className="movie-card__stars">
            <Stars
              count={9}
              defaultValue={item.rate}
              onChange={(stars) => {
                onHandlerStars(stars);
              }}
            />
          </div>
        </div>
      </li>
    );
  });
  return <> {elements} </>;
}
Movie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  session: PropTypes.string.isRequired
};
export default Movie;
