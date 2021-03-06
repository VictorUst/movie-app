class MovieSearch {
  baseUrl = "https://api.themoviedb.org/3";

  apiKey = '14e07f5433820211ce3badd22147847a';

  async getResourse(url, parameter, pageNumber) {
    const res = await fetch(
      `${this.baseUrl}${url}?api_key=${this.apiKey}&${parameter}&${pageNumber}`
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

  async getRatedMovies(guestSessionId) {
    return this.getResourse(`/guest_session/${guestSessionId}/rated/movies`,'language=en-US&sort_by=created_at.asc');
  }

  async postRate(movieId,stars,session) {
    await fetch(
      `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${session}`,
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

const movieSearch = new MovieSearch();
export default movieSearch;