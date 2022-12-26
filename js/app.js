let heroBanner = document.getElementById('hero-banner')
let heroTitle = document.getElementById('title')
let heroDescription = document.getElementById('p-description')
let newMoviesSliders = document.getElementById('new-movies')
newMoviesSliders.innerHTML = ''
let recoMoviesSliders = document.getElementById('reco-movies')
recoMoviesSliders.innerHTML = ''
let newSeriesSliders = document.getElementById('new-series')
newSeriesSliders.innerHTML = ''
let recoSeriesSliders = document.getElementById('reco-series')
recoSeriesSliders.innerHTML = ''
const prevNewMov = document.getElementById('prev-new-mov')
const nextNewMov = document.getElementById('next-new-mov')
const prevRecoMov = document.getElementById('prev-reco-mov')
const nextRecoMov = document.getElementById('next-reco-mov')
const prevNewSer = document.getElementById('prev-new-ser')
const nextNewSer = document.getElementById('next-new-ser')
const prevRecoSer = document.getElementById('prev-reco-ser')
const nextRecoSer = document.getElementById('next-reco-ser')

fetch('http://localhost:3000/series')
  .then(response => response.json())
  .then(data => {
    heroBanner.setAttribute('src',data[0].banner)
    heroBanner.setAttribute('alt',data[0].title)
    heroTitle.innerHTML = data[0].title
    heroDescription.innerHTML = data[0].description
    for (i = 0; i < data.length/2; i++) {
      newSeriesSliders.innerHTML += `<img src="${data[i].image}" alt="${data[i].title}" class="img-element">`
    }
    for (i = i; i < data.length; i++) {
      recoSeriesSliders.innerHTML += `<img src="${data[i].image}" alt="${data[i].title}" class="img-element">`
    }
  });

fetch('http://localhost:3000/movies')
  .then(response => response.json())
  .then(data => {
    for (i = 0; i < data.length/2; i++) {
      newMoviesSliders.innerHTML += `<img src="${data[i].image}" alt="${data[i].title}" class="img-element">`
    }
    for (i = i; i < data.length; i++) {
      recoMoviesSliders.innerHTML += `<img src="${data[i].image}" alt="${data[i].title}" class="img-element">`
    }
  });

prevNewMov.addEventListener('click', () => {
  newMoviesSliders.scrollLeft -= 305
})

nextNewMov.addEventListener('click', () => {
  newMoviesSliders.scrollLeft += 305
})

prevRecoMov.addEventListener('click', () => {
  recoMoviesSliders.scrollLeft -= 305
})

nextRecoMov.addEventListener('click', () => {
  recoMoviesSliders.scrollLeft += 305
})

prevNewSer.addEventListener('click', () => {
  newSeriesSliders.scrollLeft -= 305
})

nextNewSer.addEventListener('click', () => {
  newSeriesSliders.scrollLeft += 305
})

prevRecoSer.addEventListener('click', () => {
  recoSeriesSliders.scrollLeft -= 305
})

nextRecoSer.addEventListener('click', () => {
  recoSeriesSliders.scrollLeft += 305
})