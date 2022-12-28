let tBodyMovies = document.getElementById('table-body-movies')
let tBodySeries = document.getElementById('table-body-series')
let movieLength
let serieLength

fetch('http://localhost:3000/movies')
  .then(response => response.json())
  .then(data => {
    movieLength = data.length

    data.forEach(movie => {
      let movieRow = document.createElement('tr')
      let published
      let favoriteIcon

      if (movie.published) {
        published = 'Sí'
      } else {
        published = 'No'
      }

      if (movie.favorite) {
        movieRow.setAttribute('class','table-warning')
        favoriteIcon = 'bi bi-star-fill'
      } else {
        favoriteIcon = 'bi bi-star'
      }

      movieRow.scope = 'row'
      movieRow.innerHTML = `
        <td>${movie.id}</td>
        <td class="fw-bold">${movie.title}</td>
        <td>${movie.genres}</td>
        <td>${movie.description}</td>
        <td>${published}</td>
        <td>
          <i id="${movie.id}" class="${favoriteIcon}" title="Destacar" onclick="favoriteMovie(this)"></i>
          <i id="${movie.id}" class="bi bi-pen" title="Editar" data-bs-toggle="modal" data-bs-target="#editMovieModal" onclick="loadDataMovie(this)"></i>
          <i id="${movie.id}" class="bi bi-trash" title="Eliminar" onclick="deleteMovie(this)"></i>
        </td>
        `
      tBodyMovies.appendChild(movieRow)
    });
  })

fetch('http://localhost:3000/series')
  .then(response => response.json())
  .then(data => {
    serieLength = data.length

    data.forEach(serie => {
      let serieRow = document.createElement('tr')
      let published
      let favoriteIcon

      if (serie.published) {
        published = 'Sí'
      } else {
        published = 'No'
      }

      if (serie.favorite) {
        serieRow.setAttribute('class','table-warning')
        favoriteIcon = 'bi bi-star-fill'
      } else {
        favoriteIcon = 'bi bi-star'
      }

      serieRow.scope = 'row'
      serieRow.innerHTML = `
        <td>${serie.id}</td>
        <td class="fw-bold">${serie.title}</td>
        <td>${serie.genres}</td>
        <td>${serie.description}</td>
        <td>${serie.seasons}</td>
        <td>${published}</td>
        <td>
          <i id="${serie.id}" class="${favoriteIcon}" title="Destacar" onclick="favoriteSerie(this)"></i>
          <i id="${serie.id}" class="bi bi-pen" title="Editar" data-bs-toggle="modal" data-bs-target="#editSerieModal" onclick="loadDataSerie(this)"></i>
          <i id="${serie.id}" class="bi bi-trash" title="Eliminar" onclick="deleteSerie(this)"></i>
        </td>
        `
      tBodySeries.appendChild(serieRow)
    });
  })

function favoriteMovie(element) {
  let newFavorite
  if (element.getAttribute('class') === 'bi bi-star') {
    newFavorite = true
  } else {
    newFavorite = false
  }
  fetch(`http://localhost:3000/movies/${element.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorite: newFavorite
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
}

function addMovie() {
  fetch('http://localhost:3000/movies', {
  method: 'POST',
  body: JSON.stringify({
    id: movieLength+1,
    title: document.getElementById('movieTitle').value,
    genres: document.getElementById('movieGenres').value,
    year: document.getElementById('movieYear').value,
    description: document.getElementById('movieDescription').value,
    image: "",
    trailer: "",
    director: document.getElementById('movieDirector').value,
    more: "",
    published: false,
    favorite: false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then(() => window.location.reload());
}

function deleteMovie(element) {
  const isDelete = confirm('Está por eliminar una película, ¿está seguro?')

  if (isDelete) {
    fetch(`http://localhost:3000/movies/${element.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => window.location.reload())
  } else {
    alert('Operación cancelada.')
  }
}

function loadDataMovie(element) {
  fetch(`http://localhost:3000/movies/${element.id}`)
    .then(response => response.json())
    .then(data => {
      const movieEditId = {
        id: data.id
      }
      window.sessionStorage.setItem('movieEdit', JSON.stringify(movieEditId))
      document.getElementById('editMovieTitle').value = data.title
      document.getElementById('editMovieGenres').value = data.genres
      document.getElementById('editMovieYear').value = data.year
      document.getElementById('editMovieDescription').value = data.description
      document.getElementById('editMovieDirector').value = data.director
    })
}

function editMovie() {
  const isEdited = confirm('Está por editar datos, ¿está seguro?')

  if (isEdited) {
    const editedMovie = JSON.parse(sessionStorage.getItem('movieEdit'))
    fetch(`http://localhost:3000/movies/${editedMovie.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: document.getElementById('editMovieTitle').value,
        genres: document.getElementById('editMovieGenres').value,
        year: document.getElementById('editMovieYear').value,
        description: document.getElementById('editMovieDescription').value,
        director: document.getElementById('editMovieDirector').value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
  } else {
    alert('Operación cancelada')
  }
}

function favoriteSerie(element) {
  let newFavorite
  if (element.getAttribute('class') === 'bi bi-star') {
    newFavorite = true
  } else {
    newFavorite = false
  }
  fetch(`http://localhost:3000/series/${element.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorite: newFavorite
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
}

function addSerie() {
  fetch('http://localhost:3000/series', {
  method: 'POST',
  body: JSON.stringify({
    id: serieLength+1,
    title: document.getElementById('serieTitle').value,
    genres: document.getElementById('serieGenres').value,
    seasons: document.getElementById('serieSeassons').value,
    description: document.getElementById('serieDescription').value,
    image: "",
    trailer: "",
    showrunner: document.getElementById('serieShowrunner').value,
    more: "",
    published: false,
    favorite: false
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then(() => window.location.reload());
}

function deleteSerie(element) {
  const isDelete = confirm('Está por eliminar una serie, ¿está seguro?')

  if (isDelete) {
    fetch(`http://localhost:3000/series/${element.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => window.location.reload())
  } else {
    alert('Operación cancelada.')
  }
}

function loadDataSerie(element) {
  fetch(`http://localhost:3000/series/${element.id}`)
    .then(response => response.json())
    .then(data => {
      const serieEditId = {
        id: data.id
      }
      window.sessionStorage.setItem('serieEdit', JSON.stringify(serieEditId))
      document.getElementById('editSerieTitle').value = data.title
      document.getElementById('editSerieGenres').value = data.genres
      document.getElementById('editSerieSeassons').value = data.seasons
      document.getElementById('editSerieDescription').value = data.description
      document.getElementById('editSerieShowrunner').value = data.showrunner
    })
}

function editSerie() {
  const isEdited = confirm('Está por editar datos, ¿está seguro?')

  if (isEdited) {
    const editedSerie = JSON.parse(sessionStorage.getItem('serieEdit'))
    fetch(`http://localhost:3000/series/${editedSerie.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: document.getElementById('editSerieTitle').value,
        genres: document.getElementById('editSerieGenres').value,
        seasons: document.getElementById('editSerieSeassons').value,
        description: document.getElementById('editSerieDescription').value,
        showrunner: document.getElementById('editSerieShowrunner').value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((response) => response.json())
      .then(() => window.location.reload());
  } else {
    alert('Operación cancelada')
  }
}