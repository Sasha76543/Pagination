const API_KEY = 'https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo';
const API_URL = 'https://pixabay.com/api/';
let currentPage = 3;

const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
0
 const fetchImages = (async (page) =>{
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&editors_choice=true&image_type=photo&page=${page}&per_page=10`);
    const data = await response.json();
    return data.hits; 
} catch (error) {
    console.error('Помилка завантаження зображень:', error);
    return [];
}

})


const displayImages = ((images) => {
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    gallery.appendChild(img);
});
})


displayImages(images)
loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    const images = await fetchImages(currentPage);
    displayImages(images);
});

(async () => {
    const images = await fetchImages(currentPage);
    displayImages(images);
})();

currentPage = localStorage.getItem('currentPage') || 3;
localStorage.setItem('currentPage', currentPage);