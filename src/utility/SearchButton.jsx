import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

const SearchButton = ({ handleSearch, handleCancel, placeholder = 'Search' }) => {
  const [searchField, setSearchField] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchClick = () => {
    handleSearch(searchInput);
  };

  const handleCancelClick = () => {
    setSearchInput('');
    handleCancel();
  };

  const closeSearchBar = () => {
    setSearchField();
  };

  const searchHandler = () => {
    if (searchField) {
      handleSearchClick();
    } else {
      setSearchField((prev) => !prev);
    }
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center gap-2 w-full p-1 bg-white shadow-lg rounded-lg transition-all duration-300 ${
          searchField ? 'search-expanded' : 'search-collapsed'
        }`}
      >
        {searchField && (
          <div className="transition ease-in-out duration-300">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              className="flex-grow px-2 outline-none"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={handleCancelClick}
              className={`py-2 px-1 bg-transparent rounded-lg outline-none focus:outline-none ${
                searchInput.trim().length === 0 && 'invisible'
              }`}
            >
              <AiOutlineClose className="text-gray-600" />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={searchHandler}
          className="p-2 bg-lightOrange rounded-lg outline-none focus:outline-none transition-all duration-300"
        >
          <BsSearch className="text-lg" />
        </button>
      </div>
      {searchField && (
        <button
          onClick={closeSearchBar}
          className="p-2 bg-transparent rounded-lg outline-none focus:outline-none"
        >
          <AiOutlineClose className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchButton;
