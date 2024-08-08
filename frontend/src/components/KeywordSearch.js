import "../App.css";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { React } from "react";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
`;

const SearchEntry = styled.input`
  height: 30px;
`;

const SearchButton = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

function KeywordSearch({ setKeywords }) {

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    setKeywords(e.target.search.value);
  }

  return (
    <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchEntry
          name="search"
          placeholder="Search for logs"
        />
        <SearchButton type="submit">
          <FaSearch size={31} />
        </SearchButton>
      </SearchWrapper>
    </form>
  );
}

export default KeywordSearch;
