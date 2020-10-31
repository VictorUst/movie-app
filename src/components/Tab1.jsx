import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from "react-debounce-input";
import Pagination from "./Pagination";
import {GenreProvider} from './GenreContext';
import MovieList from './MovieList';
import './Tab1.css';

const Tab1 = ({onChangeHandler,value,genres,data,loading,onClose,isError,totalResults,numberPages,nextPage,currentPage,rateFilms,session}) => {
    return <>
    <div className='search'>
      <DebounceInput
        minLength={1}
        debounceTimeout={100}
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
        rateFilms={rateFilms}
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
Tab1.propTypes = {
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
  rateFilms: PropTypes.func,
  session: PropTypes.func
}

export default Tab1;