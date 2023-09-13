import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchImage, page) {
  const searchParams = new URLSearchParams({
    key: '38417292-5b95d26e7d476c4dba25cdc67',
    q: searchImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: `${page}`,
    per_page: 12,
  });

  return await axios.get(`?${searchParams}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return await response.data;
  });
}
