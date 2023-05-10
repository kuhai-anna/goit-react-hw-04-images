import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
      // window.removeEventListener('keydown', hendleKeyDown);
    }
  }; //Функція 'hendleKeyDown' змушує залежності useEffect Hook (у рядку 23) змінюватися при кожному рендері. Перемістіть його всередину зворотного виклику useEffect. Крім того, оберніть визначення 'hendleKeyDown' у його власний хук useCallback().

  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [hendleKeyDown]);

  const hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={hendleBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

// export class Modal extends Component {
//   static = {
//     onClose: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.hendleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.hendleKeyDown);
//   }

//   hendleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   hendleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.hendleBackdropClick}>
//         <ModalContent>{this.props.children}</ModalContent>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
