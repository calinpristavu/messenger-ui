import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Messenger/>
            </div>
        );
    }
}

class Messenger extends Component {
    state = {
        messages: []
    };

    socket = new WebSocket("ws://localhost:1324/ws");

    constructor(props) {
        super(props);

        this.socket.onmessage = this.writeSocketResponse
    }

    writeSocketResponse = (msg) => {
        console.log(msg);
        const text = JSON.parse(msg.data).Text;
        this.setState((prevState) => {
            prevState.messages.push(text);

            return prevState
        });
    };

    addMessage = (text) => {
        this.socket.send(JSON.stringify({"Text": text}));
    };

    render() {
        return (
            <div>
                <h1>Messenger</h1>
                {this.state.messages.map((text, key) => (
                    <Message key={key} text={text} />
                ))}
                <form name="message">
                    <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        placeholder="Type your message here." />
                    <button
                        onClick={() => this.addMessage(document.forms['message']['message'].value)}
                        type="button">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

class Message extends Component {
    render() {
        return (
            <li>{this.props.text}</li>
        );
    }
}

export default App;
