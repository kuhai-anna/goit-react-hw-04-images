import PropTypes from 'prop-types';
import { ErrorBox, ErrorText } from './ImageGalleryErrorView.styled';

export const ImageGalleryErrorView = ({ message }) => {
  return (
    <ErrorBox role="alert">
      <ErrorText>{message}</ErrorText>
    </ErrorBox>
  );
};

ImageGalleryErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};
