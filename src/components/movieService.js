/*
export default class MovieService {
  constructor() {
    this.searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=14e07f5433820211ce3badd22147847a&query=return';
  }


  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  async getMovies() {
    const res = this.getResource(
      `${this.searchApi}`
    );
    return res;
  }
}
*/