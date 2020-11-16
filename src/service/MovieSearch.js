class MovieSearch {
  _baseUrl = "https://api.themoviedb.org/3";

  api_key = "14e07f5433820211ce3badd22147847a";

  async getResourse(url, parameter, pageNumber) {
    const res = await fetch(
      `${this._baseUrl}${url}?api_key=${this.api_key}&${parameter}&${pageNumber}`
    );
    if (!res.ok) {
      throw new Error(`Movies not found , received ${res.status} `);
    }
    const body = await res.json();
    return body;
  }

  async getMovie(movie, num) {
    return this.getResourse("/search/movie", `query=${movie}`, `page=${num}`);
  }

  async getGenres() {
    return this.getResourse("/genre/movie/list");
  }

  async getSession() {
    return this.getResourse("/authentication/guest_session/new");
  }

  async getRatedMovies(guest_session_id) {
    return this.getResourse(`/guest_session/${guest_session_id}/rated/movies`,'language=en-US&sort_by=created_at.asc');
  }

  async postRate(movie_id,stars,session) {
    const res = await fetch(
      `${this._baseUrl}/movie/${movie_id}/rating?api_key=${this.api_key}&guest_session_id=${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
         
        },
        body: JSON.stringify({
          "value": stars
        })
      }
    );
   
  }
}
export default MovieSearch;