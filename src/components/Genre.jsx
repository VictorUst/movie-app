import React from "react";
import { GenreConsumer } from "./GenreContext";
import "./Genre.css";
import PropTypes from "prop-types";

const Genre = ({ id }) => {
  return (
    <GenreConsumer>
      {(genres) => {
        const genresArr = genres.map((el) => {
          if (id.includes(el.id)) {
            return el.name;
          }
        });
        const genresStr = genresArr
          .filter((el) => el !== undefined)
          .map((el, i) => {
            return <li key={i}>{el}</li>;
          });

        return (
          <>
            <ul className="genre">{genresStr}</ul>
          </>
        );
      }}
    </GenreConsumer>
  );
}
Genre.propTypes = {
  id: PropTypes.arrayOf(PropTypes.number)
};

export default Genre;