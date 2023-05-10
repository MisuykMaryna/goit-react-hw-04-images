import { useState, useEffect} from 'react';
import { getImages } from 'services/Api';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoaderSpinner } from 'components/LoaderSpinner/LoaderSpinner';
import { LoadButton } from 'components/LoadButton/LoadButton';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   


export function App () {
 
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState('');

  
 useEffect(() => {
     if (!query) {
      return;
    }
    setIsLoading (true)
   getImages(query, page)
     .then(({ hits, totalHits }) => {
       if (totalHits > page * 12) {
         setLoadMore(true);
          }else {
         toast.info('You have seen all the pictures')
         setLoadMore(false);
          }
       if (!hits.length) {
         setIsEmpty(true)
         return;
       }
       setImages(images => [...images, ...normalaziedData(hits)]);
       setLoadMore(() => page < Math.ceil(totalHits / 12));
     })
     .catch(error => {
       setError(`${error}`);
     })
     .finally(() => setIsLoading(false));
 }, [query, page])
  
const normalaziedData = arr => {
  return arr.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));
};

  const handleFormSubmit = query => {
    setQuery(query);
    setIsLoading(false);
    setPage(1);
    setLargeImageURL('');
    setShowModal(false);
    setLoadMore(false);
    setIsEmpty(false);
    setError('');
    setImages('');
  };

  const onLoadMore = () => {
     setPage(page => page + 1);
  };
   const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

   const closeModal = () => {
    setShowModal (false);
  };

  const toggleOnLoading = () => {
     setIsLoading(isLoading => !isLoading);
  };
  
    return (
      <>
        <ToastContainer autoClose={2000} />
        <SearchForm onSubmit={handleFormSubmit} value={query} />
         {isEmpty && (
          <h2 className={css.errorMsg}>
            Sorry, there is no images for {query}!
          </h2>
        )}
        {error && <h2 className={css.errorMsg}>{error}</h2>}
      
        {images && <ImageGallery
          images={images}
          openModal={openModal}
          toggleOnLoading={toggleOnLoading}
        />}
        {isLoading && <LoaderSpinner />}
        {loadMore && <LoadButton onLoadMore={onLoadMore} />}
         {showModal && (
          <Modal onClose={closeModal}
            onLoad={toggleOnLoading}
              largeImageURL={largeImageURL}>
          </Modal>
        )}
        </>
    )
}



