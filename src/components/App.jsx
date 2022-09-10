import React, { useState } from 'react';
import './styles.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export function App() {
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');

  const toggleModal = url => {
    setLargeImageURL(url);
  };

  const onSubmit = searchTextForm => {
    if (searchText !== searchTextForm) {
      setSearchText(searchTextForm);
      setPage(1);
      setImages([]);
    }
  };

  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          onModalClose={() => setLargeImageURL('')}
        />
      )}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        <ImageGalleryItem
          searchText={searchText}
          page={page}
          images={images}
          onUpdate={imagesList => setImages(imagesList)}
          modalShow={toggleModal}
        />
      </ImageGallery>
      {!images.length || <Button onClick={onClickLoadMore} />}
    </div>
  );
}

export default App;
