import { useState, useCallback } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Section } from './Section/Section';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { ModalImage } from './App.styled';
import { Status } from 'constants/status';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  // передача пошукового запиту при сабміті форми
  const handleFormSubmit = ({ searchQuery, page }) => {
    setSearchQuery(searchQuery);
    setPage(page);
    setStatus(Status.PENDING);
  };

  //прередача загальної кількості знайдених картинок при отриманні результату запиту
  const viewLoadMoreBtn = useCallback(
    (totalHits, status) => {
      setTotalHits(totalHits);
      setStatus(status);
    },
    [setTotalHits, setStatus]
  );

  // відкриття та закриття модалки
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  // збільшення номеру сторінки при кліку на кнопку
  const loadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
    setStatus(Status.PENDING);
  };

  const notLastPage = page < Math.ceil(totalHits / 12);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <Section>
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          onClick={toggleModal}
          onSelectImage={setSelectedImg}
          viewLoadMoreBtn={viewLoadMoreBtn}
        />
        {showModal && (
          <Modal onClose={toggleModal}>
            <ModalImage src={selectedImg} alt="" />
          </Modal>
        )}

        {totalHits > 12 && notLastPage && status === Status.RESOLVED && (
          <Button onClick={loadMoreBtnClick} />
        )}
      </Section>
    </>
  );
};
