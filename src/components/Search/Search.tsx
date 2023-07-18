import React from 'react';

import {useSearch} from "../../hooks";

import Logo from '../../assets/svg/ComposeLogo.png';
import HelpIcon from '../../assets/svg/help-icon.svg';

import './Search.css';

interface SearchProps {
  tip: string
  setOptions: (value: string) => void;
  handleSetTip: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({setOptions, handleSetTip, tip}) => {
  const {value, textAreaRef, showHelp, handleChange, handleKeyDown, handleSelect} = useSearch(setOptions, handleSetTip, tip)

  return (
    <header>
      <img src={Logo} alt="logo" className="logoIcon"/>
      <div className="textareaContainer">
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          value={value} rows={1}
        />
      </div>
      {showHelp && <div className="help">
        <img src={HelpIcon} alt="help-icon" className="helpIcon" data-tooltip-id="tooltip"/>
      </div>}
    </header>
  );
};
