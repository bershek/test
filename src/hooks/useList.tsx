import React, {useEffect, useMemo, useState} from "react";

import {ListOption} from "./useListOption";

export const useList = (options: ListOption[]) => {
  const [list, setList] = useState<any[]>([]);

  const listOptions = useMemo(() => list.map(({icon, text}) => {
    return (
      <li className="row" key={text}>
        <img src={icon} alt={`icon - ${icon}`} className="icon"/>
        <span className="text">{text}</span>
      </li>)
  }), [list]);

  useEffect(() => {
    (async () => {
      const components = await Promise.all(
        options.map(async (option) => {
          const module = await import(`./../assets/svg/${option.icon}.svg`);
          return {text: `${option.text}...`, icon: module.default};
        })
      );
      setList(components);
    })();
  }, [options]);

  return listOptions;
}
