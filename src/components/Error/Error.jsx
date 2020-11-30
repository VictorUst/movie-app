import React from "react";
import { Alert, Spin } from "antd";
import PropTypes from "prop-types";
import Movie from "../Movie/Movie";
import './Error.css';

const Error = ({
  loading,
  isError,
  onClose,
  data,
  genres,
  rateMovies,
  session,
}) => {
  if (loading && isError) {
    return (
      <>
        {" "}
        <Alert
          message="Error"
          description="Not Internet Connection"
          type="error"
        />
      </>
    );
  } 
  if (loading) {
    return (
      <>
        <Spin className='spin' size="large"/>
      </>
    );
  } 
   if (isError) {
    return (
      <>
        <Alert
          message="Error"
          description="Such film is not found"
          type="error"
          showIcon
          closable
          onClose={onClose}
        />
      </>
    );
  }
  return (
    <>
      {" "}
      <Movie
        data={data}
        genres={genres}
        rateMovies={rateMovies}
        session={session}
      />
    </>
  );
}
Error.propTypes = {
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  genres: PropTypes.arrayOf(PropTypes.object),
  rateMovies: PropTypes.func,
  session: PropTypes.string
};
export default Error;