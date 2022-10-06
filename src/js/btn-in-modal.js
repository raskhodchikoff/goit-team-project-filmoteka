import { getMovieById } from './fetch-movie';
// import Notiflix from 'notiflix';
import { renderMarkup } from './btn-for-library';
let watchedMovies = [];
let queueMovies = [];
const libraryWrap = document.querySelector('.library-list');
const modalWrap = document.querySelector('.film-card');
const pageLibraly = document.querySelector('a[data-page="library"]');

const libralyWatched = document.querySelector('.library--btn__watched');
const libralyQueue = document.querySelector('.library--btn__queue');

modalWrap.addEventListener('click', onModalClick);

function onModalClick(evt) {
  if (evt.target.classList.contains('description-button__watched')) {
    onBtnAddToWatchedClick(evt);
  }

  if (evt.target.classList.contains('description-button__queue')) {
    onBtnAddToQueueClick(evt);
  }

  if (evt.target.classList.contains('remove-button__watched')) {
    onBtnRemoveFromWatchedClick(evt);
  }

  if (evt.target.classList.contains('remove-button__queue')) {
    onBtnRemoveFromQueueClick(evt);
  }
}

async function onBtnAddToWatchedClick(evt) {
  const dataWatched = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  if (dataWatched === null || !dataWatched.length) {
    dataWatched.push(selectedMovie);
    localStorage.setItem('watchedMovies', JSON.stringify(dataWatched));
    if (
      pageLibraly.classList.contains('library-header--list__link--active') &&
      libralyWatched.classList.contains('library--btn--active')
    ) {
      onRemoveWatchedUpdate(evt);
    }
    evt.target.textContent = 'remove from watched';
    evt.target.classList.remove('description-button__watched');
    evt.target.classList.add('remove-button__watched');
  } else {
    watchedMovies = dataWatched;
    let isDublicate = false;
    for (let i = 0; i < watchedMovies.length; i += 1) {
      if (watchedMovies[i].id === selectedMovie.id) {
        isDublicate = true;
      }
    }
    if (!isDublicate) {
      watchedMovies.push(selectedMovie);
    }
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    if (
      pageLibraly.classList.contains('library-header--list__link--active') &&
      libralyWatched.classList.contains('library--btn--active')
    ) {
      onRemoveWatchedUpdate(evt);
    }
    evt.target.textContent = 'remove from watched';
    evt.target.classList.remove('description-button__watched');
    evt.target.classList.add('remove-button__watched');

    // Notiflix.Notify.success('This movie added to Watched.');
    return;
  }
}

async function onBtnAddToQueueClick(evt) {
  const dataQueue = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  if (dataQueue === null || !dataQueue.length) {
    dataQueue.push(selectedMovie);
    localStorage.setItem('queueMovies', JSON.stringify(dataQueue));
    if (
      pageLibraly.classList.contains('library-header--list__link--active') &&
      libralyQueue.classList.contains('library--btn--active')
    ) {
      onRemoveQueueUpdate(evt);
    }
    evt.target.textContent = 'remove from queue';
    evt.target.classList.remove('description-button__queue');
    evt.target.classList.add('remove-button__queue');

    // Notiflix.Notify.success('This movie added to Queue.');
    return;
  } else {
    queueMovies = dataQueue;
    let isDublicate = false;
    for (let i = 0; i < queueMovies.length; i += 1) {
      if (queueMovies[i].id === selectedMovie.id) {
        isDublicate = true;
      }
    }
    if (!isDublicate) {
      queueMovies.push(selectedMovie);
    }
    localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
    if (
      pageLibraly.classList.contains('library-header--list__link--active') &&
      libralyQueue.classList.contains('library--btn--active')
    ) {
      onRemoveQueueUpdate(evt);
    }
    evt.target.textContent = 'remove from queue';
    evt.target.classList.remove('description-button__queue');
    evt.target.classList.add('remove-button__queue');

    // Notiflix.Notify.success('This movie added to Queue.');
    return;
  }
}

async function onBtnRemoveFromWatchedClick(evt) {
  const dataWatched = JSON.parse(localStorage.getItem('watchedMovies'));
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  for (let i = 0; i < dataWatched.length; i += 1) {
    if (dataWatched[i].id === selectedMovie.id) {
      dataWatched.splice(i, 1);
      localStorage.setItem('watchedMovies', JSON.stringify(dataWatched));
      if (
        pageLibraly.classList.contains('library-header--list__link--active') &&
        libralyWatched.classList.contains('library--btn--active')
      ) {
        onRemoveWatchedUpdate(evt);
      }

      evt.target.textContent = 'add to watched';
      evt.target.classList.remove('remove-button__watched');
      evt.target.classList.add('description-button__watched');
    }
  }
}

async function onBtnRemoveFromQueueClick(evt) {
  const dataQueue = JSON.parse(localStorage.getItem('queueMovies'));
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  for (let i = 0; i < dataQueue.length; i += 1) {
    if (dataQueue[i].id === selectedMovie.id) {
      dataQueue.splice(i, 1);
      localStorage.setItem('queueMovies', JSON.stringify(dataQueue));
      if (
        pageLibraly.classList.contains('library-header--list__link--active') &&
        libralyQueue.classList.contains('library--btn--active')
      ) {
        onRemoveQueueUpdate(evt);
      }
      evt.target.textContent = 'add to queue';
      evt.target.classList.remove('remove-button__queue');
      evt.target.classList.add('description-button__queue');
    }
  }
}

export function onRemoveWatchedUpdate(evt) {
  libraryWrap.innerHTML = ' ';
  watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const noWatched = watchedMovies === null || !watchedMovies.length;

  if (noWatched) {
    const emptyWatched = `<div class="empty-library">
        <p class="empty-library__title">NO MOVIES IN WATCHED!</p>
        <img  class="position" src="https://vitaliyzavgorodniy.github.io/filmoteka-project/no-gallery.7e761724.svg" alt="empty library" />
        </div>`;
    libraryWrap.innerHTML = emptyWatched;
  } else {
    renderMarkup(watchedMovies);
  }
}

export function onRemoveQueueUpdate(evt) {
  libraryWrap.innerHTML = ' ';

  queueMovies = JSON.parse(localStorage.getItem('queueMovies'));
  const noQueue = queueMovies === null || !queueMovies.length;

  if (noQueue) {
    const emptyQueue = `<div class="empty-library">
        <p class="empty-library__title">NO MOVIES TO WATCH IN QUEUE!</p>
        <img  class="position" src="https://vitaliyzavgorodniy.github.io/filmoteka-project/no-gallery.7e761724.svg" alt="empty library" />
        </div>`;
    libraryWrap.innerHTML = emptyQueue;
  } else {
    renderMarkup(queueMovies);
  }
}
