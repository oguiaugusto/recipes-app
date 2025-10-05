import React, { useState } from 'react';
import { LuUserRound } from 'react-icons/lu';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
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

  const [expandedMenu, setExpandedMenu] = useState(false);

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

  const renderProfileButton = (size: number, addClass?: string) => (
    <button title="Profile Page" className={`btn-icon ${addClass}`}>
      <LuUserRound color="#fff" size={size} />
    </button>
  );

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
    <div className="header-categories d-md-none">
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

  const renderSideMenu = () => (
    <div
      className={`header-menu d-none d-md-block px-4 py-3${!expandedMenu ? ' close' : ''}${expandedSearchBar ? ' expanded-search-bar' : ''}`}
    >
      <ul>
        <li className="mb-2">
          <a href="/profile" className="d-flex gap-1 text-light text-decoration-none">
            {renderProfileButton(20)}
            <p className="h5 m-0 mt-1">Profile</p>
          </a>
        </li>
        <li className="mb-2 d-flex flex-column header-menu__categories">
          <p className="h5 m-0 mb-1">Categories</p>
          <ul>
            {categories!.map((x, i) => (
              <li
                key={`category-${i}`}
                className={`ps-3${category === x.strCategory ? ' active' : ''}`}
              >
                <button
                  className="btn-icon text-light w-100 text-start"
                  title={x.strCategory}
                  id={`${x.strCategory}-${i}`}
                  onClick={() => setCategory(x.strCategory)}
                >
                  {x.strCategory}
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="header text-light px-3 py-2 d-flex flex-column">
      <div
        className={`header-top w-100 d-flex justify-content-${hideSearch ? 'center' : 'between'} align-items-center align-self-center`}
      >
        <a href="/profile" className={`${categories?.length ? 'd-md-none' : ''}`}>
          {renderProfileButton(35, `px-2 ${hideSearch ? 'header_profile-button' : ''}`)}
        </a>
        <button
          title="Hamburger Menu"
          className={`btn-icon px-2 d-none ${categories?.length ? 'd-md-block' : ''}`}
          onClick={() => setExpandedMenu((p) => !p)}
        >
          <RxHamburgerMenu color="#fff" size={32} />
        </button>
        <p className="h1 m-0">{title}</p>
        {hideSearch ? null : renderSearchButton()}
      </div>
      {renderSearchBar()}
      {categories?.length ? renderCategories() : null}
      {renderSideMenu()}
    </div>
  );
};

export { Header };
