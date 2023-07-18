import React from 'react';

import {useInlineText, useListOption} from '../../hooks';
import {AdvancedOptions, List, Search, Tip, Tooltip} from '../../components';
import {TOOLTIP_CONTENT} from "../../constants";

import './InlineText.css';

export interface InlineTextProps {
  id?: string;
}

export const InlineText: React.FC<InlineTextProps> = ({id}) => {
  const options = useListOption();
  const {currentOption, handleSetOptions, handleSetTip, tip, showTip} = useInlineText(options);

  return (
    <div id={id} className="wrapper">
      <Search setOptions={handleSetOptions} tip={tip} handleSetTip={handleSetTip}/>
      <List options={currentOption} />
      {showTip && <Tip setTip={handleSetTip} />}
      <AdvancedOptions/>
      <Tooltip id="tooltip" content={TOOLTIP_CONTENT} place="top-end"/>
    </div>
  );
};
