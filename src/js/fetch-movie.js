export function getMovieById(id) {
  const KEY = 'd2c21f22a2d4ccc40e22a6b0b1329764';

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=eng`
  )
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
