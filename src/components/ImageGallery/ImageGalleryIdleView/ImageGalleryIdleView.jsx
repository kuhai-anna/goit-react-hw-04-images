import PropTypes from 'prop-types';
import { IdleBox, IdleText } from './ImageGalleryIdleView.styled';

export const ImageGalleryIdleView = ({ message }) => {
  return (
    <IdleBox role="alert">
      <IdleText>{message}</IdleText>
    </IdleBox>
  );
};

ImageGalleryIdleView.propTypes = {
  message: PropTypes.string.isRequired,
};
