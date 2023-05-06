import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImagesWithQuery } from 'services/image-api';
import { ImageGalleryErrorView } from './ImageGalleryErrorView/ImageGalleryErrorView';
import { ImageGalleryIdleView } from './ImageGalleryIdleView/ImageGalleryIdleView';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Status } from 'constants/status';

export class ImageGallery extends Component {
  static = {
    searchQuery: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    children: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    onSelectImage: PropTypes.func.isRequired,
    viewLoadMoreBtn: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      try {
        const { hits, totalHits } = await fetchImagesWithQuery(
          nextQuery,
          nextPage
        );
        const { viewLoadMoreBtn } = this.props;

        if (prevQuery !== nextQuery) {
          this.setState({
            images: hits,
            status: Status.RESOLVED,
          });
        } else if (prevPage !== nextPage) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: Status.RESOLVED,
          }));
        }

        viewLoadMoreBtn(totalHits); //прередача загальної кількості знайдених картинок

        if (hits.length === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }

  render() {
    const { onClick, onSelectImage, children } = this.props;
    const { images, error, status } = this.state;

    // рендер компонентів в залежності від статусу
    if (status === 'idle') {
      return (
        <ImageGalleryIdleView
          message={
            'Here you can search for images. To do this, enter your query in the search field.'
          }
        />
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <ImageGalleryErrorView
          message={`Whoops, something went wrong. ${error.message}`}
        />
      );
    }

    if (status === 'resolved') {
      return (
        <Gallery className="gallery">
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
  }
}
