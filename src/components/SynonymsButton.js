import React from "react";

const datamuse = require('datamuse');



export function getSelectedWord() {
    const selection = document.getSelection();
    const isOneWord = checkIsSelectionOneWord(selection);
    if (!isOneWord) {
        return null;
    }
    return selection.toString().trim();
}

const searchSynonym = (word) => {
  datamuse.request(`words?ml=${word}`)
  .then((json) => {
    console.log(json)
  })
}

const SynonymsButton = ({ word }) => {

    return (
        <button
            type="button"
            onClick={this.searchSynonym}
        >
            Search synonyms
        </button>
    );
}
export default SynonymsButton

function checkIsSelectionOneWord(selection) {
    if (selection.type !== "Range") return false;
    const selectedText = selection.toString().trim();
    if (RegExp(/[$-/:-?{-~!"^_`[\]]/).test(selectedText) || selectedText.includes(" ")) return false;
    return true;
}
