import React from 'react';
import PropTypes from 'prop-types';
import { Input } from "antd";
import Pagination from "../Pagination/Pagination";
import {GenreProvider} from '../GenreContext/GenreContext';
import MovieList from '../MovieList/MovieList';
import './Search.css';

const Search = ({onChangeHandler,value,genres,data,loading,onClose,isError,totalResults,numberPages,nextPage,currentPage,rateMovies,session}) => {
    return <>
    <div className='search'>
      <Input
        onChange={onChangeHandler}
        value={value}
        placeholder='Type to search...'
        className='search-input'
      />
    </div>
    <GenreProvider value={genres}>
      <MovieList
        data={data}
        loading={loading}
        onClose={onClose}
        isError={isError}
        rateMovies={rateMovies}
        session={session}
      />
    </GenreProvider>

  {totalResults > 20 ? (
    <Pagination
      pages={numberPages}
      nextPage={nextPage}
      currentPage={currentPage}
      value={value}
      loading={loading}
    />
  ) : null}
  </>
}
Search.propTypes = {
  onChangeHandler: PropTypes.func,
  value: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  isError: PropTypes.bool,
  totalResults: PropTypes.number,
  numberPages: PropTypes.number,
  nextPage: PropTypes.number,
  currentPage: PropTypes.number,
  rateMovies: PropTypes.func,
  session: PropTypes.func
}

export default Search;