import React, {useEffect} from "react";

import {TIP_TEXT} from "../../constants";

import './Tip.css';

interface TipProps {
  setTip: (value: string) => void
}

export const Tip: React.FC<TipProps> = ({setTip}) => {

 useEffect(() => {
   setTip(TIP_TEXT);
 }, [setTip]);

  return <div className="tip">
    <div className="tag">Pro Tip</div>
    <div className="description">{TIP_TEXT}</div>
    <div className="submit">
      <span className="text">Hit </span>
      <span className="button">enter</span>
      <span className="text">to submit your prompt</span>
    </div>
  </div>

}
