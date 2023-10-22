import { galleryItems } from './gallery-items.js';
// Change code below this line

const list = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    galleryItem => `<li class="gallery__item">
  <a class="gallery__link" href="${galleryItem.original}">
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
  </a>
</li>`
  )
  .join('');

list.innerHTML = markup;

const openImage = e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();

  const srcFullImage = e.target.dataset.source;

  const instance = basicLightbox.create(`<img src="${srcFullImage}">`);
  instance.show();

  const closeImage = ev => {
    if (ev.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeImage);
    }
  };
  window.addEventListener('keydown', closeImage);
  instance.element().addEventListener('click', event => {
    if (event.target.nodeName === 'IMG') {
      return;
    }
    instance.close();
    window.removeEventListener('keydown', closeImage);
  });
};

list.addEventListener('click', openImage);
