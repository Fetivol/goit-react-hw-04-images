import { Button, Form, Input, SearchBar } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  return (
    <SearchBar>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="query"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
        <Button type="submit">Search</Button>
      </Form>
    </SearchBar>
  );
};
