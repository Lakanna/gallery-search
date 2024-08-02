const API_KEY = '40437222-3b8e1aead0ae08f3118e12752';
const API = 'https://pixabay.com/api/';

function fetchImg(searchedImg) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchedImg,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  let url = `${API}?${params}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchImg };
