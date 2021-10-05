import './sass/main.scss';
import { fetchImages } from './fetchImages';

const qs = selector => document.querySelector(selector);
const input = qs('.search-form__input');
const btnSearch = qs('button');
const gallery = qs('.gallery');

const searchImagesValue = e => {
  e.preventDefault();
  fetchImages(input.value)
    .then(photos => {
      console.log(photos);
      renderImages(photos);
    })
    .catch(err => console.log(err));
};

function renderImages(photos) {
  // console.log(photos.hits);
  const markup = photos.hits.forEach(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');
      gallery.append(photoCard);

      const imgCard = document.createElement('img');
      imgCard.src = webformatURL;
      imgCard.alt = 'opis';
      imgCard.loading = 'lazy';
      photoCard.append(imgCard);

      const info = document.createElement('div');
      info.classList.add('info');
      photoCard.append(info);

      const infoItem = document.createElement('p');
      infoItem.classList.add('info-item');
      info.append(infoItem);

      const likesDesc = document.createElement('b');
      likesDesc.innerHTML = 'Likes';
      infoItem.append(likesDesc);
      const likesNumb = document.createElement('b');
      likesNumb.innerHTML = likes;
      infoItem.append(likesNumb);

      // console.log(likes);
      //   return `<div class="photo-card">
      //   <img src="${webformatURL}" alt="desc" loading="lazy" />
      //   <div class="info">
      //     <p class="info-item">
      //       <b>Likes</b>
      //       <b>${likes}</b>
      //     </p>
      //     <p class="info-item">
      //       <b>Views</b>
      //       <b>${views}</b>
      //     </p>
      //     <p class="info-item">
      //       <b>Comments</b>
      //       <b>${comments}</b>
      //     </p>
      //     <p class="info-item">
      //       <b>Downloads</b>
      //       <b>${downloads}</b>
      //     </p>
      //   </div>
      // </div>
      // `;

      // console.log(`photos map = ${webformatURL}`);
    },
  );
  // gallery.innerHTML = markup;
}

const resetGallery = () => {
  gallery.innerHTML = '';
};

btnSearch.addEventListener('click', searchImagesValue);
