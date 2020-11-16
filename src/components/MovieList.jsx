import React from "react";
import "./MovieList.css";
import PropTypes from 'prop-types';
import cn from 'classnames';
import Error from './Error';


const MovieList = ({ data, loading, isError, onClose ,rateFilms,session}) => {
  return (
    <ul className={cn("movie-list", { loader: loading })}>
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