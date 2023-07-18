import React, { FC } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';

import './Tooltip.css'

type TooltipProps = {
  id: string;
  place: PlacesType;
  content: string;
  className?: string;
};


export const Tooltip: FC<TooltipProps> = ({ id, place, content, className }) => {
  return <ReactTooltip id={id} place={place} content={content} className={`tooltip ${className }`} offset={2}/>;
};
