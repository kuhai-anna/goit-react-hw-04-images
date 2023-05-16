import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImagesWithQuery } from 'services/image-api';
import { ImageGalleryErrorView } from './ImageGalleryErrorView/ImageGalleryErrorView';
import { ImageGalleryIdleView } from './ImageGalleryIdleView/ImageGalleryIdleView';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Status } from 'constants/status';

export const ImageGallery = ({
  searchQuery,
  page,
  children,
  onClick,
  onSelectImage,
  viewLoadMoreBtn,
}) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchQuery) {
      // перший рендер - це порожній рядок, не робимо http-запит
      return;
    }

    async function getImages() {
      setStatus(Status.PENDING);
      try {
        const { hits, totalHits } = await fetchImagesWithQuery(
          searchQuery,
          page
        );

        page === 1
          ? setImages(hits)
          : setImages(prevState => [...prevState, ...hits]);
        setStatus(Status.RESOLVED);

        viewLoadMoreBtn(totalHits, Status.RESOLVED); //прередача загальної кількості знайдених картинок

        if (hits.length === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }

    getImages();
  }, [searchQuery, page, viewLoadMoreBtn]);

  // рендер компонентів в залежності від статусу
  if (status === Status.IDLE) {
    return (
      <ImageGalleryIdleView
        message={
          'Here you can search for images. To do this, enter your query in the search field.'
        }
      />
    );
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return (
      <ImageGalleryErrorView
        message={`Whoops, something went wrong. ${error.message}`}
      />
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onClick}
            onSelectImage={onSelectImage}
          />
        ))}
        {children}
      </Gallery>
    );
  }
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  viewLoadMoreBtn: PropTypes.func.isRequired,
};
