import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ImageGalleryItem({
  searchText,
  page,
  images,
  onUpdate,
  modalShow,
}) {
  const [imagesList, setImagesList] = useState(images);

  useEffect(() => {
    if (searchText !== '') {
      axios
        .get(
          `https://pixabay.com/api/?key=29442752-af1c576492f51578172834418&q=${searchText}&image_type=photo&orientation=orientation&safesearch=true&page=${String(
            page
          )}&per_page=12`
        )
        .then(response => {
          setImagesList(prevState => [...prevState, ...response.data.hits]);
        });
    }
  }, [page, searchText]);

  useEffect(() => {
    onUpdate(imagesList);
  }, [imagesList, onUpdate]);

  return imagesList.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => {
          modalShow(largeImageURL);
        }}
      />
    </li>
  ));
}

export default ImageGalleryItem;
