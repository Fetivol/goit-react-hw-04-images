import { Component } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { fetchImages } from './api';
import { Gallery } from './Gallery/Gallery';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    loadMoreBtn: true,
    error: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    let query = evt.target.elements.query.value.trim();
    if (!query) {
      toast.error('Please fill the form!');
      return;
    }

    this.setState({
      query: `${Date.now()}/${query}`,
      images: [],
      page: 1,
    });
    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const queryString = query.slice(query.indexOf('/') + 1);

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true, loadMoreBtn: false });

      try {
        const searchedImages = await fetchImages(queryString, page);
        if (!searchedImages.totalHits) {
          toast.error('We could not find the images you requested =(');
          return;
        }
        this.updateImages(searchedImages.hits, page, searchedImages.totalHits);
        this.checkIfAllImagesFound(searchedImages.totalHits, page);
      } catch (error) {
        console.error(error);
        this.setState({ loading: false, error: true });
        toast.error('Something went wrong, please reload website!');
      } finally {
        this.setState({ loading: false, error: false });
      }
    }
  }

  updateImages(newImages, page, totalHits) {
    this.setState(prevState => ({
      images: page === 1 ? newImages : [...prevState.images, ...newImages],
    }));
    if (page === 1) {
      toast.success(`We found ${totalHits} images=)`);
    }
  }

  checkIfAllImagesFound(totalHits, page) {
    if (page === Math.ceil(totalHits / 12)) {
      this.setState({ loadMoreBtn: true });
      toast.success(
        'These are all our images for this category=) Try to search something else!'
      );
    }
  }

  render() {
    const { images, loading, loadMoreBtn } = this.state;
    return (
      <Layout>
        <SearchForm onSubmit={this.handleSubmit} />
        {images.length > 0 && <Gallery images={images}>Gallery</Gallery>}
        {loading && <Loader />}
        {images.length > 0 && !loadMoreBtn && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
