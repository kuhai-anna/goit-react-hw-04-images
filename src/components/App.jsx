// import { Component } from 'react';
import { useState } from 'react';
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
  const viewLoadMoreBtn = (totalHits, status) => {
    setTotalHits(totalHits);
    setStatus(status);
  };

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

  if (status !== 'resolved') {
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
        </Section>
      </>
    );
  }

  if (status === 'resolved') {
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

          {totalHits > 12 && notLastPage && (
            <Button onClick={loadMoreBtnClick} />
          )}
        </Section>
      </>
    );
  }

  // return (
  //   <>
  //     <Searchbar onSubmit={handleFormSubmit} />
  //     <Section>
  //       <ImageGallery
  //         searchQuery={searchQuery}
  //         page={page}
  //         onClick={toggleModal}
  //         onSelectImage={setSelectedImg}
  //         viewLoadMoreBtn={viewLoadMoreBtn}
  //       />
  //       {showModal && (
  //         <Modal onClose={toggleModal}>
  //           <ModalImage src={selectedImg} alt="" />
  //         </Modal>
  //       )}

  //       {totalHits > 12 && notLastPage && <Button onClick={loadMoreBtnClick} />}
  //     </Section>
  //   </>
  // );
};

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     totalHits: null,
//     selectedImg: null,
//     showModal: false,
//   };

//   // передача пошукового запиту при сабміті форми
//   handleFormSubmit = (searchQuery, page) => {
//     this.setState({ ...searchQuery, ...page });
//   };

//   // передача посилання на активну картинку при кліку на картинку
//   selectedImg = largeImageURL => {
//     this.setState({ selectedImg: largeImageURL });
//   };

//   //прередача загальної кількості знайдених картинок при отриманні результату запиту
//   viewLoadMoreBtn = totalHits => {
//     this.setState({ totalHits });
//   };

//   // відкриття та закриття модалки
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   // збільшення номеру сторінки при кліку на кнопку
//   loadMoreBtnClick = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   render() {
//     const { searchQuery, page, totalHits, showModal, selectedImg } = this.state;

//     const notLastPage = page < Math.ceil(totalHits / 12);

//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <Section>
//           <ImageGallery
//             searchQuery={searchQuery}
//             page={page}
//             onClick={this.toggleModal}
//             onSelectImage={this.selectedImg}
//             viewLoadMoreBtn={this.viewLoadMoreBtn}
//           >
//             {showModal && (
//               <Modal onClose={this.toggleModal}>
//                 <ModalImage src={selectedImg} alt="" />
//               </Modal>
//             )}
//           </ImageGallery>

//           {totalHits > 12 && notLastPage && (
//             <Button onClick={this.loadMoreBtnClick} />
//           )}
//         </Section>
//       </>
//     );
//   }
// }
