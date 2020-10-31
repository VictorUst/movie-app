import React from "react";
import "./MovieList.css";
import PropTypes from 'prop-types';
import Error from './Error';

const MovieList = ({ data, loading, isError, onClose ,rateFilms,session}) => {
  let classNames = "movie-list";
  if (loading) {
    classNames += " loader";
  }
  return (
    <ul className={classNames}>
      <Error
        loading={loading}
        isError={isError}
        onClose={onClose}
        data={data}
        rateFilms={rateFilms}
        session={session}
      />
    </ul>
  );
}
MovieList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  onClose : PropTypes.func,
  rateFilms: PropTypes.func,
  session: PropTypes.string
}
export default MovieList;