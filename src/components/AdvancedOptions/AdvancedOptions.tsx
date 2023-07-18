import React from "react";

import ChevronDown from '../../assets/svg/ChevronDown.svg';
import ZapFast from '../../assets/svg/ZapFast.svg';

import './AdvancedOptions.css';

export const AdvancedOptions: React.FC= () => {
  return (
    <footer>
      <img src={ZapFast} alt="icon - ZapFast" className="zapFastIcon"/>
      <span className="text">Advanced Options</span>
      <img src={ChevronDown} alt="icon - ChevronDown" className="arrowIcon"/>
    </footer>
  )
}
