
    const API_KEY = 'https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo'; 
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 3; 

let currentPage = 1;

const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const loader = document.getElementById('loader');


async function fetchImages(page = 1) {
  const url = `${API_URL}?key=${API_KEY}&editors_choice=true&per_page=${PER_PAGE}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching data');
    const data = await response.json();
    return data.hits; 
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'image-card';
  card.innerHTML = `
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  `;
  return card;
}

function renderImages(images) {
  const fragment = document.createDocumentFragment();
  images.forEach(image => {
    const card = createImageCard(image);
    fragment.appendChild(card);
  });
  gallery.appendChild(fragment);
}

async function loadImages() {
  loader.style.display = 'block';
  loadMoreButton.disabled = true;

  const images = await fetchImages(currentPage);
  loader.style.display = 'none';
  loadMoreButton.disabled = false;

  if (images && images.length > 0) {
    renderImages(images);
    currentPage++;
  } else {
    loadMoreButton.style.display = 'none'; 
  }
}

loadMoreButton.addEventListener('click', loadImages);

loadImages();


