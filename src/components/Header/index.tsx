import React, { useState } from 'react';
import { LuUserRound } from 'react-icons/lu';
import { AiOutlineSearch } from 'react-icons/ai';
import { Button, ButtonGroup, Form, InputGroup, ToggleButton } from 'react-bootstrap';
import { ICategory } from '../../interfaces/misc';
import '../../styles/Header.scss';

enum SearchSelector {
  Ingredient = 0,
  Name = 1,
  'First Letter' = 2,
}

type Props = {
  title: string;
  hideSearch?: boolean;
  categories?: ICategory[];
};

const Header: React.FC<Props> = (props) => {
  const { title, hideSearch, categories } = props;

  const [expandedSearchBar, setExpandedSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchSelector, setSearchSelector] = useState<number>(-1);

  const [category, setCategory] = useState('All');

  const searchSelectors = [
    { index: 0, label: SearchSelector[0] },
    { index: 1, label: SearchSelector[1] },
    { index: 2, label: SearchSelector[2] },
  ];

  const handleExpand = () => {
    setExpandedSearchBar((p) => !p);
    setSearchValue('');
    setSearchSelector(-1);
  };

  const renderSearchButton = () => (
    <button title="Search" className="btn-icon px-2" onClick={handleExpand}>
      <AiOutlineSearch color="#fff" size={35} />
    </button>
  );

  const renderSearchBar = () => (
    <div
      className={`header-bottom ${!expandedSearchBar ? 'close' : ''} w-100 d-sm-flex align-items-center align-self-center`}
    >
      <InputGroup className="mt-3 mt-sm-2 mb-1 mb-sm-2">
        <Form.Control
          placeholder="Type something"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="button" title="Search" variant="warning">
          Search
        </Button>
      </InputGroup>
      <div className="header_search-selectors mt-3 mt-sm-2 mb-1 mb-sm-2 d-flex justify-content-around">
        {searchSelectors.map((x) => (
          <Form.Check
            key={`search-selector-${x.index}`}
            type="radio"
            name="search-selector"
            id={x.label}
            label={x.label}
            checked={searchSelector === x.index}
            onChange={() => setSearchSelector(x.index)}
          />
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="header-categories">
      <ButtonGroup>
        {categories!.map((x, i) => (
          <ToggleButton
            key={`category-${i}`}
            type="radio"
            size="sm"
            variant={category === x.strCategory ? 'secondary' : 'dark'}
            title={x.strCategory}
            id={`${x.strCategory}-${i}`}
            value={category}
            checked={category === x.strCategory}
            onChange={() => setCategory(x.strCategory)}
          >
            {x.strCategory}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );

  return (
    <div className="header text-light px-3 py-2 d-flex flex-column">
      <div
        className={`header-top w-100 d-flex justify-content-${hideSearch ? 'center' : 'between'} align-items-center align-self-center`}
      >
        <a href="/profile">
          <button
            title="Profile Page"
            className={`btn-icon px-2 ${hideSearch ? 'header_profile-button' : ''}`}
          >
            <LuUserRound color="#fff" size={35} />
          </button>
        </a>
        <p className="h1 m-0">{title}</p>
        {hideSearch ? null : renderSearchButton()}
      </div>
      {renderSearchBar()}
      {categories?.length ? renderCategories() : null}
    </div>
  );
};

export { Header };
