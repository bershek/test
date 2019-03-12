import React, {Component} from 'react';
import './App.css';
import getMockText from './text.service';
import { TextEditor } from "./components";

class App extends Component {
    getText() {
        getMockText().then(function (result) {
            console.log(result);
        });
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <TextEditor />
                </main>
            </div>
        );
    }
}

export default App;
