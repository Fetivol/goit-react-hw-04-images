import { Component } from 'react';
import Modal from 'react-modal';
import { Image, ModalImage } from './Gallery.styled';
import { LoadMore } from 'components/LoadMoreButton/LoadMoreButton.styled';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export class ModalWindow extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tag } = this.props;

    return (
      <div className="overlay">
        <Image
          src={webformatURL}
          alt={tag}
          loading="lazy"
          onClick={() => this.openModal()}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          style={customStyles}
          contentLabel="Minimal Modal Example"
        >
          <ModalImage src={largeImageURL} alt={tag} />
          <LoadMore onClick={() => this.closeModal()}>Close Modal</LoadMore>
        </Modal>
      </div>
    );
  }
}
