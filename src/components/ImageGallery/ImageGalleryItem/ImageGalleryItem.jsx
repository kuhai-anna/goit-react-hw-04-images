import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
  onSelectImage,
}) => {
  const handleImageClick = () => {
    onClick();
    onSelectImage(largeImageURL);
  };

  return (
    <GalleryItem className="gallery-item">
      <GalleryImage src={webformatURL} alt={tags} onClick={handleImageClick} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
