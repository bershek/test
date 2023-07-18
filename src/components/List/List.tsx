import React from 'react';

import {ListOption} from '../../hooks/useListOption';

import './List.css';
import {useList} from "../../hooks";

export interface ListProps {
  options: ListOption[];
}


export const List: React.FC<ListProps> = ({options}) => {
  const listOptions = useList(options);

  return (
    <div className="listWrapper">
      <p className="typeAnything">Type anything or...</p>
      <ul className="list">{listOptions}</ul>
    </div>
  );
};
