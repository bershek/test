import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import '../styles/FormatToolbar.css'
import '../styles/TextEditor.css'

import datamuse from 'datamuse'

import Icon from 'react-icons-kit';
import {search} from 'react-icons-kit/icomoon/search'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'

import { BoldMark, ItalicMark, FormatToolbar } from './index'

const existingValue = JSON.parse(localStorage.getItem('content'))
const initialValue = Value.fromJSON(
  existingValue || {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  }
)

export default class TextEditor extends Component {
	state = {
		value: initialValue,
    synonyms : []
	}

  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON())
    localStorage.setItem('content', content)
    this.setState({ value })
  }

	onKeyDown = (e, change) => {
		if (!e.ctrlKey) {
			return;
		}

		e.preventDefault();

		switch (e.key) {
			case 'b': {
				change.toggleMark('bold');
				return true;
			}
			case 'i': {
				change.toggleMark('italic');
				return true;
			}

			case 'c': {
				change.toggleMark('code');
				return true;
			}

			case 'l': {
				change.toggleMark('list');
				return true;
			}

			case 'u': {
				change.toggleMark('underline');
				return true;
			}
			default: {
				return;
			}
		}
	};

	renderMark = (props) => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;

			case 'italic':
				return <ItalicMark {...props} />;

			case 'code':
				return <code {...props.attributes}>{props.children}</code>;

			case 'list':
				return (
					<ul {...props.attributes}>
						<li>{props.children}</li>
					</ul>
				);

			case 'underline':
				return <u {...props.attributes}>{props.children}</u>;

      case 'checkWord':
        return <span {...props.attributes}>{props.children}</span>;

			default: {
				return;
			}
		}
	};

	onMarkClick = (e, type) => {
		e.preventDefault();
		const { value } = this.state;
		const change = value.change().toggleMark(type);
		this.onChange(change);
	}

	render() {
		return (
			<Fragment>
        <div id="control-panel">
          <div id="format-actions">
    				<FormatToolbar>
    					<button
    						onPointerDown={(e) => this.onMarkClick(e, 'bold')}
    						className="format-action" type="button"
    					>
    						<Icon icon={bold} />
    					</button>
    					<button
    						onPointerDown={(e) => this.onMarkClick(e, 'italic')}
    						className="format-action" type="button"
    					>
    						<Icon icon={italic} />
    					</button>
    					<button
    						onPointerDown={(e) => this.onMarkClick(e, 'code')}
    						className="format-action" type="button"
    					>
    						<Icon icon={code} />
    					</button>
    					<button
    						onPointerDown={(e) => this.onMarkClick(e, 'list')}
    						className="format-action" type="button"
    					>
    						<Icon icon={list} />
    					</button>
    					<button
    						onPointerDown={(e) => this.onMarkClick(e, 'underline')}
    						className="format-action" type="button"
    					>
    						<Icon icon={underline} />
    					</button>
              <button
                  className="format-action" type="button"
                  onPointerDown={(e) => this.onMarkClick(e, 'checkWord')}
                  onClick={(e) =>searchSynonym(e)}
              >
                  Search synonyms &nbsp;
                  <Icon icon={search} />
              </button>
    				</FormatToolbar>
          </div>
        </div>
        <div id="file-zone">
            <div id="file">
      				<Editor
      					value={this.state.value}
      					onChange={this.onChange}
      					onKeyDown={this.onKeyDown}
      					renderMark={this.renderMark}
      				/>
              <select id='select'>
              </select>
            </div>
          </div>
			</Fragment>
		);
	}
}

const searchSynonym = (e) => {
  e.preventDefault();
  console.log(e.target)
  const word = getSelectedWord()
  let select = document.querySelector('#select')
  if (select.firstChild){
    while (select.firstChild) {
      select.firstChild.remove();
    }
  }

  datamuse.request(`words?ml=${word}`)
  .then(response => {
    let words = ""
    words = response.map(({word}) => word)
    words.forEach(function(value, item) {
      let word = value
      let optionBlock = document.createElement('option')
      optionBlock.textContent = word
      optionBlock.setAttribute('key', item);
      document.querySelector('#select').appendChild(optionBlock)
  	})
  })
  .catch(error => {
    return error
  });
}


const getSelectedWord = () => {
  try {
    const selection = document.getSelection();
    console.log(selection.focusNode.textContent)
    const isOneWord = checkIsSelectionOneWord(selection);
    console.log(isOneWord)
    if (!isOneWord) {
        return null;
    }
    return selection.toString().trim();
  } catch (error) {
    return error
  }
}

const checkIsSelectionOneWord = (selection) => {
    if (selection.type !== "Range") return false;
    const selectedText = selection.toString().trim();
    if (RegExp(/[$-/:-?{-~!"^_`[\]]/).test(selectedText) || selectedText.includes(" ")) return false;
    return true;
}
