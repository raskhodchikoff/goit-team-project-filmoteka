export default function createMarkup(films) {
  return films
    .map(film => {
      return `
      
      <li class="card-set__item" id="${film.id}">
      <a href='#' id='${film.id}' class="card-link">
      <picture>
                    <source srcset="
                    ${film.base_url}w780/${film.poster_path} 1x,
                    ${film.base_url}original/${film.poster_path} 2x" media="(min-width: 1280px)" type="image/jpeg" />
                    <source srcset="
                    ${film.base_url}w342/${film.poster_path} 1x,
                    ${film.base_url}w500/${film.poster_path} 2x" media="(min-width: 768px)" type="image/jpeg" />
                    <source srcset="
                    ${film.base_url}w185/${film.poster_path} 1x,
                    ${film.base_url}w342/${film.poster_path} 2x" media="(max-width: 480px)" type="image/jpeg" />
        <img id="${film.id}"
          loading="lazy"
          src="${film.base_url}w342/${film.poster_path}"
          alt="${film.title}"
          class="card-set__img "/>
                </picture>
      
    
      <h3 class="card-set__title">${film.title}</h3>
      <div class="card-set__description" id="${film.id}">
      <span class="card-set__genre" id="${film.id}">
          ${film.filmGenreList} &nbsp| ${film.releaseYear}
      </span>
      
      </div>
      </a>
      </li>
      `;
    })
    .join('');
}
