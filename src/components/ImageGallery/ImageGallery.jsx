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
    if (searchQuery === '') {
      return;
    } else {
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

          // React Hook useEffect має відсутню залежність: 'viewLoadMoreBtn'. Або включіть його, або видаліть масив залежностей. Якщо 'viewLoadMoreBtn' змінюється занадто часто, знайдіть батьківський компонент, який його визначає, і загорніть це визначення в useCallback.
          viewLoadMoreBtn(totalHits); //прередача загальної кількості знайдених картинок

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
    }
  }, [searchQuery, page, viewLoadMoreBtn]);

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
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
  viewLoadMoreBtn: PropTypes.func.isRequired,
};

// export class ImageGallery extends Component {
//   static = {
//     searchQuery: PropTypes.string.isRequired,
//     page: PropTypes.number.isRequired,
//     children: PropTypes.any,
//     onClick: PropTypes.func.isRequired,
//     onSelectImage: PropTypes.func.isRequired,
//     viewLoadMoreBtn: PropTypes.func.isRequired,
//   };

//   state = {
//     images: [],
//     error: null,
//     status: Status.IDLE,
//   };

//   async componentDidUpdate(prevProps, _) {
//     const prevQuery = prevProps.searchQuery;
//     const nextQuery = this.props.searchQuery;
//     const prevPage = prevProps.page;
//     const nextPage = this.props.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ status: Status.PENDING });

//       try {
//         const { hits, totalHits } = await fetchImagesWithQuery(
//           nextQuery,
//           nextPage
//         );
//         const { viewLoadMoreBtn } = this.props;

//         if (prevQuery !== nextQuery) {
//           this.setState({
//             images: hits,
//             status: Status.RESOLVED,
//           });
//         } else if (prevPage !== nextPage) {
//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],
//             status: Status.RESOLVED,
//           }));
//         }

//         viewLoadMoreBtn(totalHits); //прередача загальної кількості знайдених картинок

//         if (hits.length === 0) {
//           throw new Error(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//         }
//       } catch (error) {
//         this.setState({ error, status: Status.REJECTED });
//       }
//     }
//   }

//   render() {
//     const { onClick, onSelectImage, children } = this.props;
//     const { images, error, status } = this.state;

//     // рендер компонентів в залежності від статусу
//     if (status === 'idle') {
//       return (
//         <ImageGalleryIdleView
//           message={
//             'Here you can search for images. To do this, enter your query in the search field.'
//           }
//         />
//       );
//     }

//     if (status === 'pending') {
//       return <Loader />;
//     }

//     if (status === 'rejected') {
//       return (
//         <ImageGalleryErrorView
//           message={`Whoops, something went wrong. ${error.message}`}
//         />
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <Gallery className="gallery">
//           {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//             <ImageGalleryItem
//               key={id}
//               webformatURL={webformatURL}
//               largeImageURL={largeImageURL}
//               tags={tags}
//               onClick={onClick}
//               onSelectImage={onSelectImage}
//             />
//           ))}
//           {children}
//         </Gallery>
//       );
//     }
//   }
// }
