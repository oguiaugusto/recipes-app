import React from 'react';
import { LuUserRound } from 'react-icons/lu';
import { AiOutlineSearch } from 'react-icons/ai';
import '../../styles/Header.scss';

type Props = {
  title: string;
  hideSearch?: boolean;
};

const Header: React.FC<Props> = (props) => {
  const { title, hideSearch } = props;

  const renderSearchButton = () => (
    <button title="Search" className="btn-icon px-2">
      <AiOutlineSearch color="#fff" size={35} />
    </button>
  );

  return (
    <div className="header text-light px-3 py-2">
      <div
        className={`header-wrapper d-flex justify-content-${hideSearch ? 'center' : 'between'} align-items-center align-self-sm-center position-relative`}
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
    </div>
  );
};

export { Header };
