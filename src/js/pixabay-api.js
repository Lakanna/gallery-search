import axios from 'axios';

const API_KEY = '40437222-3b8e1aead0ae08f3118e12752';
const API = 'https://pixabay.com/api/';

async function fetchImg(searchedImg) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchedImg,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  // let url = `${API}?${params}`;
  const response = await axios.get(API, { params });
  return response.data;
}

export { fetchImg };
