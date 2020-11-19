import React from "react";
import { Rate as Stars } from "antd";
import { format } from 'date-fns';
import Genre from "../Genre/Genre";
import Rate from "../Rate/Rate";
import { GenreProvider } from "../GenreContext/GenreContext";

const IMG_API = 'https://image.tmdb.org/t/p/w1280';

const Rated = ({ genres, rated, loading, isError }) => {
  const elements = rated.map((item) => {

      return (
        <li key={item.id} className="movie-card">
          <div className="movie-card__poster-container">
            {" "}
            <img
              alt={item.title}
              src={IMG_API + item.poster_path}
              width={150}
              className="movie-card__img"
            />
          </div>

          <div className="movie-card__info-container">
            <header className="movie-card__header">
              <h1> {item.original_title}</h1>
              <Rate rate={item.rating} />
            </header>
            <div className="movie-card__date">{format(new Date(item.release_date), 'PP')}</div>
            <div className="movie-card__genre-list">
              <GenreProvider value={genres}>
                <Genre id={item.genre_ids} />
              </GenreProvider>
            </div>
            <div className="movie-card__description">{item.overview}</div>

            <div className="movie-card__stars">
              <Stars allowHalf count={9} defaultValue={item.vote_average} />
            </div>
          </div>
        </li>
      );

  });

  return <ul className="movie-list">{elements} </ul>;
}
Rated.defaultProps = {
  rated: [],
};

export default Rated;