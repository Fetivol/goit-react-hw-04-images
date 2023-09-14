import { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { fetchImages } from './api';
import { Gallery } from './Gallery/Gallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    let query = evt.target.elements.query.value.trim();
    if (!query) {
      toast.error('Please fill the form!');
      return;
    }
    setQuery(`${Date.now()}/${query}`);
    setImages([]);
    setPage(1);
    setError(error);
    evt.target.reset();
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const updateImages = (newImages, page, totalHits) => {
    setImages(prevImages =>
      page === 1 ? newImages : [...prevImages, ...newImages]
    );
    if (page === 1) {
      toast.success(`We found ${totalHits} images=)`);
    }
  };

  const checkIfAllImagesFound = (totalHits, page) => {
    if (page === Math.ceil(totalHits / 12)) {
      setLoadMoreBtn(true);
      toast.success(
        'These are all our images for this category=) Try to search something else!'
      );
      return;
    }
    setLoadMoreBtn(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getQuery() {
      const queryString = query.slice(query.indexOf('/') + 1);

      try {
        setLoading(true);
        const searchedImages = await fetchImages(queryString, page);
        if (!searchedImages.totalHits) {
          toast.error('We could not find the images you requested =(');
          return;
        }
        updateImages(searchedImages.hits, page, searchedImages.totalHits);
        checkIfAllImagesFound(searchedImages.totalHits, page);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
        toast.error('Something went wrong, please reload website!');
      } finally {
        setLoading(false);
        setError(false);
      }
    }
    getQuery();
  }, [page, query]);

  return (
    <Layout>
      <SearchForm onSubmit={handleSubmit} />
      {images.length > 0 && <Gallery images={images}>Gallery</Gallery>}
      {loading && <Loader />}
      {images.length > 0 && !loadMoreBtn && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      <Toaster />
      <GlobalStyle />
    </Layout>
  );
};
