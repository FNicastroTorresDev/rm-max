const idMovie = JSON.parse(sessionStorage.getItem('idSelected'))

fetch(`http://localhost:3000/movies/${idMovie.id}`)
  .then(response => response.json())
  .then(data => {
    const movieTitle = data.title
    document.getElementById('page-title').innerHTML = movieTitle
    document.getElementById('image-movie').setAttribute('src',data.image)
    document.getElementById('image-movie').setAttribute('salt',movieTitle)
    document.getElementById('trailer-movie').setAttribute('href',data.trailer)
    document.getElementById('title-movie').innerHTML = movieTitle
    document.getElementById('genres-movie').innerHTML = data.genres
    document.getElementById('director-movie').innerHTML = data.director
    document.getElementById('year-movie').innerHTML = data.year
    document.getElementById('description-movie').innerHTML = data.description
    document.getElementById('more-movie').setAttribute('href',data.more)
  })