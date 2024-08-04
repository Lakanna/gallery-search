function createMarkup(arr) {
  return arr
    .map(
      ({
        comments,
        likes,
        downloads,
        views,
        largeImageURL,
        webformatURL,
        tags,
      }) => {
        return `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="img-container">
             <img src="${webformatURL}" alt="${tags}" />
          </a>
          <ul class="tags-list">
               <li class="tags-item">Comments:<span class="tags-item-span"> ${comments}</span></li>
               <li class="tags-item">Likes:<span class="tags-item-span"> ${likes}</span></li>
               <li class="tags-item">Views:<span class="tags-item-span"> ${views}</span> </li>
               <li class="tags-item">Downloads:<span class="tags-item-span"> ${downloads}</span></li>
          </ul>
        </li>`;
      }
    )
    .join('');
}

export default createMarkup;
