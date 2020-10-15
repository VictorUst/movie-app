import React, { useEffect, useState } from 'react';
import './App.css';
import Movie from './Movie';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=14e07f5433820211ce3badd22147847a&query=return';

const App = () => {
 const [ movies, setMovies ] = useState([]);

 useEffect(() => {
  fetch(SEARCH_API)
  .then((res) => res.json())
  .then((data) => {
    setMovies(data.results);
  })


 }, [])

    return (
      <div>
        {movies.length > 0 && movies.map((movie) => <ul className="movie-list"><Movie key={movie.id} {...movie} /></ul>)}
      </div>
    );

}

export default App;
