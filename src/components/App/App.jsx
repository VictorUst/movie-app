import React, { Component } from "react";
import { Tabs, Spin } from "antd";
import { debounce } from 'lodash';
import Search from "../Search/Search";
import Rated from "../Rated/Rated";
import movieSearch from "../../service/MovieSearch";
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
    isFirstLoading: true,
  };

  componentDidMount() {
    movieSearch.getGenres().then((res) => {
      this.setState({ genres: res.genres });
    });
    movieSearch.getSession().then((res) => {
      this.setState({guestSessionId: res.guest_session_id})
    });
    setTimeout(() => this.setState({ isFirstLoading: false }), 1000);
  }

  getMovies = debounce((value, pageNumber) => {
    this.setState({
      loading: true,
      data: null,
      totalResults: null,
      currentPage: null,
    });
    if (value) {
      movieSearch.getMovie(value, pageNumber).then((body) => {
        const movies = body.results;
        const newData = movies.map(this.createItem);
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

  onChangeHandler = (ev) => {
    const { value } = ev.target;
    this.setState({ value, isError: false });
    this.getMovies(value);
  };

  createItem = ({
    id,
    title,
    release_date: date,
    genre_ids: genre,
    overview: desk,
    stars,
    vote_average: rate,
    poster_path: poster,
  }) => ({
    id,
    title,
    date,
    genre,
    desk,
    stars,
    rate,
    poster
  })

  onClose = () => {
    this.setState({ value: "", isError: false });
  };

  rateMovies = () => {
    const { guestSessionId } = this.state;
    movieSearch.getRatedMovies(guestSessionId).then(res => {
      this.setState({rated: res.results})
    })
  }

 onError = () => {
    this.setState({ isError: true });
  };

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
      guestSessionId,
      isFirstLoading
    } = this.state;

    if (isFirstLoading) {
      return <Spin className="spin" size="large" />;
    }

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
              session={guestSessionId}
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