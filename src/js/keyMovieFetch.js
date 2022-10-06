import axios from 'axios';

const URL_KEY = 'd2c21f22a2d4ccc40e22a6b0b1329764';

export default class KeyMovieFetch {
  constructor() {
    this.inputValue = '';
    this.page = 1;
    this.genres = '';
    // this.per_page = 40;
    // this.summaryHits = 0;
    // this.loadMore = document.querySelector('.load-more__btn');
  }

  async fetchMovie() {
    try {
      const url = 'https://api.themoviedb.org/3/search/movie';
      //   this.loadMore.classList.add('is-hidden');
      const response = await axios.get(url, {
        params: {
          api_key: URL_KEY,
          query: this.inputValue,
          page: this.page,
        },
      });
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getGenre() {
    try {
      const url =
        'https://api.themoviedb.org/3/genre/movie/list?&language=en-US`';
      //   this.loadMore.classList.add('is-hidden');
      const response = await axios.get(url, {
        params: {
          api_key: URL_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.inputValue;
  }
  set value(newValue) {
    this.inputValue = newValue;
  }
}
