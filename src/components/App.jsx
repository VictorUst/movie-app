import React, { Component } from "react";
import { Tabs } from "antd";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import MovieSearch from "./MovieSearch";
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

  componentDidMount() {
    new MovieSearch().getGenres().then((res) => {
      this.setState({ genres: res.genres });
    });
    new MovieSearch().getSession().then((res) => {
      this.setState({guest_session_id: res.guest_session_id})
    });
  }

  nextPage = (pageNumber) => {
    const { value } = this.state;
    if (value) {
      new MovieSearch()
        .getMovie(value, pageNumber)
        .then((body) => {
          const needArr = body.results;
          const newData = needArr.map((item) => {
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
  };

  onClose = () => {
    this.setState({ value: "", isError: false });
  };

  rateFilms = (item) => {
    item.then(res => {
      this.setState({rated: res.results})
    })
  }

 onError = () => {
    this.setState({ isError: true });
  };

  onChangeHandler = (e) => {
    this.setState({ value: e.target.value });
    const { value } = this.state;
    this.setState({ loading: true });
    if (value) {
      new MovieSearch()
        .getMovie(value)
        .then((body) => {
          const needArr = body.results;
          const newData = needArr.map((item) => {
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
            <Tab1
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
              rateFilms={this.rateFilms}
              session={guest_session_id}
            />
          </TabPane>
          <TabPane tab={<span onClick={()=> this.rateFilms(new MovieSearch().getRatedFilms(guest_session_id))}>Rated</span>}  key="2">
            <Tab2
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
