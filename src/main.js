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
  // btnLoadMore: document.querySelector('.js-btn-load-more'),
  guadr: document.querySelector('.js-guard'),
};
/*
створити обʼєкт параметрів вказавши всі параметри, які ми будемо передавати під час запиту

! Submit
1. повісити обробник події на сабміт форми
  1.1. перевент дефолт
  1.2. очистити всю сторінку від результатів попереднього запиту. Також зкидуємо номер сторінки в параметрах запиту на 1 (page = 1)
  1.3. збираємо запит користувача (з поля вводу)
  1.4. перевіряємо чи користувач взагалі щось ввів (перевірка на пустий рядок з використанням тріму)
  1.5. вмикаємо прелоадер на кнопці (блокуючи натискання на неї) та викликаємо фукнцію запиту (описана окремо)
  1.6. отримуємо дані з серверу та малюємо їх на сторінці
  1.7. розблоковуємо кнопку завантажити більше та прибираємо прелоадер

! Load more
Стани кнопки

1. hidden - стан, коли кнопки взагалі немає на сторінці. В ситуаціях: до запиту, коли немає новин, коли кінець колекції (при полмилці)
2. active - стан, коли кнопка активна до нового натискання та запиту. В ситуаціяї коли користувач може підвантажити нові дані з серверу.
3. disabled - стан, коли йде запит і кнопка повинна бути не активною для натискання, також вона повинна відображати прелоадер. В ситуаціяї, коли користувач натискає на кнопку та чекає відповіді від серверу.

при натисканні на кнопку повинен йти запит на сервер з вказанням сторінки +1

*/

// const params = {
//   q: '',
//   page: 1,
//   per_page: 15,
//   maxPage: 1,
// };

// elements.searchForm.addEventListener('submit', handlerSearch);

// function handlerSearch(evn) {
//   evn.preventDefault();
//   elements.imageList.innerHTML = '';

//   params.q = evn.currentTarget.elements.searchImg.value.trim();

//   if (params.q === '') {
//     iziToast.show({
//       message: 'Please, input what are you searching!',
//       color: 'red',
//       position: 'topCenter',
//     });
//     return;
//   }

//   elements.loader.hidden = false;

//   fetchImg(params.q, params.page, params.per_page)
//     .then(({ totalHits, hits }) => {
//       if (hits.length === 0) {
//         iziToast.show({
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           color: 'red',
//           position: 'topCenter',
//         });
//       }

//       elements.imageList.insertAdjacentHTML('beforeend', createMarkup(hits));
//       let gallery = new SimpleLightbox('.image-list a');

//       params.maxPage = Math.ceil(totalHits / params.per_page);
//       console.log(params.maxPage);
//       gallery.refresh();

//       if (params.maxPage > params.page) {
//         elements.btnLoadMore.classList.remove('is-hidden');
//         elements.btnLoadMore.addEventListener('click', handlerLoadMore);
//       }
//     })
//     .catch(handleError)
//     .finally(() => {
//       elements.loader.hidden = true;
//       evn.target.reset();
//     });
// }

// function handleError(err) {
//   iziToast.show({
//     message: 'Sorry, sometings going wrong. Please try again!',
//     color: 'red',
//     position: 'topCenter',
//   });
//   console.log(err);
// }

// function handlerLoadMore() {
//   elements.btnLoadMore.disabled = true;
//   params.page += 1;
//   console.log(params.page, params.maxPage);

//   fetchImg(params.q, params.page, params.per_page).then(({ hits }) => {
//     elements.imageList.insertAdjacentHTML('beforeend', createMarkup(hits));
//     let gallery = new SimpleLightbox('.image-list a');

//     if (params.maxPage > params.page) {
//       elements.btnLoadMore.disabled = false;
//     }
//     if (params.maxPage === params.page) {
//       elements.btnLoadMore.classList.add('is-hidden');
//       console.log('in if maxPage=page');
//     }
//   });
// }

/**
 * !intersection observer
 */

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 1,
};

const options = {
  root: null,
  rootMargin: '300px',
};

let observer = new IntersectionObserver(handleLoadMore, options);

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

  elements.loader.hidden = false;

  fetchImg(params.q, params.page, params.per_page)
    .then(({ totalHits, hits }) => {
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

      params.maxPage = Math.ceil(totalHits / params.per_page);
      console.log(params.maxPage);
      gallery.refresh();

      if (params.maxPage > params.page) {
        observer.observe(elements.guadr);
      }
    })
    .catch(handleError)
    .finally(() => {
      elements.loader.hidden = true;
      evn.target.reset();
    });
}

function handleError(err) {
  iziToast.show({
    message: 'Sorry, sometings going wrong. Please try again!',
    color: 'red',
    position: 'topCenter',
  });
  console.log(err);
}

function handleLoadMore(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      params.page += 1;

      fetchImg(params.q, params.page, params.per_page)
        .then(({ hits }) => {
          elements.imageList.insertAdjacentHTML(
            'beforeend',
            createMarkup(hits)
          );
          let gallery = new SimpleLightbox('.image-list a');

          if (params.page >= params.maxPage) {
            observer.unobserve(elements.guadr);
            console.log('in if maxPage=page');
          }
        })
        .catch(handleError)
        .finally(() => {
          elements.loader.hidden = true;
        });
    }
  });
}

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
