import './sass/main.scss';
import Notiflix from 'notiflix';
import { debounce } from 'lodash';
import { fetchImages } from './fetchImages';

const qs = selector => document.querySelector(selector);
const input = qs('.search-form__input');
const btnSearch = qs('button');
const gallery = qs('.gallery');
const btnLoadMore = qs('.load-more');

let pageNumber = 1;

const searchImagesValue = e => {
  e.preventDefault();
  fetchImages(input.value, pageNumber)
    .then(photos => {
      if (pageNumber < 1) {
        gallery.innerHTML = '';
      }
      if (pageNumber >= 1) {
        btnLoadMore.style.display = 'block';
      }
      renderImages(photos);
      pageNumber += 1;
    })
    .catch(err => console.log(err));
};

function renderImages(photos) {
  photos.hits.forEach(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      gallery.innerHTML += `<div class="photo-card">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b class="info-item__description">Likes
            <span class="info-item__count">${likes}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Views
            <span class="info-item__count">${views}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Comments
            <span class="info-item__count">${comments}</span>
            </b>
          </p>
          <p class="info-item">
            <b class="info-item__description">Downloads
            <span class="info-item__count">${downloads}</span>
            </b>
          </p>
        </div>
      </div>`;
    },
  );
}

function newSearch() {
  // gallery.innerHTML = '';
  searchImagesValue();
}

btnSearch.addEventListener('click', searchImagesValue);
btnLoadMore.addEventListener('click', searchImagesValue);
