import React from "react";
import PropTypes from "prop-types";
import { GenreConsumer } from "../GenreContext/GenreContext";
import "./Genre.css";


const Genre = ({id}) => {
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
          .map((el, ind) => {
            return <li key={ind}>{el}</li>;
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
  id: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Genre;