import { ButtonWrapper, LoadMore } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <LoadMore onClick={onClick}>Load more</LoadMore>
    </ButtonWrapper>
  );
};
