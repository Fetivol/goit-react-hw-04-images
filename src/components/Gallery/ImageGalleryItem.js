import { ModalWindow } from './ModalWindow';

export const ImageGalleryItem = ({ image }) => {
  return (
    <li>
      <ModalWindow
        webformatURL={image.webformatURL}
        largeImageURL={image.largeImageURL}
        tag={image.tag}
      />
    </li>
  );
};
