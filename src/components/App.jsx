import React, { Component } from "react";
import { Tabs } from "antd";
import { debounce } from 'lodash';
import Search from "./Search";
import Rated from "./Rated";

import MovieSearch from "../service/MovieSearch";
import "./App.css";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    data: [],
    value: "",
    isError: false,
    totalResults: 0,
    currentPage: 1,
    rated: [],
  };

movieSearch = new MovieSearch();

  componentDidMount() {
    this.movieSearch.getGenres().then((res) => {
      this.setState({ genres: res.genres });
    });
    this.movieSearch.getSession().then((res) => {
      this.setState({guest_session_id: res.guest_session_id})
    });
  }

  getMovies = debounce((value, pageNumber) => {
    this.setState({
      loading: true,
      data: null,
      totalResults: null,
      currentPage: null,
    });
    if (value) {
      this.movieSearch.getMovie(value, pageNumber).then((body) => {
        const movies = body.results;
        const newData = movies.map((item) => {
          return this.createItem(
            item.id,
            item.original_title,
            item.release_date,
            item.genre_ids,
            item.overview,
            item.vote_count,
            item.vote_average,
            item.poster_path
          );
        });

        this.setState(() => {
          return {
            data: newData,
            loading: false,
            totalResults: body.total_results,
            currentPage: pageNumber,
          };
        });
        if (newData.length === 0) {
          throw new Error("Not Found");
        }
      })
      .catch(this.onError);
    } else {
      this.setState({ data: [], loading: false });
    }
  }, 500);

  nextPage = (pageNumber) => {
    const { value } = this.state;
    this.getMovies(value, pageNumber);
  };

  onChangeHandler = (e) => {
    this.setState({ value: e.target.value });
    const { value } = this.state;
    this.getMovies(value);
  };

  onClose = () => {
    this.setState({ value: "", isError: false });
  };

  rateMovies = () => {
    const { guest_session_id } = this.state;
    this.movieSearch.getRatedMovies(guest_session_id).then(res => {
      this.setState({rated: res.results})
    })
  }

 onError = () => {
    this.setState({ isError: true });
  };

  createItem(id, title, date, genre, desk, stars, rate, poster) {
    return {
      id,
      title,
      date,
      genre,
      desk,
      stars,
      rate,
      poster,
    };
  }

  render() {
    const {
      data,
      loading,
      isError,
      value,
      totalResults,
      currentPage,
      genres,
      rated,
      guest_session_id
    } = this.state;
    
    const numberPages = Math.floor(totalResults / 20);
    return (
      <div className="main">
        <Tabs centered defaultActiveKey="1">
          <TabPane tab={<span>Search</span>} key="1">
            <Search
              onChangeHandler={this.onChangeHandler}
              value={value}
              genres={genres}
              data={data}
              loading={loading}
              onClose={this.onClose}
              isError={isError}
              totalResults={totalResults}
              numberPages={numberPages}
              nextPage={this.nextPage}
              currentPage={currentPage}
              rateMovies={this.rateMovies}
              session={guest_session_id}
            />
          </TabPane>
          <TabPane tab={<span onClick={this.rateMovies}>Rated</span>}  key="2">
            <Rated
              genres={genres}
              rated={rated}
              loading={loading}
              isError={isError}
              />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
