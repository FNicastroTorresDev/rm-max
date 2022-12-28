const idSerie = JSON.parse(sessionStorage.getItem('idSelected'))

fetch(`http://localhost:3000/series/${idSerie.id}`)
  .then(response => response.json())
  .then(data => {
    const serieTitle = data.title
    document.getElementById('page-title').innerHTML = serieTitle
    document.getElementById('image-serie').setAttribute('src',data.image)
    document.getElementById('image-serie').setAttribute('salt',serieTitle)
    document.getElementById('trailer-serie').setAttribute('href',data.trailer)
    document.getElementById('title-serie').innerHTML = serieTitle
    document.getElementById('genres-serie').innerHTML = data.genres
    document.getElementById('showrunner-serie').innerHTML = data.showrunner
    document.getElementById('seasons-serie').innerHTML = data.seasons
    document.getElementById('description-serie').innerHTML = data.description
    document.getElementById('more-serie').setAttribute('href',data.more)
  })