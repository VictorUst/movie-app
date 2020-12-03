import React from "react";
import "./MovieList.css";
import PropTypes from 'prop-types';
import cn from 'classnames';
import Error from '../Error/Error';


const MovieList = ({ data, loading, isError, onClose ,rateMovies,session}) => {
  return (
    <ul className={cn("movie-list", { loader: loading })}>
      <Error
        loading={loading}
        isError={isError}
        onClose={onClose}
        data={data}
        rateMovies={rateMovies}
        session={session}
      />
    </ul>
  );
}
MovieList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  isError: PropTypes.bool.isRequired,
  onClose : PropTypes.func.isRequired,
  rateMovies: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired
}
export default MovieList;