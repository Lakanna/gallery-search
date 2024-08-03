import createMarkup from './js/render-functions';
import { fetchImg } from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  searchForm: document.querySelector('.js-form'),
  imageList: document.querySelector('.js-list'),
  loader: document.querySelector('.loader'),
};

const params = {
  q: "",
  page: 1,
  perPage: 15,
  maxPage: 1
}

elements.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evn) {
  evn.preventDefault();
  elements.imageList.innerHTML = '';
  
  params.q = evn.currentTarget.elements.searchImg.value.trim();


  if (params.q === '') {
    iziToast.show({
      message: 'Please, input what are you searching!',
      color: 'red',
      position: 'topCenter',
    });
    return;
  }
  console.dir(elements.loader);
  elements.loader.hidden = false;
  console.dir(elements.loader);

  fetchImg(params.q, params.page)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topCenter',
        });
      }
      
      elements.imageList.insertAdjacentHTML('beforeend', createMarkup(hits));
      let gallery = new SimpleLightbox('.image-list a');
      gallery.refresh();
    })
    .catch(error => {
      iziToast.show({
        message: 'Sorry, sometings going wrong. Please try again!',
        color: 'red',
        position: 'topCenter',
      });
      console.log(error);
    })
    .finally(() => {
      elements.loader.hidden = true;
      evn.target.reset();
    });
}

console.log('hello');
// const promis = new Promise((resolve, reject) => {
//   if (1 > 2) {
//     resolve('On resolve');
//   } else {
//     reject('In error');
//   }
// });

// promis
//   .then(value => {
//     console.log(value);
//   })
//   .catch(error => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log('after all');
//   });
