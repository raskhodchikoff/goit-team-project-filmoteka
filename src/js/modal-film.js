import { getMovieById } from './fetch-movie';

const modalOneFilmRef = document.querySelector('.film-card');
const backdropRef = document.querySelector('.backdrop');
const closeModalBtnRef = document.querySelector('.film-card__button-close');
const modalRef = document.querySelector('.data-modal');

const refs = {
  closeModalBtn: document.querySelector('.film-card__button-close'),
  modal: document.querySelector('.data-modal'),
  modalOneFilmRef: document.querySelector('.film-card'),
  modalOneFilmWrap: document.querySelector('.film-card__wrapper'),
};

backdropRef.addEventListener('click', onBackdropClick);

export function addInitModalEventListener() {
  window.addEventListener('keydown', onEscapePress);
  refs.closeModalBtn.addEventListener('click', onCloseModal);
}

export function removeInitModalEventListener() {
  window.removeEventListener('keydown', onEscapePress);
  refs.closeModalBtn.removeEventListener('click', onCloseModal);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

export function onOpenModal() {
  refs.modal.classList.remove('is-hidden');
  addInitModalEventListener();
  if (onOpenModal) {
    document.body.style.overflow = 'hidden';
  }
}

export function onCloseModal() {
  refs.modal.classList.add('is-hidden');
  refs.modalOneFilmWrap.innerHTML = '<div class="film-card__wrapper"></div>';
  removeInitModalEventListener();
  if (onCloseModal) {
    document.body.style.overflow = '';
  }
}

function onEscapePress(evt) {
  const isEscKey = evt.code === 'Escape';
  if (isEscKey) {
    onCloseModal();
  }
}

export function renderModalOneFilm(modalFilm) {
  const {
    poster_path: path,
    title,
    id,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = modalFilm;

  let modifiedOverwiew;
  if (overview === '') {
    modifiedOverwiew = 'There is no info';
  } else {
    modifiedOverwiew = overview;
  }
  let poster_path;
  if (path === null || path === undefined) {
    // console.log(null);
    poster_path = '/uc4RAVW1T3T29h6OQdr7zu4Blui.jpg';
    // console.log('poster_path', poster_path);
  } else {
    poster_path = path;
  }
  let genresList;
  if (!genres.length) {
    genresList = 'There is no info';
  } else {
    genresList = genres.map(item => item.name).join(', ');
  }

  const markupModalOneFilm = `<div class="film-card__wrapper">
        <div class="film-card__image-block">
        <picture>
                    <source srcset="
                    https://image.tmdb.org/t/p/w780/${poster_path} 1x,
                    https://image.tmdb.org/t/p/original/${poster_path} 2x" media="(min-width: 1280px)" type="image/jpeg" />
                    <source srcset="
                    https://image.tmdb.org/t/p/w342/${poster_path} 1x,
                    https://image.tmdb.org/t/p/w500/${poster_path} 2x" media="(min-width: 768px)" type="image/jpeg" />
                    <source srcset="
                    https://image.tmdb.org/t/p/w185/${poster_path} 1x,
                    https://image.tmdb.org/t/p/w342/${poster_path} 2x" media="(max-width: 480px)" type="image/jpeg" />
        <img
          class="film-card__image"
          src="https://image.tmdb.org/t/p/w342${poster_path}"
          alt="film"
        />
                </picture>
        
      </div>
      <div class="film-card__description">
        <h1 class="film-card__description-title">${title}</h1>
        <ul class="film-card__description-set">
          <li class="description-set">
            <p class="description-set__text">Vote / Votes</p>
            <p class="description-set__value">
              <span class="description-set__rating">${vote_average}</span>
              <span class="description-set__separator">/</span>
              <span class="description-set__vote">${vote_count}</span>
            </p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Popularity</p>
            <p class="description-set__value">${popularity}</p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Original Title</p>
            <p class="description-set__value">${original_title}</p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Genre</p>
            <p class="description-set__value">${genresList}</p>
          </li>
        </ul>
        <div class="film-card__description-about">
          <h2 class="description-about__title">About</h2>
          <p class="description-about__text">${modifiedOverwiew}</p>
        </div>
        <div class="film-card__description-button">
          <button class="description-button description-button__watched" data-id="${id}">
            add to Watched
          </button>
          <button class="description-button description-button__queue" data-id="${id}">
            add to queue
          </button>
        </div>
      </div>
    </div>
    </div>`;

  refs.modalOneFilmWrap.innerHTML = markupModalOneFilm;
}
