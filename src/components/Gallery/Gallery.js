import { ImageList } from './Gallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const Gallery = ({ images }) => {
  return (
    <ImageList>
      {images.map(image => {
        return <ImageGalleryItem image={image} key={image.id} />;
      })}
    </ImageList>
  );
};
