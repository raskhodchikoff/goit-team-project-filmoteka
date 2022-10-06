import axios from 'axios';

const params = {
  api_key: 'd2c21f22a2d4ccc40e22a6b0b1329764',
  // per_page: 40,
};

export default class AxiosRequestService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getFilms() {
    try {
      // const url = `https://pixabay.com/api/?q=${this.searchQuery}&page=${this.page}`;
      const url = `https://api.themoviedb.org/3/trending/movie/day?&page=${this.page}`;
      // const url = `https://api.themoviedb.org/3/movie/616037?&language=en-US`;
      // const url = `https://api.themoviedb.org/3/configuration?`;
      // const url = `https://api.themoviedb.org/3/genre/movie/list?&language=en-US`;

      // const url = `https://api.themoviedb.org/3/movie/616037/images?&language=en-US`;
      // https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
      // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
      const response = await axios.get(url, { params });

      await this.incrementPage();
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  async incrementPage() {
    this.page += 1;
  }

  async resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  async getConfig() {
    try {
      const url = `https://api.themoviedb.org/3/configuration?`;
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }
  async getGenre() {
    try {
      const url = `https://api.themoviedb.org/3/genre/movie/list?&language=en-US`;
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }
}
