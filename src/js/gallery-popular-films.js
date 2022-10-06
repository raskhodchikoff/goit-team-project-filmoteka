import { renderModalOneFilm, onOpenModal } from './modal-film';
import { getMovieById } from './fetch-movie';
import { pagination } from './pagination';
import AxiosRequestService from './axiosRequest';
import createMarkup from './markupForGallery';
import Notiflix from 'notiflix';
import {
  filmAddYearRelease,
  filmAddGenreList,
  filmAddUrl,
  filmCheckImgUrl,
} from './functions-for-popular-gallery';

let watchedMovies = [];
let queueMovies = [];

export const requireData = new AxiosRequestService();

let config = {};
export let GENRES_FULL_INFO;

const refs = {
  page: document.querySelector('a[data-page="home"]'),
  gallery: document.querySelector('.gallery'),
  cards: document.querySelectorAll('.card-set__item'),
};

export async function onGalleryClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const filmInfo = await getMovieById(e.currentTarget.id);
  renderModalOneFilm(filmInfo);
  checkWatched(filmInfo);
  checkQueue(filmInfo);
  onOpenModal();
}
function fetchFilms() {
  const films = requireData.getFilms();
  return films;
}

function checkWatched(filmInfo) {
  const descriptionWatched = document.querySelector(
    '.description-button__watched'
  );
  // const descriptionQueue = document.querySelector('.description-button__queue');
  const dataWatched = JSON.parse(localStorage.getItem('watchedMovies'));
  if (dataWatched === null || !dataWatched.length) {
    return;
  } else {
    const { id } = filmInfo;
    watchedMovies = dataWatched;
    for (let i = 0; i < watchedMovies.length; i += 1) {
      if (watchedMovies[i].id === id) {
        // console.log(libralyWatched);
        descriptionWatched.textContent = 'remove from watched';
        descriptionWatched.classList.remove('description-button__watched');
        descriptionWatched.classList.add('remove-button__watched');

        // Notiflix.Notify.failure(
        //   'This movie has already been added to Watched.'
        // );
        return;
      }
    }
  }
}
function checkQueue(filmInfo) {
  // const descriptionWatched = document.querySelector(
  //   '.description-button__watched'
  // );
  const descriptionQueue = document.querySelector('.description-button__queue');
  const dataQueue = JSON.parse(localStorage.getItem('queueMovies'));
  if (dataQueue === null || !dataQueue.length) {
    return;
  } else {
    const { id } = filmInfo;
    queueMovies = dataQueue;
    for (let i = 0; i < queueMovies.length; i += 1) {
      if (queueMovies[i].id === id) {
        descriptionQueue.textContent = 'remove from queue';
        descriptionQueue.classList.remove('description-button__queue');
        descriptionQueue.classList.add('remove-button__queue');
        // Notiflix.Notify.failure('This movie has already been added to Queue.');
        return;
      }
    }
  }
}
// async function fetchData() {
//   const data = await Promise.all([
//     requireData.getConfig(),
//     requireData.getGenre(),
//     requireData.getFilms(),
//   ]);
//   console.log('data', data);
//   GENRES_FULL_INFO = data[1].genres;
//   return data;
// }
async function fetchDataConfigAndGenre() {
  const data = await Promise.all([
    requireData.getConfig(),
    requireData.getGenre(),
  ]);

  const {
    images: { base_url, poster_sizes },
  } = data[0];

  const { genres } = data[1];

  // console.log('data', data);
  GENRES_FULL_INFO = genres;
  return { base_url, poster_sizes, genres };
}
//////////////////////////////////////////////////////////////////////////////
export async function loadPage() {
  const configAndGenreData = await fetchDataConfigAndGenre();
  config = configAndGenreData;
  // console.log('configAndGenre', configAndGenreData);
  const filmsData = await fetchFilms();
  pagination.reset(filmsData.total_results);
  // console.log('films Data', filmsData);
  const dataForMurkup = preperDataForMurkup({
    configAndGenreData,
    filmsData,
  });
  // pagination.reset(total_films);
  // console.log('DatdataForMurkupa', dataForMurkup);
  renderGallery(dataForMurkup);
}
//////////////////////////////////////////////////////////////////////////////////////

function preperDataForMurkup(dataForModify) {
  const {
    configAndGenreData: { genres },
    configAndGenreData,
  } = dataForModify;
  // console.log('dataForModify', dataForModify);
  let modifedData = filmAddYearRelease(dataForModify);
  modifedData = filmAddGenreList({ genres, modifedData });
  modifedData = filmAddUrl({ configAndGenreData, modifedData });
  // console.log('configAndGenreData', configAndGenreData);
  modifedData = filmCheckImgUrl(modifedData);
  return modifedData;
}

function renderGallery(popularFilms) {
  clearMarkup();
  // const popularFilms = await modifyData();
  const markup = createMarkup(popularFilms);
  addToHTML(markup);
}

if (refs.page.classList.contains('header-list__link--current')) {
  // onLoadMore();
  loadPage();
}

export async function onPaginLoadMore(currentPage) {
  requireData.page = currentPage;
  const filmsData = await fetchFilms();
  const configAndGenreData = config;
  const dataForMurkup = preperDataForMurkup({
    configAndGenreData,
    filmsData,
  });
  // console.log('dataForMurkup', dataForMurkup);
  renderGallery(dataForMurkup);
}

export function addToHTML(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  const galleryItems = document.querySelectorAll('.card-set__item');

  galleryItems.forEach(card =>
    card.removeEventListener('click', onGalleryClick)
  );
  galleryItems.forEach(card => card.addEventListener('click', onGalleryClick));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

// pagination.on('afterMove', event => {
//   const currentPage = event.page;
//   if (!SEARCH_ACTIVE) {
//     onPaginLoadMore(currentPage);
//   }
//   // console.log(pagination.currentPage);
//   // requireData.page = currentPage;
// });
